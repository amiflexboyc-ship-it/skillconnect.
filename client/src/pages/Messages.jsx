import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Send, MessageCircle, Phone, Video, Search, CheckCheck, MoreVertical, Sparkles } from 'lucide-react';

const initialConversations = [
  {
    id: 'conv_1',
    name: 'Elena Rostova',
    title: 'VP of Product @ CloudSphere',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    online: true,
    phone: '+1 415 889 2210',
    unread: 1,
    messages: [
      { id: 1, sender: 'them', text: 'Hi Waris! We reviewed your SkillConnect architecture and were blown away by the speed and clean UI design.', time: '10:14 AM' },
      { id: 2, sender: 'me', text: 'Thank you Elena! I pride myself on high performance and exceptional user experience. What timeline are you targeting for CloudSphere?', time: '10:16 AM' },
      { id: 3, sender: 'them', text: 'We want to roll out Phase 1 by the end of next month. Can we schedule a brief milestone call or chat via WhatsApp?', time: '10:20 AM' },
    ],
  },
  {
    id: 'conv_2',
    name: 'Sarah Jenkins',
    title: 'Head of Talent @ EnterpriseCorp',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80',
    online: false,
    phone: '+1 650 334 9901',
    unread: 0,
    messages: [
      { id: 1, sender: 'them', text: 'Milestone 2 payment has been released to your SkillConnect wallet! Thank you for the quick turnaround.', time: 'Yesterday' },
      { id: 2, sender: 'me', text: 'Received with thanks Sarah! Starting on Milestone 3 today.', time: 'Yesterday' },
    ],
  },
  {
    id: 'conv_3',
    name: 'David Oladipo',
    title: 'CTO @ CloudScale Nigeria',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    online: true,
    phone: '08034567890',
    unread: 0,
    messages: [
      { id: 1, sender: 'them', text: 'Waris, got your number from SkillConnect. We need a Senior Node/React engineer for a 6-month contract in Lagos/Remote.', time: 'Oct 12' },
      { id: 2, sender: 'me', text: 'Sounds great David! Feel free to ping me directly on WhatsApp at 09077108987.', time: 'Oct 12' },
    ],
  },
];

const Messages = () => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState(initialConversations);
  const [activeConvId, setActiveConvId] = useState('conv_1');
  const [inputText, setInputText] = useState('');

  const activeConv = conversations.find(c => c.id === activeConvId) || conversations[0];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg = {
      id: Date.now(),
      sender: 'me',
      text: inputText,
      time: 'Just now',
    };

    setConversations(prev =>
      prev.map(c =>
        c.id === activeConvId
          ? { ...c, messages: [...c.messages, newMsg] }
          : c
      )
    );
    setInputText('');

    // Simulate auto-response after 1.5s
    setTimeout(() => {
      const reply = {
        id: Date.now() + 1,
        sender: 'them',
        text: `Got your message! I'm reviewing the details right now. Let's keep in touch here or on WhatsApp: 09077108987.`,
        time: 'Just now',
      };
      setConversations(prev =>
        prev.map(c =>
          c.id === activeConvId
            ? { ...c, messages: [...c.messages, reply] }
            : c
        )
      );
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="card-premium p-0 overflow-hidden h-[750px] flex flex-col md:flex-row border-slate-700/80">
        
        {/* Left Sidebar: Conversations */}
        <div className="w-full md:w-80 border-r border-slate-700/80 bg-slate-900/60 flex flex-col">
          <div className="p-4 border-b border-slate-700/80">
            <h2 className="font-extrabold text-white text-base">Conversations</h2>
            <div className="relative mt-2">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search messages..."
                className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-800/60">
            {conversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => {
                  setActiveConvId(conv.id);
                  setConversations(prev => prev.map(c => c.id === conv.id ? { ...c, unread: 0 } : c));
                }}
                className={`w-full p-4 flex items-start gap-3 text-left transition-colors ${
                  activeConvId === conv.id
                    ? 'bg-blue-500/10 border-l-4 border-blue-500'
                    : 'hover:bg-slate-800/50'
                }`}
              >
                <div className="relative shrink-0">
                  <img src={conv.avatar} alt={conv.name} className="w-10 h-10 rounded-xl object-cover" />
                  {conv.online && (
                    <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-900"></span>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-white truncate">{conv.name}</p>
                    <span className="text-[10px] text-slate-500">
                      {conv.messages[conv.messages.length - 1]?.time || 'Today'}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 truncate mt-0.5">
                    {conv.messages[conv.messages.length - 1]?.text || 'No messages yet'}
                  </p>
                </div>

                {conv.unread > 0 && (
                  <span className="w-5 h-5 rounded-full bg-blue-500 text-[10px] font-bold text-white flex items-center justify-center shrink-0">
                    {conv.unread}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Quick WhatsApp Sync Card */}
          <div className="p-3 bg-slate-950/80 border-t border-slate-800">
            <a
              href="https://wa.me/2349077108987"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold hover:bg-emerald-500/20 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Direct WhatsApp: 09077108987</span>
            </a>
          </div>
        </div>

        {/* Right Chat Area */}
        <div className="flex-1 flex flex-col bg-[#0B1120]/90">
          
          {/* Chat Header */}
          <div className="p-4 border-b border-slate-700/80 flex items-center justify-between bg-slate-900/40">
            <div className="flex items-center gap-3">
              <img src={activeConv.avatar} alt={activeConv.name} className="w-10 h-10 rounded-xl object-cover ring-1 ring-blue-500" />
              <div>
                <h3 className="text-sm font-bold text-white">{activeConv.name}</h3>
                <p className="text-[11px] text-blue-400 font-medium">{activeConv.title}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={`https://wa.me/2349077108987`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                title="Continue on WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
                <span className="hidden sm:inline">WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Messages Thread */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4">
            {activeConv.messages.map((m) => {
              const isMe = m.sender === 'me';
              return (
                <div
                  key={m.id}
                  className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[75%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                      isMe
                        ? 'bg-blue-600 text-white rounded-br-none shadow-md shadow-blue-500/10'
                        : 'bg-[#1E293B] text-slate-200 border border-slate-700/80 rounded-bl-none'
                    }`}
                  >
                    {m.text}
                  </div>
                  <span className="text-[10px] text-slate-500 mt-1 px-1 flex items-center gap-1">
                    {m.time} {isMe && <CheckCheck className="w-3 h-3 text-blue-400" />}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Input Box */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-700/80 bg-slate-900/40 flex items-center gap-3">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={`Message ${activeConv.name}...`}
              className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              className="btn-primary py-2.5 px-4 text-xs font-bold shrink-0"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Send</span>
            </button>
          </form>

        </div>

      </div>
    </div>
  );
};

export default Messages;
