import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { Bell, Send, CheckCircle2, ShieldAlert } from 'lucide-react';

const AdminNotifications = () => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [targetAudience, setTargetAudience] = useState('all');
  const [sentSuccess, setSentSuccess] = useState(false);

  const [broadcasts, setBroadcasts] = useState([
    { id: 1, title: 'SkillConnect 2.0 Engine Live', message: 'Escrow protection and direct WhatsApp integration are now active globally.', target: 'All Users', date: 'Oct 14, 2026' },
    { id: 2, title: 'Top Rated Criteria Update', message: 'Maintain 98%+ Job Success to receive verified Top Rated Gold badge benefits.', target: 'Freelancers', date: 'Oct 10, 2026' },
  ]);

  const handleBroadcast = (e) => {
    e.preventDefault();
    if (!title || !message) return;

    setBroadcasts([
      { id: Date.now(), title, message, target: targetAudience === 'all' ? 'All Users' : targetAudience, date: 'Today' },
      ...broadcasts,
    ]);
    setSentSuccess(true);
    setTitle('');
    setMessage('');
    setTimeout(() => setSentSuccess(false), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex gap-8">
        <Sidebar isAdminView={true} />

        <main className="flex-1 min-w-0 space-y-6">
          <div>
            <h1 className="text-2xl font-extrabold text-white">System Broadcasts & Alerts</h1>
            <p className="text-xs text-slate-400">
              Transmit system-wide push notifications to clients and freelancers.
            </p>
          </div>

          {sentSuccess && (
            <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> Broadcast dispatched to all active sessions!
            </div>
          )}

          {/* Broadcast Form */}
          <div className="card-premium space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Bell className="w-4 h-4 text-yellow-400" /> New Platform Broadcast
            </h3>

            <form onSubmit={handleBroadcast} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Broadcast Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Scheduled Maintenance or New Escrow Feature"
                    required
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Target Audience</label>
                  <select
                    value={targetAudience}
                    onChange={(e) => setTargetAudience(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="all">All Users</option>
                    <option value="Freelancers">Freelancers Only</option>
                    <option value="Clients">Clients Only</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Broadcast Message</label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type the message that will pop up on user dashboards..."
                  required
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-blue-500 leading-relaxed"
                ></textarea>
              </div>

              <div className="flex justify-end">
                <button type="submit" className="btn-gold text-xs py-2 px-5 font-bold flex items-center gap-2">
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Broadcast</span>
                </button>
              </div>
            </form>
          </div>

          {/* Broadcasts History */}
          <div className="card-premium space-y-4">
            <h3 className="text-base font-bold text-white">Broadcast History</h3>
            <div className="space-y-3">
              {broadcasts.map((b) => (
                <div key={b.id} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-white">{b.title}</h4>
                    <span className="text-[10px] text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded border border-yellow-400/20">{b.target}</span>
                  </div>
                  <p className="text-xs text-slate-400">{b.message}</p>
                  <span className="text-[10px] text-slate-500 pt-1 block">{b.date}</span>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminNotifications;
