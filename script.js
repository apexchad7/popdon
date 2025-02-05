let clickCount = 0;
let isMissedImageActive = false;
let audioContext;
let popSoundBuffer;
let randomClickInterval = Math.floor(Math.random() * (21 - 12 + 1)) + 12;
let isSwappingImage = false; // state to check if swapping image is in progress

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

  // add event listener to the entire popup to close when clicked anywhere
  document.getElementById("popup").addEventListener("click", () => {
    document.getElementById("popup").style.display = "none";
  });

  // show the popup on page load
  document.getElementById("popup").style.display = "flex";

  // automatically close the popup after 3 seconds
  setTimeout(() => {
    document.getElementById("popup").style.display = "none";
  }, 2500);

  // add event listener for spacebar press
  document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
      swapImage();
      document.getElementById("popup").style.display = "none";
    }
  });

  // dynamically show click or tap message based on the device
  var message = "Click anywhere or press the spacebar!"; // default message
  if ("ontouchstart" in window || navigator.maxTouchPoints) {
    message = "Tap anywhere"; // touchscreen message
  }
  document.getElementById("interactionMessage").textContent = message;
});

function applyNoOutlineNoSelect(element) {
  element.classList.add("no-outline", "noSelect");
}

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
  if (isMissedImageActive || isSwappingImage) {
    return;
  }

  isSwappingImage = true; // set state to indicate image swap is in progress
  const mainImage = document.getElementById("mainImage");

  // play the pop sound
  playPopSound();

  // show the missed.webp image after random clicks every now and then (between 12 and 21 clicks)
  if (clickCount > 0 && clickCount % randomClickInterval === 0) {
    isMissedImageActive = true;
    mainImage.src = "images/missed.webp";
    mainImage.classList.remove("full-screen-image");
    mainImage.classList.add("missed-image");
    applyNoOutlineNoSelect(mainImage); // apply classes

    setTimeout(() => {
      mainImage.src = "images/rest.webp";
      mainImage.classList.remove("missed-image");
      mainImage.classList.add("full-screen-image");
      applyNoOutlineNoSelect(mainImage); // apply classes
      isMissedImageActive = false;
      isSwappingImage = false; // reset state
    }, 500);

    // reset clickCount and generate a new random interval for the next check
    clickCount = 0;
    randomClickInterval = Math.floor(Math.random() * (21 - 12 + 1)) + 12;
  } else {
    // randomly choose between active1.webp and active2.webp
    const images = ["images/active1.webp", "images/active2.webp"];
    mainImage.src = images[Math.floor(Math.random() * images.length)];
    applyNoOutlineNoSelect(mainImage); // apply classes

    setTimeout(() => {
      mainImage.src = "images/rest.webp";
      applyNoOutlineNoSelect(mainImage); // apply classes
      isSwappingImage = false; // reset state
    }, 100);
  }

  clickCount++;
}

// add event listener for click
document.getElementById("mainImage").addEventListener("click", swapImage);
