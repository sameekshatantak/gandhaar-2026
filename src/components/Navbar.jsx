import React, { useEffect, useRef, useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const bodyMainRef = useRef(null);

  // Helper to handle smooth scrolling to sections
  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      if (window.innerWidth <= 768) setIsOpen(false); // Close on mobile after click
    }
  };

  // 3D Tilt Logic from your code
  useEffect(() => {
    if (window.innerWidth <= 768 || !isOpen) return;

    const handleMouseMove = (e) => {
      const ax = -((window.innerWidth / 2 - e.pageX) / 120);
      if (bodyMainRef.current) {
        bodyMainRef.current.style.transform = `rotate3D(0,1,0,${ax}deg)`;
        bodyMainRef.current.style.marginLeft = `${ax / 5}px`;
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, [isOpen]);

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }

        /* ---------- DESKTOP SIDEBAR (Laptop Left) ---------- */
        .desktop-sidebar {
          position: fixed;
          top: 0;
          left: 0;
          height: 100vh;
          width: 80px;
          background: #0f0f0f;
          z-index: 1200;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-top: 24px;
          border-right: 1px solid #222;
        }

        .desktop-power-btn {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: #d32f2f;
          color: #fff;
          border: none;
          font-size: 20px;
          cursor: pointer;
          animation: bounce 1.6s infinite;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 15px rgba(211, 47, 47, 0.4);
        }

        @keyframes bounce {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        .desktop-shortcuts {
          margin-top: 40px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .desktop-shortcuts button {
          width: 60px;
          height: 60px;
          border-radius: 12px;
          background: #202020;
          color: #fff;
          border: 1px solid #333;
          font-size: 10px;
          font-weight: bold;
          text-transform: uppercase;
          cursor: pointer;
          transition: 0.2s;
        }
        .desktop-shortcuts button:hover { background: #333; border-color: #555; }

        /* ---------- REMOTE CONTAINER (Fixed Layout) ---------- */
        .body-container {
          width: 226px;
          height: 852px;
          position: fixed;
          z-index: 1100;
          transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        /* Positioning Logic */
        @media (min-width: 769px) {
          .body-container {
            top: 50%;
            left: ${isOpen ? "100px" : "-300px"}; /* Slides from left */
            transform: translateY(-50%);
            opacity: ${isOpen ? "1" : "0"};
          }
          .mobile-power-toggle { 
     display: none !important; 
  }
        }

        @media (max-width: 768px) {
          .desktop-sidebar { display: none; }
          .body-container {
            left: 50%;
            /* Responsive Scaling: Prevents remote from going off screen */
            bottom: ${isOpen ? "20px" : "-100%"}; 
            transform: translateX(-50%) scale(0.7); /* Scale down for mobile height */
            transform-origin: bottom;
            opacity: ${isOpen ? "1" : "0"};
          }
        }

        /* ---------- YOUR EXACT REMOTE DESIGN ---------- */
        .body-main-border {
          padding: 1px;
          border-radius: 42px;
          background: linear-gradient(180deg, #d6d7d9, #ffffff, #818183);
          filter: drop-shadow(0px 140px 150px rgba(21, 31, 47, 0.55));
          height: 100%;
        }

        .body-main {
          height: 100%;
          border-radius: 41px;
          display: flex;
          flex-direction: column;
          align-items: center;
          background: linear-gradient(180deg, #e9eaec, #959699);
          transition: transform 0.1s ease-out;
        }

        .container-btns-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          padding: 25px;
        }

        .btn-power {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: #000;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #fff;
        }

        .mic-outer {
          flex: 1;
          height: 8px;
          margin: 0 20px;
          padding: 2px;
          border-radius: 20px;
          background: linear-gradient(180deg, #6d6f72, #fefeff);
        }

        .mic-inner {
          width: 100%;
          height: 100%;
          border-radius: 20px;
          background: #383838;
        }

        .container-btns-main {
          width: 100%;
          height: 194px;
          padding: 13px;
        }

        .btn-main-outer {
          width: 100%;
          height: 100%;
          border-radius: 1000px;
          background: #202020;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          padding: 42px;
        }

        .btn-main-inner {
          width: 100%;
          height: 100%;
          border-radius: 1000px;
          background: linear-gradient(180deg, #191919, #3e3e3e);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-size: 18px;
          font-weight: 700;
          cursor: pointer;
        }

        .dot { width: 4px; height: 4px; border-radius: 50%; background: #dfdfdf; position: absolute; }
        .dot-top { top: 9px; } .dot-right { right: 9px; } .dot-bottom { bottom: 9px; } .dot-left { left: 9px; }

        .container-btns-bottom {
          display: flex;
          justify-content: space-between;
          width: 100%;
          padding: 24px;
        }

        .btns-col-left, .btns-col-right {
          width: 78px;
          display: flex;
          flex-direction: column;
        }

        .btn-basic, .btn-volume {
          background: #202020;
          border-radius: 1000px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 14px;
          color: #dfdfdf;
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          cursor: pointer;
          border: none;
        }

        .btn-basic { height: 78px; text-align: center; padding: 5px; }

        .btn-volume {
          flex: 1;
          padding: 24px 0;
          flex-direction: column;
          justify-content: space-between;
        }

        .btn-side {
          width: 4px;
          height: 93px;
          background: #d9dadc;
          position: absolute;
          right: -4px;
          top: 133px;
        }

        /* ---------- MOBILE POWER TOGGLE ---------- */
        .mobile-power-toggle {
          position: fixed;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%);
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: #d32f2f;
          color: #fff;
          border: none;
          font-size: 24px;
          z-index: 1300;
          cursor: pointer;
          animation: bounce 1.6s infinite;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        }
          /* 1. Add smooth transition to all button types */
.desktop-shortcuts button,
.btn-basic,
.btn-main-inner,
.btn-power,
.desktop-power-btn,
.mobile-power-toggle,
.btn-volume div {
    transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275), filter 0.2s ease;
}

/* 2. Enlarge effect on Hover */
.desktop-shortcuts button:hover,
.btn-basic:hover,
.btn-main-inner:hover,
.btn-power:hover,
.mobile-power-toggle:hover {
    transform: scale(1.1); /* Enlarges by 10% */
    filter: brightness(1.2); /* Makes it slightly glow/brighter */
    z-index: 10; /* Ensures it stays on top while enlarging */
}

/* 3. Specialized hover for the desktop power button 
   (Since it already has a bounce animation, we combine them) */
.desktop-power-btn:hover {
    filter: brightness(1.2);
    box-shadow: 0 0 20px rgba(211, 47, 47, 0.6);
}

/* 4. Small click effect (Shrink slightly when pressed) */
.desktop-shortcuts button:active,
.btn-basic:active,
.btn-main-inner:active,
.btn-power:active {
    transform: scale(0.95);
}
      `}</style>

      {/* DESKTOP SIDEBAR */}
      <div className="desktop-sidebar">
        <button className="desktop-power-btn" onClick={() => setIsOpen(!isOpen)}>⏻</button>
        <div className="desktop-shortcuts">
          <button onClick={() => scrollTo('home')}>Home</button>
          <button onClick={() => scrollTo('themes')}>Themes</button>
          <button onClick={() => scrollTo('schedule')}>Schedule</button>
        </div>
      </div>

      {/* MOBILE POWER TOGGLE */}
      {!isOpen && (
        <button className="mobile-power-toggle" onClick={() => setIsOpen(true)}>⏻</button>
      )}

      {/* REMOTE CONTROL */}
      <div className="body-container">
        <div className="body-main-border">
          <div className="body-main" ref={bodyMainRef}>
            <div className="container-btns-top">
              <div style={{width: '38px'}}></div> {/* Spacer */}
              <div className="mic-outer"><div className="mic-inner" /></div>
              <button className="btn-power" onClick={() => setIsOpen(false)}>⏻</button>
            </div>

            <div className="container-btns-main">
              <div className="btn-main-outer">
                <div className="dot dot-top" />
                <div className="dot dot-right" />
                <div className="dot dot-bottom" />
                <div className="dot dot-left" />
                <div className="btn-main-inner" onClick={() => scrollTo('home')}>Home</div>
              </div>
            </div>

            <div className="container-btns-bottom">
              <div className="btns-col-left">
                <button className="btn-basic" onClick={() => scrollTo('events')}>Events</button>
                <button className="btn-basic" onClick={() => scrollTo('schedule')}>Schedule</button>
                <button className="btn-basic" onClick={() => scrollTo('about')}>About Us</button>
                <button className="btn-basic" onClick={() => scrollTo('themes')}>Themes</button>
              </div>

              <div className="btns-col-right">
                <button className="btn-basic" onClick={() => scrollTo('lineup')}>Star Lineup</button>
                <div className="btn-volume">
                  <div style={{cursor: 'pointer'}}>＋</div>
                  <div style={{fontSize: '9px'}}>VOL</div>
                  <div style={{cursor: 'pointer'}}>－</div>
                </div>
                <button className="btn-basic" onClick={() => scrollTo('team')}>Meet Team</button>
              </div>
            </div>
          </div>
        </div>
        <div className="btn-side"></div>
      </div>
    </>
  );
}