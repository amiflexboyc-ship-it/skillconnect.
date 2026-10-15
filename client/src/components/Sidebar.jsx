import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  Briefcase,
  FolderKanban,
  MessageSquare,
  Wallet,
  Bell,
  Settings,
  ShieldAlert,
  Users,
  BarChart3,
  PhoneCall,
  UserCheck,
} from 'lucide-react';

const Sidebar = ({ isAdminView = false }) => {
  const { user, isAdmin } = useAuth();

  const userLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'My Projects', path: '/projects', icon: FolderKanban, badge: '2' },
    { name: 'Find Jobs', path: '/find-jobs', icon: Briefcase },
    { name: 'Messages', path: '/messages', icon: MessageSquare, badge: '1' },
    { name: 'Wallet & Payouts', path: '/wallet', icon: Wallet },
    { name: 'Notifications', path: '/notifications', icon: Bell },
    { name: 'Profile', path: '/freelancer-profile', icon: UserCheck },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  const adminLinks = [
    { name: 'Admin Overview', path: '/admin', icon: LayoutDashboard },
    { name: 'Manage Users', path: '/admin/users', icon: Users },
    { name: 'Manage Jobs', path: '/admin/jobs', icon: Briefcase },
    { name: 'Contact Inquiries', path: '/admin/messages', icon: PhoneCall, badge: 'New' },
    { name: 'Platform Analytics', path: '/admin/analytics', icon: BarChart3 },
    { name: 'Dispute Reports', path: '/admin/reports', icon: ShieldAlert },
    { name: 'System Alerts', path: '/admin/notifications', icon: Bell },
  ];

  const links = isAdminView ? adminLinks : userLinks;

  return (
    <aside className="w-64 shrink-0 hidden md:block">
      <div className="card-premium sticky top-28 p-4 flex flex-col justify-between h-[calc(100vh-140px)]">
        <div>
          <div className="px-3 py-2 mb-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              {isAdminView ? 'Administration' : 'Menu Navigation'}
            </span>
          </div>

          <nav className="space-y-1">
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.path === '/admin' || link.path === '/dashboard'}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                      isActive
                        ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30 shadow-sm'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                    }`
                  }
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{link.name}</span>
                  </div>
                  {link.badge && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500 text-white">
                      {link.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* User Card in Sidebar */}
        <div className="pt-4 border-t border-slate-700/60">
          <div className="flex items-center gap-3 p-2 rounded-xl bg-slate-850/60 border border-slate-700/40">
            <img
              src={user?.avatar || '/images/waris_profile.jpg'}
              alt={user?.name || 'User'}
              className="w-10 h-10 rounded-xl object-cover ring-2 ring-yellow-400/40"
              onError={(e) => {
                e.target.src = '/images/waris_profile.jpg';
              }}
            />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-white truncate">
                {user?.name || 'Waris (AmiFlexboy)'}
              </p>
              <p className="text-[11px] text-yellow-400 font-medium truncate">
                {user?.whatsapp || '09077108987'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
