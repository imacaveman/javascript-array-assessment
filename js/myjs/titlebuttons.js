
function applyGlowEffect(buttonSelector, targetSelector) {
    $(buttonSelector).on("click", function(){
        if ($("body").hasClass("lightmode")) {
            $(targetSelector).addClass("focus-glow-light");
        } else {
            $(targetSelector).addClass("focus-glow");
        }
        setTimeout(function(){
            $(targetSelector).removeClass("focus-glow");
            $(targetSelector).removeClass("focus-glow-light");
        }, 2000);
    });
}

applyGlowEffect(".find-img-ref", ".img-fetcher-box");
applyGlowEffect(".add-email-ref", ".email-input-box");
applyGlowEffect(".assign-img-ref", ".email-select-box");
