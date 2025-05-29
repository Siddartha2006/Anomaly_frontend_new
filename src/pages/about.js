import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './about.css';

const About = () => {
  const navigate = useNavigate();

  const stats = [
    { value: '97%', label: 'Detection Accuracy' },
    { value: '3.5x', label: 'Faster Processing' },
    { value: '45%', label: 'Cost Reduction' }
  ];

  const features = {
    technical: [
      'Advanced computer vision algorithms',
      'Real-time processing capabilities',
      'Scalable cloud infrastructure',
      'Custom model training options',
      'Automated reporting system'
    ],
    business: [
      'Reduced operational costs',
      'Improved quality control',
      'Enhanced productivity',
      'Predictive maintenance',
      'Comprehensive analytics'
    ]
  };

  return (
    <div className="about-container">
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
            <button onClick={() => navigate('/')} className="login-btn">Login</button>
            <button onClick={() => navigate('/signup')} className="signup-btn">Sign Up</button>
          </div>
        </div>
      </nav>

      <div className="about-content">
        <header className="about-header">
          <h1>About Anomaly Eye</h1>
          <p className="subtitle">Advanced AI-driven anomaly detection for industrial sectors</p>
        </header>

        <section className="mission-section">
          <h2>Our Mission</h2>
          <p>
            To revolutionize industrial quality control through cutting-edge AI technology and real-time data analysis. 
            We aim to enhance product quality and streamline operations while reducing costs and improving efficiency 
            through our innovative approach to intelligent visual inspection and anomaly detection.
          </p>
        </section>

        <section className="product-overview">
          <h2>Product Overview</h2>
          <p>
            Anomaly Eye combines advanced computer vision with state-of-the-art machine learning to create 
            a powerful defect detection system. Our platform processes real-time data streams to identify 
            and classify anomalies with unprecedented accuracy.
          </p>
          
          <div className="features-grid">
            <div className="features-column">
              <h3>Technical Features</h3>
              <ul>
                {features.technical.map((feature, index) => (
                  <li key={`tech-${index}`}>{feature}</li>
                ))}
              </ul>
            </div>
            <div className="features-column">
              <h3>Business Benefits</h3>
              <ul>
                {features.business.map((benefit, index) => (
                  <li key={`business-${index}`}>{benefit}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="impact-section">
          <h2>Impact & Benefits</h2>
          <div className="stats-container">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <h3>{stat.value}</h3>
                <p>{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="team-section">
          <h2>Our Team</h2>
          <p>
            We are powered by an extraordinary alignment of AI experts, computer vision specialists, 
            and industry professionals. Our diverse team brings together decades of combined experience 
            in machine learning, software development, and industrial automation.
          </p>
        </section>
      </div>

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

export default About;