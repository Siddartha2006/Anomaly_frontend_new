import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Brain, 
  FileText, 
  Shield, 
  Zap, 
  ArrowRight, 
  Play,
  CheckCircle,
  Sparkles,
  TrendingUp,
  Eye,
  Cpu
} from 'lucide-react';
import { Navbar, Footer, Button, Card, CardContent, Badge } from '../components/ui';

const Home = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      icon: BarChart3,
      title: "Real-time Analytics",
      description: "Monitor and analyze data streams in real-time with advanced visualization tools and instant insights."
    },
    {
      icon: Brain,
      title: "Smart Detection",
      description: "AI-powered anomaly detection with transformer-based deep learning for precise defect identification."
    },
    {
      icon: FileText,
      title: "Detailed Reports",
      description: "Generate comprehensive reports with actionable insights and exportable data formats."
    },
    {
      icon: Shield,
      title: "24/7 Monitoring",
      description: "Continuous system monitoring with instant alert notifications and automated responses."
    }
  ];

  const stats = [
    { value: '99.2%', label: 'Detection Accuracy', icon: CheckCircle },
    { value: '3.5x', label: 'Faster Processing', icon: Zap },
    { value: '45%', label: 'Cost Reduction', icon: TrendingUp },
    { value: '500+', label: 'Active Users', icon: Eye },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="relative">
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary to-violet-600 flex items-center justify-center animate-pulse">
              <Eye className="h-8 w-8 text-white" />
            </div>
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse" />
          </div>
          <p className="text-muted-foreground">Loading...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/5 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div variants={itemVariants} className="mb-6">
              <Badge variant="outline" className="px-4 py-1.5 text-sm">
                <Sparkles className="h-3.5 w-3.5 mr-2" />
                Powered by Advanced AI
              </Badge>
            </motion.div>

            <motion.h1 
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance"
            >
              AI-Powered Industrial{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-violet-400 to-cyan-400">
                Anomaly Detection
              </span>
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty"
            >
              Enhance product quality and streamline operations with our advanced defect detection system, 
              leveraging synthetic data augmentation and transformer-based deep learning.
            </motion.p>

            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button size="lg" onClick={() => navigate('/dashboard')} className="gap-2 min-w-[180px]">
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg" onClick={() => navigate('/technology')} className="gap-2 min-w-[180px]">
                <Play className="h-4 w-4" />
                Watch Demo
              </Button>
            </motion.div>
          </motion.div>

          {/* Stats Section */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="text-center p-6 rounded-xl bg-card/50 border border-border/50 backdrop-blur-sm"
              >
                <div className="flex items-center justify-center mb-3">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge variant="outline" className="mb-4">Features</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
              Everything you need for{' '}
              <span className="text-primary">intelligent detection</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our platform combines cutting-edge AI with industrial expertise to deliver unmatched accuracy.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card hover className="h-full">
                  <CardContent className="p-6 pt-6">
                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Preview Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Badge variant="outline" className="mb-4">Technology</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6 text-balance">
                Transformer-based deep learning for{' '}
                <span className="text-primary">precision analysis</span>
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Our system utilizes state-of-the-art Vision Transformers (ViTs) trained on synthetic 
                industrial defect data generated using GANs and Diffusion Models. This approach enables 
                real-time insights with unprecedented accuracy.
              </p>
              
              <ul className="space-y-4 mb-8">
                {[
                  'GANs and Diffusion Models for synthetic data generation',
                  'Vision Transformers for accurate anomaly classification',
                  'Grad-CAM visualization for explainable AI',
                  'Real-time processing with sub-second latency'
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>

              <Button onClick={() => navigate('/technology')} className="gap-2">
                Learn More
                <ArrowRight className="h-4 w-4" />
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-violet-500/20 rounded-2xl blur-2xl" />
              <div className="relative rounded-2xl border border-border bg-card/80 backdrop-blur-sm p-8 space-y-6">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-background/50 border border-border/50">
                  <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Cpu className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-foreground">Model Architecture</div>
                    <div className="text-sm text-muted-foreground">Vision Transformer (ViT-B/16)</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-xl bg-background/50 border border-border/50">
                  <div className="h-12 w-12 rounded-lg bg-success/20 flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-success" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-foreground">Processing Speed</div>
                    <div className="text-sm text-muted-foreground">{'<'}100ms per image</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-xl bg-background/50 border border-border/50">
                  <div className="h-12 w-12 rounded-lg bg-violet-500/20 flex items-center justify-center">
                    <Brain className="h-6 w-6 text-violet-400" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-foreground">Training Data</div>
                    <div className="text-sm text-muted-foreground">100K+ synthetic samples</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/30">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Ready to transform your quality control?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join hundreds of industrial leaders using AnomalyEye to detect defects with unprecedented accuracy.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" onClick={() => navigate('/signup')} className="gap-2 min-w-[180px]">
                Start Free Trial
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg" onClick={() => navigate('/contact')} className="min-w-[180px]">
                Contact Sales
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
