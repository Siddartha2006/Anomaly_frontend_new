import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Calendar, 
  Eye, 
  CheckCircle, 
  AlertTriangle,
  X,
  Sparkles,
  FileImage,
  Clock
} from 'lucide-react';
import { 
  Navbar, 
  Button, 
  Card, 
  CardContent, 
  Badge, 
  Skeleton
} from '../components/ui';

const UserHistory = () => {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
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
    return {
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('adminToken');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar isLoggedIn={true} username={username} onLogout={handleLogout} />
      
      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
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
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Analysis History</h1>
                <p className="text-muted-foreground mt-1">
                  View your previous image analysis results
                </p>
              </div>
              <Badge variant="outline" className="w-fit">
                <Clock className="h-3 w-3 mr-1" />
                {history.length} {history.length === 1 ? 'analysis' : 'analyses'}
              </Badge>
            </div>
          </motion.div>

          {/* Content */}
          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-4">
                    <Skeleton className="aspect-square rounded-lg mb-4" />
                    <Skeleton className="h-4 w-24 mb-2" />
                    <Skeleton className="h-3 w-32" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : error ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Card>
                <CardContent className="p-12 text-center">
                  <div className="h-16 w-16 rounded-2xl bg-destructive/10 flex items-center justify-center mx-auto mb-4">
                    <AlertTriangle className="h-8 w-8 text-destructive" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Failed to Load History</h3>
                  <p className="text-muted-foreground mb-4">{error}</p>
                  <Button onClick={() => fetchUserHistory(username)}>
                    Try Again
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ) : history.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Card>
                <CardContent className="p-12 text-center">
                  <div className="h-16 w-16 rounded-2xl bg-muted/50 flex items-center justify-center mx-auto mb-4">
                    <FileImage className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">No Analysis History</h3>
                  <p className="text-muted-foreground mb-4">You haven&apos;t analyzed any images yet.</p>
                  <Button onClick={() => navigate('/dashboard')}>
                    Start Analyzing
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {history.map((record, index) => {
                const isDefective = record.label?.toLowerCase()?.includes('defective');
                const { date, time } = formatDate(record.timestamp);
                
                return (
                  <motion.div
                    key={record._id || index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card 
                      hover 
                      className="overflow-hidden cursor-pointer group"
                      onClick={() => setSelectedImage(record)}
                    >
                      <div className="relative aspect-square">
                        <img 
                          src={record.image_url} 
                          alt="Analysis" 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                          <Button size="sm" variant="secondary" className="gap-2">
                            <Eye className="h-3 w-3" />
                            View Details
                          </Button>
                        </div>
                        <div className="absolute top-3 right-3">
                          <Badge variant={isDefective ? 'destructive' : 'success'}>
                            {isDefective ? (
                              <><AlertTriangle className="h-3 w-3 mr-1" /> Defective</>
                            ) : (
                              <><CheckCircle className="h-3 w-3 mr-1" /> Pass</>
                            )}
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-foreground">
                            {(record.confidence * 100).toFixed(1)}% confidence
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>{date}</span>
                          <span>at</span>
                          <span>{time}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </div>
      </main>

      {/* Image Detail Modal */}
      <AnimatePresence>
        {selectedImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
              onClick={() => setSelectedImage(null)}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-auto rounded-xl border border-border bg-card shadow-2xl"
            >
              <div className="sticky top-0 z-10 flex items-center justify-between p-4 border-b border-border bg-card/95 backdrop-blur-sm">
                <h2 className="text-lg font-semibold text-foreground">Analysis Details</h2>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setSelectedImage(null)}
                  className="h-8 w-8"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="p-6 space-y-6">
                {/* Images */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm font-medium text-foreground mb-2">Original Image</p>
                    <div className="aspect-square rounded-xl overflow-hidden border border-border bg-muted/30">
                      <img 
                        src={selectedImage.image_url} 
                        alt="Original" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  {selectedImage.gradcam_url && (
                    <div>
                      <p className="text-sm font-medium text-foreground mb-2 flex items-center gap-1">
                        Grad-CAM Analysis
                        <Sparkles className="h-3 w-3 text-primary" />
                      </p>
                      <div className="aspect-square rounded-xl overflow-hidden border border-primary/30 bg-muted/30">
                        <img 
                          src={selectedImage.gradcam_url} 
                          alt="Grad-CAM" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Details */}
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-muted/30 border border-border/50">
                    <p className="text-sm text-muted-foreground mb-1">Result</p>
                    <div className="flex items-center gap-2">
                      {selectedImage.label?.toLowerCase()?.includes('defective') ? (
                        <>
                          <AlertTriangle className="h-4 w-4 text-destructive" />
                          <span className="font-medium text-destructive">{selectedImage.label}</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle className="h-4 w-4 text-success" />
                          <span className="font-medium text-success">{selectedImage.label}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-muted/30 border border-border/50">
                    <p className="text-sm text-muted-foreground mb-1">Confidence</p>
                    <p className="text-xl font-bold text-foreground">
                      {(selectedImage.confidence * 100).toFixed(2)}%
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-muted/30 border border-border/50">
                    <p className="text-sm text-muted-foreground mb-1">Analyzed On</p>
                    <p className="font-medium text-foreground">
                      {formatDate(selectedImage.timestamp).date}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(selectedImage.timestamp).time}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserHistory;
