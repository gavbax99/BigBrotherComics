$(document).ready(function(){

    $(".sb-preview").on("click", function (){
        var title = $(".bi-title").val().trim();
        var author = $(".bi-author").val().trim();
        var img = $(".bi-img").val().trim();
        var body = $(".bi-body").val().trim();

        var date = new Date();
        var day = date.getDate();
        var month = date.getMonth();
        var realMonth = month += 1;
        var year = date.getFullYear();

        var completeDate = `${realMonth}/${day}/${year}`;

        if (body.includes("script")) {
            alert("NO SCRIPTS");
            return;
        }

        // Main body injection
        $(".bulletin-text-bottom").html(body);

        // Title injection
        $(".bulletin-title").text(title);

        // Author injection
        if (author.length > 0) {
            $(".bulletin-author span").text(author);
        } else {
            $(".bulletin-author span").text("Staff");
        }        

        // Date injection
        $(".bulletin-posted-date span").text(completeDate);

        // Image injection
        $(".bulletin-img").css("background-image", `url("${img}")`);

        $('html,body').animate({ scrollTop: $(`#bulletin-nav`).offset().top }, 400);
    });


    $(".sb-submit").on("click", function () {
        $(".modal-submit").css("display", "flex");
        $(".modal-submit").css("opacity", "1");
        $(".modal-submit").css("top", "35%");
    });

    $(".sb-hide").on("click", function () {
        $(".modal-hide").css("display", "flex");
        $(".modal-hide").css("opacity", "1");
        $(".modal-hide").css("top", "35%");
    });


    $(".bulletin-back").on("click", function () {
        $(".modal").css("opacity", "0");
        $(".modal").css("top", "38%");
        setTimeout(function(){
            $(".modal").css("display", "none");
        }, 500);
    });


    $(".bulletin-submit").on("click", function(){
        var title = $(".bi-title").val().trim();
        var author = $(".bi-author").val().trim();
        var img = $(".bi-img").val().trim();
        var body = $(".bi-body").val().trim();

        var dataObj = {
            title: title,
            author: author,
            img: img,
            body: body
        };

        if (title.length == 0 || img.length == 0 || body.length == 0) {
            alert("Fill out all required feilds (title, img, message).");
        } else {
            $.ajax({
                url: "/api/newBulletin",
                type: "POST",
                data: dataObj 
            }).then (
                function (result) {
                    // console.log(result);
                    window.location = "/";
                }
            );
        }
    });


    //CHANGE TARGET 
    $(".bulletin-hide").on("click", function(){

        $.ajax({
            url: "/api/hideBulletin",
            type: "POST"
        }).then (
            function (result) {
                // console.log(result);
                window.location = "/";
            }
        );
    });


});

// var date = new Date('2010-10-11T00:00:00+05:30');
// alert((date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear());