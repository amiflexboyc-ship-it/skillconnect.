const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const getHeaders = () => {
  const token = localStorage.getItem('skillconnect_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const api = {
  // Auth
  async login(email, password) {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ email, password }),
    });
    return res.json();
  },

  async register(userData) {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(userData),
    });
    return res.json();
  },

  async getMe() {
    const res = await fetch(`${BASE_URL}/auth/me`, {
      headers: getHeaders(),
    });
    return res.json();
  },

  // Users & Freelancers
  async getFreelancers(params = {}) {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${BASE_URL}/users/freelancers?${query}`);
    return res.json();
  },

  async getUserById(id) {
    const res = await fetch(`${BASE_URL}/users/${id}`);
    return res.json();
  },

  async updateProfile(profileData) {
    const res = await fetch(`${BASE_URL}/users/profile`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(profileData),
    });
    return res.json();
  },

  async getAdminAllUsers() {
    const res = await fetch(`${BASE_URL}/users/admin/all`, {
      headers: getHeaders(),
    });
    return res.json();
  },

  // Jobs
  async getJobs(params = {}) {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${BASE_URL}/jobs?${query}`);
    return res.json();
  },

  async getJobById(id) {
    const res = await fetch(`${BASE_URL}/jobs/${id}`);
    return res.json();
  },

  async createJob(jobData) {
    const res = await fetch(`${BASE_URL}/jobs`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(jobData),
    });
    return res.json();
  },

  async deleteJob(id) {
    const res = await fetch(`${BASE_URL}/jobs/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    return res.json();
  },

  // Projects
  async getProjects() {
    const res = await fetch(`${BASE_URL}/projects`, {
      headers: getHeaders(),
    });
    return res.json();
  },

  async createProject(projectData) {
    const res = await fetch(`${BASE_URL}/projects`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(projectData),
    });
    return res.json();
  },

  // Contact
  async sendContactMessage(data) {
    const res = await fetch(`${BASE_URL}/contact`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async getContactMessages() {
    const res = await fetch(`${BASE_URL}/contact`, {
      headers: getHeaders(),
    });
    return res.json();
  },

  async updateContactStatus(id, status) {
    const res = await fetch(`${BASE_URL}/contact/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify({ status }),
    });
    return res.json();
  },

  // Notifications
  async getNotifications() {
    const res = await fetch(`${BASE_URL}/notifications`, {
      headers: getHeaders(),
    });
    return res.json();
  },

  async markNotificationRead(id) {
    const res = await fetch(`${BASE_URL}/notifications/${id}/read`, {
      method: 'PUT',
      headers: getHeaders(),
    });
    return res.json();
  },

  async markAllNotificationsRead() {
    const res = await fetch(`${BASE_URL}/notifications/read-all`, {
      method: 'PUT',
      headers: getHeaders(),
    });
    return res.json();
  },
};
