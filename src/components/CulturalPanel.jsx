import "./CulturalPanel.css";

// import images
import rucha from "../assets/images/rucha-joshi.jpg";
import mrunmayi from "../assets/images/mrunmayi-jawalekar.jpg";
import siddhi from "../assets/images/siddhi-bhamre.jpg";
import shikha from "../assets/images/shikha-pawar.jpg";
import sanskruti from "../assets/images/sanskruti-jawade.jpg";
import wamika from "../assets/images/wamika.jpg";
import yukta from "../assets/images/yukta-khanvilkar.jpg";

const assistants = [
  { name: "Mrunmayi Jawalekar", image: mrunmayi },
  { name: "Siddhi Bhamre", image: siddhi },
  { name: "Shikha Pawar", image: shikha },
  { name: "Sanskruti Jawade", image: sanskruti },
  { name: "Wamika", image: wamika },
  { name: "Yukta Khanvilkar", image: yukta },
];

export default function CulturalPanel() {
  return (
    <>
      {/* Main Heading */}
      <h1 className="main-title">MEET OUR CULTURAL PANEL</h1>

      {/* Cultural Secretary */}
      <h2 className="section-title">Cultural Secretary</h2>

      <div className="polaroid-grid">
        <div className="polaroid">
          <div className="image-wrapper">
            <img src={rucha} alt="Rucha Joshi" />
          </div>
          <div className="photo-label">
            <div className="name">Rucha Joshi</div>
          </div>
        </div>
      </div>

      {/* Assistant Cultural Secretaries */}
      <h2 className="section-title">Assistant Cultural Secretaries</h2>

      <div className="polaroid-grid">
        {assistants.map((person, index) => (
          <div className="polaroid" key={index}>
            <div className="image-wrapper">
              <img src={person.image} alt={person.name} />
            </div>
            <div className="photo-label">
              <div className="name">{person.name}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
