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
        $(".bulletin-author span").text(author);

        // Date injection
        $(".bulletin-posted-date span").text(completeDate);

        // Image injection
        $(".bulletin-img").css("background-image", `url("${img}")`);

        $('html,body').animate({ scrollTop: $(`#bulletin-nav`).offset().top }, 400);
    });

});

// var date = new Date('2010-10-11T00:00:00+05:30');
// alert((date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear());