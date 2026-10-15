import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCheck, ExternalLink, DollarSign, Briefcase, MessageSquare, Info } from 'lucide-react';

const NotificationDropdown = ({ notifications = [], onMarkRead, onMarkAllRead, onClose }) => {
  const getIcon = (type) => {
    switch (type) {
      case 'payment':
        return <DollarSign className="w-4 h-4 text-yellow-400" />;
      case 'job':
        return <Briefcase className="w-4 h-4 text-blue-400" />;
      case 'message':
        return <MessageSquare className="w-4 h-4 text-cyan-400" />;
      default:
        return <Info className="w-4 h-4 text-emerald-400" />;
    }
  };

  return (
    <div className="absolute right-0 mt-3 w-84 sm:w-96 rounded-2xl bg-[#1E293B] border border-slate-700 shadow-2xl shadow-black/80 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-700/80 bg-slate-900/60">
        <div className="flex items-center gap-2">
          <h4 className="font-semibold text-white text-sm">Notifications</h4>
          <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">
            {notifications.filter(n => !n.read).length} new
          </span>
        </div>
        <button
          onClick={onMarkAllRead}
          className="text-xs text-yellow-400 hover:text-yellow-300 flex items-center gap-1 font-medium transition-colors"
        >
          <CheckCheck className="w-3.5 h-3.5" /> Mark all read
        </button>
      </div>

      <div className="max-h-[360px] overflow-y-auto divide-y divide-slate-800/80">
        {notifications.length === 0 ? (
          <div className="py-8 text-center text-slate-400 text-sm">
            No notifications at the moment
          </div>
        ) : (
          notifications.map((n) => (
            <div
              key={n._id}
              onClick={() => onMarkRead(n._id)}
              className={`p-4 hover:bg-slate-800/70 transition-colors cursor-pointer flex gap-3 ${
                !n.read ? 'bg-blue-500/5' : ''
              }`}
            >
              <div className="mt-0.5 p-2 rounded-xl bg-slate-800 border border-slate-700/60 h-fit shrink-0">
                {getIcon(n.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <p className="text-xs font-semibold text-white truncate">{n.title}</p>
                  {!n.read && (
                    <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0"></span>
                  )}
                </div>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {n.message}
                </p>
                {n.link && (
                  <Link
                    to={n.link}
                    onClick={onClose}
                    className="mt-2 inline-flex items-center gap-1 text-[11px] font-medium text-blue-400 hover:text-blue-300"
                  >
                    View details <ExternalLink className="w-3 h-3" />
                  </Link>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="p-3 bg-slate-900/60 border-t border-slate-800 text-center">
        <Link
          to="/notifications"
          onClick={onClose}
          className="text-xs font-medium text-slate-300 hover:text-white transition-colors"
        >
          View all notifications →
        </Link>
      </div>
    </div>
  );
};

export default NotificationDropdown;
