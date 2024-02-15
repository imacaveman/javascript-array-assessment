
$("#email-btn").on("click", function(){
    const $emailIn = $("#email-input").val();
    var $regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if($regex.test($emailIn)) {
        if($assignedPair.some(pair => pair.email === $emailIn)) {
            $(".input-error-glow").addClass("email-error-glow");
            if($("body").hasClass("lightmode")) {
                $(".error-msg-input").css("color", "#ff0000");
                $(".input-error-glow").addClass("light-error");
            } else {
                $(".error-msg-input").css("color", "#ff5858");
            }
            $(".error-msg-input").text("Email address already exists").show();
            setTimeout(function(){
                $(".error-msg-input").fadeOut(500);
            }, 3000);
        } else {
            assignImage($emailIn, $currentImg);
            var $trimEmail = $emailIn.replace(/[@.]/g, "");
            $("#select-email").append("<option>" + $emailIn + "</option>");
            $("#select-email option").last().prop("selected", true);
            $("#select-email").change();
            if($("body").hasClass("lightmode")) {
                $(".error-msg-input").css("color", "#259e01");
            } else {
                $(".error-msg-input").css("color", "#2fca00");
            }
            $(".error-msg-input").text("Email address added!").show();
            $(`<ul class="img-storage-${$trimEmail}"></ul>`).appendTo(".assigned-image-box");
            $(`.img-storage-${$trimEmail}`).append(`<li><img src=${$currentImg} alt=${$emailIn}></li>`);
            setTimeout(function(){
                $(".error-msg-input").fadeOut(500);
            }, 3000);
        }
        $("#email-input").val("");
    } else {
        $(".input-error-glow").addClass("email-error-glow");
        if($("body").hasClass("lightmode")) {
            $(".error-msg-input").css("color", "#ff0000");
            $(".input-error-glow").addClass("light-error");
        } else {
            $(".error-msg-input").css("color", "#ff5858");
        }
        $(".error-msg-input").text("Invalid email address").show();
        setTimeout(function(){
            $(".error-msg-input").fadeOut(500);
        }, 3000);
    }
});

$(".input-error-glow").on("click", function(){
    $(this).removeClass("email-error-glow");
    $(this).removeClass("light-error");
});
