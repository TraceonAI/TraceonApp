'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Briefcase, ArrowRight, Users, Zap, Heart, TrendingUp } from 'lucide-react';

const colors = {
  primary: '#3b82f6',
  primaryLight: '#60a5fa',
  secondary: '#8b5cf6',
  accent: '#10b981',
  textPrimary: '#e2e8f0',
  textSecondary: 'rgba(226, 232, 240, 0.8)',
  textMuted: 'rgba(226, 232, 240, 0.6)',
  darkBg: '#0a0e27',
};

export default function CareersPage() {
  const openPositions = [
    {
      title: 'Senior Full Stack Engineer',
      department: 'Engineering',
      location: 'San Francisco, CA / Remote',
      type: 'Full-time',
    },
    {
      title: 'Machine Learning Engineer',
      department: 'AI/ML',
      location: 'Remote',
      type: 'Full-time',
    },
    {
      title: 'Product Designer',
      department: 'Design',
      location: 'San Francisco, CA / Remote',
      type: 'Full-time',
    },
    {
      title: 'DevOps Engineer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
    },
    {
      title: 'Customer Success Manager',
      department: 'Customer Success',
      location: 'New York, NY / Remote',
      type: 'Full-time',
    },
    {
      title: 'Technical Writer',
      department: 'Documentation',
      location: 'Remote',
      type: 'Full-time',
    },
  ];

  const perks = [
    {
      icon: Heart,
      title: 'Comprehensive Health Coverage',
      description: 'Medical, dental, and vision insurance for you and your family',
    },
    {
      icon: TrendingUp,
      title: 'Equity & Growth',
      description: 'Competitive equity package and clear career progression paths',
    },
    {
      icon: Zap,
      title: 'Flexible Work',
      description: 'Remote-first culture with flexible hours and unlimited PTO',
    },
    {
      icon: Users,
      title: 'Learning Budget',
      description: '$3,000 annual budget for conferences, courses, and books',
    },
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
            Join Our Team
          </h1>
          <p style={{
            fontSize: '24px',
            color: colors.textSecondary,
            maxWidth: '800px',
            margin: '0 auto',
            lineHeight: '1.6',
          }}>
            Help us build the future of AI-powered observability. Work with world-class engineers on challenging problems.
          </p>
        </motion.div>

        {/* Perks Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '24px',
          marginBottom: '80px',
        }}>
          {perks.map((perk, i) => (
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
                <perk.icon size={24} color={colors.primary} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px', color: colors.textPrimary }}>
                {perk.title}
              </h3>
              <p style={{ fontSize: '15px', color: colors.textSecondary, lineHeight: '1.6' }}>
                {perk.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Open Positions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h2 style={{
            fontSize: '36px',
            fontWeight: 'bold',
            marginBottom: '32px',
            textAlign: 'center',
            color: colors.textPrimary,
          }}>
            Open Positions
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {openPositions.map((position, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.7 + i * 0.05 }}
                whileHover={{ x: 5 }}
                style={{
                  background: 'rgba(214,221,230,0.05)',
                  border: '1.5px solid rgba(214,221,230,0.2)',
                  borderRadius: '12px',
                  padding: '24px 32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                }}
              >
                <div>
                  <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '8px', color: colors.textPrimary }}>
                    {position.title}
                  </h3>
                  <div style={{ display: 'flex', gap: '16px', fontSize: '14px', color: colors.textMuted }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Briefcase size={14} />
                      <span>{position.department}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <MapPin size={14} />
                      <span>{position.location}</span>
                    </div>
                    <span style={{
                      padding: '2px 8px',
                      background: `rgba(16, 185, 129, 0.15)`,
                      borderRadius: '4px',
                      fontSize: '12px',
                      color: colors.accent,
                    }}>
                      {position.type}
                    </span>
                  </div>
                </div>
                <ArrowRight size={20} color={colors.primary} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          style={{
            marginTop: '80px',
            background: `linear-gradient(135deg, ${colors.primary}22 0%, ${colors.secondary}22 100%)`,
            border: `1.5px solid ${colors.primary}44`,
            borderRadius: '16px',
            padding: '48px',
            textAlign: 'center',
          }}
        >
          <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '16px', color: colors.textPrimary }}>
            Do not see a role that fits?
          </h2>
          <p style={{ fontSize: '18px', color: colors.textSecondary, marginBottom: '32px' }}>
            We are always looking for exceptional talent. Send us your resume at careers@traceon.ai
          </p>
          <a href="mailto:careers@traceon.ai" style={{
            display: 'inline-block',
            padding: '14px 32px',
            background: `linear-gradient(135deg, ${colors.primary} 0%, #2563eb 100%)`,
            color: '#ffffff',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: '600',
            boxShadow: `0 4px 20px rgba(59, 130, 246, 0.4)`,
          }}>
            Get in Touch
          </a>
        </motion.div>
      </div>
    </div>
  );
}
