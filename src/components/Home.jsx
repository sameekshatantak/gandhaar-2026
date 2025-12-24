import "../style/Home.css";
import AboutUs from "./AboutUs";
import Event from "./Event";
import Footer from "./Footer";
import GandhaarTheme from "./GandhaarTheme";
import Header from "./Header";
import ImageGallery from "./ImageGallery";
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
      <br></br>
      <br></br>
      <br></br>
      <br></br>
     <Footer/>
    </div>
  );
}

export default Home;
