import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DollarSign, Clock, MapPin, Bookmark, CheckCircle2, ArrowUpRight, Flame } from 'lucide-react';

const JobCard = ({ job, onApply }) => {
  const [bookmarked, setBookmarked] = useState(false);

  const {
    _id,
    title,
    description,
    category,
    skillsRequired = [],
    budgetType = 'fixed',
    budget = 1000,
    budgetMax,
    experienceLevel = 'Expert',
    duration = '1-3 months',
    clientName = 'Enterprise Partner',
    clientLocation = 'Global',
    proposalsCount = 0,
    featured = false,
    createdAt,
  } = job;

  const formatBudget = () => {
    if (budgetType === 'hourly') {
      return `$${budget}${budgetMax ? ` - $${budgetMax}` : ''}/hr`;
    }
    return `$${budget.toLocaleString()}${budgetMax ? ` - $${budgetMax.toLocaleString()}` : ''}`;
  };

  const getTimeAgo = () => {
    if (!createdAt) return 'Recently';
    const diff = Math.floor((new Date() - new Date(createdAt)) / (1000 * 60 * 60));
    if (diff < 1) return 'Just now';
    if (diff === 1) return '1 hour ago';
    if (diff < 24) return `${diff} hours ago`;
    const days = Math.floor(diff / 24);
    return `${days} ${days === 1 ? 'day' : 'days'} ago`;
  };

  return (
    <div className={`card-premium relative group flex flex-col justify-between transition-all duration-300 ${
      featured ? 'border-blue-500/40 bg-gradient-to-b from-slate-850 to-[#1E293B]' : ''
    }`}>
      <div>
        {/* Header Badges */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
              {category}
            </span>
            <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700/60">
              {experienceLevel}
            </span>
            {featured && (
              <span className="gold-badge py-0.5 px-2 flex items-center gap-1">
                <Flame className="w-3 h-3 text-yellow-400" /> Featured
              </span>
            )}
          </div>

          <button
            onClick={() => setBookmarked(!bookmarked)}
            aria-label="Bookmark job"
            className={`p-2 rounded-xl border transition-colors ${
              bookmarked
                ? 'bg-yellow-400/10 text-yellow-400 border-yellow-400/30'
                : 'bg-slate-800/80 text-slate-400 hover:text-white border-slate-700/60'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-yellow-400' : ''}`} />
          </button>
        </div>

        {/* Title */}
        <h3 className="mt-3 text-lg font-bold text-white group-hover:text-blue-400 transition-colors leading-snug">
          <Link to={`/jobs/${_id}`}>{title}</Link>
        </h3>

        {/* Budget & Meta */}
        <div className="mt-2 flex items-center gap-4 text-xs">
          <span className="font-bold text-yellow-400 text-base">
            {formatBudget()}
          </span>
          <span className="text-slate-400 capitalize flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-500" /> {duration}
          </span>
          <span className="text-slate-400 hidden sm:flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-slate-500" /> {clientLocation}
          </span>
        </div>

        {/* Description snippet */}
        <p className="mt-3 text-xs text-slate-300 leading-relaxed line-clamp-3">
          {description}
        </p>

        {/* Skills required */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {skillsRequired.map((skill, index) => (
            <span
              key={index}
              className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-slate-800 text-slate-300 border border-slate-700/50"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-slate-700/60 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-3">
          <span>Posted {getTimeAgo()}</span>
          <span>•</span>
          <span className="text-slate-300 font-medium">{proposalsCount} Proposals</span>
        </div>

        <button
          onClick={() => onApply ? onApply(job) : null}
          className="btn-primary py-2 px-4 text-xs font-semibold"
        >
          <span>Apply Now</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

export default JobCard;
