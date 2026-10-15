import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import Loading from '../components/Loading';
import {
  FolderKanban,
  CheckCircle2,
  Clock,
  DollarSign,
  PlusCircle,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Send,
} from 'lucide-react';

const Projects = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all'); // all, active, completed

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
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

  const handleReleaseMilestone = (projId, milestoneId) => {
    setProjects(prev =>
      prev.map(p => {
        if (p._id === projId && p.milestones) {
          const updatedMilestones = p.milestones.map(m =>
            m.id === milestoneId ? { ...m, status: 'paid' } : m
          );
          const allPaid = updatedMilestones.every(m => m.status === 'paid');
          return {
            ...p,
            milestones: updatedMilestones,
            progress: allPaid ? 100 : Math.min(100, p.progress + 30),
            status: allPaid ? 'completed' : p.status,
          };
        }
        return p;
      })
    );
  };

  const filtered = projects.filter(p => {
    if (activeTab === 'active') return p.status === 'active';
    if (activeTab === 'completed') return p.status === 'completed';
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex gap-8">
        <Sidebar />

        <main className="flex-1 min-w-0 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-extrabold text-white">Project Workspaces & Escrow</h1>
              <p className="text-xs text-slate-400">
                Track deliverables, code submissions, and release milestone funds safely.
              </p>
            </div>

            <div className="flex items-center gap-2">
              {['all', 'active', 'completed'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-colors ${
                    activeTab === tab
                      ? 'bg-blue-500 text-white'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <Loading text="Loading active contracts..." />
          ) : filtered.length === 0 ? (
            <div className="card-premium py-16 text-center space-y-3">
              <FolderKanban className="w-12 h-12 text-slate-500 mx-auto" />
              <p className="text-slate-400 text-sm">No projects currently under this status.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {filtered.map((proj) => (
                <div key={proj._id} className="card-premium space-y-5 border-slate-700/80">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-700/60">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">
                          Milestone Escrow Contract
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold capitalize ${
                          proj.status === 'completed'
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : 'bg-yellow-400/20 text-yellow-400'
                        }`}>
                          {proj.status}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-white mt-1.5">{proj.title}</h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Client: <span className="text-slate-200 font-medium">{proj.clientName}</span> • Freelancer: <span className="text-blue-400 font-semibold">{proj.freelancerName}</span>
                      </p>
                    </div>

                    <div className="text-left sm:text-right">
                      <span className="text-xs text-slate-400">Total Contract Value</span>
                      <p className="text-2xl font-black text-yellow-400">
                        ${proj.amount.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs text-slate-400">
                      <span>Milestone Completion</span>
                      <span className="font-bold text-white">{proj.progress}% Completed</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-yellow-400 transition-all duration-500"
                        style={{ width: `${proj.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Milestones list */}
                  <div className="space-y-3 pt-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Contract Milestones ({proj.milestones?.length || 0})
                    </h4>

                    <div className="grid grid-cols-1 gap-2.5">
                      {proj.milestones?.map((m) => (
                        <div
                          key={m.id}
                          className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                        >
                          <div className="flex items-center gap-3">
                            <div className={`p-1.5 rounded-lg ${
                              m.status === 'paid' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-yellow-400'
                            }`}>
                              <CheckCircle2 className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="text-xs font-bold text-white">{m.title}</p>
                              <p className="text-[11px] text-yellow-400 font-semibold">${m.amount.toLocaleString()} Escrow Secured</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold capitalize ${
                              m.status === 'paid'
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                                : 'bg-yellow-400/10 text-yellow-400 border border-yellow-400/30'
                            }`}>
                              {m.status}
                            </span>

                            {m.status !== 'paid' && (
                              <button
                                onClick={() => handleReleaseMilestone(proj._id, m.id)}
                                className="btn-gold text-[11px] py-1.5 px-3 font-bold"
                              >
                                Approve & Release ${m.amount}
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Projects;
