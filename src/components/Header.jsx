import { useEffect } from "react";
import "../style/Header.css";
import bg from '../assets/images/header/bg.jpeg';
import bgg from '../assets/images/header/bgg.jpg';
import disk from '../assets/images/header/disk.png';
import tv from '../assets/images/header/tv.png';
import tv1 from '../assets/images/header/tv1.png';
import word from '../assets/images/header/word.png';
import word2 from '../assets/images/header/word2.png';
import video1 from '../assets/videos/video1.mp4';
import video2 from '../assets/videos/video2.mp4';
import video3 from '../assets/videos/video3.mp4';
import video4 from '../assets/videos/video4.mp4';


export default function Home() {
  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    if (isMobile) {
      runMobileJS();
    } else {
      runWebsiteJS();
    }

    const handleResize = () => location.reload();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* =========================================================
         🌐 WEBSITE LAYOUT (DESKTOP)
      ========================================================= */}
      <div id="desktop-layout">
        <div className="scene">
          <img src={bgg} className="bg1" />

          <img src={word} className="disk-word" />
          <img src={word2} className="disk-word-2" />

          <img src={disk} className="disk" />
          <img src={tv1} className="tv" />

          <video className="tv-video tv-video-1" src={video1} autoPlay muted loop playsInline />
          <video className="tv-video tv-video-2" src={video2} autoPlay muted loop playsInline />
          <video className="tv-video tv-video-3" src={video3} autoPlay muted loop playsInline />
          <video className="tv-video tv-video-4" src={video4} autoPlay muted loop playsInline />
        </div>
      </div>

      {/* =========================================================
         📱 MOBILE LAYOUT
      ========================================================= */}
      <div id="mobile-layout">
        <div className="scene">
          <img src={bg} className="bg1" />

          <img src={word} className="disk-word" />
          <img src={word2} className="disk-word-2" />

          <img src={disk} className="disk" />
          <img src={tv} className="tv" />

          <video className="tv-video tv-video-1" src={video1} autoPlay muted loop playsInline />
          <video className="tv-video tv-video-2" src={video2} autoPlay muted loop playsInline />
          <video className="tv-video tv-video-3" src={video3} autoPlay muted loop playsInline />
          <video className="tv-video tv-video-4" src={video4} autoPlay muted loop playsInline />
        </div>
      </div>
    </>
  );
}

/* =========================================================
   🌐 WEBSITE JS (UNCHANGED LOGIC)
========================================================= */
function runWebsiteJS() {
  const scene = document.querySelector("#desktop-layout .scene");
  if (!scene) return;

  const disk = scene.querySelector(".disk");
  const tv = scene.querySelector(".tv");
  const videos = scene.querySelectorAll(".tv-video");

  scene.addEventListener("mousemove", (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 30;
    const y = (e.clientY / window.innerHeight - 0.5) * 30;

    scene.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
    disk.style.transform = `translateZ(120px) rotate(${Date.now() * 0.03}deg)`;
    tv.style.transform = `translateZ(200px) translateY(-10px)`;
  });

  scene.addEventListener("mouseleave", () => {
    scene.style.transform = "rotateX(0deg) rotateY(0deg)";
    disk.style.transform = "translateZ(0)";
    tv.style.transform = "translateZ(0)";
  });

  videos.forEach((video) => {
    video.addEventListener("mouseenter", () => {
      video.muted = false;
      video.play();
    });

    video.addEventListener("mouseleave", () => {
      video.muted = true;
    });
  });
}

/* =========================================================
   📱 MOBILE JS (UNCHANGED LOGIC)
========================================================= */
function runMobileJS() {
  const scene = document.querySelector("#mobile-layout .scene");
  if (!scene) return;

  const tv = scene.querySelector(".tv");
  const videos = scene.querySelectorAll(".tv-video");
  const words = scene.querySelectorAll(".disk-word, .disk-word-2");

  let popped = false;

  tv.addEventListener("click", () => {
    popped = !popped;
    tv.classList.toggle("pop", popped);
  });

  videos.forEach((video) => {
    let soundOn = false;

    video.addEventListener("click", () => {
      soundOn = !soundOn;
      video.muted = !soundOn;
      soundOn ? video.play() : video.pause();
    });
  });

  words.forEach((word) => {
    word.addEventListener("click", () => {
      word.classList.add("word-pop");
      setTimeout(() => word.classList.remove("word-pop"), 2000);
    });
  });
}