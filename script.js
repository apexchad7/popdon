let clickCount = 0;
let isMissedImageActive = false;
let audioContext;
let popSoundBuffer;

document.addEventListener("DOMContentLoaded", async () => {
  // create a new audio context
  audioContext = new (window.AudioContext || window.webkitAudioContext)();

  // load the pop sound
  const response = await fetch("sounds/pop.mp3");
  const arrayBuffer = await response.arrayBuffer();
  popSoundBuffer = await audioContext.decodeAudioData(arrayBuffer);

  // preload images
  const images = ["images/active1.png", "images/active2.png", "images/missed.png", "images/rest.png"];

  images.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
});

function playPopSound() {
  if (!popSoundBuffer) {
    return;
  }

  const source = audioContext.createBufferSource();
  source.buffer = popSoundBuffer;
  source.connect(audioContext.destination);
  source.start(0);
}

function swapImage() {
  if (isMissedImageActive) {
    return;
  }

  const mainImage = document.getElementById("mainImage");

  // play the pop sound
  playPopSound();

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
