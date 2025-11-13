import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar'; // Import Sidebar
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import EventsPage from './pages/EventsPage';
import SearchPage from './pages/SearchPage';
import EventDetailPage from './pages/EventDetailPage';
import ClubDirectoryPage from './pages/ClubDirectoryPage';
import ClubDetailPage from './pages/ClubDetailPage';
import ProfilePage from './pages/ProfilePage';
import OrderPage from './pages/OrderPage';
import PaymentSuccessPage, { PaymentFailurePage } from './pages/PaymentStatus';
import MyTicketsPage from './pages/MyTicketsPage';
import PrivateRoute from './components/PrivateRoute';
// Removed mock events; pages now fetch from backend dynamically
import { mockClubs as mockClubsData } from './data/clubs';
import { authAPI } from './api';
import { 
  generateOrderNumber, 
  isValidEmail, 
  isCollegeEmail, 
  isValidOTP,
  calculateProgress,
  getStageStatus,
  allMembersAccepted,
  markNotificationRead,
  getUnreadCount,
  saveToLocalStorage,
  getFromLocalStorage
} from './utils/helpers';

function App() {
  // State management
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: '',
    email: '',
    college: '',
    phone: '',
    dateOfBirth: '',
    eventsAttended: 0,
    eventsOrganized: 0,
    totalSpent: 0,
    joinDate: new Date().toISOString(),
    profileImage: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face'
  });
  const [savedEvents, setSavedEvents] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [orderDetails, setOrderDetails] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [myTickets, setMyTickets] = useState([]);
  // Removed Sidebar-driven search state (now search lives in its own page)

  const allClubs = Object.entries(mockClubsData).flatMap(([college, clubs]) => 
    clubs.map(club => ({ ...club, college }))
  );

  // Load data from localStorage on mount
  useEffect(() => {
    const savedUser = getFromLocalStorage('userProfile');
    const savedSavedEvents = getFromLocalStorage('savedEvents');
    const savedNotifications = getFromLocalStorage('notifications');
    const savedMyTickets = getFromLocalStorage('myTickets');
    
    if (savedUser) {
      setUserProfile(savedUser);
      setIsLoggedIn(true);
    }
    if (savedSavedEvents) {
      setSavedEvents(savedSavedEvents);
    }
    if (savedMyTickets) {
      setMyTickets(savedMyTickets);
    }
    if (savedNotifications) {
      setNotifications(savedNotifications);
    } else {
      setNotifications([
        { id: 1, type: 'event', title: 'Welcome to Blends!', message: 'Start exploring events and clubs.', read: false, timestamp: new Date().toISOString() },
        { id: 2, type: 'system', title: 'New Features Available', message: 'Check out our latest updates.', read: false, timestamp: new Date(Date.now() - 3600000).toISOString() }
      ]);
    }
  }, []);

  // Save data to localStorage when state changes
  useEffect(() => {
    if (isLoggedIn) {
      saveToLocalStorage('userProfile', userProfile);
    }
  }, [userProfile, isLoggedIn]);

  useEffect(() => {
    saveToLocalStorage('savedEvents', savedEvents);
  }, [savedEvents]);

  useEffect(() => {
    saveToLocalStorage('myTickets', myTickets);
  }, [myTickets]);

  useEffect(() => {
    saveToLocalStorage('notifications', notifications);
  }, [notifications]);

  // Auth functions
  const handleLogin = (userData) => {
    setUserProfile({
      ...userProfile,
      name: userData.name,
      email: userData.email,
      college: userData.college,
      phone: userData.phone || '',
      dateOfBirth: userData.dateOfBirth || '',
      eventsAttended: userData.eventsAttended || 0,
      eventsOrganized: userData.eventsOrganized || 0,
      totalSpent: userData.totalSpent || 0,
      joinDate: userData.joinDate || new Date().toISOString(),
      profileImage: userData.profileImage || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face'
    });
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserProfile({
      name: '',
      email: '',
      college: '',
      phone: '',
      dateOfBirth: '',
      eventsAttended: 0,
      eventsOrganized: 0,
      totalSpent: 0,
      joinDate: new Date().toISOString(),
      profileImage: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face'
    });
    setSavedEvents([]);
    setNotifications([]);
    authAPI.logout(); // Clear token and localStorage
  };

  // Event functions
  const toggleSaveEvent = (eventId) => {
    setSavedEvents(prev => 
      prev.includes(eventId) 
        ? prev.filter(id => id !== eventId)
        : [...prev, eventId]
    );
  };

  // Notification functions
  const handleMarkNotificationRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId 
          ? { ...notif, read: true }
          : notif
      )
    );
  };

  // Profile functions
  const handleSaveProfile = (updatedProfile) => {
    setUserProfile(updatedProfile);
  };

  const handleDeleteAccount = () => {
    handleLogout();
    localStorage.clear();
  };

  // Payment functions
  const handlePaymentSuccess = (orderData) => {
    setUserProfile(prev => ({
      ...prev,
      eventsAttended: prev.eventsAttended + 1,
      totalSpent: prev.totalSpent + orderData.totalAmount
    }));

    const newTicket = {
      ...orderData,
      ticketId: generateOrderNumber(),
      purchaseDate: new Date().toISOString(),
      gate: 'A',
      seat: 'General Admission',
    };
    setMyTickets(prev => [newTicket, ...prev]);

    const newNotification = {
      id: Date.now(),
      type: 'event',
      title: 'Registration Successful!',
      message: `You have successfully registered for ${orderData.event.name}`,
      read: false,
      timestamp: new Date().toISOString()
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  if (!isLoggedIn) {
    return (
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/signup" element={<LoginPage onLogin={handleLogin} defaultIsSignUp={true} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  }

  return (
    <div className="min-h-screen bg-black flex">
      <Sidebar 
        userProfile={userProfile} 
        onLogout={handleLogout}
      />
      <div className="flex-1 flex flex-col">
        <Header 
          userProfile={userProfile} 
          unreadCount={getUnreadCount(notifications)} 
          showNotifications={showNotifications}
          setShowNotifications={setShowNotifications}
          notifications={notifications}
          markNotificationRead={handleMarkNotificationRead}
        />
        <main className="flex-1 p-6 overflow-y-auto">
          <Routes>
            <Route path="/" element={<EventsPage savedEvents={savedEvents} toggleSaveEvent={toggleSaveEvent} />} />
            <Route path="/events" element={<EventsPage savedEvents={savedEvents} toggleSaveEvent={toggleSaveEvent} />} />
            <Route path="/search" element={<SearchPage savedEvents={savedEvents} toggleSaveEvent={toggleSaveEvent} />} />
            <Route path="/event/:id" element={<EventDetailPage savedEvents={savedEvents} toggleSaveEvent={toggleSaveEvent} setOrderDetails={setOrderDetails} userProfile={userProfile} />} />
            <Route path="/clubs" element={<ClubDirectoryPage clubs={allClubs} />} />
            <Route path="/club/:id" element={<ClubDetailPage events={[]} clubs={allClubs} />} />
            <Route path="/profile" element={<ProfilePage userProfile={userProfile} setUserProfile={handleSaveProfile} onDeleteAccount={handleDeleteAccount} />} />
            <Route path="/order" element={<OrderPage orderDetails={orderDetails} onPaymentSuccess={handlePaymentSuccess} />} />
            <Route path="/success" element={<PaymentSuccessPage />} />
            <Route path="/failure" element={<PaymentFailurePage />} />
            <Route path="/tickets" element={<MyTicketsPage userProfile={userProfile} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
