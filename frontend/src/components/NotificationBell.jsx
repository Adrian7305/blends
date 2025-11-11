import React from 'react';
import { Bell, X } from 'lucide-react';

const NotificationBell = ({ 
  notifications, 
  showNotifications, 
  setShowNotifications, 
  unreadCount, 
  markNotificationRead 
}) => {
  return (
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
                <p>No new notifications</p>
              </div>
            ) : (
              notifications.map(notification => (
                <div 
                  key={notification.id} 
                  className={`p-4 hover:bg-gray-800/50 transition-colors cursor-pointer ${!notification.read ? 'bg-purple-900/10' : ''}`}
                  onClick={() => markNotificationRead(notification.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      {notification.type === 'new_event' && '🎉'}
                      {notification.type === 'registration' && '✅'}
                      {notification.type === 'announcement' && '📢'}
                      {notification.type === 'reminder' && '⏰'}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-white mb-1">{notification.title}</h4>
                      <p className="text-gray-300 text-sm mb-2">{notification.message}</p>
                      <p className="text-gray-500 text-xs">{notification.date}</p>
                    </div>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;