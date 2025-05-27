import { create } from 'zustand';
import { Room, RoomCategory } from '../types';
import { v4 as uuidv4 } from 'uuid';

interface RoomState {
  rooms: Room[];
  addRoom: (room: Omit<Room, 'id'>) => string;
  updateRoom: (id: string, roomData: Partial<Room>) => boolean;
  deleteRoom: (id: string) => boolean;
  getRoomById: (id: string) => Room | undefined;
  getRoomsByCategory: (category: RoomCategory) => Room[];
  getAllRooms: () => Room[];
}

// Demo initial data
const initialRooms: Room[] = [
  {
    id: '1',
    roomNumber: '101',
    floor: 1,
    category: 'Double',
    beds: 2,
    bathrooms: 1,
    hasAC: true,
    description: 'Spacious room with ocean view',
    problems: [],
  },
  {
    id: '2',
    roomNumber: '102',
    floor: 1,
    category: 'Couple',
    beds: 1,
    bathrooms: 1,
    hasAC: true,
    description: 'Cozy room for couples with private balcony',
    problems: [],
  },
  {
    id: '3',
    roomNumber: '201',
    floor: 2,
    category: 'Connecting',
    beds: 3,
    bathrooms: 2,
    hasAC: true,
    description: 'Two connected rooms ideal for families',
    problems: ['TV remote not working'],
  },
  {
    id: '4',
    roomNumber: '202',
    floor: 2,
    category: 'Double',
    beds: 2,
    bathrooms: 1,
    hasAC: true,
    description: 'Mountain view room with extra space',
    problems: [],
  },
  {
    id: '5',
    roomNumber: '301',
    floor: 3,
    category: 'Couple',
    beds: 1,
    bathrooms: 1,
    hasAC: true,
    description: 'Premium couple room with sea view',
    problems: [],
  },
];

export const useRoomStore = create<RoomState>((set, get) => ({
  rooms: initialRooms,

  addRoom: (roomData) => {
    const id = uuidv4();
    const newRoom = { ...roomData, id };
    set((state) => ({ rooms: [...state.rooms, newRoom] }));
    return id;
  },

  updateRoom: (id, roomData) => {
    let updated = false;
    set((state) => {
      const updatedRooms = state.rooms.map((room) => {
        if (room.id === id) {
          updated = true;
          return { ...room, ...roomData };
        }
        return room;
      });
      return { rooms: updatedRooms };
    });
    return updated;
  },

  deleteRoom: (id) => {
    let deleted = false;
    set((state) => {
      const filteredRooms = state.rooms.filter((room) => {
        if (room.id === id) {
          deleted = true;
          return false;
        }
        return true;
      });
      return { rooms: filteredRooms };
    });
    return deleted;
  },

  getRoomById: (id) => {
    return get().rooms.find((room) => room.id === id);
  },

  getRoomsByCategory: (category) => {
    return get().rooms.filter((room) => room.category === category);
  },

  getAllRooms: () => {
    return get().rooms;
  },
}));