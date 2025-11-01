import React, { useState } from 'react';
import { PhoneNumber } from '../types';
import { generateId } from '../utils/helpers'; // ✅ removed validateBangladeshiPhone import

interface PhoneManagerProps {
  phones: PhoneNumber[];
  onChange: (phones: PhoneNumber[]) => void;
}

const PhoneManager: React.FC<PhoneManagerProps> = ({ phones, onChange }) => {
  const [label, setLabel] = useState('');
  const [number, setNumber] = useState('');

  const handleAdd = () => {
    if (!label.trim() || !number.trim()) return;

    const newPhone: PhoneNumber = {
      id: generateId(),
      label: label.trim(),
      number: number.trim(),
      isPrimary: phones.length === 0
    };

    onChange([...phones, newPhone]);
    setLabel('');
    setNumber('');
  };

  const handleRemove = (id: string) => {
    onChange(phones.filter(p => p.id !== id));
  };

  const handleSetPrimary = (id: string) => {
    onChange(phones.map(p => ({ ...p, isPrimary: p.id === id })));
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <input
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="লেবেল (যেমন: মোবাইল)"
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-sm"
        />
        <input
          type="text"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          placeholder="ফোন নম্বর লিখুন"
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-sm"
        />
      </div>

      <button
        onClick={handleAdd}
        className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg text-sm"
      >
        নম্বর যোগ করুন
      </button>

      <div className="space-y-2 max-h-40 overflow-y-auto">
        {phones.map(phone => (
          <div key={phone.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm">{phone.label}</span>
                {phone.isPrimary && (
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">প্রাথমিক</span>
                )}
              </div>
              <a href={`tel:${phone.number}`} className="text-blue-600 hover:underline text-sm">
                {phone.number}
              </a>
            </div>

            <div className="flex gap-2">
              {!phone.isPrimary && (
                <button
                  onClick={() => handleSetPrimary(phone.id)}
                  className="text-blue-600 hover:text-blue-800 text-xs"
                >
                  প্রাথমিক করুন
                </button>
              )}
              <button
                onClick={() => handleRemove(phone.id)}
                className="text-red-600 hover:text-red-800 font-bold"
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhoneManager;
