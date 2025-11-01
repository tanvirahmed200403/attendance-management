import React, { useState, useEffect } from 'react';
import { Participant, DropdownOptions } from '../types';
import { DEFAULT_SELECT } from '../utils/constants';
import PhoneManager from './PhoneManager';

interface ParticipantModalProps {
  participant: Participant | null;
  onClose: () => void;
  onSave: (participant: Participant) => void;
  dropdownOptions: DropdownOptions;
}

const ParticipantModal: React.FC<ParticipantModalProps> = ({ participant, onClose, onSave, dropdownOptions }) => {
  const [formData, setFormData] = useState<Participant | null>(participant);

  useEffect(() => {
    setFormData(participant);
  }, [participant]);

  if (!participant || !formData) return null;

  const handleSave = () => {
    if (formData) {
      onSave(formData);
      onClose();
    }
  };

  const addTag = (tag: string) => {
    if (tag && formData && !formData.tags.includes(tag)) {
      setFormData({ ...formData, tags: [...formData.tags, tag] });
    }
  };

  const removeTag = (tagToRemove: string) => {
    if (formData) {
      setFormData({ ...formData, tags: formData.tags.filter(t => t !== tagToRemove) });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-t-xl">
          <h2 className="text-2xl font-bold">অংশগ্রহণকারীর তথ্য</h2>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">নাম:</label>
              <input type="text" value={formData.name} readOnly className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">মান:</label>
              <input type="text" value={formData.man} readOnly className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">ওয়ার্ড:</label>
              <input type="text" value={formData.ward} readOnly className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">উপশাখা:</label>
              <select value={formData.uposhakha} onChange={(e) => setFormData({ ...formData, uposhakha: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500">
                <option value="">{DEFAULT_SELECT}</option>
                {dropdownOptions.uposhakhas.map(u => <option key={u} value={u}>{u}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">রক্তের গ্রুপ:</label>
              <input type="text" value={formData.bloodGroup} onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">প্রতিষ্ঠান:</label>
              <input type="text" value={formData.institute} onChange={(e) => setFormData({ ...formData, institute: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">লেভেল:</label>
              <select value={formData.level} onChange={(e) => setFormData({ ...formData, level: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500">
                <option value="">{DEFAULT_SELECT}</option>
                <option value="school">School</option>
                <option value="college">College</option>
                <option value="university">University</option>
                <option value="masters">Masters</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">রোল/আইডি:</label>
              <input type="text" value={formData.rollId} onChange={(e) => setFormData({ ...formData, rollId: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500" />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">ক্লাস/বছর/সেমিস্টার:</label>
              <input type="text" value={formData.classYearSemester} onChange={(e) => setFormData({ ...formData, classYearSemester: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500" />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">ট্যাগস:</label>
            <select onChange={(e) => { addTag(e.target.value); e.target.value = ''; }} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 mb-2">
              <option value="">{DEFAULT_SELECT}</option>
              {dropdownOptions.tags.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
            <div className="flex flex-wrap gap-2">
              {formData.tags.map(tag => (
                <span key={tag} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                  {tag}
                  <button onClick={() => removeTag(tag)} className="text-purple-600 hover:text-purple-800 font-bold">×</button>
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">ফোন নম্বর:</label>
            <PhoneManager phones={formData.phones} onChange={(phones) => setFormData({ ...formData, phones })} />
          </div>

          <div className="flex gap-4 pt-4">
            <button onClick={handleSave} className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-medium">
              সংরক্ষণ করুন
            </button>
            <button onClick={onClose} className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-lg font-medium">
              বাতিল
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParticipantModal;
