import React, { useState } from 'react';
import { DropdownOptions } from '../types';

interface DropdownEditorProps {
  isOpen: boolean;
  onClose: () => void;
  dropdownOptions: DropdownOptions;
  onSave: (options: DropdownOptions) => void;
}

const DropdownEditor: React.FC<DropdownEditorProps> = ({ isOpen, onClose, dropdownOptions, onSave }) => {
  const [options, setOptions] = useState<DropdownOptions>(dropdownOptions);
  const [activeTab, setActiveTab] = useState<keyof DropdownOptions>('programTypes');
  const [newItem, setNewItem] = useState('');

  if (!isOpen) return null;

  const tabs: { key: keyof DropdownOptions; label: string }[] = [
    { key: 'programTypes', label: 'প্রোগ্রামের ধরন' },
    { key: 'wards', label: 'ওয়ার্ড' },
    { key: 'tags', label: 'ট্যাগস' },
    { key: 'uposhakhas', label: 'উপশাখা' },
    { key: 'chutis', label: 'ছুটি' }
  ];

  const addItem = () => {
    if (newItem.trim()) {
      setOptions({
        ...options,
        [activeTab]: [...options[activeTab], newItem.trim()]
      });
      setNewItem('');
    }
  };

  const removeItem = (item: string) => {
    setOptions({
      ...options,
      [activeTab]: options[activeTab].filter(i => i !== item)
    });
  };

  const handleSave = () => {
    onSave(options);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6">
          <h2 className="text-2xl font-bold">ড্রপডাউন এডিট করুন</h2>
        </div>
        <div className="flex border-b">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 px-4 py-3 font-medium transition-colors ${activeTab === tab.key ? 'bg-purple-100 text-purple-800 border-b-2 border-purple-600' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="p-6 max-h-96 overflow-y-auto">
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addItem()}
              placeholder="নতুন আইটেম যোগ করুন"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
            <button onClick={addItem} className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium">
              যোগ করুন
            </button>
          </div>
          <div className="space-y-2">
            {options[activeTab].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                <span className="font-medium">{item}</span>
                {activeTab !== 'mans' && (
                  <button onClick={() => removeItem(item)} className="text-red-600 hover:text-red-800 font-bold text-xl">
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="p-6 border-t flex gap-4">
          <button onClick={handleSave} className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-medium">
            সংরক্ষণ করুন
          </button>
          <button onClick={onClose} className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-lg font-medium">
            বাতিল
          </button>
        </div>
      </div>
    </div>
  );
};

export default DropdownEditor;
