import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";

const MonthNavigation = ({ currentDate, onPrevMonth, onNextMonth, onToday, theme }) => {
  const warm = theme === "warm";

  return (
    <div
      className={`flex items-center justify-between px-5 py-2.5 border-b-2 transition-colors duration-500 ${
        warm
          ? "bg-gradient-to-r from-amber-100 to-orange-100 border-amber-200"
          : "bg-gradient-to-r from-blue-100 to-cyan-100 border-blue-200"
      }`}
    >
      <button
        onClick={onPrevMonth}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 text-slate-700 font-medium text-sm"
        data-testid="prev-month-button"
      >
        <ChevronLeft className="w-4 h-4" />
        <span className="hidden sm:inline">Prev</span>
      </button>

      <button
        onClick={onToday}
        className={`flex items-center gap-1.5 px-5 py-1.5 text-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 font-medium text-sm ${
          warm
            ? "bg-gradient-to-r from-orange-500 to-rose-500"
            : "bg-gradient-to-r from-blue-500 to-indigo-500"
        }`}
        data-testid="today-button"
      >
        <Calendar className="w-3.5 h-3.5" />
        Today
      </button>

      <button
        onClick={onNextMonth}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 text-slate-700 font-medium text-sm"
        data-testid="next-month-button"
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default MonthNavigation;