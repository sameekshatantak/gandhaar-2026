import { useEffect } from "react";
import "../style/Header.css";

export default function Header() {
  useEffect(() => {
    // ===============================
    // VIDEO HOVER AUDIO LOGIC
    // ===============================
    const tvVideos = document.querySelectorAll(".tv-video");

    tvVideos.forEach((video) => {
      const onEnter = () => {
        video.muted = false;
        video.volume = 1;
        video.play();
      };

      const onLeave = () => {
        video.muted = true;
      };

      video.addEventListener("mouseenter", onEnter);
      video.addEventListener("mouseleave", onLeave);

      return () => {
        video.removeEventListener("mouseenter", onEnter);
        video.removeEventListener("mouseleave", onLeave);
      };
    });

    // ===============================
    // 3D SCENE PARALLAX
    // ===============================
    const scene = document.querySelector(".scene");
    const disk = document.querySelector(".disk");
    const tv = document.querySelector(".tv");

    if (!scene || !disk || !tv) return;

    const handleMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;

      scene.style.transform = `
        rotateY(${x}deg)
        rotateX(${-y}deg)
      `;

      disk.style.transform = `
        translateZ(120px)
        rotateZ(${Date.now() * 0.03}deg)
      `;

      tv.style.transform = `
        translateZ(200px)
        translateY(-10px)
      `;
    };

    const handleLeave = () => {
      scene.style.transform = "rotateX(0deg) rotateY(0deg)";
      disk.style.transform = "translateZ(0)";
      tv.style.transform = "translateZ(0)";
    };

    scene.addEventListener("mousemove", handleMove);
    scene.addEventListener("mouseleave", handleLeave);

    return () => {
      scene.removeEventListener("mousemove", handleMove);
      scene.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <div className="header-root">
      <div className="scene">
        <img src="../src/assets/images/header/bgg.jpg" className="bg" alt="" />

        {/* WORDS */}
        <img src="../src/assets/images/header/word.png" className="disk-word" alt="" />
        <img src="../src/assets/images/header/word2.png" className="disk-word-2" alt="" />

        {/* OBJECTS */}
        <img src="../src/assets/images/header/disk.png" className="disk" alt="" />
        <img src="../src/assets/images/header/tv.png" className="tv" alt="" />

        {/* VIDEOS */}
        <video className="tv-video tv-video-1" src="../src/assets/videos/video1.mp4" autoPlay muted loop playsInline />
        <video className="tv-video tv-video-2" src="../src/assets/videos/video2.mp4" autoPlay muted loop playsInline />
        <video className="tv-video tv-video-3" src="../src/assets/videos/video3.mp4" autoPlay muted loop playsInline />
        <video className="tv-video tv-video-4" src="../src/assets/videos/video4.mp4" autoPlay muted loop playsInline />
      </div>
    </div>
  );
}
