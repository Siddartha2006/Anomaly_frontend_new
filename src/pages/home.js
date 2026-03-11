import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  HiChartBar,
  HiLightBulb,
  HiDocumentText,
  HiSupport,
  HiMenu,
  HiX,
  HiSparkles,
  HiShieldCheck,
} from 'react-icons/hi';
import { FaLinkedin, FaTwitter, FaGithub } from 'react-icons/fa';
import './home.css';

const Home = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [activeFeature, setActiveFeature] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const metrics = [
    { value: '99.4%', label: 'Detection Precision' },
    { value: '< 200ms', label: 'Alert Response Time' },
    { value: '24/7', label: 'Continuous Monitoring' },
  ];

  const features = [
    {
      icon: <HiChartBar className="feature-icon" />,
      title: 'Real-time Analytics',
      description:
        'Monitor and analyze data streams in real-time with advanced visualization tools.',
    },
    {
      icon: <HiLightBulb className="feature-icon" />,
      title: 'Smart Detection',
      description:
        'AI-powered anomaly detection with machine learning algorithms and adaptive thresholds.',
    },
    {
      icon: <HiDocumentText className="feature-icon" />,
      title: 'Detailed Reports',
      description:
        'Generate comprehensive reports with actionable insights and root-cause analysis.',
    },
    {
      icon: <HiSupport className="feature-icon" />,
      title: '24/7 Monitoring',
      description:
        'Continuous system monitoring with instant alerts for mission-critical operations.',
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const closeMenuAndNavigate = (path) => {
    setMenuOpen(false);
    navigate(path);
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loader" />
        <p>Preparing your anomaly intelligence dashboard...</p>
      </div>
    );
  }

  return (
    <div className="home-container">
      <nav className="home-nav">
        <div className="nav-logo" onClick={() => navigate('/home')}>
          <span className="logo-text">AE</span>
          <span>Anomaly Eye</span>
        </div>

        <button className="menu-toggle" onClick={() => setMenuOpen((prev) => !prev)} aria-label="Toggle menu">
          {menuOpen ? <HiX /> : <HiMenu />}
        </button>

        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <Link to="/home" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
          <Link to="/technology" onClick={() => setMenuOpen(false)}>Technology</Link>
          <Link to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
          <div className="auth-buttons">
            <button onClick={() => closeMenuAndNavigate('/login')} className="login-btn">Login</button>
            <button onClick={() => closeMenuAndNavigate('/signup')} className="signup-btn">Sign Up</button>
          </div>
        </div>
      </nav>

      <header className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">
            <HiSparkles /> Advanced Industrial AI Suite
          </div>
          <h1>
            <span className="hero-title">Next-Gen Anomaly Detection</span>
            <span className="hero-subtitle">Built for modern production systems</span>
          </h1>
          <p className="hero-description">
            Boost quality assurance with real-time event intelligence, transformer-powered vision models,
            and a responsive command center designed for teams on every screen size.
          </p>
          <div className="hero-buttons">
            <button onClick={() => navigate('/technology')} className="explore-btn">Explore Technology</button>
            <button onClick={() => navigate('/contact')} className="demo-btn">Request Demo</button>
          </div>
          <div className="metrics-grid">
            {metrics.map((metric) => (
              <article key={metric.label} className="metric-card">
                <h3>{metric.value}</h3>
                <p>{metric.label}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="hero-panel">
          <h3>Live Operations Snapshot</h3>
          <ul>
            <li><HiShieldCheck /> Active plants: 42</li>
            <li><HiShieldCheck /> Critical incidents: 0</li>
            <li><HiShieldCheck /> Performance trend: +18%</li>
          </ul>
        </div>
      </header>

      <section className="features-section">
        <h2>Key Features</h2>
        <p className="section-subtitle">Everything you need to keep quality, reliability, and speed in sync.</p>
        <div className="features-grid">
          {features.map((feature, index) => (
            <article
              key={feature.title}
              className={`feature-card ${activeFeature === index ? 'active' : ''}`}
              onMouseEnter={() => setActiveFeature(index)}
              onMouseLeave={() => setActiveFeature(null)}
            >
              {feature.icon}
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </article>
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
              Advanced AI-driven anomaly detection for industrial sectors, designed for reliable decision-making.
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
        </div>
        <div className="footer-bottom">
          <p>© 2024 Anomaly Eye. All rights reserved.</p>
          <p>Engineered for industrial excellence</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
