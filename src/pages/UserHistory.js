import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaImage, FaCalendarAlt, FaEye, FaSpinner } from 'react-icons/fa';
import './userHistory.css';

const UserHistory = () => {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    // Get username from localStorage
    try {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        if (user?.username) {
          setUsername(user.username);
          fetchUserHistory(user.username);
        } else {
          navigate('/login');
        }
      } else {
        navigate('/login');
      }
    } catch (error) {
      console.error('Error parsing user data:', error);
      navigate('/login');
    }
  }, [navigate]);

  const fetchUserHistory = async (username) => {
    try {
      setLoading(true);
      const response = await fetch(`http://127.0.0.1:5000/api/user-history/${username}`);
      const data = await response.json();
      
      if (data.status === 'success') {
        setHistory(data.history);
      } else {
        setError('Failed to fetch history');
      }
    } catch (err) {
      console.error('Error fetching history:', err);
      setError('Failed to fetch history');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  const handleImageClick = (record) => {
    setSelectedImage(record);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('adminToken');
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="user-history-wrapper">
        <nav className="dashboard-nav">
          <div className="nav-logo">
            <span className="logo-text">AE</span>
            <span className="logo-full">Anomaly Eye</span>
          </div>
          <div className="nav-links">
            <Link to="/home">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/technology">Technology</Link>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/contact">Contact</Link>
          </div>
          <div className="nav-profile">
            <div className="user-info">
              <span className="user-name">{username}</span>
              <span className="user-role">User</span>
            </div>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        </nav>
        <div className="loading-container">
          <FaSpinner className="spinner" />
          <p>Loading your history...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="user-history-wrapper">
      {/* Navbar */}
      <nav className="dashboard-nav">
        <div className="nav-logo">
          <span className="logo-text">AE</span>
          <span className="logo-full">Anomaly Eye</span>
        </div>
        <div className="nav-links">
          <Link to="/home">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/technology">Technology</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div className="nav-profile">
          <div className="user-info">
            <span className="user-name">{username}</span>
            <span className="user-role">User</span>
          </div>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="user-history-container">
        <header className="history-header">
          <button className="back-btn" onClick={() => navigate('/dashboard')}>
            <FaArrowLeft />
            Back to Dashboard
          </button>
          <h1>Your Analysis History</h1>
          <p className="subtitle">View all your previous image analysis results</p>
        </header>

        {error && (
          <div className="error-message">
            <p>{error}</p>
            <button onClick={() => fetchUserHistory(username)}>Retry</button>
          </div>
        )}

        {!error && (
          <div className="history-content">
            {history.length === 0 ? (
              <div className="no-history">
                <FaImage className="no-history-icon" />
                <h3>No Analysis History</h3>
                <p>You haven't analyzed any images yet.</p>
                <Link to="/dashboard" className="start-analyzing-btn">
                  Start Analyzing
                </Link>
              </div>
            ) : (
              <div className="history-grid">
                {history.map((record, index) => (
                  <div key={record._id || index} className="history-card">
                    <div className="card-header">
                      <FaCalendarAlt className="date-icon" />
                      <span className="date">{formatDate(record.timestamp)}</span>
                    </div>
                    
                    <div className="card-image" onClick={() => handleImageClick(record)}>
                      <img 
                        src={record.image_url} 
                        alt="Analysis" 
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div className="image-placeholder" style={{display: 'none'}}>
                        <FaImage />
                        <span>Image not available</span>
                      </div>
                      <div className="image-overlay">
                        <FaEye />
                        <span>View Details</span>
                      </div>
                    </div>

                    <div className="card-content">
                      <div className="result-info">
                        <div className="result-item">
                          <span className="label">Result:</span>
                          <span className={`value ${record.label === 'defective' ? 'defective' : 'non-defective'}`}>
                            {record.label}
                          </span>
                        </div>
                        <div className="result-item">
                          <span className="label">Confidence:</span>
                          <span className="value">{(record.confidence * 100).toFixed(1)}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div className="image-modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            <h3>Analysis Details</h3>
            <div className="modal-images">
              <div className="modal-image-section">
                <h4>Original Image</h4>
                <img src={selectedImage.image_url} alt="Original Analysis" />
              </div>
              {selectedImage.gradcam_url && (
                <div className="modal-image-section">
                  <h4>Grad-CAM Analysis</h4>
                  <img src={selectedImage.gradcam_url} alt="Grad-CAM" />
                </div>
              )}
            </div>
            <div className="modal-details">
              <div className="detail-row">
                <span>Result:</span>
                <span className={selectedImage.label === 'defective' ? 'defective' : 'non-defective'}>
                  {selectedImage.label}
                </span>
              </div>
              <div className="detail-row">
                <span>Confidence:</span>
                <span>{(selectedImage.confidence * 100).toFixed(2)}%</span>
              </div>
              <div className="detail-row">
                <span>Analyzed on:</span>
                <span>{formatDate(selectedImage.timestamp)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserHistory;