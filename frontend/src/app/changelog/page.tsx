'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Zap, Bug, Sparkles } from 'lucide-react';

const colors = {
  primary: '#3b82f6',
  secondary: '#8b5cf6',
  accent: '#10b981',
  textPrimary: '#e2e8f0',
  textSecondary: 'rgba(226, 232, 240, 0.8)',
  textMuted: 'rgba(226, 232, 240, 0.6)',
  darkBg: '#0a0e27',
};

export default function ChangelogPage() {
  const updates = [
    {
      version: '2.5.0',
      date: 'November 5, 2025',
      type: 'feature',
      items: [
        'New AI-powered root cause analysis with 95% accuracy',
        'Enhanced dashboard with real-time metrics visualization',
        'Microsoft Teams and Slack integration improvements',
        'Added support for custom alert thresholds',
      ],
    },
    {
      version: '2.4.2',
      date: 'October 28, 2025',
      type: 'improvement',
      items: [
        'Improved query performance by 40%',
        'Enhanced mobile responsiveness',
        'Updated integration documentation',
        'Optimized database indexing',
      ],
    },
    {
      version: '2.4.0',
      date: 'October 15, 2025',
      type: 'feature',
      items: [
        'Introduced automated incident remediation',
        'New topology view for infrastructure mapping',
        'Added Prometheus and Grafana integrations',
        'Enhanced API rate limiting controls',
      ],
    },
    {
      version: '2.3.5',
      date: 'October 2, 2025',
      type: 'fix',
      items: [
        'Fixed issue with alert notifications not being sent',
        'Resolved memory leak in log processing',
        'Fixed timezone inconsistencies in reports',
        'Corrected dashboard widget refresh behavior',
      ],
    },
    {
      version: '2.3.0',
      date: 'September 20, 2025',
      type: 'feature',
      items: [
        'New runbook automation engine',
        'Advanced anomaly detection algorithms',
        'SLO tracking and reporting dashboard',
        'Multi-region deployment support',
      ],
    },
    {
      version: '2.2.0',
      date: 'September 8, 2025',
      type: 'feature',
      items: [
        'Introduced agent console for debugging',
        'New analytics dashboard with custom widgets',
        'Added support for custom metrics',
        'Enhanced security with SSO integration',
      ],
    },
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'feature':
        return colors.accent;
      case 'improvement':
        return colors.primary;
      case 'fix':
        return colors.secondary;
      default:
        return colors.textMuted;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'feature':
        return Sparkles;
      case 'improvement':
        return Zap;
      case 'fix':
        return Bug;
      default:
        return Calendar;
    }
  };

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
            Changelog
          </h1>
          <p style={{
            fontSize: '24px',
            color: colors.textSecondary,
            maxWidth: '800px',
            margin: '0 auto',
            lineHeight: '1.6',
          }}>
            Track the latest features, improvements, and fixes to TraceonAI
          </p>
        </motion.div>

        {/* Updates Timeline */}
        <div style={{ position: 'relative' }}>
          {/* Timeline Line */}
          <div style={{
            position: 'absolute',
            left: '20px',
            top: '0',
            bottom: '0',
            width: '2px',
            background: `linear-gradient(to bottom, ${colors.primary}, ${colors.secondary})`,
            opacity: 0.3,
          }} />

          {updates.map((update, i) => {
            const Icon = getTypeIcon(update.type);
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                style={{
                  position: 'relative',
                  marginBottom: '48px',
                  paddingLeft: '60px',
                }}
              >
                {/* Timeline Dot */}
                <div style={{
                  position: 'absolute',
                  left: '8px',
                  top: '8px',
                  width: '24px',
                  height: '24px',
                  background: getTypeColor(update.type),
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '3px solid ' + colors.darkBg,
                }}>
                  <Icon size={12} color={colors.darkBg} />
                </div>

                {/* Update Card */}
                <div style={{
                  background: 'rgba(214,221,230,0.05)',
                  border: '1.5px solid rgba(214,221,230,0.2)',
                  borderRadius: '12px',
                  padding: '24px',
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '16px',
                  }}>
                    <div>
                      <h2 style={{
                        fontSize: '24px',
                        fontWeight: '600',
                        color: colors.textPrimary,
                        marginBottom: '4px',
                      }}>
                        Version {update.version}
                      </h2>
                      <div style={{
                        fontSize: '14px',
                        color: colors.textMuted,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}>
                        <Calendar size={14} />
                        <span>{update.date}</span>
                      </div>
                    </div>
                    <div style={{
                      padding: '6px 12px',
                      background: `${getTypeColor(update.type)}22`,
                      border: `1px solid ${getTypeColor(update.type)}44`,
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '600',
                      color: getTypeColor(update.type),
                      textTransform: 'capitalize',
                    }}>
                      {update.type}
                    </div>
                  </div>

                  <ul style={{
                    fontSize: '16px',
                    color: colors.textSecondary,
                    lineHeight: '1.8',
                    marginLeft: '20px',
                  }}>
                    {update.items.map((item, j) => (
                      <li key={j} style={{ marginBottom: '8px' }}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
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
            Stay Up to Date
          </h2>
          <p style={{ fontSize: '18px', color: colors.textSecondary, marginBottom: '32px' }}>
            Subscribe to our newsletter to get notified about new features and updates
          </p>
          <Link href="/blog" style={{
            display: 'inline-block',
            padding: '14px 32px',
            background: `linear-gradient(135deg, ${colors.primary} 0%, #2563eb 100%)`,
            color: '#ffffff',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: '600',
            boxShadow: `0 4px 20px rgba(59, 130, 246, 0.4)`,
          }}>
            Read Our Blog
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
