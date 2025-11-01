import { exportToCSV, printPDF, downloadPDF } from "../utils/exportUtils";
import React, { useState, useEffect } from 'react';
import { Participant, ProgramInfo as ProgramInfoType, DropdownOptions, FilterState } from '../types';
import { DEFAULT_DROPDOWN_OPTIONS } from '../utils/constants';
import { sortParticipants, generateId, formatTime12Hour } from '../utils/helpers';
import StatsCards from './StatsCards';
import ProgramInfoSection from './ProgramInfo';
import FilterSearch from './FilterSearch';
import AddParticipant from './AddParticipant';
import ActionToolbar from './ActionToolbar';
import ParticipantsList from './ParticipantsList';
import ParticipantModal from './ParticipantModal';
import Sidebar from './Sidebar';
import DropdownEditor from './DropdownEditor';
import NotesPanel from './NotesPanel';


const AppLayout: React.FC = () => {
  // --------------------------------------------------------------------------------
  // State
  // --------------------------------------------------------------------------------
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [programInfo, setProgramInfo] = useState<ProgramInfoType>({
    type: '', location: '', date: '', startTime: '', endTime: ''
  });
  const [dropdownOptions, setDropdownOptions] = useState<DropdownOptions>(DEFAULT_DROPDOWN_OPTIONS);
  const [filter, setFilter] = useState<FilterState>({
    ward: '', name: '', man: '', uposhakha: '', tags: []
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownEditorOpen, setIsDropdownEditorOpen] = useState(false);

  // ✅ NEW: Notes state (paged notes) + open flag (UI will be added later)
  const [notes, setNotes] = useState<{ pages: { text: string; drawing?: string | null }[] }>({
    pages: [{ text: '', drawing: null }],
  });
  const [isNotesOpen, setIsNotesOpen] = useState(false);

  // --------------------------------------------------------------------------------
  // Load from localStorage
  // --------------------------------------------------------------------------------
  useEffect(() => {
    const savedData = localStorage.getItem('attendanceData');
    if (savedData) {
      const data = JSON.parse(savedData);
      setParticipants(data.participants || []);
      setProgramInfo(data.programInfo || programInfo);
      setDropdownOptions(data.dropdownOptions || DEFAULT_DROPDOWN_OPTIONS);
      setNotes(data.notes || { pages: [{ text: '', drawing: null }] });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --------------------------------------------------------------------------------
  // Save to localStorage (now includes notes)
  // --------------------------------------------------------------------------------
  useEffect(() => {
    localStorage.setItem(
      'attendanceData',
      JSON.stringify({
        participants,
        programInfo,
        dropdownOptions,
        notes,
      })
    );
  }, [participants, programInfo, dropdownOptions, notes]);

  // --------------------------------------------------------------------------------
  // Actions
  // --------------------------------------------------------------------------------
  const addParticipant = (ward: string, man: string, name: string) => {
    const newParticipant: Participant = {
      id: generateId(),
      name, ward, man,
      uposhakha: '', bloodGroup: '', institute: '', level: '',
      rollId: '', classYearSemester: '', tags: [], phones: [],
      arrivalTime: '', departureTime: '', chuti: '',
      status: 'not-arrived'
    };
    setParticipants(sortParticipants([...participants, newParticipant]));
  };

  const toggleStatus = (id: string) => {
    setParticipants(participants.map(p => {
      if (p.id === id) {
        if (p.status === 'not-arrived') {
          return { ...p, status: 'present', arrivalTime: formatTime12Hour(new Date()) };
        } else if (p.status === 'present') {
          return { ...p, status: 'left', departureTime: formatTime12Hour(new Date()) };
        }
      }
      return p;
    }));
  };

  const updateParticipant = (id: string, updates: Partial<Participant>) => {
    setParticipants(participants.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const saveParticipant = (participant: Participant) => {
    setParticipants(participants.map(p => p.id === participant.id ? participant : p));
  };

  // ✅ Delete participant (used in edit mode cross button)
  const deleteParticipant = (id: string) => {
    if (confirm('আপনি কি নিশ্চিত যে এই অংশগ্রহণকারীকে সম্পূর্ণভাবে মুছে ফেলবেন?')) {
      setParticipants(prev => prev.filter(p => p.id !== id));
    }
  };

  const resetData = () => {
    if (confirm('সব উপস্থিতির তথ্য মুছে ফেলবেন?')) {
      setParticipants(participants.map(p => ({
        ...p, arrivalTime: '', departureTime: '',chuti: '', status: 'not-arrived'
      })));
      setProgramInfo({ type: '', location: '', date: '', startTime: '', endTime: '' });
        // 3️⃣ Reset notes
    setNotes({ pages: [{ text: '' }] }); // ✅ NEW: clear notes

    alert('সমস্ত তথ্য (ছুটি ও নোট সহ) রিসেট করা হয়েছে!');
    }
  };

  const exportJSON = () => {
    const data = { participants, programInfo, dropdownOptions, notes };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `attendance_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  };

const importJSON = (data: any) => {
  try {
    // ---- Merge Participants (OR behavior) ----
    if (data.participants) {
      setParticipants(prev => {
        const existing = prev ?? [];
        const incoming = data.participants ?? [];
        const merged = [
          ...existing,
          ...incoming.filter((p: any) => {
            if (!p) return false;
            const key = p.id ?? p.name?.trim();
            return !existing.some(e => (e.id ?? e.name?.trim()) === key);
          }),
        ];
        return sortParticipants(merged);
      });
    }

    // ---- Merge Dropdown Options (OR behavior) ----
    if (data.dropdownOptions) {
      setDropdownOptions(prev => {
        const existing = prev ?? {};
        const incoming = data.dropdownOptions ?? {};
        const merged = { ...existing };
        for (const key in incoming) {
          if (Array.isArray(incoming[key])) {
            const allValues = [...(existing[key] ?? []), ...incoming[key]];
            merged[key] = Array.from(new Set(allValues));
          }
        }
        return merged;
      });
    }

    // ---- Replace Program Info & Notes only if provided ----
    if (data.programInfo) setProgramInfo(data.programInfo);
    if (data.notes) setNotes(data.notes);

    alert("✅ ডাটা সফলভাবে যুক্ত হয়েছে (existing data kept, new data added)");
  } catch (err) {
    console.error("Import error:", err);
    alert("❌ ফাইলটি পড়া যায়নি বা সঠিক ফরম্যাটে নেই");
  }
};

  const deleteAll = () => {
    if (confirm('সব তথ্য মুছে ফেলবেন?')) {
      setParticipants([]);
      setProgramInfo({ type: '', location: '', date: '', startTime: '', endTime: '' });
      setDropdownOptions(DEFAULT_DROPDOWN_OPTIONS);
      setNotes({ pages: [{ text: '', drawing: null }] });
    }
  };

  // --------------------------------------------------------------------------------
  // Derived: filter
  // --------------------------------------------------------------------------------
  const filteredParticipants = participants.filter(p => {
    if (filter.ward && p.ward !== filter.ward) return false;
    if (filter.name && !p.name.toLowerCase().includes(filter.name.toLowerCase())) return false;
    if (filter.man && p.man !== filter.man) return false;
    if (filter.uposhakha && p.uposhakha !== filter.uposhakha) return false;
    if (filter.tags.length > 0 && !filter.tags.some(tag => p.tags.includes(tag))) return false;
    return true;
  });

  // --------------------------------------------------------------------------------
  // Render
  // --------------------------------------------------------------------------------
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-purple-500">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl shadow-2xl p-8 mb-8 text-white relative">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="absolute top-6 right-6 bg-white text-purple-600 p-3 rounded-lg hover:bg-gray-100 transition-colors"
          >
            ☰
          </button>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-6xl">📋</span>
            <div>
              <h1 className="text-4xl font-bold mb-2">উপস্থিতি ব্যবস্থাপনা সিস্টেম</h1>
              <p className="text-xl opacity-90">সহজ এবং কার্যকর উপস্থিতি ট্র্যাকিং সিস্টেম</p>
            </div>
          </div>
        </div>

        <StatsCards participants={participants} />

        <ProgramInfoSection
          programInfo={programInfo}
          setProgramInfo={setProgramInfo}
          dropdownOptions={dropdownOptions}
        />

        <FilterSearch
          filter={filter}
          setFilter={setFilter}
          dropdownOptions={dropdownOptions}
          onReset={() => setFilter({ ward: '', name: '', man: '', uposhakha: '', tags: [] })}
        />

        <AddParticipant dropdownOptions={dropdownOptions} onAdd={addParticipant} />

   <ActionToolbar
  isEditMode={isEditMode}
  onToggleEdit={() => setIsEditMode(!isEditMode)}
  onResetData={resetData}
  onExportCSV={() => exportToCSV(filteredParticipants, programInfo)}
  onPrint={() => printPDF(filteredParticipants, programInfo, notes)}
  onDownloadPDF={() => downloadPDF(filteredParticipants, programInfo, notes)}
/>

        <ParticipantsList
          participants={filteredParticipants}
          isEditMode={isEditMode}
          onToggleStatus={toggleStatus}
          onOpenModal={setSelectedParticipant}
          onUpdateParticipant={updateParticipant}
          dropdownOptions={dropdownOptions}
          onDeleteParticipant={deleteParticipant}
        />
      </div>

      <ParticipantModal
        participant={selectedParticipant}
        onClose={() => setSelectedParticipant(null)}
        onSave={saveParticipant}
        dropdownOptions={dropdownOptions}
      />

<Sidebar
  isOpen={isSidebarOpen}
  onClose={() => setIsSidebarOpen(false)}
  onExportJSON={exportJSON}
  onImportJSON={importJSON}
  onDeleteAll={deleteAll}
  onEditDropdowns={() => { setIsDropdownEditorOpen(true); setIsSidebarOpen(false); }}
  onOpenNotes={() => { setIsNotesOpen(true); setIsSidebarOpen(false); }}  // ✅ NEW
/>

      <DropdownEditor
        isOpen={isDropdownEditorOpen}
        onClose={() => setIsDropdownEditorOpen(false)}
        dropdownOptions={dropdownOptions}
        onSave={setDropdownOptions}
      />
      <NotesPanel
  isOpen={isNotesOpen}
  notes={notes}
  setNotes={setNotes}
  onClose={() => setIsNotesOpen(false)}
/>

    </div>
  );
};

export default AppLayout;
