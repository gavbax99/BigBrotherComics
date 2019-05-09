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

});