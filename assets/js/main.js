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
        $('html,body').animate({ scrollTop: $(`#${data}`).offset().top - 85 }, 400);
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
    $("body").css("overflow", "auto");
    setTimeout(function(){ 
        $(".header-preloader").css("display", "none");
    }, 1000);
});
