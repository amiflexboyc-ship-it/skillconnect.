import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import {
  Wallet as WalletIcon,
  ArrowUpRight,
  ArrowDownLeft,
  DollarSign,
  CreditCard,
  Building,
  CheckCircle2,
  X,
  History,
  ShieldCheck,
} from 'lucide-react';

const initialTransactions = [
  { id: 'tx_1', date: 'Oct 14, 2026', title: 'Milestone #2 Payout - Apex Trading Dashboard', type: 'credit', amount: 1800.00, status: 'completed' },
  { id: 'tx_2', date: 'Oct 10, 2026', title: 'Full Contract Release - Lumina E-Commerce', type: 'credit', amount: 3200.00, status: 'completed' },
  { id: 'tx_3', date: 'Oct 05, 2026', title: 'Direct Withdrawal to Bank Account', type: 'debit', amount: 1500.00, status: 'completed' },
  { id: 'tx_4', date: 'Sep 28, 2026', title: 'Initial Milestone Payout - Vanguard UI Design', type: 'credit', amount: 900.00, status: 'completed' },
  { id: 'tx_5', date: 'Sep 20, 2026', title: 'Platform Bonus - Top Rated Specialist Bonus', type: 'credit', amount: 250.00, status: 'completed' },
];

const Wallet = () => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState(initialTransactions);
  const [withdrawModal, setWithdrawModal] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('1000');
  const [payoutMethod, setPayoutMethod] = useState('bank');
  const [withdrawSuccess, setWithdrawSuccess] = useState(false);

  const handleWithdrawSubmit = (e) => {
    e.preventDefault();
    const amountNum = Number(withdrawAmount);
    if (!amountNum || amountNum <= 0) return;

    const newTx = {
      id: 'tx_' + Date.now(),
      date: 'Today',
      title: `Withdrawal via ${payoutMethod.toUpperCase()}`,
      type: 'debit',
      amount: amountNum,
      status: 'completed',
    };

    setTransactions([newTx, ...transactions]);
    setWithdrawSuccess(true);
    setTimeout(() => {
      setWithdrawSuccess(false);
      setWithdrawModal(false);
    }, 1800);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex gap-8">
        <Sidebar />

        <main className="flex-1 min-w-0 space-y-8">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-extrabold text-white">Wallet & Escrow Balances</h1>
              <p className="text-xs text-slate-400">
                Manage your earned income, initiate local bank payouts, or fund client contracts.
              </p>
            </div>

            <button
              onClick={() => setWithdrawModal(true)}
              className="btn-gold text-xs py-2.5 px-5 font-bold shadow-yellow-500/25"
            >
              <ArrowUpRight className="w-4 h-4" />
              <span>Withdraw Funds</span>
            </button>
          </div>

          {/* Balance Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="card-premium p-6 border-yellow-400/30 bg-gradient-to-br from-[#1E293B] to-slate-900 space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Available for Withdrawal
              </span>
              <p className="text-3xl font-black text-yellow-400">
                ${user?.walletBalance ? user.walletBalance.toLocaleString() : '4,950.00'}
              </p>
              <p className="text-[11px] text-emerald-400 font-semibold pt-1 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Ready for immediate transfer
              </p>
            </div>

            <div className="card-premium p-6 space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Held in Milestone Escrow
              </span>
              <p className="text-3xl font-black text-blue-400">$1,500.00</p>
              <p className="text-[11px] text-slate-400 pt-1">
                2 active contracts in progress
              </p>
            </div>

            <div className="card-premium p-6 space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Lifetime Platform Earnings
              </span>
              <p className="text-3xl font-black text-white">$18,450.00</p>
              <p className="text-[11px] text-yellow-400 font-semibold pt-1">
                Top 1% earner in 2026
              </p>
            </div>
          </div>

          {/* Transaction History Ledger */}
          <div className="card-premium space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <History className="w-5 h-5 text-blue-400" /> Transaction History
              </h3>
              <span className="text-xs text-slate-400">Showing last 5 records</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-700/80 text-slate-400 uppercase text-[10px] tracking-wider">
                    <th className="pb-3 font-semibold">Date</th>
                    <th className="pb-3 font-semibold">Description</th>
                    <th className="pb-3 font-semibold">Type</th>
                    <th className="pb-3 font-semibold text-right">Amount ($)</th>
                    <th className="pb-3 font-semibold text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {transactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-slate-900/40 transition-colors">
                      <td className="py-3.5 text-slate-400 whitespace-nowrap">{tx.date}</td>
                      <td className="py-3.5 text-white font-medium">{tx.title}</td>
                      <td className="py-3.5 capitalize">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          tx.type === 'credit'
                            ? 'bg-emerald-500/10 text-emerald-400'
                            : 'bg-rose-500/10 text-rose-400'
                        }`}>
                          {tx.type}
                        </span>
                      </td>
                      <td className={`py-3.5 text-right font-bold whitespace-nowrap ${
                        tx.type === 'credit' ? 'text-emerald-400' : 'text-slate-300'
                      }`}>
                        {tx.type === 'credit' ? '+' : '-'}${tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </td>
                      <td className="py-3.5 text-right">
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                          {tx.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </main>
      </div>

      {/* Withdraw Modal */}
      {withdrawModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="max-w-md w-full card-premium border-yellow-400/40 p-6 space-y-5 relative">
            <button
              onClick={() => setWithdrawModal(false)}
              className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {withdrawSuccess ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">Withdrawal Processed!</h3>
                <p className="text-xs text-slate-400">
                  ${withdrawAmount} has been sent to your chosen {payoutMethod} account.
                </p>
              </div>
            ) : (
              <form onSubmit={handleWithdrawSubmit} className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-yellow-400/10 text-yellow-400">
                    <WalletIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Withdraw Funds</h3>
                    <p className="text-xs text-slate-400">Instant payout via secure gateway</p>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Withdrawal Amount ($ USD)
                  </label>
                  <input
                    type="number"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    max={user?.walletBalance || 4950}
                    min="20"
                    required
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-yellow-400"
                  />
                  <p className="text-[10px] text-slate-500 mt-1">
                    Max available: ${user?.walletBalance ? user.walletBalance.toLocaleString() : '4,950.00'}
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Select Payout Method
                  </label>
                  <select
                    value={payoutMethod}
                    onChange={(e) => setPayoutMethod(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="Direct Nigerian Bank Transfer (NGN)">Direct Nigerian Bank Transfer (NGN / OPay / GTBank)</option>
                    <option value="USDT / Crypto (TRC20 / BEP20)">Crypto Stablecoin (USDT / USDC)</option>
                    <option value="PayPal">PayPal Global Transfer</option>
                    <option value="Wise / US Wire">Wise Multi-Currency ACH</option>
                  </select>
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setWithdrawModal(false)}
                    className="btn-secondary text-xs py-2 px-4"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-gold text-xs py-2 px-5 font-bold"
                  >
                    Confirm Withdrawal
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Wallet;
