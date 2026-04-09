import { useState } from "react";
import { X, Plus, StickyNote, Calendar, Trash2 } from "lucide-react";

const NotesPanel = ({ range, notes, setNotes, setRange, theme, monthPalette }) => {
  const [noteText, setNoteText] = useState("");
  const [noteType, setNoteType] = useState("range");

  const warm = theme === "warm";
  const palette = monthPalette || {
    from: "#fff7ed", via: "#fffbeb", to: "#fef9c3",
    accent: "#f97316", soft: "#fed7aa",
  };

  const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" });
  };

  const addNote = () => {
    if (!noteText.trim()) return;
    const newNote = {
      id: Date.now().toString(),
      text: noteText,
      createdAt: new Date().toISOString(),
      type: noteType,
    };
    if (noteType === "range" && range.start) {
      if (range.end) {
        newNote.range = { start: range.start.toISOString(), end: range.end.toISOString() };
        newNote.displayDate = `${formatDate(range.start)} – ${formatDate(range.end)}`;
      } else {
        newNote.date = range.start.toISOString();
        newNote.displayDate = formatDate(range.start);
      }
    } else {
      newNote.type = "general";
      newNote.displayDate = "General Note";
    }
    setNotes([newNote, ...notes]);
    setNoteText("");
  };

  const deleteNote = (id) => setNotes(notes.filter((n) => n.id !== id));
  const clearSelection = () => setRange({ start: null, end: null });

  const primaryBtn = warm
    ? "bg-gradient-to-r from-orange-500 to-rose-500"
    : "bg-gradient-to-r from-blue-500 to-cyan-500";
  const focusRing = warm ? "focus:ring-orange-400" : "focus:ring-blue-400";
  const activeType = warm
    ? "bg-gradient-to-r from-orange-500 to-rose-500 text-white shadow-sm"
    : "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-sm";

  return (
    <div
      className="flex flex-col transition-all duration-700"
      style={{
        background: `linear-gradient(160deg, ${palette.from} 0%, ${palette.via} 50%, ${palette.to} 100%)`,
        borderLeft: `1px solid ${palette.soft}`,
        minHeight: "100%",
      }}
    >
      {/* Header */}
      <div
        className="px-5 py-3 border-b"
        style={{ background: `${palette.soft}55`, borderColor: palette.soft }}
      >
        <h2
          className="text-xl font-bold text-slate-800 flex items-center gap-2"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          <StickyNote className="w-5 h-5" style={{ color: palette.accent }} />
          Notes
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">Add notes to your calendar</p>
      </div>

      {/* Selected range */}
      {range.start && (
        <div
          className="px-5 py-2 border-b"
          style={{ background: `${palette.soft}33`, borderColor: palette.soft }}
          data-testid="selected-range-display"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0">
              <Calendar className="w-3.5 h-3.5 flex-shrink-0" style={{ color: palette.accent }} />
              <span className="text-xs font-medium truncate text-slate-700">
                {range.end
                  ? `${formatDate(range.start)} – ${formatDate(range.end)}`
                  : formatDate(range.start)}
              </span>
            </div>
            <button
              onClick={clearSelection}
              className="p-1 rounded-full hover:bg-white/50 transition-colors flex-shrink-0"
              data-testid="clear-selection-button"
            >
              <X className="w-3.5 h-3.5 text-slate-500" />
            </button>
          </div>
        </div>
      )}

      {/* Input area */}
      <div
        className="px-5 py-3 border-b"
        style={{ background: "rgba(255,255,255,0.55)", borderColor: palette.soft }}
      >
        <textarea
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" && e.ctrlKey) addNote(); }}
          className={`w-full p-2.5 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent resize-none text-sm bg-white/80 ${focusRing}`}
          placeholder="Write your note here… (Ctrl+Enter to save)"
          rows={3}
          data-testid="note-input"
        />

        <div className="flex gap-2 mt-2.5 mb-2.5">
          <button
            onClick={() => setNoteType("range")}
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-medium transition-all ${
              noteType === "range" ? activeType : "bg-white/60 text-slate-600 hover:bg-white/80"
            }`}
            data-testid="note-type-range"
          >
            Date Note
          </button>
          <button
            onClick={() => setNoteType("general")}
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-medium transition-all ${
              noteType === "general" ? activeType : "bg-white/60 text-slate-600 hover:bg-white/80"
            }`}
            data-testid="note-type-general"
          >
            General Note
          </button>
        </div>

        <button
          onClick={addNote}
          disabled={!noteText.trim()}
          className={`w-full ${primaryBtn} text-white px-4 py-2 rounded-lg font-medium shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 text-sm`}
          data-testid="add-note-button"
        >
          <Plus className="w-4 h-4" />
          Add Note
        </button>
      </div>

      {/* Notes list */}
      <div className="p-4 space-y-2.5" data-testid="notes-list">
        {notes.length === 0 ? (
          <div className="text-center py-10 text-slate-400">
            <StickyNote className="w-10 h-10 mx-auto mb-2 opacity-20" />
            <p className="text-sm">No notes yet</p>
            <p className="text-xs mt-1 opacity-70">Select a date and add your first note</p>
          </div>
        ) : (
          notes.map((note) => (
            <div
              key={note.id}
              className="p-3 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border-l-4 group animate-fadeIn"
              style={{ background: "rgba(255,255,255,0.75)", borderLeftColor: palette.accent }}
              data-testid={`note-item-${note.id}`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <span
                    className="text-[10px] font-semibold px-2 py-0.5 rounded-md inline-block mb-1.5"
                    style={{ background: `${palette.soft}99`, color: palette.accent }}
                  >
                    {note.displayDate}
                  </span>
                  <p className="text-slate-800 text-xs leading-relaxed break-words">{note.text}</p>
                </div>
                <button
                  onClick={() => deleteNote(note.id)}
                  className="p-1.5 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100 flex-shrink-0"
                  data-testid={`delete-note-${note.id}`}
                >
                  <Trash2 className="w-3.5 h-3.5 text-red-400" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotesPanel;