'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Brain, Eye, EyeOff, ArrowLeft, AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const success = await login(username, password);
      if (success) {
        router.push('/dashboard');
      } else {
        setError('Invalid credentials. Use "test" for both username and password.');
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const fillTestCredentials = () => {
    setUsername('test');
    setPassword('test');
    setError('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-3 rounded-xl">
            <Brain className="w-8 h-8 text-white" />
          </div>
        </div>
        <h2 className="text-center text-3xl font-bold tracking-tight neon-text">
          Sign in to TraceonAI
        </h2>
        <p className="text-center text-sm" style={{ color: 'var(--text-secondary)' }}>
          Access your AI SRE platform
        </p>

        <div className="card-primary py-8 px-6 sm:px-10">
          {/* Demo Credentials Banner */}
          <div className="mb-6 p-4 glass-effect neon-border rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium" style={{ color: 'var(--neon-blue)' }}>Demo Credentials</p>
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Use test/test for quick access</p>
              </div>
              <button
                onClick={fillTestCredentials}
                className="text-sm font-medium underline transition-colors duration-300"
                style={{ color: 'var(--neon-blue)' }}
              >
                Auto-fill
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 glass-effect rounded-md flex items-center" style={{ borderColor: 'var(--neon-pink)', borderWidth: '1px' }}>
              <AlertCircle className="w-4 h-4 mr-2" style={{ color: 'var(--neon-pink)' }} />
              <p className="text-sm" style={{ color: 'var(--neon-pink)' }}>{error}</p>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="block text-sm font-medium mb-1" style={{ color: 'var(--text-primary)' }}>
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="appearance-none block w-full px-3 py-2 rounded-md focus:outline-none transition-all duration-300"
                style={{ 
                  backgroundColor: 'var(--bg-secondary)', 
                  borderColor: 'var(--border-primary)', 
                  borderWidth: '1px',
                  color: 'var(--text-primary)'
                }}
                placeholder="Enter your username"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1" style={{ color: 'var(--text-primary)' }}>
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 rounded-md focus:outline-none transition-all duration-300 pr-10"
                  style={{ 
                    backgroundColor: 'var(--bg-secondary)', 
                    borderColor: 'var(--border-primary)', 
                    borderWidth: '1px',
                    color: 'var(--text-primary)'
                  }}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" style={{ color: 'var(--text-secondary)' }} />
                  ) : (
                    <Eye className="h-4 w-4" style={{ color: 'var(--text-secondary)' }} />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded"
                  style={{ accentColor: 'var(--neon-purple)' }}
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm" style={{ color: 'var(--text-secondary)' }}>
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium transition-colors duration-300" style={{ color: 'var(--neon-blue)' }}>
                  Forgot password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : null}
                {isLoading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>

          {/* Links */}
          <div className="mt-8 pt-6 border-t text-center space-y-3" style={{ borderColor: 'var(--border-primary)' }}>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Don't have an account?{' '}
              <Link 
                href="/signup" 
                className="font-medium transition-colors duration-300"
                style={{ color: 'var(--neon-blue)' }}
              >
                Create an account
              </Link>
            </p>
            <div>
              <Link 
                href="/landing" 
                className="inline-flex items-center text-sm transition-colors duration-300"
                style={{ color: 'var(--text-secondary)' }}
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back to Landing Page
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
