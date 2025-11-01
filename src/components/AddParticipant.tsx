import React, { useState } from 'react';
import { DropdownOptions } from '../types';
import { DEFAULT_SELECT } from '../utils/constants';

interface AddParticipantProps {
  dropdownOptions: DropdownOptions;
  onAdd: (ward: string, man: string, name: string) => void;
}

const AddParticipant: React.FC<AddParticipantProps> = ({ dropdownOptions, onAdd }) => {
  const [ward, setWard] = useState('');
  const [man, setMan] = useState('');
  const [name, setName] = useState('');

  const handleAdd = () => {
    if (ward && man && name.trim()) {
      onAdd(ward, man, name.trim());
      setWard('');
      setMan('');
      setName('');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        ➕ অংশগ্রহণকারী যোগ করুন
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">ওয়ার্ড:</label>
          <select value={ward} onChange={(e) => setWard(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500">
            <option value="">{DEFAULT_SELECT}</option>
            {dropdownOptions.wards.map(w => <option key={w} value={w}>{w}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">মান:</label>
          <select value={man} onChange={(e) => setMan(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500">
            <option value="">{DEFAULT_SELECT}</option>
            {dropdownOptions.mans.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">নাম:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="নাম লিখুন" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500" />
        </div>
        <div className="flex items-end">
          <button onClick={handleAdd} className="w-full bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium transition-colors">
            যোগ করুন
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddParticipant;
