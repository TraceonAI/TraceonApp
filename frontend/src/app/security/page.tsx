'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield, Lock, Eye, CheckCircle } from 'lucide-react';

const colors = {
  primary: '#3b82f6',
  secondary: '#8b5cf6',
  accent: '#10b981',
  textPrimary: '#e2e8f0',
  textSecondary: 'rgba(226, 232, 240, 0.8)',
  textMuted: 'rgba(226, 232, 240, 0.6)',
  darkBg: '#0a0e27',
};

export default function SecurityPage() {
  const securityFeatures = [
    {
      icon: Shield,
      title: 'Enterprise-Grade Encryption',
      description: 'All data is encrypted in transit (TLS 1.3) and at rest (AES-256) to ensure maximum security.',
    },
    {
      icon: Lock,
      title: 'SOC 2 Type II Compliant',
      description: 'We maintain SOC 2 Type II compliance and undergo regular third-party security audits.',
    },
    {
      icon: Eye,
      title: 'Access Controls & Monitoring',
      description: 'Role-based access controls, multi-factor authentication, and continuous security monitoring.',
    },
    {
      icon: CheckCircle,
      title: 'Regular Penetration Testing',
      description: 'We conduct quarterly penetration tests and vulnerability assessments by certified security experts.',
    },
  ];

  const certifications = [
    'SOC 2 Type II',
    'GDPR Compliant',
    'HIPAA Ready',
    'ISO 27001',
  ];

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
            Security & Compliance
          </h1>
          <p style={{
            fontSize: '24px',
            color: colors.textSecondary,
            maxWidth: '800px',
            margin: '0 auto',
            lineHeight: '1.6',
          }}>
            Your data security is our top priority. We implement industry-leading security practices and maintain strict compliance standards.
          </p>
        </motion.div>

        {/* Security Features Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
          marginBottom: '80px',
        }}>
          {securityFeatures.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              style={{
                background: 'rgba(214,221,230,0.05)',
                border: '1.5px solid rgba(214,221,230,0.2)',
                borderRadius: '16px',
                padding: '32px',
              }}
            >
              <div style={{
                width: '48px',
                height: '48px',
                background: `rgba(59, 130, 246, 0.15)`,
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px',
              }}>
                <feature.icon size={24} color={colors.primary} />
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px', color: colors.textPrimary }}>
                {feature.title}
              </h3>
              <p style={{ fontSize: '16px', color: colors.textSecondary, lineHeight: '1.6' }}>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          style={{
            background: 'rgba(214,221,230,0.05)',
            border: '1.5px solid rgba(214,221,230,0.2)',
            borderRadius: '16px',
            padding: '48px',
            marginBottom: '80px',
          }}
        >
          <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '32px', textAlign: 'center', color: colors.textPrimary }}>
            Certifications & Compliance
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '24px',
          }}>
            {certifications.map((cert, i) => (
              <div key={i} style={{
                background: `rgba(59, 130, 246, 0.1)`,
                border: `1.5px solid ${colors.primary}44`,
                borderRadius: '12px',
                padding: '24px',
                textAlign: 'center',
              }}>
                <CheckCircle size={32} color={colors.accent} style={{ marginBottom: '12px', display: 'block', margin: '0 auto 12px' }} />
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: colors.textPrimary }}>
                  {cert}
                </h3>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          style={{
            background: 'rgba(214,221,230,0.05)',
            border: '1.5px solid rgba(214,221,230,0.2)',
            borderRadius: '16px',
            padding: '48px',
          }}
        >
          <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '24px', color: colors.textPrimary }}>
            Our Security Commitment
          </h2>
          <p style={{ fontSize: '16px', color: colors.textSecondary, lineHeight: '1.8', marginBottom: '20px' }}>
            At TraceonAI, we treat security as a continuous process, not a one-time achievement. Our security program includes:
          </p>
          <ul style={{ fontSize: '16px', color: colors.textSecondary, lineHeight: '1.8', marginLeft: '24px', marginBottom: '24px' }}>
            <li>24/7 security monitoring and incident response</li>
            <li>Regular security training for all employees</li>
            <li>Encrypted backups with point-in-time recovery</li>
            <li>Strict vendor security assessments</li>
            <li>Bug bounty program for responsible disclosure</li>
            <li>Annual third-party security audits</li>
          </ul>
          <p style={{ fontSize: '16px', color: colors.textSecondary, lineHeight: '1.8' }}>
            For security inquiries or to report a vulnerability, please contact our security team at{' '}
            <span style={{ color: colors.primary }}>security@traceon.ai</span>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
