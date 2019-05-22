$(document).ready(function(){

    $(".weekly-events-list").slick({
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        adaptiveHeight: true
    });

    $(".events-prev").on("click", function () {
        $(".weekly-events-list").slick('slickPrev');
    });

    $(".events-next").on("click", function () {
        $(".weekly-events-list").slick('slickNext');
    });

    $(".header-bb-logo").on("click", function () {
        $('html,body').animate({ scrollTop: 0 }, 400);
    });

    $(".nav-button").on("click", function () {
        var data = $(this).attr("data-name");
        var navCheck = $(".nav-overlay").css("opacity");

        if  ($(window).width() > 768) {
            $('html,body').animate({ scrollTop: $(`#${data}`).offset().top - 85 }, 400);
        } else {
            $('html,body').animate({ scrollTop: $(`#${data}`).offset().top - 60 }, 400);
        }

        if (navCheck > 0) {
            $(".ham-img").attr("src", "./assets/images/hamburger_opened.svg");
            $(".nav-overlay").animate({ opacity: 0 }, 300);
            setTimeout(function () {
                $(".nav-overlay").css("display", "none");
            }, 300);
        }
    });

    $(".hamburger").on("click", function() {
        var check = $(".nav-overlay").css("opacity");
        if (check == 0) {
            // If the menu is closed, display it and fade it in
            $(".nav-overlay").css("display", "flex").animate({ opacity: 1 }, 300);
            $(".ham-img").attr("src", "./assets/images/hamburger_closed.svg");
        } else if (check == 1) {
            // If the menu is opened, fade it out and display:none
            $(".nav-overlay").animate({ opacity: 0 }, 300);
            $(".ham-img").attr("src", "./assets/images/hamburger_opened.svg");
            setTimeout(function () {
                $(".nav-overlay").css("display", "none");
            }, 300);
        }
    });

    var dt = new Date();
    var year = dt.getFullYear();

    $(".footer-text span").text(year);


    // CONSOLE COMMAND

    function runConsole(input) {
        if (input.indexOf("SCRIPT") >= 0) {
            alert("NO SCRIPTS >:(");
            $(".console-text").val("");
            return;
        } else if (input.indexOf("GAVIN") >= 0) {
            alert("GAVIN IS GREAT");
            $(".console-text").val("");
            return;
        } else if (input.indexOf("KENNY") >= 0) {
            alert("KENNY IS GREAT");
            $(".console-text").val("");
            return;
        } else if (input == "BIG BROTHER IS WATCHING YOU") {
            alert("BIG BROTHER IS WATCHING YOU");
            $(".console-text").val("");
            return;
        } else if (input == "I LOVE COMICS") {
            $("*").css("font-family", "comicSans");
            alert("Don't we all!");
            $(".console-text").val("");
            return;
        } else if (input == "") {
            alert("ENTER COMMAND");
            return;
        } else {
            alert("UNKNOWN COMMAND")
            $(".console-text").val("");
            return;
        }
    };

    $(".footer-console").on("click", function () {
        $(this).css("opacity", "0");
        $(".console-padding").css("height", "40px");
        $(".console-container").css("bottom", "0");
        $('html,body').animate({ scrollTop: $(document).height() }, 700);
        setTimeout(function () {
            $(this).css("display", "none"); 
        }, 700)
    });

    $(".console-button").on("click", function () {
        var textHold = $(".console-text").val().toUpperCase().trim();
        textHold = textHold.replace(/\s\s+/g, ' ');
        runConsole(textHold);
    });

    $(".console-text").on('keypress', function (e) {
        if(e.which == 13) {
            var textHold = $(".console-text").val().toUpperCase().trim();
            textHold = textHold.replace(/\s\s+/g, ' ');
            runConsole(textHold);
        }
    });

    // Hides "Message Sent!" if sending multiple messages
    $(".input-submit").on("click", function () {
        $("#message-sent").css("display", "none");
    });

    $(".header-bb-title").text(process.env.ADMIN_PASS);
    

    // ========= CAMERA INTERVAL =========

    // setInterval(function() {
    //     console.log("running");
    //     var roll = Math.floor(Math.random() * 100) + 1;
    //     if (roll >= 90) {
    //         var roll2 = Math.floor(Math.random() * 2);
    //         var srcl = $(".camera-left").attr("src");
    //         var srcr = $(".camera-right").attr("src");
    //         if (roll2 == 0) {
    //             $(".camera-left").attr("src", srcl.replace(/\.gif$/i, ".png"));
    //         } else {
    //             $(".camera-right").attr("src", srcr.replace(/\.gif$/i, ".png"));
    //         }
    //         setTimeout(function() {
    //             $(".camera-left").attr("src", srcl.replace(/\.png$/i, ".gif"));
    //             $(".camera-right").attr("src", srcr.replace(/\.png$/i, ".gif"));
    //         }, 190);
    //     }
    // }, 200);

    // ========= INJECTIONS =========

    // Main body injection
    // $(".bulletin-text-bottom").html("sup<br><br>sup");

    // Title injection
    // $(".bulletin-title").text("sup<br><br>sup");

    // Author injection
    // $(".bulletin-author span").text("sup<br><br>sup");

    // Date injection
    // $(".bulletin-posted-date span").text("sup<br><br>sup");

    // Image injection
    // $(".bulletin-img").css("background-image", "url('file')");

});

// Preloader fade
$(window).on("load", function() {
    $(".preloader").css("height", "0vh");
    $(".header-preloader").css("opacity", "0");
    $(".hamburger").css("opacity", "1");
    $("body").css("overflow", "auto");
    setTimeout(function(){ 
        $(".header-preloader").css("display", "none");
    }, 400);
});