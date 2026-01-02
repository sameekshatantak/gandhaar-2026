import "../style/Home.css";
import CulturalPanel from "./CulturalPanel";
import Footer from "./Footer";
import GandhaarTheme from "./GandhaarTheme";
import StarReveal from "./StarReveal";
function Home() {
  return (
    <div>
      <GandhaarTheme/>
      <br></br>
      <StarReveal/>
      <br></br>
      <CulturalPanel/>
      <br></br>

      <Footer/>
    </div>
  );
}

export default Home;
