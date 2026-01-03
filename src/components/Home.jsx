import "../style/Home.css";
import "../style/Theme.css";

import headerimage from "../assets/images/header_image.png";

/* social icons */
import instagramIcon from "../assets/images/instagram.png";
import mailIcon from "../assets/images/mail.png";

import GrainWrapper from "../components/GrainWrapper";
import AboutUs from "./AboutUs";
import Carousel from "./Carousel";
import CulturalPanel from "./CulturalPanel";
import DevTeam from "./DevTeam";

import GandhaarTheme from "./GandhaarTheme";
import Header from "./Header";
import Navbar from "./Navbar";
import StarLineUp from "./StarLineUp";
import StarReveal from "./StarReveal";

function Home() {
  return (
    <div className="main-container">
      {/* Remote / Navbar */}
      <div className="remote-area">
        <Navbar />
      </div>

      {/* 📺 TV BODY (UNCHANGED) */}
      <div className="tv-wrapper">
        {/* SCREEN */}
        <div className="screen-container">
          <div className="crt-overlay"></div>

          {/* 🔹 TOP CENTER BOX */}
          <div className="tv-center-box tv-top-box">
            <span className="tv-title">GANDHAAR 2026</span>
          </div>

          {/* 📡 BROADCAST CONTENT */}
          <div className="broadcast-content" id="home">
            <Header bgImage={headerimage} />

            <GrainWrapper bgColor="#f57f5b">
              <GandhaarTheme />
            </GrainWrapper>

            <GrainWrapper bgColor="#dd5341">
              <StarReveal />
            </GrainWrapper>

            <GrainWrapper bgColor="#794a3a">
              <StarLineUp />
            </GrainWrapper>

            <GrainWrapper bgColor="#1E1A16">
              <AboutUs />
            </GrainWrapper>

            <GrainWrapper bgColor="#68c7c1">
              <Carousel />
            </GrainWrapper>

            <GrainWrapper bgColor="#3c6e6a">
              <CulturalPanel />
            </GrainWrapper>

            <GrainWrapper bgColor="#6b7a3c">
              <DevTeam />
            </GrainWrapper>

          </div>
        </div>

        {/* 🔘 CONTROLS + FOOTER STRIP */}
        <div className="controls-container">

          {/* FOOTER BOX */}
          <div className="tv-footer-box">
            <span className="footer-text">
             <span className="footer-line-1">
      MKSSS Cummins College of Engineering for Women
    </span>
    <span className="footer-line-2">
      Karve Nagar, Pune – 411-052
    </span>
            </span>

            <div className="footer-icons">
              <a
                href="https://www.instagram.com/gandhaar_cummins/"
                target="_blank"
                rel="noreferrer"
              >
                <img src={instagramIcon} alt="Instagram" />
              </a>


              <a href="mailto:gandhaar@cumminscollege.in">
                <img src={mailIcon} alt="Email" />
              </a>
             

            </div>
          
          </div>
            

        </div>
      </div>
    </div>
  );
}

export default Home;
