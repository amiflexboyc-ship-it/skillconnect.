import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShieldCheck, Crown, MessageCircle, ArrowRight, MapPin } from 'lucide-react';

const FreelancerCard = ({ freelancer, onHire }) => {
  const {
    _id,
    name,
    title,
    bio,
    avatar,
    hourlyRate = 45,
    rating = 4.9,
    totalReviews = 20,
    skills = [],
    location = 'Remote',
    whatsapp = '09077108987',
    isTopRated = true,
    isVerified = true,
  } = freelancer;

  const cleanWhatsapp = (whatsapp || '09077108987').replace(/[^0-9]/g, '');
  const waUrl = cleanWhatsapp.startsWith('0') 
    ? `https://wa.me/234${cleanWhatsapp.substring(1)}` 
    : `https://wa.me/${cleanWhatsapp}`;

  return (
    <div className="card-premium flex flex-col justify-between hover:scale-[1.01] group relative overflow-hidden">
      {/* Glow border effect on hover */}
      <div className="absolute -inset-px bg-gradient-to-r from-blue-500/20 via-yellow-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none"></div>

      <div>
        {/* Top Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="relative">
            <img
              src={avatar || '/images/waris_profile.jpg'}
              alt={name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-slate-700 group-hover:border-blue-500 transition-colors shadow-lg"
              onError={(e) => {
                e.target.src = '/images/waris_profile.jpg';
              }}
            />
            <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-[#1E293B]" title="Available for work"></span>
          </div>

          <div className="flex flex-col items-end gap-1">
            <span className="text-xl font-bold text-yellow-400">
              ${hourlyRate}<span className="text-xs font-normal text-slate-400">/hr</span>
            </span>
            <div className="flex items-center gap-1 text-xs text-slate-300">
              <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold text-white">{rating}</span>
              <span className="text-slate-500">({totalReviews})</span>
            </div>
          </div>
        </div>

        {/* Profile Info */}
        <div className="mt-4">
          <div className="flex items-center gap-2 flex-wrap">
            <Link to={`/freelancers/${_id}`} className="font-bold text-white hover:text-blue-400 transition-colors text-lg">
              {name}
            </Link>
            {isVerified && (
              <span title="Verified Identity" className="text-blue-400">
                <ShieldCheck className="w-4 h-4" />
              </span>
            )}
            {isTopRated && (
              <span className="gold-badge flex items-center gap-1 py-0.5 px-2">
                <Crown className="w-3 h-3 text-yellow-400" />
                <span>Top Rated</span>
              </span>
            )}
          </div>

          <p className="text-xs font-medium text-blue-400 mt-1">{title}</p>
          <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
            <MapPin className="w-3 h-3 text-slate-500" /> {location}
          </p>

          <p className="text-xs text-slate-300 mt-3 line-clamp-2 leading-relaxed">
            {bio}
          </p>
        </div>

        {/* Skills */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {skills.slice(0, 5).map((skill, index) => (
            <span
              key={index}
              className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-slate-800 text-slate-300 border border-slate-700/60"
            >
              {skill}
            </span>
          ))}
          {skills.length > 5 && (
            <span className="px-2 py-1 rounded-lg text-[11px] font-medium bg-slate-800/50 text-slate-400">
              +{skills.length - 5}
            </span>
          )}
        </div>
      </div>

      {/* Action Footer */}
      <div className="mt-6 pt-4 border-t border-slate-700/60 flex items-center justify-between gap-2">
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          title="Direct WhatsApp Chat"
        >
          <MessageCircle className="w-4 h-4" />
          <span className="hidden sm:inline">WhatsApp</span>
        </a>

        <div className="flex items-center gap-2">
          <Link
            to={`/freelancers/${_id}`}
            className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
          >
            Profile
          </Link>
          <button
            onClick={() => onHire ? onHire(freelancer) : null}
            className="btn-primary text-xs py-2 px-3.5"
          >
            <span>Hire</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FreelancerCard;
