import React, { useMemo, useState, useEffect } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import EventCard from '../components/EventCard';
import { eventsAPI } from '../api';

// Config for main tags and sub tags with keyword mapping
const TAG_CONFIG = [
  {
    key: 'tech',
    label: 'Tech Events',
    categories: ['Technical'],
    subTags: [
      { key: 'hackathons', label: 'Hackathons', keywords: ['hackathon', 'hackathons'] },
      { key: 'buildathons', label: 'Buildathons', keywords: ['buildathon', 'buildathons'] },
      { key: 'workshops', label: 'Workshops', keywords: ['workshop', 'workshops'] },
      { key: 'robotics', label: 'Robotics', keywords: ['robotics', 'robot'] }
    ]
  },
  {
    key: 'mun',
    label: 'MUNs',
    categories: ['Academic', 'Literary'],
    subTags: [
      { key: 'debates', label: 'Debates', keywords: ['debate', 'debates'] },
      { key: 'muns', label: 'MUNs', keywords: ['mun', 'model united nations'] },
      { key: 'public-speaking', label: 'Public Speaking', keywords: ['speaking', 'speech', 'oratory'] }
    ]
  }
];

const SearchPage = ({ savedEvents = [], toggleSaveEvent }) => {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeMainTag, setActiveMainTag] = useState(null); // 'tech' | 'mun' | null
  const [activeSubTags, setActiveSubTags] = useState([]); // array of keys
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const activeConfig = TAG_CONFIG.find((t) => t.key === activeMainTag);

  // Fetch events when page loads and when search/category changes
  useEffect(() => {
    let cancelled = false;
    const fetchEvents = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const type = activeMainTag ? (TAG_CONFIG.find(t => t.key === activeMainTag)?.categories?.[0]) : undefined;
        const res = await eventsAPI.getEvents({ q: searchTerm || undefined, type });
        const items = res.items || res.events || res.data?.items || [];
        if (!cancelled) setEvents(items);
      } catch (err) {
        if (!cancelled) setError(err.message || 'Failed to load events');
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };
    fetchEvents();
    return () => { cancelled = true; };
  }, [searchTerm, activeMainTag]);

  const toggleSubTag = (key) => {
    setActiveSubTags((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const filteredEvents = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    const subKeywords = (activeConfig?.subTags || [])
      .filter((s) => activeSubTags.includes(s.key))
      .flatMap((s) => s.keywords.map((k) => k.toLowerCase()));

    return (events || []).filter((e) => {
      const title = (e.eventTitle || e.name || '').toLowerCase();
      const description = (e.description || '').toLowerCase();
      const place = (e.location || e.college || '').toLowerCase();
      const text = `${title} ${description} ${place}`;
      const matchesSearch = term ? text.includes(term) : true;
      const matchesMain = activeConfig
        ? (activeConfig.categories || []).includes(e.eventType || e.category)
        : true;
      const matchesSub = subKeywords.length
        ? subKeywords.some((kw) => text.includes(kw))
        : true;
      return matchesSearch && matchesMain && matchesSub;
    });
  }, [events, searchTerm, activeConfig, activeSubTags]);

  return (
    <div className="animate-fadeIn">
      <div className="mb-6">
        <h1 className="text-4xl font-bold font-display">Search</h1>
        <p className="text-gray-400 mt-1">Find events by category and sub-tags.</p>
      </div>

      {/* Search Input */}
      <div className="mb-6">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            autoFocus
            type="text"
            placeholder="Search events, clubs, or keywords..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-900 border border-gray-800 rounded-lg py-2 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple transition-all"
          />
        </div>
      </div>

      {/* Main Tags */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {TAG_CONFIG.map((t) => (
            <button
              key={t.key}
              onClick={() => {
                setActiveMainTag((prev) => (prev === t.key ? null : t.key));
                setActiveSubTags([]);
              }}
              className={`px-4 py-2 rounded-lg text-sm border transition-colors ${
                activeMainTag === t.key
                  ? 'bg-purple text-white border-purple'
                  : 'bg-gray-900 text-gray-300 border-gray-800 hover:border-purple'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Sub Tags for active main tag */}
      {activeConfig && (
        <div className="mb-6">
          <p className="text-sm text-gray-400 mb-2">Sub tags</p>
          <div className="flex flex-wrap gap-2">
            {activeConfig.subTags.map((s) => (
              <button
                key={s.key}
                onClick={() => toggleSubTag(s.key)}
                className={`px-3 py-2 rounded-lg text-sm border transition-colors ${
                  activeSubTags.includes(s.key)
                    ? 'bg-purple text-white border-purple'
                    : 'bg-gray-900 text-gray-300 border-gray-800 hover:border-purple'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {isLoading && (
        <div className="text-gray-400 mb-4">Loading events...</div>
      )}
      {error && (
        <div className="text-red-400 mb-4">{error}</div>
      )}

      {/* Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <EventCard key={event.id || event._id} event={event} savedEvents={savedEvents} toggleSaveEvent={toggleSaveEvent} />
        ))}
        {filteredEvents.length === 0 && (
          <div className="col-span-full text-center text-gray-400 py-10">No events match your filters.</div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
  
