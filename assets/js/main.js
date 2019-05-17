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
        $('html,body').animate({ scrollTop: $(`#${data}`).offset().top - 85 }, 400);
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

    // ========= INJECTIONS =========

    // Main body injection
    // $(".bulletin-text-bottom").html("sup<br><br>sup");

    // Title injection
    // $(".bulletin-title").text("sup<br><br>sup");

    // Author injection
    // $(".bulletin-author span").text("sup<br><br>sup");

    // Date injection
    // $(".bulletin-posted-date span").text("sup<br><br>sup");

});

// Preloader fade
$(window).on("load", function() {
    $(".preloader").css("height", "0vh");
    $(".header-preloader").css("opacity", "0");
    $(".hamburger").css("opacity", "1");
    $("body").css("overflow", "auto");
    setTimeout(function(){ 
        $(".header-preloader").css("display", "none");
    }, 500);
});
