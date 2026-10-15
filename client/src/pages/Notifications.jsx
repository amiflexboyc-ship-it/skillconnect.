import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import Sidebar from '../components/Sidebar';
import Loading from '../components/Loading';
import {
  Bell,
  CheckCheck,
  DollarSign,
  Briefcase,
  MessageSquare,
  Info,
  ExternalLink,
  Trash2,
} from 'lucide-react';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      try {
        const res = await api.getNotifications();
        if (res.success && res.notifications) {
          setNotifications(res.notifications);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  const handleMarkRead = async (id) => {
    try {
      await api.markNotificationRead(id);
      setNotifications(prev => prev.map(n => n._id === id ? { ...n, read: true } : n));
    } catch (err) {
      console.error(err);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await api.markAllNotificationsRead();
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    } catch (err) {
      console.error(err);
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case 'payment':
        return <DollarSign className="w-5 h-5 text-yellow-400" />;
      case 'job':
        return <Briefcase className="w-5 h-5 text-blue-400" />;
      case 'message':
        return <MessageSquare className="w-5 h-5 text-cyan-400" />;
      default:
        return <Info className="w-5 h-5 text-emerald-400" />;
    }
  };

  const filteredNotifs = notifications.filter(n => {
    if (filter === 'unread') return !n.read;
    if (filter === 'payment') return n.type === 'payment';
    if (filter === 'job') return n.type === 'job';
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex gap-8">
        <Sidebar />

        <main className="flex-1 min-w-0 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-extrabold text-white">Notifications Center</h1>
              <p className="text-xs text-slate-400">
                Live updates on contracts, payments, matching jobs, and client messages.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleMarkAllRead}
                className="btn-secondary text-xs py-2 px-3.5 flex items-center gap-1.5"
              >
                <CheckCheck className="w-4 h-4 text-yellow-400" />
                <span>Mark All Read</span>
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {['all', 'unread', 'payment', 'job'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-colors ${
                  filter === f
                    ? 'bg-blue-500 text-white'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Feed */}
          {loading ? (
            <Loading text="Loading notifications..." />
          ) : filteredNotifs.length === 0 ? (
            <div className="card-premium py-16 text-center space-y-3">
              <Bell className="w-12 h-12 text-slate-500 mx-auto" />
              <p className="text-slate-400 text-sm">No notifications found.</p>
            </div>
          ) : (
            <div className="card-premium p-0 divide-y divide-slate-800/80 overflow-hidden">
              {filteredNotifs.map((n) => (
                <div
                  key={n._id}
                  onClick={() => handleMarkRead(n._id)}
                  className={`p-5 flex items-start justify-between gap-4 transition-colors cursor-pointer ${
                    !n.read ? 'bg-blue-500/5 hover:bg-blue-500/10' : 'hover:bg-slate-900/40'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-2xl bg-slate-900 border border-slate-700/80 shrink-0 mt-0.5">
                      {getIcon(n.type)}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs sm:text-sm font-bold text-white">{n.title}</h4>
                        {!n.read && (
                          <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0"></span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed max-w-2xl">{n.message}</p>
                      <p className="text-[10px] text-slate-500 pt-1">
                        {new Date(n.createdAt || Date.now()).toLocaleDateString(undefined, {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  </div>

                  {n.link && (
                    <Link
                      to={n.link}
                      className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-blue-400 hover:text-white flex items-center gap-1 shrink-0 transition-colors"
                    >
                      <span>Open</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Notifications;
