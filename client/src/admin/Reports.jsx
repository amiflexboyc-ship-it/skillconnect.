import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { ShieldAlert, CheckCircle2, Clock, Eye, AlertCircle } from 'lucide-react';

const initialReports = [
  {
    id: 'rep_1',
    reportedUser: 'CryptoScamBot99',
    reporter: 'Marcus Vance',
    reason: 'Suspicious off-platform payment phishing attempt',
    status: 'under-review',
    date: 'Oct 14, 2026',
    severity: 'high',
  },
  {
    id: 'rep_2',
    reportedUser: 'FakeClient LLC',
    reporter: 'Elena Rostova',
    reason: 'Non-responsive client on milestone review',
    status: 'resolved',
    date: 'Oct 11, 2026',
    severity: 'medium',
  },
  {
    id: 'rep_3',
    reportedUser: 'DevCopyCat',
    reporter: 'Waris (AmiFlexboy)',
    reason: 'Plagiarized portfolio screenshots',
    status: 'resolved',
    date: 'Oct 02, 2026',
    severity: 'high',
  },
];

const Reports = () => {
  const [reports, setReports] = useState(initialReports);

  const handleResolve = (id) => {
    setReports(prev =>
      prev.map(r => (r.id === id ? { ...r, status: 'resolved' } : r))
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex gap-8">
        <Sidebar isAdminView={true} />

        <main className="flex-1 min-w-0 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-extrabold text-white">Dispute & Safety Reports</h1>
              <p className="text-xs text-slate-400">
                Review flagged accounts, off-platform payment attempts, and escrow disputes.
              </p>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-500/10 text-rose-400 border border-rose-500/30">
              {reports.filter(r => r.status === 'under-review').length} Pending Review
            </span>
          </div>

          <div className="card-premium p-0 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-700/80 bg-slate-900/60 text-slate-400 uppercase text-[10px] tracking-wider">
                  <th className="p-4 font-semibold">Incident / Reason</th>
                  <th className="p-4 font-semibold">Reported User</th>
                  <th className="p-4 font-semibold">Reporter</th>
                  <th className="p-4 font-semibold">Severity</th>
                  <th className="p-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {reports.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-900/40 transition-colors">
                    <td className="p-4 space-y-0.5">
                      <p className="font-bold text-white text-xs">{r.reason}</p>
                      <p className="text-[10px] text-slate-500">Reported on {r.date}</p>
                    </td>

                    <td className="p-4 text-rose-400 font-semibold">{r.reportedUser}</td>
                    <td className="p-4 text-slate-300">{r.reporter}</td>

                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        r.severity === 'high'
                          ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                          : 'bg-yellow-400/10 text-yellow-400 border border-yellow-400/30'
                      }`}>
                        {r.severity}
                      </span>
                    </td>

                    <td className="p-4 text-right">
                      {r.status === 'under-review' ? (
                        <button
                          onClick={() => handleResolve(r.id)}
                          className="btn-primary text-[11px] py-1 px-3"
                        >
                          Resolve & Ban
                        </button>
                      ) : (
                        <span className="text-emerald-400 text-xs font-semibold flex items-center justify-end gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Resolved
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Reports;
