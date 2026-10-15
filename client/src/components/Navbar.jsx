import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import NotificationBell from './NotificationBell';
import NotificationDropdown from './NotificationDropdown';
import {
  PlusCircle,
  Wallet,
  Menu,
  X,
  User,
  LayoutDashboard,
  MessageSquare,
  ShieldAlert,
  LogOut,
  FolderKanban,
  Settings,
  Sparkles,
} from 'lucide-react';

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(2);
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchNotifs = async () => {
      try {
        const res = await api.getNotifications();
        if (res.success && res.notifications) {
          setNotifications(res.notifications);
          setUnreadCount(res.notifications.filter(n => !n.read).length);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchNotifs();
  }, []);

  const handleMarkRead = async (id) => {
    try {
      await api.markNotificationRead(id);
      setNotifications(prev => prev.map(n => n._id === id ? { ...n, read: true } : n));
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (err) {
      console.error(err);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await api.markAllNotificationsRead();
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
      setUnreadCount(0);
    } catch (err) {
      console.error(err);
    }
  };

  const navLinks = [
    { name: 'Find Jobs', path: '/find-jobs' },
    { name: 'Freelancers', path: '/freelancers' },
    { name: 'Explore Skills', path: '/explore-skills' },
    { name: 'Projects', path: '/projects' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="glass-header">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <img
                  src="/logo.png"
                  alt="SkillConnect Logo"
                  className="w-10 h-10 rounded-xl object-cover ring-2 ring-blue-500/50 group-hover:ring-yellow-400 transition-all shadow-lg shadow-blue-500/20"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-extrabold tracking-tight text-white group-hover:text-blue-400 transition-colors">
                    Skill<span className="text-yellow-400">Connect</span>
                  </span>
                </div>
                <span className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold">
                  Global Talent Hub
                </span>
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive(link.path)
                      ? 'text-white bg-slate-800/80 border border-slate-700/80 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              {isAdmin && (
                <Link
                  to="/admin"
                  className="ml-2 px-3 py-1.5 rounded-xl text-xs font-bold text-yellow-400 bg-yellow-400/10 border border-yellow-400/30 hover:bg-yellow-400/20 flex items-center gap-1.5 transition-all"
                >
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>Admin Panel</span>
                </Link>
              )}
            </nav>
          </div>

          {/* Right Action Icons & User Menu */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Post a Job button */}
            <Link
              to="/post-job"
              className="btn-primary text-xs py-2 px-4 shadow-blue-500/30"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Post a Job</span>
            </Link>

            {user ? (
              <div className="flex items-center gap-3">
                {/* Wallet shortcut */}
                <Link
                  to="/wallet"
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-xs font-semibold text-yellow-400 hover:border-yellow-400/40 transition-colors"
                  title="Your Balance"
                >
                  <Wallet className="w-4 h-4 text-yellow-400" />
                  <span>${user.walletBalance ? user.walletBalance.toLocaleString() : '4,950'}</span>
                </Link>

                {/* Notifications */}
                <div className="relative">
                  <NotificationBell
                    unreadCount={unreadCount}
                    onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
                  />
                  {notifDropdownOpen && (
                    <NotificationDropdown
                      notifications={notifications}
                      onMarkRead={handleMarkRead}
                      onMarkAllRead={handleMarkAllRead}
                      onClose={() => setNotifDropdownOpen(false)}
                    />
                  )}
                </div>

                {/* Profile dropdown trigger */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 p-1 pl-2 pr-3 rounded-2xl bg-slate-800/80 border border-slate-700 hover:border-blue-500/50 transition-all"
                  >
                    <img
                      src={user.avatar || '/images/waris_profile.jpg'}
                      alt={user.name}
                      className="w-8 h-8 rounded-xl object-cover ring-2 ring-blue-500/60"
                      onError={(e) => {
                        e.target.src = '/images/waris_profile.jpg';
                      }}
                    />
                    <div className="text-left hidden md:block">
                      <p className="text-xs font-bold text-white leading-tight truncate max-w-[100px]">
                        {user.name.split(' ')[0]}
                      </p>
                      <span className="text-[10px] text-yellow-400 font-medium">
                        {user.role === 'admin' ? 'Founder / Admin' : user.role}
                      </span>
                    </div>
                  </button>

                  {/* Dropdown Menu */}
                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-3 w-56 rounded-2xl bg-[#1E293B] border border-slate-700 shadow-2xl shadow-black/80 p-2 z-50 animate-in fade-in zoom-in-95">
                      <div className="px-3 py-2 border-b border-slate-700/80 mb-1">
                        <p className="text-xs font-bold text-white">{user.name}</p>
                        <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
                      </div>

                      <Link
                        to="/dashboard"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                      >
                        <LayoutDashboard className="w-4 h-4 text-blue-400" />
                        <span>Dashboard</span>
                      </Link>

                      <Link
                        to="/freelancer-profile"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                      >
                        <User className="w-4 h-4 text-yellow-400" />
                        <span>Public Profile</span>
                      </Link>

                      <Link
                        to="/messages"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                      >
                        <MessageSquare className="w-4 h-4 text-cyan-400" />
                        <span>Messages</span>
                      </Link>

                      <Link
                        to="/projects"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                      >
                        <FolderKanban className="w-4 h-4 text-emerald-400" />
                        <span>My Projects</span>
                      </Link>

                      <Link
                        to="/settings"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                      >
                        <Settings className="w-4 h-4 text-purple-400" />
                        <span>Settings</span>
                      </Link>

                      {isAdmin && (
                        <Link
                          to="/admin"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-yellow-400 hover:bg-yellow-400/10 transition-colors"
                        >
                          <ShieldAlert className="w-4 h-4" />
                          <span>Admin Portal</span>
                        </Link>
                      )}

                      <div className="border-t border-slate-700/80 mt-1 pt-1">
                        <button
                          onClick={() => {
                            logout();
                            setUserDropdownOpen(false);
                            navigate('/login');
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-rose-400 hover:bg-rose-500/10 transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="btn-gold text-xs py-2 px-4 shadow-yellow-500/20"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <Link
              to="/post-job"
              className="btn-primary text-xs py-1.5 px-3 sm:hidden"
            >
              Post Job
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-800 bg-[#0B1120] px-4 pt-2 pb-6 space-y-2 animate-in slide-in-from-top-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2.5 rounded-xl text-sm font-medium ${
                isActive(link.path)
                  ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              {link.name}
            </Link>
          ))}
          {user && (
            <div className="pt-2 border-t border-slate-800 space-y-1">
              <Link
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2 text-sm text-slate-300"
              >
                Dashboard
              </Link>
              <Link
                to="/freelancer-profile"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2 text-sm text-slate-300"
              >
                My Profile
              </Link>
              <Link
                to="/messages"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2 text-sm text-slate-300"
              >
                Messages
              </Link>
              <Link
                to="/wallet"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2 text-sm text-yellow-400 font-semibold"
              >
                Wallet (${user.walletBalance ? user.walletBalance.toLocaleString() : '4,950'})
              </Link>
              {isAdmin && (
                <Link
                  to="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-2 text-sm text-yellow-400 font-bold"
                >
                  Admin Panel
                </Link>
              )}
              <button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-rose-400 font-medium"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
