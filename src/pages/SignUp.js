import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Lock, ArrowRight, Eye, EyeOff, Scan, CheckCircle } from 'lucide-react';
import { Button, Card, CardContent, Input, Alert } from '../components/ui';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password
        })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('currentUser', JSON.stringify({
          username: data.username,
          role: data.role
        }));
        navigate('/home');
      } else {
        setError(data.error || 'Signup failed. Try again.');
      }
    } catch (err) {
      console.error('Signup error:', err);
      setError('Signup failed. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const passwordStrength = () => {
    const password = formData.password;
    if (!password) return { score: 0, label: '' };
    
    let score = 0;
    if (password.length >= 6) score++;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    
    const labels = ['', 'Weak', 'Fair', 'Good', 'Strong', 'Excellent'];
    const colors = ['', 'bg-destructive', 'bg-warning', 'bg-warning', 'bg-success', 'bg-success'];
    
    return { score, label: labels[score], color: colors[score] };
  };

  const strength = passwordStrength();

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
              Start Your Journey with AnomalyEye
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Join hundreds of industrial leaders using AI-powered quality control.
            </p>
            
            <div className="space-y-4">
              {[
                'Free trial with full access',
                'No credit card required',
                'Cancel anytime'
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-success/20 flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-success" />
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

      {/* Right Side - Signup Form */}
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
            <h2 className="text-2xl font-bold text-foreground mb-2">Create your account</h2>
            <p className="text-muted-foreground">Get started with AnomalyEye today</p>
          </div>

          {error && (
            <Alert
              variant="destructive"
              title="Error"
              description={error}
              className="mb-6"
            />
          )}

          <Card>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-5">
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
                      placeholder="Choose a username"
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
                      placeholder="Create a password"
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
                  {formData.password && (
                    <div className="mt-2">
                      <div className="flex gap-1 mb-1">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <div
                            key={i}
                            className={`h-1 flex-1 rounded-full ${i <= strength.score ? strength.color : 'bg-muted'}`}
                          />
                        ))}
                      </div>
                      {strength.label && (
                        <p className="text-xs text-muted-foreground">{strength.label}</p>
                      )}
                    </div>
                  )}
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      <Lock className="h-4 w-4" />
                    </div>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                    <p className="mt-1.5 text-xs text-destructive">Passwords do not match</p>
                  )}
                </div>

                <Button type="submit" size="lg" loading={isLoading} className="w-full gap-2">
                  Create Account
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="mt-6 text-center space-y-4">
            <p className="text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link to="/login" className="text-primary font-medium hover:underline">
                Sign in
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

export default SignUp;
