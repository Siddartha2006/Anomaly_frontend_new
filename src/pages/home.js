// Updated Home.js with white and blue theme and improved design
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { HiChartBar, HiLightBulb, HiDocumentText, HiSupport } from 'react-icons/hi';
import { FaLinkedin, FaTwitter, FaGithub } from 'react-icons/fa';
import './home.css';

const Home = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [activeFeature, setActiveFeature] = useState(null);

  const features = [
    {
      icon: <HiChartBar className="feature-icon" />,
      title: "Real-time Analytics",
      description: "Monitor and analyze data streams in real-time with advanced visualization tools."
    },
    {
      icon: <HiLightBulb className="feature-icon" />,
      title: "Smart Detection",
      description: "AI-powered anomaly detection with machine learning algorithms."
    },
    {
      icon: <HiDocumentText className="feature-icon" />,
      title: "Detailed Reports",
      description: "Generate comprehensive reports with actionable insights."
    },
    {
      icon: <HiSupport className="feature-icon" />,
      title: "24/7 Monitoring",
      description: "Continuous system monitoring with instant alert notifications."
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleExplore = () => navigate('/technology');
  const handleRequestDemo = () => navigate('/contact');

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loader"></div>
        <p>Loading amazing features...</p>
      </div>
    );
  }

  return (
    <div className="home-container">
      <nav className="home-nav">
        <div className="nav-logo">
          <span className="logo-text">AE</span>
          <span>Anomaly Eye</span>
        </div>
        <div className="nav-links">
          <Link to="/home">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/technology">Technology</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/contact">Contact</Link>
          <div className="auth-buttons">
            <button onClick={() => navigate('/login')} className="login-btn">Login</button>
            <button onClick={() => navigate('/signup')} className="signup-btn">Sign Up</button>
          </div>
        </div>
      </nav>

      <header className="hero-section">
        <div className="hero-content">
          <h1>
            <span className="hero-title">AI-Powered Industrial</span>
            <span className="hero-subtitle">Anomaly Detection</span>
          </h1>
          <p className="hero-description">
            Enhance product quality and streamline operations with our advanced
            defect detection system, leveraging synthetic data augmentation and
            Transformer-based deep learning.
          </p>
          <div className="hero-buttons">
            <button onClick={handleExplore} className="explore-btn">Explore Technology</button>
            <button onClick={handleRequestDemo} className="demo-btn">Request Demo</button>
          </div>
        </div>
      </header>

      <section className="features-section">
        <h2>Key Features</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`feature-card ${activeFeature === index ? 'active' : ''}`}
              onMouseEnter={() => setActiveFeature(index)}
              onMouseLeave={() => setActiveFeature(null)}
            >
              {feature.icon}
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="home-footer">
        <div className="footer-content">
          <div className="footer-section brand">
            <div className="footer-logo">
              <span className="logo-text">AE</span>
              <span>Anomaly Eye</span>
            </div>
            <p className="footer-description">
              Advanced AI-driven anomaly detection for industrial sectors.
              Enhancing defect identification with synthetic data and
              transformer-based deep learning.
            </p>
            <div className="social-links">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
            </div>
          </div>
          <div className="footer-section">
            <h4>Site Links</h4>
            <ul>
              <li><Link to="/home">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/technology">Technology</Link></li>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Resources</h4>
            <ul>
              <li><Link to="/documentation">Documentation</Link></li>
              <li><Link to="/api-reference">API Reference</Link></li>
              <li><Link to="/case-studies">Case Studies</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2024 Anomaly Eye. All rights reserved.</p>
          <p>Designed with precision for industrial excellence</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;