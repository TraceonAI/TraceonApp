'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

const colors = {
  primary: '#3b82f6',
  secondary: '#8b5cf6',
  textPrimary: '#e2e8f0',
  textSecondary: 'rgba(226, 232, 240, 0.8)',
  textMuted: 'rgba(226, 232, 240, 0.6)',
  darkBg: '#0a0e27',
};

export default function TermsPage() {
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
            Terms of Service
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
              Agreement to Terms
            </h2>
            <p style={{ fontSize: '16px', color: colors.textSecondary, lineHeight: '1.8' }}>
              By accessing or using TraceonAI's platform and services, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access our services.
            </p>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: '600', marginBottom: '16px', color: colors.textPrimary }}>
              Use of Services
            </h2>
            <p style={{ fontSize: '16px', color: colors.textSecondary, lineHeight: '1.8', marginBottom: '16px' }}>
              You may use our services only in compliance with these Terms and all applicable laws. You agree not to:
            </p>
            <ul style={{ fontSize: '16px', color: colors.textSecondary, lineHeight: '1.8', marginLeft: '24px' }}>
              <li>Use the services for any illegal purpose</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with or disrupt the services</li>
              <li>Reverse engineer or attempt to extract source code</li>
              <li>Violate any applicable laws or regulations</li>
            </ul>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: '600', marginBottom: '16px', color: colors.textPrimary }}>
              Account Responsibilities
            </h2>
            <p style={{ fontSize: '16px', color: colors.textSecondary, lineHeight: '1.8' }}>
              You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account.
            </p>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: '600', marginBottom: '16px', color: colors.textPrimary }}>
              Intellectual Property
            </h2>
            <p style={{ fontSize: '16px', color: colors.textSecondary, lineHeight: '1.8' }}>
              The services, including all content, features, and functionality, are owned by TraceonAI and are protected by copyright, trademark, and other intellectual property laws.
            </p>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: '600', marginBottom: '16px', color: colors.textPrimary }}>
              Service Availability
            </h2>
            <p style={{ fontSize: '16px', color: colors.textSecondary, lineHeight: '1.8' }}>
              We strive to maintain 99.99% uptime, but we do not guarantee that our services will be uninterrupted or error-free. We reserve the right to modify, suspend, or discontinue any part of our services at any time.
            </p>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: '600', marginBottom: '16px', color: colors.textPrimary }}>
              Limitation of Liability
            </h2>
            <p style={{ fontSize: '16px', color: colors.textSecondary, lineHeight: '1.8' }}>
              To the maximum extent permitted by law, TraceonAI shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the services.
            </p>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: '600', marginBottom: '16px', color: colors.textPrimary }}>
              Termination
            </h2>
            <p style={{ fontSize: '16px', color: colors.textSecondary, lineHeight: '1.8' }}>
              We may terminate or suspend your account and access to the services immediately, without prior notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '28px', fontWeight: '600', marginBottom: '16px', color: colors.textPrimary }}>
              Contact Information
            </h2>
            <p style={{ fontSize: '16px', color: colors.textSecondary, lineHeight: '1.8' }}>
              For questions about these Terms of Service, please contact us at:
            </p>
            <p style={{ fontSize: '16px', color: colors.primary, marginTop: '12px' }}>
              legal@traceon.ai
            </p>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
