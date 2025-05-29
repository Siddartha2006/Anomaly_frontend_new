import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import components from the correct paths based on your first App.js structure
import Home from './pages/home';
import Dashboard from './pages/dashboard';
import LoginPage from './pages/LoginPage';
import SignUp from './pages/SignUp';
import Technology from './pages/technology';
import Contact from './pages/contact';
import About from './pages/about';
import History from './pages/History';
import AdminLogin from './pages/AdminLogin';

// If you have additional components from the second structure, uncomment these:
import UserHistory from './pages/UserHistory';

import './App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Default route redirects to home instead of signup for better UX */}
          <Route path="/" element={<Navigate to="/home" replace />} />
          
          {/* Public Routes */}
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/technology" element={<Technology />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* Auth Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/register" element={<SignUp />} /> {/* Alias for signup */}
          <Route path="/admin-login" element={<AdminLogin />} />
          
          {/* Protected Routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/history" element={<History />} />
          <Route path="/user-history" element={<UserHistory />} />
          
          {/* Catch all route - redirects unknown paths to home */}
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;