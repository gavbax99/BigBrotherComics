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

});
