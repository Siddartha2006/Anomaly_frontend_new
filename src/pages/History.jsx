import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Search, 
  Download, 
  LogOut, 
  Calendar,
  Users,
  FileImage,
  AlertTriangle,
  CheckCircle,
  X,
  RefreshCw,
  ArrowLeft,
  Scan,
  Shield
} from 'lucide-react';
import { 
  Button, 
  Card, 
  CardContent, 
  Badge, 
  Input,
  Skeleton,
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Alert
} from '../components/ui';

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

    fetchHistory();
  }, [navigate]);

  const fetchHistory = async () => {
    try {
      setIsLoading(true);
      setError('');
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
      setGroupedHistory(data);
      setFilteredHistory(data);
    } catch (err) {
      console.error('Error fetching history:', err);
      setError('Failed to load history. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

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
      if (user.toLowerCase().includes(term)) {
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

  const totalUsers = Object.keys(filteredHistory).length;
  const totalRecords = Object.values(filteredHistory).reduce((acc, records) => acc + records.length, 0);

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link to="/home" className="flex items-center gap-2">
                <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-primary to-violet-600 flex items-center justify-center">
                  <Scan className="h-5 w-5 text-white" />
                </div>
                <span className="text-lg font-semibold text-foreground hidden sm:block">
                  Anomaly<span className="text-primary">Eye</span>
                </span>
              </Link>
              <Badge variant="outline" className="gap-1">
                <Shield className="h-3 w-3" />
                Admin Panel
              </Badge>
            </div>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-2">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Button 
              variant="ghost" 
              onClick={() => navigate('/dashboard')}
              className="mb-4 gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
            
            <h1 className="text-3xl font-bold text-foreground">All Users&apos; Prediction History</h1>
            <p className="text-muted-foreground mt-1">
              View and manage analysis records from all users
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by username..."
                      value={searchTerm}
                      onChange={handleSearchChange}
                      className="pl-10"
                    />
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <Input
                        type="date"
                        name="start"
                        value={dateRange.start}
                        onChange={handleDateChange}
                        className="w-auto"
                      />
                      <span className="text-muted-foreground">to</span>
                      <Input
                        type="date"
                        name="end"
                        value={dateRange.end}
                        onChange={handleDateChange}
                        className="w-auto"
                      />
                    </div>
                    <Button variant="outline" onClick={clearFilters} className="gap-2">
                      <X className="h-4 w-4" />
                      Clear
                    </Button>
                    <Button onClick={downloadCSV} className="gap-2">
                      <Download className="h-4 w-4" />
                      Export CSV
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 gap-4 mb-6"
          >
            <Card>
              <CardContent className="p-4 flex items-center gap-4">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Users</p>
                  <p className="text-2xl font-bold text-foreground">{totalUsers}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center gap-4">
                <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center">
                  <FileImage className="h-5 w-5 text-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Records</p>
                  <p className="text-2xl font-bold text-foreground">{totalRecords}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Content */}
          {isLoading ? (
            <Card>
              <CardContent className="p-6 space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <Skeleton className="h-16 w-16 rounded-lg" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                    <Skeleton className="h-6 w-16 rounded-full" />
                  </div>
                ))}
              </CardContent>
            </Card>
          ) : error ? (
            <Alert
              variant="destructive"
              title="Error Loading Data"
              description={error}
              className="mb-6"
            />
          ) : Object.keys(filteredHistory).length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <div className="h-16 w-16 rounded-2xl bg-muted/50 flex items-center justify-center mx-auto mb-4">
                  <FileImage className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">No Records Found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchTerm || dateRange.start || dateRange.end 
                    ? 'Try adjusting your filters to see more results.' 
                    : 'No prediction history available yet.'}
                </p>
                {(searchTerm || dateRange.start || dateRange.end) && (
                  <Button variant="outline" onClick={clearFilters}>
                    Clear Filters
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              {Object.entries(filteredHistory).map(([username, records], userIndex) => (
                <motion.div
                  key={username}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: userIndex * 0.1 }}
                >
                  <Card>
                    <div className="p-4 border-b border-border flex items-center justify-between bg-muted/30">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-violet-600 flex items-center justify-center text-white font-medium">
                          {username.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{username}</h3>
                          <p className="text-sm text-muted-foreground">
                            {records.length} {records.length === 1 ? 'record' : 'records'}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Image</TableHead>
                            <TableHead>Result</TableHead>
                            <TableHead>Confidence</TableHead>
                            <TableHead>Date</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {records.map((item, index) => {
                            const isDefective = item.label?.toLowerCase()?.includes('defective');
                            return (
                              <TableRow key={index}>
                                <TableCell>
                                  <div className="h-16 w-16 rounded-lg overflow-hidden border border-border bg-muted/30">
                                    {item.image_url ? (
                                      <img 
                                        src={item.image_url} 
                                        alt="Analysis" 
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                          e.target.style.display = 'none';
                                        }}
                                      />
                                    ) : (
                                      <div className="w-full h-full flex items-center justify-center">
                                        <FileImage className="h-6 w-6 text-muted-foreground" />
                                      </div>
                                    )}
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <Badge variant={isDefective ? 'destructive' : 'success'}>
                                    {isDefective ? (
                                      <><AlertTriangle className="h-3 w-3 mr-1" /> {item.label}</>
                                    ) : (
                                      <><CheckCircle className="h-3 w-3 mr-1" /> {item.label}</>
                                    )}
                                  </Badge>
                                </TableCell>
                                <TableCell>
                                  <span className="font-medium">
                                    {typeof item.confidence === 'number' 
                                      ? `${(item.confidence * 100).toFixed(1)}%`
                                      : item.confidence || 'N/A'}
                                  </span>
                                </TableCell>
                                <TableCell>
                                  <span className="text-muted-foreground">
                                    {item.timestamp ? formatDate(item.timestamp) : 'N/A'}
                                  </span>
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Refresh Button */}
          {!isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6 text-center"
            >
              <Button variant="outline" onClick={fetchHistory} className="gap-2">
                <RefreshCw className="h-4 w-4" />
                Refresh Data
              </Button>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
};

export default History;
