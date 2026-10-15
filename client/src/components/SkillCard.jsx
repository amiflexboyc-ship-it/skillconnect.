import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const SkillCard = ({ title, count, avgRate, icon: Icon, description, linkTo = '/find-jobs' }) => {
  return (
    <Link
      to={linkTo}
      className="card-premium group relative overflow-hidden flex flex-col justify-between hover:-translate-y-1 transition-all duration-300"
    >
      <div className="flex items-start justify-between">
        <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300 shadow-lg shadow-blue-500/10">
          {Icon ? <Icon className="w-6 h-6" /> : null}
        </div>
        <div className="p-2 rounded-xl bg-slate-800/80 text-slate-400 group-hover:text-yellow-400 group-hover:bg-yellow-400/10 transition-colors">
          <ArrowUpRight className="w-4 h-4" />
        </div>
      </div>

      <div className="mt-5">
        <h4 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors">
          {title}
        </h4>
        <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
          {description}
        </p>
      </div>

      <div className="mt-5 pt-3 border-t border-slate-700/60 flex items-center justify-between text-xs">
        <span className="text-slate-400 font-medium">{count} Active Jobs</span>
        <span className="text-yellow-400 font-bold">{avgRate}</span>
      </div>
    </Link>
  );
};

export default SkillCard;
