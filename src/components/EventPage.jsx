import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../style/Event.css";

const SHEET_URL =
  "https://opensheet.elk.sh/1v8bzz6-KmJ8Z55ts9VAPaLx4euClZxK1NDIqbVmPGn4/Sheet1";

const parseRules = (rulesText = "") => {
  const lines = rulesText
    .split("\n")
    .map(l => l.trim())
    .filter(Boolean);

  const sections = [];
  let currentSection = null;

  lines.forEach(line => {
    // Heading: "1. Title"
    if (/^\d+\.\s+/.test(line)) {
      if (currentSection) sections.push(currentSection);

      currentSection = {
        title: line.replace(/^\d+\.\s+/, ""),
        items: []
      };
    }

    // Bullet item
    else if (/^[-•*]\s+/.test(line) && currentSection) {
      currentSection.items.push(
        line.replace(/^[-•*]\s+/, "")
      );
    }
  });

  if (currentSection) sections.push(currentSection);

  return sections;
};


const EventPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    fetch(SHEET_URL)
      .then(res => res.json())
      .then(data => {
        // const row = data.find(e => e.id === id);
      const row = data.find(
        e => String(e.id).trim() === String(id).trim()
      );
        setEvent(row);
      })
      .catch(() => setEvent(null));
  }, [id]);
console.log("URL ID:", id);
console.log("Fetched event:", event);

  if (!event) {
    return (
      <div className="broadcast-theme">
        <div className="wrapper">
          <h1 style={{ color: "#ff0000", letterSpacing: "4px" }}>
            SIGNAL LOST
          </h1>
          <p>Transmission interrupted. Please return to main broadcast.</p>
        </div>
      </div>
    );
  }

  // Parse coordinators safely
  const coordinators = event.coordinators
    ?.split(",")
    .map(c => c.trim());

  return (
    <div className="broadcast-theme">
      <div className="wrapper">
        <header className="event-header">
          <button onClick={() => navigate(-1)} className="back-btn">
            ← BACK
          </button>
          <p>Channel: {event.eventCode}</p>
          <h1>{event.title}</h1>
        </header>

        {/* TECHNICAL SPECS */}
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
              <div key={i} className="detail-item">
                {c}
              </div>
            ))}
          </div>
        </div>

        {/* RULES */}

        <div className="technical-specs2">
        <div className="spec-card">
            <div className="rule-book">
            <div className="section-header">Program Regulations</div>

            {parseRules(event.rules).map((section, idx) => (
                <div className="info_card" key={idx}>
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
    </div>
  );
};

export default EventPage;
