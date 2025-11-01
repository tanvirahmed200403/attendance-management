import React, { useRef } from 'react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onExportJSON: () => void;
  onImportJSON: (data: any) => void;
  onDeleteAll: () => void;
  onEditDropdowns: () => void;
  onOpenNotes: () => void; // ✅ NEW
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, onExportJSON, onImportJSON, onDeleteAll, onEditDropdowns, onOpenNotes }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target?.result as string);
          onImportJSON(data);
        } catch (error) {
          alert('Invalid JSON file');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose}></div>}
      <div className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">মেনু</h2>
            <button onClick={onClose} className="text-white text-3xl hover:text-gray-200">&times;</button>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <button onClick={onExportJSON} className="w-full bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
            📤 এক্সপোর্ট (JSON)
          </button>
          <button onClick={() => fileInputRef.current?.click()} className="w-full bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
            📥 ইমপোর্ট (JSON)
          </button>
          <input ref={fileInputRef} type="file" accept=".json" onChange={handleImport} className="hidden" />
          <button onClick={onDeleteAll} className="w-full bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
            🗑️ সব মুছুন
          </button>
          <button onClick={onEditDropdowns} className="w-full bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
            ✏️ ড্রপডাউন এডিট
          </button>
          <button
  onClick={onOpenNotes}
  className="w-full bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
>
  📝 নোটস
</button>

        </div>
      </div>
    </>
  );
};

export default Sidebar;
