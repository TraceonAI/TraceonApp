'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Users, Target, Heart, Zap } from 'lucide-react';

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
};

export default function AboutPage() {
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
            About TraceonAI
          </h1>
          <p style={{
            fontSize: '24px',
            color: colors.textSecondary,
            maxWidth: '800px',
            margin: '0 auto',
            lineHeight: '1.6',
          }}>
            We're building the future of AI-powered observability and incident management
          </p>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            background: 'rgba(214,221,230,0.05)',
            border: '1.5px solid rgba(214,221,230,0.2)',
            borderRadius: '16px',
            padding: '48px',
            marginBottom: '48px',
          }}
        >
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '24px', color: colors.textPrimary }}>
            Our Mission
          </h2>
          <p style={{ fontSize: '18px', color: colors.textSecondary, lineHeight: '1.8', marginBottom: '24px' }}>
            TraceonAI was founded with a singular vision: to eliminate the chaos of incident management and make 
            infrastructure monitoring intelligent, proactive, and effortless. We believe engineering teams should 
            spend their time building, not firefighting.
          </p>
          <p style={{ fontSize: '18px', color: colors.textSecondary, lineHeight: '1.8' }}>
            By combining cutting-edge AI with deep observability, we're transforming how teams detect, diagnose, 
            and resolve incidents—reducing MTTR by up to 82% and giving engineers their time back.
          </p>
        </motion.div>

        {/* Values Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '80px' }}>
          {[
            {
              icon: Target,
              title: 'Innovation First',
              description: 'We push the boundaries of what is possible with AI and observability technology.',
            },
            {
              icon: Users,
              title: 'Customer Obsessed',
              description: 'Every feature we build starts with understanding your pain points and needs.',
            },
            {
              icon: Zap,
              title: 'Move Fast',
              description: 'Speed matters. We ship quickly, iterate constantly, and improve relentlessly.',
            },
            {
              icon: Heart,
              title: 'Engineers First',
              description: 'Built by engineers, for engineers. We understand the challenges you face.',
            },
          ].map((value, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
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
                <value.icon size={24} color={colors.primary} />
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px', color: colors.textPrimary }}>
                {value.title}
              </h3>
              <p style={{ fontSize: '16px', color: colors.textSecondary, lineHeight: '1.6' }}>
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '32px',
            textAlign: 'center',
            marginBottom: '80px',
          }}
        >
          {[
            { value: '500+', label: 'Engineering Teams' },
            { value: '82%', label: 'Faster MTTR' },
            { value: '10M+', label: 'Events Processed Daily' },
            { value: '99.99%', label: 'Platform Uptime' },
          ].map((stat, i) => (
            <div key={i}>
              <div style={{
                fontSize: '48px',
                fontWeight: 'bold',
                background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: '8px',
              }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '16px', color: colors.textSecondary }}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          style={{
            background: `linear-gradient(135deg, ${colors.primary}22 0%, ${colors.secondary}22 100%)`,
            border: `1.5px solid ${colors.primary}44`,
            borderRadius: '16px',
            padding: '48px',
            textAlign: 'center',
          }}
        >
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '16px', color: colors.textPrimary }}>
            Join us on our mission
          </h2>
          <p style={{ fontSize: '18px', color: colors.textSecondary, marginBottom: '32px' }}>
            We're always looking for talented individuals who want to make a difference
          </p>
          <Link href="/careers" style={{
            display: 'inline-block',
            padding: '14px 32px',
            background: `linear-gradient(135deg, ${colors.primary} 0%, #2563eb 100%)`,
            color: '#ffffff',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: '600',
            boxShadow: `0 4px 20px rgba(59, 130, 246, 0.4)`,
          }}>
            View Open Positions
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
