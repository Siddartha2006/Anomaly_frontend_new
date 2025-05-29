import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUpload, FaChartBar, FaSpinner, FaHistory } from 'react-icons/fa';
import './dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState(null);
  const [result, setResult] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [username, setUsername] = useState('User'); // Default username

  // Fetch username safely from localStorage on mount
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('currentUser');
      console.log('Raw stored user:', storedUser); // Debug log
      
      if (storedUser) {
        const user = JSON.parse(storedUser);
        console.log('Parsed user object:', user); // Debug log
        
        if (user?.username) {
          setUsername(user.username);
          console.log('Username set to:', user.username); // Debug log
        }
      }
    } catch (error) {
      console.error('Error parsing user data:', error);
      // If there's an error, redirect to login
      navigate('/login');
    }
  }, [navigate]);

  // Drag and drop handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  // File selection and validation
  const handleFileSelect = (file) => {
    const validTypes = ['image/jpeg', 'image/png'];
    if (!validTypes.includes(file.type)) {
      alert('Please upload a JPG or PNG file');
      return;
    }
    setSelectedFile(file);
    analyzeImage(file);
  };

  const handleFileInput = (e) => {
    if (e.target.files.length > 0) {
      handleFileSelect(e.target.files[0]);
    }
  };

  // Image analysis API call with username included in form data
  const analyzeImage = async (file) => {
    setResult('analyzing');
    const formData = new FormData();
    formData.append('image', file);
    formData.append('username', username);

    console.log('Sending username to API:', username); // Debug log

    try {
      const res = await fetch('http://127.0.0.1:5000/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();

      setResult({
        anomalyProbability: data.confidence_score,
        predictedLabel: data.predicted_label,
        uploadedImageUrl: data.uploaded_image_url,
        gradcamImageUrl: data.gradcam_image_url,
      });
    } catch (err) {
      console.error('Error analyzing image:', err);
      setResult(null);
      alert('Failed to analyze image. Please try again later.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('adminToken'); // Also remove admin token if exists
    navigate('/login');
  };

  return (
    <div className="dashboard-wrapper">
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
          <Link to="/dashboard" className="active">Dashboard</Link>
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
      <div className="dashboard-container">
        <header className="dashboard-header">
          <h1>AI-Powered Anomaly Detection</h1>
          <p className="subtitle">
            Upload an image to leverage our advanced AI system for precise anomaly detection.
            Get instant analysis with detailed confidence scores and metrics.
          </p>
        </header>

        <section className="analysis-section">
          {/* Upload Area */}
          <div className="upload-section">
            <div
              className={`upload-area ${isDragging ? 'dragging' : ''}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => document.getElementById('fileInput').click()}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  document.getElementById('fileInput').click();
                }
              }}
            >
              <input
                id="fileInput"
                type="file"
                accept=".jpg,.png"
                onChange={handleFileInput}
                style={{ display: 'none' }}
              />
              <FaUpload className="upload-icon" />
              <h3>Drop your image here</h3>
              <p>or click to browse from your computer</p>
              <span className="supported-formats">Supported formats: JPG, PNG</span>
            </div>
          </div>

          {/* History Button */}
          <div className="history-button-container" style={{ marginTop: '20px', textAlign: 'right' }}>
            <button
              className="history-btn"
              onClick={() => {
                const token = localStorage.getItem('adminToken');
                if (token === 'valid') {
                  navigate('/history');
                } else {
                  navigate('/admin-login');
                }
              }}
              style={{
                backgroundColor: '#4A90E2',
                color: 'white',
                padding: '10px 16px',
                borderRadius: '5px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                border: 'none',
                cursor: 'pointer',
              }}
              aria-label="View history"
            >
              <FaHistory />
              View History
            </button>
          </div>

          {/* Results */}
          <div className="results-section">
            <div className="results-header">
              <FaChartBar className="results-icon" />
              <h2>Analysis Results</h2>
            </div>

            {!selectedFile && (
              <div className="no-results">
                <p>No image analyzed yet</p>
                <span>Upload or select a sample image to start</span>
              </div>
            )}

            {result === 'analyzing' && (
              <div className="analyzing">
                <FaSpinner className="spinner" />
                <p>Processing your image...</p>
                <span>This usually takes a few seconds</span>
              </div>
            )}

            {result && result !== 'analyzing' && (
              <div className="results">
                <div className="result-cards">
                  <div className="result-card">
                    <h3>Predicted Label</h3>
                    <div className="result-value highlight">{result.predictedLabel}</div>
                  </div>

                  <div className="result-card">
                    <h3>Confidence Score</h3>
                    <div className="result-value">{result.anomalyProbability}</div>
                  </div>
                </div>

                <div className="visualization">
                  <h3>Visualization</h3>
                  <div className="visualization-images">
                    {result.uploadedImageUrl && (
                      <div className="visualization-image">
                        <h4>Uploaded Image</h4>
                        <img src={result.uploadedImageUrl} alt="Uploaded" className="uploaded-image" />
                      </div>
                    )}
                    {result.gradcamImageUrl && (
                      <div className="visualization-image">
                        <h4>Grad-CAM Output</h4>
                        <img src={result.gradcamImageUrl} alt="Grad-CAM" className="gradcam-image" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;