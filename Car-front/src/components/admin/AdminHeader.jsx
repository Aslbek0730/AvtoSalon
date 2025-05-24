import React from 'react';
import { BellIcon, Search, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminHeader = () => {
  const { user } = useAuth();

  return (
    <header className="bg-white shadow-sm px-4 py-4 flex items-center justify-between">
      {/* Search Bar */}
      <div className="relative max-w-md w-full mr-4 hidden md:block">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search..."
          className="form-control pl-10"
        />
      </div>

      <div className="flex items-center space-x-4">
        {/* Notification Bell */}
        <div className="relative">
          <button className="p-2 rounded-full text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none">
            <BellIcon className="h-6 w-6" />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
          </button>
        </div>

        {/* User Menu */}
        <div className="relative group">
          <button className="flex items-center text-gray-700 hover:text-gray-900 focus:outline-none">
            <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
              <User className="h-5 w-5" />
            </div>
            <span className="ml-2 font-medium hidden md:block">
              {user?.name || 'Admin'}
            </span>
          </button>
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right">
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Your Profile
            </a>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Settings
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader; 