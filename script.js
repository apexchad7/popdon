let clickCount = 0;
let isMissedImageActive = false;

function swapImage() {
  if (isMissedImageActive) {
    return;
  }

  const mainImage = document.getElementById("mainImage");
  const popSound = document.getElementById("popSound");

  // play the pop sound
  popSound.play();

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
    }, 300);
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
