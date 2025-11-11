import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, DollarSign, Users, Clock, Star, Info, CheckCircle, XCircle, Clock10 } from 'lucide-react';
import TeamMemberModal from '../components/TeamMemberModal';
import { calculateProgress, getStageStatus } from '../utils/helpers';
import { eventsAPI } from '../api';

const EventDetailPage = ({ 
  events, 
  savedEvents, 
  toggleSaveEvent,
  setOrderDetails,
  userProfile
}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showTeamModal, setShowTeamModal] = useState(false);
  const [teamMembers, setTeamMembers] = useState([{ email: userProfile.email, status: 'accepted' }]);
  const [teamMemberStatuses, setTeamMemberStatuses] = useState({});

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Try to find event in props first (for mock data)
        const propEvent = events?.find(e => e.id === parseInt(id));
        if (propEvent) {
          setEvent(propEvent);
          setIsLoading(false);
          return;
        }

        // If not found in props, fetch from API
        const response = await eventsAPI.getEventById(id);
        // API returns { event, context }, ensure we store the actual event document
        setEvent(response.event || response.data?.event || response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load event details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvent();
  }, [id, events]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-400">Loading event details...</p>
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-400 mb-4">Event Not Found</h2>
          <p className="text-gray-400 mb-6">{error || 'The event details could not be loaded.'}</p>
          <Link to="/events" className="btn-primary">
            Go Back
          </Link>
        </div>
      </div>
    );
  }

  // Handle both frontend and API data structures
  const eventId = event.id || event._id;
  const eventTitle = event.name || event.eventTitle;
  const eventImage = event.image || event.bannerImage || '/api/placeholder/800/400';
  const collegeName = event.college || event.organizedBy;
  const eventDate = event.date || event.startDate;
  const eventCategory = event.category || event.eventType;
  const eventPrice = event.price || event.registrationFee || 0;
  const eventVenue = event.venue || event.location;
  const eventOrganizer = event.organizer || event.organizedBy;
  const eventDescription = event.description || event.description || 'No description available';
  const eventStages = event.stages || [];
  const eventTeamSize = event.teamSize || { min: 1, max: 1 };
  const eventRequiresTeam = event.requiresTeam || false;
  const eventAttachments = event.attachments || [];

  const isSaved = savedEvents.includes(eventId);
  const progress = calculateProgress(eventStages);

  const handleRegister = () => {
    if (eventRequiresTeam) {
      setShowTeamModal(true);
    } else {
      proceedToOrder();
    }
  };

  const proceedToOrder = () => {
    if (eventRequiresTeam) {
      if (teamMembers.length < (eventTeamSize?.min || 1) || teamMembers.length > (eventTeamSize?.max || 99)) {
        alert(`Please ensure your team has between ${eventTeamSize.min} and ${eventTeamSize.max} members before booking.`);
        return;
      }
      const accepted = teamMembers.every((m, idx) => idx === 0 || m.status === 'accepted');
      if (!accepted) {
        alert('All team members must accept before proceeding.');
        return;
      }
    }
    const orderData = {
      event,
      eventId,
      teamMembers: eventRequiresTeam ? teamMembers : [],
      orderNumber: 'BL' + Date.now().toString().slice(-8),
      totalAmount: eventPrice * (eventRequiresTeam ? teamMembers.length : 1),
      orderDate: new Date().toISOString()
    };
    setOrderDetails(orderData);
    navigate('/order');
  };

  const allMembersAccepted = () => {
    return teamMembers.every((member, index) => 
      index === 0 || member.status === 'accepted'
    );
  };

  const StageIcon = ({ status }) => {
    if (status === 'completed') return <CheckCircle size={20} className="text-green-400" />;
    if (status === 'active') return <Clock10 size={20} className="text-yellow-400 animate-pulse" />;
    return <Clock size={20} className="text-gray-500" />;
  };

  return (
    <div className="animate-fadeIn">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link to="/events" className="text-gray-400 hover:text-primary transition-colors">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-4xl font-bold font-display">Event Details</h1>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Event Banner */}
          <div className="relative overflow-hidden rounded-2xl animate-fadeInUp">
            <img src={eventImage} alt={eventTitle} className="w-full h-96 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between">
              <div>
                <p className="text-primary font-semibold mb-1">{eventCategory}</p>
                <h1 className="text-5xl font-bold text-white leading-tight">{eventTitle}</h1>
                <p className="text-xl text-gray-300 font-medium">{collegeName}</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleSaveEvent(eventId)}
                  className="p-3 bg-black/50 backdrop-blur-sm rounded-xl border border-white/20 hover:border-primary transition-all"
                >
                  <Star size={24} className={`${isSaved ? 'text-yellow-400 fill-yellow-400' : 'text-white'} transition-colors`} />
                </button>
                <button onClick={handleRegister} className="btn-primary rounded-xl">
                  {eventRequiresTeam ? 'Register Team' : 'Register Now'}
                </button>
                {eventRequiresTeam && (
                  <button onClick={() => setShowTeamModal(true)} className="btn-secondary rounded-xl">
                    Manage Team
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Event Info Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="animate-fadeInUp" style={{ animationDelay: '100ms' }}>
              <InfoCard icon={Calendar} label="Date & Time" value={`${new Date(eventDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}, ${event.time || 'TBD'}`} />
            </div>
            <div className="animate-fadeInUp" style={{ animationDelay: '200ms' }}>
              <InfoCard icon={MapPin} label="Venue" value={eventVenue} />
            </div>
            <div className="animate-fadeInUp" style={{ animationDelay: '300ms' }}>
              <InfoCard icon={DollarSign} label="Price" value={eventPrice === 0 ? 'Free' : `₹${eventPrice}`} />
            </div>
            {eventRequiresTeam && (
              <div className="animate-fadeInUp" style={{ animationDelay: '400ms' }}>
                <InfoCard icon={Users} label="Team Size" value={`${eventTeamSize.min}-${eventTeamSize.max}`} />
              </div>
            )}
          </div>

          {/* Description */}
          <div className="bg-surface rounded-lg p-8 animate-fadeInUp" style={{ animationDelay: '500ms' }}>
            <h2 className="text-2xl font-bold text-white mb-4">About this event</h2>
            <p className="text-gray-300 leading-relaxed whitespace-pre-line">{eventDescription}</p>
          </div>

          {/* Attachments */}
          {eventAttachments && eventAttachments.length > 0 && (
            <div className="bg-surface rounded-lg p-8 animate-fadeInUp" style={{ animationDelay: '600ms' }}>
              <h2 className="text-2xl font-bold text-white mb-6">Attachments</h2>
              <div className="grid gap-4">
                {eventAttachments.map((pdf, idx) => (
                  <div key={idx} className="p-4 bg-surface-hover rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Info size={20} className="text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-white">{pdf.name}</p>
                        <p className="text-sm text-gray-400">PDF • {pdf.pages} pages</p>
                      </div>
                    </div>
                    <a
                      href={pdf.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary rounded-lg"
                    >
                      View PDF
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Event Timeline */}
          <div className="bg-surface rounded-lg p-8 animate-fadeInUp" style={{ animationDelay: '700ms' }}>
            <h2 className="text-2xl font-bold text-white mb-6">Event Timeline</h2>
            <div className="relative">
              {/* Progress Line */}
              <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-surface-hover"></div>
              <div className="absolute left-4 top-4 w-0.5 bg-primary transition-all duration-500" style={{ height: `calc(${progress}% - 1rem)` }}></div>

              <div className="space-y-8">
                {eventStages.map((stage, index) => {
                  const status = getStageStatus(stage, index, eventStages);
                  return (
                    <div key={index} className="flex items-start gap-6 relative animate-fadeInUp" style={{ animationDelay: `${index * 100}ms` }}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-surface z-10 border-2 ${status === 'active' ? 'border-yellow-400' : 'border-transparent'}`}>
                        <StageIcon status={status} />
                      </div>
                      <div className="flex-1 pt-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-white">{stage.name}</h3>
                          <span className="text-sm text-gray-400">
                            {new Date(stage.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </span>
                        </div>
                        <span className={`text-sm font-medium ${status === 'completed' ? 'text-green-400' : status === 'active' ? 'text-yellow-400' : 'text-gray-500'}`}>
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Registration Summary */}
          <div className="bg-surface rounded-lg p-6 sticky top-6 animate-fadeInUp" style={{ animationDelay: '800ms' }}>
            <h3 className="text-xl font-bold text-white mb-4">Registration Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Event Price</span>
                <span className="font-semibold text-white text-lg">{eventPrice === 0 ? 'Free' : `₹${eventPrice}`}</span>
              </div>
              {eventRequiresTeam && teamMembers.length > 1 && (
                <>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Team Members</span>
                    <span className="font-semibold text-white">{teamMembers.length}</span>
                  </div>
                  <div className="flex justify-between items-center text-lg font-bold border-t border-surface-hover pt-3 mt-3">
                    <span className="text-white">Total</span>
                    <span className="text-primary">₹{eventPrice * teamMembers.length}</span>
                  </div>
                </>
              )}
            </div>
            <p className="mt-4 text-xs text-gray-500 text-center">Registration closes 24 hours before the event.</p>
          </div>

          {/* Organizer Info */}
          <div className="bg-surface rounded-lg p-6 animate-fadeInUp" style={{ animationDelay: '900ms' }}>
            <h3 className="text-lg font-bold text-white mb-4">Organized By</h3>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Users size={24} className="text-primary" />
              </div>
              <div>
                <p className="font-semibold text-white">{eventOrganizer}</p>
                <p className="text-sm text-gray-400">Event Organizer</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showTeamModal && (
        <TeamMemberModal
          isOpen={showTeamModal}
          onClose={() => setShowTeamModal(false)}
          event={event}
          teamMembers={teamMembers}
          setTeamMembers={setTeamMembers}
          teamMemberStatuses={teamMemberStatuses}
          setTeamMemberStatuses={setTeamMemberStatuses}
          allMembersAccepted={allMembersAccepted}
          onRegister={proceedToOrder}
        />
      )}
    </div>
  );
};

const InfoCard = ({ icon: Icon, label, value }) => (
  <div className="bg-surface p-4 rounded-lg">
    <div className="flex items-center gap-3">
      <Icon size={20} className="text-primary" />
      <div>
        <p className="text-sm text-gray-400">{label}</p>
        <p className="font-semibold text-white">{value}</p>
      </div>
    </div>
  </div>
);

export default EventDetailPage;
