import React from 'react';
import BookingsList from '../components/bookings/BookingsList';

const BookingsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Bookings</h1>
      </div>
      
      <BookingsList />
    </div>
  );
};

export default BookingsPage;