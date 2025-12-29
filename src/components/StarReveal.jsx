import { useState } from "react";
import starImg from "../assets/star.jpg";

import story1 from "../assets/stories/story1.jpg";
import story2 from "../assets/stories/story2.jpg";
import story3 from "../assets/stories/story3.jpg";
import story4 from "../assets/stories/story4.jpg";
import story5 from "../assets/stories/story5.jpg";
import story6 from "../assets/stories/story6.jpg";
import story7 from "../assets/stories/story7.jpg";
import story8 from "../assets/stories/story8.jpg";
import story9 from "../assets/stories/story9.jpg";
import story10 from "../assets/stories/story10.jpg";
import story11 from "../assets/stories/story11.jpg";
import story12 from "../assets/stories/story12.jpg";
import story13 from "../assets/stories/story13.jpg";
import story14 from "../assets/stories/story14.jpg";
import story15 from "../assets/stories/story15.jpg";
import story16 from "../assets/stories/story16.jpg";
import story17 from "../assets/stories/story17.jpg";
import story18 from "../assets/stories/story18.jpg";
import story19 from "../assets/stories/story19.jpg";
import story20 from "../assets/stories/story20.jpg";

function StarReveal() {

  // 🔹 YOU manually control reveal
  const [currentStories] = useState(50);

  // 🔹 Total needed for 100% reveal
  const totalStoriesForFullReveal = 200;

  // 🔹 Percentage calculation
  const revealPercent = Math.min(
    (currentStories / totalStoriesForFullReveal) * 100,
    95
  );

  // 🔹 Blur logic
  const maxBlur = 20;
  const blurValue = maxBlur - (maxBlur * revealPercent) / 100;

  // 🔹 Stories data
  const stories = [
    { img: story1, username: "user1" },
    { img: story2, username: "user2" },
    { img: story3, username: "user3" },
    { img: story4, username: "user4" },
    { img: story5, username: "user5" },
    { img: story6, username: "user6" },
    { img: story7, username: "user7" },
    { img: story8, username: "user8" },
    { img: story9, username: "user9" },
    { img: story10, username: "user10" },
    { img: story11, username: "user11" },
    { img: story12, username: "user12" },
    { img: story13, username: "user13" },
    { img: story14, username: "user14" },
    { img: story15, username: "user15" },
    { img: story16, username: "user16" },
    { img: story17, username: "user17" },
    { img: story18, username: "user18" },
    { img: story19, username: "user19" },
    { img: story20, username: "user20" }
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1c1c1c, #2b1055, #000000)",
        color: "#ffffff",
        padding: "30px 15px",
        fontFamily: "'Permanent Marker', cursive",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      {/* Google Font */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap');
        `}
      </style>

      {/* Heading */}
      <h1
        style={{
          fontSize: "clamp(2.4rem, 7vw, 3.4rem)",
          letterSpacing: "2px",
          marginBottom: "5px"
        }}
      >
        Gandhaar 2026 ⭐
      </h1>

      <h3
        style={{
          opacity: 0.9,
          marginBottom: "25px",
          letterSpacing: "1px"
        }}
      >
        Guess the Star
      </h3>

      {/* TV Frame */}
      <div
        style={{
          width: "85%",
          maxWidth: "1100px",
          background: "#111",
          borderRadius: "30px",
          padding: "20px",
          boxShadow: "0 0 40px rgba(255, 140, 0, 0.35)",
          position: "relative",
          marginBottom: "10px"
        }}
      >
        {/* TV Screen */}
        <div
          style={{
            background: "#000",
            borderRadius: "20px",
            overflow: "hidden",
            border: "4px solid #222"
          }}
        >
          <img
            src={starImg}
            alt="Star"
            style={{
              width: "100%",
              display: "block",
              filter: `blur(${blurValue}px)`,
              transition: "filter 0.6s ease"
            }}
          />
        </div>

        {/* Speaker Dots */}
        <div
          style={{
            position: "absolute",
            bottom: "8px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: "6px"
          }}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <span
              key={i}
              style={{
                width: "6px",
                height: "6px",
                background: "#444",
                borderRadius: "50%"
              }}
            />
          ))}
        </div>
      </div>

      {/* TV Stand */}
      <div
        style={{
          width: "140px",
          height: "10px",
          background: "#222",
          borderRadius: "0 0 12px 12px",
          marginBottom: "25px"
        }}
      />

      {/* Progress Bar */}
      <div
        style={{
          width: "90%",
          maxWidth: "420px",
          height: "12px",
          background: "rgba(255,255,255,0.2)",
          borderRadius: "20px",
          overflow: "hidden"
        }}
      >
        <div
          style={{
            width: `${revealPercent}%`,
            height: "100%",
            background: "linear-gradient(90deg, #ff9800, #ff5722)",
            transition: "width 0.6s ease"
          }}
        />
      </div>

      <p style={{ marginTop: "10px", letterSpacing: "1px" }}>
        🔓 Reveal Progress: {Math.floor(revealPercent)}%
      </p>

      {/* Stories Section */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(70px, 1fr))",
          gap: "15px",
          width: "100%",
          maxWidth: "420px",
          marginTop: "30px"
        }}
      >
        {stories.map((story, index) => (
          <div key={index} style={{ textAlign: "center" }}>
            <img
              src={story.img}
              alt="story"
              style={{
                width: "70px",
                height: "70px",
                objectFit: "cover",
                borderRadius: "12px",
                border: "2px solid rgba(255,255,255,0.3)"
              }}
            />
            <p
              style={{
                fontSize: "11px",
                marginTop: "6px",
                letterSpacing: "0.5px"
              }}
            >
              @{story.username}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
}

export default StarReveal;
