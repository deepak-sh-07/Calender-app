export function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

export function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay();
}

export function getHolidaysForMonth(year, month) {
  const HOLIDAYS = {
    0: [
      { day: 1, name: "New Year's Day" },
      { day: 14, name: "Makar Sankranti" },
      { day: 26, name: "Republic Day" },
    ],
    1: [
      { day: 19, name: "Chhatrapati Shivaji Jayanti" },
    ],
    2: [
      { day: 8, name: "Holi" },
    ],
    3: [
      { day: 14, name: "Dr. Ambedkar Jayanti" },
      { day: 18, name: "Good Friday" },
    ],
    4: [
      { day: 1, name: "Labour Day" },
    ],
    5: [],
    6: [],
    7: [
      { day: 15, name: "Independence Day" },
    ],
    8: [
      { day: 2, name: "Gandhi Jayanti (observed)" },
    ],
    9: [
      { day: 2, name: "Gandhi Jayanti" },
      { day: 24, name: "Dussehra" },
    ],
    10: [
      { day: 1, name: "Diwali" },
      { day: 15, name: "Guru Nanak Jayanti" },
    ],
    11: [
      { day: 25, name: "Christmas" },
    ],
  };

  return HOLIDAYS[month] || [];
}