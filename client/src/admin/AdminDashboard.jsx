import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { api } from '../services/api';
import {
  Users,
  Briefcase,
  DollarSign,
  TrendingUp,
  ShieldAlert,
  PhoneCall,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  ExternalLink,
} from 'lucide-react';

const AdminDashboard = () => {
  const [usersCount, setUsersCount] = useState(3);
  const [jobsCount, setJobsCount] = useState(4);
  const [contactMsgs, setContactMsgs] = useState([]);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const [uRes, jRes, cRes] = await Promise.all([
          api.getAdminAllUsers(),
          api.getJobs(),
          api.getContactMessages(),
        ]);
        if (uRes.success && uRes.users) setUsersCount(uRes.users.length);
        if (jRes.success && jRes.jobs) setJobsCount(jRes.jobs.length);
        if (cRes.success && cRes.messages) setContactMsgs(cRes.messages.slice(0, 3));
      } catch (err) {
        console.error(err);
      }
    };
    fetchAdminData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex gap-8">
        <Sidebar isAdminView={true} />

        <main className="flex-1 min-w-0 space-y-8">
          
          {/* Admin Header */}
          <div className="card-premium bg-gradient-to-r from-slate-900 via-[#1E293B] to-slate-900 border-yellow-400/40 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <img
                src="/images/waris_profile.jpg"
                alt="Waris"
                className="w-16 h-16 rounded-2xl object-cover ring-2 ring-yellow-400 shadow-xl"
              />
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-extrabold text-white">SkillConnect Admin Portal</h1>
                  <span className="gold-badge py-0.5 px-2 text-[10px]">Super Admin</span>
                </div>
                <p className="text-xs text-yellow-400 font-semibold">
                  Administrator: Waris (AmiFlexboy) • amiflexboyc@gmail.com • 09077108987
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link to="/admin/messages" className="btn-gold text-xs py-2 px-4 font-bold">
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Contact Inquiries</span>
              </Link>
            </div>
          </div>

          {/* Admin Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="card-premium p-5 space-y-2">
              <span className="text-xs text-slate-400 uppercase font-semibold">Total Verified Users</span>
              <p className="text-3xl font-black text-white">{usersCount * 450}+</p>
              <p className="text-[11px] text-emerald-400 font-semibold">+18% this month</p>
            </div>

            <div className="card-premium p-5 space-y-2">
              <span className="text-xs text-slate-400 uppercase font-semibold">Active Jobs</span>
              <p className="text-3xl font-black text-blue-400">{jobsCount * 28}+</p>
              <p className="text-[11px] text-blue-400 font-semibold">Across 8 categories</p>
            </div>

            <div className="card-premium p-5 space-y-2">
              <span className="text-xs text-slate-400 uppercase font-semibold">Escrow Volume</span>
              <p className="text-3xl font-black text-yellow-400">$528,000</p>
              <p className="text-[11px] text-yellow-400 font-semibold">100% Protected</p>
            </div>

            <div className="card-premium p-5 space-y-2">
              <span className="text-xs text-slate-400 uppercase font-semibold">Platform Net Fee</span>
              <p className="text-3xl font-black text-white">$52,800</p>
              <p className="text-[11px] text-emerald-400 font-semibold">10% Take rate</p>
            </div>
          </div>

          {/* Quick Shortcuts */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              to="/admin/users"
              className="card-premium p-4 hover:border-blue-500/50 flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Manage Users</h4>
                  <p className="text-[10px] text-slate-400">Ban, verify, or review profiles</p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-white" />
            </Link>

            <Link
              to="/admin/jobs"
              className="card-premium p-4 hover:border-blue-500/50 flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-yellow-400/10 text-yellow-400 group-hover:bg-yellow-400 group-hover:text-slate-950 transition-colors">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Manage Jobs</h4>
                  <p className="text-[10px] text-slate-400">Moderate & delete job listings</p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-white" />
            </Link>

            <Link
              to="/admin/messages"
              className="card-premium p-4 hover:border-blue-500/50 flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Contact Messages</h4>
                  <p className="text-[10px] text-slate-400">User & enterprise briefs</p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-white" />
            </Link>
          </div>

          {/* Recent Contact Submissions */}
          <div className="card-premium space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">Recent Inquiries to Waris</h3>
                <p className="text-xs text-slate-400">Messages sent via the Contact page</p>
              </div>
              <Link to="/admin/messages" className="text-xs font-semibold text-yellow-400 hover:underline">
                View All →
              </Link>
            </div>

            <div className="space-y-3">
              {contactMsgs.map((msg) => (
                <div key={msg._id} className="p-4 rounded-xl bg-slate-900/60 border border-slate-700/60 flex items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-bold text-white">{msg.name}</p>
                      <span className="text-[10px] text-blue-400">&lt;{msg.email}&gt;</span>
                    </div>
                    <p className="text-xs text-slate-300 font-semibold mt-0.5">{msg.subject}</p>
                    <p className="text-[11px] text-slate-400 line-clamp-1">{msg.message}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold capitalize shrink-0 ${
                    msg.status === 'unread' ? 'bg-yellow-400/10 text-yellow-400 border border-yellow-400/30' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {msg.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
