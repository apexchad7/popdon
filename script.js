let clickCount = 0;
let isMissedImageActive = false;
let audioContext;
let popSoundBuffer;
let randomClickInterval = Math.floor(Math.random() * (21 - 12 + 1)) + 12;

document.addEventListener("DOMContentLoaded", async () => {
  // create a new audio context
  audioContext = new (window.AudioContext || window.webkitAudioContext)();

  // load the pop sound
  const response = await fetch("sounds/pop.mp3");
  const arrayBuffer = await response.arrayBuffer();
  popSoundBuffer = await audioContext.decodeAudioData(arrayBuffer);

  // preload images
  const images = ["images/active1.webp", "images/active2.webp", "images/missed.webp", "images/rest.webp"];

  images.forEach((src) => {
    const img = new Image();
    img.src = src;
  });

  // add event listener for spacebar press
  document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
      swapImage();
    }
  });

  // dynamically show click or tap message based on the device
  var message = "Click anywhere or press the spacebar!"; // default message
  if ("ontouchstart" in window || navigator.maxTouchPoints) {
    message = "Tap anywhere"; // touchscreen message
  }
  document.getElementById("interactionMessage").textContent = message;
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

  // show the missed.webp image after random clicks every now and then (between 12 and 21 clicks)
  if (clickCount > 0 && clickCount % randomClickInterval === 0) {
    isMissedImageActive = true;
    mainImage.src = "images/missed.webp";
    //if (window.innerWidth < 1377) {
    mainImage.classList.remove("full-screen-image");
    mainImage.classList.add("missed-image");
    //}
    setTimeout(() => {
      mainImage.src = "images/rest.webp";
      //if (window.innerWidth < 1377) {
      mainImage.classList.remove("missed-image");
      mainImage.classList.add("full-screen-image");
      //}
      isMissedImageActive = false;
    }, 500);

    // rest clickCount and generate a new random interval for the next check
    clickCount = 0;
    randomClickInterval = Math.floor(Math.random() * (21 - 12 + 1)) + 12;
  } else {
    // randomly choose between active1.webp and active2.webp
    const images = ["images/active1.webp", "images/active2.webp"];
    mainImage.src = images[Math.floor(Math.random() * images.length)];

    setTimeout(() => {
      mainImage.src = "images/rest.webp";
    }, 100);
  }

  clickCount++;
}

// add event listener for click
document.getElementById("mainImage").addEventListener("click", swapImage);
