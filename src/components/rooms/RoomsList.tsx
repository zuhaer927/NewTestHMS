import React, { useState, useMemo } from 'react';
import { Room, RoomCategory, RoomFilter } from '../../types';
import RoomCard from './RoomCard';
import { useRoomStore } from '../../store/useRoomStore';
import { useBookingStore } from '../../store/useBookingStore';
import { format, addDays } from 'date-fns';

interface RoomsListProps {
  onSelectRoom: (roomId: string) => void;
  filter: RoomFilter;
}

const RoomsList: React.FC<RoomsListProps> = ({ onSelectRoom, filter }) => {
  const { getAllRooms, getRoomsByCategory } = useRoomStore();
  const { getBookingsForRoom, getCurrentBookingsForRoom, isRoomAvailable } = useBookingStore();
  
  const today = new Date();
  const formattedToday = format(today, 'yyyy-MM-dd');
  const formattedTomorrow = format(addDays(today, 1), 'yyyy-MM-dd');

  const [startDate] = useState(filter.startDate || formattedToday);
  const [endDate] = useState(filter.endDate || formattedTomorrow);

  const filteredRooms = useMemo(() => {
    let rooms = filter.category ? getRoomsByCategory(filter.category) : getAllRooms();
    
    return rooms.sort((a, b) => {
      // Sort by floor first
      if (a.floor !== b.floor) {
        return a.floor - b.floor;
      }
      // Then by room number
      return a.roomNumber.localeCompare(b.roomNumber);
    });
  }, [getAllRooms, getRoomsByCategory, filter.category]);

  // Separate available and occupied/booked rooms
  const { availableRooms, occupiedOrBookedRooms } = useMemo(() => {
    const available: Room[] = [];
    const occupiedOrBooked: Room[] = [];

    filteredRooms.forEach(room => {
      const currentBooking = getCurrentBookingsForRoom(room.id)[0];
      const isAvailable = isRoomAvailable(room.id, startDate, endDate);
      
      if (isAvailable && !currentBooking) {
        available.push(room);
      } else {
        occupiedOrBooked.push(room);
      }
    });

    return { availableRooms: available, occupiedOrBookedRooms: occupiedOrBooked };
  }, [filteredRooms, getCurrentBookingsForRoom, isRoomAvailable, startDate, endDate]);

  if (filteredRooms.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No rooms found with the selected criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <span className="inline-block w-3 h-3 rounded-full bg-green-500 mr-2"></span>
          Available Rooms ({availableRooms.length})
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {availableRooms.length > 0 ? (
            availableRooms.map(room => (
              <RoomCard 
                key={room.id}
                room={room}
                isAvailable={true}
                onClick={() => onSelectRoom(room.id)}
              />
            ))
          ) : (
            <p className="text-gray-500 col-span-2 py-6 text-center">No available rooms for the selected dates.</p>
          )}
        </div>
      </div>
      
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <span className="inline-block w-3 h-3 rounded-full bg-amber-500 mr-2"></span>
          Occupied & Booked Rooms ({occupiedOrBookedRooms.length})
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {occupiedOrBookedRooms.length > 0 ? (
            occupiedOrBookedRooms.map(room => {
              const currentBooking = getCurrentBookingsForRoom(room.id)[0];
              return (
                <RoomCard 
                  key={room.id}
                  room={room}
                  currentBooking={currentBooking}
                  isAvailable={false}
                  onClick={() => onSelectRoom(room.id)}
                />
              );
            })
          ) : (
            <p className="text-gray-500 col-span-2 py-6 text-center">No occupied or booked rooms.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomsList;