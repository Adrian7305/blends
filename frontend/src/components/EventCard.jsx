import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Users, ArrowRight } from 'lucide-react';

const EventCard = ({ event, isSaved, onToggleSave }) => {
  // Handle both frontend mock data and backend API data
  const eventId = event.id || event._id;
  const eventTitle = event.name || event.eventTitle;
  const eventImage = event.image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop';
  const collegeName = event.college || 'EventHub';
  const eventDate = event.date || event.startDate;
  const eventCategory = event.category || event.eventType;
  const eventPrice = event.price !== undefined ? event.price : event.registrationFee;

  return (
    <Link 
      to={`/event/${eventId}`}
      className="group bg-surface rounded-lg overflow-hidden transition-all duration-300 hover:bg-surface-hover hover:shadow-lg"
    >
      <div className="relative">
        <img 
          src={eventImage} 
          alt={eventTitle} 
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-4">
          <h3 className="text-lg font-bold text-white">{eventTitle}</h3>
          <p className="text-sm text-gray-300">{collegeName}</p>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm text-gray-400">
            <p>{new Date(eventDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
          </div>
          <div className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
            {eventCategory}
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="text-lg font-bold text-white">
            {eventPrice === 0 ? 'Free' : `₹${eventPrice}`}
          </div>
          <div className="flex items-center gap-1 text-gray-400 group-hover:text-primary transition-colors">
            <span>View</span>
            <ArrowRight size={16} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;