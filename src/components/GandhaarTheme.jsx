import { useEffect, useState } from "react";

const images = [
  "/src/images/dance.jpeg",
  "/src/images/sing.jpeg",
];

const GandhaarTheme = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [powerOn, setPowerOn] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((i) => (i + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setPowerOn(true), 300);
    return () => clearTimeout(t);
  }, []);

  const TvKnob = ({ label }) => (
    <svg className="knob" viewBox="0 0 50 50">
      <title>{label}</title>
      <circle cx="25" cy="25" r="23" fill="#aaa" stroke="#777" strokeWidth="2.5" />
      <circle cx="35" cy="15" r="5" fill="#333" />
    </svg>
  );

  const SpeakerGrill = () => (
    <svg className="tv-speaker-grill" viewBox="0 0 500 50">
      <rect width="500" height="50" rx="5" fill="#3e2723" />
      {[...Array(30)].map((_, i) => (
        <rect key={i} x={10 + i * 15} y="5" width="5" height="40" rx="1" fill="#5d4037" />
      ))}
    </svg>
  );

  return (
    <div className="homepage-container">
      <style>{`
        html, body {
          margin: 0;
          padding: 0;
          overflow-x: hidden;
        }

        .homepage-container {
          width: 100%;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
        }

        .vintage-tv {
          width: min(94vw, 1400px);
          aspect-ratio: 16 / 9;
          background: #6d4c41;
          border: 14px solid #5d4037;
          border-radius: 20px;
          padding: 18px;
          box-shadow: 0 15px 30px rgba(0,0,0,.5);
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* SCREEN */
        .tv-screen-frame {
          width: 96%;
          height: 78%;
          background: #222;
          border-radius: 10px;
          overflow: hidden;
          transform-origin: center;
          transition: transform .7s ease, filter .4s;
        }

        .tv-screen-frame.on {
          transform: scale(1);
          filter: brightness(1);
        }

        .tv-screen-frame.off {
          transform: scale(.2);
          filter: brightness(0);
        }

        .tv-screen-content {
          width: 100%;
          height: 100%;
          position: relative;
        }

        .tv-image {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0;
          transition: opacity 1s;
          filter: brightness(55%) contrast(110%);
        }

        .tv-image.active {
          opacity: 1;
        }

        .tv-noise {
          position: absolute;
          inset: 0;
          background: url("https://images.unsplash.com/photo-1580243117731-a108c2953e2c");
          opacity: .12;
          pointer-events: none;
        }

        .tv-ui {
          width: 90%;
          margin-top: 14px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .tv-knobs {
          display: flex;
          gap: 20px;
        }

        .knob {
          width: 38px;
          height: 38px;
        }

        .tv-speaker-grill {
          width: 75%;
          height: 45px;
        }

        /* 📱 MOBILE FIX */
        @media (max-width: 768px) {
          .vintage-tv {
            height:50vh;
            width: 96vw;
          }

          .tv-screen-frame {
            width: 100%;
            height: 100%;
            filter: brightness(1);
          }

          .tv-ui {
            margin-top: 8px;
            margin-right: 2px;
          }

          .tv-speaker-grill {
            width: 70%;
          }
        }
      `}</style>

      <div className="vintage-tv">
        <div className={`tv-screen-frame ${powerOn ? "on" : "off"}`}>
          <div className="tv-screen-content">
            {images.map((img, i) => (
              <img key={i} src={img} className={`tv-image ${i === currentImageIndex ? "active" : ""}`} />
            ))}
          </div>
          <div className="tv-noise" />
        </div>

        <div className="tv-ui">
          <div className="tv-knobs">
            <TvKnob label="CH" />
            <TvKnob label="VOL" />
          </div>
          <SpeakerGrill />
        </div>
      </div>
    </div>
  );
};

export default GandhaarTheme;