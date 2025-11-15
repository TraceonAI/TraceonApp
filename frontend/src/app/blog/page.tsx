'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';

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

export default function BlogPage() {
  const blogPosts = [
    {
      title: 'Reducing MTTR by 82%: How AI Transforms Incident Response',
      excerpt: 'Discover how TraceonAI leverages advanced machine learning to dramatically reduce mean time to resolution and keep your systems healthy.',
      date: 'November 5, 2025',
      readTime: '8 min read',
      category: 'Product',
    },
    {
      title: 'The Future of Observability: AI-Powered Infrastructure Intelligence',
      excerpt: 'Traditional monitoring is dead. Learn why AI-driven observability is the next evolution in infrastructure management.',
      date: 'October 28, 2025',
      readTime: '6 min read',
      category: 'Technology',
    },
    {
      title: 'Building Resilient Systems: Best Practices from Top SRE Teams',
      excerpt: 'Insights from engineering leaders at scale on how to build systems that are resilient, observable, and maintainable.',
      date: 'October 15, 2025',
      readTime: '10 min read',
      category: 'Best Practices',
    },
    {
      title: 'Case Study: How CloudScale Achieved 99.99% Uptime',
      excerpt: 'A deep dive into how CloudScale used TraceonAI to transform their incident management and achieve enterprise-grade reliability.',
      date: 'October 2, 2025',
      readTime: '12 min read',
      category: 'Case Study',
    },
    {
      title: 'Automated Root Cause Analysis: The End of Manual Debugging',
      excerpt: 'Say goodbye to hours of log diving. Discover how AI can pinpoint the exact cause of incidents in seconds.',
      date: 'September 20, 2025',
      readTime: '7 min read',
      category: 'Product',
    },
    {
      title: 'Integration Spotlight: Connecting TraceonAI with Your Tech Stack',
      excerpt: 'Learn how to seamlessly integrate TraceonAI with popular tools like Datadog, Grafana, Slack, and more.',
      date: 'September 8, 2025',
      readTime: '5 min read',
      category: 'Integration',
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
            Blog & Insights
          </h1>
          <p style={{
            fontSize: '24px',
            color: colors.textSecondary,
            maxWidth: '800px',
            margin: '0 auto',
            lineHeight: '1.6',
          }}>
            The latest updates, insights, and best practices from the TraceonAI team
          </p>
        </motion.div>

        {/* Blog Posts Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '32px' }}>
          {blogPosts.map((post, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              whileHover={{ y: -5 }}
              style={{
                background: 'rgba(214,221,230,0.05)',
                border: '1.5px solid rgba(214,221,230,0.2)',
                borderRadius: '16px',
                padding: '32px',
                cursor: 'pointer',
                transition: 'all 0.3s',
              }}
            >
              <div style={{
                display: 'inline-block',
                padding: '6px 12px',
                background: `rgba(59, 130, 246, 0.15)`,
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: '600',
                color: colors.primary,
                marginBottom: '16px',
              }}>
                {post.category}
              </div>
              
              <h2 style={{
                fontSize: '24px',
                fontWeight: '600',
                marginBottom: '12px',
                color: colors.textPrimary,
                lineHeight: '1.4',
              }}>
                {post.title}
              </h2>
              
              <p style={{
                fontSize: '16px',
                color: colors.textSecondary,
                lineHeight: '1.6',
                marginBottom: '24px',
              }}>
                {post.excerpt}
              </p>
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '24px',
                borderTop: '1px solid rgba(214,221,230,0.1)',
              }}>
                <div style={{ display: 'flex', gap: '16px', fontSize: '14px', color: colors.textMuted }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Calendar size={14} />
                    <span>{post.date}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Clock size={14} />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                
                <ArrowRight size={20} color={colors.primary} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Newsletter CTA */}
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
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '16px', color: colors.textPrimary }}>
            Stay Updated
          </h2>
          <p style={{ fontSize: '18px', color: colors.textSecondary, marginBottom: '32px' }}>
            Subscribe to our newsletter for the latest updates and insights
          </p>
          <div style={{
            display: 'flex',
            gap: '12px',
            maxWidth: '500px',
            margin: '0 auto',
          }}>
            <input
              type="email"
              placeholder="Enter your email"
              style={{
                flex: 1,
                padding: '14px 20px',
                background: 'rgba(10, 14, 39, 0.6)',
                border: '1.5px solid rgba(59, 130, 246, 0.3)',
                borderRadius: '8px',
                color: colors.textPrimary,
                fontSize: '15px',
                outline: 'none',
              }}
            />
            <button style={{
              padding: '14px 32px',
              background: `linear-gradient(135deg, ${colors.primary} 0%, #2563eb 100%)`,
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: `0 4px 20px rgba(59, 130, 246, 0.4)`,
            }}>
              Subscribe
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
