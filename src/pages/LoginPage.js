import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Lock, ArrowRight, Eye, EyeOff, Scan } from 'lucide-react';
import { Button, Card, CardContent, Input, Alert } from '../components/ui';

const LoginPage = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const validateForm = () => {
    if (!formData.username || !formData.password) {
      setError('Username and password are required');
      return false;
    }
    return true;
  };

  const saveLoginHistory = async (username) => {
    try {
      await fetch('http://localhost:5000/api/saveHistory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          action: 'User logged in',
          timestamp: new Date().toISOString(),
        }),
      });
    } catch (err) {
      console.error('Failed to save login history', err);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        const userData = {
          username: data.username || formData.username,
          role: data.role || 'User'
        };
        
        localStorage.setItem('currentUser', JSON.stringify(userData));
        await saveLoginHistory(userData.username);
        navigate('/dashboard');
      } else {
        setError(data.error || 'Invalid username or password');
      }
    } catch (error) {
      setError('Login failed. Please try again.');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-violet-500/10 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/30 via-transparent to-transparent" />
        
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <Link to="/home" className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-violet-600 flex items-center justify-center">
              <Scan className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-semibold text-foreground">
              Anomaly<span className="text-primary">Eye</span>
            </span>
          </Link>
          
          <div className="max-w-md">
            <h1 className="text-4xl font-bold text-foreground mb-6 leading-tight">
              AI-Powered Anomaly Detection for Modern Industry
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Transform your quality control with advanced machine learning and real-time insights.
            </p>
            
            <div className="space-y-4">
              {[
                'Real-time defect detection',
                'Transformer-based deep learning',
                'Comprehensive analytics dashboard'
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-primary/20 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  </div>
                  <span className="text-muted-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} AnomalyEye. All rights reserved.
          </p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          {/* Mobile Logo */}
          <div className="lg:hidden flex justify-center mb-8">
            <Link to="/home" className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-violet-600 flex items-center justify-center">
                <Scan className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-foreground">
                Anomaly<span className="text-primary">Eye</span>
              </span>
            </Link>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">Welcome back</h2>
            <p className="text-muted-foreground">Sign in to your account to continue</p>
          </div>

          {error && (
            <Alert
              variant="destructive"
              title="Authentication Error"
              description={error}
              className="mb-6"
            />
          )}

          <Card>
            <CardContent className="p-6">
              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-foreground mb-2">
                    Username
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      <User className="h-4 w-4" />
                    </div>
                    <Input
                      id="username"
                      name="username"
                      type="text"
                      placeholder="Enter your username"
                      value={formData.username}
                      onChange={handleChange}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      <Lock className="h-4 w-4" />
                    </div>
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleChange}
                      className="pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <Button type="submit" size="lg" loading={isLoading} className="w-full gap-2">
                  Sign In
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="mt-6 text-center space-y-4">
            <p className="text-sm text-muted-foreground">
              Don&apos;t have an account?{' '}
              <Link to="/signup" className="text-primary font-medium hover:underline">
                Create account
              </Link>
            </p>
            <Link to="/home" className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-block">
              Back to Home
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
