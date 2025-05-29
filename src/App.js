import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Dashboard from './pages/dashboard';
import LoginPage from './pages/LoginPage';
import SignUp from './pages/SignUp';
import Technology from './pages/technology';
import Contact from './pages/contact';
import About from './pages/about';
import History from './pages/History';
import AdminLogin from './pages/AdminLogin';
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Default route shows SignUp */}
        <Route path="/" element={<SignUp />} />

        {/* Other routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/technology" element={<Technology />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/home" element={<Home />} />
        <Route path="/history" element={<History />} />
        <Route path="/admin-login" element={<AdminLogin />} />
      </Routes>
    </Router>
  );
};

export default App;
