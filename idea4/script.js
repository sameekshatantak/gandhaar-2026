/* THEME DATA (with audio) */
const themes = [
  {
    image: "assets/images/day1.jpg",
    audio: "assets/audio/day1.mpeg"
  },
  {
    image: "assets/images/day2.jpg",
    audio: "assets/audio/day2.mp3"
  },
  {
    image: "assets/images/day3.png",
    audio: "assets/audio/day3.mpeg"
  },
  {
    image: "assets/images/day4.png",
    audio: "assets/audio/day4.mpeg"
  }
];

/* VARIABLES */
let currentTheme = 0;
let slideshowInterval = null;
let currentAudio = null;
let audioEnabled = false;

const screenContent = document.getElementById("screenContent");
const themeTitle = document.getElementById("themeTitle");
const themeSubtitle = document.getElementById("themeSubtitle");
const tvScreen = document.getElementById("tvScreen");
const channelKnob = document.getElementById("channelKnob");
const overlay = document.querySelector(".tv-overlay-text");

// second knob = VOL
const volumeKnob = document.querySelectorAll(".knob")[1];

/* IMAGE CROSS FADE */
function crossFadeImage(newSrc) {
  const currentImg = screenContent.querySelector(".tv-image.active");

  const nextImg = document.createElement("img");
  nextImg.src = newSrc;
  nextImg.className = "tv-image";
  screenContent.appendChild(nextImg);

  void nextImg.offsetWidth;
  nextImg.classList.add("active");
  if (currentImg) currentImg.classList.remove("active");

  setTimeout(() => {
    if (currentImg) currentImg.remove();
  }, 1000);
}

/* AUDIO FADES */
function fadeOutAudio(audio, duration = 800) {
  if (!audio) return;

  const step = audio.volume / (duration / 50);
  const fade = setInterval(() => {
    audio.volume = Math.max(0, audio.volume - step);
    if (audio.volume <= 0) {
      audio.pause(); // ⬅️ pause, not stop
      clearInterval(fade);
    }
  }, 50);
}

function fadeInAudio(audio, duration = 800) {
  audio.play();
  const step = (0.8 - audio.volume) / (duration / 50);

  const fade = setInterval(() => {
    audio.volume = Math.min(0.8, audio.volume + step);
    if (audio.volume >= 0.8) {
      clearInterval(fade);
    }
  }, 50);
}

/* PLAY / RESUME AUDIO */
function playThemeAudio(src) {
  if (!audioEnabled || !src) return;

  // If same audio exists → resume
  if (currentAudio && currentAudio.src.includes(src)) {
    fadeInAudio(currentAudio);
    return;
  }

  // New theme audio
  if (currentAudio) fadeOutAudio(currentAudio);

  currentAudio = new Audio(src);
  currentAudio.loop = true;
  currentAudio.volume = 0;

  fadeInAudio(currentAudio);
}

/* LOAD THEME */
function loadTheme(index) {
  const theme = themes[index];

  overlay.classList.remove("show");

  setTimeout(() => {
    themeTitle.textContent = theme.title || "";
    themeSubtitle.textContent = theme.subtitle || "";
    overlay.classList.add("show");

    crossFadeImage(theme.image);

    if (audioEnabled) {
      playThemeAudio(theme.audio);
    }
  }, 300);
}

/* SLIDESHOW */
function startSlideshow() {
  slideshowInterval = setInterval(() => {
    currentTheme = (currentTheme + 1) % themes.length;
    loadTheme(currentTheme);
  }, 10000);
}

function resetSlideshow() {
  clearInterval(slideshowInterval);
  startSlideshow();
}

/* INIT */
(function init() {
  const img = document.createElement("img");
  img.src = themes[0].image;
  img.className = "tv-image active";
  screenContent.appendChild(img);

  themeTitle.textContent = themes[0].title || "";
  themeSubtitle.textContent = themes[0].subtitle || "";
  overlay.classList.add("show");

  startSlideshow();
})();

setTimeout(() => {
  tvScreen.classList.remove("off");
  tvScreen.classList.add("on");
}, 300);

/* CHANNEL CHANGE */
channelKnob.addEventListener("click", () => {
  currentTheme = (currentTheme + 1) % themes.length;
  loadTheme(currentTheme);
  resetSlideshow();
});

/* 🔊 VOLUME KNOB (PAUSE / RESUME) */
volumeKnob.addEventListener("click", () => {
  audioEnabled = !audioEnabled;

  if (audioEnabled) {
    playThemeAudio(themes[currentTheme].audio);
  } else if (currentAudio) {
    fadeOutAudio(currentAudio); // ⬅️ pause, keep time
  }
});

/* MOBILE SWIPE */
let startX = 0;

tvScreen.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
});

tvScreen.addEventListener("touchend", e => {
  const endX = e.changedTouches[0].clientX;
  if (Math.abs(endX - startX) > 50) {
    currentTheme = (currentTheme + 1) % themes.length;
    loadTheme(currentTheme);
    resetSlideshow();
  }
});
