import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { api } from '../services/api';
import Loading from '../components/Loading';
import {
  Users,
  Search,
  ShieldCheck,
  Crown,
  Trash2,
  CheckCircle2,
  XCircle,
  ExternalLink,
} from 'lucide-react';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await api.getAdminAllUsers();
        if (res.success && res.users) {
          setUsers(res.users);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleToggleVerify = (id) => {
    setUsers(prev =>
      prev.map(u => (u._id === id ? { ...u, isVerified: !u.isVerified } : u))
    );
  };

  const filteredUsers = users.filter((u) => {
    const term = search.toLowerCase();
    const matchesSearch = u.name.toLowerCase().includes(term) || u.email.toLowerCase().includes(term);
    const matchesRole = roleFilter === 'All' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex gap-8">
        <Sidebar isAdminView={true} />

        <main className="flex-1 min-w-0 space-y-6">
          <div>
            <h1 className="text-2xl font-extrabold text-white">Manage Platform Users</h1>
            <p className="text-xs text-slate-400">
              Verify credentials, manage user roles, and inspect freelancer profiles.
            </p>
          </div>

          {/* Filter Bar */}
          <div className="card-premium p-4 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, email, or WhatsApp..."
                className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="bg-slate-900 border border-slate-700 text-xs text-slate-300 rounded-xl px-3 py-2 focus:outline-none focus:border-blue-500"
            >
              <option value="All">All Roles</option>
              <option value="freelancer">Freelancers</option>
              <option value="client">Clients</option>
              <option value="admin">Admins</option>
            </select>
          </div>

          {/* Table */}
          {loading ? (
            <Loading text="Loading user records..." />
          ) : (
            <div className="card-premium p-0 overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-700/80 bg-slate-900/60 text-slate-400 uppercase text-[10px] tracking-wider">
                    <th className="p-4 font-semibold">User</th>
                    <th className="p-4 font-semibold">Role</th>
                    <th className="p-4 font-semibold">Contact</th>
                    <th className="p-4 font-semibold">Rating / Success</th>
                    <th className="p-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {filteredUsers.map((u) => (
                    <tr key={u._id} className="hover:bg-slate-900/40 transition-colors">
                      <td className="p-4 flex items-center gap-3">
                        <img
                          src={u.avatar || '/images/waris_profile.jpg'}
                          alt={u.name}
                          className="w-9 h-9 rounded-xl object-cover ring-1 ring-blue-500"
                          onError={(e) => {
                            e.target.src = '/images/waris_profile.jpg';
                          }}
                        />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <p className="font-bold text-white text-xs">{u.name}</p>
                            {u.isVerified && (
                              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" title="Verified" />
                            )}
                            {u.isTopRated && (
                              <Crown className="w-3.5 h-3.5 text-yellow-400" title="Top Rated" />
                            )}
                          </div>
                          <p className="text-[11px] text-slate-400">{u.email}</p>
                        </div>
                      </td>

                      <td className="p-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold capitalize ${
                          u.role === 'admin'
                            ? 'bg-yellow-400/10 text-yellow-400 border border-yellow-400/30'
                            : u.role === 'client'
                            ? 'bg-purple-500/10 text-purple-400 border border-purple-500/30'
                            : 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                        }`}>
                          {u.role}
                        </span>
                      </td>

                      <td className="p-4">
                        <p className="text-white font-medium">{u.phone || u.whatsapp || '09077108987'}</p>
                        <p className="text-[11px] text-slate-500">{u.location || 'Remote'}</p>
                      </td>

                      <td className="p-4">
                        <p className="text-yellow-400 font-bold">{u.rating || 5.0}</p>
                        <p className="text-[11px] text-emerald-400 font-medium">100% Success</p>
                      </td>

                      <td className="p-4 text-right">
                        <button
                          onClick={() => handleToggleVerify(u._id)}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-colors ${
                            u.isVerified
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                              : 'bg-slate-800 text-slate-300 border-slate-700'
                          }`}
                        >
                          {u.isVerified ? 'Verified' : 'Verify'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ManageUsers;
