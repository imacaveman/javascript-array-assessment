
function iconToggle() {
    const $btnIcon = $(".toggle-btn i");
    if ($btnIcon.hasClass("fa-solid")) {
        $btnIcon.removeClass("fa-solid").addClass("fa-regular");
    } else {
        $btnIcon.removeClass("fa-regular").addClass("fa-solid");
    }
}

$(".toggle-btn").on('click', function() {
    const $bodyAll = $("body");
    iconToggle();
    if ($bodyAll.hasClass("lightmode")) {
        $bodyAll.removeClass("lightmode");
        $(".base-box").removeClass("lightbox");
        $(".email-textbox").removeClass("light-inputs");
        $(".select-email").removeClass("light-inputs");
    } else {
        $("body").addClass("lightmode");
        $(".base-box").addClass("lightbox");
        $(".email-textbox").addClass("light-inputs");
        $(".select-email").addClass("light-inputs");
    }
    if ($(this).hasClass("btnon")) {
        $(this).removeClass("btnon");
    } else {
        $(this).addClass("btnon");
    }
});
