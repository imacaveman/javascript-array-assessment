var assignedPair = [];

function assignImage(emailAdd, imgSource){
    assignedPair.push({email: emailAdd, imgLink: imgSource})
}

function applyGlowEffect(buttonSelector, targetSelector) {
    $(buttonSelector).on("click", function(){
        $(targetSelector).addClass("focus-glow");
        setTimeout(function(){
            $(targetSelector).removeClass("focus-glow");
        }, 2000);
    });
}

applyGlowEffect(".find-img-ref", ".img-fetcher-box");
applyGlowEffect(".add-email-ref", ".email-input-box");
applyGlowEffect(".assign-img-ref", ".email-select-box");

$(".find-img-btn").on("click", function(){
    const $rng = Math.floor(Math.random() * 1000);
    const $newImg = "https://picsum.photos/250?random=" + $rng;
    $(".image-container img").attr("src", $newImg);
});

// EMAIL INPUT

$("#email-btn").on("click", function(){
    const $emailIn = $("#email-input").val();
    var $regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if($regex.test($emailIn)) {
        $("#select-email").append("<option>" + $emailIn + "</option>")
        $(".error-msg-input").css("color", "#2fca00");
        $(".error-msg-input").text("Email address added!").delay(100).fadeIn(500);
        setTimeout(function(){
            $(".error-msg-input").fadeOut(500);
        }, 3000);
        $("#email-input").val("");
    } else {
        $(".input-error-glow").addClass("email-error-glow");
        $(".error-msg-input").css("color", "#ff5858");
        $(".error-msg-input").text("Invalid or repeated email address");
        $("#email-input").val("");
    }
});

$(".input-error-glow").on("click", function(){
    $(this).removeClass("email-error-glow");
});

// EMAIL SELECT 

$("#select-btn").on("click", function(){
    let $selectValue = $("#select-email")[0].options[$("#select-email")[0].selectedIndex].value;
    if ($selectValue === "Select an Email Address") {
        $(".select-error-glow").addClass("email-error-glow");
        $(".error-msg-select").css("color", "#ff5858");
        $(".error-msg-select").text("Please select an email address");
    } else {
        assignImage($selectValue, $newImg);
        console.log(assignedPair[1]);
    }
});

$(".select-error-glow").on("click", function(){
    $(this).removeClass("email-error-glow");
});
