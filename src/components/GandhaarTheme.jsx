import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import day1 from "../assets/images/GandhaarTheme/day1.jpg";
import day2 from "../assets/images/GandhaarTheme/day2.jpg";
import day3 from "../assets/images/GandhaarTheme/day3.png";
import day4 from "../assets/images/GandhaarTheme/day4.png";
import "../style/GandhaarTheme.css";



const themes = [
  { image: day1, audio: "/audio/day1.mpeg" },
  { image: day2, audio: "/audio/day2.mp3" },
  { image: day3, audio: "/audio/day3.mpeg" },
  { image: day4, audio: "/audio/day4.mpeg" },
];



const GandhaarTheme = () => {
  const [currentTheme, setCurrentTheme] = useState(0);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(true);
  const slideshowRef = useRef(null);
  const currentAudio = useRef(null);

  const screenContentRef = useRef(null);
  const tvScreenRef = useRef(null);

  // ---------------- IMAGE CROSSFADE ----------------
  const crossFadeImage = (newSrc) => {
    const container = screenContentRef.current;
    if (!container) return;

    const currentImg = container.querySelector(".tv-image.active");
    const nextImg = document.createElement("img");
    nextImg.src = newSrc;
    nextImg.className = "tv-image";
    container.appendChild(nextImg);

    void nextImg.offsetWidth; // trigger reflow
    nextImg.classList.add("active");

    if (currentImg) currentImg.classList.remove("active");

    setTimeout(() => {
      if (currentImg) currentImg.remove();
    }, 1000);
  };

  // ---------------- AUDIO CONTROL ----------------
  const fadeOutAudio = (audio, duration = 800) => {
    if (!audio) return;
    const step = audio.volume / (duration / 50);
    const fade = setInterval(() => {
      audio.volume = Math.max(0, audio.volume - step);
      if (audio.volume <= 0) {
        audio.pause();
        clearInterval(fade);
      }
    }, 50);
  };

  const fadeInAudio = (audio, duration = 800) => {
    audio.play();
    const step = (0.8 - audio.volume) / (duration / 50);
    const fade = setInterval(() => {
      audio.volume = Math.min(0.8, audio.volume + step);
      if (audio.volume >= 0.8) clearInterval(fade);
    }, 50);
  };

  const playThemeAudio = (src) => {
    if (!audioEnabled || !src) return;

    if (currentAudio.current && currentAudio.current.src.includes(src)) {
      fadeInAudio(currentAudio.current);
      return;
    }

    if (currentAudio.current) fadeOutAudio(currentAudio.current);

    currentAudio.current = new Audio(src);
    currentAudio.current.loop = true;
    currentAudio.current.volume = 0;

    fadeInAudio(currentAudio.current);
  };

  // ---------------- LOAD THEME ----------------
  const loadTheme = (index) => {
    const theme = themes[index];
    setOverlayVisible(false);

    setTimeout(() => {
      crossFadeImage(theme.image);
      setOverlayVisible(true);

      if (audioEnabled) playThemeAudio(theme.audio);
    }, 300);
  };

  // ---------------- SLIDESHOW ----------------
  const startSlideshow = () => {
    slideshowRef.current = setInterval(() => {
      setCurrentTheme((prev) => (prev + 1) % themes.length);
    }, 10000);
  };

  const resetSlideshow = () => {
    clearInterval(slideshowRef.current);
    startSlideshow();
  };

  // ---------------- INIT ----------------
  useEffect(() => {
    const container = screenContentRef.current;
    if (container) {
      const img = document.createElement("img");
      img.src = themes[0].image;
      img.className = "tv-image active";
      container.appendChild(img);
    }

    setTimeout(() => {
      if (tvScreenRef.current) {
        tvScreenRef.current.classList.remove("off");
        tvScreenRef.current.classList.add("on");
      }
    }, 300);

    startSlideshow();

    return () => clearInterval(slideshowRef.current);
  }, []);

  // Update theme when currentTheme changes
  useEffect(() => {
    loadTheme(currentTheme);
  }, [currentTheme]);

  // ---------------- HANDLERS ----------------
  const handleChannelClick = () => {
    setCurrentTheme((prev) => (prev + 1) % themes.length);
    resetSlideshow();
  };

  const handleVolumeClick = () => {
    setAudioEnabled((prev) => {
      const newState = !prev;
      if (newState) {
        playThemeAudio(themes[currentTheme].audio);
      } else if (currentAudio.current) {
        fadeOutAudio(currentAudio.current);
      }
      return newState;
    });
  };

  // ---------------- MOBILE SWIPE ----------------
  let startX = 0;

  const handleTouchStart = (e) => {
    startX = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX;
    if (Math.abs(endX - startX) > 50) {
      setCurrentTheme((prev) => (prev + 1) % themes.length);
      resetSlideshow();
    }
  };

  return (
    <div className="homepage-container">
      <h1 className="gandhaar-title">Gandhaar Themes</h1>

      <div className="vintage-tv">
        <div
          className="tv-screen-frame off"
          id="tvScreen"
          ref={tvScreenRef}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="tv-screen-content" id="screenContent" ref={screenContentRef}></div>

          <div className={`tv-overlay-text ${overlayVisible ? "show" : ""}`}>
            <div className="fest-name" id="themeTitle"></div>
            <div className="college-name" id="themeSubtitle"></div>
          </div>

          <div className="tv-noise"></div>
        </div>

        <div className="tv-ui">
          <div className="tv-knobs">
            <div className="knob-wrapper">
              <div className="knob-label">CH</div>
              <svg className="knob" id="channelKnob" viewBox="0 0 50 50" onClick={handleChannelClick}>
                <circle cx="25" cy="25" r="23" fill="#aaa" stroke="#777" strokeWidth="2.5" />
                <circle cx="35" cy="15" r="5" fill="#333" />
              </svg>
            </div>

            <div className="knob-wrapper">
              <div className="knob-label">VOL</div>
              <svg className="knob" id="volumeKnob" viewBox="0 0 50 50" onClick={handleVolumeClick}>
                <circle cx="25" cy="25" r="23" fill="#aaa" stroke="#777" strokeWidth="2.5" />
                <circle cx="35" cy="15" r="5" fill="#333" />
              </svg>
              
            </div>
       
          </div>
              
          <div className="tv-speaker-grill"></div>
          
        </div>
       
      </div>
        <div className="click-hint">Hit VOL, hear the show!</div>

      <div className="set-top-box">
        <div className="stb-lights">
          <span className="stb-light red"></span>
          <span className="stb-light yellow"></span>
        </div>
        <Link to="/events" className="stb-cta">
    CTV
  </Link>

      </div>
    </div>
  );
};

export default GandhaarTheme;
