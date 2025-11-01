import React from 'react';
import { Participant } from '../types';

interface StatsCardsProps {
  participants: Participant[];
}

const StatsCards: React.FC<StatsCardsProps> = ({ participants }) => {
  const total = participants.length;
  const present = participants.filter(p => p.status === 'present' || p.status === 'left').length;
  const fullTime = participants.filter(p => 
    p.status === 'left' && p.arrivalTime && p.departureTime && p.chuti === 'ছুটি ছাড়া'
  ).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
        <div className="text-5xl font-bold mb-2">{total}</div>
        <div className="text-xl">মোট অংশগ্রহণকারী</div>
      </div>
      <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
        <div className="text-5xl font-bold mb-2">{present}</div>
        <div className="text-xl">উপস্থিত</div>
      </div>
      <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl p-6 text-white shadow-lg">
        <div className="text-5xl font-bold mb-2">{fullTime}</div>
        <div className="text-xl">পূর্ণসময়</div>
      </div>
    </div>
  );
};

export default StatsCards;
