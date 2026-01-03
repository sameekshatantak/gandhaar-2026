import "../style/Home.css";

import headerimage from "../assets/images/header_image.png";
import GrainWrapper from "../components/GrainWrapper";
import AboutUs from "./AboutUs";
import Carousel from "./Carousel";
import CulturalPanel from "./CulturalPanel";
import DevTeam from "./DevTeam";
import Footer from "./Footer";
import GandhaarTheme from "./GandhaarTheme";
import Header from "./Header";
import Navbar from "./Navbar";
import StarLineUp from "./StarLineUp";
import StarReveal from "./StarReveal";

function Home() {
  return (
    <div id="home">
      <Navbar />
      
      <Header
  bgImage={headerimage}

/>
      {/* Hero / Theme */}
      <div id="themes">
        <GrainWrapper bgColor="#f57f5b">
          <GandhaarTheme />
        </GrainWrapper>
      </div>

      {/* Star Reveal */}
      <div id="events">
        <GrainWrapper bgColor="#dd5341">
          <StarReveal />
        </GrainWrapper>
      </div>

      {/* Star Lineup */}
      <div id="lineup">
        <GrainWrapper bgColor="#794a3a">
          <StarLineUp />
        </GrainWrapper>
      </div>

      {/* About */}
      <div id="about">
        <GrainWrapper bgColor="#1E1A16">
          <AboutUs />
        </GrainWrapper>
      </div>

      {/* Carousel */}
      <div id="schedule">
        <GrainWrapper bgColor="#68c7c1">
          <Carousel />
        </GrainWrapper>
      </div>

      {/* Cultural Panel */}
      <div id="cultural">
        <GrainWrapper bgColor="#3c6e6a">
          <CulturalPanel />
        </GrainWrapper>
      </div>

      {/* Dev Team */}
      <div id="team">
        <GrainWrapper bgColor="#6b7a3c">
          <DevTeam />
        </GrainWrapper>
      </div>

      <Footer />
    </div>
  );
}

export default Home;
