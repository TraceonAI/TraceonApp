'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Zap, Shield, TrendingUp, Clock, Check, Brain, Database, Network, Activity } from 'lucide-react';

const styles = {
  primary: '#3b82f6',        // Tech Blue
  primaryLight: '#60a5fa',   // Lighter Blue
  secondary: '#8b5cf6',      // Purple accent
  accent: '#10b981',         // Emerald accent
  cyan: '#06b6d4',           // Cyan highlight
  textPrimary: '#e2e8f0',    // Light slate
  textSecondary: 'rgba(226, 232, 240, 0.8)',
  textMuted: 'rgba(226, 232, 240, 0.6)',
  darkBg: '#0a0e27',
  darkerBg: '#050810',
  darkText: '#020306',
};

// Smooth scroll utility function
const smoothScrollTo = (elementId: string) => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
};

function Logomark() {
  return (
    <Image 
      src="/images/logo_icon.png" 
      alt="TraceonAI Logo" 
      width={32} 
      height={32}
      style={{ objectFit: 'contain' }}
    />
  );
}

function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      style={{
        backgroundColor: scrolled ? 'rgba(10, 14, 39, 0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        borderBottom: scrolled ? '1px solid rgba(59, 130, 246, 0.2)' : 'none',
        transition: 'all 500ms',
        width: '100%'
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div style={{ 
        maxWidth: 1440, 
        margin: '0 auto', 
        padding: scrolled ? '8px 48px' : '8px 48px',
        transition: 'all 500ms'
      }}>
        <div style={{
          backdropFilter: scrolled ? 'none' : 'blur(48px)',
          background: scrolled ? 'transparent' : 'rgba(59, 130, 246, 0.08)',
          display: 'flex',
          gap: 96,
          alignItems: 'center',
          padding: '8px 24px',
          borderRadius: scrolled ? 0 : 16,
          boxShadow: scrolled ? 'none' : '0px 4px 24px rgba(0, 0, 0, 0.16)',
          transition: 'all 500ms'
        }}>
          <Link href="/" style={{ display: 'flex', gap: 4, alignItems: 'center', textDecoration: 'none' }}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Image 
                src="/images/logo.png" 
                alt="TraceonAI" 
                width={160} 
                height={40}
                style={{ objectFit: 'contain' }}
                priority
              />
            </motion.div>
          </Link>
          <div style={{ display: 'flex', gap: 20, alignItems: 'center', flex: 1 }}>
            <motion.a 
              href="#features"
              onClick={(e) => {
                e.preventDefault();
                smoothScrollTo('features');
              }}
              style={{
                color: styles.textPrimary,
                fontSize: 15,
                fontWeight: 500,
                textDecoration: 'none',
                cursor: 'pointer'
              }}
              whileHover={{ 
                color: styles.primary,
                scale: 1.05
              }}
              transition={{ duration: 0.2 }}
            >
              Features
            </motion.a>
            <motion.a 
              href="#setup"
              onClick={(e) => {
                e.preventDefault();
                smoothScrollTo('setup');
              }}
              style={{
                color: styles.textPrimary,
                fontSize: 15,
                fontWeight: 500,
                textDecoration: 'none',
                cursor: 'pointer'
              }}
              whileHover={{ 
                color: styles.primary,
                scale: 1.05
              }}
              transition={{ duration: 0.2 }}
            >
              Setup
            </motion.a>
            <motion.a 
              href="#ai-features"
              onClick={(e) => {
                e.preventDefault();
                smoothScrollTo('ai-features');
              }}
              style={{
                color: styles.textPrimary,
                fontSize: 15,
                fontWeight: 500,
                textDecoration: 'none',
                cursor: 'pointer'
              }}
              whileHover={{ 
                color: styles.primary,
                scale: 1.05
              }}
              transition={{ duration: 0.2 }}
            >
              AI
            </motion.a>
            <motion.a 
              href="#integrations"
              onClick={(e) => {
                e.preventDefault();
                smoothScrollTo('integrations');
              }}
              style={{
                color: styles.textPrimary,
                fontSize: 15,
                fontWeight: 500,
                textDecoration: 'none',
                cursor: 'pointer'
              }}
              whileHover={{ 
                color: styles.primary,
                scale: 1.05
              }}
              transition={{ duration: 0.2 }}
            >
              Integrations
            </motion.a>
            <motion.a 
              href="#pricing"
              onClick={(e) => {
                e.preventDefault();
                smoothScrollTo('pricing');
              }}
              style={{
                color: styles.textPrimary,
                fontSize: 15,
                fontWeight: 500,
                textDecoration: 'none',
                cursor: 'pointer'
              }}
              whileHover={{ 
                color: styles.primary,
                scale: 1.05
              }}
              transition={{ duration: 0.2 }}
            >
              Pricing
            </motion.a>
            <Link href="/docs" style={{ textDecoration: 'none' }}>
              <motion.span
                style={{
                  color: styles.textPrimary,
                  fontSize: 15,
                  fontWeight: 500,
                  cursor: 'pointer'
                }}
                whileHover={{ 
                  color: styles.primary,
                  scale: 1.05
                }}
                transition={{ duration: 0.2 }}
              >
                Docs
              </motion.span>
            </Link>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <Link href="/login" style={{ textDecoration: 'none' }}>
              <motion.div
                style={{
                  background: 'transparent',
                  color: styles.textPrimary,
                  padding: '8px 16px',
                  borderRadius: 999,
                  fontSize: 15,
                  border: '1.5px solid rgba(59, 130, 246, 0.3)',
                  cursor: 'pointer',
                  display: 'inline-block'
                }}
                whileHover={{ 
                  scale: 1.05,
                  borderColor: 'rgba(59, 130, 246, 0.6)',
                  background: 'rgba(59, 130, 246, 0.1)'
                }}
                whileTap={{ scale: 0.95 }}
              >
                Sign in
              </motion.div>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);

  return (
    <div ref={ref} style={{ background: 'transparent', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '96px 96px' }}>
        <motion.div style={{ display: 'flex', flexDirection: 'column', gap: 48, alignItems: 'center', y, opacity }}>
          <motion.div 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 16px',
              borderRadius: 999,
              border: `1px solid rgba(59, 130, 246, 0.4)`,
              background: 'rgba(59, 130, 246, 0.1)'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span style={{ fontSize: 14, color: styles.primary, fontWeight: 600 }}>🚀 Backed by Y Combinator</span>
          </motion.div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'center', maxWidth: 900 }}>
            <motion.h1
              style={{
                fontSize: 72,
                lineHeight: 1.1,
                letterSpacing: '-2px',
                fontWeight: 800,
                color: styles.textPrimary,
                textAlign: 'center',
                margin: 0
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Developer Infrastructure Intelligence
            </motion.h1>
            <motion.p
              style={{
                fontSize: 24,
                lineHeight: '32px',
                color: styles.textPrimary,
                opacity: 0.8,
                textAlign: 'center',
                margin: 0
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Built for the world's fastest engineering teams. Ship faster with AI-powered SRE that never sleeps.
            </motion.p>
          </div>

          <motion.div
            style={{ display: 'flex', gap: 16, alignItems: 'center' }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link href="/login" style={{ textDecoration: 'none' }}>
              <motion.div
                style={{
                  background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                  color: '#ffffff',
                  padding: '16px 32px',
                  borderRadius: 8,
                  fontSize: 18,
                  fontWeight: 600,
                  border: 'none',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  boxShadow: '0 4px 20px rgba(59, 130, 246, 0.4)'
                }}
                whileHover={{ scale: 1.05, boxShadow: '0 6px 30px rgba(59, 130, 246, 0.6)' }}
                whileTap={{ scale: 0.95 }}
              >
                Sign in
                <ArrowRight size={20} />
              </motion.div>
            </Link>
            <a href="mailto:sales@traceon.ai?subject=Request%20Demo" style={{ textDecoration: 'none' }}>
              <motion.div
                style={{
                  background: 'transparent',
                  color: styles.primary,
                  padding: '16px 32px',
                  borderRadius: 8,
                  fontSize: 18,
                  fontWeight: 600,
                  border: `2px solid ${styles.primary}`,
                  cursor: 'pointer',
                  display: 'inline-block'
                }}
                whileHover={{ 
                  scale: 1.05,
                  background: 'rgba(59, 130, 246, 0.1)',
                  boxShadow: '0 4px 20px rgba(59, 130, 246, 0.3)'
                }}
                whileTap={{ scale: 0.95 }}
              >
                Request demo
              </motion.div>
            </a>
          </motion.div>

          <motion.p
            style={{ fontSize: 15, color: styles.textMuted, textAlign: 'center', margin: 0 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            No credit card required • Setup in under 5 minutes
          </motion.p>

          <motion.div
            style={{ width: '100%', maxWidth: 1100, marginTop: 64 }}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.div
              style={{
                background: 'linear-gradient(135deg, rgba(30, 30, 30, 0.95) 0%, rgba(20, 20, 30, 0.95) 100%)',
                borderRadius: 20,
                border: '2px solid rgba(59, 130, 246, 0.3)',
                overflow: 'hidden',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(59, 130, 246, 0.2)'
              }}
              whileHover={{ 
                scale: 1.01,
                boxShadow: '0 25px 70px rgba(0, 0, 0, 0.6), 0 0 50px rgba(59, 130, 246, 0.3)'
              }}
              transition={{ duration: 0.3 }}
            >
              {/* Browser Chrome */}
              <div style={{ 
                background: 'rgba(40, 40, 50, 0.8)',
                padding: '12px 20px',
                borderBottom: '1px solid rgba(59, 130, 246, 0.2)',
                display: 'flex',
                alignItems: 'center',
                gap: 12
              }}>
                <div style={{ display: 'flex', gap: 8 }}>
                  <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f56' }} />
                  <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ffbd2e' }} />
                  <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#27c93f' }} />
                </div>
                <div style={{ 
                  flex: 1,
                  background: 'rgba(10, 14, 39, 0.6)',
                  borderRadius: 8,
                  padding: '6px 16px',
                  fontSize: 13,
                  color: styles.textMuted,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8
                }}>
                  <Shield size={14} color={styles.primary} />
                  <span>traceon.ai/dashboard</span>
                </div>
              </div>

              {/* Dashboard Content */}
              <div style={{ padding: '48px 40px' }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 36 }}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Image 
                      src="/images/logo.png" 
                      alt="TraceonAI Dashboard" 
                      width={200} 
                      height={50}
                      style={{ objectFit: 'contain' }}
                    />
                  </motion.div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
                  {[
                    { label: 'Incidents Resolved', value: '94%', icon: <Check size={20} /> },
                    { label: 'Response Time', value: '2.3s', icon: <Zap size={20} /> },
                    { label: 'Cost Savings', value: '$240K', icon: <TrendingUp size={20} /> }
                  ].map((stat, i) => (
                    <motion.div
                      key={i}
                      style={{ 
                        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(139, 92, 246, 0.1) 100%)',
                        padding: '28px 24px', 
                        borderRadius: 16,
                        border: '1.5px solid rgba(59, 130, 246, 0.3)',
                        position: 'relative',
                        overflow: 'hidden'
                      }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }}
                      whileHover={{
                        scale: 1.03,
                        borderColor: 'rgba(59, 130, 246, 0.5)'
                      }}
                    >
                      {/* Icon Badge */}
                      <div style={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        color: styles.primary,
                        opacity: 0.5
                      }}>
                        {stat.icon}
                      </div>
                      
                      <p style={{ 
                        color: styles.textSecondary, 
                        fontSize: 13, 
                        marginBottom: 8, 
                        margin: 0,
                        fontWeight: 500,
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}>
                        {stat.label}
                      </p>
                      <p style={{ 
                        color: styles.textPrimary, 
                        fontSize: 36, 
                        fontWeight: 800, 
                        margin: 0,
                        background: `linear-gradient(135deg, ${styles.primary} 0%, ${styles.secondary} 100%)`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                      }}>
                        {stat.value}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const stats = [
    { icon: <Clock size={32} />, value: '95%', label: 'Faster incident resolution' },
    { icon: <Shield size={32} />, value: '99.9%', label: 'Uptime guaranteed' },
    { icon: <TrendingUp size={32} />, value: '10x', label: 'ROI in first year' },
    { icon: <Zap size={32} />, value: '2.3s', label: 'Average response time' }
  ];

  return (
    <div style={{ background: 'transparent', padding: '96px 0' }}>
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 48px' }}>
        <motion.div ref={ref} style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32 }}>
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              style={{
                background: 'rgba(10, 14, 39, 0.6)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(59, 130, 246, 0.2)',
                borderRadius: 20,
                padding: 32,
                textAlign: 'center'
              }}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <div style={{ color: styles.primary, marginBottom: 16 }}>{stat.icon}</div>
              <div style={{ color: styles.textPrimary, fontSize: 48, fontWeight: 800, marginBottom: 8 }}>{stat.value}</div>
              <div style={{ color: styles.textSecondary, fontSize: 16 }}>{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function FeatureShowcaseSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    {
      id: 1,
      title: 'Real-Time Monitoring Dashboard',
      description: 'Track system performance, metrics, and incidents in real-time with comprehensive visualizations and insights.',
      image: '/images/example_tool_1.png',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      metrics: [
        { label: 'Data Sources', value: '15+', color: '#667eea' },
        { label: 'Refresh Rate', value: '< 1s', color: '#764ba2' },
        { label: 'Uptime', value: '99.9%', color: '#10b981' },
      ]
    },
    {
      id: 2,
      title: 'AI-Powered Incident Analysis',
      description: 'Leverage artificial intelligence to automatically detect, analyze, and suggest solutions for system incidents.',
      image: '/images/example_tool_2.png',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      metrics: [
        { label: 'Detection Time', value: '0.3s', color: '#f093fb' },
        { label: 'Accuracy', value: '99.8%', color: '#f5576c' },
        { label: 'Auto-Resolved', value: '94%', color: '#10b981' },
      ]
    },
    {
      id: 3,
      title: 'Intelligent Query Studio',
      description: 'Build complex queries with natural language processing and get instant insights from your observability data.',
      image: '/images/example_tool_3.png',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      metrics: [
        { label: 'Query Speed', value: '< 50ms', color: '#4facfe' },
        { label: 'AI Suggestions', value: 'Active', color: '#00f2fe' },
        { label: 'Data Points', value: '1M+', color: '#10b981' },
      ]
    },
    {
      id: 4,
      title: 'Unified Integration Hub',
      description: 'Connect and manage all your monitoring tools, databases, and services from a single unified interface.',
      image: '/images/example_tool_4.png',
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      metrics: [
        { label: 'Integrations', value: '50+', color: '#43e97b' },
        { label: 'API Latency', value: '< 100ms', color: '#38f9d7' },
        { label: 'Connected', value: '18', color: '#10b981' },
      ]
    }
  ];

  return (
    <div id="features" ref={ref} style={{ 
      padding: '120px 0', 
      background: `linear-gradient(180deg, ${styles.darkBg} 0%, ${styles.darkerBg} 100%)`,
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background gradient orbs */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '-10%',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
        filter: 'blur(60px)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '10%',
        right: '-10%',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
        filter: 'blur(60px)',
        pointerEvents: 'none'
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '80px' }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            style={{
              display: 'inline-block',
              padding: '10px 24px',
              borderRadius: 999,
              background: 'rgba(59, 130, 246, 0.15)',
              border: '1.5px solid rgba(59, 130, 246, 0.3)',
              marginBottom: '24px',
              boxShadow: '0 4px 16px rgba(59, 130, 246, 0.2)'
            }}
          >
            <span style={{ 
              color: styles.primary, 
              fontSize: '14px', 
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase'
            }}>
              ⚡ Powerful Features
            </span>
          </motion.div>
          <h2 style={{
            fontSize: '56px',
            fontWeight: 800,
            color: styles.textPrimary,
            marginBottom: '20px',
            lineHeight: 1.1,
            letterSpacing: '-0.02em'
          }}>
            See TraceonAI in Action
          </h2>
          <p style={{
            fontSize: '20px',
            color: styles.textSecondary,
            maxWidth: '800px',
            margin: '0 auto',
            lineHeight: 1.7
          }}>
            Watch how our AI agents handle incidents from detection to resolution with real-time insights and intelligent automation
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '120px' }}>
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 80 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: index * 0.2 }}
            >
              {/* Title and Description */}
              <div style={{ marginBottom: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                  <div style={{
                    display: 'flex',
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: feature.gradient,
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '22px',
                    fontWeight: 700,
                    color: 'white',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)'
                  }}>
                    {feature.id}
                  </div>
                  <h3 style={{
                    fontSize: '36px',
                    fontWeight: 700,
                    color: styles.textPrimary,
                    lineHeight: 1.2,
                    letterSpacing: '-0.02em'
                  }}>
                    {feature.title}
                  </h3>
                </div>
                <p style={{
                  fontSize: '18px',
                  color: styles.textSecondary,
                  lineHeight: 1.7,
                  maxWidth: '800px'
                }}>
                  {feature.description}
                </p>
              </div>

              {/* Feature Card with Screenshot and Metrics */}
              <motion.div
                style={{
                  background: 'rgba(10, 14, 39, 0.8)',
                  borderRadius: '24px',
                  border: '2px solid rgba(59, 130, 246, 0.3)',
                  overflow: 'hidden',
                  backdropFilter: 'blur(20px)',
                }}
                whileHover={{
                  scale: 1.01,
                  borderColor: 'rgba(59, 130, 246, 0.6)',
                  boxShadow: '0 30px 80px rgba(59, 130, 246, 0.3)',
                }}
                transition={{ duration: 0.4 }}
              >
                {/* Metrics Bar */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '1px',
                  background: 'rgba(214, 221, 230, 0.1)',
                  borderBottom: '2px solid rgba(59, 130, 246, 0.3)'
                }}>
                  {feature.metrics.map((metric, i) => (
                    <motion.div
                      key={i}
                      style={{
                        background: 'rgba(10, 14, 39, 0.9)',
                        padding: '24px',
                        textAlign: 'center',
                      }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.4, delay: index * 0.2 + 0.4 + i * 0.1 }}
                      whileHover={{
                        background: 'rgba(59, 130, 246, 0.1)',
                      }}
                    >
                      <p style={{
                        fontSize: '12px',
                        color: 'rgba(214, 221, 230, 0.6)',
                        marginBottom: '8px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        fontWeight: 600
                      }}>
                        {metric.label}
                      </p>
                      <p style={{
                        fontSize: '28px',
                        fontWeight: 800,
                        color: metric.color,
                        letterSpacing: '-0.02em',
                        margin: 0
                      }}>
                        {metric.value}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* Screenshot Display */}
                <motion.div
                  style={{
                    position: 'relative',
                    padding: '32px',
                    background: 'rgba(5, 8, 16, 0.5)'
                  }}
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.2 + 0.6 }}
                >
                  <div style={{
                    position: 'relative',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}>
                    {/* Gradient glow behind image */}
                    <div style={{
                      position: 'absolute',
                      inset: '-4px',
                      background: feature.gradient,
                      opacity: 0.3,
                      filter: 'blur(20px)',
                      zIndex: -1
                    }} />
                    
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      width={1200}
                      height={800}
                      style={{
                        width: '100%',
                        height: 'auto',
                        display: 'block',
                        borderRadius: '16px'
                      }}
                      priority={index === 0}
                    />
                    
                    {/* Shine effect overlay */}
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: '-100%',
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
                      animation: 'shine 4s infinite',
                      pointerEvents: 'none'
                    }} />
                  </div>

                  {/* CTA Button */}
                  <Link href="/login" style={{ textDecoration: 'none' }}>
                    <motion.div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '14px 28px',
                        borderRadius: '12px',
                        background: feature.gradient,
                        color: 'white',
                        fontWeight: 600,
                        fontSize: '16px',
                        cursor: 'pointer',
                        marginTop: '24px',
                        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)'
                      }}
                      whileHover={{ scale: 1.05, boxShadow: '0 12px 32px rgba(59, 130, 246, 0.4)' }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Try {feature.title}
                      <ArrowRight className="w-5 h-5" />
                    </motion.div>
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function IntegrationsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const integrations = [
    { name: 'PostgreSQL', logo: '/images/PostgreSQL.png', url: 'https://www.postgresql.org/' },
    { name: 'MySQL', logo: '/images/MySQL.png', url: 'https://www.mysql.com/' },
    { name: 'MongoDB', logo: '/images/MongoDB.png', url: 'https://www.mongodb.com/' },
    { name: 'Snowflake', logo: '/images/Snowflake.png', url: 'https://www.snowflake.com/' },
    { name: 'Redis', logo: '/images/Redis.png', url: 'https://redis.io/' },
    { name: 'Datadog', logo: '/images/Datadog.png', url: 'https://www.datadoghq.com/' },
    { name: 'Splunk', logo: '/images/Splunk.png', url: 'https://www.splunk.com/' },
    { name: 'Prometheus', logo: '/images/Prometheus.png', url: 'https://prometheus.io/' },
    { name: 'Grafana', logo: '/images/Grafana.png', url: 'https://grafana.com/' },
    { name: 'Sentry', logo: '/images/Sentry.svg', url: 'https://sentry.io/' },
    { name: 'Slack', logo: '/images/Slack.png', url: 'https://slack.com/' },
    { name: 'Microsoft Teams', logo: '/images/Microsoft-Teams.png', url: 'https://www.microsoft.com/microsoft-teams/' },
  ];

  return (
    <div id="integrations" style={{ background: 'transparent', padding: '96px 0' }}>
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 48px' }}>
        <motion.div
          ref={ref}
          style={{ textAlign: 'center', marginBottom: 64 }}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
        >
          <h2 style={{ fontSize: 48, fontWeight: 800, marginBottom: 16, color: styles.textPrimary }}>
            Integrates with your stack
          </h2>
          <p style={{ fontSize: 20, color: styles.textSecondary }}>
            Connect with the tools you already use
          </p>
        </motion.div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'center' }}>
          {integrations.map((integration, i) => (
            <a
              key={i}
              href={integration.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none' }}
            >
              <motion.div
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  background: hoveredIndex === i 
                    ? 'rgba(59, 130, 246, 0.15)' 
                    : 'rgba(214,221,230,0.05)',
                  border: hoveredIndex === i 
                    ? '1.5px solid #3b82f6' 
                    : '1.5px solid rgba(214,221,230,0.2)',
                  borderRadius: 16,
                  padding: '18px 24px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  minWidth: 200,
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: hoveredIndex === i 
                    ? '0 10px 30px rgba(59, 130, 246, 0.3)' 
                    : 'none',
                  transform: hoveredIndex === i ? 'scale(1.05)' : 'scale(1)',
                  transition: 'all 0.2s ease-out',
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
              {/* Logo Container with Universal Styling */}
              <div 
                style={{
                  width: 44,
                  height: 44,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  position: 'relative',
                  background: hoveredIndex === i 
                    ? 'rgba(255, 255, 255, 0.15)' 
                    : 'rgba(255, 255, 255, 0.08)',
                  borderRadius: '10px',
                  padding: '8px',
                  transition: 'background 0.2s ease-out',
                }}
              >
                <Image
                  src={integration.logo}
                  alt={`${integration.name} logo`}
                  width={44}
                  height={44}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    filter: hoveredIndex === i
                      ? 'none'
                      : 'brightness(0) invert(0.9)',
                    opacity: hoveredIndex === i ? 1 : 0.85,
                    transition: 'filter 0.2s ease-out, opacity 0.2s ease-out',
                  }}
                />
              </div>
              <span style={{ 
                fontSize: 16, 
                fontWeight: 600, 
                color: styles.textPrimary,
              }}>
                {integration.name}
              </span>
            </motion.div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function SetupSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const steps = [
    {
      number: '1',
      title: 'Install CLI',
      description: 'npm install -g traceon-cli',
    },
    {
      number: '2',
      title: 'Connect Services',
      description: 'Link your databases & monitoring tools',
    },
    {
      number: '3',
      title: 'Deploy AI Agent',
      description: 'Let AI handle your infrastructure',
    },
  ];

  return (
    <div id="setup" style={{ background: 'transparent', padding: '96px 0' }}>
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 48px' }}>
        <motion.div
          ref={ref}
          style={{ textAlign: 'center', marginBottom: 64 }}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 style={{ fontSize: 48, fontWeight: 800, marginBottom: 16, color: styles.textPrimary, letterSpacing: '-0.02em' }}>
            Setup in Under 5 Minutes
          </h2>
          <p style={{ fontSize: 20, color: styles.textSecondary }}>
            From zero to production in minutes, not hours
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32, marginBottom: 48 }}>
          {steps.map((step, index) => (
            <motion.div
              key={index}
              style={{
                background: 'rgba(255, 255, 255, 0.04)',
                borderRadius: 16,
                border: '1.5px solid rgba(255, 255, 255, 0.2)',
                padding: 32,
                position: 'relative',
                overflow: 'hidden',
              }}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{
                scale: 1.05,
                borderColor: 'rgba(59, 130, 246, 0.6)',
                boxShadow: '0 20px 50px rgba(59, 130, 246, 0.3)',
              }}
            >
              <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                fontSize: 120,
                lineHeight: 1,
                color: 'rgba(59, 130, 246, 0.08)',
                fontWeight: 800,
              }}>
                {step.number}
              </div>
              <div style={{ position: 'relative', zIndex: 10 }}>
                <div style={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 16,
                  boxShadow: '0 4px 15px rgba(59, 130, 246, 0.4)',
                }}>
                  <span style={{ color: '#ffffff', fontSize: 24, fontWeight: 700 }}>
                    {step.number}
                  </span>
                </div>
                <h3 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8, color: styles.textPrimary }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: 16, color: styles.textSecondary, margin: 0 }}>
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AIFeaturesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const features = [
    {
      icon: <Brain size={32} />,
      title: 'Intelligent Root Cause Analysis',
      description: 'AI-powered insights identify issues in seconds, not hours',
    },
    {
      icon: <Database size={32} />,
      title: 'Multi-Source Integration',
      description: 'Connect 15+ data sources for comprehensive visibility',
    },
    {
      icon: <Network size={32} />,
      title: 'Automated Team Communication',
      description: 'Smart routing to the right people at the right time',
    },
    {
      icon: <Shield size={32} />,
      title: 'Proactive Issue Detection',
      description: 'Catch problems before they become incidents',
    },
    {
      icon: <Activity size={32} />,
      title: 'Solution Recommendation',
      description: 'AI suggests fixes based on historical data',
    },
    {
      icon: <Zap size={32} />,
      title: 'End-to-End Automation',
      description: 'Zero human intervention for routine tasks',
    },
  ];

  return (
    <div id="ai-features" style={{ background: 'transparent', padding: '96px 0', borderTop: '1.5px solid rgba(255, 255, 255, 0.2)' }}>
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 48px' }}>
        <motion.div
          ref={ref}
          style={{ textAlign: 'center', marginBottom: 64 }}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 style={{ fontSize: 48, fontWeight: 800, marginBottom: 16, color: styles.textPrimary, letterSpacing: '-0.02em' }}>
            AI-Powered Infrastructure Intelligence
          </h2>
          <p style={{ fontSize: 20, color: styles.textSecondary }}>
            Ship faster with intelligent automation
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {features.map((feature, index) => (
            <motion.div
              key={index}
              style={{
                background: 'rgba(255, 255, 255, 0.04)',
                borderRadius: 16,
                border: '1.5px solid rgba(255, 255, 255, 0.2)',
                padding: 32,
                cursor: 'pointer',
              }}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{
                scale: 1.05,
                y: -10,
                boxShadow: '0 20px 50px rgba(59, 130, 246, 0.3)',
                borderColor: 'rgba(59, 130, 246, 0.6)',
                background: 'rgba(59, 130, 246, 0.1)',
              }}
            >
              <div
                style={{ color: styles.primaryLight, marginBottom: 24 }}
              >
                {feature.icon}
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8, color: styles.textPrimary, transition: 'color 0.3s' }}>
                {feature.title}
              </h3>
              <p style={{ fontSize: 16, color: styles.textSecondary, margin: 0 }}>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PricingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const plans = [
    { name: 'Starter', price: '$99', description: 'Perfect for small teams', features: ['Up to 5 services', '7-day log retention', 'Basic AI analysis', 'Slack integration'] },
    { name: 'Professional', price: '$499', description: 'For growing engineering teams', features: ['Unlimited services', '30-day log retention', 'Advanced AI & ML', 'All integrations', 'Priority support'], popular: true },
    { name: 'Enterprise', price: 'Custom', description: 'For large organizations', features: ['Everything in Pro', 'Custom retention', 'Dedicated support', 'SLA guarantees', 'On-premise option'] }
  ];

  return (
    <div id="pricing" style={{ background: 'transparent', padding: '96px 0' }}>
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 48px' }}>
        <motion.div
          ref={ref}
          style={{ textAlign: 'center', marginBottom: 64 }}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
        >
          <h2 style={{ fontSize: 48, fontWeight: 800, marginBottom: 16, color: styles.textPrimary }}>Simple, transparent pricing</h2>
          <p style={{ fontSize: 20, color: styles.textSecondary }}>Start free, scale as you grow</p>
        </motion.div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              style={{
                background: 'rgba(10, 14, 39, 0.6)',
                backdropFilter: 'blur(16px)',
                border: plan.popular ? `2px solid ${styles.primary}` : '1px solid rgba(59, 130, 246, 0.2)',
                borderRadius: 24,
                padding: 40,
                position: 'relative',
                boxShadow: plan.popular ? '0 0 40px rgba(59, 130, 246, 0.4)' : 'none'
              }}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{
                y: -10,
                borderColor: plan.popular ? styles.primary : 'rgba(59, 130, 246, 0.5)',
                boxShadow: plan.popular ? '0 10px 60px rgba(59, 130, 246, 0.5)' : '0 10px 40px rgba(59, 130, 246, 0.3)'
              }}
            >
              {plan.popular && (
                <div style={{
                  position: 'absolute',
                  top: -12,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: styles.primary,
                  color: styles.darkText,
                  padding: '4px 16px',
                  borderRadius: 999,
                  fontSize: 12,
                  fontWeight: 700
                }}>Most Popular</div>
              )}
              <h3 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8, color: styles.textPrimary }}>{plan.name}</h3>
              <p style={{ fontSize: 14, color: styles.textSecondary, marginBottom: 24 }}>{plan.description}</p>
              <div style={{ marginBottom: 32 }}>
                <span style={{ fontSize: 48, fontWeight: 800, color: styles.textPrimary }}>{plan.price}</span>
                {plan.price !== 'Custom' && <span style={{ fontSize: 16, color: styles.textMuted }}>/month</span>}
              </div>
              <ul style={{ listStyle: 'none', padding: 0, marginBottom: 32 }}>
                {plan.features.map((feature, j) => (
                  <li key={j} style={{ display: 'flex', alignItems: 'start', gap: 12, marginBottom: 12 }}>
                    <Check size={20} style={{ color: styles.primary, marginTop: 2 }} />
                    <span style={{ fontSize: 15, color: styles.textSecondary }}>{feature}</span>
                  </li>
                ))}
              </ul>
              {plan.price === 'Custom' ? (
                <a href="mailto:sales@traceon.ai?subject=Enterprise%20Plan%20Inquiry" style={{ textDecoration: 'none' }}>
                  <motion.div
                    style={{
                      width: '100%',
                      background: plan.popular ? 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)' : 'transparent',
                      color: plan.popular ? '#ffffff' : styles.primary,
                      padding: '16px 32px',
                      borderRadius: 8,
                      fontSize: 18,
                      fontWeight: 600,
                      border: plan.popular ? 'none' : `2px solid ${styles.primary}`,
                      cursor: 'pointer',
                      boxShadow: plan.popular ? '0 4px 20px rgba(59, 130, 246, 0.4)' : 'none',
                      textAlign: 'center'
                    }}
                    whileHover={{
                      scale: 1.02,
                      background: plan.popular ? 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)' : 'rgba(59, 130, 246, 0.1)',
                      boxShadow: plan.popular ? '0 6px 30px rgba(59, 130, 246, 0.6)' : '0 4px 20px rgba(59, 130, 246, 0.3)'
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Contact sales
                  </motion.div>
                </a>
              ) : (
                <Link href="/login" style={{ textDecoration: 'none' }}>
                  <motion.div
                    style={{
                      width: '100%',
                      background: plan.popular ? 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)' : 'transparent',
                      color: plan.popular ? '#ffffff' : styles.primary,
                      padding: '16px 32px',
                      borderRadius: 8,
                      fontSize: 18,
                      fontWeight: 600,
                      border: plan.popular ? 'none' : `2px solid ${styles.primary}`,
                      cursor: 'pointer',
                      boxShadow: plan.popular ? '0 4px 20px rgba(59, 130, 246, 0.4)' : 'none',
                      textAlign: 'center'
                    }}
                    whileHover={{
                      scale: 1.02,
                      background: plan.popular ? 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)' : 'rgba(59, 130, 246, 0.1)',
                      boxShadow: plan.popular ? '0 6px 30px rgba(59, 130, 246, 0.6)' : '0 4px 20px rgba(59, 130, 246, 0.3)'
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Get started
                  </motion.div>
                </Link>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <div style={{ background: 'transparent', padding: '96px 0', borderTop: '1.5px solid rgba(255, 255, 255, 0.2)' }}>
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 48px' }}>
        <motion.div
          ref={ref}
          style={{
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(139, 92, 246, 0.1))',
            borderRadius: 24,
            border: '2px solid rgba(59, 130, 246, 0.5)',
            padding: 64,
            textAlign: 'center',
            boxShadow: '0 20px 60px rgba(59, 130, 246, 0.2)',
          }}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 style={{ fontSize: 48, fontWeight: 800, marginBottom: 16, color: styles.textPrimary, letterSpacing: '-0.02em' }}>
            Ready to eliminate downtime?
          </h2>
          <p style={{ fontSize: 20, color: styles.textSecondary, marginBottom: 40, maxWidth: 600, margin: '0 auto 40px' }}>
            Join 500+ engineering teams shipping faster with AI-powered infrastructure intelligence
          </p>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center', justifyContent: 'center' }}>
            <Link href="/login" style={{ textDecoration: 'none' }}>
              <motion.div
                style={{
                  background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                  color: '#ffffff',
                  padding: '16px 32px',
                  borderRadius: 8,
                  fontSize: 18,
                  fontWeight: 600,
                  border: 'none',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  boxShadow: '0 4px 20px rgba(59, 130, 246, 0.4)',
                }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 6px 40px rgba(59, 130, 246, 0.6)',
                }}
                whileTap={{ scale: 0.95 }}
              >
                Sign in
                <ArrowRight size={20} />
              </motion.div>
            </Link>
            <a href="mailto:sales@traceon.ai?subject=Schedule%20Demo" style={{ textDecoration: 'none' }}>
              <motion.div
                style={{
                  background: 'transparent',
                  color: styles.primary,
                  padding: '16px 32px',
                  borderRadius: 8,
                  fontSize: 18,
                  fontWeight: 600,
                  border: `2px solid ${styles.primary}`,
                  cursor: 'pointer',
                  display: 'inline-block'
                }}
                whileHover={{ 
                  scale: 1.05,
                  background: 'rgba(59, 130, 246, 0.1)',
                  boxShadow: '0 4px 20px rgba(59, 130, 246, 0.3)'
                }}
                whileTap={{ scale: 0.95 }}
              >
                Schedule demo
              </motion.div>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div style={{ background: 'transparent', padding: '80px 0 64px', borderTop: '1px solid rgba(59, 130, 246, 0.2)' }}>
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 48px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 64, marginBottom: 64 }}>
          {/* Company Info */}
          <div>
            <div style={{ marginBottom: 16 }}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                style={{ width: 'fit-content' }}
              >
                <Image 
                  src="/images/logo.png" 
                  alt="TraceonAI" 
                  width={160} 
                  height={40}
                  style={{ objectFit: 'contain' }}
                />
              </motion.div>
            </div>
            <p style={{ fontSize: 15, color: styles.textSecondary, lineHeight: 1.6, margin: 0 }}>
              AI-powered observability and incident management for modern engineering teams.
            </p>
          </div>

          {/* Product Links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <p style={{ fontSize: 16, color: styles.textPrimary, marginBottom: 8, fontWeight: 600 }}>
              Product
            </p>
            <a
              href="#features"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
              }}
              style={{ textDecoration: 'none' }}
            >
              <motion.p
                style={{ fontSize: 15, color: styles.textSecondary, cursor: 'pointer', margin: 0 }}
                whileHover={{ color: '#3b82f6', x: 5 }}
                transition={{ duration: 0.2 }}
              >
                Features
              </motion.p>
            </a>
            <a
              href="#setup"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('setup')?.scrollIntoView({ behavior: 'smooth' });
              }}
              style={{ textDecoration: 'none' }}
            >
              <motion.p
                style={{ fontSize: 15, color: styles.textSecondary, cursor: 'pointer', margin: 0 }}
                whileHover={{ color: '#3b82f6', x: 5 }}
                transition={{ duration: 0.2 }}
              >
                Setup
              </motion.p>
            </a>
            <a
              href="#ai-features"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('ai-features')?.scrollIntoView({ behavior: 'smooth' });
              }}
              style={{ textDecoration: 'none' }}
            >
              <motion.p
                style={{ fontSize: 15, color: styles.textSecondary, cursor: 'pointer', margin: 0 }}
                whileHover={{ color: '#3b82f6', x: 5 }}
                transition={{ duration: 0.2 }}
              >
                AI Features
              </motion.p>
            </a>
            <a
              href="#integrations"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('integrations')?.scrollIntoView({ behavior: 'smooth' });
              }}
              style={{ textDecoration: 'none' }}
            >
              <motion.p
                style={{ fontSize: 15, color: styles.textSecondary, cursor: 'pointer', margin: 0 }}
                whileHover={{ color: '#3b82f6', x: 5 }}
                transition={{ duration: 0.2 }}
              >
                Integrations
              </motion.p>
            </a>
            <a
              href="#pricing"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
              }}
              style={{ textDecoration: 'none' }}
            >
              <motion.p
                style={{ fontSize: 15, color: styles.textSecondary, cursor: 'pointer', margin: 0 }}
                whileHover={{ color: '#3b82f6', x: 5 }}
                transition={{ duration: 0.2 }}
              >
                Pricing
              </motion.p>
            </a>
            <Link href="/changelog" style={{ textDecoration: 'none' }}>
              <motion.p
                style={{ fontSize: 15, color: styles.textSecondary, cursor: 'pointer', margin: 0 }}
                whileHover={{ color: '#3b82f6', x: 5 }}
                transition={{ duration: 0.2 }}
              >
                Changelog
              </motion.p>
            </Link>
          </div>

          {/* Company Links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <p style={{ fontSize: 16, color: styles.textPrimary, marginBottom: 8, fontWeight: 600 }}>
              Company
            </p>
            <Link href="/about" style={{ textDecoration: 'none' }}>
              <motion.p
                style={{ fontSize: 15, color: styles.textSecondary, cursor: 'pointer', margin: 0 }}
                whileHover={{ color: '#3b82f6', x: 5 }}
                transition={{ duration: 0.2 }}
              >
                About
              </motion.p>
            </Link>
            <Link href="/blog" style={{ textDecoration: 'none' }}>
              <motion.p
                style={{ fontSize: 15, color: styles.textSecondary, cursor: 'pointer', margin: 0 }}
                whileHover={{ color: '#3b82f6', x: 5 }}
                transition={{ duration: 0.2 }}
              >
                Blog
              </motion.p>
            </Link>
            <Link href="/careers" style={{ textDecoration: 'none' }}>
              <motion.p
                style={{ fontSize: 15, color: styles.textSecondary, cursor: 'pointer', margin: 0 }}
                whileHover={{ color: '#3b82f6', x: 5 }}
                transition={{ duration: 0.2 }}
              >
                Careers
              </motion.p>
            </Link>
            <Link href="/contact" style={{ textDecoration: 'none' }}>
              <motion.p
                style={{ fontSize: 15, color: styles.textSecondary, cursor: 'pointer', margin: 0 }}
                whileHover={{ color: '#3b82f6', x: 5 }}
                transition={{ duration: 0.2 }}
              >
                Contact
              </motion.p>
            </Link>
          </div>

          {/* Legal Links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <p style={{ fontSize: 16, color: styles.textPrimary, marginBottom: 8, fontWeight: 600 }}>
              Legal
            </p>
            <Link href="/privacy" style={{ textDecoration: 'none' }}>
              <motion.p
                style={{ fontSize: 15, color: styles.textSecondary, cursor: 'pointer', margin: 0 }}
                whileHover={{ color: '#3b82f6', x: 5 }}
                transition={{ duration: 0.2 }}
              >
                Privacy
              </motion.p>
            </Link>
            <Link href="/terms" style={{ textDecoration: 'none' }}>
              <motion.p
                style={{ fontSize: 15, color: styles.textSecondary, cursor: 'pointer', margin: 0 }}
                whileHover={{ color: '#3b82f6', x: 5 }}
                transition={{ duration: 0.2 }}
              >
                Terms
              </motion.p>
            </Link>
            <Link href="/security" style={{ textDecoration: 'none' }}>
              <motion.p
                style={{ fontSize: 15, color: styles.textSecondary, cursor: 'pointer', margin: 0 }}
                whileHover={{ color: '#3b82f6', x: 5 }}
                transition={{ duration: 0.2 }}
              >
                Security
              </motion.p>
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: 32,
          borderTop: '1.5px solid rgba(255, 255, 255, 0.2)',
        }}>
          <p style={{ fontSize: 14, color: styles.textMuted, margin: 0 }}>
            © 2025 TraceonAI. All rights reserved.
          </p>
          
          {/* Social Icons */}
          <div style={{ display: 'flex', gap: 16 }}>
            <motion.div whileHover={{ scale: 1.2 }} transition={{ duration: 0.2 }}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                style={{ cursor: 'pointer' }}
              >
                <motion.path 
                  d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" 
                  fill="rgba(214,221,230,0.62)"
                  whileHover={{ fill: '#3b82f6' }}
                />
              </svg>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.2 }} transition={{ duration: 0.2 }}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                style={{ cursor: 'pointer' }}
              >
                <motion.path 
                  d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" 
                  fill="rgba(214,221,230,0.62)"
                  whileHover={{ fill: '#3b82f6' }}
                />
              </svg>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.2 }} transition={{ duration: 0.2 }}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                style={{ cursor: 'pointer' }}
              >
                <motion.path 
                  d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" 
                  fill="rgba(214,221,230,0.62)"
                  whileHover={{ fill: '#3b82f6' }}
                />
                <motion.circle 
                  cx="4" 
                  cy="4" 
                  r="2" 
                  fill="rgba(214,221,230,0.62)"
                  whileHover={{ fill: '#3b82f6' }}
                />
              </svg>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  // Add pulse and shine animation styles on client side only
  useEffect(() => {
    const styleId = 'pulse-animation-styles';
    // Check if styles already exist
    if (!document.getElementById(styleId)) {
      const styleSheet = document.createElement('style');
      styleSheet.id = styleId;
      styleSheet.textContent = `
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        @keyframes shine {
          0% {
            left: -100%;
          }
          100% {
            left: 200%;
          }
        }
      `;
      document.head.appendChild(styleSheet);
    }
  }, []);

  return (
    <div style={{ 
      fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", 
      minHeight: '100vh',
      position: 'relative',
      overflowX: 'hidden'
    }}>
      {/* Fixed Background Layer */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0 }}>
        {/* Base Dark Gradient - Deep Tech Blue */}
        <div style={{ 
          position: 'absolute', 
          inset: 0, 
          background: 'linear-gradient(to bottom right, #0a0e27 0%, #050810 50%, #020306 100%)' 
        }} />

        {/* Radial Gradient Center Focus */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 50% 0%, rgba(59, 130, 246, 0.15), transparent 50%)',
        }} />

        {/* Top Cyan/Blue Glow - Tech Accent */}
        <div style={{
          position: 'absolute',
          top: '-10%',
          left: '20%',
          width: '800px',
          height: '800px',
          background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)',
          filter: 'blur(120px)',
          opacity: 0.3
        }} />

        {/* Right Purple Accent */}
        <div style={{
          position: 'absolute',
          top: '30%',
          right: '-5%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, #8b5cf6 0%, transparent 70%)',
          filter: 'blur(100px)',
          opacity: 0.25
        }} />

        {/* Bottom Left Emerald Tech Glow */}
        <div style={{
          position: 'absolute',
          bottom: '10%',
          left: '-5%',
          width: '700px',
          height: '700px',
          background: 'radial-gradient(circle, #10b981 0%, transparent 70%)',
          filter: 'blur(110px)',
          opacity: 0.2
        }} />

        {/* Center Bright Accent */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, #06b6d4 0%, transparent 70%)',
          filter: 'blur(140px)',
          opacity: 0.15
        }} />

        {/* Fine Grid Pattern - Tech Blueprint Style */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }} />

        {/* Larger Grid Overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(139, 92, 246, 0.02) 1.5px, transparent 1.5px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.02) 1.5px, transparent 1.5px)
          `,
          backgroundSize: '120px 120px',
        }} />

        {/* Subtle Dot Matrix */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(16, 185, 129, 0.08) 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }} />

        {/* Scan Line Effect */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `linear-gradient(
            to bottom,
            transparent 0%,
            rgba(59, 130, 246, 0.02) 50%,
            transparent 100%
          )`,
          backgroundSize: '100% 4px',
        }} />

        {/* Noise Texture for Depth */}
        <div style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.03,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Content Container with Sticky Header */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        {/* Sticky Header */}
        <Header />

        {/* Main Content */}
        <div>
          <HeroSection />
          <StatsSection />
          <FeatureShowcaseSection />
          <SetupSection />
          <AIFeaturesSection />
          <IntegrationsSection />
          <PricingSection />
          <CTASection />
          <Footer />
        </div>
      </div>
    </div>
  );
}

