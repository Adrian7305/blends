import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Calendar, Building2, Ticket, LogOut, Search } from 'lucide-react';

const Sidebar = ({ userProfile, onLogout }) => {
  return (
    <div className="w-64 bg-black text-white flex flex-col p-4 border-r border-gray-800 overflow-y-auto">
      <Link to="/" className="flex items-center gap-2 mb-10">
        <img 
          src="/images/blends-logo.png" 
          alt="Blends Logo" 
          className="w-10 h-10 rounded-lg object-cover"
        />
        <span className="text-2xl font-bold font-display">Blends</span>
      </Link>

      <nav className="flex flex-col gap-2">
        <NavLink to="/events" className="nav-link">
          <Calendar size={20} />
          <span>Events</span>
        </NavLink>
        <NavLink to="/search" className="nav-link">
          <Search size={20} />
          <span>Search</span>
        </NavLink>
        <NavLink to="/clubs" className="nav-link">
          <Building2 size={20} />
          <span>Clubs</span>
        </NavLink>
        <NavLink to="/tickets" className="nav-link">
          <Ticket size={20} />
          <span>My Tickets</span>
        </NavLink>
      </nav>

      {/* Search functionality moved to dedicated Search page */}

      <div className="mt-auto">
        <div className="border-t border-gray-800 mb-4"></div>
        <Link to="/profile" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800">
          <img 
            src={userProfile.profileImage} 
            alt="Profile" 
            className="w-10 h-10 rounded-full object-cover border-2 border-purple"
          />
          <div>
            <p className="font-semibold">{userProfile.name}</p>
            <p className="text-sm text-gray-400">View Profile</p>
          </div>
        </Link>
        <button onClick={onLogout} className="w-full flex items-center gap-3 p-2 mt-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800">
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
