import React from 'react';
import { Search, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import NotificationBell from './NotificationBell';

const Header = ({ userProfile, unreadCount, showNotifications, setShowNotifications, notifications, markNotificationRead }) => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleNotificationsClick = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <header className="flex items-center justify-between p-4 bg-black/50 backdrop-blur-sm sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <img 
          src="/images/blends-logo.png" 
          alt="Blends Logo" 
          className="w-8 h-8 rounded-lg object-cover md:hidden"
        />
      </div>
      
      <div className="flex-1 max-w-xl mx-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Search for events, clubs, or artists..." 
            className="w-full bg-gray-900 border border-gray-800 rounded-full py-2 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple transition-all text-sm md:text-base"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <NotificationBell 
          notifications={notifications}
          showNotifications={showNotifications}
          setShowNotifications={setShowNotifications}
          unreadCount={unreadCount}
          markNotificationRead={markNotificationRead}
        />
        
        <button 
          onClick={handleProfileClick}
          className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-800 transition-all"
        >
          <img 
            src={userProfile.profileImage} 
            alt="Profile" 
            className="w-8 h-8 rounded-full object-cover border-2 border-purple"
          />
        </button>
      </div>
    </header>
  );
};

export default Header;