import React, { useState } from 'react';
import { api } from '../services/api';
import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  Send,
  CheckCircle2,
  Clock,
  Sparkles,
  HelpCircle,
  ArrowRight,
} from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
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
      const res = await api.sendContactMessage(formData);
      if (res.success) {
        setSuccess(true);
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        setError(res.message || 'Error sending message');
      }
    } catch (err) {
      setError(err.message || 'Error submitting message');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-400">
          <Sparkles className="w-3.5 h-3.5 text-yellow-400" /> Direct Support & Enterprise Inquiries
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Get in Touch with SkillConnect
        </h1>
        <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
          Have an enterprise custom project, need dedicated talent onboarding, or want to discuss terms directly with Waris (AmiFlexboy)? We are ready to assist.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Direct Contact Details & WhatsApp Card */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Highlight Card */}
          <div className="card-premium border-yellow-400/30 p-8 space-y-6 bg-gradient-to-br from-[#1E293B] to-slate-900">
            <div className="flex items-center gap-4">
              <img
                src="/images/waris_profile.jpg"
                alt="Waris (AmiFlexboy)"
                className="w-16 h-16 rounded-2xl object-cover ring-2 ring-yellow-400 shadow-xl"
              />
              <div>
                <h3 className="text-lg font-bold text-white">Waris (AmiFlexboy)</h3>
                <p className="text-xs text-yellow-400 font-semibold">Founder & Senior Architect</p>
                <p className="text-[11px] text-slate-400">SkillConnect Platform Lead</p>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-700/80 space-y-4 text-xs">
              <a
                href="https://wa.me/2349077108987"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-between transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <MessageCircle className="w-5 h-5 text-emerald-400" />
                  <div>
                    <p className="font-bold text-white group-hover:text-emerald-400">WhatsApp Chat</p>
                    <p className="text-[11px] text-emerald-400">09077108987</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="mailto:amiflexboyc@gmail.com"
                className="p-3.5 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-between transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-blue-400" />
                  <div>
                    <p className="font-bold text-white group-hover:text-blue-400">Email Address</p>
                    <p className="text-[11px] text-slate-300">amiflexboyc@gmail.com</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-blue-400 group-hover:translate-x-1 transition-transform" />
              </a>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-700/60 flex items-center gap-3">
                <MapPin className="w-5 h-5 text-yellow-400 shrink-0" />
                <div>
                  <p className="font-bold text-white">Location</p>
                  <p className="text-[11px] text-slate-400">Ibadan, Nigeria • Operating Globally</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-700/60 flex items-center gap-3">
                <Clock className="w-5 h-5 text-purple-400 shrink-0" />
                <div>
                  <p className="font-bold text-white">Working Hours & Response SLA</p>
                  <p className="text-[11px] text-slate-400">Mon - Sat: 8:00 AM - 10:00 PM (GMT+1) • &lt; 1hr response</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7 card-premium p-8">
          <div className="mb-6 space-y-1">
            <h2 className="text-xl font-bold text-white">Send Us a Direct Message</h2>
            <p className="text-xs text-slate-400">
              Fill in your project brief or inquiry. Our engineering team reviews submissions within 60 minutes.
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs">
              {error}
            </div>
          )}

          {success ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white">Message Dispatched Successfully!</h3>
              <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                Thank you! Waris and the team have received your transmission at <span className="text-yellow-400 font-semibold">amiflexboyc@gmail.com</span>. We will follow up via email or WhatsApp (<span className="text-emerald-400 font-semibold">09077108987</span>) promptly.
              </p>
              <button
                onClick={() => setSuccess(false)}
                className="btn-secondary text-xs py-2 px-5 mt-2"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Alex Henderson"
                    required
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Your Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="alex@company.com"
                    required
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    WhatsApp or Phone Number
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 555-0192 or 09077108987"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Subject / Topic
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g. Full-Stack Web Development Inquiry"
                    required
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Message / Project Overview
                </label>
                <textarea
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your project timeline, requirements, technologies, or questions..."
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 leading-relaxed"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary py-3 text-xs font-bold shadow-blue-500/25 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>{loading ? 'Sending Transmission...' : 'Submit Message'}</span>
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};

export default Contact;
