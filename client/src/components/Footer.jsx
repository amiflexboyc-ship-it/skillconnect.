import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Send, MessageCircle, Heart, ArrowUpRight } from 'lucide-react';

const Footer = () => {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#070B16] border-t border-slate-800/80 mt-20 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand & Direct Contact */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="SkillConnect"
                className="w-10 h-10 rounded-xl object-cover ring-2 ring-blue-500/50 shadow-lg shadow-blue-500/20"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <span className="text-2xl font-extrabold text-white">
                Skill<span className="text-yellow-400">Connect</span>
              </span>
            </Link>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              The premier digital talent network connecting visionary founders, global clients, and world-class freelance engineers, designers, and consultants.
            </p>

            {/* Direct Contact Cards */}
            <div className="pt-2 space-y-2">
              <a
                href="mailto:amiflexboyc@gmail.com"
                className="flex items-center gap-2.5 text-xs text-slate-300 hover:text-blue-400 transition-colors"
              >
                <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <span>amiflexboyc@gmail.com</span>
              </a>

              <a
                href="https://wa.me/2349077108987"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-xs text-slate-300 hover:text-emerald-400 transition-colors"
              >
                <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <MessageCircle className="w-3.5 h-3.5" />
                </div>
                <span>WhatsApp: 09077108987</span>
              </a>

              <div className="flex items-center gap-2.5 text-xs text-slate-400">
                <div className="p-1.5 rounded-lg bg-slate-800 text-slate-400 border border-slate-700">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <span>Ibadan, Nigeria (Global Remote)</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-white">Platform</h5>
            <ul className="space-y-2 text-xs">
              <li><Link to="/find-jobs" className="hover:text-blue-400 transition-colors">Browse All Jobs</Link></li>
              <li><Link to="/freelancers" className="hover:text-blue-400 transition-colors">Top Freelancers</Link></li>
              <li><Link to="/explore-skills" className="hover:text-blue-400 transition-colors">Skills Catalog</Link></li>
              <li><Link to="/post-job" className="hover:text-blue-400 transition-colors">Post a Project</Link></li>
              <li><Link to="/projects" className="hover:text-blue-400 transition-colors">Project Workspace</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-white">Categories</h5>
            <ul className="space-y-2 text-xs">
              <li><Link to="/find-jobs?category=Web%20Development" className="hover:text-blue-400 transition-colors">Full-Stack Web</Link></li>
              <li><Link to="/find-jobs?category=UI%2FUX%20Design" className="hover:text-blue-400 transition-colors">UI/UX Design Systems</Link></li>
              <li><Link to="/find-jobs?category=Mobile%20App" className="hover:text-blue-400 transition-colors">Mobile App Dev</Link></li>
              <li><Link to="/find-jobs?category=E-Commerce" className="hover:text-blue-400 transition-colors">E-Commerce & Shopify</Link></li>
              <li><Link to="/contact" className="hover:text-blue-400 transition-colors">Enterprise Inquiries</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-white">Stay Updated</h5>
            <p className="text-xs text-slate-400 leading-relaxed">
              Get weekly remote high-paying tech jobs and talent spotlight right to your inbox.
            </p>
            {subscribed ? (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium">
                ✓ Thanks for subscribing!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
                <button
                  type="submit"
                  className="w-full btn-primary text-xs py-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Subscribe</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-slate-500">
            © {new Date().getFullYear()} SkillConnect Inc. All rights reserved. Built with precision for elite talent.
          </p>

          <div className="flex items-center gap-1 text-slate-400">
            <span>Crafted & Lead by</span>
            <span className="text-yellow-400 font-bold">Waris (AmiFlexboy)</span>
            <span>•</span>
            <a
              href="https://wa.me/2349077108987"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:underline font-medium"
            >
              09077108987
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
