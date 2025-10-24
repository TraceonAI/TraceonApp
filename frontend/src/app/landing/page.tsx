'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { 
  Brain, 
  Rocket, 
  Shield, 
  Activity, 
  ChevronRight, 
  Play, 
  Zap, 
  Timer, 
  TrendingUp, 
  Users, 
  MessageCircle,
  AlertTriangle,
  CheckCircle,
  Code,
  Database,
  Network,
  Monitor,
  Bell,
  GitBranch,
  BarChart3,
  Lock,
  Cloud,
  Server,
  Cpu,
  HardDrive,
  Gauge,
  Target,
  ArrowRight,
  Plus,
  Hexagon,
  Mail,
  Github,
  Linkedin,
  Youtube,
  Slack
} from 'lucide-react';
import LogoLoop from '@/components/LogoLoop';
import ScrollStack, { ScrollStackItem } from '@/components/ScrollStack';
import SpotlightCard from '@/components/SpotlightCard';
import Particles from '@/components/Particles';
import BlurText from '@/components/BlurText';
import FadeContent from '@/components/FadeContent';
import AnimatedCounter from '@/components/AnimatedCounter';
import { 
  SiPostgresql, 
  SiMysql, 
  SiMongodb, 
  SiDatadog, 
  SiSplunk, 
  SiOpensearch,
  SiSlack,
  SiOpenai,
  SiKubernetes,
  SiDocker,
  SiAmazon,
  SiGooglecloud,
  SiPrometheus,
  SiGrafana,
  SiElasticsearch,
  SiRedis,
  SiApachekafka,
  SiTerraform,
  SiAnsible,
  SiJenkins,
  SiGithubactions,
  SiPagerduty,
  SiSnowflake,
  SiApache
} from 'react-icons/si';

// AI SRE Features
const aiFeatures = [
  {
    icon: Brain,
    title: "Intelligent Root Cause Analysis",
    description: "AI agents automatically correlate data across logs, databases, and metrics to identify the root cause of incidents in seconds, not hours."
  },
  {
    icon: Network,
    title: "Multi-Source Integration", 
    description: "Seamlessly connects to your logging tools, databases, APMs, and communication channels to provide unified observability."
  },
  {
    icon: MessageCircle,
    title: "Automated Team Communication",
    description: "AI agents notify the right team members via Slack, email, or PagerDuty with context-rich incident reports and suggested fixes."
  },
  {
    icon: Target,
    title: "Proactive Issue Detection",
    description: "Continuously monitors all connected systems to detect anomalies and potential issues before they impact users."
  },
  {
    icon: Code,
    title: "Solution Recommendation Engine",
    description: "Leverages historical data and ML models to suggest proven solutions and remediation steps for detected issues."
  },
  {
    icon: Activity,
    title: "End-to-End Automation",
    description: "From detection to resolution to notification - AI agents handle the entire incident lifecycle autonomously."
  }
];

// Feature tags for the slider
const featureTags = [
  { icon: Brain, text: "AI-Powered SRE" },
  { icon: Shield, text: "Autonomous Healing" },
  { icon: Activity, text: "99.99% Uptime" },
  { icon: Zap, text: "Sub-second Response" },
  { icon: Target, text: "SLO Management" },
  { icon: Lock, text: "Security First" },
  { icon: BarChart3, text: "Real-time Analytics" },
  { icon: Code, text: "Infrastructure as Code" }
];

// Integration technologies
const integrations = [
  { name: "Kubernetes", icon: "🎯", color: "text-blue-400" },
  { name: "AWS", icon: "☁️", color: "text-orange-400" },
  { name: "Prometheus", icon: "📊", color: "text-red-400" },
  { name: "Grafana", icon: "📈", color: "text-orange-400" },
  { name: "Docker", icon: "🐳", color: "text-blue-400" },
  { name: "Terraform", icon: "🏗️", color: "text-purple-400" },
  { name: "Datadog", icon: "🐕", color: "text-purple-600" },
  { name: "PagerDuty", icon: "📟", color: "text-green-400" }
];

// LogoLoop Integration Icons
const integrationLogos = [
  // Databases
  { node: <SiPostgresql style={{ color: 'var(--neon-blue)' }} />, title: "PostgreSQL" },
  { node: <SiMysql style={{ color: 'var(--neon-blue)' }} />, title: "MySQL" },
  { node: <SiMongodb style={{ color: 'var(--neon-green)' }} />, title: "MongoDB" },
  { node: <SiSnowflake style={{ color: 'var(--neon-blue)' }} />, title: "Snowflake" },
  { node: <SiRedis style={{ color: 'var(--neon-red)' }} />, title: "Redis" },
  
  // Monitoring & Observability
  { node: <SiDatadog style={{ color: 'var(--neon-purple)' }} />, title: "Datadog" },
  { node: <SiSplunk style={{ color: 'var(--neon-green)' }} />, title: "Splunk" },
  { node: <SiOpensearch style={{ color: 'var(--neon-blue)' }} />, title: "OpenSearch" },
  { node: <SiPrometheus style={{ color: 'var(--neon-red)' }} />, title: "Prometheus" },
  { node: <SiGrafana style={{ color: 'var(--neon-orange)' }} />, title: "Grafana" },
  { node: <SiElasticsearch style={{ color: 'var(--neon-blue)' }} />, title: "Elasticsearch" },
  
  // Communication
  { node: <SiSlack style={{ color: 'var(--neon-purple)' }} />, title: "Slack" },
  { node: <Mail style={{ color: 'var(--neon-blue)' }} />, title: "Email" },
  { node: <SiPagerduty style={{ color: 'var(--neon-green)' }} />, title: "PagerDuty" },
  
  // AI/ML Platforms
  { node: <SiOpenai style={{ color: 'var(--neon-green)' }} />, title: "OpenAI" },
  { node: <Brain style={{ color: 'var(--neon-purple)' }} />, title: "Anthropic" },
  
  // Cloud Providers
  { node: <SiAmazon style={{ color: 'var(--neon-orange)' }} />, title: "AWS" },
  { node: <SiGooglecloud style={{ color: 'var(--neon-blue)' }} />, title: "Google Cloud" },
  { node: <Cloud style={{ color: 'var(--neon-purple)' }} />, title: "Azure" },
  
  // Container & Orchestration
  { node: <SiKubernetes style={{ color: 'var(--neon-blue)' }} />, title: "Kubernetes" },
  { node: <SiDocker style={{ color: 'var(--neon-blue)' }} />, title: "Docker" },
  
  // Infrastructure as Code
  { node: <SiTerraform style={{ color: 'var(--neon-purple)' }} />, title: "Terraform" },
  { node: <SiAnsible style={{ color: 'var(--neon-red)' }} />, title: "Ansible" },
  
  // CI/CD
  { node: <SiJenkins style={{ color: 'var(--neon-red)' }} />, title: "Jenkins" },
  { node: <SiGithubactions style={{ color: 'var(--neon-blue)' }} />, title: "GitHub Actions" },
  
  // Message Queues
  { node: <SiApachekafka style={{ color: 'var(--landing-text-primary)' }} />, title: "Apache Kafka" },
  { node: <SiApache style={{ color: 'var(--neon-red)' }} />, title: "Apache" },
];

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Scroll animation observer
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    }, observerOptions);

    // Observe all scroll-fade-in elements
    const elements = document.querySelectorAll('.scroll-fade-in');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Prevent horizontal scroll on body
  useEffect(() => {
    document.body.style.overflowX = 'hidden';
    document.documentElement.style.overflowX = 'hidden';
    
    return () => {
      document.body.style.overflowX = '';
      document.documentElement.style.overflowX = '';
    };
  }, []);

  return (
    <div className="min-h-screen w-full" style={{ 
      backgroundColor: '#000000',
      overflowX: 'hidden',
      // @ts-ignore
      '--landing-text-primary': '#ffffff',
      '--landing-text-secondary': '#a0a0a0',
      '--landing-text-tertiary': '#808080'
    }}>
      {/* Neon Grid Background */}
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(124, 58, 237, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(124, 58, 237, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b" style={{ 
        backgroundColor: 'rgba(10, 10, 10, 0.8)',
        borderColor: 'rgba(124, 58, 237, 0.2)'
      }}>
        <div className="w-full px-6 lg:px-12 xl:px-16">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="relative">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110" style={{ 
                  backgroundColor: 'var(--neon-purple)',
                  boxShadow: '0 0 20px rgba(139, 92, 246, 0.3)'
                }}>
                  <Brain className="w-5 h-5" style={{ color: 'var(--landing-bg-primary)' }} />
                </div>
              </div>
              <span className="text-xl font-bold" style={{ color: 'var(--landing-text-primary)' }}>TraceonAI</span>
            </Link>
            
            {/* Center Menu */}
            <div className="hidden md:flex items-center space-x-1">
              {[
                { name: 'Features', href: '#features' },
                { name: 'Pricing', href: '#pricing' },
                { name: 'About', href: '#about' },
                { name: 'Contact', href: '#contact' }
              ].map((item) => (
                <a 
                  key={item.name}
                  href={item.href}
                  className="px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 hover:bg-white/5"
                  style={{ color: 'var(--landing-text-secondary)' }}
                >
                  {item.name}
                </a>
              ))}
            </div>
            
            {/* Actions */}
            <div className="flex items-center space-x-3">
              <Link 
                href="/login" 
                className="hidden sm:flex px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 hover:bg-white/5"
                style={{ color: 'var(--landing-text-primary)' }}
              >
                Sign In
              </Link>
              <Link 
                href="/signup" 
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300"
                style={{ 
                  backgroundColor: 'var(--neon-purple)',
                  color: 'var(--landing-bg-primary)',
                  boxShadow: '0 0 20px rgba(139, 92, 246, 0.3)'
                }}
              >
                Get Started
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer for fixed nav */}
      <div className="h-16"></div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Particles Background */}
        <div className="absolute inset-0 z-0">
          <Particles
            particleColors={['#FFFFFF']}
            particleCount={500}
            particleSpread={20}
            speed={0.05}
            particleBaseSize={200}
            moveParticlesOnHover={false}
            alphaParticles={true}
            disableRotation={false}
            particleHoverFactor={0.3}
          />
        </div>
        
        <div className="w-full px-6 lg:px-12 xl:px-16 text-center relative z-10">
          <div className="space-y-16">
            {/* Hero Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center px-4 py-2 rounded-full glass-effect neon-border mb-8">
                <Zap className="w-4 h-4 mr-2" style={{ color: 'var(--neon-blue)' }} />
                <span className="text-sm font-medium" style={{ color: 'var(--landing-text-primary)' }}>
                  Agentic AI for Autonomous Site Reliability
                </span>
              </div>
              
              <BlurText
                text="Your AI SRE Team That Never Sleeps"
                delay={50}
                animateBy="words"
                direction="top"
                className="text-6xl lg:text-7xl font-bold leading-tight neon-text"
                style={{ margin: 'auto', justifyContent: 'center' }}
              />
              
              <p className="text-xl max-w-4xl mx-auto leading-relaxed" style={{margin:'auto', color: 'var(--landing-text-secondary)' }}>
                Connect all your logging tools, databases, and communication channels. 
                Our AI agents automatically detect issues, perform root cause analysis, identify solutions, 
                and notify your team - all without human intervention.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
              <Link href="/signup" className="btn-primary text-lg px-8 py-4 inline-flex items-center gap-2">
                <span>Start free trial</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/login" className="btn-secondary text-lg px-8 py-4">
                Sign in to dashboard
              </Link>
            </div>

            {/* Trust Indicators & Badges */}
            <div className="pt-16 space-y-8">
              <p className="text-sm font-medium uppercase tracking-wider" style={{ color: 'var(--landing-text-tertiary)' }}>
                Trusted by engineering teams to automate incident response
              </p>
              
              {/* Compliance Badges */}
              <div className="flex flex-wrap items-center justify-center gap-6">
                {[
                  { icon: Shield, label: 'SOC 2 Type II', color: 'var(--neon-green)' },
                  { icon: Lock, label: 'ISO 27001', color: 'var(--neon-blue)' },
                  { icon: CheckCircle, label: 'GDPR Compliant', color: 'var(--neon-purple)' },
                  { icon: Shield, label: 'HIPAA Ready', color: 'var(--neon-orange)' }
                ].map((badge, idx) => (
                  <div key={idx} className="glass-effect px-6 py-3 rounded-xl border flex items-center gap-3 hover:scale-105 transition-transform duration-300" style={{ borderColor: 'var(--landing-border-primary)' }}>
                    <badge.icon className="w-5 h-5" style={{ color: badge.color }} />
                    <span className="text-sm font-medium" style={{ color: 'var(--landing-text-primary)' }}>{badge.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Showcase - Graphite Style */}
      <section className="min-h-screen flex items-center justify-center relative py-20">
        {/* Particles Background */}
        <div className="absolute inset-0 z-0">
          <Particles
            particleColors={['#FFFFFF']}
            particleCount={500}
            particleSpread={20}
            speed={0.05}
            particleBaseSize={200}
            moveParticlesOnHover={false}
            alphaParticles={true}
            disableRotation={false}
            particleHoverFactor={0.3}
          />
        </div>
        
        <FadeContent blur={true} duration={1000} delay={200} className="w-full px-6 lg:px-12 xl:px-16 relative z-10">
          <div className="text-center mb-28">
            <BlurText
              text="How AI Agents Work For You"
              delay={80}
              animateBy="words"
              direction="top"
              className="text-4xl lg:text-5xl font-bold mb-8"
              style={{ color: 'var(--landing-text-primary)', margin: 'auto', justifyContent: 'center' }}
            />
            <p  className="text-xl max-w-3xl mx-auto leading-relaxed" style={{margin:'auto', color: 'var(--landing-text-secondary)' }}>
              Our AI agents continuously monitor all your connected systems, correlate data across sources, 
              and autonomously handle incidents from detection to resolution.
            </p>
          </div>

          {/* 3D Feature Cards */}
          <div className="relative w-full">
            <div className="space-y-12 w-full">
              {/* AI Intelligence Card */}
              <div className="glass-effect neon-border p-10 rounded-2xl transform hover:scale-[1.02] transition-all duration-500 hover:shadow-2xl">
                <div className="grid lg:grid-cols-2 gap-10 items-center">
                  <div>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-xl glass-effect flex items-center justify-center">
                        <Brain className="w-6 h-6" style={{ color: 'var(--neon-purple)' }} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold neon-text">Multi-Source Correlation</h3>
                        <p className="text-sm" style={{ color: 'var(--landing-text-secondary)' }}>AI agents analyze data across all connected systems</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span style={{ color: 'var(--landing-text-secondary)' }}>Data Sources Connected</span>
                        <span className="neon-text font-bold text-xl">15+</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-3">
                        <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full shadow-lg" style={{ width: '100%' }}></div>
                      </div>
                    </div>
                  </div>
                  <div className="glass-effect rounded-xl p-6 bg-gradient-to-br from-purple-900/20 to-blue-900/20">
                    <pre className="text-sm font-mono text-green-400">
{`> AI Agent: Correlating data sources
  ✓ Datadog: High error rate detected
  ✓ PostgreSQL: Connection pool saturated
  ✓ Slack: No recent deployments
  
  Root Cause: Database connection leak
  Impact: 3,500 affected users
  Status: ✅ Solution identified`}
                    </pre>
                  </div>
                </div>
              </div>

              {/* Autonomous Response Card */}
              <div className="glass-effect neon-border p-10 rounded-2xl transform hover:scale-[1.02] transition-all duration-500 hover:shadow-2xl">
                <div className="grid lg:grid-cols-2 gap-10 items-center">
                  <div className="glass-effect rounded-xl p-6 bg-gradient-to-br from-green-900/20 to-teal-900/20 lg:order-2">
                    <pre className="text-sm font-mono text-blue-400">
{`> AI Agent: Incident Resolution
  Issue: Payment API degradation
  Analysis: Memory leak in v2.3.1
  
  Actions Taken:
  ✓ Notified @platform-team via Slack
  ✓ Rolled back to stable v2.2.8
  ✓ Created Jira ticket with RCA
  ✓ Updated status page
  
  Resolution Time: 42 seconds`}
                    </pre>
                  </div>
                  <div>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-xl glass-effect flex items-center justify-center">
                        <MessageCircle className="w-6 h-6" style={{ color: 'var(--neon-green)' }} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold neon-text">Automated Team Notification</h3>
                        <p className="text-sm" style={{ color: 'var(--landing-text-secondary)' }}>AI agents inform the right people at the right time</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span style={{ color: 'var(--landing-text-secondary)' }}>Auto-Resolved & Notified</span>
                        <span className="neon-text font-bold text-xl">94%</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-3">
                        <div className="bg-gradient-to-r from-green-500 to-teal-500 h-3 rounded-full shadow-lg" style={{ width: '94%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeContent>
      </section>



      {/* AI Assistant Section */}
      <section className="py-40" style={{ backgroundColor: '#000000' }}>
        <FadeContent blur={true} duration={1000} delay={200} className="w-full px-6 lg:px-12 xl:px-16">
          <div className="grid lg:grid-cols-2 gap-16 items-center w-full">
            {/* Large Media Card - Enhanced */}
            <div className="glass-effect neon-border p-10 rounded-2xl relative overflow-hidden group">
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-blue-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="space-y-8 relative z-10">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl glass-effect flex items-center justify-center group-hover:scale-110 transition-transform duration-300" style={{ 
                    backgroundColor: 'var(--neon-purple)',
                    boxShadow: '0 0 20px rgba(139, 92, 246, 0.4)'
                  }}>
                    <Brain className="w-7 h-7" style={{ color: 'var(--landing-bg-primary)' }} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold neon-text">AI Agent in Action</h3>
                    <p className="text-sm" style={{ color: 'var(--landing-text-secondary)' }}>Real-time incident detection and response</p>
                  </div>
                </div>
                
                <div className="glass-effect rounded-xl p-8 bg-gradient-to-br from-purple-900/20 to-blue-900/20" style={{ minHeight: '280px' }}>
                  <div className="space-y-6">
                    <div className="flex items-center justify-center mb-6">
                      <div className="w-20 h-20 rounded-full flex items-center justify-center relative" style={{ 
                        backgroundColor: 'var(--neon-purple)',
                        boxShadow: '0 0 30px rgba(139, 92, 246, 0.5)'
                      }}>
                        <Activity className="w-10 h-10 animate-pulse" style={{ color: 'var(--landing-bg-primary)' }} />
                        <div className="absolute inset-0 rounded-full animate-ping" style={{ 
                          backgroundColor: 'var(--neon-purple)',
                          opacity: 0.3
                        }}></div>
                      </div>
                    </div>
                    <div className="space-y-3 font-mono text-sm">
                      <div className="flex items-start gap-2">
                        <span style={{ color: 'var(--neon-green)' }}>$</span>
                        <p style={{ color: 'var(--neon-blue)' }}>agent analyze --incident=high-latency-spike</p>
                      </div>
                      <p className="pl-4" style={{ color: 'var(--landing-text-secondary)' }}>Querying Datadog, PostgreSQL, Slack...</p>
                      <div className="pl-4 flex items-start gap-2">
                        <span style={{ color: 'var(--neon-green)' }}>✓</span>
                        <p style={{ color: 'var(--neon-green)' }}>Root cause: Database query N+1 in OrderService</p>
                      </div>
                      <p className="pl-4" style={{ color: 'var(--neon-blue)' }}>Solution: Add eager loading to reduce queries</p>
                      <p className="pl-4" style={{ color: 'var(--neon-orange)' }}>Notified: @backend-team via Slack with fix PR</p>
                      <div className="mt-4 pt-4 border-t" style={{ borderColor: 'var(--landing-border-primary)' }}>
                        <div className="flex items-center justify-between">
                          <span className="text-xs" style={{ color: 'var(--landing-text-tertiary)' }}>Total analysis time</span>
                          <span className="text-xs font-bold" style={{ color: 'var(--neon-green)' }}>8.2s</span>
                        </div>
                        <div className="w-full bg-gray-800 rounded-full h-2 mt-2">
                          <div className="bg-gradient-to-r from-green-500 to-teal-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Vertical Benefits List - Enhanced */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect neon-border">
                  <Network className="w-4 h-4" style={{ color: 'var(--neon-purple)' }} />
                  <span className="text-sm font-medium" style={{ color: 'var(--landing-text-primary)' }}>Agentic AI Platform</span>
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold neon-text leading-tight">
                  Connect Everything, Automate Everything
                </h2>
                <p className="text-lg leading-relaxed" style={{ color: 'var(--landing-text-secondary)' }}>
                  Our AI agents integrate with all your tools to create a unified intelligence layer 
                  that detects, analyzes, and resolves issues automatically while keeping your team informed.
                </p>
              </div>
              
              <div className="space-y-4">
                {[
                  { 
                    icon: Database, 
                    title: "Universal Integration", 
                    desc: "Connect logging tools, databases, APMs, and communication channels in minutes",
                    color: 'var(--neon-purple)'
                  },
                  { 
                    icon: Brain, 
                    title: "Root Cause Analysis", 
                    desc: "AI agents correlate data across sources to pinpoint root causes instantly",
                    color: 'var(--neon-blue)'
                  },
                  { 
                    icon: Code, 
                    title: "Solution Recommendations", 
                    desc: "Get proven fixes and remediation steps based on historical data",
                    color: 'var(--neon-green)'
                  },
                  { 
                    icon: Bell, 
                    title: "Smart Notifications", 
                    desc: "Automatically alert the right team members with context-rich updates",
                    color: 'var(--neon-orange)'
                  }
                ].map((benefit, index) => (
                  <div 
                    key={index} 
                    className="glass-effect neon-border p-6 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl group cursor-pointer"
                  >
                    <div className="flex gap-4 items-start">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300" 
                        style={{ 
                          backgroundColor: benefit.color,
                          boxShadow: `0 0 20px ${benefit.color}40`
                        }}
                      >
                        <benefit.icon className="w-6 h-6" style={{ color: 'var(--landing-bg-primary)' }} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-lg mb-2" style={{ color: 'var(--landing-text-primary)' }}>{benefit.title}</h4>
                        <p className="text-sm leading-relaxed" style={{ color: 'var(--landing-text-secondary)' }}>{benefit.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeContent>
      </section>

      {/* Feature Demonstration with ScrollStack */}
      <section className="py-20" style={{ backgroundColor: '#000000' }}>
        <FadeContent blur={true} duration={1000} delay={200}>
          <div className="w-full px-4 lg:px-8 xl:px-12">
            <div className="text-center mb-12 relative z-10" style={{ backgroundColor: '#000000', padding: '2rem 0' }}>
              {/* <h2 className="text-section mb-4 text-reveal">Intelligent SRE Platform</h2> */}
                          <BlurText
              text="Intelligent SRE Platform"
              delay={80}
              animateBy="words"
              direction="top"
              className="text-5xl lg:text-6xl font-bold mb-8 neon-text"
              style={{ margin: 'auto', justifyContent: 'center' }}
            />
              <p style={{margin:'auto', color: '#a0a0a0'}} className="text-body max-w-4xl mx-auto scroll-fade-in">
                Experience our AI-powered capabilities through interactive demonstrations
              </p>
            </div>
          </div>
        </FadeContent>
        
        <ScrollStack
          className="scroll-stack-wrapper"
          itemDistance={150}
          itemScale={0.05}
          itemStackDistance={40}
          stackPosition="30%"
          scaleEndPosition="15%"
          baseScale={0.88}
          useWindowScroll={true}
        >
          {/* Card 1: Multi-Source Data Correlation */}
          <ScrollStackItem itemClassName="card-primary">
            <div className="space-y-6">
              <div className="accent-line">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--landing-bg-secondary)' }}>
                    <Network className="w-6 h-6" style={{ color: 'var(--neon-blue)' }} />
                  </div>
                  <h3 className="text-3xl font-bold neon-text">Multi-Source Data Correlation</h3>
                </div>
                <p className="text-lg" style={{ color: 'var(--landing-text-secondary)' }}>
                  AI agents continuously analyze data from Datadog, Splunk, PostgreSQL, MongoDB, and more 
                  to identify patterns and anomalies across your entire infrastructure in real-time.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4 mt-6">
                {[
                  { icon: Database, title: "15+ Integrations", desc: "Connect all your logging tools and databases seamlessly" },
                  { icon: Network, title: "Cross-Platform Analysis", desc: "Correlate metrics across disparate systems instantly" },
                  { icon: BarChart3, title: "Anomaly Detection", desc: "Identify unusual patterns before they become incidents" },
                  { icon: CheckCircle, title: "Unified Dashboard", desc: "Single pane of glass for all your data sources" }
                ].map((benefit, index) => (
                  <div key={index} className="flex gap-3 p-4 rounded-lg glass-effect">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--landing-bg-secondary)' }}>
                      <benefit.icon className="w-5 h-5" style={{ color: 'var(--neon-green)' }} />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1" style={{ color: 'var(--landing-text-primary)' }}>{benefit.title}</h4>
                      <p className="text-sm" style={{ color: 'var(--landing-text-secondary)' }}>{benefit.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollStackItem>

          {/* Card 2: Intelligent Root Cause Analysis */}
          <ScrollStackItem itemClassName="card-primary">
            <div className="space-y-6">
              <div className="accent-line">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--landing-bg-secondary)' }}>
                    <Brain className="w-6 h-6" style={{ color: 'var(--neon-purple)' }} />
                  </div>
                  <h3 className="text-3xl font-bold neon-text">Intelligent Root Cause Analysis</h3>
                </div>
                <p className="text-lg" style={{ color: 'var(--landing-text-secondary)' }}>
                  Advanced machine learning algorithms trace issues across microservices, databases, 
                  and logs to pinpoint exact causes in seconds, not hours.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className="space-y-4">
                  <div className="icon-pill">
                    <Target className="icon" />
                    <span>Trace Dependencies Across Services</span>
                  </div>
                  <div className="icon-pill">
                    <Code className="icon" />
                    <span>Code-Level Error Detection</span>
                  </div>
                  <div className="icon-pill">
                    <Zap className="icon" />
                    <span>8.2s Average Analysis Time</span>
                  </div>
                </div>

                <div className="glass-effect p-4 rounded-lg">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold" style={{ color: 'var(--landing-text-primary)' }}>Recent Analysis</h4>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--neon-green)' }}></div>
                        <span className="text-sm font-mono" style={{ color: 'var(--neon-green)' }}>RESOLVED</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 rounded-lg" style={{ backgroundColor: 'var(--landing-bg-secondary)' }}>
                        <div className="text-2xl font-bold" style={{ color: 'var(--neon-green)' }}>12</div>
                        <div className="text-sm" style={{ color: 'var(--landing-text-secondary)' }}>Sources Analyzed</div>
                      </div>
                      <div className="text-center p-3 rounded-lg" style={{ backgroundColor: 'var(--landing-bg-secondary)' }}>
                        <div className="text-2xl font-bold" style={{ color: 'var(--neon-blue)' }}>100%</div>
                        <div className="text-sm" style={{ color: 'var(--landing-text-secondary)' }}>Confidence</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollStackItem>

          {/* Card 3: Automated Team Notifications */}
          <ScrollStackItem itemClassName="card-primary">
            <div className="space-y-6">
              <div className="accent-line">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--landing-bg-secondary)' }}>
                    <MessageCircle className="w-6 h-6" style={{ color: 'var(--neon-green)' }} />
                  </div>
                  <h3 className="text-3xl font-bold neon-text">Automated Team Notifications</h3>
                </div>
                <p className="text-lg" style={{ color: 'var(--landing-text-secondary)' }}>
                  Instantly notify the right teams via Slack, PagerDuty, or email with context-rich alerts, 
                  recommended fixes, and auto-generated Jira tickets for seamless incident management.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className="glass-effect p-4 rounded-lg">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold" style={{ color: 'var(--landing-text-primary)' }}>Notification Timeline</h4>
                      <div className="text-xs font-mono" style={{ color: 'var(--neon-green)' }}>Delivered in 2.3s</div>
                    </div>
                    {[
                      { time: '14:32:08', event: 'Issue detected: Database latency spike', status: 'detected', channel: 'System' },
                      { time: '14:32:10', event: 'Root cause analyzed: N+1 query problem', status: 'analyzing', channel: 'AI Agent' },
                      { time: '14:32:11', event: 'Slack message sent to @backend-team', status: 'notifying', channel: 'Slack' },
                      { time: '14:32:11', event: 'Jira ticket auto-created with fix PR', status: 'resolved', channel: 'Jira' }
                    ].map((item, index) => (
                      <div key={index} className="flex gap-3">
                        <div className="flex-shrink-0 w-2 h-2 rounded-full mt-2" style={{ 
                          backgroundColor: item.status === 'resolved' ? 'var(--neon-green)' : 
                                         item.status === 'notifying' ? 'var(--neon-orange)' : 'var(--neon-blue)' 
                        }}></div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div className="text-xs font-mono" style={{ color: 'var(--landing-text-tertiary)' }}>{item.time}</div>
                            <div className="text-xs px-2 py-0.5 rounded" style={{ 
                              backgroundColor: 'var(--landing-bg-secondary)',
                              color: 'var(--neon-blue)'
                            }}>{item.channel}</div>
                          </div>
                          <div className="text-sm" style={{ color: 'var(--landing-text-primary)' }}>{item.event}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="icon-pill">
                    <Bell className="icon" />
                    <span>Smart Channel Routing</span>
                  </div>
                  <div className="icon-pill">
                    <MessageCircle className="icon" />
                    <span>Context-Rich Alerts</span>
                  </div>
                  <div className="icon-pill">
                    <CheckCircle className="icon" />
                    <span>Auto-Create Tickets & PRs</span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollStackItem>
        </ScrollStack>
      </section>

      {/* Feature Grid */}
      <section className="min-h-screen flex items-center justify-center scroll-fade-in py-20" style={{ backgroundColor: '#000000' }}>
        <FadeContent blur={true} duration={1000} delay={200} className="w-full px-4 lg:px-8 xl:px-12">
          <div className="text-center mb-16">
            <BlurText
              text="Complete SRE Platform"
              delay={80}
              animateBy="words"
              direction="top"
              className="text-5xl lg:text-6xl font-bold mb-8 neon-text"
              style={{ margin: 'auto', justifyContent: 'center' }}
            />
            <p className="text-body max-w-4xl mx-auto scroll-fade-in" style={{margin:'auto', color: '#a0a0a0'}}>
              Everything you need to build, deploy, and maintain reliable systems at scale.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aiFeatures.map((feature, index) => (
              <SpotlightCard 
                key={index}
                className="group hover:-translate-y-1 transition-transform duration-300 scroll-fade-in"
                spotlightColor="rgba(0, 212, 255, 0.15)"
                style={{animationDelay: `${index * 100}ms`} as React.CSSProperties}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center hover-scale" style={{ backgroundColor: 'var(--landing-bg-secondary)' }}>
                    <feature.icon className="w-5 h-5 icon-spin" style={{ color: 'var(--neon-blue)' }} />
                  </div>
                  <h3 className="font-semibold" style={{ color: 'var(--landing-text-primary)' }}>{feature.title}</h3>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--landing-text-secondary)' }}>
                  {feature.description}
                </p>
              </SpotlightCard>
            ))}
          </div>
        </FadeContent>
      </section>

      {/* Integrations Section */}
      <section id="integrations" className="min-h-screen flex items-center justify-center scroll-fade-in py-20" style={{ backgroundColor: '#000000' }}>
        <FadeContent blur={true} duration={1000} delay={200} className="w-full px-4 lg:px-8 xl:px-12">
          <div className="text-center mb-16 relative z-10" style={{ backgroundColor: '#000000', padding: '2rem 0' }}>
            <BlurText
              text="Connect All Your Tools"
              delay={80}
              animateBy="words"
              direction="top"
              className="text-5xl lg:text-6xl font-bold mb-8 neon-text"
              style={{ margin: 'auto', justifyContent: 'center' }}
            />
            <p style={{margin:'auto', color: '#a0a0a0'}} className="text-body max-w-4xl mx-auto scroll-fade-in mb-8">
              Our AI agents connect with 15+ logging tools, databases, and communication platforms
              to create a unified intelligence layer. Monitor everything from Datadog metrics to PostgreSQL 
              queries to Slack conversations—all in one place.
            </p>
            <p className="text-sm scroll-fade-in" style={{ color: 'var(--landing-text-secondary)' }}>
              Seamless integration with your entire observability and incident management ecosystem
            </p>
          </div>
          
          {/* Logo Loop Integration Showcase */}
          <div className="mb-16" style={{ height: '120px', position: 'relative', overflow: 'hidden', backgroundColor: 'var(--landing-bg-secondary)' }}>
            <LogoLoop
              logos={integrationLogos}
              speed={40}
              direction="left"
              logoHeight={48}
              gap={60}
              pauseOnHover
              scaleOnHover
              fadeOut
              fadeOutColor="rgba(17, 17, 17, 1)"
              ariaLabel="Integration partners and tools"
            />
          </div>
          
          {/* Traditional Grid for Additional Context */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {integrations.map((integration, index) => (
              <SpotlightCard 
                key={index}
                className="text-center group hover:scale-105 transition-transform duration-300 scroll-fade-in"
                spotlightColor="rgba(139, 92, 246, 0.15)"
                style={{animationDelay: `${index * 50}ms`}}
              >
                <div className="text-3xl mb-3 icon-float">{integration.icon}</div>
                <h4 className="font-semibold text-sm" style={{ color: 'var(--landing-text-primary)' }}>{integration.name}</h4>
                <div className={`text-xs mt-1 ${integration.color} pulse-glow`}>Connected</div>
              </SpotlightCard>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <button className="btn-secondary inline-flex items-center gap-2">
              <span>View All Integrations</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </FadeContent>
      </section>

      {/* Use Cases Section */}
      <section className="min-h-screen flex items-center justify-center py-20" style={{ backgroundColor: '#000000' }}>
        <FadeContent blur={true} duration={1000} delay={200} className="w-full px-6 lg:px-12 xl:px-16">
          <div className="text-center mb-16">
            <BlurText
              text="Built for Modern Engineering Teams"
              delay={80}
              animateBy="words"
              direction="top"
              className="text-5xl lg:text-6xl font-bold mb-8 neon-text"
              style={{ margin: 'auto', justifyContent: 'center' }}
            />
            <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ margin: 'auto', color: 'var(--landing-text-secondary)' }}>
              From onboarding to production incidents, TraceonAI adapts to your team's workflow
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: Users,
                title: "SRE Onboarding & Training",
                description: "Accelerate new team member productivity with AI-guided incident walkthroughs and automated knowledge base generation from resolved incidents.",
                metrics: { label: "Faster onboarding", value: 75, suffix: "%" },
                color: 'var(--neon-purple)'
              },
              {
                icon: GitBranch,
                title: "Change Management",
                description: "Ensure safe deployments with pre-flight checks, automated rollback triggers, and real-time impact analysis across your infrastructure.",
                metrics: { label: "Deployment failures prevented", value: 92, suffix: "%" },
                color: 'var(--neon-blue)'
              },
              {
                icon: Rocket,
                title: "Pre-Release Validation",
                description: "Run comprehensive system checks before major launches. AI agents simulate load patterns and validate SLOs across all services.",
                metrics: { label: "Launch success rate", value: 99.8, suffix: "%", decimals: 1 },
                color: 'var(--neon-green)'
              },
              {
                icon: Lock,
                title: "Compliance & Audit Reporting",
                description: "Generate audit-ready reports automatically. Track incident response times, resolution patterns, and SLA compliance with zero manual effort.",
                metrics: { label: "Audit prep time saved", value: 80, suffix: "%" },
                color: 'var(--neon-orange)'
              }
            ].map((useCase, idx) => (
              <SpotlightCard key={idx} className="p-8 hover:-translate-y-2 transition-all duration-300" spotlightColor="rgba(139, 92, 246, 0.1)">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-14 h-14 rounded-xl glass-effect flex items-center justify-center flex-shrink-0" style={{ backgroundColor: useCase.color, boxShadow: `0 0 20px ${useCase.color}40` }}>
                    <useCase.icon className="w-7 h-7" style={{ color: 'var(--landing-bg-primary)' }} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--landing-text-primary)' }}>{useCase.title}</h3>
                  </div>
                </div>
                <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--landing-text-secondary)' }}>
                  {useCase.description}
                </p>
                <div className="glass-effect p-4 rounded-lg inline-flex items-center gap-3">
                  <TrendingUp className="w-5 h-5" style={{ color: useCase.color }} />
                  <div>
                    <AnimatedCounter 
                      end={useCase.metrics.value} 
                      suffix={useCase.metrics.suffix}
                      decimals={useCase.metrics.decimals || 0}
                      className="text-2xl font-bold neon-text"
                    />
                    <p className="text-xs" style={{ color: 'var(--landing-text-secondary)' }}>{useCase.metrics.label}</p>
                  </div>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </FadeContent>
      </section>

      {/* Industries Section */}
      <section className="py-20" style={{ backgroundColor: '#000000' }}>
        <FadeContent blur={true} duration={1000} delay={200} className="w-full px-6 lg:px-12 xl:px-16">
          <div className="text-center mb-16">
            <BlurText
              text="Trusted Across Industries"
              delay={80}
              animateBy="words"
              direction="top"
              className="text-5xl lg:text-6xl font-bold mb-8 neon-text"
              style={{ margin: 'auto', justifyContent: 'center' }}
            />
            <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ margin: 'auto', color: 'var(--landing-text-secondary)' }}>
              Engineering teams across sectors rely on TraceonAI for mission-critical reliability
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Code, name: "Technology & SaaS", desc: "Scale infrastructure confidently with AI-powered incident management" },
              { icon: Lock, name: "Financial Services", desc: "Meet compliance requirements while maintaining 99.99% uptime" },
              { icon: Activity, name: "E-commerce", desc: "Prevent revenue loss with automated incident response during peak traffic" },
              { icon: Shield, name: "Healthcare", desc: "Ensure HIPAA compliance and protect patient-critical systems 24/7" }
            ].map((industry, idx) => (
              <div key={idx} className="card-primary p-8 text-center hover:-translate-y-2 transition-all duration-300">
                <div className="w-16 h-16 rounded-2xl glass-effect flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'var(--neon-purple)', boxShadow: '0 0 20px rgba(139, 92, 246, 0.3)' }}>
                  <industry.icon className="w-8 h-8" style={{ color: 'var(--landing-bg-primary)' }} />
                </div>
                <h3 className="text-lg font-bold mb-3" style={{ color: 'var(--landing-text-primary)' }}>{industry.name}</h3>
                <p className="text-sm" style={{ color: 'var(--landing-text-secondary)' }}>{industry.desc}</p>
              </div>
            ))}
          </div>
        </FadeContent>
      </section>

      {/* Testimonials & Case Studies */}
      <section className="min-h-screen flex items-center justify-center py-20" style={{ backgroundColor: '#000000' }}>
        <FadeContent blur={true} duration={1000} delay={200} className="w-full px-6 lg:px-12 xl:px-16">
          <div className="text-center mb-16">
            <BlurText
              text="Loved by Engineering Teams"
              delay={80}
              animateBy="words"
              direction="top"
              className="text-5xl lg:text-6xl font-bold mb-8 neon-text"
              style={{ margin: 'auto', justifyContent: 'center' }}
            />
            <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ margin: 'auto', color: 'var(--landing-text-secondary)' }}>
              Real results from teams that switched to AI-powered incident management
            </p>
          </div>

          {/* Success Metrics */}
          <div className="grid md:grid-cols-4 gap-8 mb-20">
            {[
              { value: 500, suffix: "+", label: "Engineering Teams" },
              { value: 99.99, suffix: "%", decimals: 2, label: "Average Uptime" },
              { value: 85, suffix: "%", label: "Faster MTTR" },
              { value: 94, suffix: "%", label: "Auto-Resolved Incidents" }
            ].map((metric, idx) => (
              <div key={idx} className="text-center">
                <AnimatedCounter
                  end={metric.value}
                  suffix={metric.suffix}
                  decimals={metric.decimals || 0}
                  className="text-5xl font-bold neon-text block mb-2"
                />
                <p className="text-sm" style={{ color: 'var(--landing-text-secondary)' }}>{metric.label}</p>
              </div>
            ))}
          </div>

          {/* Testimonial Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "TraceonAI reduced our MTTR by 82% in the first month. The AI agents caught issues we didn't even know existed and resolved them before impacting users.",
                author: "Sarah Chen",
                role: "VP of Engineering",
                company: "TechFlow Inc",
                metric: { label: "MTTR Reduction", value: 82, suffix: "%" }
              },
              {
                quote: "We went from spending 40 hours a week on incident response to less than 5. The AI does the heavy lifting while we focus on building features.",
                author: "Marcus Rodriguez",
                role: "Lead SRE",
                company: "DataSync Pro",
                metric: { label: "Time Saved Weekly", value: 35, suffix: " hrs" }
              },
              {
                quote: "The multi-source correlation is incredible. TraceonAI connected the dots between a Datadog alert, PostgreSQL slow query, and deployment—something that took us hours manually.",
                author: "Emily Johnson",
                role: "Infrastructure Lead",
                company: "CloudScale",
                metric: { label: "Analysis Speed", value: 95, suffix: "x faster" }
              }
            ].map((testimonial, idx) => (
              <SpotlightCard key={idx} className="p-8 flex flex-col justify-between hover:-translate-y-2 transition-all duration-300" spotlightColor="rgba(139, 92, 246, 0.1)">
                <div>
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-5 h-5 rounded-full" style={{ backgroundColor: 'var(--neon-orange)' }}>★</div>
                    ))}
                  </div>
                  <p className="text-base leading-relaxed mb-6 italic" style={{ color: 'var(--landing-text-primary)' }}>
                    "{testimonial.quote}"
                  </p>
                </div>
                <div>
                  <div className="glass-effect p-4 rounded-lg mb-4">
                    <AnimatedCounter
                      end={parseInt(testimonial.metric.value.toString())}
                      suffix={testimonial.metric.suffix}
                      className="text-3xl font-bold neon-text block mb-1"
                    />
                    <p className="text-xs" style={{ color: 'var(--landing-text-secondary)' }}>{testimonial.metric.label}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: 'var(--neon-purple)' }}>
                      {testimonial.author.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-semibold" style={{ color: 'var(--landing-text-primary)' }}>{testimonial.author}</p>
                      <p className="text-sm" style={{ color: 'var(--landing-text-secondary)' }}>{testimonial.role}, {testimonial.company}</p>
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </FadeContent>
      </section>

      {/* FAQ Section */}
      <section className="py-20" style={{ backgroundColor: '#000000' }}>
        <FadeContent blur={true} duration={1000} delay={200} className="w-full px-6 lg:px-12 xl:px-16">
          <div className="text-center mb-16">
            <BlurText
              text="Frequently Asked Questions"
              delay={80}
              animateBy="words"
              direction="top"
              className="text-5xl lg:text-6xl font-bold mb-8 neon-text"
              style={{ margin: 'auto', justifyContent: 'center' }}
            />
            <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ margin: 'auto', color: 'var(--landing-text-secondary)' }}>
              Everything you need to know about TraceonAI
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {[
              {
                question: "How does TraceonAI ensure data security and privacy?",
                answer: "We're SOC 2 Type II and ISO 27001 certified with end-to-end encryption. Your data never trains our models and stays within your infrastructure. We support on-premise deployment for maximum security control."
              },
              {
                question: "What integrations does TraceonAI support?",
                answer: "We integrate with 15+ platforms including Datadog, Splunk, PostgreSQL, MongoDB, Slack, PagerDuty, AWS, GCP, Kubernetes, and more. Our API allows custom integrations for any tool in your stack."
              },
              {
                question: "How long does onboarding take?",
                answer: "Most teams are up and running in under 2 hours. Our AI agents automatically discover your infrastructure, configure integrations, and start monitoring immediately. No complex setup required."
              },
              {
                question: "Do you train AI models on our incident data?",
                answer: "No. Your data is never used to train our models. We use privacy-preserving techniques and keep all analysis isolated to your environment. You maintain full ownership of your data."
              },
              {
                question: "What kind of support do you offer?",
                answer: "All plans include email support with 24-hour response times. Pro and Enterprise plans get priority support with dedicated Slack channels. Enterprise customers receive 24/7 on-call support and a dedicated customer success manager."
              },
              {
                question: "Can I try TraceonAI before committing?",
                answer: "Yes! We offer a 14-day free trial with full access to all features. No credit card required. You can also book a live demo to see the platform in action with your actual infrastructure."
              },
              {
                question: "How does pricing scale with my infrastructure?",
                answer: "Pricing is based on the number of monitored services, not data volume. As you grow, you can upgrade plans or contact us for custom enterprise pricing with volume discounts."
              },
              {
                question: "What's your uptime SLA?",
                answer: "We guarantee 99.95% uptime for Pro plans and 99.99% for Enterprise. Our AI agents themselves run in a highly available, multi-region architecture to ensure they're always monitoring your systems."
              }
            ].map((faq, idx) => (
              <details key={idx} className="card-primary p-6 group cursor-pointer hover:shadow-lg transition-shadow duration-300">
                <summary className="flex items-center justify-between font-semibold text-lg list-none" style={{ color: 'var(--landing-text-primary)' }}>
                  <span>{faq.question}</span>
                  <Plus className="w-5 h-5 transition-transform duration-300 group-open:rotate-45" style={{ color: 'var(--neon-purple)' }} />
                </summary>
                <p className="mt-4 leading-relaxed" style={{ color: 'var(--landing-text-secondary)' }}>
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>

          <div className="text-center mt-16">
            <p className="text-lg mb-6" style={{ color: 'var(--landing-text-secondary)' }}>
              Still have questions? We're here to help.
            </p>
            <Link href="#contact" className="btn-primary inline-flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              <span>Contact Support</span>
            </Link>
          </div>
        </FadeContent>
      </section>


      {/* Features Section */}
      <section id="features" className="min-h-screen flex items-center justify-center relative py-20" style={{ backgroundColor: '#000000' }}>
        <FadeContent blur={true} duration={1000} delay={200} className="w-full px-6 lg:px-12 xl:px-16">
          <div className="text-center mb-20">
            <BlurText
              text="Powerful Features"
              delay={80}
              animateBy="words"
              direction="top"
              className="text-5xl lg:text-6xl font-bold mb-8 neon-text"
              style={{ margin: 'auto', justifyContent: 'center' }}
            />
            <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{margin:'auto', color: 'var(--landing-text-secondary)' }}>
              Everything you need to build, deploy, and maintain reliable systems at scale with AI-powered automation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {aiFeatures.map((feature, index) => (
              <div key={index} className="card-primary p-8 group hover:-translate-y-2 transition-all duration-300">
                <div className="w-14 h-14 rounded-xl glass-effect flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-7 h-7" style={{ color: 'var(--neon-purple)' }} />
                </div>
                <h3 className="text-xl font-bold mb-4 neon-text">{feature.title}</h3>
                <p className="leading-relaxed" style={{ color: 'var(--landing-text-secondary)' }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </FadeContent>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="min-h-screen flex items-center justify-center relative py-20" style={{ backgroundColor: '#000000' }}>
        {/* Particles Background */}
        <div className="absolute inset-0 z-0">
          <Particles
            particleColors={['#FFFFFF']}
            particleCount={500}
            particleSpread={20}
            speed={0.05}
            particleBaseSize={200}
            moveParticlesOnHover={false}
            alphaParticles={true}
            disableRotation={false}
            particleHoverFactor={0.3}
          />
        </div>
        
        <FadeContent blur={true} duration={1000} delay={200} className="w-full px-6 lg:px-12 xl:px-16 relative z-10">
          <div className="text-center mb-20">
            <BlurText
              text="Simple, Transparent Pricing"
              delay={80}
              animateBy="words"
              direction="top"
              className="text-5xl lg:text-6xl font-bold mb-8 neon-text"
              style={{ margin: 'auto', justifyContent: 'center' }}
            />
            <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ margin: 'auto', color: 'var(--landing-text-secondary)' }}>
              Choose the plan that fits your team's needs. All plans include 14-day free trial.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto" style={{margin:'auto'}}>
            {/* Starter Plan */}
            <SpotlightCard 
              className="hover:-translate-y-2 transition-all duration-300 text-center"
              spotlightColor="rgba(16, 185, 129, 0.12)"
            >
              <div className="mb-6 max-w-xs mx-auto">
                <h3 className="text-2xl font-bold mb-2 text-center" style={{ color: 'var(--landing-text-primary)' }}>Starter</h3>
                <p className="text-sm text-center" style={{ color: 'var(--landing-text-secondary)' }}>Perfect for small teams</p>
              </div>
              <div className="mb-8 mx-auto">
                <span className="text-5xl font-bold neon-text">$49</span>
                <span className="text-lg" style={{ color: 'var(--landing-text-secondary)' }}>/month</span>
              </div>
              <ul className="space-y-4 mb-8 max-w-xs mx-auto">
                {[
                  'Up to 5 services monitored',
                  'Real-time alerting',
                  'Basic AI predictions',
                  '1GB log retention',
                  'Email support',
                  'API access'
                ].map((feature, index) => (
                  <li key={index} className="flex items-center gap-3 justify-center">
                    <CheckCircle className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--neon-green)' }} />
                    <span style={{ color: 'var(--landing-text-primary)' }}>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link href="/signup" className="btn-secondary w-full justify-center">
                Start Free Trial
              </Link>
            </SpotlightCard>

            {/* Pro Plan - Featured */}
            <SpotlightCard 
              className="border-2 relative hover:-translate-y-2 transition-all duration-300 text-center"
              spotlightColor="rgba(139, 92, 246, 0.2)"
              style={{ borderColor: 'var(--neon-purple)' }}
            >
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full text-sm font-semibold" style={{ backgroundColor: 'var(--neon-purple)', color: 'var(--landing-bg-primary)' }}>
                Most Popular
              </div>
              <div className="mb-6 mt-4 max-w-xs mx-auto">
                <h3 className="text-2xl font-bold mb-2 text-center" style={{ color: 'var(--landing-text-primary)' }}>Professional</h3>
                <p className="text-sm text-center" style={{ color: 'var(--landing-text-secondary)' }}>For growing teams</p>
              </div>
              <div className="mb-8 mx-auto">
                <span className="text-5xl font-bold neon-text">$149</span>
                <span className="text-lg" style={{ color: 'var(--landing-text-secondary)' }}>/month</span>
              </div>
              <ul className="space-y-4 mb-8 max-w-xs mx-auto">
                {[
                  'Up to 20 services monitored',
                  'Advanced AI predictions',
                  'Auto-remediation',
                  '10GB log retention',
                  'Priority support',
                  'Custom integrations',
                  'SLO management',
                  'Team collaboration'
                ].map((feature, index) => (
                  <li key={index} className="flex items-center gap-3 justify-center">
                    <CheckCircle className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--neon-green)' }} />
                    <span style={{ color: 'var(--landing-text-primary)' }}>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link href="/signup" className="btn-primary w-full justify-center">
                Start Free Trial
              </Link>
            </SpotlightCard>

            {/* Enterprise Plan */}
            <SpotlightCard 
              className="hover:-translate-y-2 transition-all duration-300 text-center"
              spotlightColor="rgba(0, 212, 255, 0.12)"
            >
              <div className="mb-6 max-w-xs mx-auto">
                <h3 className="text-2xl font-bold mb-2 text-center" style={{ color: 'var(--landing-text-primary)' }}>Enterprise</h3>
                <p className="text-sm text-center" style={{ color: 'var(--landing-text-secondary)' }}>For large organizations</p>
              </div>
              <div className="mb-8 mx-auto">
                <span className="text-5xl font-bold neon-text">Custom</span>
              </div>
              <ul className="space-y-4 mb-8 max-w-xs mx-auto">
                {[
                  'Unlimited services',
                  'Full AI automation',
                  'Custom integrations',
                  'Unlimited log retention',
                  '24/7 dedicated support',
                  'Custom SLA',
                  'On-premise deployment',
                  'Security compliance'
                ].map((feature, index) => (
                  <li key={index} className="flex items-center gap-3 justify-center">
                    <CheckCircle className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--neon-green)' }} />
                    <span style={{ color: 'var(--landing-text-primary)' }}>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="btn-secondary w-full justify-center">
                Contact Sales
              </Link>
            </SpotlightCard>
          </div>
        </FadeContent>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen flex items-center justify-center relative py-20" style={{margin:'auto', backgroundColor: '#000000' }}>
        <FadeContent blur={true} duration={1000} delay={200} className="w-full px-6 lg:px-12 xl:px-16">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <BlurText
                  text="About TraceonAI"
                  delay={80}
                  animateBy="words"
                  direction="top"
                  className="text-5xl lg:text-6xl font-bold mb-8 neon-text"
                  style={{ margin: 'auto', justifyContent: 'center' }}
                />
                <p className="text-xl leading-relaxed mb-6" style={{ color: 'var(--landing-text-secondary)' }}>
                  We're on a mission to eliminate downtime and make reliability engineering accessible to every team, regardless of size or resources.
                </p>
                <p className="text-lg leading-relaxed" style={{ color: 'var(--landing-text-secondary)' }}>
                  Founded in 2024 by a team of experienced SREs and AI engineers, TraceonAI combines cutting-edge machine learning with battle-tested reliability practices to predict and prevent failures before they impact your users.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-2">
                  <AnimatedCounter end={500} suffix="+" className="text-4xl font-bold neon-text block" />
                  <p style={{ color: 'var(--landing-text-secondary)' }}>Companies Trust Us</p>
                </div>
                <div className="space-y-2">
                  <AnimatedCounter end={99.99} suffix="%" decimals={2} className="text-4xl font-bold neon-text block" />
                  <p style={{ color: 'var(--landing-text-secondary)' }}>Average Uptime</p>
                </div>
                <div className="space-y-2">
                  <AnimatedCounter end={85} suffix="%" className="text-4xl font-bold neon-text block" />
                  <p style={{ color: 'var(--landing-text-secondary)' }}>Faster Recovery</p>
                </div>
                <div className="space-y-2">
                  <AnimatedCounter end={90} suffix="%" className="text-4xl font-bold neon-text block" />
                  <p style={{ color: 'var(--landing-text-secondary)' }}>Auto-Resolved Incidents</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="card-primary p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl glass-effect flex items-center justify-center">
                    <Target className="w-6 h-6" style={{ color: 'var(--neon-purple)' }} />
                  </div>
                  <h3 className="text-xl font-bold" style={{ color: 'var(--landing-text-primary)' }}>Our Mission</h3>
                </div>
                <p style={{ color: 'var(--landing-text-secondary)' }}>
                  To make site reliability engineering accessible to every engineering team through intelligent automation and predictive AI.
                </p>
              </div>

              <div className="card-primary p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl glass-effect flex items-center justify-center">
                    <Shield className="w-6 h-6" style={{ color: 'var(--neon-green)' }} />
                  </div>
                  <h3 className="text-xl font-bold" style={{ color: 'var(--landing-text-primary)' }}>Our Values</h3>
                </div>
                <p style={{ color: 'var(--landing-text-secondary)' }}>
                  We believe in transparency, reliability, and continuous improvement. Our platform is built on the principles of trust and security-first design.
                </p>
              </div>

              <div className="card-primary p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl glass-effect flex items-center justify-center">
                    <Users className="w-6 h-6" style={{ color: 'var(--neon-blue)' }} />
                  </div>
                  <h3 className="text-xl font-bold" style={{ color: 'var(--landing-text-primary)' }}>Our Team</h3>
                </div>
                <p style={{ color: 'var(--landing-text-secondary)' }}>
                  Built by engineers who have managed infrastructure at scale for companies like Google, Netflix, and Amazon.
                </p>
              </div>
            </div>
          </div>
        </FadeContent>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen flex items-center justify-center relative py-20" style={{ backgroundColor: '#000000' }}>
        {/* Particles Background */}
        <div className="absolute inset-0 z-0">
          <Particles
            particleColors={['#FFFFFF']}
            particleCount={500}
            particleSpread={20}
            speed={0.05}
            particleBaseSize={200}
            moveParticlesOnHover={false}
            alphaParticles={true}
            disableRotation={false}
            particleHoverFactor={0.3}
          />
        </div>
        
        <FadeContent blur={true} duration={1000} delay={200} className="w-full px-6 lg:px-12 xl:px-16 relative z-10">
          <div className="text-center mb-20">
            <BlurText
              text="Get In Touch"
              delay={80}
              animateBy="words"
              direction="top"
              className="text-5xl lg:text-6xl font-bold mb-8 neon-text"
              style={{ margin: 'auto', justifyContent: 'center' }}
            />
            <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{margin:'auto', color: 'var(--landing-text-secondary)' }}>
              Have questions? We're here to help. Reach out and we'll get back to you as soon as possible.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="card-primary p-10">
              <form className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium" style={{ color: 'var(--landing-text-primary)' }}>Name</label>
                  <input 
                    type="text" 
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-lg glass-effect border focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                    style={{ 
                      backgroundColor: 'var(--background-secondary)',
                      borderColor: 'var(--landing-border-primary)',
                      color: 'var(--landing-text-primary)'
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium" style={{ color: 'var(--landing-text-primary)' }}>Email</label>
                  <input 
                    type="email" 
                    placeholder="john@company.com"
                    className="w-full px-4 py-3 rounded-lg glass-effect border focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                    style={{ 
                      backgroundColor: 'var(--background-secondary)',
                      borderColor: 'var(--landing-border-primary)',
                      color: 'var(--landing-text-primary)'
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium" style={{ color: 'var(--landing-text-primary)' }}>Company</label>
                  <input 
                    type="text" 
                    placeholder="Company Name"
                    className="w-full px-4 py-3 rounded-lg glass-effect border focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                    style={{ 
                      backgroundColor: 'var(--background-secondary)',
                      borderColor: 'var(--landing-border-primary)',
                      color: 'var(--landing-text-primary)'
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium" style={{ color: 'var(--landing-text-primary)' }}>Message</label>
                  <textarea 
                    rows={6}
                    placeholder="Tell us about your infrastructure needs..."
                    className="w-full px-4 py-3 rounded-lg glass-effect border focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all resize-none"
                    style={{ 
                      backgroundColor: 'var(--background-secondary)',
                      borderColor: 'var(--landing-border-primary)',
                      color: 'var(--landing-text-primary)'
                    }}
                  />
                </div>

                <button type="submit" className="btn-primary w-full justify-center inline-flex items-center gap-2">
                  <span>Send Message</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div className="card-primary p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl glass-effect flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6" style={{ color: 'var(--neon-purple)' }} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--landing-text-primary)' }}>Email Us</h3>
                    <p className="mb-2" style={{ color: 'var(--landing-text-secondary)' }}>Our team typically responds within 24 hours</p>
                    <a href="mailto:hello@traceonai.com" className="text-lg neon-text hover:underline">
                      hello@traceonai.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="card-primary p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl glass-effect flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-6 h-6" style={{ color: 'var(--neon-blue)' }} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--landing-text-primary)' }}>Live Chat</h3>
                    <p className="mb-2" style={{ color: 'var(--landing-text-secondary)' }}>Available Monday-Friday, 9am-6pm PST</p>
                    <button className="text-lg neon-text hover:underline">
                      Start Chat →
                    </button>
                  </div>
                </div>
              </div>

              <div className="card-primary p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl glass-effect flex items-center justify-center flex-shrink-0">
                    <Slack className="w-6 h-6" style={{ color: 'var(--neon-green)' }} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--landing-text-primary)' }}>Join Our Community</h3>
                    <p className="mb-2" style={{ color: 'var(--landing-text-secondary)' }}>Connect with other users and our team</p>
                    <a href="#" className="text-lg neon-text hover:underline">
                      Join Slack Community →
                    </a>
                  </div>
                </div>
              </div>

              <div className="card-primary p-8">
                <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--landing-text-primary)' }}>Connect With Us</h3>
                <div className="flex gap-4">
                  {[
                    { icon: Github, href: '#', label: 'GitHub' },
                    { icon: Linkedin, href: '#', label: 'LinkedIn' },
                    { icon: Youtube, href: '#', label: 'YouTube' },
                    { icon: Slack, href: '#', label: 'Slack' }
                  ].map((social, index) => (
                    <a 
                      key={index} 
                      href={social.href}
                      className="w-12 h-12 rounded-xl glass-effect flex items-center justify-center hover:scale-110 transition-transform duration-300"
                      title={social.label}
                    >
                      <social.icon className="w-6 h-6" style={{ color: 'var(--neon-purple)' }} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </FadeContent>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t w-full" style={{ backgroundColor: 'var(--landing-bg-primary)', borderColor: 'var(--landing-border-primary)' }}>
        <div className="w-full px-6 lg:px-12 xl:px-16 py-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
              {/* Company Info - Larger column */}
              <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ 
                    backgroundColor: 'var(--neon-purple)',
                    boxShadow: '0 0 20px rgba(139, 92, 246, 0.3)'
                  }}>
                    <Brain className="w-6 h-6" style={{ color: 'var(--landing-bg-primary)' }} />
                  </div>
                  <span className="text-2xl font-bold neon-text">TraceonAI</span>
                </div>
                <p className="text-sm leading-relaxed max-w-sm" style={{ color: 'var(--landing-text-secondary)' }}>
                  Agentic AI platform that connects logging tools, databases, and communication channels 
                  to automate incident response and root cause analysis.
                </p>
                
                {/* Social Links */}
                <div className="flex gap-3 pt-4">
                  <a 
                    href="mailto:hello@traceonai.com" 
                    className="w-10 h-10 rounded-lg glass-effect flex items-center justify-center transition-all duration-300 hover:scale-110"
                    style={{ border: '1px solid var(--landing-border-primary)' }}
                  >
                    <Mail className="w-5 h-5" style={{ color: 'var(--landing-text-secondary)' }} />
                  </a>
                  <a 
                    href="https://github.com/traceonai" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-10 h-10 rounded-lg glass-effect flex items-center justify-center transition-all duration-300 hover:scale-110"
                    style={{ border: '1px solid var(--landing-border-primary)' }}
                  >
                    <Github className="w-5 h-5" style={{ color: 'var(--landing-text-secondary)' }} />
                  </a>
                  <a 
                    href="https://linkedin.com/company/traceonai" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-10 h-10 rounded-lg glass-effect flex items-center justify-center transition-all duration-300 hover:scale-110"
                    style={{ border: '1px solid var(--landing-border-primary)' }}
                  >
                    <Linkedin className="w-5 h-5" style={{ color: 'var(--landing-text-secondary)' }} />
                  </a>
                  <a 
                    href="https://youtube.com/@traceonai" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-10 h-10 rounded-lg glass-effect flex items-center justify-center transition-all duration-300 hover:scale-110"
                    style={{ border: '1px solid var(--landing-border-primary)' }}
                  >
                    <Youtube className="w-5 h-5" style={{ color: 'var(--landing-text-secondary)' }} />
                  </a>
                  <a 
                    href="https://traceonai.slack.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-10 h-10 rounded-lg glass-effect flex items-center justify-center transition-all duration-300 hover:scale-110"
                    style={{ border: '1px solid var(--landing-border-primary)' }}
                  >
                    <Slack className="w-5 h-5" style={{ color: 'var(--landing-text-secondary)' }} />
                  </a>
                </div>
              </div>

              {/* Product Links */}
              <div className="space-y-4">
                <h4 className="font-bold text-sm uppercase tracking-wider mb-6" style={{ color: 'var(--landing-text-primary)' }}>Product</h4>
                <div className="space-y-3">
                  <a href="#features" className="block text-sm transition-colors duration-300 hover:translate-x-1" style={{ color: 'var(--landing-text-secondary)' }}>
                    Features
                  </a>
                  <a href="#integrations" className="block text-sm transition-colors duration-300 hover:translate-x-1" style={{ color: 'var(--landing-text-secondary)' }}>
                    Integrations
                  </a>
                  <Link href="/docs" className="block text-sm transition-colors duration-300 hover:translate-x-1" style={{ color: 'var(--landing-text-secondary)' }}>
                    Documentation
                  </Link>
                  <a href="#pricing" className="block text-sm transition-colors duration-300 hover:translate-x-1" style={{ color: 'var(--landing-text-secondary)' }}>
                    Pricing
                  </a>
                </div>
              </div>

              {/* Solutions Links */}
              <div className="space-y-4">
                <h4 className="font-bold text-sm uppercase tracking-wider mb-6" style={{ color: 'var(--landing-text-primary)' }}>Solutions</h4>
                <div className="space-y-3">
                  <Link href="/solutions/monitoring" className="block text-sm transition-colors duration-300 hover:translate-x-1" style={{ color: 'var(--landing-text-secondary)' }}>
                    Root Cause Analysis
                  </Link>
                  <Link href="/solutions/incident-response" className="block text-sm transition-colors duration-300 hover:translate-x-1" style={{ color: 'var(--landing-text-secondary)' }}>
                    Incident Response
                  </Link>
                  <Link href="/solutions/automation" className="block text-sm transition-colors duration-300 hover:translate-x-1" style={{ color: 'var(--landing-text-secondary)' }}>
                    AI Automation
                  </Link>
                  <Link href="/solutions/integrations" className="block text-sm transition-colors duration-300 hover:translate-x-1" style={{ color: 'var(--landing-text-secondary)' }}>
                    Multi-Source Integration
                  </Link>
                </div>
              </div>

              {/* Company Links */}
              <div className="space-y-4">
                <h4 className="font-bold text-sm uppercase tracking-wider mb-6" style={{ color: 'var(--landing-text-primary)' }}>Company</h4>
                <div className="space-y-3">
                  <a href="#about" className="block text-sm transition-colors duration-300 hover:translate-x-1" style={{ color: 'var(--landing-text-secondary)' }}>
                    About
                  </a>
                  <Link href="/blog" className="block text-sm transition-colors duration-300 hover:translate-x-1" style={{ color: 'var(--landing-text-secondary)' }}>
                    Blog
                  </Link>
                  <Link href="/careers" className="block text-sm transition-colors duration-300 hover:translate-x-1" style={{ color: 'var(--landing-text-secondary)' }}>
                    Careers
                  </Link>
                  <a href="#contact" className="block text-sm transition-colors duration-300 hover:translate-x-1" style={{ color: 'var(--landing-text-secondary)' }}>
                    Contact
                  </a>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="pt-8 border-t" style={{ borderColor: 'var(--landing-border-primary)' }}>
              <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <p className="text-sm" style={{ color: 'var(--landing-text-tertiary)' }}>
                  © 2025 TraceonAI. All rights reserved.
                </p>
                <div className="flex items-center gap-8">
                  <Link href="/privacy" className="text-sm transition-colors duration-300" style={{ color: 'var(--landing-text-tertiary)' }}>
                    Privacy Policy
                  </Link>
                  <Link href="/terms" className="text-sm transition-colors duration-300" style={{ color: 'var(--landing-text-tertiary)' }}>
                    Terms of Service
                  </Link>
                  <Link href="/security" className="text-sm transition-colors duration-300" style={{ color: 'var(--landing-text-tertiary)' }}>
                    Security
                  </Link>
                </div>
              </div>
            </div>
        </div>
      </footer>
    </div>
  );
}
