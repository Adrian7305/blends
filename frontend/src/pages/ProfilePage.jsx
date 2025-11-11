import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, MapPin, Calendar, Edit3, Trash2, Camera, X, Check, Ticket, Clock, DollarSign, LogOut } from 'lucide-react';

const StatCard = ({ label, value, icon: Icon }) => (
  <div className="bg-surface-hover p-4 rounded-lg flex items-center hover:shadow-lg hover:shadow-purple-500/10 hover:-translate-y-1 transition-all duration-300">
    <div className="p-3 bg-primary/10 rounded-lg mr-4">
      <Icon size={24} className="text-primary" />
    </div>
    <div>
      <p className="text-sm text-gray-400">{label}</p>
      <p className="text-lg font-bold text-white">{value}</p>
    </div>
  </div>
);

const ProfilePage = ({ userProfile, setUserProfile, onDeleteAccount, onLogout }) => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ ...userProfile });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleSave = () => {
    setUserProfile(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({ ...userProfile });
    setIsEditing(false);
  };

  const handleDeleteAccount = () => {
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    onDeleteAccount();
    navigate('/');
  };

  return (
    <div className="animate-fadeIn">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold font-display">Profile</h1>
        <div className="flex items-center gap-4">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="btn-primary flex items-center gap-2 hover:shadow-lg hover:shadow-purple-500/30"
            >
              <Edit3 size={18} />
              Edit Profile
            </button>
          ) : (
            <>
              <button
                onClick={handleCancel}
                className="btn-secondary flex items-center gap-2 hover:shadow-lg hover:shadow-gray-500/30"
              >
                <X size={18} />
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="btn-success flex items-center gap-2 hover:shadow-lg hover:shadow-green-500/30"
              >
                <Check size={18} />
                Save Changes
              </button>
            </>
          )}
        </div>
      </div>

      {/* Profile Header */}
      <div className="bg-surface rounded-lg p-8 mb-8 flex items-center">
        <div className="relative mr-8">
          <img src={userProfile.avatar || `https://api.dicebear.com/6.x/initials/svg?seed=${userProfile.name}`} alt="Avatar" className="w-32 h-32 rounded-full object-cover border-4 border-primary" />
          {isEditing && (
            <button className="absolute bottom-0 right-0 bg-primary hover:bg-primary-hover p-2 rounded-full transition-colors">
              <Camera size={16} />
            </button>
          )}
        </div>
        <div>
          <h2 className="text-3xl font-bold text-white">{userProfile.name}</h2>
          <p className="text-gray-400">{userProfile.email}</p>
          <p className="text-sm text-gray-500 mt-2">
            Member since {new Date(userProfile.joinDate || Date.now()).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="animate-fadeInUp" style={{ animationDelay: '0ms' }}>
          <StatCard label="Events Attended" value={userProfile.eventsAttended || 0} icon={Ticket} />
        </div>
        <div className="animate-fadeInUp" style={{ animationDelay: '100ms' }}>
          <StatCard label="Events Organized" value={userProfile.eventsOrganized || 0} icon={Calendar} />
        </div>
        <div className="animate-fadeInUp" style={{ animationDelay: '200ms' }}>
          <StatCard label="Total Spent" value={`₹${userProfile.totalSpent || 0}`} icon={DollarSign} />
        </div>
      </div>

      {/* Personal Information */}
      <div className="bg-surface rounded-lg p-8 mb-8">
        <h3 className="text-2xl font-bold text-white mb-6">Personal Information</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
            <div className="flex items-center gap-2 bg-surface-hover p-3 rounded-lg">
              <Mail size={18} className="text-gray-500" />
              <p className="text-white">{userProfile.email}</p>
            </div>
          </div>
          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Phone Number</label>
            {isEditing ? (
              <input type="tel" value={editData.phone || ''} onChange={(e) => setEditData({ ...editData, phone: e.target.value })} className="input-field" placeholder="Enter phone number" />
            ) : (
              <div className="flex items-center gap-2 bg-surface-hover p-3 rounded-lg">
                <Phone size={18} className="text-gray-500" />
                <p className="text-white">{userProfile.phone || 'Not provided'}</p>
              </div>
            )}
          </div>
          {/* College */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">College/University</label>
            {isEditing ? (
              <input type="text" value={editData.college || ''} onChange={(e) => setEditData({ ...editData, college: e.target.value })} className="input-field" placeholder="Enter college name" />
            ) : (
              <div className="flex items-center gap-2 bg-surface-hover p-3 rounded-lg">
                <MapPin size={18} className="text-gray-500" />
                <p className="text-white">{userProfile.college || 'Not specified'}</p>
              </div>
            )}
          </div>
          {/* DOB */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Date of Birth</label>
            {isEditing ? (
              <input type="date" value={editData.dateOfBirth || ''} onChange={(e) => setEditData({ ...editData, dateOfBirth: e.target.value })} className="input-field" />
            ) : (
              <div className="flex items-center gap-2 bg-surface-hover p-3 rounded-lg">
                <Calendar size={18} className="text-gray-500" />
                <p className="text-white">{userProfile.dateOfBirth ? new Date(userProfile.dateOfBirth).toLocaleDateString('en-US') : 'Not provided'}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-red-900/20 rounded-lg p-8">
        <h3 className="text-2xl font-bold text-red-400 mb-4">Danger Zone</h3>
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-semibold text-white">Delete Account</h4>
            <p className="text-sm text-gray-400">Permanently delete your account and all associated data.</p>
          </div>
          <button onClick={handleDeleteAccount} className="btn-danger flex items-center gap-2">
            <Trash2 size={16} />
            Delete Account
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-surface border border-gray-800 rounded-lg p-8 max-w-md mx-4">
            <h3 className="text-xl font-bold text-red-400 mb-4">Confirm Deletion</h3>
            <p className="text-gray-300 mb-6">Are you sure you want to delete your account? This action is irreversible.</p>
            <div className="flex gap-4">
              <button onClick={() => setShowDeleteConfirm(false)} className="btn-secondary w-full">Cancel</button>
              <button onClick={confirmDelete} className="btn-danger w-full">Delete Account</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;