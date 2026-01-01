import React, { useState, useEffect } from 'react';
import dance from "../assets/dance.jpg";
import sing from "../assets/sing.jpg";

const images = [
    "/src/assets/dance.jpg",
    "/src/assets/sing.jpg",
    // Add more images here if needed
];



const Homepage = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [powerOn, setPowerOn] = useState(false);

    // Effect for the automatic slideshow
    useEffect(() => {
        // Set up the interval to change the image every 4 seconds (4000ms)
        const intervalId = setInterval(() => {
            setCurrentImageIndex(prevIndex => 
                (prevIndex + 1) % images.length
            );
        }, 3000);
        

        // Clean up the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, [images.length]);

    // ⚡ TV power-on effect (RUNS ONCE)
    useEffect(() => {
        const timer = setTimeout(() => {
            setPowerOn(true);
        }, 300);

        return () => clearTimeout(timer);
    }, []);

    

    // --- SVG Components ---
    const TvKnob = ({ label, className }) => (
        <svg 
            className={`knob ${className}`} 
            viewBox="0 0 50 50" 
            xmlns="http://www.w3.org/2000/svg"
        >
            <title>{label}</title>
            {/* Base Knob Circle */}
            <circle cx="25" cy="25" r="23" fill="#aaa" stroke="#777" strokeWidth="2.5" />
            {/* Inner Indicator Dot/Line */}
            <circle cx="35" cy="15" r="5" fill="#333" />
            {/* Decorative Shadow/Highlight */}
            <defs>
                <radialGradient id="knob-shine" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                    <stop offset="0%" style={{stopColor: "rgba(255,255,255,0.4)"}} />
                    <stop offset="100%" style={{stopColor: "rgba(255,255,255,0)"}} />
                </radialGradient>
            </defs>
            <circle cx="25" cy="25" r="23" fill="url(#knob-shine)" />
            
        </svg>
    );

    const SpeakerGrill = () => (
        <svg 
            className="tv-speaker-grill" 
            viewBox="0 0 500 50" 
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect width="500" height="50" rx="5" fill="#3e2723" />
            
            {/* Grill Lines (Adjust count based on size) */}
            {[...Array(30)].map((_, i) => (
                <rect 
                    key={i} 
                    x={10 + i * 15} 
                    y="5" 
                    width="5" 
                    height="40" 
                    rx="1"
                    fill="#5d4037"
                />
            ))}
        </svg>
    );
    // --- End SVG Components ---

    return (
  <div className="homepage-container">
    <style jsx="true">{`
      /* ===============================
         GLOBAL CONTAINER
      =============================== */
      .homepage-container {
        width: 100vw;
        height: 100vh;

        display: flex;
        justify-content: center;
        align-items: center;

        padding: 3vw;              /* controlled margin */
        box-sizing: border-box;

        overflow: hidden;
        font-family: 'Arial', sans-serif;
        background-color: transparent;
      }

      /* ===============================
         TV CASING
      =============================== */
      .vintage-tv {
        width: 100%;
        height: auto;

        max-width: 1200px;
        max-height: calc(100vh - 6vw); /* prevents overflow */

        aspect-ratio: 16 / 9;

        background-color: #6d4c41;
        border: 14px solid #5d4037;
        border-radius: 20px;

        position: relative;

        box-shadow:
          0 15px 30px rgba(0, 0, 0, 0.5),
          inset 0 0 50px rgba(0, 0, 0, 0.2);

        padding: 18px;

        display: flex;
        flex-direction: column;
        align-items: center;
      }

      /* ===============================
         TV SCREEN
      =============================== */
      .tv-screen-frame {
        width: 92%;
        height: 82%;

        background-color: #222;
        border: 5px solid #444;
        border-radius: 10px;

        box-shadow: inset 0 0 15px rgba(0, 0, 0, 0.8);

        position: relative;
        overflow: hidden;

        transform: scale(0.15);
        filter: brightness(0);
        transition: transform 0.8s ease-out, filter 0.4s ease-in;
      }

      .tv-screen-frame.on {
        transform: scale(1);
        filter: brightness(1);
        animation: crtFlash 0.15s ease-in;
      }

      .tv-screen-frame.off {
        transform: scale(0.15);
        filter: brightness(0);
      }

      @keyframes crtFlash {
        0% { filter: brightness(5); }
        100% { filter: brightness(1); }
      }

      /* ===============================
         SCREEN CONTENT
      =============================== */
      .tv-screen-content {
        position: relative;
        width: 100%;
        height: 100%;
      }

      .tv-image {
        position: absolute;
        inset: 0;

        width: 100%;
        height: 100%;
        object-fit: cover;

        opacity: 0;
        transition: opacity 1s ease-in-out;

        filter: brightness(52%) contrast(110%) saturate(90%);
      }

      .tv-image.active {
        opacity: 1;
      }

      /* ===============================
         STATIC NOISE
      =============================== */
      .tv-noise {
        position: absolute;
        inset: 0;
        z-index: 6;
        pointer-events: none;

        background-image: url("https://images.unsplash.com/photo-1580243117731-a108c2953e2c?auto=format&fit=crop&w=800&q=60");
        background-size: 150%;
        background-position: 50% 50%;
        background-repeat: no-repeat;

        opacity: 0.13;
        animation: tvNoise 0.25s steps(1, start) infinite;
      }

      @keyframes tvNoise {
        0%   { background-position: 50% 50%; }
        10%  { background-position: 60% 40%; }
        20%  { background-position: 35% 55%; }
        30%  { background-position: 45% 65%; }
        40%  { background-position: 70% 35%; }
        50%  { background-position: 52% 54%; }
        60%  { background-position: 40% 35%; }
        70%  { background-position: 36% 63%; }
        80%  { background-position: 52% 65%; }
        90%  { background-position: 38% 64%; }
        100% { background-position: 51% 60%; }
      }

      /* ===============================
         TV UI
      =============================== */
      .tv-ui {
        width: 85%;
        padding-top: 20px;

        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .tv-knobs {
        display: flex;
        gap: 25px;
        flex-direction: row;
      }

      .knob-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .knob {
        width: 40px;
        height: 40px;
        margin-top: 10px;
        cursor: pointer;
      }

      .knob-label {
        color: #fff;
        font-size: 11px;
        margin-bottom: -5px;
        text-align: center;
      }

      .tv-speaker-grill {
        width: 80%;
        height: 50px;

        border-radius: 5px;
        box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5);
      }

      /* ===============================
         RESPONSIVE
      =============================== */
      @media (max-width: 768px) {
        .homepage-container {
          padding: 2vw;
        }

        .vintage-tv {
          max-height: calc(100vh - 4vw);
          padding: 12px;
        }

        .tv-screen-frame {
          height: 80%;
        }
      }
        /* ===============================
   TV OVERLAY TEXT
=============================== */
.tv-overlay-text {
  position: absolute;
  inset: 0;
  z-index: 4;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  text-align: center;
  pointer-events: none;
  padding: 0 5%;
}

.college-name {
  color: #f5f5f5;
  font-size: clamp(16px, 2vw, 22px);
  letter-spacing: 1px;
  margin-bottom: 10px;
  text-shadow: 0 0 8px rgba(0, 0, 0, 0.8);
}

.fest-name {
  color: #ffffff;
  font-size: clamp(32px, 5vw, 56px);
  font-weight: 700;
  letter-spacing: 3px;++++  
  text-transform: uppercase;
  text-shadow: 
    0 0 10px rgba(0, 0, 0, 0.9),
    0 0 20px rgba(255, 255, 255, 0.2);
}

    `}</style>


            <div className="vintage-tv">
                {/* <div className="fest-branding">GANDHAR '26</div> */}

                
                <div className={`tv-screen-frame ${powerOn ? "on" : "off"}`}>
                    <div className="tv-screen-content">
                        {images.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`Fest Moment ${index + 1}`}
                                className={`tv-image ${index === currentImageIndex ? 'active' : ''}`}
                                style={{ zIndex: images.length - index }}
                            />
                        ))}
                    </div>
                    <div className="tv-overlay-text">
  <div className="college-name">
    MKSSS's Cummins College of Engineering for Women, Pune
  </div>
  <div className="fest-name">
    Gandhar 2026
  </div>
</div>

                    <div className="tv-noise"></div>
                </div>

                <div className="tv-ui">
                    <div className="tv-knobs">
                        <div className="knob-wrapper">
                            <div className="knob-label">CH</div>
                            <TvKnob label="Channel Selector" className="channel" />
                        </div>
                        <div className="knob-wrapper">
                            <div className="knob-label">VOL</div>
                            <TvKnob label="Volume Control" className="volume" />
                        </div>
                    </div>
                    
                    <SpeakerGrill />
                </div>
            </div>
        </div>
    );
};

export default Homepage;