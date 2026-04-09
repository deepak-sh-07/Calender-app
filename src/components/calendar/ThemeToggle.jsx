import { Palette } from "lucide-react";

const ThemeToggle = ({ theme, setTheme }) => {
  const toggleTheme = () => {
    setTheme(theme === "warm" ? "cool" : "warm");
  };

  return (
    <button
      onClick={toggleTheme}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 font-medium ${
        theme === "warm"
          ? "bg-gradient-to-r from-orange-500 to-rose-500 text-white"
          : "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
      }`}
      data-testid="theme-toggle"
    >
      <Palette className="w-4 h-4" />
      <span className="text-sm">{theme === "warm" ? "Cool Theme" : "Warm Theme"}</span>
    </button>
  );
};

export default ThemeToggle;

