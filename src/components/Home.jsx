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
      <GrainWrapper bgColor="#b5422e">
        <GandhaarTheme />
      </GrainWrapper>

      {/* Star Reveal */}
      <GrainWrapper bgColor="#f1e7c6">
        <StarReveal />
      </GrainWrapper>

            {/* Star Lineup */}
      <GrainWrapper bgColor="#050505">
        <StarLineUp />
      </GrainWrapper>


      {/* About */}
      <GrainWrapper bgColor="#0F171E">
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
