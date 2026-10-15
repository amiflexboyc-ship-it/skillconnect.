import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api } from '../services/api';
import FreelancerCard from '../components/FreelancerCard';
import Loading from '../components/Loading';
import { Search, Filter, SlidersHorizontal, Star, ShieldCheck, X, CheckCircle2 } from 'lucide-react';

const Freelancers = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [freelancers, setFreelancers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [selectedSkill, setSelectedSkill] = useState(searchParams.get('skill') || 'All');
  const [minRating, setMinRating] = useState('All');
  const [maxRate, setMaxRate] = useState(150);
  const [hireModalFreelancer, setHireModalFreelancer] = useState(null);
  const [projectTitle, setProjectTitle] = useState('');
  const [projectBudget, setProjectBudget] = useState(1500);
  const [hireSuccess, setHireSuccess] = useState(false);

  useEffect(() => {
    const fetchFreelancers = async () => {
      setLoading(true);
      try {
        const params = {};
        if (search) params.search = search;
        if (selectedSkill !== 'All') params.skill = selectedSkill;
        const res = await api.getFreelancers(params);
        if (res.success && res.freelancers) {
          setFreelancers(res.freelancers);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchFreelancers();
  }, [search, selectedSkill]);

  const handleHireSubmit = async (e) => {
    e.preventDefault();
    if (!hireModalFreelancer) return;
    try {
      await api.createProject({
        title: projectTitle || `Contract with ${hireModalFreelancer.name}`,
        freelancerName: hireModalFreelancer.name,
        amount: Number(projectBudget),
      });
      setHireSuccess(true);
      setTimeout(() => {
        setHireSuccess(false);
        setHireModalFreelancer(null);
      }, 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const skillsList = ['All', 'React', 'Node.js', 'MongoDB', 'Tailwind CSS', 'Figma', 'TypeScript', 'Next.js', 'UI/UX'];

  const filteredFreelancers = freelancers.filter((f) => {
    const rate = f.hourlyRate || 45;
    if (rate > maxRate) return false;
    if (minRating !== 'All' && (f.rating || 4.5) < Number(minRating)) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-white">Top Freelancers & Engineers</h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Collaborate with pre-vetted specialists rated 4.8+ with verified portfolios and direct WhatsApp contact.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="card-premium p-4 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        <div className="flex-1 relative">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search freelancers by name, skill, or keyword..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Skill Filter */}
          <select
            value={selectedSkill}
            onChange={(e) => setSelectedSkill(e.target.value)}
            className="bg-slate-900 border border-slate-700 text-xs text-slate-300 rounded-xl px-3 py-2.5 focus:outline-none focus:border-blue-500"
          >
            {skillsList.map((s, i) => (
              <option key={i} value={s}>{s === 'All' ? 'All Skills' : s}</option>
            ))}
          </select>

          {/* Rating filter */}
          <select
            value={minRating}
            onChange={(e) => setMinRating(e.target.value)}
            className="bg-slate-900 border border-slate-700 text-xs text-slate-300 rounded-xl px-3 py-2.5 focus:outline-none focus:border-blue-500"
          >
            <option value="All">All Ratings</option>
            <option value="4.8">4.8+ Stars</option>
            <option value="4.9">4.9+ Stars</option>
            <option value="5.0">5.0 Stars Only</option>
          </select>

          {/* Max Rate slider */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-300">
            <span>Rate: &lt; ${maxRate}/hr</span>
            <input
              type="range"
              min="20"
              max="150"
              step="5"
              value={maxRate}
              onChange={(e) => setMaxRate(Number(e.target.value))}
              className="w-20 accent-blue-500 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Freelancers Grid */}
      {loading ? (
        <Loading text="Finding top verified freelancers..." />
      ) : filteredFreelancers.length === 0 ? (
        <div className="card-premium py-16 text-center space-y-3">
          <p className="text-slate-400 text-sm">No freelancers found matching your criteria.</p>
          <button
            onClick={() => {
              setSearch('');
              setSelectedSkill('All');
              setMinRating('All');
              setMaxRate(150);
            }}
            className="btn-secondary text-xs py-2 px-4"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFreelancers.map((f) => (
            <FreelancerCard
              key={f._id}
              freelancer={f}
              onHire={(target) => setHireModalFreelancer(target)}
            />
          ))}
        </div>
      )}

      {/* Hire Modal */}
      {hireModalFreelancer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="max-w-md w-full card-premium border-blue-500/50 space-y-5 p-6 relative">
            <button
              onClick={() => setHireModalFreelancer(null)}
              className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {hireSuccess ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">Proposal & Contract Sent!</h3>
                <p className="text-xs text-slate-400">
                  {hireModalFreelancer.name} has been notified. Check your Projects workspace.
                </p>
              </div>
            ) : (
              <form onSubmit={handleHireSubmit} className="space-y-4">
                <div className="flex items-center gap-3">
                  <img
                    src={hireModalFreelancer.avatar || '/images/waris_profile.jpg'}
                    alt={hireModalFreelancer.name}
                    className="w-12 h-12 rounded-xl object-cover ring-2 ring-yellow-400"
                  />
                  <div>
                    <h3 className="text-base font-bold text-white">Hire {hireModalFreelancer.name}</h3>
                    <p className="text-xs text-yellow-400 font-semibold">${hireModalFreelancer.hourlyRate || 65}/hr</p>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Project / Milestone Title
                  </label>
                  <input
                    type="text"
                    value={projectTitle}
                    onChange={(e) => setProjectTitle(e.target.value)}
                    placeholder="e.g. Next.js App Frontend Development"
                    required
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Escrow Contract Budget ($)
                  </label>
                  <input
                    type="number"
                    value={projectBudget}
                    onChange={(e) => setProjectBudget(e.target.value)}
                    required
                    min="50"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setHireModalFreelancer(null)}
                    className="btn-secondary text-xs py-2 px-4"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-gold text-xs py-2 px-5 font-bold"
                  >
                    Send Offer & Escrow
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

export default Freelancers;
