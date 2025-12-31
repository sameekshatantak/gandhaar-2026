import "../style/Home.css";

import AboutUs from "./AboutUs";
import CulturalPanel from "./CulturalPanel";
import DevTeam from "./DevTeam";
import Footer from "./Footer";
import GandhaarTheme from "./GandhaarTheme";
import StarLineUp from "./StarLineUp";
import StarReveal from "./StarReveal";

import GrainWrapper from "../components/GrainWrapper";

function Home() {
  return (
    <div>
      {/* Hero / Theme */}
      <GrainWrapper bgColor="#f57f5b">
        <GandhaarTheme />
      </GrainWrapper>

      {/* Star Reveal */}
      <GrainWrapper bgColor="#dd5341">
        <StarReveal />
      </GrainWrapper>

            {/* Star Lineup */}
      <GrainWrapper bgColor="#794a3a">
        <StarLineUp />
      </GrainWrapper>

      {/* About */}
      <GrainWrapper bgColor="#1E1A16">
        <AboutUs />
      </GrainWrapper>


      {/* Cultural Panel */}
      <GrainWrapper bgColor="#3c6e6a">
        <CulturalPanel />
      </GrainWrapper>

      {/* Dev Team */}
      <GrainWrapper bgColor="#6b7a3c">
        <DevTeam />
      </GrainWrapper>

        <Footer />

    </div>
  );
}

export default Home;
