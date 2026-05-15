import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Cpu,
  Brain,
  Layers,
  Code,
  Database,
  ArrowRight,
  CheckCircle,
  Sparkles,
  GitBranch,
  Eye,
  BarChart3
} from 'lucide-react';
import { Navbar, Footer, Button, Card, CardContent, Badge } from '../components/ui';

const Technology = () => {
  const navigate = useNavigate();

  const technologies = [
    {
      icon: Code,
      title: 'Python Backend',
      description: 'High-performance backend processing with Flask/FastAPI for seamless API integration.',
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-400/10'
    },
    {
      icon: Brain,
      title: 'GANs & Diffusion Models',
      description: 'Advanced generative models for creating high-quality synthetic training data.',
      color: 'text-violet-400',
      bgColor: 'bg-violet-400/10'
    },
    {
      icon: Eye,
      title: 'Vision Transformers',
      description: 'State-of-the-art ViT models for accurate anomaly classification and detection.',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      icon: Layers,
      title: 'React.js Frontend',
      description: 'Modern, responsive UI built with React and Tailwind CSS for optimal UX.',
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-400/10'
    },
    {
      icon: Database,
      title: 'MongoDB Database',
      description: 'Scalable NoSQL database for efficient storage and retrieval of analysis data.',
      color: 'text-green-400',
      bgColor: 'bg-green-400/10'
    },
    {
      icon: BarChart3,
      title: 'Grad-CAM Visualization',
      description: 'Explainable AI with gradient-weighted class activation mapping.',
      color: 'text-orange-400',
      bgColor: 'bg-orange-400/10'
    }
  ];

  const architecture = [
    {
      step: '01',
      title: 'Data Ingestion',
      description: 'Images are uploaded through our secure API and preprocessed for analysis.',
    },
    {
      step: '02',
      title: 'Feature Extraction',
      description: 'Vision Transformer extracts high-level features from the input image.',
    },
    {
      step: '03',
      title: 'Classification',
      description: 'Our fine-tuned model classifies the image as defective or non-defective.',
    },
    {
      step: '04',
      title: 'Visualization',
      description: 'Grad-CAM generates a heatmap highlighting regions contributing to the prediction.',
    }
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

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center max-w-3xl mx-auto"
          >
            <motion.div variants={itemVariants} className="mb-6">
              <Badge variant="outline" className="px-4 py-1.5 text-sm">
                <Cpu className="h-3.5 w-3.5 mr-2" />
                Technology Stack
              </Badge>
            </motion.div>

            <motion.h1 
              variants={itemVariants}
              className="text-4xl sm:text-5xl font-bold text-foreground mb-6 text-balance"
            >
              Powered by{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-violet-400 to-cyan-400">
                Cutting-Edge AI
              </span>
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty"
            >
              Our platform leverages state-of-the-art AI models for detecting anomalies in industrial 
              environments with unprecedented accuracy and speed.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Core Technologies Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-card/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge variant="outline" className="mb-4">Core Technologies</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              Built with modern technologies
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our stack combines the best tools and frameworks for performance, scalability, and reliability.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {technologies.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card hover className="h-full">
                  <CardContent className="p-6">
                    <div className={`h-12 w-12 rounded-xl ${tech.bgColor} flex items-center justify-center mb-4`}>
                      <tech.icon className={`h-6 w-6 ${tech.color}`} />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{tech.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{tech.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Model Architecture Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Badge variant="outline" className="mb-4">Model Description</Badge>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6 text-balance">
                Transformer-based{' '}
                <span className="text-primary">anomaly classification</span>
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Our model is trained on synthetic industrial defect data using GANs and Diffusion Models, 
                then fine-tuned using transformer-based architectures like Vision Transformers (ViTs). 
                This enables real-time insights with high accuracy.
              </p>
              
              <ul className="space-y-4 mb-8">
                {[
                  'Pre-trained on ImageNet-21k for robust feature extraction',
                  'Fine-tuned on 100K+ synthetic defect samples',
                  'Achieves 97%+ accuracy on industrial datasets',
                  'Sub-100ms inference time per image'
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>

              <Button onClick={() => navigate('/dashboard')} className="gap-2">
                Try It Now
                <ArrowRight className="h-4 w-4" />
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-cyan-500/20 rounded-2xl blur-2xl" />
              <div className="relative rounded-2xl border border-border bg-card p-8">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-primary/10 mb-4">
                    <Brain className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">Vision Transformer</h3>
                  <p className="text-sm text-muted-foreground">ViT-B/16 Architecture</p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border/50">
                    <span className="text-sm text-muted-foreground">Input Size</span>
                    <span className="text-sm font-medium text-foreground">224 x 224</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border/50">
                    <span className="text-sm text-muted-foreground">Patch Size</span>
                    <span className="text-sm font-medium text-foreground">16 x 16</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border/50">
                    <span className="text-sm text-muted-foreground">Hidden Dim</span>
                    <span className="text-sm font-medium text-foreground">768</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border/50">
                    <span className="text-sm text-muted-foreground">Attention Heads</span>
                    <span className="text-sm font-medium text-foreground">12</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border/50">
                    <span className="text-sm text-muted-foreground">Parameters</span>
                    <span className="text-sm font-medium text-foreground">86M</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pipeline Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-card/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge variant="outline" className="mb-4">
              <GitBranch className="h-3.5 w-3.5 mr-2" />
              Processing Pipeline
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              How it works
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our pipeline processes images through multiple stages for accurate anomaly detection.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {architecture.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="text-4xl font-bold text-primary/20 mb-4">{step.step}</div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
                {index < architecture.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <ArrowRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              Experience the technology firsthand
            </h2>
            <p className="text-muted-foreground mb-8">
              Upload an image and see our AI in action. Get instant analysis with detailed confidence scores.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" onClick={() => navigate('/dashboard')} className="gap-2">
                <Sparkles className="h-4 w-4" />
                Try Demo
              </Button>
              <Button variant="outline" size="lg" onClick={() => navigate('/contact')}>
                Request Access
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Technology;
