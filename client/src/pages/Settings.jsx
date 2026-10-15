import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import {
  User,
  Shield,
  Bell,
  CheckCircle2,
  Lock,
  Save,
  MessageCircle,
  Mail,
} from 'lucide-react';

const Settings = () => {
  const { user, updateProfile } = useAuth();

  const [formData, setFormData] = useState({
    name: user?.name || 'Waris (AmiFlexboy)',
    title: user?.title || 'Full-Stack Developer & UI/UX Specialist',
    bio: user?.bio || 'Passionate software architect delivering world-class web and mobile applications with modern architectures and clean UI design.',
    hourlyRate: user?.hourlyRate || 65,
    phone: user?.phone || '09077108987',
    whatsapp: user?.whatsapp || '09077108987',
    location: user?.location || 'Ibadan, Nigeria',
    skills: user?.skills ? user.skills.join(', ') : 'React, Node.js, MongoDB, Tailwind CSS, Next.js',
  });

  const [activeTab, setActiveTab] = useState('profile');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const skillsArray = formData.skills.split(',').map((s) => s.trim()).filter(Boolean);
    await updateProfile({
      ...formData,
      skills: skillsArray,
      hourlyRate: Number(formData.hourlyRate),
    });
    setLoading(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex gap-8">
        <Sidebar />

        <main className="flex-1 min-w-0 space-y-6">
          <div className="space-y-1">
            <h1 className="text-2xl font-extrabold text-white">Account & Profile Settings</h1>
            <p className="text-xs text-slate-400">
              Customize your public freelancer card, contact details, and platform preferences.
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center gap-2 border-b border-slate-700/80 pb-2">
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                activeTab === 'profile'
                  ? 'bg-blue-500 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <User className="w-4 h-4" /> Profile Info
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                activeTab === 'security'
                  ? 'bg-blue-500 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Lock className="w-4 h-4" /> Security & Password
            </button>
          </div>

          {success && (
            <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4" /> Profile updated successfully!
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="card-premium">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Professional Title</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Hourly Rate ($/hr)</label>
                    <input
                      type="number"
                      name="hourlyRate"
                      value={formData.hourlyRate}
                      onChange={handleChange}
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">WhatsApp Number</label>
                    <input
                      type="text"
                      name="whatsapp"
                      value={formData.whatsapp}
                      onChange={handleChange}
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Location</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Skills (comma separated)
                  </label>
                  <input
                    type="text"
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Professional Bio
                  </label>
                  <textarea
                    rows={4}
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-blue-500 leading-relaxed"
                  ></textarea>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-gold text-xs py-2.5 px-6 font-bold"
                  >
                    <Save className="w-4 h-4" />
                    <span>{loading ? 'Saving Changes...' : 'Save Profile Changes'}</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="card-premium space-y-4">
              <h3 className="text-base font-bold text-white">Change Password</h3>
              <p className="text-xs text-slate-400">Update your account credentials to keep your wallet protected.</p>

              <form onSubmit={(e) => { e.preventDefault(); setSuccess(true); setTimeout(() => setSuccess(false), 2000); }} className="space-y-4 max-w-md">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Current Password</label>
                  <input type="password" required placeholder="••••••••" className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">New Password</label>
                  <input type="password" required placeholder="••••••••" className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white" />
                </div>
                <button type="submit" className="btn-primary text-xs py-2 px-5">
                  Update Password
                </button>
              </form>
            </div>
          )}

        </main>
      </div>
    </div>
  );
};

export default Settings;
