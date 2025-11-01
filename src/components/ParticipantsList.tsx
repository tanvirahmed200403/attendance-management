import React from 'react';
import { Participant, DropdownOptions } from '../types';
import { displayTime } from '../utils/helpers'; // ✅ use the new 12h helper
import { DEFAULT_SELECT } from '../utils/constants';

interface ParticipantsListProps {
  participants: Participant[];
  isEditMode: boolean;
  onToggleStatus: (id: string) => void;
  onOpenModal: (participant: Participant) => void;
  onUpdateParticipant: (id: string, updates: Partial<Participant>) => void;
  dropdownOptions: DropdownOptions;
   onDeleteParticipant: (id: string) => void; // ✅ add this (optional)
}

const ParticipantsList: React.FC<ParticipantsListProps> = ({ 
  participants, 
  isEditMode, 
  onToggleStatus, 
  onOpenModal,
  onUpdateParticipant,
  dropdownOptions, 
    onDeleteParticipant // ✅ include here

}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        📋 অংশগ্রহণকারীদের তালিকা
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
            <tr>
              <th className="px-4 py-3 text-left">ওয়ার্ড</th>
              <th className="px-4 py-3 text-left">নাম</th>
              <th className="px-4 py-3 text-left">মান</th>
              <th className="px-4 py-3 text-left">আসার সময়</th>
              <th className="px-4 py-3 text-left">যাওয়ার সময়</th>
              <th className="px-4 py-3 text-left">ছুটি</th>
              <th className="px-4 py-3 text-left">আ্যাকশন</th>
              <th className="px-4 py-3 text-left">কল</th>
            </tr>
          </thead>

          <tbody>
            {participants.map((p, idx) => (
              <tr 
                key={p.id} 
                className={`border-b ${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-purple-50 transition-colors`}
              >
                {/* ওয়ার্ড */}
                <td className="px-4 py-3">
                  {isEditMode ? (
                    <select
                      value={p.ward}
                      onChange={(e) => onUpdateParticipant(p.id, { ward: e.target.value })}
                      className="px-2 py-1 border rounded text-sm"
                    >
                      <option value="">{DEFAULT_SELECT}</option>
                      {dropdownOptions.wards.map(w => <option key={w} value={w}>{w}</option>)}
                    </select>
                  ) : p.ward}
                </td>

                {/* নাম */}
                <td className="px-4 py-3">
                  {isEditMode ? (
                    <input
                      type="text"
                      value={p.name}
                      onChange={(e) => onUpdateParticipant(p.id, { name: e.target.value })}
                      className="px-2 py-1 border rounded text-sm w-full"
                    />
                  ) : (
                    <button
                      onClick={() => onOpenModal(p)}
                      className="text-blue-600 hover:underline font-medium"
                    >
                      {p.name}
                    </button>
                  )}
                </td>

                {/* মান */}
                <td className="px-4 py-3">
                  {isEditMode ? (
                    <select
                      value={p.man}
                      onChange={(e) => onUpdateParticipant(p.id, { man: e.target.value })}
                      className="px-2 py-1 border rounded text-sm"
                    >
                      <option value="">{DEFAULT_SELECT}</option>
                      {dropdownOptions.mans.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                  ) : p.man}
                </td>

                {/* আসার সময় */}
                <td className="px-4 py-3">
                  {isEditMode ? (
                    <input
                      type="time"
                      value={p.arrivalTime}
                      onChange={(e) => onUpdateParticipant(p.id, { arrivalTime: e.target.value })}
                      className="px-2 py-1 border rounded text-sm"
                    />
                  ) : (
                    displayTime(p.arrivalTime) || '-'
                  )}
                </td>

                {/* যাওয়ার সময় */}
                <td className="px-4 py-3">
                  {isEditMode ? (
                    <input
                      type="time"
                      value={p.departureTime}
                      onChange={(e) => onUpdateParticipant(p.id, { departureTime: e.target.value })}
                      className="px-2 py-1 border rounded text-sm"
                    />
                  ) : (
                    displayTime(p.departureTime) || '-'
                  )}
                </td>

                {/* ছুটি */}
                <td className="px-4 py-3">
                  {isEditMode ? (
                    <select
                      value={p.chuti}
                      onChange={(e) => onUpdateParticipant(p.id, { chuti: e.target.value })}
                      className="px-2 py-1 border rounded text-sm"
                    >
                      <option value="">{DEFAULT_SELECT}</option>
                      {dropdownOptions.chutis.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  ) : (p.chuti || '-')}
                </td>

                {/* অ্যাকশন */}
                <td className="px-4 py-3">
                  <button
                    onClick={() => onToggleStatus(p.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      p.status === 'not-arrived'
                        ? 'bg-green-500 hover:bg-green-600 text-white'
                        : p.status === 'present'
                        ? 'bg-blue-500 hover:bg-blue-600 text-white'
                        : 'bg-gray-400 text-white cursor-not-allowed'
                    }`}
                    disabled={p.status === 'left'}
                  >
                    {p.status === 'not-arrived'
                      ? 'এসেছে'
                      : p.status === 'present'
                      ? 'চলে গেছে'
                      : 'চলে গেছে'}
                  </button>
                </td>

                {/* কল */}
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {p.phones.map(phone => (
                      <a
                        key={phone.id}
                        href={`tel:${phone.number}`}
                        className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs hover:bg-blue-200 transition-colors"
                      >
                        {phone.label}
                      </a>
                    ))}
                  </div>
                </td>
{isEditMode && (
  <td className="px-4 py-3 text-right">
    <button
      onClick={() => onDeleteParticipant && onDeleteParticipant(p.id)} // ✅ safe call
      className="text-red-600 hover:text-red-800 font-bold text-lg"
      title="অংশগ্রহণকারী মুছে ফেলুন"
    >
      ×
    </button>
  </td>
)}

              </tr>
            ))}
          </tbody>
        </table>

        {participants.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            কোনো অংশগ্রহণকারী নেই
          </div>
        )}
      </div>
    </div>
  );
};

export default ParticipantsList;
