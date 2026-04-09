import { getDaysInMonth, getFirstDayOfMonth } from "../../lib/dateUtils";
import DayCell from "./DayCell";

const CalendarGrid = ({ range, setRange, currentDate, notes = [], holidays = [], theme }) => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const handleDaySelect = (date) => {
    if (!range.start || range.end) {
      setRange({ start: date, end: null });
    } else {
      setRange(
        date < range.start
          ? { start: date, end: range.start }
          : { start: range.start, end: date }
      );
    }
  };

  const normalize = (d) =>
    new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();

  const days = [];

  for (let i = 0; i < firstDay; i++) {
    days.push(<div key={`empty-${i}`} className="min-h-[2.4rem]" />);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const normalizedDate = normalize(date);

    const hasNote = notes.some((note) => {
      if (note.date) return normalize(new Date(note.date)) === normalizedDate;
      if (note.range) {
        const start = normalize(new Date(note.range.start));
        const end = normalize(new Date(note.range.end));
        return normalizedDate >= start && normalizedDate <= end;
      }
      return false;
    });

    const holiday = holidays.find((h) => h.day === day);

    days.push(
      <DayCell
        key={day}
        date={date}
        range={range}
        onSelect={handleDaySelect}
        hasNote={hasNote}
        currentDate={currentDate}
        holiday={holiday}
        theme={theme}
      />
    );
  }

  const containerBg = theme === "warm"
    ? "bg-gradient-to-b from-white to-amber-50/30"
    : "bg-gradient-to-b from-white to-blue-50/30";

  return (
    <div className={`px-4 pt-3 pb-4 ${containerBg} transition-all duration-500`}>
      {/* Weekday headers */}
      <div className="grid grid-cols-7 gap-1.5 mb-2 text-center">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d, i) => (
          <div
            key={d}
            className={`text-xs font-semibold py-1 ${
              i === 0 ? "text-red-500" : i === 6 ? "text-slate-400" : "text-slate-600"
            }`}
          >
            {d}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7 gap-1.5">{days}</div>
    </div>
  );
};

export default CalendarGrid;