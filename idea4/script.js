/* ===============================
   THEME DATA
================================ */
const themes = [
  {
    title: "Episode 1: Reality Check",
    subtitle:
      "The curtains rise with high-voltage drama as contestants step into the spotlight inspired by iconic reality TV shows like Bigg Boss, Roadies, and Traitors, recreating their most unforgettable moments.",
    image: "assets/1000095900.jpg"
  },
  {
    title: "Episode 2: ToonVerse",
    subtitle:
      "The channel switches to pure nostalgia as animated worlds come alive with characters inspired by Disney, Pogo, and classic cartoons that defined our childhood.",
    image: "assets/1000095901.jpg"
  },
  {
    title: "Episode 3: Desi Sitcoms",
    subtitle:
      "It’s peak prime time as beloved Indian sitcom characters return to the screen, bringing laughter, charm, and iconic looks straight from the living room to the stage.",
    image: "assets/1000095902.jpg"
  },
  {
    title: "Episode 4: Desi Darshan",
    subtitle:
      "The grand finale celebrates India’s cultural broadcast, where traditional sarees and ethnic elegance take center stage, inspired by desi television and timeless heritage.",
    image: "assets/1000095903.jpg"
  }
];

/* ===============================
   VARIABLES
================================ */
let currentTheme = 0;
let slideshowInterval = null;

const screenContent = document.getElementById("screenContent");
const themeTitle = document.getElementById("themeTitle");
const themeSubtitle = document.getElementById("themeSubtitle");
const tvScreen = document.getElementById("tvScreen");
const channelKnob = document.getElementById("channelKnob");
const overlay = document.querySelector(".tv-overlay-text");

/* ===============================
   IMAGE CROSS FADE (NO BLACK)
================================ */
function crossFadeImage(newSrc) {
  const currentImg = screenContent.querySelector(".tv-image.active");

  const nextImg = document.createElement("img");
  nextImg.loading = "lazy";
  nextImg.src = newSrc;
  nextImg.className = "tv-image";
  screenContent.appendChild(nextImg);

  // Force browser reflow
  void nextImg.offsetWidth;

  nextImg.classList.add("active");
  if (currentImg) currentImg.classList.remove("active");

  setTimeout(() => {
    if (currentImg) currentImg.remove();
  }, 1000); // must match CSS transition time
}

/* ===============================
   LOAD THEME (TEXT + IMAGE)
================================ */
function loadTheme(index) {
  const theme = themes[index];

  // Fade OUT text
  overlay.classList.remove("show");

  setTimeout(() => {
    // Update text
    themeTitle.textContent = theme.title;
    themeSubtitle.textContent = theme.subtitle;

    // Fade IN text
    overlay.classList.add("show");

    // Cross-fade image
    crossFadeImage(theme.image);
  }, 300);
}

/* ===============================
   AUTO SLIDESHOW
================================ */
function startSlideshow() {
  slideshowInterval = setInterval(() => {
    currentTheme = (currentTheme + 1) % themes.length;
    loadTheme(currentTheme);
  }, 5000);
}

function resetSlideshow() {
  clearInterval(slideshowInterval);
  startSlideshow();
}

/* ===============================
   INITIAL LOAD
================================ */
(function init() {
  // Initial image
  const img = document.createElement("img");
  img.src = themes[0].image;
  img.loading = "lazy";
  img.className = "tv-image active";
  screenContent.appendChild(img);

  themeTitle.textContent = themes[0].title;
  themeSubtitle.textContent = themes[0].subtitle;
  overlay.classList.add("show");

  startSlideshow();
})();

/* ===============================
   TV POWER ON EFFECT
================================ */
setTimeout(() => {
  tvScreen.classList.remove("off");
  tvScreen.classList.add("on");
}, 300);

/* ===============================
   MANUAL CHANNEL CHANGE
================================ */
channelKnob.addEventListener("click", () => {
  currentTheme = (currentTheme + 1) % themes.length;
  loadTheme(currentTheme);
  resetSlideshow();
});

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
