import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../style/Home.css";
import "../style/Theme.css";



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
import HomeEvent from "./HomeEvent";
import Schedule from "./Schedule";

let GLOBAL_MUTED = false;


function Home() {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const el = document.getElementById(location.state.scrollTo);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <div className="main-container">

      {/* REMOTE / NAVBAR */}
      <div className="remote-area">
        <Navbar />
      </div>

      {/* 📺 TV BODY */}
      <div className="tv-wrapper">

        {/* SCREEN */}
        <div className="screen-container">
          <div className="crt-overlay"></div>


          {/* 📡 BROADCAST CONTENT */}
          <div className="broadcast-content" id="home">

            {/* HOME */}
            <section id="header">
              <Header />
            </section>


            {/* THEMES */}
            <GrainWrapper bgColor="#f57f5b">
              <section id="themes">
                <GandhaarTheme />
              </section>
            </GrainWrapper>

            {/* HOME EVENTS */}
            <GrainWrapper bgColor="#FACA78">
              <section id="homeevent">
                <HomeEvent />

              </section>
            </GrainWrapper>
            {/* EVENTS */}
            <GrainWrapper bgColor="#dd5341">
              <section id="lineup">
                <StarReveal />

              </section>
            </GrainWrapper>

            {/* STAR LINEUP */}
            <GrainWrapper bgColor="#794a3a">

              <StarLineUp />

            </GrainWrapper>

            <section id="schedule">
              <Schedule />
            </section>



            {/* ABOUT US */}
            <GrainWrapper bgColor="#1E1A16">
              <section id="about">
                <AboutUs />
              </section>
            </GrainWrapper>

            {/* SCHEDULE */}
            <GrainWrapper bgColor="#68c7c1">
              <section id="schedule">
                <Carousel />
              </section>
            </GrainWrapper>

            {/* CULTURAL PANEL (optional section) */}
            <GrainWrapper bgColor="#3c6e6a">
              <section id="panel">
                <CulturalPanel />
              </section>
            </GrainWrapper>

            {/* TEAM */}
            <GrainWrapper bgColor="#6b7a3c">
              <section id="team">
                <DevTeam />
              </section>
            </GrainWrapper>

          </div>
        </div>

        {/* CONTROLS + FOOTER */}
        <div className="controls-container">
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
    </div >
  );
}

export default Home;
