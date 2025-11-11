import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Users, Calendar, MapPin, Mail, Globe, Star, Tag, TrendingUp } from 'lucide-react';
import PieChart from '../components/PieChart';
import EventCard from '../components/EventCard';

const StatCard = ({ label, value, icon: Icon, color }) => (
  <div className="bg-surface-hover p-6 rounded-lg flex flex-col items-center justify-center text-center">
    <div className={`p-3 bg-${color}-500/10 rounded-full mb-3`}>
      <Icon size={24} className={`text-${color}-400`} />
    </div>
    <p className="text-2xl font-bold text-white">{value}</p>
    <p className="text-sm text-gray-400">{label}</p>
  </div>
);

const ClubDetailPage = ({ events, clubs }) => {
  const { id } = useParams();
  const club = clubs.find(c => c.id === parseInt(id));

  if (!club) return null;

  const clubEvents = events.filter(event => event.organizer === club.name);

  const pieChartData = Object.entries(club.types).map(([type, count]) => ({
    name: type,
    value: count,
    color: type === 'Technical' ? '#8B5CF6' :
           type === 'Cultural' ? '#EC4899' :
           type === 'Academic' ? '#3B82F6' : '#10B981',
  }));

  return (
    <div className="animate-fadeIn">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link to="/clubs" className="text-gray-400 hover:text-primary transition-colors">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-4xl font-bold font-display">Club Details</h1>
      </div>

      {/* Club Banner */}
      <div className="bg-surface rounded-lg p-8 mb-8 flex items-center gap-8">
        <div className="w-24 h-24 bg-primary/10 rounded-2xl flex items-center justify-center">
          <Users size={48} className="text-primary" />
        </div>
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-white">{club.name}</h2>
          <p className="text-primary font-medium mb-3">{club.college}</p>
          <p className="text-gray-300 leading-relaxed">{club.description}</p>
        </div>
        <button className="btn-primary self-start">Join Club</button>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <StatCard label="Total Events" value={club.events} icon={Calendar} color="purple" />
        <StatCard label="Average Rating" value={club.avgRating || 4.5} icon={Star} color="yellow" />
        <StatCard label="Active Members" value={club.memberCount || 150} icon={Users} color="blue" />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Event Distribution */}
          <div className="bg-surface rounded-lg p-8">
            <h3 className="text-2xl font-bold text-white mb-6">Event Distribution</h3>
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="flex-1">
                <PieChart data={pieChartData} />
              </div>
              <div className="space-y-3 w-full lg:w-auto">
                {pieChartData.map((item, index) => (
                  <div key={index} className="flex items-center gap-3 bg-surface-hover p-3 rounded-lg">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-gray-300">{item.name}</span>
                    <span className="text-gray-500 ml-auto font-semibold">{item.value} events</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Events */}
          <div className="bg-surface rounded-lg p-8">
            <h3 className="text-2xl font-bold text-white mb-6">Recent Events</h3>
            {clubEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {clubEvents.slice(0, 4).map(event => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-surface-hover rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar size={32} className="text-gray-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-400 mb-2">No Events Found</h4>
                <p className="text-gray-500">This club hasn't organized any events recently.</p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contact Info */}
          <div className="bg-surface rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-4">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail size={20} className="text-primary" />
                <div>
                  <p className="text-gray-400 text-sm">Email</p>
                  <a href={`mailto:${club.email || ''}`} className="font-medium text-white hover:underline">{club.email || 'Not available'}</a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Globe size={20} className="text-primary" />
                <div>
                  <p className="text-gray-400 text-sm">Website</p>
                  <a href={club.website || '#'} target="_blank" rel="noopener noreferrer" className="font-medium text-white hover:underline">{club.website || 'Not available'}</a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar size={20} className="text-primary" />
                <div>
                  <p className="text-gray-400 text-sm">Founded</p>
                  <p className="font-medium text-white">{club.foundedYear || '2020'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="bg-surface rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-4">Upcoming Events</h3>
            {clubEvents.filter(event => new Date(event.date) > new Date()).length > 0 ? (
              <div className="space-y-3">
                {clubEvents
                  .filter(event => new Date(event.date) > new Date())
                  .slice(0, 3)
                  .map(event => (
                    <Link to={`/event/${event.id}`} key={event.id} className="block p-3 bg-surface-hover rounded-lg hover:bg-primary/10 transition-colors">
                      <h4 className="font-semibold text-sm text-white mb-1">{event.name}</h4>
                      <p className="text-xs text-gray-400">{new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                    </Link>
                  ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No upcoming events scheduled.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubDetailPage;