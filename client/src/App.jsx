import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

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

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-[#0B1120] text-white">
          <Navbar />
          <div className="flex-1">
            <Routes>
              {/* User Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/verify-email" element={<VerifyEmail />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/explore-skills" element={<ExploreSkills />} />
              <Route path="/freelancers" element={<Freelancers />} />
              <Route path="/freelancers/:id" element={<FreelancerProfile />} />
              <Route path="/freelancer-profile" element={<FreelancerProfile />} />
              <Route path="/post-job" element={<PostJob />} />
              <Route path="/find-jobs" element={<FindJobs />} />
              <Route path="/jobs/:id" element={<FindJobs />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/wallet" element={<Wallet />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/settings" element={<Settings />} />

              {/* Admin Routes */}
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<ManageUsers />} />
              <Route path="/admin/jobs" element={<ManageJobs />} />
              <Route path="/admin/messages" element={<ContactMessages />} />
              <Route path="/admin/notifications" element={<AdminNotifications />} />
              <Route path="/admin/reports" element={<Reports />} />
              <Route path="/admin/analytics" element={<Analytics />} />

              {/* Catch-all 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
