'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield, Lock, Eye, Database } from 'lucide-react';

const colors = {
  primary: '#3b82f6',
  secondary: '#8b5cf6',
  textPrimary: '#e2e8f0',
  textSecondary: 'rgba(226, 232, 240, 0.8)',
  textMuted: 'rgba(226, 232, 240, 0.6)',
  darkBg: '#0a0e27',
};

export default function PrivacyPage() {
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
      <div style={{ position: 'relative', zIndex: 1, maxWidth: '900px', margin: '0 auto', padding: '80px 24px' }}>
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
          style={{ marginBottom: '48px' }}
        >
          <h1 style={{
            fontSize: '48px',
            fontWeight: 'bold',
            marginBottom: '16px',
            background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Privacy Policy
          </h1>
          <p style={{ fontSize: '16px', color: colors.textMuted }}>
            Last updated: November 9, 2025
          </p>
        </motion.div>

        {/* Content Sections */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            background: 'rgba(214,221,230,0.05)',
            border: '1.5px solid rgba(214,221,230,0.2)',
            borderRadius: '16px',
            padding: '48px',
          }}
        >
          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: '600', marginBottom: '16px', color: colors.textPrimary }}>
              Introduction
            </h2>
            <p style={{ fontSize: '16px', color: colors.textSecondary, lineHeight: '1.8', marginBottom: '16px' }}>
              TraceonAI ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform and services.
            </p>
            <p style={{ fontSize: '16px', color: colors.textSecondary, lineHeight: '1.8' }}>
              Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the platform.
            </p>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: '600', marginBottom: '16px', color: colors.textPrimary }}>
              Information We Collect
            </h2>
            <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px', color: colors.textPrimary }}>
              Personal Data
            </h3>
            <p style={{ fontSize: '16px', color: colors.textSecondary, lineHeight: '1.8', marginBottom: '16px' }}>
              We collect personal information that you voluntarily provide when registering for our services, including:
            </p>
            <ul style={{ fontSize: '16px', color: colors.textSecondary, lineHeight: '1.8', marginLeft: '24px', marginBottom: '16px' }}>
              <li>Name and contact information (email address, phone number)</li>
              <li>Company information</li>
              <li>Payment and billing information</li>
              <li>Account credentials</li>
            </ul>
            
            <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px', marginTop: '24px', color: colors.textPrimary }}>
              Usage Data
            </h3>
            <p style={{ fontSize: '16px', color: colors.textSecondary, lineHeight: '1.8' }}>
              We automatically collect certain information when you access our platform, including IP addresses, browser type, device information, and usage patterns.
            </p>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: '600', marginBottom: '16px', color: colors.textPrimary }}>
              How We Use Your Information
            </h2>
            <p style={{ fontSize: '16px', color: colors.textSecondary, lineHeight: '1.8', marginBottom: '16px' }}>
              We use the information we collect to:
            </p>
            <ul style={{ fontSize: '16px', color: colors.textSecondary, lineHeight: '1.8', marginLeft: '24px' }}>
              <li>Provide, operate, and maintain our services</li>
              <li>Process your transactions and manage your account</li>
              <li>Improve and optimize our platform</li>
              <li>Communicate with you about updates, security alerts, and support</li>
              <li>Detect and prevent fraud and security incidents</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: '600', marginBottom: '16px', color: colors.textPrimary }}>
              Data Security
            </h2>
            <p style={{ fontSize: '16px', color: colors.textSecondary, lineHeight: '1.8' }}>
              We implement industry-standard security measures to protect your personal information, including encryption, access controls, and regular security audits. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: '600', marginBottom: '16px', color: colors.textPrimary }}>
              Data Retention
            </h2>
            <p style={{ fontSize: '16px', color: colors.textSecondary, lineHeight: '1.8' }}>
              We retain your personal information for as long as necessary to fulfill the purposes outlined in this privacy policy, unless a longer retention period is required by law.
            </p>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: '600', marginBottom: '16px', color: colors.textPrimary }}>
              Your Rights
            </h2>
            <p style={{ fontSize: '16px', color: colors.textSecondary, lineHeight: '1.8', marginBottom: '16px' }}>
              Depending on your location, you may have certain rights regarding your personal data:
            </p>
            <ul style={{ fontSize: '16px', color: colors.textSecondary, lineHeight: '1.8', marginLeft: '24px' }}>
              <li>Access and receive a copy of your personal data</li>
              <li>Correct inaccurate or incomplete data</li>
              <li>Request deletion of your personal data</li>
              <li>Object to or restrict processing of your data</li>
              <li>Data portability</li>
              <li>Withdraw consent at any time</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontSize: '28px', fontWeight: '600', marginBottom: '16px', color: colors.textPrimary }}>
              Contact Us
            </h2>
            <p style={{ fontSize: '16px', color: colors.textSecondary, lineHeight: '1.8' }}>
              If you have questions about this Privacy Policy or our privacy practices, please contact us at:
            </p>
            <p style={{ fontSize: '16px', color: colors.primary, marginTop: '12px' }}>
              privacy@traceon.ai
            </p>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
