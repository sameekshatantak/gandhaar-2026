import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

/* TV styles */
import "../style/Home.css";
import "../style/Theme.css";

/* Page styles */
import "../style/Event.css";

/* Assets */
import instagramIcon from "../assets/images/instagram.png";
import mailIcon from "../assets/images/mail.png";

/* Components */
import Navbar from "./Navbar";

const SHEET_URL =
  "https://opensheet.elk.sh/1WgqZZlbn56Ce1MXRYPMECgGKqVH4LfqpgJw1rhi9YYc/Sheet1";

/* ---------------- EVENT CARD ---------------- */

const EventCard = ({ event }) => {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate(`/event/${event.id}`);
  };

  return (
    <div className="card">
      <div className="bg" style={{ backgroundImage: `url(${event.bg})` }} />

      <div className="logo">
        <img src={event.logo} alt="logo" />
      </div>

      <div className="info-panel">
        <div className="left">
          <div className="event-code">
            {event.id} {event.eventCode}
          </div>
          <div className="etitle">{event.title}</div>

          <div className="legend">
            <div className="item">
              <span className="dott red" />
              {event.venue}
            </div>
            <div className="item">
              <span className="dott green" />
              {event.teams}
            </div>
            <div className="item">
              <span className="dott blue" />
              {event.perClass}
            </div>
          </div>
        </div>

        <div className="right">
          <div className="live-pill">LIVE ON</div>
          <div className="date">🗓 {event.date}</div>
          <div className="time">⏰ {event.time}</div>

          <div className="progress-wrap">
            <div
              className="progress"
              style={{ width: `${Number(event.progress) || 0}%` }}
            />
          </div>

          <button className="details-box" onClick={handleRegisterClick}>
            <span className="dott yellow" />
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

/* ---------------- EVENTS PAGE ---------------- */

export default function Events() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [activeDate, setActiveDate] = useState("All");
  const [loading, setLoading] = useState(true);
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    fetch(SHEET_URL)
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch(() => {
        setEvents([]);
        setLoading(false);
      });
  }, []);

  const dates = [
    "All",
    ...new Set(events.map((e) => e.date).filter(Boolean)),
  ];

  const filteredEvents =
    activeDate === "All"
      ? events
      : events.filter((e) => e.date === activeDate);

  return (
    <div className="main-container events-page">
      {/* REMOTE / NAVBAR */}
      <div className="remote-area">
        <Navbar />
      </div>

      {/* 📺 TV BODY */}
      <div className="tv-wrapper">
        <div className="screen-container">
          <div className="crt-overlay" />

          <button onClick={() => navigate(-1)} className="back-btn">
            ←
          </button>

          {/* TOP CENTER BOX */}
          <div className="tv-center-box tv-top-box">
            <span className="tv-title">EVENT CHANNEL</span>
          </div>

          {/* 📡 EVENTS BROADCAST */}
          <div className="broadcast-content event-broadcast">
            {loading ? (
              <p className="loading">Loading events…</p>
            ) : (
              <>
                {/* MOBILE FILTER TOGGLE */}
                <button
                  className="filter-toggle"
                  onClick={() => setShowFilter(true)}
                >
                  ☰
                </button>

                <div className="events-layout">
                  {/* DATE FILTER */}
                  <div className={`date-filter ${showFilter ? "show" : ""}`}>
                    <button
                      className="filter-close"
                      onClick={() => setShowFilter(false)}
                    >
                      ✕
                    </button>

                    <h3>FILTER BY DATE</h3>

                    {dates.map((date, i) => (
                      <button
                        key={i}
                        className={activeDate === date ? "active" : ""}
                        onClick={() => {
                          setActiveDate(date);
                          setShowFilter(false);
                        }}
                      >
                        {date}
                      </button>
                    ))}
                  </div>

                  {/* EVENTS GRID */}
                  <div className="events-grid">
                    {filteredEvents.map((event, i) => (
                      <EventCard key={i} event={event} />
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* FOOTER */}
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
}
