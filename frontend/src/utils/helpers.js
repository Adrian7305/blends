// Date and time utilities
export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-IN', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

export const formatTime = (timeString) => {
  return timeString;
};

export const formatDateTime = (dateString, timeString) => {
  return `${formatDate(dateString)} at ${timeString}`;
};

// String utilities
export const generateOrderNumber = () => {
  return 'BL' + Date.now().toString().slice(-8);
};

export const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

// Validation utilities
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isCollegeEmail = (email, allowedDomains) => {
  if (!isValidEmail(email)) return false;
  const domain = email.substring(email.lastIndexOf('@'));
  return allowedDomains.some(allowedDomain => domain === allowedDomain);
};

export const isValidOTP = (otp) => {
  return /^\d{6}$/.test(otp);
};

// Event utilities
export const filterEvents = (events, searchQuery, category, priceRange) => {
  return events.filter(event => {
    const matchesSearch = !searchQuery || 
      event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.college.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = !category || event.category === category;
    
    const matchesPrice = !priceRange || 
      (priceRange === 'free' && event.price === 0) ||
      (priceRange === 'paid' && event.price > 0) ||
      (priceRange === 'all');
    
    return matchesSearch && matchesCategory && matchesPrice;
  });
};

export const sortEvents = (events, sortBy) => {
  const sorted = [...events];
  switch (sortBy) {
    case 'date':
      return sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
    case 'price-low':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-high':
      return sorted.sort((a, b) => b.price - a.price);
    case 'name':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    default:
      return sorted;
  }
};

// Stage and progress utilities
export const getStageStatus = (stage, index, allStages) => {
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

export const calculateProgress = (stages) => {
  if (!stages || stages.length === 0) return 0;
  const completedStages = stages.filter(s => {
    const status = getStageStatus(s, 0, stages);
    return status === 'completed';
  }).length;
  return (completedStages / stages.length) * 100;
};

// Team utilities
export const allMembersAccepted = (teamMembers, teamMemberStatuses) => {
  return teamMembers.every((member, index) => 
    index === 0 || member.status === 'accepted'
  );
};

export const canAddTeamMember = (teamMembers, maxSize) => {
  return teamMembers.length < maxSize;
};

// Notification utilities
export const markNotificationRead = (notifications, id) => {
  return notifications.map(n => 
    n.id === id ? { ...n, read: true } : n
  );
};

export const getUnreadCount = (notifications) => {
  return notifications.filter(n => !n.read).length;
};

// Local storage utilities
export const saveToLocalStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export const getFromLocalStorage = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return defaultValue;
  }
};

export const removeFromLocalStorage = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing from localStorage:', error);
  }
};

// Team storage helpers
export const generateTeamCode = () => {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return code;
};

export const getTeamsForEvent = (eventId) => {
  const allTeams = getFromLocalStorage('teams', {});
  return allTeams[eventId] || {};
};

export const saveTeamForEvent = (eventId, teamCode, teamData) => {
  const allTeams = getFromLocalStorage('teams', {});
  const eventTeams = allTeams[eventId] || {};
  eventTeams[teamCode] = teamData;
  const updated = { ...allTeams, [eventId]: eventTeams };
  saveToLocalStorage('teams', updated);
  return updated;
};

export const findTeamByCode = (eventId, teamCode) => {
  const eventTeams = getTeamsForEvent(eventId);
  return eventTeams[teamCode] || null;
};
