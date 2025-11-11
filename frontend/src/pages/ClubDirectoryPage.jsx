import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Users, Filter } from 'lucide-react';

const ClubCard = ({ club }) => (
  <Link
    to={`/club/${club.id}`}
    className="group bg-surface rounded-lg overflow-hidden transition-all duration-300 hover:bg-surface-hover hover:shadow-lg p-6 flex flex-col justify-between hover:shadow-purple-500/10 hover:-translate-y-1"
  >
    <div>
      <div className="flex items-start justify-between mb-4">
        <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
          <Users size={32} className="text-primary" />
        </div>
        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
          {club.events} events
        </span>
      </div>
      <h3 className="text-xl font-bold mb-2 text-white">{club.name}</h3>
      <p className="text-gray-400 text-sm mb-3 line-clamp-2">{club.description}</p>
      <p className="text-primary text-sm font-medium mb-4">{club.college}</p>
    </div>
    <div className="mt-auto">
      <div className="flex flex-wrap gap-2">
        {Object.entries(club.types).slice(0, 3).map(([type, count]) => (
          <span
            key={type}
            className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full"
          >
            {type}: {count}%
          </span>
        ))}
      </div>
    </div>
  </Link>
);

const ClubDirectoryPage = ({ clubs }) => {
  const [selectedCollege, setSelectedCollege] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const colleges = [...new Set(clubs.map(club => club.college))].sort();
  
  const filteredClubs = clubs.filter(club => {
    const matchesCollege = !selectedCollege || club.college === selectedCollege;
    const matchesSearch = !searchTerm || 
      club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      club.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCollege && matchesSearch;
  });

  return (
    <div className="animate-fadeIn">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold font-display">Club Directory</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <select
              value={selectedCollege}
              onChange={(e) => setSelectedCollege(e.target.value)}
              className="w-full pl-4 pr-10 py-2 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all text-white appearance-none hover:shadow-lg hover:shadow-purple-500/20"
            >
              <option value="">All Colleges</option>
              {colleges.map(college => (
                <option key={college} value={college}>{college}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredClubs.map((club, index) => (
          <div
            key={club.id}
            className="animate-fadeInUp"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <ClubCard club={club} />
          </div>
        ))}
      </div>

      {filteredClubs.length === 0 && (
        <div className="text-center py-20 col-span-full">
          <div className="text-6xl mb-4">😢</div>
          <h3 className="text-2xl font-bold text-gray-300 mb-2">No Clubs Found</h3>
          <p className="text-gray-500">Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
};

export default ClubDirectoryPage;