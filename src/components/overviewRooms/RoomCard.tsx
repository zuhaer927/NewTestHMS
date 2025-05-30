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
        return 'bg-red-300 border-red-500';
      }
      return 'bg-amber-300 border-amber-500';
    }
    return 'bg-green-200 border-green-400';
  };

  return (
    <div 
      className={`card card-hover border ${getStatusColor()} p-3 flex items-center justify-center h-15 text-center`}
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      <h3 className="text-lg font-semibold">{room.roomNumber}</h3>
    </div>

  );
};

export default RoomCard;