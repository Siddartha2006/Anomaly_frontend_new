import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, 
  BarChart3, 
  History, 
  Shield, 
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Activity,
  Image,
  FileImage,
  Sparkles,
  Eye,
  Target
} from 'lucide-react';
import { 
  Navbar, 
  Button, 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  Badge, 
  StatCard,
  FileUpload,
  Skeleton
} from '../components/ui';

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [result, setResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [username, setUsername] = useState('User');

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        if (user?.username) {
          setUsername(user.username);
        }
      }
    } catch (error) {
      console.error('Error parsing user data:', error);
      navigate('/login');
    }
  }, [navigate]);

  const handleFileSelect = (file) => {
    setSelectedFile(file);
    analyzeImage(file);
  };

  const analyzeImage = async (file) => {
    setIsAnalyzing(true);
    setResult(null);
    
    const formData = new FormData();
    formData.append('image', file);
    formData.append('username', username);

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
      setResult({ error: 'Failed to analyze image. Please try again.' });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('adminToken');
    navigate('/login');
  };

  const stats = [
    {
      title: 'Total Predictions',
      value: '1,234',
      icon: BarChart3,
      trend: 'up',
      trendValue: '+12.5%',
      description: 'vs last month'
    },
    {
      title: 'Defects Detected',
      value: '89',
      icon: AlertTriangle,
      trend: 'down',
      trendValue: '-5.2%',
      description: 'defect rate improving'
    },
    {
      title: 'Accuracy Rate',
      value: '97.3%',
      icon: Target,
      trend: 'up',
      trendValue: '+2.1%',
      description: 'model performance'
    },
    {
      title: 'Processing Speed',
      value: '0.8s',
      icon: Activity,
      trend: 'neutral',
      trendValue: 'Avg',
      description: 'per image'
    }
  ];

  const isDefective = result?.predictedLabel?.toLowerCase()?.includes('defective');

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
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  AI Analysis Dashboard
                </h1>
                <p className="text-muted-foreground mt-1">
                  Upload images for instant anomaly detection with Grad-CAM visualization
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/user-history')}
                  className="gap-2"
                >
                  <History className="h-4 w-4" />
                  Your History
                </Button>
                <Button 
                  variant="secondary" 
                  onClick={() => {
                    const token = localStorage.getItem('adminToken');
                    if (token === 'valid') {
                      navigate('/history');
                    } else {
                      navigate('/admin-login');
                    }
                  }}
                  className="gap-2"
                >
                  <Shield className="h-4 w-4" />
                  Admin
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
          >
            {stats.map((stat, index) => (
              <StatCard
                key={index}
                title={stat.title}
                value={stat.value}
                icon={stat.icon}
                trend={stat.trend}
                trendValue={stat.trendValue}
                description={stat.description}
              />
            ))}
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Upload Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Upload className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle>Image Analysis</CardTitle>
                      <p className="text-sm text-muted-foreground">Upload an image for anomaly detection</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <FileUpload
                    onFileSelect={handleFileSelect}
                    isLoading={isAnalyzing}
                    accept=".jpg,.jpeg,.png"
                    maxSize={10}
                  />
                </CardContent>
              </Card>
            </motion.div>

            {/* Results Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <BarChart3 className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle>Analysis Results</CardTitle>
                      <p className="text-sm text-muted-foreground">Detection output and confidence score</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <AnimatePresence mode="wait">
                    {!selectedFile && !isAnalyzing && (
                      <motion.div
                        key="empty"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center py-16 text-center"
                      >
                        <div className="h-16 w-16 rounded-2xl bg-muted/50 flex items-center justify-center mb-4">
                          <Image className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-medium text-foreground mb-2">No image analyzed</h3>
                        <p className="text-sm text-muted-foreground max-w-[240px]">
                          Upload an image to get started with anomaly detection
                        </p>
                      </motion.div>
                    )}

                    {isAnalyzing && (
                      <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-6 py-4"
                      >
                        <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/30">
                          <Skeleton className="h-12 w-12 rounded-lg" />
                          <div className="flex-1 space-y-2">
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-3 w-24" />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <Skeleton className="h-24 rounded-xl" />
                          <Skeleton className="h-24 rounded-xl" />
                        </div>
                        <Skeleton className="h-40 rounded-xl" />
                      </motion.div>
                    )}

                    {result && !result.error && !isAnalyzing && (
                      <motion.div
                        key="results"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="space-y-6"
                      >
                        {/* Prediction Result */}
                        <div className={`p-4 rounded-xl border ${
                          isDefective 
                            ? 'bg-destructive/10 border-destructive/30' 
                            : 'bg-success/10 border-success/30'
                        }`}>
                          <div className="flex items-center gap-3">
                            {isDefective ? (
                              <AlertTriangle className="h-6 w-6 text-destructive" />
                            ) : (
                              <CheckCircle className="h-6 w-6 text-success" />
                            )}
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-lg font-semibold text-foreground">
                                  {result.predictedLabel}
                                </span>
                                <Badge variant={isDefective ? 'destructive' : 'success'}>
                                  {isDefective ? 'Defect Detected' : 'Pass'}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mt-0.5">
                                Analysis complete
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Confidence Score */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-4 rounded-xl bg-muted/30 border border-border/50">
                            <p className="text-sm text-muted-foreground mb-1">Confidence Score</p>
                            <p className="text-2xl font-bold text-foreground">{result.anomalyProbability}</p>
                          </div>
                          <div className="p-4 rounded-xl bg-muted/30 border border-border/50">
                            <p className="text-sm text-muted-foreground mb-1">Processing Time</p>
                            <p className="text-2xl font-bold text-foreground">0.8s</p>
                          </div>
                        </div>

                        {/* Images */}
                        {(result.uploadedImageUrl || result.gradcamImageUrl) && (
                          <div>
                            <h4 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
                              <Eye className="h-4 w-4 text-primary" />
                              Visualization
                            </h4>
                            <div className="grid grid-cols-2 gap-4">
                              {result.uploadedImageUrl && (
                                <div className="space-y-2">
                                  <p className="text-xs text-muted-foreground">Original Image</p>
                                  <div className="relative aspect-square rounded-xl overflow-hidden border border-border bg-muted/30">
                                    <img 
                                      src={result.uploadedImageUrl} 
                                      alt="Uploaded" 
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                </div>
                              )}
                              {result.gradcamImageUrl && (
                                <div className="space-y-2">
                                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                                    Grad-CAM Heatmap
                                    <Sparkles className="h-3 w-3 text-primary" />
                                  </p>
                                  <div className="relative aspect-square rounded-xl overflow-hidden border border-primary/30 bg-muted/30">
                                    <img 
                                      src={result.gradcamImageUrl} 
                                      alt="Grad-CAM" 
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </motion.div>
                    )}

                    {result?.error && (
                      <motion.div
                        key="error"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center py-16 text-center"
                      >
                        <div className="h-16 w-16 rounded-2xl bg-destructive/10 flex items-center justify-center mb-4">
                          <AlertTriangle className="h-8 w-8 text-destructive" />
                        </div>
                        <h3 className="text-lg font-medium text-foreground mb-2">Analysis Failed</h3>
                        <p className="text-sm text-muted-foreground max-w-[280px] mb-4">
                          {result.error}
                        </p>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            setResult(null);
                            setSelectedFile(null);
                          }}
                        >
                          Try Again
                        </Button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8"
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/20 to-violet-500/20 flex items-center justify-center">
                      <TrendingUp className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">Need to analyze multiple images?</h3>
                      <p className="text-sm text-muted-foreground">Contact us for batch processing and API access</p>
                    </div>
                  </div>
                  <Button onClick={() => navigate('/contact')} className="gap-2">
                    Contact Sales
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
