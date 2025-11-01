import React, { useEffect, useState } from 'react';

type Notes = { pages: { text: string }[] };

interface NotesPanelProps {
  isOpen: boolean;
  notes: Notes;
  setNotes: React.Dispatch<React.SetStateAction<Notes>>;
  onClose: () => void; // Back
}

const NotesPanel: React.FC<NotesPanelProps> = ({ isOpen, notes, setNotes, onClose }) => {
  // Ensure we always have exactly one page
  useEffect(() => {
    if (!notes?.pages || notes.pages.length === 0) {
      setNotes({ pages: [{ text: '' }] });
    } else if (notes.pages.length > 1) {
      // collapse any extra pages into the first page’s text (preserve user content)
      const merged = notes.pages.map(p => p?.text ?? '').join('\n\n');
      setNotes({ pages: [{ text: merged }] });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notes?.pages?.length]);

  const currentText = notes?.pages?.[0]?.text ?? '';
  const [draft, setDraft] = useState<string>(currentText);

  // Keep draft in sync if the modal opens after state changed elsewhere
  useEffect(() => {
    setDraft(currentText);
  }, [currentText, isOpen]);

  // Auto-save while typing (keeps old “auto save” feel)
  useEffect(() => {
    const id = setTimeout(() => {
      setNotes({ pages: [{ text: draft }] });
    }, 250);
    return () => clearTimeout(id);
  }, [draft, setNotes]);

  const saveExplicitly = () => {
    setNotes({ pages: [{ text: draft }] });
    // Optional: toast/visual cue could be added here
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200"
              title="Back"
            >
              ← Back
            </button>
            <h2 className="text-xl font-semibold">📝 নোটস</h2>
          </div>
          <button
            onClick={saveExplicitly}
            className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white"
            title="Save"
          >
            Save
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <label className="block text-sm text-gray-500 mb-2">
            Program info (optional) + Notes
          </label>
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Write anything here…"
            className="w-full h-[420px] border rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <p className="text-xs text-gray-500 mt-2">
            This note will be included in PDF/print only if it has content. (CSV is unchanged.)
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotesPanel;
