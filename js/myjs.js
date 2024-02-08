
// $(".title-container").hide().slideDown(500);
// $(".fetcher-box").hide(1000).fadeIn(500);

function applyGlowEffect(buttonSelector, targetSelector) {
    $(buttonSelector).on("click", function(){
        $(targetSelector).addClass("focus-glow");
        setTimeout(function() {
            $(targetSelector).removeClass("focus-glow");
        }, 3000);
    });
}

applyGlowEffect(".find-img-ref", ".img-fetcher-box");
applyGlowEffect(".add-email-ref", ".email-input-box");
applyGlowEffect(".assign-img-ref", ".email-select-box");


$(".find-img-btn").on("click", function() {
    const $rng = Math.floor(Math.random() * 1000);
    const $newImg = "https://picsum.photos/250?random=" + $rng;
    $(".image-container img").attr("src", $newImg);
});

// email input

$("#email-btn").on("click", function(){
    const $emailIn = $("#email-input").val();
    var $regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if($regex.test($emailIn)) {
        $("#select-email").append("<option>" + $emailIn + "</option>")
    } else {
        console.log("Incorrect email address");
    }
});
