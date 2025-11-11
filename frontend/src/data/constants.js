export const COLLEGE_EMAILS = [
  '@manipal.edu',
  '@christuniversity.in',
  '@iitb.ac.in',
  '@pilani.bits-pilani.ac.in',
  '@du.ac.in',
  '@nitt.edu'
];

export const CATEGORIES = [
  'Technical',
  'Cultural', 
  'Academic',
  'Sports',
  'Literary',
  'Social'
];

export const EVENT_TYPES = {
  Technical: { color: '#761cbc', icon: '⚙️' },
  Cultural: { color: '#ff6b9d', icon: '🎭' },
  Academic: { color: '#4ade80', icon: '📚' },
  Sports: { color: '#fbbf24', icon: '⚽' },
  Literary: { color: '#3b82f6', icon: '📖' },
  Social: { color: '#f97316', icon: '🤝' }
};

export const STAGE_STATUS = {
  completed: { color: 'text-green-400', bg: 'bg-green-500/20', label: 'Completed' },
  active: { color: 'text-yellow-400', bg: 'bg-yellow-500/20', label: 'Active' },
  upcoming: { color: 'text-blue-400', bg: 'bg-blue-500/20', label: 'Upcoming' }
};

export const TEAM_MEMBER_STATUS = {
  pending: { color: 'text-yellow-400', bg: 'bg-yellow-500/20', label: 'Pending' },
  accepted: { color: 'text-green-400', bg: 'bg-green-500/20', label: 'Accepted' },
  declined: { color: 'text-red-400', bg: 'bg-red-500/20', label: 'Declined' }
};

export const NOTIFICATION_TYPES = {
  new_event: { icon: '🎉', color: 'text-purple-400' },
  registration: { icon: '✅', color: 'text-green-400' },
  announcement: { icon: '📢', color: 'text-blue-400' },
  reminder: { icon: '⏰', color: 'text-yellow-400' }
};