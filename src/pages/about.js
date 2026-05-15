import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Target, 
  Award, 
  Lightbulb, 
  TrendingUp, 
  Zap, 
  Globe,
  ArrowRight,
  CheckCircle,
  Sparkles
} from 'lucide-react';
import { Navbar, Footer, Button, Card, CardContent, Badge } from '../components/ui';

const About = () => {
  const navigate = useNavigate();

  const stats = [
    { value: '97%', label: 'Detection Accuracy', icon: Target },
    { value: '3.5x', label: 'Faster Processing', icon: Zap },
    { value: '45%', label: 'Cost Reduction', icon: TrendingUp },
  ];

  const features = {
    technical: [
      'Advanced computer vision algorithms',
      'Real-time processing capabilities',
      'Scalable cloud infrastructure',
      'Custom model training options',
      'Automated reporting system'
    ],
    business: [
      'Reduced operational costs',
      'Improved quality control',
      'Enhanced productivity',
      'Predictive maintenance',
      'Comprehensive analytics'
    ]
  };

  const team = [
    {
      name: 'AI Research',
      description: 'Expert team developing cutting-edge machine learning models',
      icon: Lightbulb
    },
    {
      name: 'Computer Vision',
      description: 'Specialists in image processing and visual analysis',
      icon: Target
    },
    {
      name: 'Industry Experts',
      description: 'Professionals with decades of industrial automation experience',
      icon: Award
    },
    {
      name: 'Global Support',
      description: '24/7 support team across multiple time zones',
      icon: Globe
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
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl" />
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
                <Sparkles className="h-3.5 w-3.5 mr-2" />
                About Us
              </Badge>
            </motion.div>

            <motion.h1 
              variants={itemVariants}
              className="text-4xl sm:text-5xl font-bold text-foreground mb-6 text-balance"
            >
              Revolutionizing Industrial{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-violet-400 to-cyan-400">
                Quality Control
              </span>
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty"
            >
              Advanced AI-driven anomaly detection for industrial sectors. We combine cutting-edge 
              technology with deep industry expertise to transform defect identification.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-card/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <Badge variant="outline" className="mb-4">Our Mission</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6 text-balance">
              Empowering industries with intelligent visual inspection
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              To revolutionize industrial quality control through cutting-edge AI technology and real-time 
              data analysis. We aim to enhance product quality and streamline operations while reducing costs 
              and improving efficiency through our innovative approach to intelligent visual inspection and 
              anomaly detection.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge variant="outline" className="mb-4">Impact</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
              Delivering measurable results
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="text-center">
                  <CardContent className="p-8">
                    <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <stat.icon className="h-7 w-7 text-primary" />
                    </div>
                    <div className="text-4xl font-bold text-foreground mb-2">{stat.value}</div>
                    <div className="text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-card/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge variant="outline" className="mb-4">Product Overview</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              Comprehensive detection platform
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Anomaly Eye combines advanced computer vision with state-of-the-art machine learning 
              to create a powerful defect detection system.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Lightbulb className="h-5 w-5 text-primary" />
                    </div>
                    Technical Features
                  </h3>
                  <ul className="space-y-4">
                    {features.technical.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center">
                      <TrendingUp className="h-5 w-5 text-success" />
                    </div>
                    Business Benefits
                  </h3>
                  <ul className="space-y-4">
                    {features.business.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge variant="outline" className="mb-4">Our Team</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              Powered by extraordinary talent
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We are powered by an extraordinary alignment of AI experts, computer vision specialists, 
              and industry professionals with decades of combined experience.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card hover className="h-full">
                  <CardContent className="p-6 text-center">
                    <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <member.icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{member.name}</h3>
                    <p className="text-sm text-muted-foreground">{member.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-card/30">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              Ready to get started?
            </h2>
            <p className="text-muted-foreground mb-8">
              Join the industrial revolution powered by AI. Transform your quality control today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" onClick={() => navigate('/signup')} className="gap-2">
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg" onClick={() => navigate('/contact')}>
                Contact Us
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
