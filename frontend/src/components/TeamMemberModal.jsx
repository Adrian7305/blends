import React, { useEffect, useState } from 'react';
import { Users, Mail, X, UserPlus, Trash2, Copy, KeyRound } from 'lucide-react';
import { 
  generateTeamCode, 
  saveTeamForEvent, 
  findTeamByCode 
} from '../utils/helpers';

const TeamMemberModal = ({ 
  isOpen, 
  onClose, 
  event, 
  teamMembers, 
  setTeamMembers, 
  teamMemberStatuses, 
  setTeamMemberStatuses,
  allMembersAccepted,
  onRegister 
}) => {
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const [mode, setMode] = useState('create'); // 'create' | 'join'
  const [generatedTeamCode, setGeneratedTeamCode] = useState('');
  const [teamCodeInput, setTeamCodeInput] = useState('');
  const [joinError, setJoinError] = useState('');

  const currentUserEmail = teamMembers[0]?.email || '';

  if (!isOpen || !event) return null;

  // Initialize team code when creating
  useEffect(() => {
    if (isOpen && event && mode === 'create' && !generatedTeamCode) {
      const code = generateTeamCode();
      setGeneratedTeamCode(code);
      // Initialize storage with current leader
      saveTeamForEvent(event.id, code, {
        ownerEmail: currentUserEmail,
        members: teamMembers,
        createdAt: new Date().toISOString()
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, event, mode]);

  const addTeamMember = () => {
    if (newMemberEmail && teamMembers.length < (event?.teamSize?.max || 4)) {
      if (newMemberEmail.includes('@')) {
        const newMember = {
          email: newMemberEmail,
          status: 'pending'
        };
        setTeamMembers([...teamMembers, newMember]);
        setTeamMemberStatuses({ ...teamMemberStatuses, [newMemberEmail]: 'pending' });
        setNewMemberEmail('');
        // Persist to storage if creating a team
        if (generatedTeamCode) {
          saveTeamForEvent(event.id, generatedTeamCode, {
            ownerEmail: currentUserEmail,
            members: [...teamMembers, newMember],
            createdAt: new Date().toISOString()
          });
        }
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
    if (generatedTeamCode) {
      saveTeamForEvent(event.id, generatedTeamCode, {
        ownerEmail: currentUserEmail,
        members: teamMembers.filter((_, i) => i !== index),
        createdAt: new Date().toISOString()
      });
    }
  };

  const simulateAcceptance = (email) => {
    setTeamMemberStatuses({ ...teamMemberStatuses, [email]: 'accepted' });
    const updatedTeam = teamMembers.map(member => 
      member.email === email ? { ...member, status: 'accepted' } : member
    );
    setTeamMembers(updatedTeam);
    if (generatedTeamCode) {
      saveTeamForEvent(event.id, generatedTeamCode, {
        ownerEmail: currentUserEmail,
        members: updatedTeam,
        createdAt: new Date().toISOString()
      });
    }
  };

  const handleJoinTeam = () => {
    setJoinError('');
    if (!teamCodeInput || teamCodeInput.trim().length < 4) {
      setJoinError('Please enter a valid team code');
      return;
    }
    const team = findTeamByCode(event.id, teamCodeInput.trim().toUpperCase());
    if (!team) {
      setJoinError('No team found for this code for this event');
      return;
    }
    // Add current user if not present
    const exists = team.members.some(m => m.email === currentUserEmail);
    let updatedMembers = team.members;
    if (!exists) {
      if (team.members.length + 1 > event.teamSize.max) {
        setJoinError(`Team is full. Max ${event.teamSize.max} members.`);
        return;
      }
      updatedMembers = [...team.members, { email: currentUserEmail, status: 'accepted' }];
    }
    // Update local state and storage
    setTeamMembers(updatedMembers);
    const newStatuses = { ...teamMemberStatuses };
    updatedMembers.forEach(m => {
      newStatuses[m.email] = m.status || 'pending';
    });
    setTeamMemberStatuses(newStatuses);
    saveTeamForEvent(event.id, teamCodeInput.trim().toUpperCase(), {
      ...team,
      members: updatedMembers
    });
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeInUp">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-gray-700 p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-fadeInUp" style={{ animationDelay: '100ms' }}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-purple-400 flex items-center gap-2">
            <Users size={24} />
            Team Registration
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-800 rounded-lg transition-colors hover:shadow-lg hover:shadow-gray-500/20">
            <X size={20} />
          </button>
        </div>

        {/* Mode Toggle */}
        <div className="mb-6 flex gap-2">
          <button
            className={`flex-1 py-2 rounded-lg border ${mode === 'create' ? 'border-purple-500 text-purple-300 bg-purple-900/20' : 'border-gray-700 text-gray-300 hover:bg-gray-800'}`}
            onClick={() => setMode('create')}
          >
            Create Team
          </button>
          <button
            className={`flex-1 py-2 rounded-lg border ${mode === 'join' ? 'border-purple-500 text-purple-300 bg-purple-900/20' : 'border-gray-700 text-gray-300 hover:bg-gray-800'}`}
            onClick={() => setMode('join')}
          >
            Join Team
          </button>
        </div>

        {/* Info banner */}
        <div className="mb-6 p-4 bg-purple-900/20 rounded-lg border border-purple-700/50 animate-fadeInUp" style={{ animationDelay: '200ms' }}>
          <p className="text-purple-300 mb-2">
            <strong>Team Size:</strong> {event.teamSize.min}-{event.teamSize.max} members
          </p>
          <p className="text-gray-400 text-sm">
            {mode === 'create' ? 'Add your team members by email and share the team code.' : 'Enter a team code shared by your team lead to join.'}
          </p>
        </div>

        {mode === 'create' && (
          <div className="mb-6">
            <label className="block text-gray-300 mb-2">Your Team Code</label>
            <div className="flex items-center gap-2">
              <div className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white tracking-widest font-mono">
                {generatedTeamCode}
              </div>
              <button
                onClick={() => navigator.clipboard.writeText(generatedTeamCode)}
                className="px-3 py-3 rounded-lg border border-gray-700 hover:bg-gray-800 text-gray-300 flex items-center gap-2"
              >
                <Copy size={16} /> Copy
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 flex items-center gap-1"><KeyRound size={14} className="text-purple-400"/> Share this code with teammates to let them join.</p>
          </div>
        )}

        {mode === 'join' && (
          <div className="mb-6">
            <label className="block text-gray-300 mb-2">Enter Team Code</label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="e.g., AB2D9F"
                value={teamCodeInput}
                onChange={(e) => setTeamCodeInput(e.target.value.toUpperCase())}
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all text-white"
              />
              <button
                onClick={handleJoinTeam}
                className="px-4 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg text-white"
              >
                Join
              </button>
            </div>
            {joinError && <p className="text-sm text-red-400 mt-2">{joinError}</p>}
          </div>
        )}

        {/* Add Team Member */}
        <div className="mb-6 animate-fadeInUp" style={{ animationDelay: '300ms' }}>
          <label className="block text-gray-300 mb-2">Add Team Member</label>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Enter email address"
              value={newMemberEmail}
              onChange={(e) => setNewMemberEmail(e.target.value)}
              className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all text-white hover:shadow-lg hover:shadow-purple-500/10"
              onKeyPress={(e) => e.key === 'Enter' && addTeamMember()}
            />
            <button
              onClick={addTeamMember}
              disabled={!newMemberEmail || teamMembers.length >= (event.teamSize.max || 4)}
              className="px-4 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-lg transition-colors flex items-center gap-2 hover:shadow-lg hover:shadow-purple-500/30"
            >
              <UserPlus size={18} />
              Add
            </button>
          </div>
        </div>

        {/* Team Members List */}
        <div className="mb-6 animate-fadeInUp" style={{ animationDelay: '400ms' }}>
          <h3 className="text-lg font-semibold mb-3 text-gray-300">Team Members ({teamMembers.length})</h3>
          <div className="space-y-3">
            {teamMembers.map((member, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-gray-700 animate-fadeInUp" style={{ animationDelay: `${index * 50}ms` }}>
                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-gray-400" />
                  <span className="text-white">{member.email}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    member.status === 'accepted' ? 'bg-green-500/20 text-green-400' :
                    member.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {member.status}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {member.status === 'pending' && (
                    <button
                      onClick={() => simulateAcceptance(member.email)}
                      className="text-xs px-2 py-1 bg-green-600 hover:bg-green-700 rounded transition-colors hover:shadow-lg hover:shadow-green-500/30"
                    >
                      Accept
                    </button>
                  )}
                  <button
                    onClick={() => removeTeamMember(index)}
                    className="p-1 hover:bg-red-600/20 rounded transition-colors text-red-400 hover:shadow-lg hover:shadow-red-500/30"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
            {teamMembers.length === 0 && (
              <p className="text-gray-500 text-center py-4 animate-fadeInUp" style={{ animationDelay: '500ms' }}>No team members added yet</p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 animate-fadeInUp" style={{ animationDelay: '600ms' }}>
          <button
            onClick={onClose}
            className="flex-1 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors hover:shadow-lg hover:shadow-gray-500/30"
          >
            Cancel
          </button>
          <button
            onClick={onRegister}
            disabled={
              !allMembersAccepted() ||
              teamMembers.length < (event.teamSize?.min || 1) ||
              teamMembers.length > (event.teamSize?.max || 99)
            }
            className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed rounded-lg transition-all font-medium hover:shadow-lg hover:shadow-purple-500/30"
          >
            {allMembersAccepted() && teamMembers.length >= (event.teamSize?.min || 1)
              ? 'Register Team'
              : 'Complete team to proceed'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberModal;
