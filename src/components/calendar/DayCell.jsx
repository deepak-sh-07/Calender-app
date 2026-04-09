import { useState } from "react";

const DayCell = ({ date, range, onSelect, hasNote, currentDate, holiday, theme }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const today = new Date();
  const isToday = date.toDateString() === today.toDateString();
  const isCurrentMonth =
    date.getMonth() === currentDate.getMonth() &&
    date.getFullYear() === currentDate.getFullYear();

  const isStart = range.start && date.toDateString() === range.start.toDateString();
  const isEnd = range.end && date.toDateString() === range.end.toDateString();
  const isInRange = range.start && range.end && date > range.start && date < range.end;

  const dow = date.getDay();
  const warm = theme === "warm";

  let cellClass =
    "relative min-h-[2.4rem] flex flex-col items-center justify-start pt-1.5 rounded-xl cursor-pointer transition-all duration-200 select-none hover:scale-[1.04]";

  if (isStart || isEnd) {
    cellClass += warm
      ? " bg-orange-500 text-white font-semibold shadow-md hover:bg-orange-600"
      : " bg-blue-500 text-white font-semibold shadow-md hover:bg-blue-600";
  } else if (isInRange) {
    cellClass += warm ? " bg-orange-100 text-orange-900" : " bg-blue-100 text-blue-900";
  } else if (isToday) {
    cellClass += warm
      ? " ring-2 ring-orange-400 bg-orange-50 font-semibold text-orange-900"
      : " ring-2 ring-blue-400 bg-blue-50 font-semibold text-blue-900";
  } else if (dow === 0) {
    cellClass += " text-red-500 bg-red-50 hover:bg-red-100";
  } else if (dow === 6) {
    cellClass += " text-slate-400 bg-slate-50 hover:bg-slate-100";
  } else {
    cellClass += " bg-white text-slate-700 hover:bg-slate-50";
  }

  if (!isCurrentMonth) cellClass += " opacity-25";

  return (
    <div
      onClick={() => onSelect(date)}
      onMouseEnter={() => holiday && setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      className={cellClass}
    >
      <span className="text-sm leading-none">{date.getDate()}</span>

      {(hasNote || holiday) && (
        <div className="flex gap-0.5 mt-1">
          {hasNote && <div className="w-1.5 h-1.5 rounded-full bg-green-500" />}
          {holiday && <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />}
        </div>
      )}

      {showTooltip && holiday && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 z-50 pointer-events-none">
          <div className="bg-slate-800 text-white text-[10px] px-2 py-1 rounded-lg whitespace-nowrap shadow-lg">
            {holiday.name}
          </div>
          <div className="w-1.5 h-1.5 bg-slate-800 rotate-45 mx-auto -mt-0.5" />
        </div>
      )}
    </div>
  );
};

export default DayCell;