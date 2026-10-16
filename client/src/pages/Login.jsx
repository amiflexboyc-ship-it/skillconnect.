import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, ArrowRight, ShieldCheck, UserCheck, Briefcase, Sparkles } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [unverifiedEmail, setUnverifiedEmail] = useState(null);
  const [devCode, setDevCode] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setUnverifiedEmail(null);
    setLoading(true);
    const res = await login(email, password);
    setLoading(false);
    if (res.success) {
      navigate('/dashboard');
    } else {
      if (res.requiresVerification) {
        setUnverifiedEmail(res.email || email);
        setDevCode(res.devVerificationCode || null);
        setError(res.message || 'Please verify your email before logging in.');
      } else {
        setError(res.message || 'Invalid credentials');
      }
    }
  };

  const quickLogin = async (userEmail, userPass = 'password123') => {
    setEmail(userEmail);
    setPassword(userPass);
    setLoading(true);
    const res = await login(userEmail, userPass);
    setLoading(false);
    if (res.success) {
      navigate('/dashboard');
    } else {
      setError(res.message || 'Quick login error');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-semibold mb-1 shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            <span>Sign in to access your SkillConnect workspace</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white">Welcome Back</h2>
          <p className="text-xs text-slate-400">
            Sign in to access your SkillConnect workspace and contracts
          </p>
        </div>

        {/* Quick Demo Login Cards */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-700/80 space-y-2.5">
          <p className="text-[11px] font-bold uppercase tracking-wider text-yellow-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> 1-Click Demo Profiles
          </p>

          <div className="grid grid-cols-1 gap-2">
            <button
              type="button"
              onClick={() => quickLogin('amiflexboyc@gmail.com')}
              className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-750 border border-yellow-400/30 text-left transition-colors group"
            >
              <div className="flex items-center gap-2.5">
                <img src="/images/waris_profile.jpg" alt="Waris" className="w-8 h-8 rounded-lg object-cover ring-1 ring-yellow-400" />
                <div>
                  <p className="text-xs font-bold text-white group-hover:text-yellow-400 transition-colors">Waris (AmiFlexboy)</p>
                  <p className="text-[10px] text-yellow-400">Founder & Admin • 09077108987</p>
                </div>
              </div>
              <span className="text-[11px] font-semibold text-yellow-400 bg-yellow-400/10 px-2 py-1 rounded-md">Log In →</span>
            </button>

            <button
              type="button"
              onClick={() => quickLogin('elena.rostova@techcorp.io')}
              className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-750 border border-slate-700 text-left transition-colors group"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors">Elena Rostova</p>
                  <p className="text-[10px] text-slate-400">Verified Client (Hiring)</p>
                </div>
              </div>
              <span className="text-[11px] font-semibold text-blue-400 bg-blue-500/10 px-2 py-1 rounded-md">Log In →</span>
            </button>
          </div>
        </div>

        {/* Main Form */}
        <div className="card-premium">
          {error && (
            <div className="mb-4 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs space-y-2">
              <p>{error}</p>
              {unverifiedEmail && (
                <button
                  type="button"
                  onClick={() =>
                    navigate('/verify-email', {
                      state: {
                        email: unverifiedEmail,
                        devVerificationCode: devCode,
                        message: 'Enter the 6-digit code sent to your email to verify and log in.',
                      },
                    })
                  }
                  className="w-full mt-2 py-2 px-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-md shadow-blue-500/20"
                >
                  <span>Enter Verification Code Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-300">
                  Password
                </label>
                <a href="#forgot" className="text-xs text-blue-400 hover:underline">Forgot?</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-3 text-sm font-bold mt-2"
            >
              {loading ? 'Authenticating...' : 'Sign In to SkillConnect'}
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-slate-400">
            Don't have an account yet?{' '}
            <Link to="/register" className="text-yellow-400 font-bold hover:underline">
              Sign Up Now
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;
