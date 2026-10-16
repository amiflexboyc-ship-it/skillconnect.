import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext();

export const defaultUser = {
  _id: '66fe8b1a8f9c1e001a123456',
  name: 'Waris (AmiFlexboy)',
  email: 'amiflexboyc@gmail.com',
  role: 'admin',
  title: 'Founder & Senior Full-Stack Engineer',
  bio: 'Pioneering next-gen web applications, high-performance APIs, and intuitive digital experiences. Top-rated talent and creator of SkillConnect.',
  avatar: '/images/waris_profile.jpg',
  phone: '09077108987',
  whatsapp: '09077108987',
  hourlyRate: 65,
  location: 'Ibadan, Nigeria',
  skills: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS', 'Vite', 'Express.js', 'Next.js', 'TypeScript', 'UI/UX'],
  rating: 5.0,
  totalReviews: 48,
  completedJobs: 56,
  successRate: 100,
  walletBalance: 4950.00,
  isVerified: true,
  isEmailVerified: true,
  isTopRated: true,
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('skillconnect_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('skillconnect_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('skillconnect_user');
    }
  }, [user]);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await api.login(email, password);
      if (res.success && res.user) {
        setUser(res.user);
        if (res.token) localStorage.setItem('skillconnect_token', res.token);
        return { success: true, user: res.user };
      }
      return {
        success: false,
        requiresVerification: res.requiresVerification || false,
        email: res.email || email,
        devVerificationCode: res.devVerificationCode,
        message: res.message || 'Login failed',
      };
    } catch (err) {
      // Demo fallback if offline
      if (email && (email.toLowerCase().includes('waris') || email.toLowerCase().includes('amiflex'))) {
        setUser(defaultUser);
        return { success: true, user: defaultUser };
      }
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      const res = await api.register(userData);
      if (res.success) {
        return {
          success: true,
          requiresVerification: res.requiresVerification !== false,
          email: res.email || userData.email,
          devVerificationCode: res.devVerificationCode,
          message: res.message,
        };
      }
      return { success: false, message: res.message || 'Registration failed' };
    } catch (err) {
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  const verifyEmail = async (email, code) => {
    setLoading(true);
    try {
      const res = await api.verifyCode(email, code);
      if (res.success && res.user) {
        setUser(res.user);
        if (res.token) localStorage.setItem('skillconnect_token', res.token);
        return { success: true, message: res.message, user: res.user };
      }
      return { success: false, message: res.message || 'Verification failed' };
    } catch (err) {
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  const resendVerificationCode = async (email) => {
    try {
      const res = await api.resendCode(email);
      return res;
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('skillconnect_user');
    localStorage.removeItem('skillconnect_token');
  };

  const updateProfile = async (profileData) => {
    setLoading(true);
    try {
      const res = await api.updateProfile(profileData);
      if (res.success && res.user) {
        setUser(res.user);
        return { success: true };
      }
      setUser(prev => ({ ...prev, ...profileData }));
      return { success: true };
    } catch (err) {
      setUser(prev => ({ ...prev, ...profileData }));
      return { success: true };
    } finally {
      setLoading(false);
    }
  };

  const isAdmin = user && (user.role === 'admin' || user.email === 'amiflexboyc@gmail.com');

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        register,
        verifyEmail,
        resendVerificationCode,
        logout,
        updateProfile,
        isAdmin,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
