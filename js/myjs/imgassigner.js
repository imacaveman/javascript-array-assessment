
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
