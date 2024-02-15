
function displayImage() {
    fetch('https://picsum.photos/250')
    .then(response => {
        $currentImg = response.url;
        document.getElementById('fetchedimg').src = $currentImg;
    })
    .catch(error => console.error('Could not fetch image:', error));
}

displayImage();

$(".find-img-btn").on("click", function(){
    displayImage();
});
