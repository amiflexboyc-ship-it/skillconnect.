import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { api } from '../services/api';
import Loading from '../components/Loading';
import { Mail, Phone, MessageCircle, CheckCheck, Clock, Reply, Sparkles } from 'lucide-react';

const ContactMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      try {
        const res = await api.getContactMessages();
        if (res.success && res.messages) {
          setMessages(res.messages);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, []);

  const handleUpdateStatus = async (id, status) => {
    try {
      await api.updateContactStatus(id, status);
      setMessages(prev =>
        prev.map(m => (m._id === id ? { ...m, status } : m))
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex gap-8">
        <Sidebar isAdminView={true} />

        <main className="flex-1 min-w-0 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-extrabold text-white">Contact & Enterprise Inquiries</h1>
              <p className="text-xs text-slate-400">
                Messages routed to Waris (amiflexboyc@gmail.com / 09077108987).
              </p>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-yellow-400/10 text-yellow-400 border border-yellow-400/30">
              {messages.filter(m => m.status === 'unread').length} Unread
            </span>
          </div>

          {loading ? (
            <Loading text="Loading inquiries..." />
          ) : messages.length === 0 ? (
            <div className="card-premium py-16 text-center space-y-3">
              <Mail className="w-12 h-12 text-slate-500 mx-auto" />
              <p className="text-slate-400 text-sm">No incoming contact messages yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((msg) => (
                <div key={msg._id} className="card-premium space-y-4 border-slate-700/80">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-700/60">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-white">{msg.name}</h3>
                        <span className="text-xs text-slate-400">&lt;{msg.email}&gt;</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold capitalize ${
                          msg.status === 'unread'
                            ? 'bg-yellow-400/10 text-yellow-400 border border-yellow-400/30'
                            : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                        }`}>
                          {msg.status}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-blue-400">{msg.subject}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      {msg.phone && (
                        <a
                          href={`https://wa.me/${msg.phone.replace(/[^0-9]/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>WhatsApp</span>
                        </a>
                      )}
                      <a
                        href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)}`}
                        className="btn-primary text-xs py-1.5 px-3 flex items-center gap-1.5"
                      >
                        <Reply className="w-3.5 h-3.5" />
                        <span>Reply Email</span>
                      </a>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                    {msg.message}
                  </p>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                    <span>Received {new Date(msg.createdAt).toLocaleDateString()}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleUpdateStatus(msg._id, msg.status === 'read' ? 'replied' : 'read')}
                        className="text-yellow-400 hover:underline"
                      >
                        Mark as {msg.status === 'read' ? 'Replied' : 'Read'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ContactMessages;
