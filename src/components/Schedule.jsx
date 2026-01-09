import {
    Calendar,
    Crown,
    Film,
    MapPin,
    Play,
    Sparkles,
    Tv,
    Zap,
} from "lucide-react";
import { useMemo, useState } from "react";
import "../style/Schedule.css";

/** --- CONFIG: force Asia/Kolkata (IST) offset --- */
const IST_OFFSET_MIN = 330; // +5:30 in minutes

/** --- THEMES (plain-css friendly values) ---
 * Each theme contains:
 *  - id
 *  - name
 *  - bgGradient: CSS gradient string
 *  - accentColor: used for headings/links
 *  - borderColor
 *  - fontClass: one of 'font-sans'|'font-comic'|'font-serif'
 *  - cardStyle: object with CSS-compatible values for card background & text color
 *  - icon: lucide-react icon JSX (uses 'icon' class for sizing/color)
 *  - titleColor, titleShadow, titleStroke for inline title styling
 */
const THEMES = {
    "Jan 28": {
        id: "day1",
        name: "UNSCRIPTED UNHINGED",
        bgGradient: "linear-gradient(135deg, #FACA78 0%, #DD5341 100%)",
        accentColor: "#ffffff",
        borderColor: "rgba(255,255,255,0.2)",
        fontClass: "font-sans",
        cardStyle: {
            background: "rgba(0,0,0,0.30)",
            color: "#ffffff",
            borderLeft: "4px solid rgba(255,255,255,0.1)",
            boxShadow: "0 0 20px rgba(0,0,0,0.3)",
        },
        icon: <Film className="icon" />,
        titleColor: "#FFFFFF",
        titleShadow: "0 6px 28px rgba(0,0,0,0.6)",
        titleStroke: "rgba(0,0,0,0.55)",
    },
    "Jan 29": {
        id: "day2",
        name: "TOONVERSE",
        bgGradient: "linear-gradient(135deg, #68C7C1 0%, #FACA78 100%)",
        accentColor: "#062C2B",
        borderColor: "rgba(0,0,0,0.1)",
        fontClass: "font-comic",
        cardStyle: {
            background: "rgba(0,0,0,0.30)",
            color: "#000000",
            border: "2px solid rgba(0,0,0,0.1)",
            borderRadius: "16px",
            boxShadow: "4px 4px 0 rgba(0,0,0,0.08)",
        },
        icon: <Zap className="icon" />,
        titleColor: "#062C2B",
        titleShadow: "0 6px 18px rgba(0,0,0,0.08)",
        titleStroke: "rgba(255,255,255,0.9)",
    },
    "Jan 30": {
        id: "day3",
        name: "COMEDY CENTRE",
        bgGradient: "linear-gradient(135deg, #68C7C1 0%, #F57F5B 100%)",
        accentColor: "#ffffff",
        borderColor: "rgba(255,255,255,0.2)",
        fontClass: "font-serif",
        cardStyle: {
            background: "rgba(0,0,0,0.30)",
            color: "#ffffff",
            border: "1px solid rgba(255,255,255,0.10)",
            backdropFilter: "blur(8px)",
            boxShadow: "0 12px 30px rgba(0,0,0,0.45)",
        },
        icon: <Sparkles className="icon" />,
        titleColor: "#FFFFFF",
        titleShadow: "0 6px 20px rgba(0,0,0,0.5)",
        titleStroke: "rgba(0,0,0,0.5)",
    },
    "Jan 31": {
        id: "day4",
        name: "PARAMPARA PRIME",
        bgGradient: "linear-gradient(180deg, #794A3A 0%, #F57F5B 100%)",
        accentColor: "#4a0404",
        borderColor: "#4a0404",
        fontClass: "font-serif-wide",
        cardStyle: {
            background: "#5c0505",
            color: "rgba(255,255,255,0.8)",
            border: "2px solid #4a0404",
            boxShadow: "0 4px 20px rgba(0,0,0,0.6)",
        },
        icon: <Crown className="icon" />,
        titleColor: "#FFF8F0",
        titleShadow: "0 8px 30px rgba(0,0,0,0.45)",
        titleStroke: "rgba(0,0,0,0.6)",
    },
};

/** --- DUMMY DATA (kept as-is) --- */
const SCHEDULE = [
    { id: 1, date: "Jan 28", category: "SHOWCASES", title: "Inauguration", time: "10:00 AM - 12:00 PM", venue: "Main Building Quadrangle", code: "" },
    { id: 2, date: "Jan 28", category: "DAYTIME EDITIONS", title: "Antakshari Premiere League", time: "12:30 PM - 2:30 PM", venue: "Main Building Quadrangle", code: "" },
    { id: 3, date: "Jan 28", category: "DAYTIME EDITIONS", title: "Mastersketch", time: "12:30 PM - 2:00 PM", venue: "Between Main & IT Building", code: "" },
    { id: 4, date: "Jan 28", category: "DAYTIME EDITIONS", title: "CTV Style Lab", time: "12:30 PM - 2:30 PM", venue: "Instrumentation Quadrangle", code: "" },
    { id: 5, date: "Jan 28", category: "DAYTIME EDITIONS", title: "CTV's Next Spell Star", time: "12:30 PM - 2:30 PM", venue: "KB Joshi Auditorium", code: "" },
    { id: 6, date: "Jan 28", category: "DAYTIME EDITIONS", title: "Khatron Ke Khiladi", time: "12:00 PM - 02:00 PM", venue: "Mechanical Circle", code: "" },
    { id: 7, date: "Jan 28", category: "DAYTIME EDITIONS", title: "Aap ki Adalat", time: "02:30 PM - 04:30 PM", venue: "Stage 2", code: "" },
    { id: 8, date: "Jan 28", category: "DAYTIME EDITIONS", title: "Game of Strokes", time: "02:30 PM - 04:30 PM", venue: "Between Main & IT Building", code: "" },
    { id: 9, date: "Jan 28", category: "DAYTIME EDITIONS", title: "QALA", time: "02:30 PM - 04:30 PM", venue: "Mechanical Circle", code: "" },
    { id: 10, date: "Jan 28", category: "SUNDOWNER", title: "Nach Baliye: Class Wars", time: "05:00 PM - 10:00 PM", venue: "Samstha Ground", code: "" },

    { id: 11, date: "Jan 29", category: "DAYTIME EDITIONS", title: "Flow State: Intercollege Dance Battle", time: "10:00 AM - 12:30 PM", venue: "Main Building Quadrangle", code: "" },
    { id: 12, date: "Jan 29", category: "DAYTIME EDITIONS", title: "Toon & Me", time: "10:00 AM - 12:00 PM", venue: "Between Main & IT Building", code: "" },
    { id: 13, date: "Jan 29", category: "SHOWCASES", title: "Swarashree Live Unplugged", time: "12:30 PM - 01:00 PM", venue: "Stage 2", code: "" },
    { id: 14, date: "Jan 29", category: "WORKSHOPS", title: "Workshop 1", time: "", venue: "", code: "" },
    { id: 15, date: "Jan 29", category: "WORKSHOPS", title: "Workshop 2", time: "", venue: "", code: "" },
    { id: 16, date: "Jan 29", category: "DAYTIME EDITIONS", title: "Fit Check: Eco Edition", time: "01:00 PM - 03:00 PM", venue: "Main Building Quadrangle", code: "" },
    { id: 17, date: "Jan 29", category: "DAYTIME EDITIONS", title: "ABCD - All About Cummins Dance", time: "02:00 PM - 04:00 PM", venue: "Stage 2", code: "" },
    { id: 18, date: "Jan 29", category: "SHOWCASES", title: "Kalawant Live", time: "03:30 PM - 04:30 PM", venue: "Ichalkaranji Hall", code: "" },
    { id: 19, date: "Jan 29", category: "SUNDOWNER", title: "AURA: The Inter-Class Runway", time: "05:00 PM - 08:00 PM", venue: "Samstha Ground", code: "" },
    { id: 20, date: "Jan 29", category: "SUNDOWNER", title: "Retro Jam Night", time: "08:30 PM - 10:00 PM", venue: "Samstha Ground", code: "" },

    { id: 21, date: "Jan 30", category: "DAYTIME EDITIONS", title: "LOL Sabha", time: "10:00 AM - 12:00 PM", venue: "Main Building Quadrangle", code: "" },
    { id: 22, date: "Jan 30", category: "DAYTIME EDITIONS", title: "The One Where I Dance", time: "10:00 AM - 02:00 PM", venue: "Stage 2", code: "" },
    { id: 23, date: "Jan 30", category: "WORKSHOPS", title: "Workshop 3", time: "", venue: "", code: "" },
    { id: 24, date: "Jan 30", category: "DAYTIME EDITIONS", title: "Ksauti MakeUp Ki", time: "11:00 AM - 01:00 PM", venue: "Mechanical Circle", code: "" },
    { id: 25, date: "Jan 30", category: "DAYTIME EDITIONS", title: "Traitors", time: "11:00 AM - 01:00 PM", venue: "Entire IT Building", code: "" },
    { id: 26, date: "Jan 30", category: "DAYTIME EDITIONS", title: "Brooklyn Fine-Dine", time: "10:00 AM - 02:00 PM", venue: "between Main & IT Building", code: "" },
    { id: 27, date: "Jan 30", category: "WORKSHOPS", title: "Workshop 4", time: "", venue: "", code: "" },
    { id: 28, date: "Jan 30", category: "DAYTIME EDITIONS", title: "Cummins Next Supermodel", time: "02:00 PM - 04:30 PM", venue: "Main Building Quadrangle", code: "" },
    { id: 29, date: "Jan 30", category: "DAYTIME EDITIONS", title: "Pass the Brush", time: "02:30 PM - 04:30 PM", venue: "Between Main & IT Building", code: "" },
    { id: 30, date: "Jan 30", category: "DAYTIME EDITIONS", title: "Campus Idol - Group Edition", time: "02:00 PM - 04:00 PM", venue: "KB Joshi Auditorium", code: "" },
    { id: 31, date: "Jan 30", category: "DAYTIME EDITIONS", title: "Dear Diary", time: "03:00 PM - 05:00 PM", venue: "Stage 2", code: "" },
    { id: 32, date: "Jan 30", category: "SUNDOWNER", title: "Star Night 2 - Band Performance", time: "06:00 PM - 08:00 PM", venue: "Samstha Ground", code: "" },
    { id: 33, date: "Jan 30", category: "SUNDOWNER", title: "DJ Night", time: "08:30 PM - 09:00 PM", venue: "Samstha Ground", code: "" },

    { id: 34, date: "Jan 31", category: "DAYTIME EDITIONS", title: "Taal Tarang", time: "10:00 AM - 01:00 PM", venue: "KB Joshi Auditorium", code: "" },
    { id: 35, date: "Jan 31", category: "DAYTIME EDITIONS", title: "Pitch Perfect", time: "10:00 AM - 01:00 PM", venue: "Main Building Quadrangle", code: "" },
    { id: 36, date: "Jan 31", category: "DAYTIME EDITIONS", title: "TRP Talkies", time: "01:00 PM - 04:30 PM", venue: "Main Building Quadrangle", code: "" },
    { id: 37, date: "Jan 31", category: "DAYTIME EDITIONS", title: "Nukkadnama", time: "12:00 PM - 04:00 PM", venue: "Stage 2", code: "" },
    { id: 38, date: "Jan 31", category: "DAYTIME EDITIONS", title: "Ye Rang Kya Kehlata Hai", time: "12:00 PM - 03:00 PM", venue: "Between Main & IT Building", code: "" },
    { id: 39, date: "Jan 31", category: "SHOWCASES", title: "Kalakaar Katta", time: "11:00 AM - 05:00 PM", venue: "Instrumentation Quadrangle", code: "" },
    { id: 40, date: "Jan 31", category: "DAYTIME EDITIONS", title: "Junk Genius", time: "01:00 PM - 03:00 PM", venue: "Mechanical Circle", code: "" },
    { id: 41, date: "Jan 31", category: "SHOWCASES", title: "Prize Distribution", time: "05:30 PM - 07:30 PM", venue: "Main Building Quadrangle", code: "" },
    { id: 42, date: "Jan 31", category: "SUNDOWNER", title: "Gandhaar Feast", time: "07:30 PM - 09:30 PM", venue: "Samstha Ground", code: "" },
];

const CATEGORIES = ["ALL", "SHOWCASES", "DAYTIME EDITIONS", "WORKSHOPS", "SUNDOWNER"];

const MONTH_INDEX = {
    Jan: 0,
    Feb: 1,
    Mar: 2,
    Apr: 3,
    May: 4,
    Jun: 5,
    Jul: 6,
    Aug: 7,
    Sep: 8,
    Oct: 9,
    Nov: 10,
    Dec: 11,
};

/** Helper to parse times like "10:00 AM" into {hour, minute} */
function parseClock(t) {
    if (!t) return null;
    const m = t.match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/i);
    if (!m) {
        const m2 = t.match(/(\d{1,2})\s*(AM|PM)?/i);
        if (!m2) return null;
        let hour = parseInt(m2[1], 10);
        const ampm = (m2[2] || "").toUpperCase();
        if (ampm === "PM" && hour !== 12) hour += 12;
        if (ampm === "AM" && hour === 12) hour = 0;
        return { hour, minute: 0 };
    }
    let hour = parseInt(m[1], 10);
    const minute = parseInt(m[2], 10);
    const ampm = (m[3] || "").toUpperCase();
    if (ampm === "PM" && hour !== 12) hour += 12;
    if (ampm === "AM" && hour === 12) hour = 0;
    return { hour, minute };
}

/** Build Date object representing given date/time in IST (returns JS Date for the absolute instant) */
function buildDateFromLabelIST(dateLabel, clock) {
    if (!dateLabel) return null;
    const [mon, day] = dateLabel.split(" ");
    const year = new Date().getFullYear();
    const month = MONTH_INDEX[mon] ?? 0;
    const d = parseInt(day, 10);

    if (clock) {
        const hm = parseClock(clock);
        if (!hm) {
            const utcMs = Date.UTC(year, month, d) - IST_OFFSET_MIN * 60000;
            return new Date(utcMs);
        }
        const utcMs = Date.UTC(year, month, d, hm.hour, hm.minute) - IST_OFFSET_MIN * 60000;
        return new Date(utcMs);
    }

    const utcMs = Date.UTC(year, month, d) - IST_OFFSET_MIN * 60000;
    return new Date(utcMs);
}

function parseTimeRangeIST(timeStr, dateLabel) {
    if (!timeStr || !timeStr.trim()) return null;
    const parts = timeStr.split("-").map((p) => p.trim());
    const start = buildDateFromLabelIST(dateLabel, parts[0]);
    let end = null;
    if (parts[1]) {
        end = buildDateFromLabelIST(dateLabel, parts[1]);
        if (start && end && end < start) {
            // wrap to next day
            end = new Date(end.getTime() + 24 * 60 * 60 * 1000);
        }
    }
    return { start, end };
}

/** Dev toolbar: simulate IST time via "YYYY-MM-DDTHH:MM" (treated as IST) */
const DevToolbar = ({ onChange }) => {
    const [enabled, setEnabled] = useState(false);
    const [iso, setIso] = useState("");

    function parseIsoAsIst(isoStr) {
        const m = isoStr.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/);
        if (!m) return null;
        const year = +m[1], month = +m[2] - 1, day = +m[3], hour = +m[4], minute = +m[5];
        const utcMs = Date.UTC(year, month, day, hour, minute) - IST_OFFSET_MIN * 60000;
        return new Date(utcMs);
    }

    const apply = () => {
        if (!enabled) return onChange(null);
        const d = parseIsoAsIst(iso);
        onChange(d);
    };

    return (
        <div className="dev-toolbar">
            <label className="dev-checkbox">
                <input type="checkbox" checked={enabled} onChange={(e) => setEnabled(e.target.checked)} />
                <span>Simulate time (IST)</span>
            </label>

            <input
                className="dev-input"
                placeholder="YYYY-MM-DDTHH:MM (e.g. 2026-01-28T10:15)"
                value={iso}
                onChange={(e) => setIso(e.target.value)}
            />
            <button onClick={apply} className="dev-apply">
                Apply
            </button>
            <div className="dev-tip">Tip: toggle simulate → paste IST ISO datetime</div>
        </div>
    );
};

/** Now Playing badge */
const NowPlayingBadge = ({ active }) => {
    if (!active) return null;
    return (
        <div className="now-badge" role="status" aria-live="polite">
            <span className="now-dot" aria-hidden />
            <span className="now-text">NOW PLAYING</span>
        </div>
    );
};

const Schedule = () => {
    const [activeDate, setActiveDate] = useState("Jan 28");
    const [activeCategory, setActiveCategory] = useState("ALL");
    const [simulatedNow, setSimulatedNow] = useState(null);

    const currentTheme = THEMES[activeDate] || Object.values(THEMES)[0];

    // Filter & parse time ranges
    const filteredEvents = useMemo(() => {
        const eventsForDay = SCHEDULE.filter((e) => e.date === activeDate);
        const eventsByCategory = activeCategory === "ALL" ? eventsForDay : eventsForDay.filter((e) => e.category === activeCategory);

        const withRanges = eventsByCategory.map((e) => {
            const range = parseTimeRangeIST(e.time, e.date);
            return { ...e, _range: range };
        });

        withRanges.sort((a, b) => {
            const as = a._range && a._range.start ? a._range.start.getTime() : Infinity;
            const bs = b._range && b._range.start ? b._range.start.getTime() : Infinity;
            return as - bs;
        });

        return withRanges;
    }, [activeDate, activeCategory]);

    const now = simulatedNow || new Date();

    return (
        <div
            className="schedule-root"
            style={{ background: currentTheme.bgGradient }}
        >
            <div className="schedule-inner">
              

                <header className="schedule-header">
                    <div className="header-left">
                        <div className="branding">
                            <div className="brand-icon">
                                {currentTheme.icon}
                            </div>
                            <div className="brand-label">Gandhaar Live</div>
                        </div>

                        <h1
                            className={`page-title ${currentTheme.fontClass}`}
                            style={{
                                color: currentTheme.titleColor,
                                textShadow: currentTheme.titleShadow,
                                WebkitTextStroke: `1px ${currentTheme.titleStroke}`,
                            }}
                        >
                            {currentTheme.name}
                        </h1>

                        <p className="page-sub">{currentTheme.tagline || ""}</p>
                    </div>

                    <div className="date-selector">
                        {Object.keys(THEMES).map((date) => {
                            const dayNum = date.split(" ")[1];
                            const isActive = activeDate === date;
                            return (
                                <button
                                    key={date}
                                    onClick={() => setActiveDate(date)}
                                    className={`date-btn ${isActive ? "active" : ""}`}
                                >
                                    <span className="date-mon">{date.split(" ")[0]}</span>
                                    <span className="date-day">{dayNum}</span>
                                </button>
                            );
                        })}
                    </div>
                </header>

                <div className="main-grid">
                    <aside className="sidebar">
                        {CATEGORIES.map((cat) => {
                            const isActive = activeCategory === cat;
                            return (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`cat-btn ${isActive ? "active" : ""}`}
                                >
                                    <span>{cat}</span>
                                    {isActive && <Play className="play-icon" />}
                                </button>
                            );
                        })}
                    </aside>

                    <main className="content">
                        <div className="list-header">
                            <div className="on-air">
                                <div className="live-dot" />
                                <span>ON AIR NOW</span>
                            </div>

                            <div className="header-right">
                                <strong>{activeDate}</strong>
                                <span className="sep"> / </span>
                                <strong>{activeCategory}</strong>
                            </div>
                        </div>

                        <div className="list-body">
                            {filteredEvents.length === 0 ? (
                                <div className="signoff">
                                    <Tv className="tv-icon" />
                                    <h2>Sign Off</h2>
                                    <p>No programs scheduled for this slot.</p>
                                </div>
                            ) : (
                                filteredEvents.map((event, idx) => {
                                    const range = event._range;
                                    const isLive = range && range.start && range.end && now.getTime() >= range.start.getTime() && now.getTime() <= range.end.getTime();
                                    return (
                                        <article
                                            key={`${event.id}-${idx}`}
                                            className="event-card"
                                            style={{
                                                background: currentTheme.cardStyle.background,
                                                color: currentTheme.cardStyle.color,
                                                borderLeft: currentTheme.cardStyle.borderLeft || undefined,
                                                border: currentTheme.cardStyle.border || undefined,
                                                borderRadius: currentTheme.cardStyle.borderRadius || undefined,
                                                boxShadow: currentTheme.cardStyle.boxShadow || undefined,
                                                backdropFilter: currentTheme.cardStyle.backdropFilter || undefined,
                                            }}
                                        >
                                            <div className="card-left">
                                                <div className="time-row">
                                                    <Calendar className="small-icon" />
                                                    <span className="time-text">{event.time || "Time TBA"}</span>
                                                    <NowPlayingBadge active={isLive} />
                                                </div>

                                                <h3 className={`event-title ${currentTheme.fontClass}`}>{event.title}</h3>

                                                <div className="venue-row">
                                                    <MapPin className="small-icon" />
                                                    <span className="venue-text">{event.venue || "TBA"}</span>
                                                </div>
                                            </div>

                                            <div className="card-right">
                                                <div className="code-wrap">
                                                    <div className="code-text">{event.code}</div>
                                                </div>
                                            </div>
                                        </article>
                                    );
                                })
                            )}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Schedule;
