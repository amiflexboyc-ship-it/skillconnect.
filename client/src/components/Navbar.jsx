import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  ChevronDown,
  Globe,
  Menu,
  X,
  User,
  LayoutDashboard,
  LogOut,
  Sparkles,
} from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { name: 'Find Jobs', path: '/find-jobs', hasDropdown: true },
    { name: 'Freelancers', path: '/freelancers', hasDropdown: true },
    { name: 'Explore Skills', path: '/explore-skills', hasDropdown: true },
    { name: 'Pricing', path: '/explore-skills', hasDropdown: false },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-6 pointer-events-none">
      <div className="max-w-5xl mx-auto bg-[#FAF7F2] text-slate-900 rounded-full px-5 sm:px-7 py-2.5 shadow-2xl shadow-black/40 border border-[#E8E2D8] flex items-center justify-between pointer-events-auto backdrop-blur-md transition-all">
        
        {/* Left: Brand with Sunburst Logo */}
        <Link to="/" className="flex items-center gap-2.5 group shrink-0">
          {/* Radiant Sunburst Emblem matching image */}
          <div className="w-7 h-7 flex items-center justify-center text-slate-950 group-hover:rotate-45 transition-transform duration-500">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round">
              <circle cx="12" cy="12" r="3" fill="currentColor" />
              <line x1="12" y1="2" x2="12" y2="5" />
              <line x1="12" y1="19" x2="12" y2="22" />
              <line x1="2" y1="12" x2="5" y2="12" />
              <line x1="19" y1="12" x2="22" y2="12" />
              <line x1="4.93" y1="4.93" x2="7.05" y2="7.05" />
              <line x1="16.95" y1="16.95" x2="19.07" y2="19.07" />
              <line x1="4.93" y1="19.07" x2="7.05" y2="16.95" />
              <line x1="16.95" y1="7.05" x2="19.07" y2="4.93" />
            </svg>
          </div>
          <span className="text-base sm:text-lg font-bold tracking-tight text-slate-950">
            SkillConnect
          </span>
        </Link>

        {/* Center: Navigation Links with subtle Chevrons */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-xs font-semibold flex items-center gap-1 transition-colors group ${
                isActive(link.path)
                  ? 'text-slate-950 font-bold'
                  : 'text-slate-600 hover:text-slate-950'
              }`}
            >
              <span>{link.name}</span>
              {link.hasDropdown && (
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-700 transition-transform group-hover:translate-y-0.5" />
              )}
            </Link>
          ))}
        </nav>

        {/* Right: Globe, Divider, Log In, and Get Started Pill */}
        <div className="hidden sm:flex items-center gap-4">
          {/* Globe language selector */}
          <button
            type="button"
            className="text-slate-700 hover:text-black transition-colors p-1"
            title="Global Region"
          >
            <Globe className="w-4 h-4" />
          </button>

          {/* Vertical Divider */}
          <span className="h-4 w-px bg-slate-300"></span>

          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 p-1 pl-2 pr-3 rounded-full bg-slate-200/80 hover:bg-slate-300/80 text-slate-900 transition-colors"
              >
                <img
                  src={user.avatar || '/images/waris_profile.jpg'}
                  alt={user.name}
                  className="w-6 h-6 rounded-full object-cover ring-1 ring-slate-400"
                  onError={(e) => {
                    e.target.src = '/images/waris_profile.jpg';
                  }}
                />
                <span className="text-xs font-bold truncate max-w-[80px]">
                  {user.name.split(' ')[0]}
                </span>
                <ChevronDown className="w-3 h-3 text-slate-600" />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-3 w-48 rounded-2xl bg-white border border-slate-200 shadow-xl p-2 z-50 text-slate-900 animate-in fade-in">
                  <div className="px-3 py-2 border-b border-slate-100">
                    <p className="text-xs font-bold text-slate-900">{user.name}</p>
                    <p className="text-[10px] text-slate-500 truncate">{user.email}</p>
                  </div>
                  <Link
                    to="/dashboard"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-100 transition-colors"
                  >
                    <LayoutDashboard className="w-3.5 h-3.5" />
                    <span>Dashboard</span>
                  </Link>
                  <Link
                    to="/freelancer-profile"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-100 transition-colors"
                  >
                    <User className="w-3.5 h-3.5" />
                    <span>My Profile</span>
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setUserDropdownOpen(false);
                      navigate('/login');
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-rose-600 hover:bg-rose-50 transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link
                to="/login"
                className="text-xs font-semibold text-slate-700 hover:text-black transition-colors"
              >
                Log In
              </Link>
              <Link
                to="/register"
                className="px-5 py-2 rounded-full bg-slate-950 text-white font-semibold text-xs hover:bg-slate-800 active:scale-95 transition-all shadow-md shadow-black/20"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation"
            className="p-1.5 rounded-full text-slate-800 hover:bg-slate-200 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden max-w-5xl mx-auto mt-2 bg-[#FAF7F2] text-slate-900 rounded-3xl p-5 shadow-2xl border border-[#E8E2D8] pointer-events-auto space-y-3 animate-in fade-in">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-xs font-semibold text-slate-700 hover:text-black py-2 px-3 rounded-xl hover:bg-slate-100"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
            {user ? (
              <div className="flex items-center justify-between w-full">
                <Link
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xs font-bold text-slate-900"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="text-xs text-rose-600 font-semibold"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3 w-full">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 text-center py-2 text-xs font-semibold text-slate-800 rounded-full border border-slate-300"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 text-center py-2 text-xs font-semibold text-white bg-slate-950 rounded-full"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
