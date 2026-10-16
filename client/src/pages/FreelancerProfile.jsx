import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import {
  Star,
  ShieldCheck,
  Crown,
  MapPin,
  Calendar,
  MessageCircle,
  Mail,
  ExternalLink,
  Award,
  CheckCircle2,
  Briefcase,
  Share2,
  DollarSign,
  Clock,
  ChevronRight,
} from 'lucide-react';

const FreelancerProfile = () => {
  const { id } = useParams();
  const { user: authUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        if (id) {
          const res = await api.getUserById(id);
          if (res.success && res.user) {
            setProfile(res.user);
          }
        } else {
          // Default to Waris
          const res = await api.getFreelancers({ search: 'Waris' });
          if (res.success && res.freelancers && res.freelancers.length > 0) {
            setProfile(res.freelancers[0]);
          } else {
            setProfile(authUser);
          }
        }
      } catch (err) {
        console.error(err);
        setProfile(authUser);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [id, authUser]);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const current = profile || authUser;

  const portfolioProjects = [
    {
      title: 'SkillConnect Global Talent Marketplace',
      tag: 'Full-Stack Architecture',
      description: 'Engineered an end-to-end talent platform featuring real-time messaging, milestone escrow, and responsive dark UI.',
      image: '/images/hero.jpg',
      tags: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS'],
    },
    {
      title: 'Apex Financial Analytics Dashboard',
      tag: 'FinTech Platform',
      description: 'Sub-second real-time streaming data visualizer with WebSocket feeds and bank-grade security protocols.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
      tags: ['React', 'WebSockets', 'Tailwind', 'Chart.js'],
    },
    {
      title: 'Lumina Lifestyle Headless E-Commerce',
      tag: 'Storefront & WhatsApp Sync',
      description: 'Modern storefront featuring direct WhatsApp instant order fulfillment and Stripe multi-currency processing.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
      tags: ['Next.js', 'Stripe', 'WhatsApp API'],
    },
  ];

  const clientReviews = [
    {
      client: 'Sarah Jenkins',
      company: 'EnterpriseCorp US',
      rating: 5,
      date: '2 weeks ago',
      comment: 'Waris is simply one of the most reliable and gifted full-stack engineers I have ever worked with. He delivered our React & Node.js architecture two weeks ahead of schedule. Outstanding communication!',
    },
    {
      client: 'David Oladipo',
      company: 'CloudScale Africa',
      rating: 5,
      date: '1 month ago',
      comment: 'Top-tier code quality, beautiful UI design, and flawless execution. Waris was always reachable via WhatsApp and solved complex database bottlenecks seamlessly.',
    },
    {
      client: 'Marcus Vance',
      company: 'Vanguard Studios London',
      rating: 5,
      date: '2 months ago',
      comment: 'Exceptional attention to detail. The animations, responsive layout, and clean APIs made integration a breeze. Highly recommended for any serious web project!',
    },
  ];

  const cleanPhone = (current?.whatsapp || '09077108987').replace(/[^0-9]/g, '');
  const waUrl = cleanPhone.startsWith('0') 
    ? `https://wa.me/234${cleanPhone.substring(1)}` 
    : `https://wa.me/${cleanPhone}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Profile Header Card */}
      <div className="card-premium relative overflow-hidden p-6 sm:p-10 border-blue-500/40">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8">
          
          {/* Avatar with Glow */}
          <div className="relative group shrink-0">
            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-blue-500 rounded-3xl blur opacity-70 group-hover:opacity-100 transition"></div>
            <img
              src={current?.avatar || '/images/waris_profile.jpg'}
              alt={current?.name || 'Waris'}
              className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-2xl object-cover border-4 border-[#1E293B] shadow-2xl"
              onError={(e) => {
                e.target.src = '/images/waris_profile.jpg';
              }}
            />
            <span className="absolute bottom-2 right-2 w-5 h-5 bg-emerald-500 rounded-full border-4 border-[#1E293B]" title="Available for hire"></span>
          </div>

          {/* Profile Main Details */}
          <div className="flex-1 text-center md:text-left space-y-3">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
                {current?.name || 'Waris (AmiFlexboy)'}
              </h1>
              <span title="Verified Identity" className="text-blue-400">
                <ShieldCheck className="w-6 h-6" />
              </span>
              <span className="gold-badge py-1 px-3 flex items-center gap-1.5 text-xs">
                <Crown className="w-3.5 h-3.5 text-yellow-400" /> Top Rated Specialist
              </span>
            </div>

            <p className="text-base sm:text-lg font-semibold text-blue-400">
              {current?.title || 'Senior Full-Stack Developer & UI/UX Specialist'}
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs text-slate-400 pt-1">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-500" /> {current?.location || 'Ibadan, Nigeria'}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-yellow-400 font-semibold">
                <Star className="w-3.5 h-3.5 fill-yellow-400" /> {current?.rating || 5.0} ({current?.totalReviews || 48} reviews)
              </span>
              <span>•</span>
              <span className="text-emerald-400 font-semibold">
                100% Job Success
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl pt-2">
              {current?.bio || 'Passionate software architect delivering world-class web and mobile applications with modern architectures, clean UI design, and bulletproof security.'}
            </p>

            {/* Action Bar */}
            <div className="pt-4 flex flex-wrap items-center justify-center md:justify-start gap-3">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold text-xs py-2.5 px-5 font-bold shadow-yellow-500/20"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp ({current?.whatsapp || '09077108987'})</span>
              </a>

              <a
                href={`mailto:${current?.email || 'amiflexboyc@gmail.com'}`}
                className="btn-secondary text-xs py-2.5 px-4"
              >
                <Mail className="w-4 h-4 text-blue-400" />
                <span>{current?.email || 'amiflexboyc@gmail.com'}</span>
              </a>

              <button
                onClick={handleShare}
                className="p-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition-colors text-xs flex items-center gap-1.5"
              >
                <Share2 className="w-4 h-4" />
                <span>{copied ? 'Copied Link!' : 'Share'}</span>
              </button>
            </div>
          </div>

          {/* Rate card in header */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-700 text-center shrink-0 w-full md:w-56 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Hourly Rate</span>
            <p className="text-3xl font-black text-yellow-400">
              ${current?.hourlyRate || 65}<span className="text-xs font-normal text-slate-400">/hr</span>
            </p>
            <div className="pt-2 border-t border-slate-800 text-xs text-slate-400 space-y-1">
              <p>40 hrs/week capacity</p>
              <p>Response time: &lt; 1hr</p>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Skills + Stats Column & Portfolio Column */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Skills & Proficiency */}
        <div className="space-y-6">
          <div className="card-premium space-y-5">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-yellow-400" /> Core Skills & Proficiency
            </h3>

            <div className="space-y-3.5">
              {[
                { name: 'React.js & Next.js', level: 98 },
                { name: 'Node.js & Express API', level: 95 },
                { name: 'Tailwind CSS & Modern UI', level: 99 },
                { name: 'MongoDB & Database Design', level: 92 },
                { name: 'TypeScript & JavaScript (ES6+)', level: 90 },
                { name: 'Figma to Code UI/UX', level: 94 },
              ].map((skill, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-slate-200">{skill.name}</span>
                    <span className="text-yellow-400 font-bold">{skill.level}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-blue-500 to-yellow-400"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Contact Card */}
          <div className="card-premium space-y-4 border-yellow-400/20">
            <h3 className="text-base font-bold text-white">Direct Engagement</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Have an urgent milestone or need technical consultation? Reach out directly to Waris.
            </p>
            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                <span className="text-slate-400">Email:</span>
                <span className="text-white font-medium">amiflexboyc@gmail.com</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                <span className="text-slate-400">WhatsApp:</span>
                <span className="text-emerald-400 font-medium">09077108987</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Portfolio & Client Testimonials */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Portfolio Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">Featured Portfolio Projects</h3>
              <span className="text-xs text-slate-400">Verified deliverables</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {portfolioProjects.map((p, index) => (
                <div
                  key={index}
                  className="card-premium p-4 group overflow-hidden flex flex-col justify-between hover:border-blue-500/50 transition-colors"
                >
                  <div>
                    <div className="relative rounded-xl overflow-hidden aspect-video bg-slate-800 mb-3">
                      <img
                        src={p.image}
                        alt={p.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-[#0B1120]/80 text-yellow-400 backdrop-blur-sm border border-yellow-400/30">
                        {p.tag}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
                      {p.title}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                      {p.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-700/60 flex flex-wrap gap-1">
                    {p.tags.map((t, tIdx) => (
                      <span key={tIdx} className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-800 text-slate-300">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Client Reviews */}
          <div className="card-premium space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">Client Reviews & Testimonials</h3>
                <p className="text-xs text-slate-400">100% verified completed contracts</p>
              </div>
              <div className="flex items-center gap-1 text-yellow-400 font-bold text-sm">
                <Star className="w-4 h-4 fill-yellow-400" /> 5.0 (48 reviews)
              </div>
            </div>

            <div className="space-y-4">
              {clientReviews.map((rev, index) => (
                <div key={index} className="p-4 rounded-xl bg-slate-900/60 border border-slate-700/60 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-white">{rev.client}</p>
                      <p className="text-[11px] text-blue-400">{rev.company}</p>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-yellow-400">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-yellow-400" />
                      ))}
                      <span className="text-slate-500 ml-1 text-[11px]">{rev.date}</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed italic">
                    "{rev.comment}"
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default FreelancerProfile;
