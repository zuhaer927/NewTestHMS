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
        </nav>
      </div>
    </div>
  );
};

export default Tabs;