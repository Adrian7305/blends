import React, { useState } from 'react';
import { Search, Calendar, MapPin, DollarSign, Mail, CheckCircle, Menu, X, ArrowLeft, User, Ticket, Building2, Home, Star, Users, Sparkles, Bookmark, Edit, QrCode, Bell, MessageCircle, Clock } from 'lucide-react';

// Mock Data
const mockEvents = [
  {
    id: 1,
    name: "TechFest 2025",
    college: "MIT Manipal",
    price: 299,
    date: "2025-11-15",
    time: "10:00 AM",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
    description: "Annual technical festival featuring hackathons, workshops, and tech talks from industry leaders.",
    organizer: "IEEE Student Chapter",
    venue: "MIT Auditorium, Manipal",
    stages: [
      { name: "Registration Open", date: "2025-10-15", status: "completed" },
      { name: "Team Formation Deadline", date: "2025-11-01", status: "completed" },
      { name: "Prelims - Day 1", date: "2025-11-15", status: "upcoming" },
      { name: "Semi-Finals - Day 2", date: "2025-11-16", status: "upcoming" },
      { name: "Finals - Day 3", date: "2025-11-17", status: "upcoming" }
    ],
    lat: 13.3489,
    lng: 74.7930,
    category: "Technical",
    requiresTeam: true,
    teamSize: { min: 2, max: 4 }
  },
  {
    id: 2,
    name: "Cultural Carnival",
    college: "Christ University",
    price: 199,
    date: "2025-11-20",
    time: "6:00 PM",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800",
    description: "A vibrant celebration of art, music, dance, and drama featuring performances from across the country.",
    organizer: "Cultural Committee",
    venue: "Christ University Campus, Bangalore",
    stages: [
      { name: "Early Bird Registration", date: "2025-10-01", status: "completed" },
      { name: "Opening Ceremony", date: "2025-11-20", status: "upcoming" },
      { name: "Competitions", date: "2025-11-21", status: "upcoming" },
      { name: "Grand Finale", date: "2025-11-22", status: "upcoming" }
    ],
    lat: 12.9352,
    lng: 77.6072,
    category: "Cultural",
    requiresTeam: false
  },
  {
    id: 3,
    name: "Startup Summit",
    college: "IIT Bombay",
    price: 499,
    date: "2025-11-25",
    time: "9:00 AM",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800",
    description: "Connect with entrepreneurs, investors, and industry experts. Pitch competitions and networking sessions.",
    organizer: "E-Cell IIT Bombay",
    venue: "Convocation Hall, IIT Bombay",
    stages: [
      { name: "Registration Opens", date: "2025-10-10", status: "completed" },
      { name: "Team Registration Closes", date: "2025-11-10", status: "completed" },
      { name: "Registration & Networking", date: "2025-11-25", status: "upcoming" },
      { name: "Pitch Sessions", date: "2025-11-25", status: "upcoming" },
      { name: "Awards Ceremony", date: "2025-11-26", status: "upcoming" }
    ],
    lat: 19.1334,
    lng: 72.9133,
    category: "Academic",
    requiresTeam: true,
    teamSize: { min: 3, max: 5 }
  },
  {
    id: 4,
    name: "Hackathon 48",
    college: "BITS Pilani",
    price: 0,
    date: "2025-12-01",
    time: "8:00 AM",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800",
    description: "48-hour coding marathon with exciting prizes and mentorship from tech giants.",
    organizer: "ACM BITS Chapter",
    venue: "Computer Science Block, BITS Pilani",
    stages: [
      { name: "Registration Begins", date: "2025-11-01", status: "active" },
      { name: "Team Formation Deadline", date: "2025-11-25", status: "upcoming" },
      { name: "Problem Statement Release", date: "2025-12-01", status: "upcoming" },
      { name: "Development Phase", date: "2025-12-02", status: "upcoming" },
      { name: "Final Presentations", date: "2025-12-03", status: "upcoming" }
    ],
    lat: 28.3636,
    lng: 75.5850,
    category: "Technical",
    requiresTeam: true,
    teamSize: { min: 2, max: 4 }
  },
  {
    id: 5,
    name: "Music Fest Live",
    college: "Delhi University",
    price: 349,
    date: "2025-12-05",
    time: "5:00 PM",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800",
    description: "Live performances by indie bands, classical musicians, and DJ sets throughout the night.",
    organizer: "Music Society DU",
    venue: "North Campus Grounds, Delhi",
    stages: [
      { name: "Ticket Sales Open", date: "2025-11-01", status: "active" },
      { name: "Opening Acts", date: "2025-12-05", status: "upcoming" },
      { name: "Main Performances", date: "2025-12-05", status: "upcoming" },
      { name: "DJ Night", date: "2025-12-05", status: "upcoming" }
    ],
    lat: 28.6884,
    lng: 77.2134,
    category: "Cultural",
    requiresTeam: false
  },
  {
    id: 6,
    name: "Robotics Workshop",
    college: "NIT Trichy",
    price: 149,
    date: "2025-12-10",
    time: "10:00 AM",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800",
    description: "Hands-on workshop on robotics, automation, and AI. Build your own robot!",
    organizer: "Robotics Club NIT",
    venue: "Engineering Lab, NIT Trichy",
    stages: [
      { name: "Registration Opens", date: "2025-11-15", status: "active" },
      { name: "Introduction to Robotics", date: "2025-12-10", status: "upcoming" },
      { name: "Hands-on Building", date: "2025-12-10", status: "upcoming" },
      { name: "Competition Round", date: "2025-12-11", status: "upcoming" }
    ],
    lat: 10.7554,
    lng: 78.7133,
    category: "Technical",
    requiresTeam: false
  }
];

const mockClubs = {
  "MIT Manipal": [
    { id: 1, name: "IEEE Student Chapter", description: "Technical club organizing hackathons, workshops, and tech events.", events: 12, types: { Technical: 60, Academic: 30, Cultural: 10 } },
    { id: 2, name: "Drama Club", description: "Performing arts and theater productions throughout the year.", events: 8, types: { Cultural: 80, Academic: 10, Technical: 10 } },
    { id: 3, name: "Photography Club", description: "Capturing moments and organizing photography competitions.", events: 6, types: { Cultural: 50, Academic: 30, Technical: 20 } }
  ],
  "Christ University": [
    { id: 4, name: "Cultural Committee", description: "Organizing cultural fests, music nights, and art exhibitions.", events: 15, types: { Cultural: 70, Academic: 20, Technical: 10 } },
    { id: 5, name: "Debate Society", description: "Parliamentary debates, MUNs, and public speaking events.", events: 10, types: { Academic: 80, Cultural: 15, Technical: 5 } }
  ],
  "IIT Bombay": [
    { id: 6, name: "E-Cell IIT Bombay", description: "Entrepreneurship cell fostering startup culture and innovation.", events: 18, types: { Technical: 50, Academic: 40, Cultural: 10 } },
    { id: 7, name: "Coding Club", description: "Competitive programming and software development events.", events: 20, types: { Technical: 90, Academic: 10, Cultural: 0 } }
  ]
};

const App = () => {
  const [currentPage, setCurrentPage] = useState('landing');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedClub, setSelectedClub] = useState(null);
  const [selectedCollege, setSelectedCollege] = useState('');
  const [emailVerified, setEmailVerified] = useState(false);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pageHistory, setPageHistory] = useState(['landing']);
  const [bookedTickets, setBookedTickets] = useState([]);
  const [savedEvents, setSavedEvents] = useState([1, 3]); // Mock saved event IDs
  const [teamMembers, setTeamMembers] = useState([]);
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [verificationEmail, setVerificationEmail] = useState('');
  const [verificationOTP, setVerificationOTP] = useState('');
  const [showOTPInput, setShowOTPInput] = useState(false);
  const [teamMemberStatuses, setTeamMemberStatuses] = useState({});
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'new_event', title: 'New Event: AI Workshop 2025', message: 'A new technical workshop has been added to your college', date: '2 hours ago', read: false },
    { id: 2, type: 'registration', title: 'Registration Confirmed', message: 'Your registration for TechFest 2025 is confirmed', date: '1 day ago', read: false },
    { id: 3, type: 'announcement', title: 'Important Update', message: 'Venue changed for Cultural Carnival', date: '2 days ago', read: true }
  ]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [eventAnnouncements, setEventAnnouncements] = useState({
    1: [
      { id: 1, title: 'Schedule Updated', message: 'Prelims now start at 11 AM instead of 10 AM', date: '1 day ago' },
      { id: 2, title: 'Important Notice', message: 'Please bring your college ID for verification', date: '2 days ago' }
    ]
  });
  const [showAnnouncementsFor, setShowAnnouncementsFor] = useState(null);
  const [whatsappLinks, setWhatsappLinks] = useState({
    1: 'https://chat.whatsapp.com/techfest2025',
    3: 'https://chat.whatsapp.com/startupsummit2025'
  });
  const [editProfileData, setEditProfileData] = useState({
    name: '',
    email: '',
    password: '',
    profileImage: ''
  });
  const [userProfile, setUserProfile] = useState({
    name: "Rajesh Kumar",
    email: "rajesh.kumar@mit.edu",
    college: "MIT Manipal",
    designation: "Computer Science Student",
    year: "3rd Year",
    profileImage: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400"
  });

  const navigateTo = (page) => {
    setPageHistory([...pageHistory, currentPage]);
    setCurrentPage(page);
  };

  const goBack = () => {
    if (pageHistory.length > 0) {
      const previousPage = pageHistory[pageHistory.length - 1];
      setPageHistory(pageHistory.slice(0, -1));
      setCurrentPage(previousPage);
    }
  };

  const toggleSaveEvent = (eventId) => {
    if (savedEvents.includes(eventId)) {
      setSavedEvents(savedEvents.filter(id => id !== eventId));
    } else {
      setSavedEvents([...savedEvents, eventId]);
    }
  };

  const generateOrderNumber = () => {
    return 'BL' + Date.now().toString().slice(-8);
  };

  const addTeamMember = () => {
    if (newMemberEmail && teamMembers.length < (selectedEvent?.teamSize?.max || 4)) {
      if (newMemberEmail.includes('@')) {
        const newMember = {
          email: newMemberEmail,
          status: 'pending' // pending, accepted, declined
        };
        setTeamMembers([...teamMembers, newMember]);
        setTeamMemberStatuses({ ...teamMemberStatuses, [newMemberEmail]: 'pending' });
        setNewMemberEmail('');
      } else {
        alert('Please enter a valid email address');
      }
    }
  };

  const removeTeamMember = (index) => {
    const removed = teamMembers[index];
    setTeamMembers(teamMembers.filter((_, i) => i !== index));
    if (removed.email) {
      const newStatuses = { ...teamMemberStatuses };
      delete newStatuses[removed.email];
      setTeamMemberStatuses(newStatuses);
    }
  };

  const simulateAcceptance = (email) => {
    // Simulate team member accepting invitation
    setTeamMemberStatuses({ ...teamMemberStatuses, [email]: 'accepted' });
    const updatedTeam = teamMembers.map(member => 
      member.email === email ? { ...member, status: 'accepted' } : member
    );
    setTeamMembers(updatedTeam);
  };

  const allMembersAccepted = () => {
    return teamMembers.every((member, index) => 
      index === 0 || member.status === 'accepted'
    );
  };

  const markNotificationRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const getStageStatus = (stage, index, allStages) => {
    const today = new Date();
    const stageDate = new Date(stage.date);
    
    if (stage.status === 'completed' || stageDate < today) {
      return 'completed';
    } else if (stage.status === 'active') {
      return 'active';
    } else if (index === 0 && stageDate >= today) {
      return 'active';
    }
    return 'upcoming';
  };

  const calculateProgress = (stages) => {
    if (!stages || stages.length === 0) return 0;
    const completedStages = stages.filter(s => {
      const status = getStageStatus(s, 0, stages);
      return status === 'completed';
    }).length;
    return (completedStages / stages.length) * 100;
  };

  const openEditProfile = () => {
    setEditProfileData({
      name: userProfile.name,
      email: userProfile.email,
      password: '',
      profileImage: userProfile.profileImage
    });
    setShowEditProfileModal(true);
  };

  const saveProfile = () => {
    setUserProfile({
      ...userProfile,
      name: editProfileData.name,
      email: editProfileData.email,
      profileImage: editProfileData.profileImage
    });
    setShowEditProfileModal(false);
  };

  const deleteAccount = () => {
    // In real app, this would call an API
    setShowDeleteAccountModal(false);
    setIsLoggedIn(false);
    setCurrentPage('landing');
  };

  const sendVerificationEmail = () => {
    if (verificationEmail && verificationEmail.includes('@')) {
      // In real app, this would send OTP to email
      setShowOTPInput(true);
    } else {
      alert('Please enter a valid college email address');
    }
  };

  const verifyOTP = () => {
    // In real app, this would verify OTP with backend
    if (verificationOTP.length === 6) {
      setEmailVerified(true);
      setShowVerifyModal(false);
      setShowOTPInput(false);
      setVerificationEmail('');
      setVerificationOTP('');
      // Show success message
      setTimeout(() => {
        alert('🎉 College email verified! You can now find exclusive events from your college.');
      }, 300);
    } else {
      alert('Please enter a valid 6-digit OTP');
    }
  };

  // Notification Bell Component
  const NotificationBell = () => (
    <div className="relative">
      <button
        onClick={() => setShowNotifications(!showNotifications)}
        className="relative p-2 rounded-lg hover:bg-gray-800/50 transition-all"
      >
        <Bell size={24} className="text-gray-300 hover:text-white" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 rounded-full text-xs font-bold flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {showNotifications && (
        <div className="absolute right-0 top-full mt-2 w-96 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-700 shadow-2xl z-50 max-h-[600px] overflow-y-auto">
          <div className="p-4 border-b border-gray-700 sticky top-0 bg-gray-900">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold">Notifications</h3>
              <button
                onClick={() => setShowNotifications(false)}
                className="p-1 hover:bg-gray-800 rounded transition-all"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          <div className="divide-y divide-gray-700">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-gray-400">
                <Bell size={48} className="mx-auto mb-4 opacity-50" />
                <p>No notifications yet</p>
              </div>
            ) : (
              notifications.map(notif => (
                <div
                  key={notif.id}
                  onClick={() => markNotificationRead(notif.id)}
                  className={`p-4 hover:bg-gray-800/50 transition-all cursor-pointer ${
                    !notif.read ? 'bg-purple-900/10' : ''
                  }`}
                >
                  <div className="flex gap-3">
                    <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                      !notif.read ? 'bg-purple-500' : 'bg-gray-600'
                    }`}></div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">{notif.title}</h4>
                      <p className="text-sm text-gray-400 mb-2">{notif.message}</p>
                      <p className="text-xs text-gray-500">{notif.date}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );

  const filteredEvents = mockEvents.filter(event =>
    event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.college.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.organizer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sidebar Component
  const Sidebar = ({ activePage }) => (
    <aside className="hidden lg:flex lg:flex-col lg:w-64 bg-black/40 backdrop-blur-sm border-r border-purple-900/30 sticky top-0 h-screen">
      <div className="p-6 border-b border-purple-900/30">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-purple-900 flex items-center justify-center">
            <Sparkles size={24} />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
            Blends
          </span>
        </div>
      </div>
      
      <nav className="flex-1 p-6">
        <div className="space-y-2">
          <button 
            onClick={() => navigateTo('events')} 
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
              activePage === 'events' 
                ? 'bg-purple-600/20 border border-purple-600/50 text-purple-300' 
                : 'hover:bg-gray-800/50 text-gray-400 hover:text-white'
            }`}
          >
            <Calendar size={20} />
            <span>Events</span>
          </button>
          <button 
            onClick={() => navigateTo('clubs')} 
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
              activePage === 'clubs' 
                ? 'bg-purple-600/20 border border-purple-600/50 text-purple-300' 
                : 'hover:bg-gray-800/50 text-gray-400 hover:text-white'
            }`}
          >
            <Users size={20} />
            <span>Clubs</span>
          </button>
          <button 
            onClick={() => navigateTo('tickets')} 
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
              activePage === 'tickets' 
                ? 'bg-purple-600/20 border border-purple-600/50 text-purple-300' 
                : 'hover:bg-gray-800/50 text-gray-400 hover:text-white'
            }`}
          >
            <Ticket size={20} />
            <span>My Tickets</span>
          </button>
          <button 
            onClick={() => navigateTo('profile')} 
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
              activePage === 'profile' 
                ? 'bg-purple-600/20 border border-purple-600/50 text-purple-300' 
                : 'hover:bg-gray-800/50 text-gray-400 hover:text-white'
            }`}
          >
            <User size={20} />
            <span>Profile</span>
          </button>
        </div>
      </nav>

      <div className="p-6 border-t border-purple-900/30">
        <div className="p-4 rounded-lg bg-gradient-to-br from-purple-900/40 to-purple-800/40 border border-purple-600/30">
          <p className="text-sm text-gray-300 mb-3">🎉 Discover new events daily!</p>
          <button onClick={() => navigateTo('events')} className="text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors">
            Explore Now →
          </button>
        </div>
      </div>
    </aside>
  );

  // Landing Page
  const LandingPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <nav className="flex justify-between items-center p-6 backdrop-blur-sm bg-black/30 border-b border-purple-900/30 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-purple-900 flex items-center justify-center">
            <Sparkles size={24} />
          </div>
          <span className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
            Blends
          </span>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setCurrentPage('login')} 
            className="px-6 py-2.5 rounded-lg border-2 border-purple-600/50 hover:border-purple-500 hover:bg-purple-600/10 transition-all duration-300 font-medium"
          >
            Sign In
          </button>
          <button 
            onClick={() => setCurrentPage('signup')} 
            className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 transition-all duration-300 font-medium shadow-lg shadow-purple-500/30"
          >
            Get Started
          </button>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-20">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-block mb-6 px-4 py-2 rounded-full bg-purple-600/20 border border-purple-500/30">
            <span className="text-sm font-medium text-purple-300">🎉 India's Premier College Event Platform</span>
          </div>
          
          <h1 className="text-7xl font-extrabold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
              Discover. Connect.<br />Experience.
            </span>
          </h1>
          
          <p className="text-2xl mb-10 text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Your gateway to college festivals, hackathons, workshops, and cultural events across India's top universities — unified in one seamless platform.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => setCurrentPage('login')} 
              className="px-10 py-4 text-xl rounded-xl bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 transition-all duration-300 hover:scale-105 transform font-semibold shadow-2xl shadow-purple-500/40"
            >
              Explore Events Now
            </button>
            <button className="px-10 py-4 text-xl rounded-xl border-2 border-purple-600/50 hover:border-purple-500 hover:bg-purple-600/10 transition-all duration-300 font-semibold">
              Learn More
            </button>
          </div>

          <div className="grid grid-cols-3 gap-8 mt-20 max-w-3xl mx-auto">
            {[
              { number: "500+", label: "Events Listed" },
              { number: "150+", label: "Colleges" },
              { number: "50K+", label: "Students" }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-24 grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            { 
              icon: Calendar, 
              title: "Discover Events", 
              desc: "Browse through cultural, technical, and academic events from premier colleges nationwide"
            },
            { 
              icon: Users, 
              title: "Connect with Clubs", 
              desc: "Explore student organizations and stay updated with their latest activities and events"
            },
            { 
              icon: Ticket, 
              title: "Instant Booking", 
              desc: "Secure your spot instantly with our seamless ticketing and registration system"
            }
          ].map((item, i) => (
            <div 
              key={i} 
              className="group p-8 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-800 hover:border-purple-600/50 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-600 to-purple-700 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <item.icon size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-purple-300 transition-colors">
                {item.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-24 max-w-4xl mx-auto text-center p-12 rounded-3xl bg-gradient-to-r from-purple-900/30 to-purple-800/30 border border-purple-600/30">
          <h2 className="text-4xl font-bold mb-4">Ready to Begin Your Journey?</h2>
          <p className="text-xl text-gray-300 mb-8">Join thousands of students discovering amazing events every day</p>
          <button 
            onClick={() => setCurrentPage('signup')} 
            className="px-10 py-4 text-xl rounded-xl bg-white text-purple-900 hover:bg-gray-100 transition-all duration-300 hover:scale-105 transform font-semibold shadow-xl"
          >
            Create Free Account
          </button>
        </div>
      </div>
    </div>
  );

  // Login Page
  const LoginPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <button 
          onClick={goBack}
          className="flex items-center gap-2 mb-8 text-gray-400 hover:text-purple-400 transition-colors group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back</span>
        </button>

        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-purple-900 flex items-center justify-center">
              <Sparkles size={28} />
            </div>
            <span className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
              Blends
            </span>
          </div>
          <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
          <p className="text-gray-400">Sign in to continue your journey</p>
        </div>

        <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl border border-gray-800 shadow-2xl">
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-300">Email Address</label>
            <input 
              type="email" 
              placeholder="you@college.edu"
              className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all text-white placeholder-gray-500" 
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-300">Password</label>
            <input 
              type="password" 
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all text-white placeholder-gray-500" 
            />
          </div>

          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded border-gray-700 bg-black/50" />
              <span className="text-sm text-gray-400">Remember me</span>
            </label>
            <button className="text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors">
              Forgot Password?
            </button>
          </div>

          <button 
            onClick={() => {
              setIsLoggedIn(true);
              navigateTo('events');
            }} 
            className="w-full py-3.5 rounded-lg font-semibold bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 transition-all duration-300 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50"
          >
            Sign In to Blends
          </button>

          <p className="text-center mt-6 text-sm text-gray-400">
            New to Blends? {" "}
            <button 
              onClick={() => navigateTo('signup')} 
              className="font-semibold text-purple-400 hover:text-purple-300 transition-colors"
            >
              Create an account
            </button>
          </p>
        </div>
      </div>
    </div>
  );

  // Signup Page
  const SignupPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <button 
          onClick={goBack}
          className="flex items-center gap-2 mb-8 text-gray-400 hover:text-purple-400 transition-colors group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back</span>
        </button>

        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-purple-900 flex items-center justify-center">
              <Sparkles size={28} />
            </div>
            <span className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
              Blends
            </span>
          </div>
          <h2 className="text-3xl font-bold mb-2">Create Your Account</h2>
          <p className="text-gray-400">Start discovering amazing events today</p>
        </div>

        <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl border border-gray-800 shadow-2xl">
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-300">Full Name</label>
            <input 
              type="text"
              placeholder="John Doe"
              className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all text-white placeholder-gray-500" 
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-300">College Email</label>
            <input 
              type="email"
              placeholder="you@college.edu"
              className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all text-white placeholder-gray-500" 
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-300">Password</label>
            <input 
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all text-white placeholder-gray-500" 
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-300">Confirm Password</label>
            <input 
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all text-white placeholder-gray-500" 
            />
          </div>

          <div className="mb-6">
            <label className="flex items-start gap-3 cursor-pointer">
              <input 
                type="checkbox" 
                className="mt-1 w-4 h-4 rounded border-gray-700 bg-black/50" 
              />
              <span className="text-sm text-gray-400">
                I agree to the <span className="text-purple-400 hover:underline">Terms & Conditions</span> and <span className="text-purple-400 hover:underline">Privacy Policy</span>
              </span>
            </label>
          </div>

          <button 
            onClick={() => {
              setIsLoggedIn(true);
              navigateTo('events');
            }} 
            className="w-full py-3.5 rounded-lg font-semibold bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 transition-all duration-300 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50"
          >
            Create Account
          </button>

          <p className="text-center mt-6 text-sm text-gray-400">
            Already have an account? {" "}
            <button 
              onClick={() => navigateTo('login')} 
              className="font-semibold text-purple-400 hover:text-purple-300 transition-colors"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );

  // Events Page
  const EventsPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex">
      <Sidebar activePage="events" />

      <div className="flex-1 flex flex-col">
        <nav className="flex justify-between items-center p-6 backdrop-blur-sm bg-black/30 border-b border-purple-900/30 sticky top-0 z-50 lg:hidden">
          <div className="flex items-center gap-4">
            {pageHistory.length > 0 && (
              <button onClick={goBack} className="text-gray-400 hover:text-purple-400 transition-colors">
                <ArrowLeft size={24} />
              </button>
            )}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-purple-900 flex items-center justify-center">
                <Sparkles size={24} />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                Blends
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <NotificationBell />
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </nav>

        {mobileMenuOpen && (
          <div className="lg:hidden bg-gray-900/90 backdrop-blur-sm border-b border-gray-800 p-4">
            <button onClick={() => { navigateTo('events'); setMobileMenuOpen(false); }} className="flex items-center gap-3 w-full text-left py-3 hover:text-purple-400 font-medium">
              <Calendar size={20} />
              <span>Events</span>
            </button>
            <button onClick={() => { navigateTo('clubs'); setMobileMenuOpen(false); }} className="flex items-center gap-3 w-full text-left py-3 hover:text-purple-400 font-medium">
              <Users size={20} />
              <span>Clubs</span>
            </button>
            <button onClick={() => { navigateTo('tickets'); setMobileMenuOpen(false); }} className="flex items-center gap-3 w-full text-left py-3 hover:text-purple-400 font-medium">
              <Ticket size={20} />
              <span>My Tickets</span>
            </button>
            <button onClick={() => { navigateTo('profile'); setMobileMenuOpen(false); }} className="flex items-center gap-3 w-full text-left py-3 hover:text-purple-400 font-medium">
              <User size={20} />
              <span>Profile</span>
            </button>
          </div>
        )}

        {!emailVerified && (
          <div className="p-4 text-center border-b border-purple-900/30 bg-gradient-to-r from-purple-900/40 to-purple-800/40 backdrop-blur-sm">
            <span className="mr-4 font-medium">🎓 Verify your college email to unlock exclusive features</span>
            <button onClick={() => setShowVerifyModal(true)} className="underline font-semibold hover:text-purple-300 transition-colors">
              Verify Now →
            </button>
          </div>
        )}

        {emailVerified && (
          <div className="p-4 text-center border-b border-green-900/30 bg-gradient-to-r from-green-900/40 to-green-800/40 backdrop-blur-sm">
            <span className="mr-2">✓</span>
            <span className="font-medium">College email verified! Find exclusive events from your college.</span>
          </div>
        )}

        <div className="container mx-auto px-6 py-12">
          <div className="mb-12">
            <h1 className="text-5xl font-bold mb-4 text-center bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
              Discover Events
            </h1>
            <p className="text-center text-gray-400 text-lg mb-8">
              Find the perfect event for you from across India's top colleges
            </p>
            
            <div className="relative max-w-3xl mx-auto">
              <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400" size={22} />
              <input
                type="text"
                placeholder="Search by event name, college, or organizer..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-4 py-4 bg-gradient-to-r from-gray-900 to-gray-800 border border-gray-700 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all text-white placeholder-gray-500 text-lg"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map(event => (
              <div
                key={event.id}
                className="group bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden border border-gray-800 hover:border-purple-600/50 transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20"
              >
                <div className="relative overflow-hidden" onClick={() => {
                  setSelectedEvent(event);
                  navigateTo('eventDetail', event);
                }}>
                  <img src={event.image} alt={event.name} className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm text-xs font-semibold border border-purple-500/30">
                    {event.category}
                  </div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSaveEvent(event.id);
                    }}
                    className="absolute top-4 left-4 w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm border border-purple-500/30 flex items-center justify-center hover:bg-purple-600/40 transition-all"
                  >
                    <Bookmark size={18} className={savedEvents.includes(event.id) ? 'fill-purple-400 text-purple-400' : 'text-white'} />
                  </button>
                </div>
                <div className="p-6" onClick={() => {
                  setSelectedEvent(event);
                  navigateTo('eventDetail', event);
                }}>
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-purple-300 transition-colors">{event.name}</h3>
                  <div className="flex items-center gap-2 text-gray-400 mb-4">
                    <Building2 size={16} />
                    <span className="text-sm">{event.college}</span>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-gray-700">
                    <span className="text-2xl font-bold text-purple-400">
                      {event.price === 0 ? 'FREE' : `₹${event.price}`}
                    </span>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Calendar size={16} />
                      <span>{new Date(event.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showVerifyModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6 z-50">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl border border-gray-700 max-w-md w-full shadow-2xl">
            <h3 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
              {showOTPInput ? 'Enter Verification Code' : 'Verify Your Email'}
            </h3>
            <p className="text-gray-400 mb-6">
              {showOTPInput 
                ? `We've sent a 6-digit code to ${verificationEmail}`
                : 'Enter your college email to unlock all features'
              }
            </p>

            {!showOTPInput ? (
              <>
                <input
                  type="email"
                  placeholder="you@college.edu"
                  value={verificationEmail}
                  onChange={(e) => setVerificationEmail(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendVerificationEmail()}
                  className="w-full px-4 py-3 mb-6 bg-black/50 border border-gray-700 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all text-white placeholder-gray-500"
                />
                <div className="flex gap-4">
                  <button 
                    onClick={sendVerificationEmail}
                    className="flex-1 py-3 rounded-lg font-semibold bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 transition-all shadow-lg shadow-purple-500/30"
                  >
                    Send Verification Code
                  </button>
                  <button 
                    onClick={() => {
                      setShowVerifyModal(false);
                      setVerificationEmail('');
                    }}
                    className="flex-1 py-3 rounded-lg border border-gray-700 hover:bg-gray-800 transition-all font-semibold"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium text-gray-300">Enter 6-Digit Code</label>
                  <input
                    type="text"
                    placeholder="000000"
                    maxLength="6"
                    value={verificationOTP}
                    onChange={(e) => setVerificationOTP(e.target.value.replace(/\D/g, ''))}
                    onKeyPress={(e) => e.key === 'Enter' && verificationOTP.length === 6 && verifyOTP()}
                    className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all text-white placeholder-gray-500 text-center text-2xl tracking-widest font-mono"
                  />
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    {verificationOTP.length}/6 digits entered
                  </p>
                </div>

                <div className="mb-6">
                  <button 
                    onClick={() => {
                      setShowOTPInput(false);
                      setVerificationOTP('');
                    }}
                    className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    ← Change email address
                  </button>
                  <button 
                    onClick={sendVerificationEmail}
                    className="text-sm text-purple-400 hover:text-purple-300 transition-colors float-right"
                  >
                    Resend code
                  </button>
                  <div className="clear-both"></div>
                </div>

                <div className="flex gap-4">
                  <button 
                    onClick={verifyOTP}
                    disabled={verificationOTP.length !== 6}
                    className="flex-1 py-3 rounded-lg font-semibold bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-purple-500/30"
                  >
                    Verify Email
                  </button>
                  <button 
                    onClick={() => {
                      setShowVerifyModal(false);
                      setShowOTPInput(false);
                      setVerificationEmail('');
                      setVerificationOTP('');
                    }}
                    className="flex-1 py-3 rounded-lg border border-gray-700 hover:bg-gray-800 transition-all font-semibold"
                  >
                    Cancel
                  </button>
                </div>

                <div className="mt-6 p-4 rounded-lg bg-purple-900/20 border border-purple-600/30">
                  <p className="text-xs text-gray-400 text-center">
                    💡 Tip: Check your spam folder if you don't see the email
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );

  // Event Detail Page
  const EventDetailPage = () => {
    if (!selectedEvent) return null;

    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
        <nav className="flex justify-between items-center p-6 backdrop-blur-sm bg-black/30 border-b border-purple-900/30 sticky top-0 z-50">
          <div className="flex items-center gap-4">
            <button onClick={goBack} className="text-gray-400 hover:text-purple-400 transition-colors">
              <ArrowLeft size={24} />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-purple-900 flex items-center justify-center">
                <Sparkles size={24} />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                Blends
              </span>
            </div>
          </div>
        </nav>

        <div className="container mx-auto px-6 py-12 max-w-5xl">
          <div className="relative rounded-2xl overflow-hidden mb-10 border border-gray-800">
            <img src={selectedEvent.image} alt={selectedEvent.name} className="w-full h-[28rem] object-cover" />
            <div className="absolute top-6 right-6 px-4 py-2 rounded-xl bg-black/70 backdrop-blur-md text-sm font-semibold border border-purple-500/30">
              {selectedEvent.category}
            </div>
          </div>

          <h1 className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
            {selectedEvent.name}
          </h1>

          <div className="grid md:grid-cols-2 gap-6 mb-10">
            {[
              { label: "Host College", value: selectedEvent.college, icon: Building2 },
              { label: "Organized By", value: selectedEvent.organizer, icon: Users },
              { label: "Date & Time", value: `${new Date(selectedEvent.date).toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' })} • ${selectedEvent.time}`, icon: Calendar },
              { label: "Ticket Price", value: selectedEvent.price === 0 ? 'FREE' : `₹${selectedEvent.price}`, icon: DollarSign, highlight: true }
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-800">
                <div className="flex items-center gap-2 text-gray-400 mb-2">
                  <item.icon size={18} />
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
                <p className={`text-xl font-bold ${item.highlight ? 'text-purple-400' : 'text-white'}`}>
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          <div className="mb-10 p-8 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-800">
            <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
              <span className="text-purple-400">About</span> the Event
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">{selectedEvent.description}</p>
          </div>

          <div className="mb-10 p-8 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-800">
            <h2 className="text-3xl font-bold mb-6 text-purple-400">Event Timeline</h2>
            
            {/* Progress Bar */}
            {selectedEvent.stages && selectedEvent.stages.length > 0 && (
              <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm text-gray-400">Event Progress</span>
                  <span className="text-sm font-semibold text-purple-400">{Math.round(calculateProgress(selectedEvent.stages))}% Complete</span>
                </div>
                <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-purple-600 to-purple-400 transition-all duration-500 rounded-full"
                    style={{ width: `${calculateProgress(selectedEvent.stages)}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Timeline Stages */}
            <div className="space-y-4">
              {selectedEvent.stages && selectedEvent.stages.length > 0 ? (
                selectedEvent.stages.map((stage, i) => {
                  const status = getStageStatus(stage, i, selectedEvent.stages);
                  return (
                    <div key={i} className={`flex items-center gap-5 p-5 rounded-xl border transition-all ${
                      status === 'completed' 
                        ? 'bg-green-900/20 border-green-600/50' 
                        : status === 'active'
                        ? 'bg-purple-900/20 border-purple-600/50 shadow-lg shadow-purple-500/20'
                        : 'bg-black/40 border-gray-700'
                    }`}>
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg flex-shrink-0 shadow-lg ${
                        status === 'completed'
                          ? 'bg-gradient-to-br from-green-600 to-green-700 shadow-green-500/30'
                          : status === 'active'
                          ? 'bg-gradient-to-br from-purple-600 to-purple-700 shadow-purple-500/30 animate-pulse'
                          : 'bg-gradient-to-br from-gray-700 to-gray-800'
                      }`}>
                        {status === 'completed' ? '✓' : i + 1}
                      </div>
                      <div className="flex-1">
                        <span className={`text-lg font-medium block ${
                          status === 'active' ? 'text-purple-300' : ''
                        }`}>
                          {stage.name}
                        </span>
                        {stage.date && (
                          <span className="text-sm text-gray-400">
                            {new Date(stage.date).toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' })}
                          </span>
                        )}
                      </div>
                      <div>
                        {status === 'completed' && (
                          <span className="px-3 py-1 rounded-full bg-green-600/20 text-green-400 text-xs font-semibold border border-green-600/30">
                            Completed
                          </span>
                        )}
                        {status === 'active' && (
                          <span className="px-3 py-1 rounded-full bg-purple-600/20 text-purple-400 text-xs font-semibold border border-purple-600/30">
                            Active Now
                          </span>
                        )}
                        {status === 'upcoming' && (
                          <span className="px-3 py-1 rounded-full bg-gray-700/50 text-gray-400 text-xs font-semibold border border-gray-600/30">
                            Upcoming
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-gray-400 text-center py-4">No timeline information available</p>
              )}
            </div>
          </div>

          {selectedEvent.requiresTeam && (
            <div className="mb-10 p-8 rounded-2xl bg-gradient-to-br from-purple-900/20 to-purple-800/20 border border-purple-600/30">
              <div className="flex items-center gap-3 mb-4">
                <Users size={28} className="text-purple-400" />
                <h2 className="text-3xl font-bold text-purple-400">Team Event</h2>
              </div>
              <p className="text-gray-300 mb-2">
                This event requires a team of {selectedEvent.teamSize.min} to {selectedEvent.teamSize.max} members.
              </p>
              <p className="text-sm text-gray-400">
                You'll be able to add your team members in the next step.
              </p>
            </div>
          )}

          <div className="mb-10 p-8 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-800">
            <h2 className="text-3xl font-bold mb-6 text-purple-400">Venue & Location</h2>
            <div className="flex items-start gap-3 mb-6 text-gray-300">
              <MapPin size={24} className="text-purple-400 flex-shrink-0 mt-1" />
              <span className="text-lg">{selectedEvent.venue}</span>
            </div>
            <div className="w-full h-80 bg-black/40 rounded-xl flex items-center justify-center border border-gray-700">
              <div className="text-center">
                <MapPin size={48} className="text-purple-400 mx-auto mb-4" />
                <p className="text-gray-400 text-lg">Interactive Map</p>
                <p className="text-gray-500 text-sm mt-2">{selectedEvent.venue}</p>
              </div>
            </div>
          </div>

          <button 
            onClick={() => {
              if (selectedEvent.requiresTeam) {
                setTeamMembers([userProfile.email]); // Add user as first member
                setShowTeamModal(true);
              } else {
                setOrderDetails(selectedEvent);
                navigateTo('order');
              }
            }} 
            className="w-full py-5 rounded-xl text-xl font-bold bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 transition-all duration-300 shadow-xl shadow-purple-500/40 hover:shadow-purple-500/60 hover:scale-105 transform"
          >
            {selectedEvent.price === 0 ? 'Register Now' : 'Buy Ticket'}
          </button>
        </div>

        {/* Team Members Modal */}
        {showTeamModal && selectedEvent.requiresTeam && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6 z-50">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl border border-gray-700 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
              <h3 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                Add Team Members
              </h3>
              <p className="text-gray-400 mb-6">
                Team size: {selectedEvent.teamSize.min} - {selectedEvent.teamSize.max} members
              </p>

              {/* Team Leader */}
              <div className="mb-6 p-4 rounded-xl bg-purple-900/20 border border-purple-600/30">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-purple-700 flex items-center justify-center text-sm font-bold">
                    TL
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">{userProfile.name}</p>
                    <p className="text-sm text-gray-400">{userProfile.email}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-purple-600 text-xs font-semibold">Team Leader</span>
                </div>
              </div>

              {/* Add Member Input */}
              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-300">Add Team Member Email</label>
                <div className="flex gap-3">
                  <input
                    type="email"
                    placeholder="teammate@example.com"
                    value={newMemberEmail}
                    onChange={(e) => setNewMemberEmail(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addTeamMember()}
                    className="flex-1 px-4 py-3 bg-black/50 border border-gray-700 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all text-white placeholder-gray-500"
                    disabled={teamMembers.length >= selectedEvent.teamSize.max}
                  />
                  <button
                    onClick={addTeamMember}
                    disabled={teamMembers.length >= selectedEvent.teamSize.max}
                    className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold"
                  >
                    Add
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  {teamMembers.length} / {selectedEvent.teamSize.max} members added
                </p>
              </div>

              {/* Team Members List */}
              {teamMembers.length > 1 && (
                <div className="mb-6 space-y-3">
                  <h4 className="font-semibold text-gray-300 mb-3">Team Members:</h4>
                  {teamMembers.slice(1).map((member, index) => (
                    <div key={index} className={`flex items-center gap-3 p-4 rounded-lg border transition-all ${
                      member.status === 'accepted' 
                        ? 'bg-green-900/20 border-green-600/50'
                        : member.status === 'pending'
                        ? 'bg-yellow-900/20 border-yellow-600/50'
                        : 'bg-black/40 border-gray-700'
                    }`}>
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center text-sm font-bold">
                        {index + 2}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-300">{member.email || member}</p>
                        {member.status && (
                          <div className="flex items-center gap-2 mt-1">
                            {member.status === 'pending' ? (
                              <>
                                <Clock size={14} className="text-yellow-400" />
                                <span className="text-xs text-yellow-400">Waiting for acceptance</span>
                              </>
                            ) : member.status === 'accepted' ? (
                              <>
                                <CheckCircle size={14} className="text-green-400" />
                                <span className="text-xs text-green-400">Accepted</span>
                              </>
                            ) : null}
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2">
                        {member.status === 'pending' && (
                          <button
                            onClick={() => simulateAcceptance(member.email)}
                            className="px-3 py-1 rounded-lg bg-green-600/20 text-green-400 text-xs font-semibold hover:bg-green-600/30 transition-all"
                            title="Simulate acceptance (for demo)"
                          >
                            Accept
                          </button>
                        )}
                        <button
                          onClick={() => removeTeamMember(index + 1)}
                          className="p-2 rounded-lg hover:bg-red-600/20 text-red-400 transition-all"
                        >
                          <X size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Validation Message */}
              {teamMembers.length < selectedEvent.teamSize.min && (
                <div className="mb-6 p-4 rounded-lg bg-yellow-900/20 border border-yellow-600/30">
                  <p className="text-sm text-yellow-400">
                    ⚠️ You need at least {selectedEvent.teamSize.min} members to register (including you)
                  </p>
                </div>
              )}

              {/* All members must accept warning */}
              {teamMembers.length >= selectedEvent.teamSize.min && !allMembersAccepted() && (
                <div className="mb-6 p-4 rounded-lg bg-yellow-900/20 border border-yellow-600/30">
                  <p className="text-sm text-yellow-400">
                    ⚠️ All team members must accept the invitation before you can proceed
                  </p>
                </div>
              )}

              {/* All accepted success message */}
              {allMembersAccepted() && teamMembers.length >= selectedEvent.teamSize.min && (
                <div className="mb-6 p-4 rounded-lg bg-green-900/20 border border-green-600/30">
                  <p className="text-sm text-green-400">
                    ✓ All team members have accepted! You can now proceed with registration.
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={() => {
                    if (teamMembers.length >= selectedEvent.teamSize.min && 
                        teamMembers.length <= selectedEvent.teamSize.max &&
                        allMembersAccepted()) {
                      setOrderDetails({ ...selectedEvent, teamMembers });
                      setShowTeamModal(false);
                      navigateTo('order');
                    }
                  }}
                  disabled={teamMembers.length < selectedEvent.teamSize.min || !allMembersAccepted()}
                  className="flex-1 py-3 rounded-lg font-semibold bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-purple-500/30"
                >
                  Continue to Registration
                </button>
                <button
                  onClick={() => {
                    setShowTeamModal(false);
                    setTeamMembers([]);
                    setTeamMemberStatuses({});
                  }}
                  className="flex-1 py-3 rounded-lg border border-gray-700 hover:bg-gray-800 transition-all font-semibold"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Order Review Page
  const OrderReviewPage = () => {
    if (!orderDetails) return null;

    const convenienceFee = orderDetails.price === 0 ? 0 : 50;
    const total = orderDetails.price + convenienceFee;

    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
        <nav className="flex justify-between items-center p-6 backdrop-blur-sm bg-black/30 border-b border-purple-900/30 sticky top-0 z-50">
          <div className="flex items-center gap-4">
            <button onClick={goBack} className="text-gray-400 hover:text-purple-400 transition-colors">
              <ArrowLeft size={24} />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-purple-900 flex items-center justify-center">
                <Sparkles size={24} />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                Blends
              </span>
            </div>
          </div>
        </nav>

        <div className="container mx-auto px-6 py-12 max-w-3xl">
          <h1 className="text-5xl font-extrabold mb-3 text-center bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
            Order Summary
          </h1>
          <p className="text-center text-gray-400 text-lg mb-12">Review your booking details</p>

          <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl border border-gray-800 mb-8 shadow-2xl">
            <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-700">
              <div className="w-20 h-20 rounded-xl overflow-hidden border-2 border-purple-500/30">
                <img src={orderDetails.image} alt={orderDetails.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-purple-300">{orderDetails.name}</h2>
                <p className="text-gray-400">{orderDetails.college}</p>
              </div>
            </div>

            <div className="space-y-5 mb-8">
              {[
                { label: "Event Date", value: new Date(orderDetails.date).toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' }) },
                { label: "Event Time", value: orderDetails.time },
                ...(orderDetails.requiresTeam && orderDetails.teamMembers ? [
                  { label: "Team Size", value: `${orderDetails.teamMembers.length} members` }
                ] : []),
                { label: "Ticket Price", value: orderDetails.price === 0 ? 'FREE' : `₹${orderDetails.price}` },
                ...(convenienceFee > 0 ? [{ label: "Convenience Fee", value: `₹${convenienceFee}` }] : [])
              ].map((item, i) => (
                <div key={i} className="flex justify-between py-4 border-b border-gray-700/50">
                  <span className="text-gray-400 font-medium">{item.label}</span>
                  <span className="font-semibold text-lg">{item.value}</span>
                </div>
              ))}
              
              {orderDetails.requiresTeam && orderDetails.teamMembers && (
                <div className="py-4 border-b border-gray-700/50">
                  <span className="text-gray-400 font-medium mb-3 block">Team Members:</span>
                  <div className="space-y-2">
                    {orderDetails.teamMembers.map((email, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          index === 0 ? 'bg-purple-600' : 'bg-gray-700'
                        }`}>
                          {index + 1}
                        </div>
                        <span className="text-gray-300">{email}</span>
                        {index === 0 && <span className="text-xs text-purple-400">(Leader)</span>}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="flex justify-between py-5 text-2xl border-t-2 border-purple-600/30 mt-4">
                <span className="font-bold">Total Amount</span>
                <span className="font-extrabold text-purple-400">
                  {total === 0 ? 'FREE' : `₹${total}`}
                </span>
              </div>
            </div>

            <button 
              onClick={() => {
                const newTicket = {
                  ...orderDetails,
                  orderNumber: generateOrderNumber(),
                  bookedDate: new Date().toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' }),
                  bookedTime: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
                  attendeeName: userProfile.name,
                  total: total
                };
                setBookedTickets([...bookedTickets, newTicket]);
                navigateTo('success');
              }} 
              className="w-full py-5 rounded-xl text-xl font-bold bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 transition-all duration-300 shadow-xl shadow-purple-500/40 hover:shadow-purple-500/60 hover:scale-105 transform"
            >
              {total === 0 ? 'Confirm Registration' : 'Proceed to Payment'}
            </button>
          </div>

          <div className="text-center text-sm text-gray-500">
            <p>🔒 Secure payment powered by Blends</p>
          </div>
        </div>
      </div>
    );
  };

  // Success Page
  const SuccessPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex items-center justify-center p-6">
      <div className="text-center max-w-2xl">
        <div className="mb-8 relative">
          <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center shadow-2xl shadow-purple-500/50">
            <CheckCircle size={80} className="text-white" />
          </div>
          <div className="absolute inset-0 w-32 h-32 mx-auto rounded-full bg-purple-500/30 animate-ping"></div>
        </div>
        
        <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
          Booking Confirmed!
        </h1>
        <p className="text-2xl text-gray-300 mb-4">Your ticket has been successfully booked</p>
        <p className="text-gray-400 mb-10">A confirmation email has been sent to your registered email address</p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => navigateTo('tickets')} 
            className="px-8 py-4 rounded-xl text-lg font-semibold bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 transition-all duration-300 shadow-lg shadow-purple-500/40 hover:scale-105 transform"
          >
            View My Tickets
          </button>
          <button 
            onClick={() => navigateTo('events')}
            className="px-8 py-4 rounded-xl text-lg font-semibold border-2 border-purple-600/50 hover:border-purple-500 hover:bg-purple-600/10 transition-all duration-300"
          >
            Explore More Events
          </button>
        </div>
      </div>
    </div>
  );

  // My Tickets Page
  const MyTicketsPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex">
      <Sidebar activePage="tickets" />

      <div className="flex-1 flex flex-col">
        <nav className="flex justify-between items-center p-6 backdrop-blur-sm bg-black/30 border-b border-purple-900/30 sticky top-0 z-50 lg:hidden">
          <div className="flex items-center gap-4">
            <button onClick={goBack} className="text-gray-400 hover:text-purple-400 transition-colors">
              <ArrowLeft size={24} />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-purple-900 flex items-center justify-center">
                <Sparkles size={24} />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                Blends
              </span>
            </div>
          </div>
        </nav>

        <div className="container mx-auto px-6 py-12">
          <h1 className="text-5xl font-extrabold mb-4 text-center bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
            My Tickets
          </h1>
          <p className="text-center text-gray-400 text-lg mb-12">View and manage your event tickets</p>

          {bookedTickets.length === 0 ? (
            <div className="text-center py-20">
              <Ticket size={64} className="mx-auto mb-6 text-gray-600" />
              <p className="text-xl text-gray-400 mb-4">No tickets booked yet</p>
              <button 
                onClick={() => navigateTo('events')}
                className="px-8 py-3 rounded-xl font-semibold bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 transition-all"
              >
                Explore Events
              </button>
            </div>
          ) : selectedTicket ? (
            // Single Ticket View
            <div className="max-w-4xl mx-auto">
              <button 
                onClick={() => setSelectedTicket(null)}
                className="flex items-center gap-2 mb-6 text-gray-400 hover:text-purple-400 transition-colors"
              >
                <ArrowLeft size={20} />
                <span>Back to all tickets</span>
              </button>

              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-gray-800 overflow-hidden">
                <div className="relative h-64">
                  <img src={selectedTicket.image} alt={selectedTicket.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute bottom-6 left-6">
                    <div className="inline-block px-4 py-2 rounded-full bg-green-600/80 backdrop-blur-sm text-sm font-semibold mb-3">
                      ✓ CONFIRMED
                    </div>
                    <h2 className="text-4xl font-bold mb-2">{selectedTicket.name}</h2>
                    <p className="text-xl text-gray-300">{selectedTicket.college}</p>
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="space-y-4">
                      <div className="p-4 rounded-xl bg-black/40 border border-gray-700">
                        <p className="text-sm text-gray-400 mb-1">Order Number</p>
                        <p className="text-xl font-bold text-purple-400">{selectedTicket.orderNumber}</p>
                      </div>
                      <div className="p-4 rounded-xl bg-black/40 border border-gray-700">
                        <p className="text-sm text-gray-400 mb-1">Attendee Name</p>
                        <p className="text-xl font-bold">{selectedTicket.attendeeName}</p>
                      </div>
                      <div className="p-4 rounded-xl bg-black/40 border border-gray-700">
                        <p className="text-sm text-gray-400 mb-1">Amount Paid</p>
                        <p className="text-xl font-bold text-green-400">
                          {selectedTicket.total === 0 ? 'FREE' : `₹${selectedTicket.total}`}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="p-4 rounded-xl bg-black/40 border border-gray-700">
                        <p className="text-sm text-gray-400 mb-1">Event Date</p>
                        <p className="text-xl font-bold">
                          {new Date(selectedTicket.date).toLocaleDateString('en-IN', { 
                            weekday: 'long',
                            month: 'long', 
                            day: 'numeric', 
                            year: 'numeric' 
                          })}
                        </p>
                      </div>
                      <div className="p-4 rounded-xl bg-black/40 border border-gray-700">
                        <p className="text-sm text-gray-400 mb-1">Event Time</p>
                        <p className="text-xl font-bold">{selectedTicket.time}</p>
                      </div>
                      <div className="p-4 rounded-xl bg-black/40 border border-gray-700">
                        <p className="text-sm text-gray-400 mb-1">Venue</p>
                        <p className="text-lg font-bold">{selectedTicket.venue}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-black/40 border border-gray-700 mb-8">
                    <p className="text-sm text-gray-400 mb-2">Booked On</p>
                    <p className="font-bold">{selectedTicket.bookedDate} at {selectedTicket.bookedTime}</p>
                  </div>

                  <div className="bg-gradient-to-br from-purple-900/20 to-purple-800/20 rounded-2xl p-8 border border-purple-600/30 text-center">
                    <QrCode size={200} className="text-purple-400 mx-auto mb-4" />
                    <p className="text-lg font-semibold mb-2">Entry QR Code</p>
                    <p className="text-sm text-gray-400 mb-1">Scan this code at the venue for entry</p>
                    <p className="text-xs text-gray-500 font-mono mt-3">{selectedTicket.orderNumber}</p>
                  </div>

                  <div className="mt-8 flex gap-4">
                    <button className="flex-1 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 transition-all font-semibold">
                      Download Ticket
                    </button>
                    <button className="flex-1 py-3 rounded-xl border-2 border-purple-600/50 hover:border-purple-500 hover:bg-purple-600/10 transition-all font-semibold">
                      Share Ticket
                    </button>
                  </div>

                  {/* Announcements Section */}
                  <div className="mt-8">
                    <button
                      onClick={() => setShowAnnouncementsFor(showAnnouncementsFor === selectedTicket.id ? null : selectedTicket.id)}
                      className="w-full py-3 rounded-xl bg-blue-600/20 border-2 border-blue-600/50 hover:bg-blue-600/30 transition-all font-semibold flex items-center justify-center gap-2"
                    >
                      <Bell size={20} />
                      <span>{showAnnouncementsFor === selectedTicket.id ? 'Hide' : 'Show'} Event Announcements</span>
                    </button>

                    {showAnnouncementsFor === selectedTicket.id && eventAnnouncements[selectedTicket.id] && (
                      <div className="mt-4 space-y-3">
                        {eventAnnouncements[selectedTicket.id].map(announcement => (
                          <div key={announcement.id} className="p-4 rounded-xl bg-blue-900/20 border border-blue-600/30">
                            <div className="flex items-start gap-3">
                              <Bell size={18} className="text-blue-400 flex-shrink-0 mt-1" />
                              <div className="flex-1">
                                <h4 className="font-semibold text-blue-300 mb-1">{announcement.title}</h4>
                                <p className="text-sm text-gray-300 mb-2">{announcement.message}</p>
                                <p className="text-xs text-gray-500">{announcement.date}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* WhatsApp Community Link */}
                  {whatsappLinks[selectedTicket.id] && (
                    <div className="mt-4">
                      <a
                        href={whatsappLinks[selectedTicket.id]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-3 rounded-xl bg-green-600 hover:bg-green-700 transition-all font-semibold flex items-center justify-center gap-2"
                      >
                        <MessageCircle size={20} />
                        <span>Join WhatsApp Community</span>
                      </a>
                      <p className="text-xs text-gray-500 text-center mt-2">
                        Connect with other attendees and get real-time updates
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            // Tickets List View
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {bookedTickets.map((ticket, index) => (
                <div 
                  key={index} 
                  onClick={() => setSelectedTicket(ticket)}
                  className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-gray-800 overflow-hidden hover:border-purple-600/50 transition-all cursor-pointer transform hover:scale-105"
                >
                  <div className="relative h-48">
                    <img src={ticket.image} alt={ticket.name} className="w-full h-full object-cover" />
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-green-600/80 backdrop-blur-sm text-xs font-semibold">
                      ✓ CONFIRMED
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-purple-300">{ticket.name}</h3>
                    <p className="text-gray-400 mb-4 text-sm">{ticket.college}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Order #</span>
                        <span className="font-semibold">{ticket.orderNumber}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Event Date</span>
                        <span className="font-semibold">
                          {new Date(ticket.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Amount</span>
                        <span className="font-bold text-purple-400">
                          {ticket.total === 0 ? 'FREE' : `₹${ticket.total}`}
                        </span>
                      </div>
                    </div>

                    <button className="w-full py-2 rounded-lg bg-purple-600/20 border border-purple-600/50 text-purple-300 font-semibold hover:bg-purple-600/30 transition-all">
                      View Ticket Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Profile Page
  const ProfilePage = () => (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex">
      <Sidebar activePage="profile" />

      <div className="flex-1 flex flex-col">
        <nav className="flex justify-between items-center p-6 backdrop-blur-sm bg-black/30 border-b border-purple-900/30 sticky top-0 z-50 lg:hidden">
          <div className="flex items-center gap-4">
            <button onClick={goBack} className="text-gray-400 hover:text-purple-400 transition-colors">
              <ArrowLeft size={24} />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-purple-900 flex items-center justify-center">
                <Sparkles size={24} />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                Blends
              </span>
            </div>
          </div>
        </nav>

        <div className="container mx-auto px-6 py-12 max-w-6xl">
          <h1 className="text-5xl font-extrabold mb-12 text-center bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
            My Profile
          </h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Profile Card */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl border border-gray-800 text-center sticky top-24">
                <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-purple-600/50">
                  <img src={userProfile.profileImage} alt={userProfile.name} className="w-full h-full object-cover" />
                </div>
                
                <h2 className="text-2xl font-bold mb-2">{userProfile.name}</h2>
                <p className="text-purple-400 mb-1">{userProfile.designation}</p>
                <p className="text-gray-400 text-sm mb-4">{userProfile.year}</p>
                
                <div className="mb-6 p-4 rounded-lg bg-black/40 border border-gray-700">
                  <div className="flex items-center gap-2 text-gray-400 mb-2">
                    <Building2 size={16} />
                    <span className="text-xs">University</span>
                  </div>
                  <p className="font-semibold">{userProfile.college}</p>
                </div>

                <div className="mb-6 p-4 rounded-lg bg-black/40 border border-gray-700">
                  <div className="flex items-center gap-2 text-gray-400 mb-2">
                    <Mail size={16} />
                    <span className="text-xs">Email</span>
                  </div>
                  <p className="font-semibold text-sm break-all">{userProfile.email}</p>
                </div>

                <button 
                  onClick={openEditProfile}
                  className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 transition-all font-semibold flex items-center justify-center gap-2"
                >
                  <Edit size={18} />
                  <span>Change Profile</span>
                </button>

                <button 
                  onClick={() => setShowDeleteAccountModal(true)}
                  className="w-full mt-3 py-3 rounded-lg bg-red-600/20 border border-red-600/50 hover:bg-red-600/30 text-red-400 transition-all font-semibold flex items-center justify-center gap-2"
                >
                  <X size={18} />
                  <span>Delete Account</span>
                </button>
              </div>
            </div>

            {/* Saved Events */}
            <div className="lg:col-span-2">
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-6 text-purple-400">Saved Events</h2>
                {savedEvents.length === 0 ? (
                  <div className="text-center py-20 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-gray-800">
                    <Bookmark size={64} className="mx-auto mb-6 text-gray-600" />
                    <p className="text-xl text-gray-400 mb-4">No saved events yet</p>
                    <button 
                      onClick={() => navigateTo('events')}
                      className="px-8 py-3 rounded-xl font-semibold bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 transition-all"
                    >
                      Discover Events
                    </button>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-6">
                    {mockEvents.filter(event => savedEvents.includes(event.id)).map(event => (
                      <div
                        key={event.id}
                        onClick={() => {
                          setSelectedEvent(event);
                          navigateTo('eventDetail', event);
                        }}
                        className="group bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden border border-gray-800 hover:border-purple-600/50 transition-all duration-300 cursor-pointer transform hover:scale-105"
                      >
                        <div className="relative overflow-hidden">
                          <img src={event.image} alt={event.name} className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" />
                          <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm text-xs font-semibold border border-purple-500/30">
                            {event.category}
                          </div>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleSaveEvent(event.id);
                            }}
                            className="absolute top-4 left-4 w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm border border-purple-500/30 flex items-center justify-center hover:bg-purple-600/40 transition-all"
                          >
                            <Bookmark size={18} className="fill-purple-400 text-purple-400" />
                          </button>
                        </div>
                        <div className="p-6">
                          <h3 className="text-xl font-bold mb-2 group-hover:text-purple-300 transition-colors">{event.name}</h3>
                          <div className="flex items-center gap-2 text-gray-400 mb-4">
                            <Building2 size={16} />
                            <span className="text-sm">{event.college}</span>
                          </div>
                          <div className="flex justify-between items-center pt-4 border-t border-gray-700">
                            <span className="text-xl font-bold text-purple-400">
                              {event.price === 0 ? 'FREE' : `₹${event.price}`}
                            </span>
                            <div className="flex items-center gap-2 text-sm text-gray-400">
                              <Calendar size={16} />
                              <span>{new Date(event.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Stats Section */}
              <div className="grid grid-cols-3 gap-6 mt-8">
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-2xl border border-gray-800 text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">{bookedTickets.length}</div>
                  <div className="text-gray-400 text-sm">Tickets Booked</div>
                </div>
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-2xl border border-gray-800 text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">{savedEvents.length}</div>
                  <div className="text-gray-400 text-sm">Saved Events</div>
                </div>
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-2xl border border-gray-800 text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">12</div>
                  <div className="text-gray-400 text-sm">Events Attended</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Profile Modal */}
        {showEditProfileModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6 z-50">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl border border-gray-700 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
              <h3 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                Edit Profile
              </h3>
              <p className="text-gray-400 mb-6">Update your personal information</p>

              {/* Profile Picture */}
              <div className="mb-6 flex flex-col items-center">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-purple-600/50 mb-4">
                  <img src={editProfileData.profileImage} alt="Profile" className="w-full h-full object-cover" />
                </div>
                <label className="block mb-2 text-sm font-medium text-gray-300">Profile Picture URL</label>
                <input
                  type="text"
                  placeholder="https://example.com/image.jpg"
                  value={editProfileData.profileImage}
                  onChange={(e) => setEditProfileData({ ...editProfileData, profileImage: e.target.value })}
                  className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all text-white placeholder-gray-500"
                />
              </div>

              {/* Name */}
              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-300">Full Name</label>
                <input
                  type="text"
                  value={editProfileData.name}
                  onChange={(e) => setEditProfileData({ ...editProfileData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all text-white placeholder-gray-500"
                />
              </div>

              {/* Email */}
              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-300">Email Address</label>
                <input
                  type="email"
                  value={editProfileData.email}
                  onChange={(e) => setEditProfileData({ ...editProfileData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all text-white placeholder-gray-500"
                />
              </div>

              {/* Password */}
              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-300">New Password (leave blank to keep current)</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={editProfileData.password}
                  onChange={(e) => setEditProfileData({ ...editProfileData, password: e.target.value })}
                  className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all text-white placeholder-gray-500"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={saveProfile}
                  className="flex-1 py-3 rounded-lg font-semibold bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 transition-all shadow-lg shadow-purple-500/30"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setShowEditProfileModal(false)}
                  className="flex-1 py-3 rounded-lg border border-gray-700 hover:bg-gray-800 transition-all font-semibold"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Account Modal */}
        {showDeleteAccountModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6 z-50">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl border border-red-600/30 max-w-md w-full shadow-2xl">
              <div className="text-center mb-6">
                <div className="w-20 h-20 rounded-full bg-red-600/20 border border-red-600/50 flex items-center justify-center mx-auto mb-4">
                  <X size={40} className="text-red-400" />
                </div>
                <h3 className="text-3xl font-bold mb-2 text-red-400">Delete Account</h3>
                <p className="text-gray-400">This action cannot be undone. All your data will be permanently deleted.</p>
              </div>

              <div className="bg-red-900/20 border border-red-600/30 rounded-lg p-4 mb-6">
                <p className="text-sm text-red-300">
                  ⚠️ You will lose access to:
                </p>
                <ul className="text-sm text-gray-400 mt-2 space-y-1 ml-4">
                  <li>• All booked tickets</li>
                  <li>• Saved events</li>
                  <li>• Your profile information</li>
                  <li>• Event history</li>
                </ul>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={deleteAccount}
                  className="flex-1 py-3 rounded-lg font-semibold bg-red-600 hover:bg-red-700 transition-all"
                >
                  Yes, Delete My Account
                </button>
                <button
                  onClick={() => setShowDeleteAccountModal(false)}
                  className="flex-1 py-3 rounded-lg border border-gray-700 hover:bg-gray-800 transition-all font-semibold"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // Club Directory Page
  const ClubDirectoryPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex">
      <Sidebar activePage="clubs" />

      <div className="flex-1 flex flex-col">
        <nav className="flex justify-between items-center p-6 backdrop-blur-sm bg-black/30 border-b border-purple-900/30 sticky top-0 z-50 lg:hidden">
          <div className="flex items-center gap-4">
            <button onClick={goBack} className="text-gray-400 hover:text-purple-400 transition-colors">
              <ArrowLeft size={24} />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-purple-900 flex items-center justify-center">
                <Sparkles size={24} />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                Blends
              </span>
            </div>
          </div>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </nav>

        {mobileMenuOpen && (
          <div className="lg:hidden bg-gray-900/90 backdrop-blur-sm border-b border-gray-800 p-4">
            <button onClick={() => { navigateTo('events'); setMobileMenuOpen(false); }} className="flex items-center gap-3 w-full text-left py-3 hover:text-purple-400 font-medium">
              <Calendar size={20} />
              <span>Events</span>
            </button>
            <button onClick={() => { navigateTo('clubs'); setMobileMenuOpen(false); }} className="flex items-center gap-3 w-full text-left py-3 hover:text-purple-400 font-medium">
              <Users size={20} />
              <span>Clubs</span>
            </button>
            <button onClick={() => { navigateTo('tickets'); setMobileMenuOpen(false); }} className="flex items-center gap-3 w-full text-left py-3 hover:text-purple-400 font-medium">
              <Ticket size={20} />
              <span>My Tickets</span>
            </button>
            <button onClick={() => { navigateTo('profile'); setMobileMenuOpen(false); }} className="flex items-center gap-3 w-full text-left py-3 hover:text-purple-400 font-medium">
              <User size={20} />
              <span>Profile</span>
            </button>
          </div>
        )}

        <div className="container mx-auto px-6 py-12">
          <h1 className="text-5xl font-extrabold mb-4 text-center bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
            Club Directory
          </h1>
          <p className="text-center text-gray-400 text-lg mb-12">Discover student organizations and their activities</p>

          <div className="max-w-2xl mx-auto mb-16">
            <label className="block mb-3 text-gray-300 font-medium">Select Your College</label>
            <select
              value={selectedCollege}
              onChange={(e) => setSelectedCollege(e.target.value)}
              className="w-full px-5 py-4 bg-gradient-to-r from-gray-900 to-gray-800 border border-gray-700 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all text-white text-lg cursor-pointer"
            >
              <option value="">Choose a college...</option>
              {Object.keys(mockClubs).map(college => (
                <option key={college} value={college}>{college}</option>
              ))}
            </select>
          </div>

          {selectedCollege && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mockClubs[selectedCollege].map(club => (
                <div
                  key={club.id}
                  onClick={() => {
                    setSelectedClub(club);
                    navigateTo('clubDetail');
                  }}
                  className="group bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl border border-gray-800 hover:border-purple-600/50 transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20"
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-600 to-purple-700 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-lg shadow-purple-500/30">
                    <Users size={28} />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-purple-300 transition-colors">
                    {club.name}
                  </h3>
                  <p className="text-gray-400 mb-6 leading-relaxed">{club.description}</p>
                  <div className="flex items-center gap-2 text-purple-400 font-semibold">
                    <Star size={18} />
                    <span>{club.events} events organized</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!selectedCollege && (
            <div className="text-center py-20">
              <Building2 size={64} className="mx-auto mb-6 text-gray-600" />
              <p className="text-xl text-gray-400">Select a college to view its clubs</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Club Detail Page with Pie Chart
  const ClubDetailPage = () => {
    if (!selectedClub) return null;

    const PieChart = ({ data }) => {
      const total = Object.values(data).reduce((a, b) => a + b, 0);
      let currentAngle = 0;
      const colors = { Technical: '#761cbc', Cultural: '#ff6b9d', Academic: '#4ade80', Sports: '#fbbf24' };

      return (
        <svg viewBox="0 0 200 200" className="w-72 h-72 mx-auto drop-shadow-2xl">
          {Object.entries(data).map(([key, value]) => {
            const percentage = value / total;
            const angle = percentage * 360;
            const startAngle = currentAngle;
            currentAngle += angle;

            const x1 = 100 + 90 * Math.cos((startAngle - 90) * Math.PI / 180);
            const y1 = 100 + 90 * Math.sin((startAngle - 90) * Math.PI / 180);
            const x2 = 100 + 90 * Math.cos((startAngle + angle - 90) * Math.PI / 180);
            const y2 = 100 + 90 * Math.sin((startAngle + angle - 90) * Math.PI / 180);
            const largeArc = angle > 180 ? 1 : 0;

            return (
              <g key={key}>
                <path
                  d={`M 100 100 L ${x1} ${y1} A 90 90 0 ${largeArc} 1 ${x2} ${y2} Z`}
                  fill={colors[key] || '#888'}
                  className="hover:opacity-80 transition-opacity cursor-pointer"
                />
              </g>
            );
          })}
          <circle cx="100" cy="100" r="55" fill="#0a0a0a" />
        </svg>
      );
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
        <nav className="flex justify-between items-center p-6 backdrop-blur-sm bg-black/30 border-b border-purple-900/30 sticky top-0 z-50">
          <div className="flex items-center gap-4">
            <button onClick={goBack} className="text-gray-400 hover:text-purple-400 transition-colors">
              <ArrowLeft size={24} />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-purple-900 flex items-center justify-center">
                <Sparkles size={24} />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                Blends
              </span>
            </div>
          </div>
          <button onClick={() => navigateTo('clubs')} className="font-medium hover:text-purple-400 transition-colors">
            Back to Directory
          </button>
        </nav>

        <div className="container mx-auto px-6 py-12 max-w-7xl">
          <div className="mb-12">
            <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
              {selectedClub.name}
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed max-w-3xl">{selectedClub.description}</p>
          </div>

          <div className="mb-16 p-10 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-800">
            <h2 className="text-3xl font-bold mb-8 text-center text-purple-400">Event Distribution</h2>
            <PieChart data={selectedClub.types} />
            <div className="flex flex-wrap justify-center gap-8 mt-10">
              {Object.entries(selectedClub.types).map(([key, value]) => (
                <div key={key} className="flex items-center gap-3">
                  <div 
                    className="w-5 h-5 rounded-md shadow-lg" 
                    style={{ backgroundColor: { Technical: '#761cbc', Cultural: '#ff6b9d', Academic: '#4ade80', Sports: '#fbbf24' }[key] }}
                  ></div>
                  <span className="font-semibold text-lg">{key}</span>
                  <span className="text-gray-400">({value}%)</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-8 text-purple-400">Organized Events</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mockEvents.filter(e => e.organizer === selectedClub.name).map(event => (
                <div
                  key={event.id}
                  onClick={() => {
                    setSelectedEvent(event);
                    navigateTo('eventDetail', event);
                  }}
                  className="group bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden border border-gray-800 hover:border-purple-600/50 transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20"
                >
                  <div className="relative overflow-hidden">
                    <img src={event.image} alt={event.name} className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-purple-300 transition-colors">{event.name}</h3>
                    <p className="text-gray-400 mb-4 text-sm">{event.college}</p>
                    <div className="flex justify-between items-center pt-4 border-t border-gray-700">
                      <span className="text-xl font-bold text-purple-400">
                        {event.price === 0 ? 'FREE' : `₹${event.price}`}
                      </span>
                      <span className="text-sm text-gray-400">{new Date(event.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Main Render
  if (currentPage === 'landing' && !isLoggedIn) return <LandingPage />;
  if (currentPage === 'login' && !isLoggedIn) return <LoginPage />;
  if (currentPage === 'signup' && !isLoggedIn) return <SignupPage />;
  if (currentPage === 'events' && isLoggedIn) return <EventsPage />;
  if (currentPage === 'eventDetail' && isLoggedIn) return <EventDetailPage />;
  if (currentPage === 'order' && isLoggedIn) return <OrderReviewPage />;
  if (currentPage === 'success' && isLoggedIn) return <SuccessPage />;
  if (currentPage === 'tickets' && isLoggedIn) return <MyTicketsPage />;
  if (currentPage === 'profile' && isLoggedIn) return <ProfilePage />;
  if (currentPage === 'clubs' && isLoggedIn) return <ClubDirectoryPage />;
  if (currentPage === 'clubDetail' && isLoggedIn) return <ClubDetailPage />;
  
  return <LandingPage />;
};

export default App;