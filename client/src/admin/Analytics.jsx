import React from 'react';
import Sidebar from '../components/Sidebar';
import { BarChart3, TrendingUp, Users, DollarSign, Award, Globe, ArrowUpRight } from 'lucide-react';

const Analytics = () => {
  const categoryStats = [
    { name: 'Full-Stack Web Dev', percentage: 42, volume: '$221,760' },
    { name: 'UI/UX Design Systems', percentage: 24, volume: '$126,720' },
    { name: 'Mobile App Engineering', percentage: 16, volume: '$84,480' },
    { name: 'Backend & Cloud DevOps', percentage: 11, volume: '$58,080' },
    { name: 'E-Commerce & Shopify', percentage: 7, volume: '$36,960' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex gap-8">
        <Sidebar isAdminView={true} />

        <main className="flex-1 min-w-0 space-y-8">
          <div>
            <h1 className="text-2xl font-extrabold text-white">Platform Performance & Analytics</h1>
            <p className="text-xs text-slate-400">
              Macro intelligence on escrow transaction throughput, talent growth, and category share.
            </p>
          </div>

          {/* KPI Snapshot */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="card-premium p-6 space-y-2 border-yellow-400/30">
              <span className="text-xs text-slate-400 uppercase font-semibold">Total Escrow Processed</span>
              <p className="text-3xl font-black text-yellow-400">$528,000</p>
              <p className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" /> +24% QoQ Growth
              </p>
            </div>

            <div className="card-premium p-6 space-y-2">
              <span className="text-xs text-slate-400 uppercase font-semibold">Average Contract Size</span>
              <p className="text-3xl font-black text-blue-400">$2,450</p>
              <p className="text-[11px] text-slate-400">Highest in FinTech & SaaS</p>
            </div>

            <div className="card-premium p-6 space-y-2">
              <span className="text-xs text-slate-400 uppercase font-semibold">Talent Repeat Hire Rate</span>
              <p className="text-3xl font-black text-white">88.4%</p>
              <p className="text-[11px] text-yellow-400 font-semibold">Industry leading retention</p>
            </div>
          </div>

          {/* Category Share Breakdown */}
          <div className="card-premium space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-blue-400" /> Revenue & Volume by Discipline
              </h3>
              <span className="text-xs text-slate-400">Year to date (2026)</span>
            </div>

            <div className="space-y-4">
              {categoryStats.map((cat, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-white">{cat.name}</span>
                    <span className="text-slate-400 font-medium">{cat.volume} ({cat.percentage}%)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-blue-500 to-yellow-400"
                      style={{ width: `${cat.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Performer Spotlight in Analytics */}
          <div className="card-premium p-6 border-yellow-400/40 bg-gradient-to-r from-slate-900 via-[#1E293B] to-slate-900 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <img
                src="/images/waris_profile.jpg"
                alt="Waris"
                className="w-16 h-16 rounded-2xl object-cover ring-2 ring-yellow-400 shadow-xl"
              />
              <div>
                <span className="gold-badge py-0.5 px-2 text-[10px]">#1 Top Performer</span>
                <h4 className="text-base font-bold text-white mt-1">Waris (AmiFlexboy)</h4>
                <p className="text-xs text-slate-400">
                  56 Contracts Delivered • 100% Success • $18,450 Volume
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs text-slate-400">Admin Contact</span>
              <p className="text-xs font-bold text-yellow-400">amiflexboyc@gmail.com</p>
              <p className="text-xs font-bold text-emerald-400">09077108987</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Analytics;
