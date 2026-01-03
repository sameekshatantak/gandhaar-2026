import React from "react";
import "../style/Theme.css";
import Remote from "./Remote"; // Assuming Remote.jsx is in the same folder
import CulturalPanel from "./CulturalPanel";
import Footer from "./Footer";
import GandhaarTheme from "./GandhaarTheme";
import StarReveal from "./StarReveal";
import AboutUs from "./AboutUs";
import StarLineUp from "./StarLineUp";
import DevTeam from "./DevTeam";

function Home() {
  return (
    <div className="main-container">
      {/* 1. Remote stays fixed on the left */}
      <div className="remote-area">
        <Remote />
      </div>

      {/* 2. TV Wrapper remains the central focus */}
      <div className="tv-wrapper">
        <div className="screen-container">
          <div className="crt-overlay"></div>
          <div className="broadcast-content">
            <GandhaarTheme />
            <StarReveal />
            <StarLineUp />
            <AboutUs />
            <CulturalPanel />
            <DevTeam />
            <Footer />
          </div>
        </div>

        <div className="controls-container">
          <div className="mini-dial">CH</div>
          <div className="mini-vents">
            <div className="v-line"></div>
            <div className="v-line"></div>
            <div className="v-line"></div>
          </div>
          <div className="mini-dial">VOL</div>
        </div>
      </div>
    </div>
  );
}

export default Home;