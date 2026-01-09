import React, { useEffect, useRef, useState } from "react";
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
  const screenContentRef = useRef(null);
  const tvScreenRef = useRef(null);

  // PRELOADING REFS
  const audioPlayers = useRef({}); // Stores preloaded Audio objects
  const currentAudio = useRef(null); // Tracks currently playing Audio object

  // ---------------- PRELOAD AUDIO ON MOUNT ----------------
  useEffect(() => {
    themes.forEach((theme) => {
      const audio = new Audio(theme.audio);
      audio.loop = true;
      audio.preload = "auto";
      audioPlayers.current[theme.audio] = audio;
    });

    // Cleanup: Stop all audio when component unmounts
    return () => {
      Object.values(audioPlayers.current).forEach(a => a.pause());
    };
  }, []);

  // ---------------- IMAGE CROSSFADE ----------------
  const crossFadeImage = (newSrc) => {
    const container = screenContentRef.current;
    if (!container) return;

    const currentImg = container.querySelector(".tv-image.active");
    const nextImg = document.createElement("img");
    nextImg.src = newSrc;
    nextImg.className = "tv-image";
    container.appendChild(nextImg);

    void nextImg.offsetWidth;
    nextImg.classList.add("active");

    if (currentImg) currentImg.classList.remove("active");
    setTimeout(() => { if (currentImg) currentImg.remove(); }, 1000);
  };

  // ---------------- INSTANT AUDIO CONTROL ----------------
  const playThemeAudio = (src) => {
    if (!audioEnabled || !src) return;

    // Stop previous track if it's different
    if (currentAudio.current && currentAudio.current !== audioPlayers.current[src]) {
      currentAudio.current.pause();
      currentAudio.current.currentTime = 0; // Reset to start
    }

    const player = audioPlayers.current[src];
    if (player) {
      currentAudio.current = player;
      player.volume = 0.8;
      player.play().catch(err => console.log("Autoplay prevented:", err));
    }
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

  useEffect(() => {
    loadTheme(currentTheme);
  }, [currentTheme]);

  // ---------------- HANDLERS ----------------
  const handleChannelClick = () => {
    setCurrentTheme((prev) => (prev + 1) % themes.length);
    resetSlideshow();
  };

  const handleVolumeClick = () => {
    const nextState = !audioEnabled;
    setAudioEnabled(nextState);

    if (nextState) {
      playThemeAudio(themes[currentTheme].audio);
    } else if (currentAudio.current) {
      currentAudio.current.pause();
    }
  };

  return (
    <div className="homepage-container">
      <h1 className="gandhaar-title">Gandhaar Themes</h1>

      <div className="vintage-tv">
        <div
          className="tv-screen-frame off"
          ref={tvScreenRef}
        >
          <div className="tv-screen-content" ref={screenContentRef}></div>
          <div className={`tv-overlay-text ${overlayVisible ? "show" : ""}`}>
            <div className="fest-name"></div>
            <div className="college-name"></div>
          </div>
          <div className="tv-noise"></div>
        </div>

        <div className="tv-ui">
          <div className="tv-knobs">
            <div className="knob-wrapper">
              <div className="knob-label">CH</div>
              <svg className="knob" viewBox="0 0 50 50" onClick={handleChannelClick}>
                <circle cx="25" cy="25" r="23" fill="#aaa" stroke="#777" strokeWidth="2.5" />
                <circle cx="35" cy="15" r="5" fill="#333" />
              </svg>
            </div>

            <div className="knob-wrapper">
              <div className="knob-label">VOL</div>
              <svg
                className="knob"
                viewBox="0 0 50 50"
                onClick={handleVolumeClick}
                style={{ cursor: 'pointer' }}
              >
                <circle
                  cx="25" cy="25" r="23"
                  fill={audioEnabled ? "#8B4513" : "#aaa"}
                  stroke={audioEnabled ? "#5D2E0A" : "#777"}
                  strokeWidth="2.5"
                />
                <circle cx="35" cy="15" r="5" fill={audioEnabled ? "#3E1F07" : "#333"} />
              </svg>
            </div>
          </div>
          <div className="tv-speaker-grill"></div>
        </div>
      </div>
      <div className="click-hint">Hit VOL, hear the show!</div>


    </div>
  );
};

export default GandhaarTheme;