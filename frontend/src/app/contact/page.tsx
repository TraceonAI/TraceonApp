'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, MessageSquare, Phone, MapPin } from 'lucide-react';

const colors = {
  primary: '#3b82f6',
  primaryLight: '#60a5fa',
  secondary: '#8b5cf6',
  accent: '#10b981',
  textPrimary: '#e2e8f0',
  textSecondary: 'rgba(226, 232, 240, 0.8)',
  textMuted: 'rgba(226, 232, 240, 0.6)',
  darkBg: '#0a0e27',
  inputBg: 'rgba(10, 14, 39, 0.6)',
};

export default function ContactPage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: colors.darkBg,
      color: colors.textPrimary,
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background Effects */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            radial-gradient(circle at 20% 30%, ${colors.primary}33 0%, transparent 40%),
            radial-gradient(circle at 80% 70%, ${colors.secondary}33 0%, transparent 40%)
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

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto', padding: '80px 24px' }}>
        {/* Back Link */}
        <Link href="/landing" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          color: colors.primary,
          textDecoration: 'none',
          marginBottom: '48px',
          transition: 'color 0.2s',
        }}>
          <ArrowLeft size={20} />
          <span>Back to Home</span>
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center', marginBottom: '80px' }}
        >
          <h1 style={{
            fontSize: '56px',
            fontWeight: 'bold',
            marginBottom: '24px',
            background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Get in Touch
          </h1>
          <p style={{
            fontSize: '24px',
            color: colors.textSecondary,
            maxWidth: '800px',
            margin: '0 auto',
            lineHeight: '1.6',
          }}>
            Have questions? We would love to hear from you. Send us a message and we will respond as soon as possible.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', marginBottom: '80px' }}>
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              background: 'rgba(214,221,230,0.05)',
              border: '1.5px solid rgba(214,221,230,0.2)',
              borderRadius: '16px',
              padding: '48px',
            }}
          >
            <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '24px', color: colors.textPrimary }}>
              Send us a message
            </h2>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: colors.textPrimary }}>
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Your name"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    background: colors.inputBg,
                    backdropFilter: 'blur(16px)',
                    border: '1.5px solid rgba(59, 130, 246, 0.3)',
                    borderRadius: '8px',
                    color: colors.textPrimary,
                    fontSize: '15px',
                    outline: 'none',
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: colors.textPrimary }}>
                  Email
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    background: colors.inputBg,
                    backdropFilter: 'blur(16px)',
                    border: '1.5px solid rgba(59, 130, 246, 0.3)',
                    borderRadius: '8px',
                    color: colors.textPrimary,
                    fontSize: '15px',
                    outline: 'none',
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: colors.textPrimary }}>
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="How can we help?"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    background: colors.inputBg,
                    backdropFilter: 'blur(16px)',
                    border: '1.5px solid rgba(59, 130, 246, 0.3)',
                    borderRadius: '8px',
                    color: colors.textPrimary,
                    fontSize: '15px',
                    outline: 'none',
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: colors.textPrimary }}>
                  Message
                </label>
                <textarea
                  placeholder="Tell us more about your inquiry..."
                  rows={6}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    background: colors.inputBg,
                    backdropFilter: 'blur(16px)',
                    border: '1.5px solid rgba(59, 130, 246, 0.3)',
                    borderRadius: '8px',
                    color: colors.textPrimary,
                    fontSize: '15px',
                    outline: 'none',
                    resize: 'vertical',
                    fontFamily: 'inherit',
                  }}
                />
              </div>
              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '14px 24px',
                  background: `linear-gradient(135deg, ${colors.primary} 0%, #2563eb 100%)`,
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '15px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  boxShadow: `0 4px 20px rgba(59, 130, 246, 0.4)`,
                }}
              >
                Send Message
              </button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}
          >
            <div>
              <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '24px', color: colors.textPrimary }}>
                Contact Information
              </h2>
              <p style={{ fontSize: '16px', color: colors.textSecondary, lineHeight: '1.6', marginBottom: '32px' }}>
                Reach out through any of these channels and our team will get back to you within 24 hours.
              </p>
            </div>

            <div style={{
              background: 'rgba(214,221,230,0.05)',
              border: '1.5px solid rgba(214,221,230,0.2)',
              borderRadius: '12px',
              padding: '24px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '16px',
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                background: `rgba(59, 130, 246, 0.15)`,
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <Mail size={24} color={colors.primary} />
              </div>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px', color: colors.textPrimary }}>
                  Email
                </h3>
                <a href="mailto:support@traceon.ai" style={{ fontSize: '16px', color: colors.primary, textDecoration: 'none' }}>
                  support@traceon.ai
                </a>
              </div>
            </div>

            <div style={{
              background: 'rgba(214,221,230,0.05)',
              border: '1.5px solid rgba(214,221,230,0.2)',
              borderRadius: '12px',
              padding: '24px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '16px',
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                background: `rgba(59, 130, 246, 0.15)`,
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <MessageSquare size={24} color={colors.primary} />
              </div>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px', color: colors.textPrimary }}>
                  Sales
                </h3>
                <a href="mailto:sales@traceon.ai" style={{ fontSize: '16px', color: colors.primary, textDecoration: 'none' }}>
                  sales@traceon.ai
                </a>
              </div>
            </div>

            <div style={{
              background: 'rgba(214,221,230,0.05)',
              border: '1.5px solid rgba(214,221,230,0.2)',
              borderRadius: '12px',
              padding: '24px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '16px',
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                background: `rgba(59, 130, 246, 0.15)`,
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <MapPin size={24} color={colors.primary} />
              </div>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px', color: colors.textPrimary }}>
                  Office
                </h3>
                <p style={{ fontSize: '16px', color: colors.textSecondary, lineHeight: '1.6' }}>
                  123 Innovation Drive<br />
                  San Francisco, CA 94105<br />
                  United States
                </p>
              </div>
            </div>

            <div style={{
              background: 'rgba(214,221,230,0.05)',
              border: '1.5px solid rgba(214,221,230,0.2)',
              borderRadius: '12px',
              padding: '24px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '16px',
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                background: `rgba(59, 130, 246, 0.15)`,
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <Phone size={24} color={colors.primary} />
              </div>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px', color: colors.textPrimary }}>
                  Phone
                </h3>
                <p style={{ fontSize: '16px', color: colors.textSecondary }}>
                  +1 (555) 123-4567
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
