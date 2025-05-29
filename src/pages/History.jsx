import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const History = () => {
  const navigate = useNavigate();
  const [groupedHistory, setGroupedHistory] = useState({});
  const [filteredHistory, setFilteredHistory] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token !== 'valid') {
      navigate('/admin-login');
      return;
    }

    // Fetch history data
    const fetchHistory = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('http://127.0.0.1:5000/api/history', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Fetched history data:', data); // Debug log

        setGroupedHistory(data);
        setFilteredHistory(data);
      } catch (err) {
        console.error('Error fetching history:', err);
        setError('Failed to load history. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin-login');
  };

  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    filterData(value, dateRange.start, dateRange.end);
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    const updatedRange = { ...dateRange, [name]: value };
    setDateRange(updatedRange);
    filterData(searchTerm, updatedRange.start, updatedRange.end);
  };

  const filterData = (term, start, end) => {
    const filtered = {};
    
    Object.entries(groupedHistory).forEach(([user, records]) => {
      // Filter by username (case insensitive)
      if (user.toLowerCase().includes(term)) {
        // Filter by date range
        const filteredRecords = records.filter((record) => {
          const recordDate = new Date(record.timestamp);
          const startDate = start ? new Date(start) : null;
          const endDate = end ? new Date(end) : null;
          
          return (!startDate || recordDate >= startDate) &&
                 (!endDate || recordDate <= endDate);
        });
        
        if (filteredRecords.length > 0) {
          filtered[user] = filteredRecords;
        }
      }
    });
    
    setFilteredHistory(filtered);
  };

  const downloadCSV = () => {
    let csv = 'Username,Image URL,GradCAM URL,Label,Confidence,Timestamp\n';
    
    Object.entries(filteredHistory).forEach(([username, records]) => {
      records.forEach((item) => {
        const confidence = typeof item.confidence === 'number' 
          ? (item.confidence * 100).toFixed(2) 
          : item.confidence;
        
        csv += `"${username}","${item.image_url || ''}","${item.gradcam_url || ''}","${item.label || ''}","${confidence}%","${item.timestamp}"\n`;
      });
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'prediction_history.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setDateRange({ start: '', end: '' });
    setFilteredHistory(groupedHistory);
  };

  if (isLoading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Loading History...</h2>
        <p>Please wait while we fetch the data.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '20px' }}>
        <h2>Error</h2>
        <p style={{ color: 'red' }}>{error}</p>
        <button onClick={() => window.location.reload()} style={{ padding: '8px 12px' }}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>All Users' Prediction History</h2>
        <button onClick={handleLogout} style={{ padding: '8px 12px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Logout
        </button>
      </div>

      {/* Filter Controls */}
      <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '5px' }}>
        <h4 style={{ marginTop: '0' }}>Filters</h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Search by username..."
            value={searchTerm}
            onChange={handleSearchChange}
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', minWidth: '200px' }}
          />
          <input
            type="date"
            name="start"
            value={dateRange.start}
            onChange={handleDateChange}
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            title="Start date"
          />
          <input
            type="date"
            name="end"
            value={dateRange.end}
            onChange={handleDateChange}
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            title="End date"
          />
          <button 
            onClick={clearFilters} 
            style={{ padding: '8px 12px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Clear Filters
          </button>
          <button 
            onClick={downloadCSV} 
            style={{ padding: '8px 12px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Download CSV
          </button>
        </div>
      </div>

      {/* Results Summary */}
      <div style={{ marginBottom: '20px' }}>
        <p><strong>Total Users:</strong> {Object.keys(filteredHistory).length}</p>
        <p><strong>Total Records:</strong> {Object.values(filteredHistory).reduce((acc, records) => acc + records.length, 0)}</p>
      </div>

      {/* History Data */}
      {Object.keys(filteredHistory).length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px', backgroundColor: '#f8f9fa', borderRadius: '5px' }}>
          <p style={{ fontSize: '18px', color: '#6c757d' }}>No records found.</p>
          {(searchTerm || dateRange.start || dateRange.end) && (
            <p style={{ color: '#6c757d' }}>Try adjusting your filters or clearing them to see all records.</p>
          )}
        </div>
      ) : (
        Object.entries(filteredHistory).map(([username, records]) => (
          <div key={username} style={{ marginBottom: '40px', border: '1px solid #dee2e6', borderRadius: '5px', overflow: 'hidden' }}>
            <h3 style={{ backgroundColor: '#e9ecef', padding: '15px', margin: '0', borderBottom: '1px solid #dee2e6' }}>
              {username} ({records.length} record{records.length !== 1 ? 's' : ''})
            </h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead style={{ backgroundColor: '#f8f9fa' }}>
                  <tr>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Image</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Label</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Confidence</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((item, index) => (
                    <tr key={index} style={{ borderBottom: index < records.length - 1 ? '1px solid #dee2e6' : 'none' }}>
                      <td style={{ padding: '12px' }}>
                        {item.image_url ? (
                          <img 
                            src={item.image_url} 
                            alt="Uploaded" 
                            style={{ width: '120px', height: '80px', objectFit: 'cover', borderRadius: '4px' }}
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'block';
                            }}
                          />
                        ) : null}
                        <div style={{ display: 'none', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '4px', fontSize: '12px', color: '#6c757d' }}>
                          Image not available
                        </div>
                      </td>
                      <td style={{ padding: '12px' }}>{item.label || 'N/A'}</td>
                      <td style={{ padding: '12px' }}>
                        {typeof item.confidence === 'number' 
                          ? `${(item.confidence * 100).toFixed(2)}%`
                          : item.confidence || 'N/A'
                        }
                      </td>
                      <td style={{ padding: '12px' }}>
                        {item.timestamp ? new Date(item.timestamp).toLocaleString() : 'N/A'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default History;