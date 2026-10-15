import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import Sidebar from '../components/Sidebar';
import {
  DollarSign,
  Briefcase,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  TrendingUp,
  MessageSquare,
  ShieldCheck,
  PlusCircle,
  ExternalLink,
  MessageCircle,
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.getProjects();
        if (res.success && res.projects) {
          setProjects(res.projects);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex gap-8">
        <Sidebar />

        <main className="flex-1 min-w-0 space-y-8">
          {/* Welcome Banner */}
          <div className="card-premium bg-gradient-to-r from-slate-900 via-[#1E293B] to-slate-900 border-blue-500/30 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <img
                src={user?.avatar || '/images/waris_profile.jpg'}
                alt={user?.name || 'User'}
                className="w-20 h-20 rounded-2xl object-cover ring-2 ring-yellow-400 shadow-xl"
                onError={(e) => {
                  e.target.src = '/images/waris_profile.jpg';
                }}
              />
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-extrabold text-white">
                    Welcome back, {user?.name || 'Waris'}!
                  </h1>
                  <span className="gold-badge py-0.5 px-2 text-[10px]">Top Rated</span>
                </div>
                <p className="text-xs text-blue-400 font-medium">
                  {user?.title || 'Full-Stack Developer & UI/UX Specialist'}
                </p>
                <div className="flex items-center gap-3 text-xs text-slate-400 pt-1">
                  <span>Ibadan, Nigeria</span>
                  <span>•</span>
                  <a
                    href="https://wa.me/2349077108987"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:underline flex items-center gap-1 font-semibold"
                  >
                    <MessageCircle className="w-3.5 h-3.5" /> 09077108987
                  </a>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link to="/post-job" className="btn-primary text-xs py-2.5 px-4">
                <PlusCircle className="w-4 h-4" />
                <span>Post Job</span>
              </Link>
              <Link to="/find-jobs" className="btn-secondary text-xs py-2.5 px-4">
                <span>Find Jobs</span>
              </Link>
            </div>
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="card-premium p-5 space-y-2 border-yellow-400/20">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-semibold uppercase tracking-wider">Wallet Balance</span>
                <div className="p-2 rounded-xl bg-yellow-400/10 text-yellow-400">
                  <DollarSign className="w-4 h-4" />
                </div>
              </div>
              <p className="text-2xl font-black text-yellow-400">
                ${user?.walletBalance ? user.walletBalance.toLocaleString() : '4,950.00'}
              </p>
              <Link to="/wallet" className="text-[11px] font-semibold text-blue-400 hover:underline flex items-center gap-1 pt-1">
                Withdraw or view history →
              </Link>
            </div>

            <div className="card-premium p-5 space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-semibold uppercase tracking-wider">Active Projects</span>
                <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
                  <Briefcase className="w-4 h-4" />
                </div>
              </div>
              <p className="text-2xl font-black text-white">2 Ongoing</p>
              <p className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1 pt-1">
                <TrendingUp className="w-3 h-3" /> Milestones on track
              </p>
            </div>

            <div className="card-premium p-5 space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-semibold uppercase tracking-wider">Completed Jobs</span>
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              </div>
              <p className="text-2xl font-black text-white">56 Delivered</p>
              <p className="text-[11px] text-yellow-400 font-semibold pt-1">
                100% Job Success Rate
              </p>
            </div>

            <div className="card-premium p-5 space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-semibold uppercase tracking-wider">Direct WhatsApp</span>
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                  <MessageCircle className="w-4 h-4" />
                </div>
              </div>
              <p className="text-xl font-bold text-white">09077108987</p>
              <a
                href="https://wa.me/2349077108987"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-semibold text-emerald-400 hover:underline pt-1 inline-block"
              >
                Open chat link →
              </a>
            </div>
          </div>

          {/* Active Projects Tracker */}
          <div className="card-premium space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">Current Contracts & Milestones</h3>
                <p className="text-xs text-slate-400">Track real-time progress and milestone payouts</p>
              </div>
              <Link to="/projects" className="text-xs font-semibold text-yellow-400 hover:text-yellow-300">
                View All Projects →
              </Link>
            </div>

            <div className="space-y-4">
              {projects.slice(0, 3).map((proj) => (
                <div
                  key={proj._id}
                  className="p-5 rounded-2xl bg-slate-900/60 border border-slate-700/70 space-y-3 hover:border-slate-600 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h4 className="font-bold text-white text-sm">{proj.title}</h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Client: <span className="text-slate-300">{proj.clientName}</span> • Freelancer: <span className="text-blue-400 font-medium">{proj.freelancerName}</span>
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-base font-extrabold text-yellow-400">
                        ${proj.amount.toLocaleString()}
                      </span>
                      <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold capitalize ${
                        proj.status === 'completed'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                          : 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                      }`}>
                        {proj.status}
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs text-slate-400">
                      <span>Delivery Progress</span>
                      <span className="font-bold text-white">{proj.progress}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-yellow-400 transition-all duration-500"
                        style={{ width: `${proj.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Support & Contact Info */}
          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center md:text-left">
              <h4 className="text-sm font-bold text-white">Need custom enterprise assistance or API access?</h4>
              <p className="text-xs text-slate-400">
                Direct inquiries to Waris (AmiFlexboy) at <span className="text-blue-400">amiflexboyc@gmail.com</span> or WhatsApp <span className="text-emerald-400">09077108987</span>.
              </p>
            </div>
            <Link to="/contact" className="btn-primary text-xs py-2.5 px-5 shrink-0">
              <span>Contact Support</span>
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
