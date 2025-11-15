'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Brain, Eye, EyeOff, ArrowLeft, AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

// Tech-focused color palette matching landing page
const colors = {
  primary: '#3b82f6',
  primaryLight: '#60a5fa',
  secondary: '#8b5cf6',
  accent: '#10b981',
  textPrimary: '#e2e8f0',
  textSecondary: 'rgba(226, 232, 240, 0.8)',
  textMuted: 'rgba(226, 232, 240, 0.6)',
  darkBg: '#0a0e27',
  darkerBg: '#050810',
  inputBg: 'rgba(10, 14, 39, 0.6)',
};

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
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '48px 16px',
      backgroundColor: colors.darkBg,
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Tech Background with Glows and Patterns */}
      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            radial-gradient(circle at 20% 30%, ${colors.primary}33 0%, transparent 40%),
            radial-gradient(circle at 80% 70%, ${colors.secondary}33 0%, transparent 40%),
            radial-gradient(circle at 50% 50%, ${colors.accent}1a 0%, transparent 50%)
          `,
        }} />
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          opacity: 0.3,
        }} />
      </div>

      <div style={{
        width: '100%',
        maxWidth: '448px',
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
        position: 'relative',
        zIndex: 1,
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
          <Link href="/landing" style={{ display: 'inline-block' }}>
            <div style={{ 
              cursor: 'pointer',
              transition: 'transform 0.2s ease',
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <Image 
                src="/images/logo.png" 
                alt="TraceonAI" 
                width={200} 
                height={50}
                style={{ objectFit: 'contain' }}
                priority
              />
            </div>
          </Link>
        </div>
        <h2 style={{
          textAlign: 'center',
          fontSize: '30px',
          fontWeight: 'bold',
          letterSpacing: '-0.025em',
          color: colors.textPrimary,
        }}>
          Sign in to your account
        </h2>
        <p style={{
          textAlign: 'center',
          fontSize: '14px',
          color: colors.textSecondary,
        }}>
          Access your AI SRE platform
        </p>

                <div style={{
          backgroundColor: colors.inputBg,
          backdropFilter: 'blur(16px)',
          border: `1.5px solid rgba(59, 130, 246, 0.2)`,
          borderRadius: '16px',
          padding: '32px 40px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
        }}>
          {/* Demo Credentials Banner */}
          <div style={{
            marginBottom: '24px',
            borderRadius: '12px',
            padding: '16px',
            backgroundColor: `rgba(139, 92, 246, 0.1)`,
            border: `1px solid rgba(139, 92, 246, 0.3)`,
          }}>
            <p style={{
              fontSize: '14px',
              marginBottom: '8px',
              color: colors.textSecondary,
            }}>
              For testing purposes, use:
            </p>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <div style={{
                fontSize: '12px',
                fontFamily: 'monospace',
                color: colors.textPrimary,
              }}>
                <div>Username: test</div>
                <div>Password: test</div>
              </div>
              <button
                type="button"
                onClick={fillTestCredentials}
                style={{
                  fontSize: '12px',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  backgroundColor: `rgba(139, 92, 246, 0.2)`,
                  color: colors.secondary,
                  border: `1px solid rgba(139, 92, 246, 0.4)`,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = `rgba(139, 92, 246, 0.3)`;
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = `rgba(139, 92, 246, 0.2)`;
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                Auto-fill
              </button>
            </div>
          </div>

                    {/* Error Message */}
          {error && (
            <div style={{
              marginBottom: '16px',
              padding: '12px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
            }}>
              <AlertCircle style={{
                width: '20px',
                height: '20px',
                flexShrink: 0,
                color: '#ef4444',
              }} />
              <p style={{ fontSize: '14px', color: '#ef4444' }}>{error}</p>
            </div>
          )}

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <label htmlFor="username" style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                marginBottom: '8px',
                color: colors.textPrimary,
              }}>
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  backgroundColor: colors.inputBg,
                  backdropFilter: 'blur(16px)',
                  border: `1.5px solid rgba(59, 130, 246, 0.3)`,
                  borderRadius: '8px',
                  color: colors.textPrimary,
                  fontSize: '15px',
                  outline: 'none',
                  transition: 'all 0.2s',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.border = `1.5px solid ${colors.primary}`;
                  e.currentTarget.style.boxShadow = `0 0 0 3px rgba(59, 130, 246, 0.1)`;
                }}
                onBlur={(e) => {
                  e.currentTarget.style.border = `1.5px solid rgba(59, 130, 246, 0.3)`;
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </div>

            <div>
              <label htmlFor="password" style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                marginBottom: '8px',
                color: colors.textPrimary,
              }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  style={{
                    width: '100%',
                    padding: '14px 48px 14px 16px',
                    backgroundColor: colors.inputBg,
                    backdropFilter: 'blur(16px)',
                    border: `1.5px solid rgba(59, 130, 246, 0.3)`,
                    borderRadius: '8px',
                    color: colors.textPrimary,
                    fontSize: '15px',
                    outline: 'none',
                    transition: 'all 0.2s',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.border = `1.5px solid ${colors.primary}`;
                    e.currentTarget.style.boxShadow = `0 0 0 3px rgba(59, 130, 246, 0.1)`;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.border = `1.5px solid rgba(59, 130, 246, 0.3)`;
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: colors.textSecondary,
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = colors.primary}
                  onMouseLeave={(e) => e.currentTarget.style.color = colors.textSecondary}
                >
                  {showPassword ? <EyeOff style={{ width: '20px', height: '20px' }} /> : <Eye style={{ width: '20px', height: '20px' }} />}
                </button>
              </div>
            </div>                        <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
              }}>
                <input
                  type="checkbox"
                  style={{
                    width: '16px',
                    height: '16px',
                    borderRadius: '4px',
                    accentColor: colors.primary,
                    cursor: 'pointer',
                  }}
                />
                <span style={{ fontSize: '14px', color: colors.textSecondary }}>
                  Remember me
                </span>
              </label>
              <Link 
                href="/forgot-password"
                style={{
                  fontSize: '14px',
                  color: colors.primary,
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = colors.primaryLight}
                onMouseLeave={(e) => e.currentTarget.style.color = colors.primary}
              >
                Forgot password?
              </Link>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                style={{
                  width: '100%',
                  padding: '14px 24px',
                  background: isLoading 
                    ? 'rgba(59, 130, 246, 0.5)'
                    : `linear-gradient(135deg, ${colors.primary} 0%, #2563eb 100%)`,
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '15px',
                  fontWeight: '600',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: isLoading ? 'none' : `0 4px 20px rgba(59, 130, 246, 0.4)`,
                  transition: 'all 0.2s',
                  opacity: isLoading ? 0.5 : 1,
                }}
                onMouseEnter={(e) => {
                  if (!isLoading) {
                    e.currentTarget.style.transform = 'scale(1.02)';
                    e.currentTarget.style.boxShadow = `0 6px 24px rgba(59, 130, 246, 0.5)`;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isLoading) {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = `0 4px 20px rgba(59, 130, 246, 0.4)`;
                  }
                }}
              >
                {isLoading ? (
                  <>
                    <Loader2 style={{ width: '16px', height: '16px', marginRight: '8px' }} className="animate-spin" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  'Sign in'
                )}
              </button>
            </div>
          </form>

          {/* Links */}
          <div style={{
            marginTop: '32px',
            paddingTop: '24px',
            borderTop: `1px solid rgba(59, 130, 246, 0.2)`,
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}>
            <Link 
              href="/landing"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '14px',
                color: colors.textSecondary,
                textDecoration: 'none',
                transition: 'color 0.2s',
                justifyContent: 'center',
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = colors.primary}
              onMouseLeave={(e) => e.currentTarget.style.color = colors.textSecondary}
            >
              <ArrowLeft style={{ width: '16px', height: '16px' }} />
              <span>Back to Landing Page</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
