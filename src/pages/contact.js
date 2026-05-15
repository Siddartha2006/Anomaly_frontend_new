import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  MessageSquare,
  ChevronDown,
  ChevronUp,
  Sparkles
} from 'lucide-react';
import { Navbar, Footer, Button, Card, CardContent, Badge, Input, Textarea, Alert } from '../components/ui';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);

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
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setSubmitStatus('error');
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
      answer: "Yes, our system processes data in real-time with sub-100ms latency, providing immediate alerts and analysis for production line monitoring and quality control."
    }
  ];

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'contact@anomalyeye.ai',
      href: 'mailto:contact@anomalyeye.ai'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+1 (555) 123-4567',
      href: 'tel:+15551234567'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'San Francisco, CA',
      href: null
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
      <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8">
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
                <MessageSquare className="h-3.5 w-3.5 mr-2" />
                Get in Touch
              </Badge>
            </motion.div>

            <motion.h1 
              variants={itemVariants}
              className="text-4xl sm:text-5xl font-bold text-foreground mb-6 text-balance"
            >
              Let&apos;s start a{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-violet-400 to-cyan-400">
                conversation
              </span>
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty"
            >
              Have questions about our AI-powered anomaly detection? Our team is here to help you 
              transform your quality control processes.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-xl font-semibold text-foreground mb-2">Send us a message</h2>
                  <p className="text-muted-foreground mb-6">
                    Fill out the form below and we&apos;ll get back to you within 24 hours.
                  </p>

                  {submitStatus === 'success' && (
                    <Alert
                      variant="success"
                      title="Message sent successfully!"
                      description="Thank you for reaching out. We'll get back to you soon."
                      className="mb-6"
                    />
                  )}

                  {submitStatus === 'error' && (
                    <Alert
                      variant="destructive"
                      title="Failed to send message"
                      description="Please try again later or contact us directly via email."
                      className="mb-6"
                    />
                  )}

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                          Full Name
                        </label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          disabled={isSubmitting}
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                          Email Address
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="john@company.com"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                        Phone Number (Optional)
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        value={formData.phone}
                        onChange={handleChange}
                        disabled={isSubmitting}
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Tell us about your needs..."
                        value={formData.message}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                        className="min-h-[150px]"
                      />
                    </div>

                    <Button type="submit" size="lg" loading={isSubmitting} className="w-full sm:w-auto gap-2">
                      <Send className="h-4 w-4" />
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 space-y-6"
            >
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-6">Contact Information</h3>
                  <div className="space-y-4">
                    {contactInfo.map((item, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <item.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">{item.label}</p>
                          {item.href ? (
                            <a href={item.href} className="text-foreground font-medium hover:text-primary transition-colors">
                              {item.value}
                            </a>
                          ) : (
                            <p className="text-foreground font-medium">{item.value}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-primary/10 to-violet-500/10 border-primary/20">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Sparkles className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold text-foreground">Book a Demo</h3>
                  </div>
                  <p className="text-muted-foreground mb-4 text-sm">
                    See AnomalyEye in action with a personalized demonstration from our team.
                  </p>
                  <Button variant="secondary" className="w-full">
                    Schedule Demo
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-card/30">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge variant="outline" className="mb-4">FAQ</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground">
              Find answers to common questions about our platform.
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card hover className="overflow-hidden">
                  <button
                    className="w-full p-5 text-left flex items-center justify-between gap-4"
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  >
                    <span className="font-medium text-foreground">{faq.question}</span>
                    {openFaq === index ? (
                      <ChevronUp className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    )}
                  </button>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-5 pb-5"
                    >
                      <p className="text-muted-foreground text-sm leading-relaxed">{faq.answer}</p>
                    </motion.div>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
