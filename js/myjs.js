let $assignedPair = [];
let $currentImg = "";

function displayImage() {
    fetch('https://picsum.photos/250')
    .then(response => {
        $currentImg = response.url;
        document.getElementById('fetchedimg').src = $currentImg;
    })
    .catch(error => console.error('Could not fetch image:', error));
}

displayImage();

function assignImage(emailAdd, imgSource) {
    const existingPairIndex = $assignedPair.findIndex(pair => pair.email === emailAdd);
    if (existingPairIndex !== -1) {
        const existingImageIndex = $assignedPair[existingPairIndex].imgLink.indexOf(imgSource);
        if (existingImageIndex === -1) {
            $assignedPair[existingPairIndex].imgLink.push(imgSource);
        } else {
            console.log("Testing");
        }
    } else {
        $assignedPair.push({ email: emailAdd, imgLink: [imgSource] });
    }
}

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

$(".find-img-btn").on("click", function(){
    displayImage();
});

// EMAIL INPUT

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
        $("#email-input").val("");
        setTimeout(function(){
            $(".error-msg-input").fadeOut(500);
        }, 3000);
    }
});

$(".input-error-glow").on("click", function(){
    $(this).removeClass("email-error-glow");
    $(this).removeClass("light-error");
});

// EMAIL SELECT 

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

$("#select-email").on("change", function(){
    var $selectedEmail = $("#select-email").val();
    $(".assigned-image-box ul").not(`.img-storage-${$selectedEmail.replace(/[@.]/g, "")}`).hide();
    $(`.img-storage-${$selectedEmail.replace(/[@.]/g, "")}`).show();
});

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
