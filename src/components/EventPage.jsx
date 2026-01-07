import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

/* Reuse Home TV styles */
import "../style/EventPage.css";
import "../style/Home.css";
import "../style/Theme.css";

/* Assets */
import instagramIcon from "../assets/images/instagram.png";
import mailIcon from "../assets/images/mail.png";

/* Components */
import Navbar from "./Navbar";

const SHEET_URL =
  "https://opensheet.elk.sh/1v8bzz6-KmJ8Z55ts9VAPaLx4euClZxK1NDIqbVmPGn4/Sheet1";

const parseRules = (rulesText = "") => {
  return rulesText
    .split(/\n\s*\n/)
    .map(section => {
      const parts = section.split("|").map(p => p.trim()).filter(Boolean);
      return {
        title: parts[0],
        items: parts.slice(1),
      };
    })
    .filter(sec => sec.title && sec.items.length);
};

const EventPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    fetch(SHEET_URL)
      .then(res => res.json())
      .then(data => {
        const row = data.find(
          e => String(e.id).trim() === String(id).trim()
        );
        setEvent(row);
      })
      .catch(() => setEvent(null));
  }, [id]);

  if (!event) {
    return (
      <div className="main-container">
        <div className="tv-wrapper">
          <div className="screen-container">
            <div className="crt-overlay"></div>
            <div className="broadcast-content">
              <h1 style={{ color: "#ff0000", letterSpacing: "4px" }}>
                SIGNAL LOST
              </h1>
              <p>Transmission interrupted. Please return to main broadcast.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const coordinators = event.coordinators?.split(",").map(c => c.trim());

  return (
    <div className="main-container">
      {/* NAVBAR / REMOTE */}
      <div className="remote-area">
        <Navbar />
      </div>

      {/* 📺 TV BODY */}
      <div className="tv-wrapper">
        <div className="screen-container">
          <div className="crt-overlay"></div>


          {/* 📡 EVENT BROADCAST */}
          <div className="broadcast-content event-broadcast">
            <header className="event-header">
              <button onClick={() => navigate(-1)} className="back-btn">
                ← BACK
              </button>
              <h1>{event.title}</h1>
            </header>

            {/* EVENT DETAILS */}
            <div className="technical-specs">
              <div className="spec-card">
                <h3>EVENT DETAILS</h3>
                <div className="detail-item"><b>Venue:</b> {event.venue}</div>
                <div className="detail-item"><b>Day:</b> {event.day}</div>
                <div className="detail-item"><b>Date:</b> {event.date}</div>
                <div className="detail-item"><b>Time:</b> {event.time}</div>
                <div className="detail-item"><b>Participation:</b> {event.perClass}</div>
                <div className="detail-item"><b>Team Size:</b> {event.teams}</div>
              </div>

              <div className="spec-card">
                <h3>EVENT COORDINATORS</h3>
                {coordinators?.map((c, i) => (
                  <div key={i} className="detail-item">{c}</div>
                ))}
              </div>
            </div>

            {/* RULES */}
            <div className="technical-specs2">
              <div className="spec-card">
                <div className="section-header">Program Regulations</div>

                {parseRules(event.rules).map((section, idx) => (
                  <div className="info_card rules-text" key={idx}>
                    <h4>{section.title}</h4>
                    <ol>
                      {section.items.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ol>
                  </div>
                ))}
              </div>
            </div>

            {/* ACTION */}
            <div className="action-bar">
              <a href="#" className="btn-register">
                REGISTER!
              </a>
            </div>
          </div>
        </div>

        {/* 🔘 CONTROLS + FOOTER */}
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
    </div>
  );
};

export default EventPage;
