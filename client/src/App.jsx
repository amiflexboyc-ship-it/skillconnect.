import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import VerifyEmail from './pages/VerifyEmail';
import Dashboard from './pages/Dashboard';
import ExploreSkills from './pages/ExploreSkills';
import Freelancers from './pages/Freelancers';
import FreelancerProfile from './pages/FreelancerProfile';
import PostJob from './pages/PostJob';
import FindJobs from './pages/FindJobs';
import Messages from './pages/Messages';
import Projects from './pages/Projects';
import Wallet from './pages/Wallet';
import Notifications from './pages/Notifications';
import Contact from './pages/Contact';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';

// Admin
import AdminDashboard from './admin/AdminDashboard';
import ManageUsers from './admin/ManageUsers';
import ManageJobs from './admin/ManageJobs';
import ContactMessages from './admin/ContactMessages';
import AdminNotifications from './admin/AdminNotifications';
import Reports from './admin/Reports';
import Analytics from './admin/Analytics';

// Protected Route: Gates ALL website pages - users CANNOT access without signing up / logging in
const RequireAuth = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/register" state={{ from: location }} replace />;
  }

  return children;
};

// Public Auth Route: If user is already authenticated, redirect to /dashboard
const PublicAuthRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-[#0B1120] text-white">
          <Navbar />
          <div className="flex-1 pt-20 sm:pt-24">
            <Routes>
              {/* Public Authentication Gateways */}
              <Route
                path="/register"
                element={
                  <PublicAuthRoute>
                    <Register />
                  </PublicAuthRoute>
                }
              />
              <Route
                path="/login"
                element={
                  <PublicAuthRoute>
                    <Login />
                  </PublicAuthRoute>
                }
              />
              <Route path="/verify-email" element={<VerifyEmail />} />

              {/* Protected Routes: NO access without sign up */}
              <Route
                path="/"
                element={
                  <RequireAuth>
                    <Home />
                  </RequireAuth>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <RequireAuth>
                    <Dashboard />
                  </RequireAuth>
                }
              />
              <Route
                path="/explore-skills"
                element={
                  <RequireAuth>
                    <ExploreSkills />
                  </RequireAuth>
                }
              />
              <Route
                path="/freelancers"
                element={
                  <RequireAuth>
                    <Freelancers />
                  </RequireAuth>
                }
              />
              <Route
                path="/freelancers/:id"
                element={
                  <RequireAuth>
                    <FreelancerProfile />
                  </RequireAuth>
                }
              />
              <Route
                path="/freelancer-profile"
                element={
                  <RequireAuth>
                    <FreelancerProfile />
                  </RequireAuth>
                }
              />
              <Route
                path="/post-job"
                element={
                  <RequireAuth>
                    <PostJob />
                  </RequireAuth>
                }
              />
              <Route
                path="/find-jobs"
                element={
                  <RequireAuth>
                    <FindJobs />
                  </RequireAuth>
                }
              />
              <Route
                path="/jobs/:id"
                element={
                  <RequireAuth>
                    <FindJobs />
                  </RequireAuth>
                }
              />
              <Route
                path="/messages"
                element={
                  <RequireAuth>
                    <Messages />
                  </RequireAuth>
                }
              />
              <Route
                path="/projects"
                element={
                  <RequireAuth>
                    <Projects />
                  </RequireAuth>
                }
              />
              <Route
                path="/wallet"
                element={
                  <RequireAuth>
                    <Wallet />
                  </RequireAuth>
                }
              />
              <Route
                path="/notifications"
                element={
                  <RequireAuth>
                    <Notifications />
                  </RequireAuth>
                }
              />
              <Route
                path="/contact"
                element={
                  <RequireAuth>
                    <Contact />
                  </RequireAuth>
                }
              />
              <Route
                path="/settings"
                element={
                  <RequireAuth>
                    <Settings />
                  </RequireAuth>
                }
              />

              {/* Admin Routes */}
              <Route
                path="/admin"
                element={
                  <RequireAuth>
                    <AdminDashboard />
                  </RequireAuth>
                }
              />
              <Route
                path="/admin/users"
                element={
                  <RequireAuth>
                    <ManageUsers />
                  </RequireAuth>
                }
              />
              <Route
                path="/admin/jobs"
                element={
                  <RequireAuth>
                    <ManageJobs />
                  </RequireAuth>
                }
              />
              <Route
                path="/admin/messages"
                element={
                  <RequireAuth>
                    <ContactMessages />
                  </RequireAuth>
                }
              />
              <Route
                path="/admin/notifications"
                element={
                  <RequireAuth>
                    <AdminNotifications />
                  </RequireAuth>
                }
              />
              <Route
                path="/admin/reports"
                element={
                  <RequireAuth>
                    <Reports />
                  </RequireAuth>
                }
              />
              <Route
                path="/admin/analytics"
                element={
                  <RequireAuth>
                    <Analytics />
                  </RequireAuth>
                }
              />

              {/* Catch-all 404: Unauthenticated visitors redirected to /register */}
              <Route
                path="*"
                element={
                  <RequireAuth>
                    <NotFound />
                  </RequireAuth>
                }
              />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
