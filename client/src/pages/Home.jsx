import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import FreelancerCard from '../components/FreelancerCard';
import JobCard from '../components/JobCard';
import SkillCard from '../components/SkillCard';
import SearchBar from '../components/SearchBar';
import {
  Sparkles,
  ShieldCheck,
  Zap,
  Award,
  Globe2,
  CheckCircle2,
  ArrowRight,
  Code,
  Palette,
  Smartphone,
  ShoppingCart,
  Server,
  Cpu,
  Star,
  MessageCircle,
  Mail,
} from 'lucide-react';

const Home = () => {
  const [featuredFreelancers, setFeaturedFreelancers] = useState([]);
  const [featuredJobs, setFeaturedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [freeRes, jobRes] = await Promise.all([
          api.getFreelancers(),
          api.getJobs(),
        ]);
        if (freeRes.success && freeRes.freelancers) {
          setFeaturedFreelancers(freeRes.freelancers.slice(0, 3));
        }
        if (jobRes.success && jobRes.jobs) {
          setFeaturedJobs(jobRes.jobs.slice(0, 4));
        }
      } catch (err) {
        console.error('Home data error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const categories = [
    {
      title: 'Full-Stack Web Dev',
      description: 'Modern SPAs, Next.js, React, Node.js, and high-throughput APIs.',
      count: '1,420',
      avgRate: '$50 - $95/hr',
      icon: Code,
      linkTo: '/find-jobs?category=Web%20Development',
    },
    {
      title: 'UI/UX Design Systems',
      description: 'Figma prototypes, design tokens, micro-interactions, and dark mode UI.',
      count: '890',
      avgRate: '$45 - $80/hr',
      icon: Palette,
      linkTo: '/find-jobs?category=UI%2FUX%20Design',
    },
    {
      title: 'Mobile App Engineering',
      description: 'Native iOS, Android, and cross-platform React Native solutions.',
      count: '640',
      avgRate: '$55 - $110/hr',
      icon: Smartphone,
      linkTo: '/find-jobs?category=Mobile%20App',
    },
    {
      title: 'E-Commerce Platforms',
      description: 'Headless Shopify, WooCommerce, Stripe, and WhatsApp checkout funnels.',
      count: '510',
      avgRate: '$40 - $75/hr',
      icon: ShoppingCart,
      linkTo: '/find-jobs?category=E-Commerce',
    },
    {
      title: 'Backend & Cloud DevOps',
      description: 'MongoDB, PostgreSQL, Docker, AWS infrastructure, and microservices.',
      count: '780',
      avgRate: '$60 - $120/hr',
      icon: Server,
      linkTo: '/find-jobs?category=Backend%20Development',
    },
    {
      title: 'AI & Data Intelligence',
      description: 'LLM integrations, prompt engineering, predictive modeling, and chatbots.',
      count: '430',
      avgRate: '$70 - $135/hr',
      icon: Cpu,
      linkTo: '/find-jobs?category=AI',
    },
  ];

  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 overflow-hidden">
        {/* Glow ambient background lights */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-blue-500/15 rounded-full blur-[140px] pointer-events-none"></div>
        <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-yellow-400/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            
            {/* Tag pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800/90 border border-slate-700/80 text-xs font-semibold text-slate-300 shadow-xl backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
              <span>SkillConnect 2.0 • The Premier Network for Elite Tech Talent</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
              Where Visionary Projects Meet{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-200 to-yellow-400">
                World-Class Talent.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Connect directly with vetted senior engineers, UI/UX masters, and digital experts. Backed by guaranteed milestone escrow protection and instant WhatsApp collaboration.
            </p>

            {/* Search Bar in Hero */}
            <div className="pt-4 max-w-3xl mx-auto">
              <SearchBar placeholder="Try 'React Developer', 'UI/UX Designer', 'Mobile App'..." />
            </div>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <Link to="/freelancers" className="btn-primary text-sm py-3.5 px-7">
                <span>Browse Top Talent</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/post-job" className="btn-gold text-sm py-3.5 px-7">
                <span>Post a Job Free</span>
              </Link>
              <Link to="/explore-skills" className="btn-secondary text-sm py-3.5 px-6">
                <span>Explore Catalog</span>
              </Link>
            </div>

            {/* Metrics Counter Bar */}
            <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-slate-800/80 mt-12">
              <div>
                <p className="text-3xl sm:text-4xl font-extrabold text-white">75K<span className="text-blue-400">+</span></p>
                <p className="text-xs text-slate-400 mt-1">Vetted Specialists</p>
              </div>
              <div>
                <p className="text-3xl sm:text-4xl font-extrabold text-white">99.4<span className="text-yellow-400">%</span></p>
                <p className="text-xs text-slate-400 mt-1">Client Satisfaction</p>
              </div>
              <div>
                <p className="text-3xl sm:text-4xl font-extrabold text-white">$500M<span className="text-blue-400">+</span></p>
                <p className="text-xs text-slate-400 mt-1">Secured Payments</p>
              </div>
              <div>
                <p className="text-3xl sm:text-4xl font-extrabold text-white">150<span className="text-yellow-400">+</span></p>
                <p className="text-xs text-slate-400 mt-1">Countries Connected</p>
              </div>
            </div>
          </div>

          {/* Hero Banner Visual Showcase */}
          <div className="mt-16 rounded-3xl overflow-hidden border border-slate-700/80 shadow-2xl shadow-blue-500/10 relative group">
            <img
              src="/images/hero.jpg"
              alt="SkillConnect Platform Ecosystem"
              className="w-full h-auto object-cover max-h-[500px] group-hover:scale-[1.01] transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-transparent to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-[#0B1120]/80 backdrop-blur-xl border border-slate-700/60">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping"></span>
                <p className="text-xs sm:text-sm font-semibold text-white">
                  Live Global Marketplace: 4,120 active developers coding right now
                </p>
              </div>
              <Link to="/explore-skills" className="text-xs font-bold text-yellow-400 hover:text-yellow-300 flex items-center gap-1">
                Explore All Verticals <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Founder / Top Talent Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-[#1E293B] to-slate-900 border-2 border-yellow-400/40 p-8 sm:p-12 shadow-2xl shadow-yellow-500/10 relative overflow-hidden">
          
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-yellow-400/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Photo Column */}
            <div className="lg:col-span-5 flex flex-col items-center sm:items-start">
              <div className="relative group">
                <div className="absolute -inset-1.5 bg-gradient-to-r from-yellow-400 to-blue-500 rounded-3xl blur-md opacity-75 group-hover:opacity-100 transition duration-300"></div>
                <img
                  src="/images/waris_profile.jpg"
                  alt="Waris (AmiFlexboy) - Founder & Lead Engineer"
                  className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-2xl object-cover border-2 border-[#1E293B] shadow-2xl"
                />
                <div className="absolute bottom-3 left-3 right-3 bg-slate-950/85 backdrop-blur-md px-4 py-2 rounded-xl border border-yellow-400/30 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-white">Waris (AmiFlexboy)</p>
                    <p className="text-[10px] text-yellow-400">Founder & Lead Engineer</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-yellow-400 font-bold">
                    <Star className="w-3.5 h-3.5 fill-yellow-400" /> 5.0 (48)
                  </div>
                </div>
              </div>
            </div>

            {/* Details Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-xs font-bold text-yellow-400">
                <Award className="w-3.5 h-3.5" />
                <span>Featured Developer of the Month</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                Architecting High-Performance Web & Mobile Experiences
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                "Hi, I'm Waris. As the architect behind SkillConnect and a veteran full-stack developer, I help innovative companies launch robust web applications with Node.js, React, MongoDB, and Tailwind CSS. Let's turn your concept into revenue."
              </p>

              {/* Skills grid */}
              <div className="flex flex-wrap gap-2">
                {['React.js', 'Node.js', 'MongoDB', 'Tailwind CSS', 'Vite', 'Express.js', 'Next.js', 'UI/UX Prototyping', 'REST APIs'].map((skill, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-xl text-xs font-medium bg-slate-800 text-slate-200 border border-slate-700/80"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Contact Actions */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <a
                  href="https://wa.me/2349077108987"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm shadow-lg shadow-emerald-500/25 transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Waris (09077108987)</span>
                </a>

                <a
                  href="mailto:amiflexboyc@gmail.com"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-750 text-white border border-slate-700 font-semibold text-sm transition-all"
                >
                  <Mail className="w-4 h-4 text-blue-400" />
                  <span>amiflexboyc@gmail.com</span>
                </a>

                <Link
                  to="/freelancer-profile"
                  className="btn-primary text-sm py-3 px-6"
                >
                  <span>View Full Profile</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Trending Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-blue-400">Skill Directory</h3>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Explore High-Demand Skills</h2>
          </div>
          <Link to="/explore-skills" className="text-xs font-bold text-yellow-400 hover:text-yellow-300 flex items-center gap-1">
            Browse All Categories <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, index) => (
            <SkillCard key={index} {...cat} />
          ))}
        </div>
      </section>

      {/* Top Rated Freelancers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-yellow-400">Verified Talent</h3>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Top-Rated Freelancers</h2>
          </div>
          <Link to="/freelancers" className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1">
            View All Freelancers <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredFreelancers.map((freelancer) => (
            <FreelancerCard key={freelancer._id} freelancer={freelancer} />
          ))}
        </div>
      </section>

      {/* Open High-Budget Jobs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400">Opportunities</h3>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Featured Open Jobs</h2>
          </div>
          <Link to="/find-jobs" className="text-xs font-bold text-yellow-400 hover:text-yellow-300 flex items-center gap-1">
            Browse All Jobs <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredJobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      </section>

      {/* Why Choose SkillConnect */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="card-premium p-8 sm:p-12 border-blue-500/30">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
            <h3 className="text-xs font-bold uppercase tracking-wider text-blue-400">Security & Trust</h3>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Why Businesses Hire on SkillConnect</h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Built from the ground up to eliminate hiring friction, payment anxiety, and project delays.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3 p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-white">Escrow Milestone Protection</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Funds are securely held in escrow until you inspect and approve milestones. Never pay for unfinished or subpar code.
              </p>
            </div>

            <div className="space-y-3 p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="w-12 h-12 rounded-xl bg-yellow-400/10 text-yellow-400 flex items-center justify-center">
                <Zap className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-white">Direct WhatsApp Sync</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Skip long email chains. Connect with your developers directly on WhatsApp or built-in chat for immediate feedback and updates.
              </p>
            </div>

            <div className="space-y-3 p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="w-12 h-12 rounded-xl bg-emerald-400/10 text-emerald-400 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-white">Vetted Top 1% Engineers</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Every developer and designer undergoes technical assessment, portfolio verification, and identity checks before getting listed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Bottom Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 p-8 sm:p-14 text-center text-white relative overflow-hidden shadow-2xl shadow-blue-500/20">
          <div className="max-w-2xl mx-auto space-y-6 relative z-10">
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Ready to Turn Your Idea Into Reality?
            </h2>
            <p className="text-sm sm:text-base text-blue-100">
              Post your job in under 2 minutes or reach out directly to Waris (AmiFlexboy) for enterprise grade software engineering.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link to="/post-job" className="btn-gold text-sm py-3 px-8 shadow-black/30">
                Post a Job Now
              </Link>
              <Link to="/contact" className="px-8 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm transition-colors">
                Contact Waris Directly
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
