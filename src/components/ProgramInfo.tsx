import React from 'react';
import { ProgramInfo as ProgramInfoType, DropdownOptions } from '../types';
import { DEFAULT_SELECT } from '../utils/constants';
import { formatTime12Hour } from '../utils/helpers'; // ✅ added import

interface ProgramInfoProps {
  programInfo: ProgramInfoType;
  setProgramInfo: (info: ProgramInfoType) => void;
  dropdownOptions: DropdownOptions;
}

const ProgramInfo: React.FC<ProgramInfoProps> = ({ programInfo, setProgramInfo, dropdownOptions }) => {
  // Handle 12h <-> 24h conversion
  const handleTimeChange = (field: 'startTime' | 'endTime', value: string) => {
    setProgramInfo({ ...programInfo, [field]: value });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        📋 প্রোগ্রামের তথ্য
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">প্রোগ্রামের ধরন:</label>
          <select
            value={programInfo.type}
            onChange={(e) => setProgramInfo({ ...programInfo, type: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">{DEFAULT_SELECT}</option>
            {dropdownOptions.programTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">স্থান:</label>
          <input
            type="text"
            value={programInfo.location}
            onChange={(e) => setProgramInfo({ ...programInfo, location: e.target.value })}
            placeholder="স্থান লিখুন"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">তারিখ:</label>
          <input
            type="date"
            value={programInfo.date}
            onChange={(e) => setProgramInfo({ ...programInfo, date: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">শুরুর সময়:</label>
          <input
            type="time"
            value={programInfo.startTime}
            onChange={(e) => handleTimeChange('startTime', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          {/* ✅ Show formatted 12h label */}
          {programInfo.startTime && (
            <p className="text-sm text-gray-500 mt-1">
              ({formatTime12Hour(`1970-01-01T${programInfo.startTime}:00`)})
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">শেষের সময়:</label>
          <input
            type="time"
            value={programInfo.endTime}
            onChange={(e) => handleTimeChange('endTime', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          {programInfo.endTime && (
            <p className="text-sm text-gray-500 mt-1">
              ({formatTime12Hour(`1970-01-01T${programInfo.endTime}:00`)})
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgramInfo;
