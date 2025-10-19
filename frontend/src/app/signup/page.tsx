'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, Brain, CheckCircle, Hexagon } from 'lucide-react';

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle sign up logic here
    console.log('Sign up attempt:', formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ backgroundColor: 'var(--bg-primary)' }}>
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(124, 58, 237, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(124, 58, 237, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>
      
      <div className="relative w-full max-w-md">
        {/* Logo */}
        <Link href="/landing" className="flex items-center justify-center space-x-3 mb-8">
          <div className="relative">
            <Hexagon className="w-10 h-10" style={{ color: 'var(--neon-purple)' }} />
            <div className="absolute inset-0 flex items-center justify-center">
              <Brain className="w-5 h-5" style={{ color: 'var(--bg-primary)' }} />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold neon-text">TraceonAI</span>
            <span className="text-xs font-mono" style={{ color: 'var(--neon-blue)' }}>AI SRE Platform</span>
          </div>
        </Link>

        {/* Sign Up Form */}
        <div className="card-primary p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
              Create Your Account
            </h1>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Start your journey with AI-powered SRE
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border transition-colors duration-300 focus:outline-none"
                  style={{ 
                    backgroundColor: 'var(--bg-secondary)', 
                    borderColor: 'var(--border-primary)',
                    color: 'var(--text-primary)'
                  }}
                  placeholder="John"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border transition-colors duration-300 focus:outline-none"
                  style={{ 
                    backgroundColor: 'var(--bg-secondary)', 
                    borderColor: 'var(--border-primary)',
                    color: 'var(--text-primary)'
                  }}
                  placeholder="Doe"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                Work Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 rounded-lg border transition-colors duration-300 focus:outline-none"
                style={{ 
                  backgroundColor: 'var(--bg-secondary)', 
                  borderColor: 'var(--border-primary)',
                  color: 'var(--text-primary)'
                }}
                placeholder="john@company.com"
              />
            </div>

            {/* Company */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                Company
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 rounded-lg border transition-colors duration-300 focus:outline-none"
                style={{ 
                  backgroundColor: 'var(--bg-secondary)', 
                  borderColor: 'var(--border-primary)',
                  color: 'var(--text-primary)'
                }}
                placeholder="Your Company"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 pr-12 rounded-lg border transition-colors duration-300 focus:outline-none"
                  style={{ 
                    backgroundColor: 'var(--bg-secondary)', 
                    borderColor: 'var(--border-primary)',
                    color: 'var(--text-primary)'
                  }}
                  placeholder="Create a strong password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 transition-colors duration-300"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 pr-12 rounded-lg border transition-colors duration-300 focus:outline-none"
                  style={{ 
                    backgroundColor: 'var(--bg-secondary)', 
                    borderColor: 'var(--border-primary)',
                    color: 'var(--text-primary)'
                  }}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 transition-colors duration-300"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Terms Agreement */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleInputChange}
                required
                className="mt-1 w-4 h-4 rounded"
                style={{ 
                  accentColor: 'var(--neon-purple)'
                }}
              />
              <label className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                I agree to the{' '}
                <a href="#" className="font-medium transition-colors duration-300 hover:text-white" style={{ color: 'var(--neon-blue)' }}>
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="font-medium transition-colors duration-300 hover:text-white" style={{ color: 'var(--neon-blue)' }}>
                  Privacy Policy
                </a>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!formData.agreeToTerms}
              className="w-full btn-primary py-3 text-base font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Create Account
            </button>
          </form>

          {/* Benefits */}
          <div className="mt-8 pt-6 border-t" style={{ borderColor: 'var(--border-primary)' }}>
            <p className="text-xs mb-4 text-center" style={{ color: 'var(--text-tertiary)' }}>
              What you get with TraceonAI:
            </p>
            <div className="space-y-2">
              {[
                'AI-powered incident prediction and prevention',
                'Automated root cause analysis and remediation',
                'Real-time infrastructure monitoring and alerts',
                'Comprehensive SLO tracking and management'
              ].map((benefit, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" style={{ color: 'var(--neon-green)' }} />
                  <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sign In Link */}
          <div className="mt-6 text-center space-y-3">
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Already have an account?{' '}
              <Link 
                href="/login" 
                className="font-medium transition-colors duration-300 hover:text-white"
                style={{ color: 'var(--neon-blue)' }}
              >
                Sign in
              </Link>
            </p>
            <div>
              <Link 
                href="/landing" 
                className="inline-flex items-center text-sm transition-colors duration-300"
                style={{ color: 'var(--text-secondary)' }}
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Landing Page
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
