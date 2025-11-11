import React, { useState, useMemo, useEffect } from 'react';
import { Search, Filter, Calendar, MapPin, DollarSign, Clock, Users, Star, ArrowRight } from 'lucide-react';
import EventCard from '../components/EventCard';
import { eventsAPI } from '../api';

const categories = ["All", "Technical", "Cultural", "Academic", "Business", "Music", "Literary"];
const sortOptions = ["Popularity", "Date", "Price: Low to High", "Price: High to Low"];

const EventsPage = ({ events: propEvents, externalSearchTerm, externalCategory }) => {
  const [events, setEvents] = useState(propEvents || []);
  const [searchTerm, setSearchTerm] = useState(externalSearchTerm || "");
  const [selectedCategory, setSelectedCategory] = useState(externalCategory || "All");
  const [sortBy, setSortBy] = useState("Popularity");
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch events from API
  useEffect(() => {
    const fetchEvents = async () => {
      if (!propEvents) {
        setIsLoading(true);
        setError(null);
        try {
          const response = await eventsAPI.getEvents();
          const items = response.items || response.events || response.data?.items || [];
          setEvents(items);
        } catch (error) {
          console.error('Error fetching events:', error);
          setError('Failed to load events. Please try again later.');
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchEvents();
  }, [propEvents]);

  // Sync local state when external props change (from Sidebar)
  useEffect(() => {
    if (typeof externalSearchTerm === 'string') setSearchTerm(externalSearchTerm);
  }, [externalSearchTerm]);
  useEffect(() => {
    if (typeof externalCategory === 'string') setSelectedCategory(externalCategory);
  }, [externalCategory]);

  const filteredEvents = useMemo(() => {
    let filtered = (events || []).filter(event => {
      const title = (event.eventTitle || event.name || '').toLowerCase();
      const place = (event.location || event.college || '').toLowerCase();
      const desc = (event.description || '').toLowerCase();
      const matchesSearch = [title, place, desc].some(text => text.includes(searchTerm.toLowerCase()));
      const category = event.eventType || event.category;
      const matchesCategory = selectedCategory === "All" || category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    // Sort events
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "Popularity":
          // Fallback: sort by price as popularity may not exist
          return (b.popularity || 0) - (a.popularity || 0);
        case "Date":
          return new Date(a.startDate || a.date) - new Date(b.startDate || b.date);
        case "Price: Low to High":
          return (a.registrationFee ?? a.price ?? 0) - (b.registrationFee ?? b.price ?? 0);
        case "Price: High to Low":
          return (b.registrationFee ?? b.price ?? 0) - (a.registrationFee ?? a.price ?? 0);
        default:
          return 0;
      }
    });

    return filtered;
  }, [events, searchTerm, selectedCategory, sortBy]);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 backdrop-blur-sm p-4 md:p-6 mb-6 md:mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4 md:mb-6">
          <div className="flex items-center gap-3">
            <img 
              src="/images/blends-logo.png" 
              alt="Blends Logo" 
              className="w-8 h-8 md:w-10 md:h-10 rounded-lg object-cover"
            />
            <h1 className="text-2xl md:text-4xl font-bold font-display text-white">
              Events
            </h1>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 flex items-center gap-2 hover:border-purple transition-all"
            >
              <Filter size={16} />
              <span className="text-sm">Filters</span>
            </button>
          </div>
        </div>
        
        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-3 md:gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search events, clubs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-900 border border-gray-800 rounded-lg py-2 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple transition-all text-sm md:text-base"
            />
          </div>
          
          <div className="hidden md:flex gap-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-gray-900 border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple transition-all"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-gray-900 border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple transition-all"
            >
              {sortOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Mobile Filters */}
      {showFilters && (
        <div className="md:hidden mb-6 px-4">
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-4 border border-gray-800">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple transition-all text-sm"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple transition-all text-sm"
                >
                  {sortOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Events Grid */}
      <div className="px-4 md:px-8 pb-8 md:pb-12">
        {isLoading && (
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-purple border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-400 text-lg">Loading events...</p>
          </div>
        )}
        
        {error && (
          <div className="text-center py-12">
            <div className="bg-red-900/20 border border-red-800 text-red-400 px-6 py-4 rounded-lg max-w-md mx-auto">
              <p className="text-lg mb-2">Error Loading Events</p>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        )}
        
        {!isLoading && !error && (
          <>
            <div className="mb-4 md:mb-6">
              <p className="text-gray-400 text-sm md:text-base">
                Found <span className="text-purple font-semibold">{filteredEvents.length}</span> events
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {filteredEvents.map((event, index) => (
                <div key={event.id || event._id} className="animate-fadeInUp" style={{ animationDelay: `${index * 100}ms` }}>
                  <EventCard event={event} />
                </div>
              ))}
            </div>
            
            {filteredEvents.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">No events found matching your criteria.</p>
                <p className="text-gray-500 text-sm mt-2">Try adjusting your search or filters.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default EventsPage;
