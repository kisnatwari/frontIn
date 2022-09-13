$(document).ready(function () {
    $(".toggle-btn").click(() => {
        if ($(".sidenav").hasClass("sidenav-open")) {
            $(".sidenav").removeClass("sidenav-open");
            $(".sidenav").addClass("sidenav-close");

            $(".section").removeClass("section-open");
            $(".section").addClass("section-close");
        }
        else {
            $(".sidenav").addClass("sidenav-open");
            $(".sidenav").removeClass("sidenav-close");

            $(".section").addClass("section-open");
            $(".section").removeClass("section-close");
        }
    })
})