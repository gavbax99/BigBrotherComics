(function () {
    function validEmail(email) {
        var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        return re.test(email);
    }

    function validateHuman(honeypot) {
        if (honeypot) {  //if hidden form filled up
            console.log("Robot Detected!");
            return true;
        } else {
            console.log("Welcome Human!");
        }
    }

    // get all data in form and return object
    function getFormData(form) {
        var elements = form.elements;

        var fields = Object.keys(elements).filter(function (k) {
            return (elements[k].name !== "honeypot");
        }).map(function (k) {
            if (elements[k].name !== undefined) {
                return elements[k].name;
                // special case for Edge's html collection
            } else if (elements[k].length > 0) {
                return elements[k].item(0).name;
            }
        }).filter(function (item, pos, self) {
            return self.indexOf(item) == pos && item;
        });

        var formData = {};
        fields.forEach(function (name) {
            var element = elements[name];

            // singular form elements just have one value
            formData[name] = element.value;

            // when our element has multiple items, get their values
            if (element.length) {
                var data = [];
                for (var i = 0; i < element.length; i++) {
                    var item = element.item(i);
                    if (item.checked || item.selected) {
                        data.push(item.value);
                    }
                }
                formData[name] = data.join(', ');
            }
        });

        // add form-specific values into the data
        formData.formDataNameOrder = JSON.stringify(fields);
        formData.formGoogleSheetName = form.dataset.sheet || "responses"; // default sheet name
        formData.formGoogleSendEmail = form.dataset.email || ""; // no email by default

        console.log(formData);
        return formData;
    }

    function handleFormSubmit(event) {  // handles form submit without any jquery
        event.preventDefault();           // we are submitting via xhr below
        var form = event.target;
        var data = getFormData(form);         // get the values submitted in the form

        /* OPTION: Remove this comment to enable SPAM prevention, see README.md
        if (validateHuman(data.honeypot)) {  //if form is filled, form will not be submitted
          return false;
        }
        */



        // GAVIN'S CODE HERE -----------------------------------------------------
        // console.log("THIS IS THE DATA")
        // console.log(data.submit);

        // if the data contains a "submit" feild, it was forced through by a bot, so we stop the whole handling function
        if (data.submit) {
            return;
        }
        // GAVIN'S CODE HERE -----------------------------------------------------

        if (data.email && !validEmail(data.email)) {   // if email is not valid show error
            var invalidEmail = form.querySelector(".email-invalid");
            if (invalidEmail) {
                invalidEmail.style.display = "block";
                return false;
            }
        } else {

            var response = grecaptcha.getResponse();

            if (response.length === 0) {
                return;
            } else {
                // GAVIN'S CODE HERE -----------------------------------------------------
                var loadingCircle = form.querySelector(".loading-message");  // To select the loading circle 'gif'
                loadingCircle.style.display = "block";  // To display the loading circle until message is sent, then hidden before the user sees "Message sent!"
                // GAVIN'S CODE HERE -----------------------------------------------------
                disableAllButtons(form);
                var url = form.action;
                var xhr = new XMLHttpRequest();
                xhr.open('POST', url);
                // xhr.withCredentials = true;
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                xhr.onreadystatechange = function () {
                    console.log(xhr.status, xhr.statusText);
                    console.log(xhr.responseText);
                    var formElements = form.querySelector(".form-elements")
                    if (formElements) {
                        formElements.style.display = "none"; // hide form
                    }
                    var thankYouMessage = form.querySelector(".thankyou_message");
                    if (thankYouMessage) {
                        document.getElementById("gform").reset();  // Resets the form fields right when you submit
                        // GAVIN'S CODE HERE -----------------------------------------------------
                        loadingCircle.style.display = "none";  // Hides circle
                        thankYouMessage.style.display = "block";
                        document.getElementById("submitButton").disabled = true;
                        // GAVIN'S CODE HERE -----------------------------------------------------
                    }
                    return;
                };
                // url encode form data for sending as post data
                var encoded = Object.keys(data).map(function (k) {
                    return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
                }).join('&');
                xhr.send(encoded);
            }
           
        }
    }

    function loaded() {
        // bind to the submit event of our form
        var forms = document.querySelectorAll("form.gform");
        for (var i = 0; i < forms.length; i++) {
            forms[i].addEventListener("submit", handleFormSubmit, false);
        }
    };
    document.addEventListener("DOMContentLoaded", loaded, false);

    function disableAllButtons(form) {
        var buttons = form.querySelectorAll("button");
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].disabled = true;
        }
    }
})();