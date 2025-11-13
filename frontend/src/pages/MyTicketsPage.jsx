
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Ticket, Calendar, Clock, MapPin, X, Copy, RefreshCw } from 'lucide-react';
import api from '../api/config';

const TicketCard = ({ ticket, userProfile, onOpen }) => {
  
  // Handle both frontend mock data and backend API data structures
  const eventId = ticket.event?._id || ticket.event?.id;
  const eventTitle = ticket.event?.eventTitle || ticket.event?.name;
  const eventImage = ticket.event?.bannerImage || ticket.event?.image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop';
  const eventDate = ticket.event?.startDate || ticket.event?.date;
  const eventTime = ticket.event?.time || 'TBA';
  const eventVenue = ticket.event?.location || ticket.event?.venue;
  const eventCollege = ticket.event?.organizedBy || ticket.event?.college;
  const ticketId = ticket._id || ticket.ticketId;
  
  const whatsappLink = ticket.event?.whatsappLink || `https://wa.me/?text=${encodeURIComponent('Join the WhatsApp group for ' + (eventTitle || 'this event'))}`;

  return (
    <div
      className="bg-surface rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105 duration-300 hover:shadow-lg hover:shadow-purple-500/20"
      role="button"
      tabIndex={0}
      onClick={() => onOpen(ticket)}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onOpen(ticket); }}
    >
      <div className="relative h-48 bg-cover bg-center" style={{ backgroundImage: `url(${eventImage})` }}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        <div className="absolute bottom-4 left-4 text-white">
          <h3 className="text-2xl font-bold font-display">{eventTitle}</h3>
          <p className="text-sm text-gray-300">{eventCollege}</p>
        </div>
        <div className="absolute top-3 right-3 bg-black/60 text-white px-3 py-1 rounded-full text-xs">Details</div>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-sm text-gray-400">Ticket Holder</p>
            <p className="text-lg font-bold text-white">{userProfile?.name || 'You'}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-400">Ticket ID</p>
            <p className="font-mono text-lg text-white">{ticketId}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const MyTicketsPage = ({ tickets: propTickets, userProfile }) => {
  const [tickets, setTickets] = useState(propTickets || []);
  const [isLoading, setIsLoading] = useState(!propTickets);
  const [error, setError] = useState(null);
  const [profile, setProfile] = useState(userProfile || null);
  const [selectedTicket, setSelectedTicket] = useState(null);

  // Fetch user tickets if not provided via props
  const fetchUserTickets = React.useCallback(async () => {
    if (propTickets) {
      setTickets(propTickets);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const response = await api.get('/account/registrations');
      const data = response?.data;
      setTickets((data && Array.isArray(data.registrations)) ? data.registrations : (Array.isArray(data) ? data : []));
    } catch (err) {
      console.error('Error fetching user tickets:', err);
      setError('Failed to load your tickets. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [propTickets]);

  useEffect(() => {
    fetchUserTickets();
  }, [fetchUserTickets]);

  // Fetch user profile for header if not provided
  useEffect(() => {
    const fetchProfile = async () => {
      if (profile) return;
      try {
        const res = await api.get('/account/profile');
        const data = res?.data;
        setProfile(data?.user || null);
      } catch (err) {
        console.warn('Profile fetch failed:', err);
      }
    };
    fetchProfile();
  }, [profile]);

  // Loading state
  if (isLoading) {
    return (
      <div className="animate-fadeIn">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold font-display">My Tickets</h1>
        </div>
        <div className="text-center py-20 bg-surface rounded-lg">
          <div className="w-24 h-24 bg-surface-hover rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <Ticket size={48} className="text-primary animate-pulse" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Loading Tickets</h2>
          <p className="text-gray-400">Please wait while we fetch your tickets...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="animate-fadeIn">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold font-display">My Tickets</h1>
        </div>
        <div className="text-center py-20 bg-surface rounded-lg">
          <div className="w-24 h-24 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Ticket size={48} className="text-red-400" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Error Loading Tickets</h2>
          <p className="text-gray-400 mb-8">{error}</p>
          <button
            onClick={fetchUserTickets}
            className="btn-primary hover:shadow-lg hover:shadow-purple-500/30"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="animate-fadeIn">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold font-display">My Tickets</h1>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchUserTickets}
            className="inline-flex items-center gap-2 rounded-lg px-4 py-2 font-semibold bg-surface-hover hover:bg-surface text-white transition-colors"
            aria-label="Refresh tickets"
          >
            <RefreshCw size={16} /> Refresh
          </button>
          <Link to="/events" className="btn-primary hover:shadow-lg hover:shadow-purple-500/30">
            Browse Events
          </Link>
        </div>
      </div>

      {profile && (
        <div className="mb-8 bg-surface rounded-lg p-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400">Logged in as</p>
            <p className="text-white font-semibold">{profile.name}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-400">Email</p>
            <p className="text-white">{profile.email}</p>
          </div>
        </div>
      )}

      {tickets.length === 0 ? (
        <div className="text-center py-20 bg-surface rounded-lg">
          <div className="w-24 h-24 bg-surface-hover rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
            <Ticket size={48} className="text-primary" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">No Tickets Found</h2>
          <p className="text-gray-400 mb-8">It looks like you haven't registered for any events yet.</p>
          <Link to="/events" className="btn-primary hover:shadow-lg hover:shadow-purple-500/30">
            Explore Events
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {tickets.map((ticket, index) => (
            <div
              key={ticket._id || ticket.ticketId}
              className="animate-fadeInUp"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <TicketCard ticket={ticket} userProfile={userProfile || profile} onOpen={setSelectedTicket} />
            </div>
          ))}
        </div>
      )}

      {selectedTicket && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-surface rounded-2xl border border-gray-800 max-w-xl w-full overflow-hidden">
            <div className="relative">
              <img
                src={(selectedTicket.event?.bannerImage || selectedTicket.event?.image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=600&fit=crop')}
                alt={selectedTicket.event?.eventTitle || selectedTicket.event?.name || 'Event'}
                className="w-full h-48 object-cover"
              />
              <button
                onClick={() => setSelectedTicket(null)}
                className="absolute top-3 right-3 p-2 bg-black/60 text-white rounded-lg hover:bg-black/80"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-white mb-1">{selectedTicket.event?.eventTitle || selectedTicket.event?.name}</h3>
              <p className="text-gray-400 mb-4">{selectedTicket.event?.organizedBy || selectedTicket.event?.college}</p>

              <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-primary" />
                  <div>
                    <p className="text-gray-400">Date</p>
                    <p className="font-semibold text-white">{(() => {
                      try {
                        const d = selectedTicket.event?.startDate || selectedTicket.event?.date;
                        const dt = new Date(d);
                        return isNaN(dt.getTime()) ? 'TBD' : dt.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                      } catch { return 'TBD'; }
                    })()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-primary" />
                  <div>
                    <p className="text-gray-400">Time</p>
                    <p className="font-semibold text-white">{selectedTicket.event?.time || 'TBA'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 col-span-2">
                  <MapPin size={16} className="text-primary" />
                  <div>
                    <p className="text-gray-400">Venue</p>
                    <p className="font-semibold text-white">{selectedTicket.event?.location || selectedTicket.event?.venue || 'TBD'}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center mb-6">
                <img
                  src={selectedTicket.qrCode || selectedTicket.qr_code}
                  alt="QR Code"
                  className="w-40 h-40 rounded-lg border border-gray-700 bg-black"
                />
              </div>

              <div className="flex items-center justify-between bg-surface-hover rounded-lg p-3">
                <div>
                  <p className="text-xs text-gray-400">Ticket ID</p>
                  <p className="font-mono text-sm text-white">{selectedTicket._id || selectedTicket.ticketId}</p>
                </div>
                <button
                  onClick={() => navigator.clipboard.writeText(String(selectedTicket._id || selectedTicket.ticketId))}
                  className="px-3 py-2 rounded-lg border border-gray-700 text-gray-300 hover:bg-gray-800 flex items-center gap-2"
                >
                  <Copy size={14} /> Copy
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyTicketsPage;
