import React from 'react';
import { FilterState, DropdownOptions } from '../types';
import { DEFAULT_SELECT } from '../utils/constants';

interface FilterSearchProps {
  filter: FilterState;
  setFilter: (filter: FilterState) => void;
  dropdownOptions: DropdownOptions;
  onReset: () => void;
}

const FilterSearch: React.FC<FilterSearchProps> = ({ filter, setFilter, dropdownOptions, onReset }) => {
  const removeTag = (tagToRemove: string) => {
    setFilter({ ...filter, tags: filter.tags.filter(t => t !== tagToRemove) });
  };

  const addTag = (tag: string) => {
    if (tag && !filter.tags.includes(tag)) {
      setFilter({ ...filter, tags: [...filter.tags, tag] });
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        🔍 ফিল্টার এবং খুঁজুন
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">ওয়ার্ড:</label>
          <select value={filter.ward} onChange={(e) => setFilter({ ...filter, ward: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500">
            <option value="">{DEFAULT_SELECT}</option>
            {dropdownOptions.wards.map(w => <option key={w} value={w}>{w}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">নাম:</label>
          <input type="text" value={filter.name} onChange={(e) => setFilter({ ...filter, name: e.target.value })} placeholder="নাম লিখুন" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">মান:</label>
          <select value={filter.man} onChange={(e) => setFilter({ ...filter, man: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500">
            <option value="">{DEFAULT_SELECT}</option>
            {dropdownOptions.mans.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">উপশাখা:</label>
          <select value={filter.uposhakha} onChange={(e) => setFilter({ ...filter, uposhakha: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500">
            <option value="">{DEFAULT_SELECT}</option>
            {dropdownOptions.uposhakhas.map(u => <option key={u} value={u}>{u}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">ট্যাগ:</label>
          <select onChange={(e) => { addTag(e.target.value); e.target.value = ''; }} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500">
            <option value="">{DEFAULT_SELECT}</option>
            {dropdownOptions.tags.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </div>
      {filter.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {filter.tags.map(tag => (
            <span key={tag} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm flex items-center gap-2">
              {tag}
              <button onClick={() => removeTag(tag)} className="text-purple-600 hover:text-purple-800 font-bold">×</button>
            </span>
          ))}
        </div>
      )}
      <button onClick={onReset} className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors">রিসেট</button>
    </div>
  );
};

export default FilterSearch;
