import React from 'react';
import { BedDouble, Users, Calendar } from 'lucide-react';
import { TabType } from '../../types';

interface TabsProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

const Tabs: React.FC<TabsProps> = ({ activeTab, setActiveTab }) => {
  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    {
      id: 'rooms',
      label: 'Rooms',
      icon: <BedDouble className="w-5 h-5" />,
    },
    {
      id: 'guests',
      label: 'Guests',
      icon: <Users className="w-5 h-5" />,
    },
    {
      id: 'bookings',
      label: 'Bookings',
      icon: <Calendar className="w-5 h-5" />,
    },
  ];

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="container mx-auto">
        <nav className="flex space-x-4" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors duration-200 ${
                activeTab === tab.id
                  ? 'border-teal-600 text-teal-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              aria-current={activeTab === tab.id ? 'page' : undefined}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
          {isAdmin && (
          <button
            onClick={handleAddRoom}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Room
          </button>
        )}
        </nav>
      </div>
    </div>
  );
};

export default Tabs;