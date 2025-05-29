import React from 'react';
import GuestsList from '../components/guests/GuestsList';

const GuestsPage: React.FC = () => {
  return (
    <div className="space-y-2">
      <GuestsList />
    </div>
  );
};

export default GuestsPage;