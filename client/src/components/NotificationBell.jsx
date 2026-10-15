import React from 'react';
import { Bell } from 'lucide-react';

const NotificationBell = ({ unreadCount = 0, onClick }) => {
  return (
    <button
      onClick={onClick}
      id="notification-bell-btn"
      aria-label="Open notifications"
      className="relative p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-750 text-slate-300 hover:text-white border border-slate-700/80 hover:border-slate-600 transition-all duration-200"
    >
      <Bell className="w-5 h-5 text-slate-300 hover:text-blue-400 transition-colors" />
      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-[11px] font-bold text-white shadow-lg shadow-blue-500/50 animate-pulse">
          {unreadCount > 9 ? '9+' : unreadCount}
        </span>
      )}
    </button>
  );
};

export default NotificationBell;
