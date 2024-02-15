
$("#select-btn").on("click", function(){
    let $selectValue = $("#select-email")[0].options[$("#select-email")[0].selectedIndex].value;
    if ($selectValue === "Select an Email Address") {
        $(".select-error-glow").addClass("email-error-glow");
        if($("body").hasClass("lightmode")) {
            $(".error-msg-select").css("color", "#ff0000");
            $(".select-error-glow").addClass("light-error");
        } else {
            $(".error-msg-select").css("color", "#ff5858");
        }
        $(".error-msg-select").text("Please select an email address").show();
        setTimeout(function(){
            $(".error-msg-select").fadeOut(500);
        }, 3000);
    } else {
        let existingPairIndex = $assignedPair.findIndex(pair => pair.email === $selectValue);
        if (existingPairIndex !== -1 && $assignedPair[existingPairIndex].imgLink.includes($currentImg)) {
            if($("body").hasClass("lightmode")) {
                $(".error-msg-select").css("color", "#ff0000");
                $(".select-error-glow").addClass("light-error");
            } else {
                $(".error-msg-select").css("color", "#ff5858");
                $(".select-error-glow").addClass("email-error-glow");
            }
            $(".error-msg-select").text("Image already exists").show();
            console.log("Image already exists for this email address");
            setTimeout(function(){
                $(".error-msg-select").fadeOut(500);
            }, 3000);
        } else {
            assignImage($selectValue, $currentImg);
            console.log($assignedPair);
            var $selectedEmail = $("#select-email").val();
            var $ulName = `.img-storage-${$selectedEmail.replace(/[@.]/g, "")}`;
            if($("body").hasClass("lightmode")) {
                $(".error-msg-select").css("color", "#259e01");
            } else {
                $(".error-msg-select").css("color", "#2fca00");
            }
            $("#select-email").removeClass("light-error");
            $("#select-email").removeClass("email-error-glow");
            $(".error-msg-select").text("Image added!").show();
            $($ulName).append(`<li><img src=${$currentImg} alt=${$selectValue}></li>`);
            setTimeout(function(){
                $(".error-msg-select").fadeOut(500);
            }, 3000);
        }
    }
});

$(".select-error-glow").on("click", function(){
    $(this).removeClass("email-error-glow");
    $(this).removeClass("light-error");
});


// This will hide elements depending on which email address is currently selected

$("#select-email").on("change", function(){
    var $selectedEmail = $("#select-email").val();
    $(".assigned-image-box ul").not(`.img-storage-${$selectedEmail.replace(/[@.]/g, "")}`).hide();
    $(`.img-storage-${$selectedEmail.replace(/[@.]/g, "")}`).show();
});

