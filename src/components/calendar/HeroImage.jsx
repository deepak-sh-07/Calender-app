import { useState, useEffect } from "react";

const MONTH_IMAGES = [
  "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=800&h=400&fit=crop",
  "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&h=400&fit=crop",
  "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&h=400&fit=crop",
  "https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=800&h=400&fit=crop",
  "https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?w=800&h=400&fit=crop",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=400&fit=crop",
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop",
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=400&fit=crop",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=400&fit=crop",
  "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800&h=400&fit=crop",
  "https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=800&h=400&fit=crop",
  "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=800&h=400&fit=crop",
];

const HeroImage = ({ currentDate, theme }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const month = currentDate.getMonth();
  const monthName = currentDate.toLocaleString("default", { month: "long" });
  const year = currentDate.getFullYear();
  const imageUrl = MONTH_IMAGES[month];

  useEffect(() => {
    setImageLoaded(false);
    const img = new window.Image();
    img.src = imageUrl;
    img.onload = () => setImageLoaded(true);
  }, [imageUrl]);

  const overlayColor = theme === "warm"
    ? "from-amber-900/20 via-transparent to-black/65"
    : "from-blue-900/20 via-transparent to-black/65";

  return (
    <div className="relative h-48 md:h-56 overflow-hidden bg-slate-300">
      <div
        className={`absolute inset-0 bg-cover bg-center transition-all duration-700 ${
          imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-110"
        }`}
        style={{ backgroundImage: `url('${imageUrl}')` }}
        data-testid="hero-image"
      />
      {!imageLoaded && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-slate-200 to-slate-300" />
      )}
      <div className={`absolute inset-0 bg-gradient-to-b ${overlayColor}`} />

      <div className="absolute bottom-0 left-0 right-0 px-5 py-4 text-white">
        <h2
          className="text-4xl md:text-5xl font-bold leading-tight drop-shadow-lg"
          style={{ fontFamily: "Playfair Display, serif" }}
          data-testid="month-year-display"
        >
          {monthName}
        </h2>
        <p className="text-lg font-light opacity-85">{year}</p>
      </div>

      <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-white/30 rounded-tr-xl pointer-events-none" />
      <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-white/30 rounded-bl-xl pointer-events-none" />
    </div>
  );
};

export default HeroImage;