import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './technology.css';

const Technology = () => {
  const navigate = useNavigate();

  return (
    <div className="technology-container">
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

      <div className="technology-content">
        <h2>Technology Behind Anomaly Detection</h2>
        <p>
          This platform leverages state-of-the-art AI models for detecting anomalies in industrial environments.
        </p>

        <div className="tech-list">
          <h3>Core Technologies:</h3>
          <ul>
            <li>🔹 Python for backend processing</li>
            <li>🔹 GANs & Diffusion Models for synthetic data generation</li>
            <li>🔹 Transformer Models for anomaly classification</li>
            <li>🔹 React.js for the interactive UI</li>
            <li>🔹 Flask / FastAPI for API integration (custom backend)</li>
          </ul>
        </div>

        <div className="model-desc">
          <h3>Model Description:</h3>
          <p>
            The model is trained on synthetic industrial defect data using GANs and fine-tuned using transformer-based architectures like Vision Transformers (ViTs). This enables real-time insights with high accuracy.
          </p>
        </div>
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

export default Technology;
