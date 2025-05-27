import React, { useState } from 'react';
import { Room, RoomCategory } from '../../types';
import { useRoomStore } from '../../store/useRoomStore';
import { X, Plus } from 'lucide-react';
import toast from 'react-hot-toast';

interface RoomFormProps {
  initialRoom?: Room;
  onSubmit: () => void;
  onCancel: () => void;
}

const RoomForm: React.FC<RoomFormProps> = ({ initialRoom, onSubmit, onCancel }) => {
  const { addRoom, updateRoom } = useRoomStore();
  
  const [roomNumber, setRoomNumber] = useState(initialRoom?.roomNumber || '');
  const [floor, setFloor] = useState(initialRoom?.floor.toString() || '1');
  const [category, setCategory] = useState<RoomCategory>(initialRoom?.category || 'Double');
  const [beds, setBeds] = useState(initialRoom?.beds.toString() || '1');
  const [bathrooms, setBathrooms] = useState(initialRoom?.bathrooms.toString() || '1');
  const [hasAC, setHasAC] = useState(initialRoom?.hasAC || false);
  const [description, setDescription] = useState(initialRoom?.description || '');
  const [problems, setProblems] = useState<string[]>(initialRoom?.problems || []);
  const [newProblem, setNewProblem] = useState('');
  
  const categories: RoomCategory[] = ['Double', 'Couple', 'Connecting'];
  
  const handleAddProblem = (e: React.FormEvent) => {
    e.preventDefault();
    if (newProblem.trim()) {
      setProblems([...problems, newProblem.trim()]);
      setNewProblem('');
    }
  };
  
  const handleRemoveProblem = (index: number) => {
    setProblems(problems.filter((_, i) => i !== index));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!roomNumber.trim()) {
      toast.error('Room number is required');
      return;
    }
    
    const roomData = {
      roomNumber: roomNumber.trim(),
      floor: parseInt(floor, 10),
      category,
      beds: parseInt(beds, 10),
      bathrooms: parseInt(bathrooms, 10),
      hasAC,
      description: description.trim(),
      problems: [...problems],
    };
    
    if (initialRoom) {
      // Update existing room
      updateRoom(initialRoom.id, roomData);
    } else {
      // Add new room
      addRoom(roomData);
    }
    
    onSubmit();
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="roomNumber" className="block text-sm font-medium text-gray-700 mb-1">
            Room Number*
          </label>
          <input
            type="text"
            id="roomNumber"
            value={roomNumber}
            onChange={(e) => setRoomNumber(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
            required
          />
        </div>
        
        <div>
          <label htmlFor="floor" className="block text-sm font-medium text-gray-700 mb-1">
            Floor*
          </label>
          <input
            type="number"
            id="floor"
            value={floor}
            onChange={(e) => setFloor(e.target.value)}
            min="1"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
            required
          />
        </div>
        
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Category*
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value as RoomCategory)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
            required
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label htmlFor="beds" className="block text-sm font-medium text-gray-700 mb-1">
            Beds*
          </label>
          <input
            type="number"
            id="beds"
            value={beds}
            onChange={(e) => setBeds(e.target.value)}
            min="1"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
            required
          />
        </div>
        
        <div>
          <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700 mb-1">
            Bathrooms*
          </label>
          <input
            type="number"
            id="bathrooms"
            value={bathrooms}
            onChange={(e) => setBathrooms(e.target.value)}
            min="1"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
            required
          />
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="hasAC"
            checked={hasAC}
            onChange={(e) => setHasAC(e.target.checked)}
            className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
          />
          <label htmlFor="hasAC" className="ml-2 block text-sm text-gray-700">
            Has Air Conditioner
          </label>
        </div>
      </div>
      
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Problems List
        </label>
        
        <div className="space-y-2 mb-3">
          {problems.map((problem, index) => (
            <div key={index} className="flex items-center bg-gray-50 p-2 rounded-md">
              <span className="flex-1 text-gray-700">{problem}</span>
              <button
                type="button"
                onClick={() => handleRemoveProblem(index)}
                className="p-1 text-gray-500 hover:text-red-500"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
        
        <div className="flex">
          <input
            type="text"
            value={newProblem}
            onChange={(e) => setNewProblem(e.target.value)}
            placeholder="Add a problem"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
          />
          <button
            type="button"
            onClick={handleAddProblem}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-r-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      <div className="flex justify-end space-x-3 pt-4 border-t">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
        >
          {initialRoom ? 'Update Room' : 'Add Room'}
        </button>
      </div>
    </form>
  );
};

export default RoomForm;