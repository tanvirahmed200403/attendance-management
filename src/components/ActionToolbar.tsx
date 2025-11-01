import React from 'react';

interface ActionToolbarProps {
  isEditMode: boolean;
  onToggleEdit: () => void;
  onResetData: () => void;
  onExportCSV: () => void;
  onPrint: () => void;
  onDownloadPDF: () => void; // ✅ added prop
}

const ActionToolbar: React.FC<ActionToolbarProps> = ({
  isEditMode,
  onToggleEdit,
  onResetData,
  onExportCSV,
  onPrint,
  onDownloadPDF,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        ⚙️ আ্যাকশন
      </h2>
      <div className="flex flex-wrap gap-4">
        <button
          onClick={onToggleEdit}
          className={`${
            isEditMode
              ? 'bg-blue-500 hover:bg-blue-600'
              : 'bg-green-500 hover:bg-green-600'
          } text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2`}
        >
          📝 {isEditMode ? 'সেভ' : 'ইডিট'}
        </button>

        <button
          onClick={onResetData}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
        >
          🔄 রিসেট ডাটা
        </button>

        <button
          onClick={onExportCSV}
          className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
        >
          📥 CSV ডাউনলোড
        </button>

        <button
          onClick={onPrint}
          className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
        >
          🖨️ প্রিন্ট
        </button>

        <button
          onClick={onDownloadPDF}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
        >
          📄 পিডিএফ ডাউনলোড
        </button>
      </div>
    </div>
  );
};

export default ActionToolbar;
