let clickCount = 0;
let isMissedImageActive = false;

document.addEventListener("DOMContentLoaded", () => {
  // preload pop sound
  const popSound = document.getElementById("popSound");
  popSound.load();

  // preload images
  const images = ["images/active1.png", "images/active2.png", "images/missed.png", "images/rest.png"];

  images.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
});

function swapImage() {
  if (isMissedImageActive) {
    return;
  }

  const mainImage = document.getElementById("mainImage");
  const popSound = document.getElementById("popSound");

  // play the pop sound only if it's fully loaded
  if (popSound.readyState >= 3) {
    popSound.currentTime = 0; // restart the sound if already playing
    popSound.play();
  }

  // show the missed.png image after 10 clicks
  if (clickCount > 0 && clickCount % 10 === 0) {
    isMissedImageActive = true;
    mainImage.src = "images/missed.png";
    mainImage.classList.remove("full-screen-image");
    mainImage.classList.add("missed-image");
    setTimeout(() => {
      mainImage.src = "images/rest.png";
      mainImage.classList.remove("missed-image");
      mainImage.classList.add("full-screen-image");
      isMissedImageActive = false;
    }, 500);
  } else {
    // alternate between active1.png and active2.png
    if (clickCount % 2 === 0) {
      mainImage.src = "images/active1.png";
    } else {
      mainImage.src = "images/active2.png";
    }

    setTimeout(() => {
      mainImage.src = "images/rest.png";
    }, 100);
  }

  clickCount++;
}
