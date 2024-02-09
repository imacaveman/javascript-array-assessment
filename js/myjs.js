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

function assignImage(emailAdd, imgSource){
    $assignedPair.push({email: emailAdd, imgLink: imgSource})
    console.log("Added to array: ", {email: emailAdd, imgLink: imgSource});
    console.log("Updated array: ", $assignedPair);
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
    displayImage();
});

// EMAIL INPUT

$("#email-btn").on("click", function(){
    const $emailIn = $("#email-input").val();
    var $regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if($regex.test($emailIn)) {
        if($assignedPair.some(pair => pair.email === $emailIn)) {
            $(".input-error-glow").addClass("email-error-glow");
            $(".error-msg-input").css("color", "#ff5858");
            $(".error-msg-input").text("Email address already exists").show();
            setTimeout(function(){
                $(".error-msg-input").fadeOut(500);
            }, 3000);
        } else {
            assignImage($emailIn, $currentImg);
            $("#select-email").append("<option>" + $emailIn + "</option>");
            $(".error-msg-input").css("color", "#2fca00");
            $(".error-msg-input").text("Email address added!").show();
            $("")
            setTimeout(function(){
                $(".error-msg-input").fadeOut(500);
            }, 3000);
        }
        $("#email-input").val("");
    } else {
        $(".input-error-glow").addClass("email-error-glow");
        $(".error-msg-input").css("color", "#ff5858");
        $(".error-msg-input").text("Invalid email address").show();
        $("#email-input").val("");
        setTimeout(function(){
            $(".error-msg-input").fadeOut(500);
        }, 3000);
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
        assignImage($selectValue, $currentImg);
        console.log($assignedPair);
        $(`.img-storage`).append(`<li><img src=${$currentImg} alt=${$selectValue}></li>`);
    } 
});

$(".select-error-glow").on("click", function(){
    $(this).removeClass("email-error-glow");
});
