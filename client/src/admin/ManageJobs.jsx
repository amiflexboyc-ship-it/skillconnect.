import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { api } from '../services/api';
import Loading from '../components/Loading';
import { Briefcase, Trash2, Flame, ExternalLink, CheckCircle2 } from 'lucide-react';

const ManageJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const res = await api.getJobs();
        if (res.success && res.jobs) {
          setJobs(res.jobs);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this job listing?')) return;
    try {
      await api.deleteJob(id);
      setJobs(prev => prev.filter(j => j._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const toggleFeatured = (id) => {
    setJobs(prev =>
      prev.map(j => (j._id === id ? { ...j, featured: !j.featured } : j))
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex gap-8">
        <Sidebar isAdminView={true} />

        <main className="flex-1 min-w-0 space-y-6">
          <div>
            <h1 className="text-2xl font-extrabold text-white">Moderate Jobs & Opportunities</h1>
            <p className="text-xs text-slate-400">
              Audit posted briefs, approve featured listings, or remove spam.
            </p>
          </div>

          {loading ? (
            <Loading text="Loading job listings..." />
          ) : (
            <div className="card-premium p-0 overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-700/80 bg-slate-900/60 text-slate-400 uppercase text-[10px] tracking-wider">
                    <th className="p-4 font-semibold">Job Title & Category</th>
                    <th className="p-4 font-semibold">Budget</th>
                    <th className="p-4 font-semibold">Client</th>
                    <th className="p-4 font-semibold">Proposals</th>
                    <th className="p-4 font-semibold text-right">Moderation Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {jobs.map((job) => (
                    <tr key={job._id} className="hover:bg-slate-900/40 transition-colors">
                      <td className="p-4 space-y-1">
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-white text-xs">{job.title}</p>
                          {job.featured && (
                            <span className="gold-badge text-[9px] py-0 px-1.5 flex items-center gap-1">
                              <Flame className="w-2.5 h-2.5" /> Featured
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                          {job.category}
                        </span>
                      </td>

                      <td className="p-4 font-bold text-yellow-400">
                        ${job.budget?.toLocaleString()}
                        <span className="text-[10px] font-normal text-slate-400"> ({job.budgetType})</span>
                      </td>

                      <td className="p-4">
                        <p className="text-white font-medium">{job.clientName}</p>
                        <p className="text-[10px] text-slate-500">{job.clientLocation}</p>
                      </td>

                      <td className="p-4 text-slate-300 font-semibold">
                        {job.proposalsCount} Applicants
                      </td>

                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => toggleFeatured(job._id)}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-colors ${
                            job.featured
                              ? 'bg-yellow-400/10 text-yellow-400 border-yellow-400/30'
                              : 'bg-slate-800 text-slate-400 border-slate-700'
                          }`}
                        >
                          {job.featured ? 'Featured' : 'Promote'}
                        </button>
                        <button
                          onClick={() => handleDelete(job._id)}
                          className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 transition-colors"
                          title="Delete Listing"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ManageJobs;
