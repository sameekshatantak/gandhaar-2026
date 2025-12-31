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
import { useState } from "react";

/* ================= THEME CONFIGURATION ================= */

const THEMES = {
  "Jan 28": {
    id: "netflix",
    name: "SITCOM STREAM",
    tagline: "Skip Intro? Never.",
    bg: "bg-black",
    accent: "text-[#E50914]",
    border: "border-[#E50914]",
    font: "font-sans",
    cardBg:
      "bg-[#141414] text-white hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(229,9,20,0.5)] border-l-4 border-[#E50914]",
    icon: <Film className="w-6 h-6 text-[#E50914]" />,
    pattern:
      "radial-gradient(circle at 50% 0%, rgba(229,9,20,0.15), transparent 70%)",
  },

  "Jan 29": {
    id: "cartoon",
    name: "TOON REWIND",
    tagline: "Chaos, Cheese & Chases",
    bg: "bg-gradient-to-br from-yellow-300 via-orange-400 to-red-500",
    accent: "text-black",
    border: "border-black border-2",
    font: "font-comic",
    cardBg:
      "bg-white text-black shadow-[6px_6px_0px_rgba(0,0,0,0.8)] rounded-2xl border-2 border-black",
    icon: <Zap className="w-6 h-6 fill-yellow-400 text-black" />,
    pattern:
      "radial-gradient(circle, rgba(0,0,0,0.1) 2px, transparent 2.5px)",
  },

  "Jan 30": {
    id: "colors",
    name: "PRIME TIME",
    tagline: "Drama. Passion. Elegance.",
    bg: "bg-gradient-to-br from-[#C71585] via-[#FF4500] to-[#FFD700]",
    accent: "text-yellow-200",
    border: "border-white/30",
    font: "font-serif",
    cardBg:
      "bg-black/30 backdrop-blur-xl border border-white/20 text-white shadow-2xl",
    icon: <Sparkles className="w-6 h-6 text-yellow-300" />,
    pattern: "",
  },

  "Jan 31": {
    id: "royal",
    name: "ROYAL HERITAGE",
    tagline: "A Legacy of Grandeur",
    bg: "bg-gradient-to-b from-[#4a0404] to-[#2b0202]",
    accent: "text-[#D4AF37]",
    border: "border-[#D4AF37]",
    font: "font-serif tracking-widest",
    cardBg:
      "bg-[#5c0505] border-2 border-[#D4AF37] text-[#D4AF37] shadow-[0_4px_20px_rgba(0,0,0,0.6)]",
    icon: <Crown className="w-6 h-6 fill-[#D4AF37] text-[#D4AF37]" />,
    pattern:
      "radial-gradient(circle, rgba(212,175,55,0.15) 1px, transparent 1px)",
  },
};

/* ================= DATA ================= */

const SCHEDULE = [
  {
    id: 1,
    date: "Jan 28",
    category: "PROSHOWS",
    title: "Stand-up Special",
    time: "06:00 PM",
    venue: "Main Audi",
    code: "S-101",
  },
  {
    id: 2,
    date: "Jan 28",
    category: "COMPETITIONS",
    title: "Squid Game (Tech Edition)",
    time: "11:00 AM",
    venue: "Seminar Hall",
    code: "C-102",
  },
  {
    id: 3,
    date: "Jan 29",
    category: "CONCERTS",
    title: "Musical Chase",
    time: "05:00 PM",
    venue: "Amphitheatre",
    code: "A-201",
  },
  {
    id: 4,
    date: "Jan 29",
    category: "WORKSHOPS",
    title: "Character Design 101",
    time: "10:00 AM",
    venue: "Drawing Hall",
    code: "W-202",
  },
  {
    id: 5,
    date: "Jan 30",
    category: "PROSHOWS",
    title: "Fashion Gala",
    time: "07:30 PM",
    venue: "Main Ground",
    code: "D-301",
  },
  {
    id: 6,
    date: "Jan 30",
    category: "COMPETITIONS",
    title: "Voice of Gandhaar",
    time: "02:00 PM",
    venue: "Main Audi",
    code: "D-302",
  },
  {
    id: 7,
    date: "Jan 31",
    category: "CONCERTS",
    title: "Sufi Kathak Night",
    time: "08:00 PM",
    venue: "Main Ground",
    code: "R-401",
  },
  {
    id: 8,
    date: "Jan 31",
    category: "COMPETITIONS",
    title: "Maha Yuddh (Debate)",
    time: "10:00 AM",
    venue: "Senate Hall",
    code: "R-402",
  },
];

const CATEGORIES = [
  "CONCERTS",
  "COMPETITIONS",
  "PROSHOWS",
  "WORKSHOPS",
];

/* ================= COMPONENT ================= */

const Schedule = () => {
  const [activeDate, setActiveDate] = useState("Jan 28");
  const [activeCategory, setActiveCategory] = useState("CONCERTS");

  const currentTheme = THEMES[activeDate];

  const filteredEvents = SCHEDULE.filter(
    (e) => e.date === activeDate && e.category === activeCategory
  );

  return (
    <div
      className={`min-h-screen transition-colors duration-700 ease-in-out ${currentTheme.bg} relative overflow-hidden`}
    >
      {/* Background Pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: currentTheme.pattern,
          backgroundSize:
            currentTheme.id === "royal" ? "20px 20px" : "30px 30px",
        }}
      />

      {currentTheme.id === "royal" && (
        <div className="absolute inset-0 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] opacity-30" />
      )}

      <div className="max-w-7xl mx-auto p-4 md:p-8 relative z-10">
        {/* HEADER */}
        <header className="flex flex-col md:flex-row justify-between items-center mb-8 p-6 rounded-2xl border">
          <div>
            <div className="flex items-center gap-3 mb-2">
              {currentTheme.icon}
              <span className="uppercase text-sm tracking-widest">
                Gandhaar Live
              </span>
            </div>
            <h1 className={`text-5xl font-black ${currentTheme.font}`}>
              {currentTheme.name}
            </h1>
            <p className="opacity-70 italic">{currentTheme.tagline}</p>
          </div>

          {/* Channel Selector */}
          <div className="mt-6 md:mt-0 flex gap-4 overflow-x-auto">
            {Object.keys(THEMES).map((date) => {
              const dayNum = date.split(" ")[1];
              const isActive = activeDate === date;

              return (
                <button
                  key={date}
                  onClick={() => setActiveDate(date)}
                  className={`w-20 h-20 rounded-lg flex flex-col items-center justify-center transition-all ${
                    isActive
                      ? "bg-white text-black scale-110"
                      : "bg-white/10 text-white"
                  }`}
                >
                  <span className="text-xs">{date.split(" ")[0]}</span>
                  <span className="text-2xl font-bold">{dayNum}</span>
                </button>
              );
            })}
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* CATEGORY SIDEBAR */}
          <div className="lg:col-span-3 flex lg:flex-col gap-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-4 rounded-xl font-bold flex justify-between ${
                  activeCategory === cat
                    ? "bg-white text-black"
                    : "bg-black/30 text-white"
                }`}
              >
                {cat}
                {activeCategory === cat && (
                  <Play className="w-4 h-4" />
                )}
              </button>
            ))}
          </div>

          {/* SCHEDULE LIST */}
          <div className="lg:col-span-9">
            <div className="min-h-[500px]">
              <div className="p-4 mb-4 flex justify-between bg-black/30 rounded-lg">
                <span className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  ON AIR NOW
                </span>
                <span className={currentTheme.accent}>
                  {activeDate} // {activeCategory}
                </span>
              </div>

              {filteredEvents.length === 0 ? (
                <div className="text-center py-20 opacity-60">
                  <Tv className="w-16 h-16 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold">Sign Off</h2>
                  <p>No programs scheduled.</p>
                </div>
              ) : (
                filteredEvents.map((event) => (
                  <div
                    key={event.id}
                    className={`p-6 rounded-xl mb-4 flex justify-between ${currentTheme.cardBg}`}
                  >
                    <div>
                      <div className={`flex gap-2 ${currentTheme.accent}`}>
                        <Calendar className="w-4 h-4" />
                        {event.time}
                      </div>
                      <h3 className="text-2xl font-bold">
                        {event.title}
                      </h3>
                      <div className="flex gap-2 opacity-70">
                        <MapPin className="w-4 h-4" />
                        {event.venue}
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs opacity-50">
                        Event Code
                      </span>
                      <div
                        className={`text-xl font-black ${currentTheme.accent}`}
                      >
                        {event.code}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
