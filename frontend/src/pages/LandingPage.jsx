import React from 'react';
import { ArrowRight, Users, Calendar, Sparkles, Star, MapPin, Clock, DollarSign, Building2, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';

const FeatureCard = ({ icon, title, description, delay }) => (
  <div className="animate-fadeInUp bg-gray-900/50 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-gray-800 hover:border-purple hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300" style={{ animationDelay: delay }}>
    <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-purple/20 flex items-center justify-center mb-3 md:mb-4">
      {icon}
    </div>
    <h3 className="text-lg md:text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-400 text-sm md:text-base">{description}</p>
  </div>
);

const StatItem = ({ number, label, delay }) => (
  <div className="animate-fadeInUp text-center" style={{ animationDelay: delay }}>
    <div className="text-2xl md:text-3xl font-bold text-purple mb-1">{number}</div>
    <div className="text-gray-400 text-sm md:text-base">{label}</div>
  </div>
);

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="container mx-auto px-4 md:px-8 py-8 md:py-16">
        {/* Hero Section */}
        <div className="text-center mb-16 md:mb-24 relative">
          {/* Decorative gradient glow */}
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-72 h-72 md:w-96 md:h-96 rounded-full bg-purple/20 blur-3xl pointer-events-none" />
          <div className="mb-4 md:mb-6">
            <img 
              src="/images/blends-logo.png" 
              alt="Blends Logo" 
              className="w-16 h-16 md:w-20 md:h-20 mx-auto rounded-xl object-cover mb-4 md:mb-6"
            />
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-purple to-pink bg-clip-text text-transparent">
            Welcome to Blends
          </h1>
          <p className="text-base md:text-xl text-gray-400 mb-6 md:mb-8 max-w-2xl mx-auto px-2">
            Discover amazing events, connect with clubs, and experience the best of campus life. Your next adventure starts here.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
            <Link 
              to="/events" 
              className="inline-flex items-center gap-2 bg-purple hover:bg-purple/80 text-white px-6 md:px-8 py-3 rounded-full font-semibold transition-all hover:shadow-xl hover:shadow-purple-500/50"
            >
              Explore Events
              <ArrowRight size={20} />
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 bg-gray-900 border border-gray-800 text-white px-6 md:px-8 py-3 rounded-full font-semibold hover:border-purple transition-all"
            >
              <LogIn size={20} />
              Login
            </Link>
            <Link
              to="/login#signup"
              className="inline-flex items-center gap-2 bg-white text-gray-900 px-6 md:px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all"
            >
              Sign Up
              <ArrowRight size={18} className="text-gray-900" />
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-16 md:mb-24">
          <FeatureCard 
            icon={<Calendar size={24} className="text-purple" />}
            title="Discover Events" 
            description="Find exciting events happening around campus and beyond"
            delay="0ms"
          />
          <FeatureCard 
            icon={<Building2 size={24} className="text-purple" />}
            title="Join Clubs" 
            description="Connect with like-minded people and explore your interests"
            delay="100ms"
          />
          <FeatureCard 
            icon={<Users size={24} className="text-purple" />}
            title="Build Community" 
            description="Meet new friends and create lasting memories together"
            delay="200ms"
          />
          <FeatureCard 
            icon={<Sparkles size={24} className="text-purple" />}
            title="Easy Registration" 
            description="Sign up for events with just a few clicks"
            delay="300ms"
          />
          <FeatureCard 
            icon={<Star size={24} className="text-purple" />}
            title="Track Progress" 
            description="Stay updated on your event registrations and tickets"
            delay="400ms"
          />
          <FeatureCard 
            icon={<MapPin size={24} className="text-purple" />}
            title="Venue Info" 
            description="Get all the details about event locations and timing"
            delay="500ms"
          />
        </div>

        {/* Stats Section */}
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-gray-800 mb-16 md:mb-24">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">By the Numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            <StatItem number="50+" label="Active Events" delay="0ms" />
            <StatItem number="25+" label="Student Clubs" delay="100ms" />
            <StatItem number="1000+" label="Students" delay="200ms" />
            <StatItem number="95%" label="Satisfaction" delay="300ms" />
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center text-gray-400 text-sm md:text-base">
          <p>&copy; 2024 Blends. Made with ❤️ for the campus community.</p>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;
