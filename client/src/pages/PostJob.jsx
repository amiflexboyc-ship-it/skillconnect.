import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import {
  Briefcase,
  DollarSign,
  Clock,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Layers,
  HelpCircle,
} from 'lucide-react';

const PostJob = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    category: 'Web Development',
    description: '',
    skillsRequired: 'React, Node.js, Tailwind CSS',
    budgetType: 'fixed',
    budget: 2500,
    budgetMax: 3500,
    experienceLevel: 'Expert',
    duration: '1-3 months',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const skillsArray = formData.skillsRequired
        ? formData.skillsRequired.split(',').map((s) => s.trim()).filter(Boolean)
        : ['Web Development'];

      const res = await api.createJob({
        ...formData,
        skillsRequired: skillsArray,
        budget: Number(formData.budget),
        budgetMax: formData.budgetMax ? Number(formData.budgetMax) : Number(formData.budget) * 1.3,
      });

      if (res.success) {
        setSuccess(true);
        setTimeout(() => {
          navigate('/find-jobs');
        }, 1500);
      } else {
        setError(res.message || 'Failed to post job');
      }
    } catch (err) {
      setError(err.message || 'Error posting job');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-400">
          <Sparkles className="w-3.5 h-3.5 text-yellow-400" /> Fast-Track Client Hiring
        </div>
        <h1 className="text-3xl font-extrabold text-white">Post a New Project or Job</h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Reach thousands of top-rated developers, designers, and tech experts worldwide.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Main Form */}
        <div className="lg:col-span-8 card-premium">
          {error && (
            <div className="mb-6 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" /> Job successfully posted! Redirecting to jobs feed...
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Job Title */}
            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                Job Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Senior React & Node.js Architect for FinTech Platform"
                required
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Category & Experience */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="Web Development">Web Development</option>
                  <option value="UI/UX Design">UI/UX Design</option>
                  <option value="Mobile App">Mobile App</option>
                  <option value="E-Commerce">E-Commerce</option>
                  <option value="Backend Development">Backend Development</option>
                  <option value="AI">AI & Machine Learning</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                  Experience Level
                </label>
                <select
                  name="experienceLevel"
                  value={formData.experienceLevel}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="Entry Level">Entry Level</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Expert">Expert</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                Project Scope & Deliverables
              </label>
              <textarea
                name="description"
                rows={5}
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your requirements, deliverables, milestones, tech stack, and ideal timeline..."
                required
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 leading-relaxed"
              ></textarea>
            </div>

            {/* Skills Required */}
            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                Required Skills & Technologies (comma separated)
              </label>
              <input
                type="text"
                name="skillsRequired"
                value={formData.skillsRequired}
                onChange={handleChange}
                placeholder="React, Node.js, Tailwind CSS, MongoDB"
                required
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Budget Section */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-700/80 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-yellow-400">
                  Budget & Payment Structure
                </span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, budgetType: 'fixed' })}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                      formData.budgetType === 'fixed'
                        ? 'bg-blue-500 text-white'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    Fixed Price
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, budgetType: 'hourly' })}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                      formData.budgetType === 'hourly'
                        ? 'bg-blue-500 text-white'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    Hourly Rate
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-300 mb-1">
                    {formData.budgetType === 'fixed' ? 'Fixed Budget ($ USD)' : 'Hourly Rate ($/hr)'}
                  </label>
                  <input
                    type="number"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    min="10"
                    required
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-300 mb-1">
                    Estimated Duration
                  </label>
                  <select
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="Less than 1 month">Less than 1 month</option>
                    <option value="1-3 months">1-3 months</option>
                    <option value="3-6 months">3-6 months</option>
                    <option value="Ongoing">Ongoing / Full-Time</option>
                  </select>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-gold py-3 text-sm font-bold shadow-yellow-500/25"
            >
              {loading ? 'Publishing Opportunity...' : 'Post Job & Find Talent Now'}
            </button>
          </form>
        </div>

        {/* Live Preview Sidebar */}
        <div className="lg:col-span-4 space-y-4">
          <div className="card-premium space-y-4 sticky top-28">
            <div className="flex items-center justify-between pb-2 border-b border-slate-700">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Live Preview</span>
              <span className="text-[10px] text-blue-400 font-semibold">How freelancers see this</span>
            </div>

            <div className="space-y-2">
              <div className="flex gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  {formData.category}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-300">
                  {formData.experienceLevel}
                </span>
              </div>

              <h4 className="text-sm font-bold text-white leading-snug">
                {formData.title || 'Untitled Project Opportunity'}
              </h4>

              <p className="text-base font-extrabold text-yellow-400">
                {formData.budgetType === 'hourly'
                  ? `$${formData.budget}/hr`
                  : `$${Number(formData.budget || 0).toLocaleString()}`}
              </p>

              <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                {formData.description || 'Provide detailed specifications to attract top applicants.'}
              </p>

              <div className="pt-2 flex flex-wrap gap-1">
                {(formData.skillsRequired || 'React, Node.js').split(',').map((s, i) => (
                  <span key={i} className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300 border border-slate-700/60">
                    {s.trim()}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-700/60 text-[11px] text-slate-400 space-y-1">
              <p>100% Escrow Protection Guaranteed</p>
              <p>Instant candidate alerts</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PostJob;
