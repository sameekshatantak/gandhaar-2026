import "../style/Home.css";
import AboutUs from "./AboutUs";
import DevTeam from "./DevTeam";
import Event from "./Event";
import Footer from "./Footer";
import GandhaarTheme from "./GandhaarTheme";
import Header from "./Header";
import ImageGallery from "./ImageGallery";
import Panel from "./Panel";
import Schedule from "./Schedule";
import StarLineUp from "./StarLineUp";

function Home() {
  return (
    <div>
      <Header/>
      <GandhaarTheme/>
      <Event/>
      <StarLineUp/>
      <Schedule/>
      <AboutUs/>
      <ImageGallery/>
      <Panel/>
      <DevTeam/>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
     <Footer/>
    </div>
  );
}

export default Home;
