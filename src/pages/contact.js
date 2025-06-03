import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './contact.css';

const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('http://127.0.0.1:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          username: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message
        })
      });

      const data = await response.json();

      if (response.ok && data.status === 'success') {
        setSubmitStatus('success');
        // Reset form after successful submission
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: ''
        });
      } else {
        setSubmitStatus('error');
        console.error('Error:', data.message || 'Unknown error');
      }
    } catch (error) {
      setSubmitStatus('error');
      console.error('Network error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const faqs = [
    {
      question: "What types of defects can you detect?",
      answer: "Our system can detect various industrial defects including surface anomalies, structural irregularities, and quality deviations using advanced AI algorithms and computer vision technology."
    },
    {
      question: "How is the system integrated in an existing production line?",
      answer: "Integration is seamless through our modular architecture. We provide comprehensive support for hardware setup, software installation, and staff training to ensure smooth implementation."
    },
    {
      question: "Can I request a live demo?",
      answer: "Yes! We offer personalized demonstrations of our system. Please fill out the contact form above, and our team will schedule a demo tailored to your needs."
    },
    {
      question: "Can the system run in real-time?",
      answer: "Yes, our system processes data in real-time, providing immediate alerts and analysis for production line monitoring and quality control."
    }
  ];

  return (
    <div className="contact-container">
      <nav className="home-nav">
        <div className="nav-logo">
          <span className="logo-text">AE</span>
          <span>Anomaly Eye</span>
        </div>
        <div className="nav-links">
          <a href="/home">Home</a>
          <a href="/about">About</a>
          <a href="/technology">Technology</a>
          <a href="/dashboard">Dashboard</a>
          <a href="/contact">Contact</a>
          <div className="auth-buttons">
            <button onClick={() => navigate('/')} className="login-btn">Login</button>
            <button onClick={() => navigate('/signup')} className="signup-btn">Sign Up</button>
          </div>
        </div>
      </nav>

      <div className="contact-content">
        <h1>Contact Us</h1>
        <p className="contact-subtitle">Get in touch with our team today for a detailed discussion about how we can help your business.</p>

        <div className="contact-grid">
          <div className="contact-form-section glass-card">
            <div className="form-header">
              <h2>Get In Touch</h2>
              <p className="form-subtitle">Let's discuss how we can enhance your industrial processes</p>
            </div>

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div className="status-message success">
                <i className="fas fa-check-circle"></i>
                <p>Thank you! Your message has been sent successfully. We'll get back to you soon.</p>
              </div>
            )}
            {submitStatus === 'error' && (
              <div className="status-message error">
                <i className="fas fa-exclamation-circle"></i>
                <p>Sorry, there was an error sending your message. Please try again later.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="modern-form">
              <div className="form-group">
                <div className="input-wrapper">
                  <i className="fas fa-user input-icon"></i>
                  <input
                    type="text"
                    name="name"
                    className="form-input"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="input-wrapper">
                  <i className="fas fa-envelope input-icon"></i>
                  <input
                    type="email"
                    name="email"
                    className="form-input"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="input-wrapper">
                  <i className="fas fa-phone input-icon"></i>
                  <input
                    type="tel"
                    name="phone"
                    className="form-input"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="input-wrapper">
                  <i className="fas fa-comment input-icon"></i>
                  <textarea
                    name="message"
                    className="form-input"
                    placeholder="Tell us about your needs..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    disabled={isSubmitting}
                  ></textarea>
                </div>
              </div>
              <button type="submit" className="btn-submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <span>Sending...</span>
                    <i className="fas fa-spinner fa-spin"></i>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <i className="fas fa-arrow-right"></i>
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="faq-section">
            <h2>Frequently Asked Questions</h2>
            <div className="faq-grid">
              {faqs.map((faq, index) => (
                <div key={index} className="faq-item">
                  <h3>{faq.question}</h3>
                  <p>{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
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
              <li onClick={() => navigate('/home')}>Home</li>
              <li onClick={() => navigate('/about')}>About</li>
              <li onClick={() => navigate('/technology')}>Technology</li>
              <li onClick={() => navigate('/dashboard')}>Dashboard</li>
              <li onClick={() => navigate('/contact')}>Contact</li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Resources</h4>
            <ul>
              <li onClick={() => navigate('/documentation')}>Documentation</li>
              <li onClick={() => navigate('/api-reference')}>API Reference</li>
              <li onClick={() => navigate('/blog')}>Blog</li>
              <li onClick={() => navigate('/privacy')}>Privacy Policy</li>
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

export default Contact;

