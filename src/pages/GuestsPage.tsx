import React from 'react';
import GuestsList from '../components/guests/GuestsList';

const GuestsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Guests</h1>
      </div>
      
      <GuestsList />
    </div>
  );
};

export default GuestsPage;