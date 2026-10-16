import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, ShieldCheck, ArrowRight, RotateCw, CheckCircle2, AlertCircle, ArrowLeft, KeyRound } from 'lucide-react';

const VerifyEmail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { verifyEmail, resendVerificationCode } = useAuth();

  // Extract email & dev code from navigation state or URL query params
  const queryParams = new URLSearchParams(location.search);
  const initialEmail = location.state?.email || queryParams.get('email') || '';
  const initialDevCode = location.state?.devVerificationCode || queryParams.get('code') || '';

  const [email, setEmail] = useState(initialEmail);
  const [codeDigits, setCodeDigits] = useState(['', '', '', '', '', '']);
  const [devCode, setDevCode] = useState(initialDevCode);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState(location.state?.message || '');
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [cooldown, setCooldown] = useState(60);
  const [isVerifiedSuccess, setIsVerifiedSuccess] = useState(false);

  const inputRefs = useRef([]);

  // Resend cooldown timer
  useEffect(() => {
    let timer;
    if (cooldown > 0) {
      timer = setInterval(() => setCooldown((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [cooldown]);

  // Autofill if initialDevCode exists
  useEffect(() => {
    if (initialDevCode && initialDevCode.length === 6) {
      const digits = initialDevCode.split('').slice(0, 6);
      setCodeDigits(digits);
    }
  }, [initialDevCode]);

  // Handle individual digit input
  const handleDigitChange = (index, value) => {
    // Only accept numeric or empty
    const sanitized = value.replace(/\D/g, '');
    if (!sanitized) {
      const updated = [...codeDigits];
      updated[index] = '';
      setCodeDigits(updated);
      return;
    }

    const updated = [...codeDigits];
    updated[index] = sanitized[sanitized.length - 1]; // take last character
    setCodeDigits(updated);

    // Auto focus next input
    if (index < 5 && sanitized) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !codeDigits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').trim().replace(/\D/g, '');
    if (pasteData.length > 0) {
      const digits = pasteData.slice(0, 6).split('');
      const updated = [...codeDigits];
      digits.forEach((digit, idx) => {
        if (idx < 6) updated[idx] = digit;
      });
      setCodeDigits(updated);
      const nextFocus = Math.min(digits.length, 5);
      inputRefs.current[nextFocus]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setError('');
    const fullCode = codeDigits.join('').trim();

    if (!email) {
      setError('Please provide your registered email address.');
      return;
    }

    if (fullCode.length !== 6) {
      setError('Please enter all 6 digits of your verification code.');
      return;
    }

    setLoading(true);
    const res = await verifyEmail(email, fullCode);
    setLoading(false);

    if (res.success) {
      setIsVerifiedSuccess(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } else {
      setError(res.message || 'Invalid or expired verification code.');
    }
  };

  const handleResend = async () => {
    if (cooldown > 0 || resending) return;
    if (!email) {
      setError('Please enter your email to resend the code.');
      return;
    }

    setResending(true);
    setError('');
    setSuccessMsg('');
    const res = await resendVerificationCode(email);
    setResending(false);

    if (res.success) {
      setSuccessMsg(res.message || 'A fresh 6-digit verification code has been sent!');
      setCooldown(60);
      if (res.devVerificationCode) {
        setDevCode(res.devVerificationCode);
        const digits = res.devVerificationCode.split('').slice(0, 6);
        setCodeDigits(digits);
      }
    } else {
      setError(res.message || 'Failed to resend code.');
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full space-y-6">

        {/* Verification Success Screen */}
        {isVerifiedSuccess ? (
          <div className="card-premium text-center py-10 space-y-4 animate-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/30">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-black text-white">Email Verified!</h2>
            <p className="text-xs text-slate-300 max-w-xs mx-auto">
              Your SkillConnect account is now verified and active. Redirecting you to your dashboard...
            </p>
            <div className="pt-2">
              <span className="inline-block w-6 h-6 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin"></span>
            </div>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="text-center space-y-2">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/30 text-blue-400 shadow-lg shadow-blue-500/10 mb-2">
                <Mail className="w-7 h-7" />
              </div>
              <h2 className="text-3xl font-extrabold text-white">Verify Your Email</h2>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                We've sent a 6-digit security code to{' '}
                <span className="text-white font-semibold underline decoration-yellow-400/50">
                  {email || 'your email'}
                </span>
                . Please enter it below to activate your account.
              </p>
            </div>

            {/* Dev helper banner */}
            {devCode && (
              <div className="p-3.5 rounded-xl bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-xs flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <KeyRound className="w-4 h-4 text-yellow-400 shrink-0" />
                  <span>
                    Your verification code: <strong className="text-yellow-300 font-mono tracking-widest text-sm">{devCode}</strong>
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const digits = devCode.split('').slice(0, 6);
                    setCodeDigits(digits);
                  }}
                  className="text-[11px] bg-yellow-400/20 hover:bg-yellow-400/30 text-yellow-300 px-2 py-1 rounded font-semibold transition-colors"
                >
                  Auto-fill
                </button>
              </div>
            )}

            {/* Main Card */}
            <div className="card-premium">
              {error && (
                <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {successMsg && !error && (
                <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{successMsg}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email address field if not prefilled */}
                {!initialEmail && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Confirm Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your-email@example.com"
                      required
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                )}

                {/* 6 Digit OTP Inputs */}
                <div>
                  <label className="block text-center text-xs font-semibold text-slate-300 mb-3">
                    Enter 6-Digit Code
                  </label>
                  <div className="flex items-center justify-center gap-2 sm:gap-3" onPaste={handlePaste}>
                    {codeDigits.map((digit, idx) => (
                      <input
                        key={idx}
                        ref={(el) => (inputRefs.current[idx] = el)}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleDigitChange(idx, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(idx, e)}
                        className="w-11 h-14 sm:w-12 sm:h-14 text-center text-xl font-mono font-bold rounded-xl bg-slate-900 border border-slate-700 text-yellow-400 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all shadow-inner"
                      />
                    ))}
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading || codeDigits.join('').length !== 6}
                  className="w-full btn-primary py-3 text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <RotateCw className="w-4 h-4 animate-spin" />
                      <span>Verifying Code...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      <span>Verify Email & Activate Account</span>
                    </>
                  )}
                </button>
              </form>

              {/* Resend actions */}
              <div className="mt-6 pt-5 border-t border-slate-800 text-center space-y-3">
                <p className="text-xs text-slate-400">
                  Didn't receive the email? Check spam or resend code:
                </p>
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={cooldown > 0 || resending}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 disabled:text-slate-500 transition-colors"
                >
                  <RotateCw className={`w-3.5 h-3.5 ${resending ? 'animate-spin' : ''}`} />
                  <span>
                    {cooldown > 0 ? `Resend code in ${cooldown}s` : 'Resend Verification Code'}
                  </span>
                </button>
              </div>

              {/* Back to sign in */}
              <div className="mt-4 text-center">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Sign In</span>
                </Link>
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  );
};

export default VerifyEmail;
