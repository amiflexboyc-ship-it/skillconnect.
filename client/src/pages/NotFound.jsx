import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="text-center space-y-6 max-w-md">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
          <span className="text-4xl font-black">404</span>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-extrabold text-white">Page Not Found</h1>
          <p className="text-xs text-slate-400">
            The page or resource you are looking for has been moved, removed, or never existed on SkillConnect.
          </p>
        </div>

        <div className="flex items-center justify-center gap-3">
          <Link to="/" className="btn-primary text-xs py-2.5 px-5">
            <Home className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
          <Link to="/find-jobs" className="btn-secondary text-xs py-2.5 px-4">
            <span>Browse Jobs</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
