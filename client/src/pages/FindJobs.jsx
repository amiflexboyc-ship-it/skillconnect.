import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api } from '../services/api';
import JobCard from '../components/JobCard';
import Loading from '../components/Loading';
import SearchBar from '../components/SearchBar';
import { Briefcase, Filter, CheckCircle2, X, DollarSign, Clock, Sparkles } from 'lucide-react';

const FindJobs = () => {
  const [searchParams] = useSearchParams();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState(searchParams.get('category') || 'All');
  const [experienceLevel, setExperienceLevel] = useState('All');
  const [budgetType, setBudgetType] = useState('All');

  // Proposal modal
  const [selectedJob, setSelectedJob] = useState(null);
  const [bidAmount, setBidAmount] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [applySuccess, setApplySuccess] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const params = {};
        if (search) params.search = search;
        if (category !== 'All') params.category = category;
        if (experienceLevel !== 'All') params.experienceLevel = experienceLevel;
        if (budgetType !== 'All') params.budgetType = budgetType;
        const res = await api.getJobs(params);
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
  }, [search, category, experienceLevel, budgetType]);

  const handleApplyClick = (job) => {
    setSelectedJob(job);
    setBidAmount(job.budget || 2000);
    setCoverLetter(`Hi ${job.clientName || 'there'},\n\nI reviewed your requirements for "${job.title}" and I am confident I can deliver this with modern architecture, high performance, and clean code.`);
  };

  const handleProposalSubmit = (e) => {
    e.preventDefault();
    setApplySuccess(true);
    setTimeout(() => {
      setApplySuccess(false);
      setSelectedJob(null);
    }, 2000);
  };

  const categories = ['All', 'Web Development', 'UI/UX Design', 'Mobile App', 'E-Commerce', 'Backend Development'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-white">Explore Available Jobs & Contracts</h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Discover high-paying client contracts, submit proposals, and get hired with escrow protection.
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat, i) => (
          <button
            key={i}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              category === cat
                ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25 border border-blue-400/40'
                : 'bg-slate-800/80 text-slate-300 hover:text-white border border-slate-700/60'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Search Bar & Secondary Filters */}
      <div className="card-premium p-4 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        <div className="flex-1">
          <SearchBar
            initialValue={search}
            placeholder="Search by keywords, tech stack, or job title..."
            showFilters={false}
            onSearch={({ search: s }) => setSearch(s)}
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={experienceLevel}
            onChange={(e) => setExperienceLevel(e.target.value)}
            className="bg-slate-900 border border-slate-700 text-xs text-slate-300 rounded-xl px-3 py-2.5 focus:outline-none focus:border-blue-500"
          >
            <option value="All">All Levels</option>
            <option value="Entry Level">Entry Level</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Expert">Expert</option>
          </select>

          <select
            value={budgetType}
            onChange={(e) => setBudgetType(e.target.value)}
            className="bg-slate-900 border border-slate-700 text-xs text-slate-300 rounded-xl px-3 py-2.5 focus:outline-none focus:border-blue-500"
          >
            <option value="All">All Rates</option>
            <option value="fixed">Fixed Price</option>
            <option value="hourly">Hourly Rate</option>
          </select>
        </div>
      </div>

      {/* Job Cards List */}
      {loading ? (
        <Loading text="Loading available jobs..." />
      ) : jobs.length === 0 ? (
        <div className="card-premium py-16 text-center space-y-3">
          <Briefcase className="w-12 h-12 text-slate-500 mx-auto" />
          <p className="text-slate-300 font-bold text-sm">No jobs match your current filter settings.</p>
          <button
            onClick={() => {
              setSearch('');
              setCategory('All');
              setExperienceLevel('All');
              setBudgetType('All');
            }}
            className="btn-secondary text-xs py-2 px-4"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobs.map((job) => (
            <JobCard key={job._id} job={job} onApply={handleApplyClick} />
          ))}
        </div>
      )}

      {/* Proposal Submission Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="max-w-lg w-full card-premium border-blue-500/50 p-6 space-y-5 relative">
            <button
              onClick={() => setSelectedJob(null)}
              className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {applySuccess ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">Proposal Successfully Submitted!</h3>
                <p className="text-xs text-slate-400">
                  {selectedJob.clientName} has been alerted and can message or hire you immediately.
                </p>
              </div>
            ) : (
              <form onSubmit={handleProposalSubmit} className="space-y-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400">Submit Proposal</span>
                  <h3 className="text-base font-bold text-white leading-snug mt-1">{selectedJob.title}</h3>
                  <p className="text-xs text-yellow-400 font-semibold mt-0.5">Client Budget: ${selectedJob.budget.toLocaleString()}</p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Your Bid Amount ($ USD)
                  </label>
                  <input
                    type="number"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Cover Letter & Pitch
                  </label>
                  <textarea
                    rows={4}
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 leading-relaxed"
                  ></textarea>
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedJob(null)}
                    className="btn-secondary text-xs py-2 px-4"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary text-xs py-2 px-5 font-bold"
                  >
                    Send Proposal Now
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FindJobs;
