import React from 'react';
import { Room, Booking } from '../../types';
import { BedDouble, Droplets, Thermometer, MoreHorizontal, AlertTriangle } from 'lucide-react';
import { format, parseISO, isAfter, addDays } from 'date-fns';

interface RoomCardProps {
  room: Room;
  currentBooking?: Booking;
  onClick: () => void;
  isAvailable: boolean;
}

const RoomCard: React.FC<RoomCardProps> = ({ room, currentBooking, onClick, isAvailable }) => {
  const getStatusColor = () => {
    if (currentBooking?.checkInDateTime && !currentBooking?.checkOutDateTime) {
      return 'bg-red-100 border-red-300';
    }
    if (!isAvailable) {
      return 'bg-amber-100 border-amber-300';
    }
    return 'bg-green-100 border-green-300';
  };

  const getStatusText = () => {
    if (currentBooking?.checkInDateTime && !currentBooking?.checkOutDateTime) {
      return 'Occupied';
    }
    if (!isAvailable) {
      return 'Booked';
    }
    return 'Available';
  };

  const getStatusDot = () => {
    if (currentBooking?.checkInDateTime && !currentBooking?.checkOutDateTime) {
      return 'bg-red-500';
    }
    if (!isAvailable) {
      return 'bg-amber-500';
    }
    return 'bg-green-500';
  };

  return (
    <div 
      className={`card card-hover border ${getStatusColor()}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-lg font-semibold">Room {room.roomNumber}</h3>
            <p className="text-sm text-gray-600">Floor {room.floor}</p>
          </div>
          <div className="flex items-center">
            <span className={`inline-block w-3 h-3 rounded-full ${getStatusDot()} mr-2`}></span>
            <span className="text-sm font-medium">{getStatusText()}</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-3">
          <div className="flex items-center text-sm text-gray-700">
            <BedDouble className="h-4 w-4 mr-1 text-gray-500" />
            <span>{room.beds} {room.beds > 1 ? 'Beds' : 'Bed'}</span>
          </div>
          <div className="flex items-center text-sm text-gray-700">
            <Droplets className="h-4 w-4 mr-1 text-gray-500" />
            <span>{room.bathrooms} Bath</span>
          </div>
          <div className="flex items-center text-sm text-gray-700">
            <Thermometer className="h-4 w-4 mr-1 text-gray-500" />
            <span>{room.hasAC ? 'AC' : 'No AC'}</span>
          </div>
        </div>

        <div className="mb-3">
          <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
            {room.category}
          </span>
        </div>

        {room.problems.length > 0 && (
          <div className="flex items-start space-x-2 text-sm text-red-600 mt-2">
            <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <p>{room.problems.length} issue{room.problems.length > 1 ? 's' : ''}</p>
          </div>
        )}

        {currentBooking && (
          <div className="mt-3 pt-3 border-t border-gray-200">
            <p className="text-sm font-medium">{currentBooking.guestName}</p>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>
                {format(parseISO(currentBooking.bookingDate), 'MMM d')} - 
                {format(addDays(parseISO(currentBooking.bookingDate), currentBooking.durationDays), 'MMM d')}
              </span>
              <span>{currentBooking.durationDays} days</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomCard;