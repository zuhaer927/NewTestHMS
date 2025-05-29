import React from 'react';
import { Room, Booking } from '../../types';
import { BedDouble, Droplets, Thermometer, AlertTriangle } from 'lucide-react';
import { format, parseISO, addDays } from 'date-fns';

interface RoomCardProps {
  room: Room;
  currentBooking?: Booking;
  onClick: () => void;
  isAvailable: boolean;
}

const RoomCard: React.FC<RoomCardProps> = ({ room, currentBooking, onClick, isAvailable }) => {
  const getStatusColor = () => {
    if (!isAvailable) {
      if (currentBooking?.checkInDateTime && !currentBooking?.checkOutDateTime) {
        return 'bg-red-200 border-red-400';
      }
      return 'bg-amber-100 border-amber-300';
    }
    return 'bg-green-200 border-green-300';
  };

  return (
    <div 
      className={`card card-hover border ${getStatusColor()} p-3`}
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h3 className="text-lg font-semibold">Room {room.roomNumber}</h3>
          <div className="flex items-center space-x-3 text-gray-600">
            <div className="flex items-center">
              <BedDouble className="h-4 w-4" />
              <span className="ml-1">{room.beds}</span>
            </div>
            <div className="flex items-center">
              <Thermometer className="h-4 w-4" />
              <span className="ml-1">{room.hasAC ? 'AC' : '-'}</span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-xs font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
              {room.category}
            </span>
            {room.problems.length > 0 && (
              <AlertTriangle className="h-4 w-4 text-red-600" />
            )}
          </div>
        </div>
      </div>

      {currentBooking && (
        <div className="pt-2">
          <p className="text-sm font-medium">{currentBooking.guestName}</p>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>
              {format(parseISO(currentBooking.bookingDate), 'dd/MM/yyyy')} - 
              {format(addDays(parseISO(currentBooking.bookingDate), currentBooking.durationDays), 'dd/MM/yyyy')}
            </span>
            <span>{currentBooking.durationDays} days</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomCard;