import React from 'react';
import { Hotel, LogOut } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';

const Header: React.FC = () => {
  const { currentUser, logout } = useAuthStore();

  return (
    <header className="bg-gradient-to-r from-blue-900 to-teal-800 text-white py-4 px-6 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Hotel className="h-8 w-8 text-teal-400" />
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Sea Star Resort</h1>
            <p className="text-xs text-teal-300">Cox's Bazar</p>
          </div>
        </div>

        {currentUser && (
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="font-medium">{currentUser.name}</p>
              <p className="text-xs text-teal-300 capitalize">{currentUser.role}</p>
            </div>
            <button
              onClick={logout}
              className="p-2 rounded-full hover:bg-teal-700 transition-colors"
              aria-label="Logout"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;