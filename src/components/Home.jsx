import "../style/Home.css";
import CulturalPanel from "./CulturalPanel";
import Footer from "./Footer";
import GandhaarTheme from "./GandhaarTheme";
import StarReveal from "./StarReveal";
import AboutUs from "./AboutUs";
import StarLineUp from "./StarLineUp";
import DevTeam from "./DevTeam";
function Home() {
  return (
    <div>
      <GandhaarTheme />
      <br></br>
      <StarReveal />
      <br></br>
      <StarLineUp />
      <br></br>
      <AboutUs />
      <br></br>
      <CulturalPanel />
      <br></br>
      <DevTeam />
      <br></br>
      <Footer />
    </div>
  );
}

export default Home;
