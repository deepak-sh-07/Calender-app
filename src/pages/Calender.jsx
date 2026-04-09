import { useState, useEffect } from "react";
import CalendarGrid from "../components/calendar/CalendarGrid";
import NotesPanel from "../components/calendar/NotesPanel";
import HeroImage from "../components/calendar/HeroImage";
import MonthNavigation from "../components/calendar/MonthNavigation";
import ThemeToggle from "../components/calendar/ThemeToggle";
import { getHolidaysForMonth } from "../lib/dateUtils";

export const MONTH_PALETTES = [
  { from: "#dbeafe", via: "#eff6ff", to: "#f0f9ff", accent: "#3b82f6", soft: "#bfdbfe" },
  { from: "#e0e7ff", via: "#ede9fe", to: "#f5f3ff", accent: "#6366f1", soft: "#c7d2fe" },
  { from: "#fce7f3", via: "#fdf2f8", to: "#fff7ed", accent: "#ec4899", soft: "#fbcfe8" },
  { from: "#fce7f3", via: "#fff1f2", to: "#fff7ed", accent: "#f43f5e", soft: "#fda4af" },
  { from: "#dcfce7", via: "#f0fdf4", to: "#f7fee7", accent: "#16a34a", soft: "#bbf7d0" },
  { from: "#fef9c3", via: "#fffbeb", to: "#fff7ed", accent: "#ca8a04", soft: "#fde68a" },
  { from: "#fed7aa", via: "#fff7ed", to: "#fef9c3", accent: "#ea580c", soft: "#fdba74" },
  { from: "#d1fae5", via: "#f0fdf4", to: "#ecfdf5", accent: "#059669", soft: "#a7f3d0" },
  { from: "#d1fae5", via: "#ecfdf5", to: "#f0fdf4", accent: "#047857", soft: "#6ee7b7" },
  { from: "#fed7aa", via: "#fff7ed", to: "#fef3c7", accent: "#b45309", soft: "#fcd34d" },
  { from: "#e2e8f0", via: "#f1f5f9", to: "#f8fafc", accent: "#475569", soft: "#cbd5e1" },
  { from: "#dbeafe", via: "#eff6ff", to: "#f0f9ff", accent: "#1d4ed8", soft: "#93c5fd" },
];

const Calendar = () => {
  const [range, setRange] = useState({ start: null, end: null });
  const [notes, setNotes] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [theme, setTheme] = useState("warm");
  const [holidays, setHolidays] = useState([]);
  const [isFlipping, setIsFlipping] = useState(false);

  const monthPalette = MONTH_PALETTES[currentDate.getMonth()];

  useEffect(() => {
    const stored = localStorage.getItem("calendar-notes");
    if (stored) {
      try { setNotes(JSON.parse(stored)); } catch (e) { console.error(e); }
    }
    const savedTheme = localStorage.getItem("calendar-theme");
    if (savedTheme) setTheme(savedTheme);
  }, []);

  useEffect(() => { localStorage.setItem("calendar-notes", JSON.stringify(notes)); }, [notes]);
  useEffect(() => { localStorage.setItem("calendar-theme", theme); }, [theme]);
  useEffect(() => {
    setHolidays(getHolidaysForMonth(currentDate.getFullYear(), currentDate.getMonth()));
  }, [currentDate]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "ArrowLeft") handlePrevMonth();
      else if (e.key === "ArrowRight") handleNextMonth();
      else if (e.key === "t" || e.key === "T") handleToday();
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDate]);

  const handlePrevMonth = () => {
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
      setIsFlipping(false);
    }, 150);
  };

  const handleNextMonth = () => {
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
      setIsFlipping(false);
    }, 150);
  };

  const handleToday = () => {
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentDate(new Date());
      setIsFlipping(false);
    }, 150);
  };

  const bgClass = theme === "warm"
    ? "bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50"
    : "bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50";

  const borderClass = theme === "warm" ? "border-amber-100" : "border-blue-100";

  return (
    <div className={`min-h-screen ${bgClass} p-4 md:p-6 transition-all duration-500`}>
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-4 relative">
          <h1
            className="text-5xl md:text-6xl font-bold text-slate-800 mb-1"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Wall Calendar
          </h1>
          <p className="text-slate-500 text-sm">
            Select date ranges and add notes to your calendar
          </p>
          <div className="absolute top-0 right-0 hidden md:block">
            <ThemeToggle theme={theme} setTheme={setTheme} />
          </div>
        </div>

        {/* Main card */}
        <div className={`bg-white shadow-xl rounded-2xl overflow-hidden border-4 ${borderClass} transition-all duration-500`}>
          <div className="grid lg:grid-cols-[1.2fr_1fr]">

            {/* Left panel */}
            <div className="flex flex-col">
              <HeroImage currentDate={currentDate} theme={theme} />
              <MonthNavigation
                currentDate={currentDate}
                onPrevMonth={handlePrevMonth}
                onNextMonth={handleNextMonth}
                onToday={handleToday}
                theme={theme}
              />
              <div className={`transition-all duration-300 ${isFlipping ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}>
                <CalendarGrid
                  range={range}
                  setRange={setRange}
                  currentDate={currentDate}
                  notes={notes}
                  holidays={holidays}
                  theme={theme}
                />
              </div>
            </div>

            {/* Right panel */}
            <NotesPanel
              range={range}
              notes={notes}
              setNotes={setNotes}
              setRange={setRange}
              theme={theme}
              monthPalette={monthPalette}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-3 text-xs text-slate-400">
          <p>Click dates to select a range · Add notes for specific dates or ranges</p>
          <p className="mt-0.5">Keyboard: ← → navigate months · T for today</p>
        </div>

        {/* Mobile theme toggle */}
        <div className="flex justify-center mt-3 md:hidden">
          <ThemeToggle theme={theme} setTheme={setTheme} />
        </div>
      </div>
    </div>
  );
};

export default Calendar;