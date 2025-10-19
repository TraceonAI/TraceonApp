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
    title: "Predictive Intelligence",
    description: "AI models trained on millions of incidents predict failures 4 hours before they occur, reducing MTTR by 85%."
  },
  {
    icon: Shield,
    title: "Autonomous Remediation", 
    description: "Self-healing systems automatically resolve 90% of incidents without human intervention using ML-driven playbooks."
  },
  {
    icon: Activity,
    title: "Real-Time Observability",
    description: "Comprehensive monitoring across all layers with intelligent correlation and root cause analysis in seconds."
  },
  {
    icon: Target,
    title: "SLO Management",
    description: "Automated SLI tracking and error budget management with predictive alerting to prevent SLO violations."
  },
  {
    icon: Gauge,
    title: "Performance Optimization",
    description: "Continuous performance tuning using AI to optimize resource allocation and eliminate bottlenecks."
  },
  {
    icon: Lock,
    title: "Security Integration",
    description: "Built-in security monitoring with threat detection and automated compliance reporting for SOC 2 & ISO 27001."
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
  { node: <SiApachekafka style={{ color: 'var(--text-primary)' }} />, title: "Apache Kafka" },
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

  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: 'var(--bg-primary)' }}>
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

      {/* Floating Neon Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="neon-glow absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-30"></div>
        <div className="neon-glow absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-20" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 glass-effect border-b" style={{ borderColor: 'var(--border-primary)' }}>
        <div className="w-full px-4 lg:px-8 xl:px-12">
          <div className="flex justify-between items-center h-20 py-4">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Hexagon className="w-8 h-8 neon-text" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Brain className="w-4 h-4" style={{ color: 'var(--bg-primary)' }} />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold neon-text">TraceonAI</span>
                <span className="text-xs font-mono" style={{ color: 'var(--neon-blue)' }}>AI SRE Platform</span>
              </div>
            </div>
            
            {/* Center Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {[
                { name: 'Features', href: '#features' },
                { name: 'Pricing', href: '#pricing' },
                { name: 'About', href: '#about' },
                { name: 'Contact', href: '#contact' }
              ].map((item) => (
                <a 
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium transition-all duration-300 relative group"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 group-hover:w-full transition-all duration-300"></span>
                </a>
              ))}
            </div>
            
            {/* Actions */}
            <div className="flex items-center space-x-4">
              <Link href="/login" className="btn-secondary">
                Sign In
              </Link>
              <Link href="/signup" className="btn-primary">
                Start Free Trial
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="w-full px-6 lg:px-12 xl:px-16 text-center relative z-10">
          <div className="space-y-16">
            {/* Hero Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center px-4 py-2 rounded-full glass-effect neon-border mb-8">
                <Zap className="w-4 h-4 mr-2" style={{ color: 'var(--neon-blue)' }} />
                <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                  Now with AI-powered autonomous healing
                </span>
              </div>
              
              <h1 className="text-6xl lg:text-7xl font-bold leading-tight">
                <span className="neon-text">Developer infrastructure</span>
                <br />
                <span style={{ color: 'var(--text-primary)' }}>built for your </span>
                <span className="neon-text">team</span>
              </h1>
              
              <p className="text-xl max-w-4xl mx-auto leading-relaxed" style={{margin:'auto', color: 'var(--text-secondary)' }}>
                TraceonAI works seamlessly with the technologies you already use. 
                Predictive AI that prevents outages before they happen, with autonomous 
                remediation that maintains 99.99% uptime.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
              <Link href="/signup" className="btn-primary text-lg px-8 py-4">
                Start free trial
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/login" className="btn-secondary text-lg px-8 py-4">
                Sign in to dashboard
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="pt-16 space-y-6">
              <p className="text-sm font-medium uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>
                Built for the world's fastest engineering teams, now available for everyone
              </p>
              <div className="flex items-center justify-center gap-12 opacity-60">
                <div className="text-2xl">🚀</div>
                <div className="text-2xl">⚡</div>
                <div className="text-2xl">🛡️</div>
                <div className="text-2xl">🎯</div>
                <div className="text-2xl">🔥</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Showcase - Graphite Style */}
      <section className="min-h-screen flex items-center justify-center relative py-20">
        <div className="w-full px-6 lg:px-12 xl:px-16">
          <div className="text-center mb-28">
            <h2 className="text-4xl lg:text-5xl font-bold mb-8">
              <span style={{ color: 'var(--text-primary)' }}>Where change happens</span>
            </h2>
            <p  className="text-xl max-w-3xl mx-auto leading-relaxed" style={{margin:'auto', color: 'var(--text-secondary)' }}>
              Organizations that adopt TraceonAI ship more code with smaller incidents 
              and faster recovery cycles.
            </p>
          </div>

          {/* 3D Feature Cards */}
          <div className="relative max-w-6xl mx-auto">
            <div className="space-y-12">
              {/* AI Intelligence Card */}
              <div style={{margin:'auto'}} className="glass-effect neon-border p-10 rounded-2xl transform hover:scale-[1.02] transition-all duration-500 hover:shadow-2xl">
                <div className="grid lg:grid-cols-2 gap-10 items-center">
                  <div>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-xl glass-effect flex items-center justify-center">
                        <Brain className="w-6 h-6" style={{ color: 'var(--neon-purple)' }} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold neon-text">Predictive Intelligence</h3>
                        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>AI models predict failures before they occur</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span style={{ color: 'var(--text-secondary)' }}>MTTR Reduction</span>
                        <span className="neon-text font-bold text-xl">85%</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-3">
                        <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full shadow-lg" style={{ width: '85%' }}></div>
                      </div>
                    </div>
                  </div>
                  <div className="glass-effect rounded-xl p-6 bg-gradient-to-br from-purple-900/20 to-blue-900/20">
                    <pre className="text-sm font-mono text-green-400">
{`> AI Analysis Complete
  Anomaly detected: CPU spike pattern
  Prediction: Service failure in 3.2 hours
  Auto-scaling: +3 instances
  Status: ✅ Incident prevented`}
                    </pre>
                  </div>
                </div>
              </div>

              {/* Autonomous Healing Card */}
              <div className="glass-effect neon-border p-10 rounded-2xl transform hover:scale-[1.02] transition-all duration-500 hover:shadow-2xl">
                <div className="grid lg:grid-cols-2 gap-10 items-center">
                  <div className="glass-effect rounded-xl p-6 bg-gradient-to-br from-green-900/20 to-teal-900/20 lg:order-2">
                    <pre className="text-sm font-mono text-blue-400">
{`> Incident Detected
  Service: payment-api
  Error Rate: 15% → Auto-healing initiated
  Rollback: Deployed v2.1.3
  Recovery Time: 47 seconds
  Status: ✅ Service restored`}
                    </pre>
                  </div>
                  <div>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-xl glass-effect flex items-center justify-center">
                        <Shield className="w-6 h-6" style={{ color: 'var(--neon-green)' }} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold neon-text">Autonomous Remediation</h3>
                        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Self-healing systems resolve incidents automatically</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span style={{ color: 'var(--text-secondary)' }}>Incidents Auto-Resolved</span>
                        <span className="neon-text font-bold text-xl">90%</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-3">
                        <div className="bg-gradient-to-r from-green-500 to-teal-500 h-3 rounded-full shadow-lg" style={{ width: '90%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* AI Assistant Section */}
      <section className="py-40" style={{ backgroundColor: 'var(--background-primary)' }}>
        <div className="w-full px-4 lg:px-8 xl:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Large Media Card */}
            <div className="card-primary p-8 background-glow corner-plus">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--teal)' }}>
                    <Brain className="w-6 h-6" style={{ color: 'var(--background-primary)' }} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>AI SRE Assistant</h3>
                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Your intelligent reliability partner</p>
                  </div>
                </div>
                
                <div className="h-64 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--background-secondary)' }}>
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center animate-pulse-custom" style={{ backgroundColor: 'var(--teal)' }}>
                      <Activity className="w-8 h-8" style={{ color: 'var(--background-primary)' }} />
                    </div>
                    <div className="space-y-2">
                      <p className="font-mono text-sm" style={{ color: 'var(--teal)' }}>$ traceon analyze --incident=prod-db-spike</p>
                      <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Analyzing incident patterns...</p>
                      <p className="text-sm" style={{ color: 'var(--green)' }}>✅ Root cause identified: Memory leak in user service</p>
                      <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Suggested fix: Implement connection pooling</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Vertical Benefits List */}
            <div className="space-y-6">
              <div className="accent-line">
                <h2 className="text-section mb-4">Intelligent Operations</h2>
                <p className="text-body">
                  Our AI assistant continuously learns from your infrastructure patterns to provide
                  proactive insights and automated remediation strategies.
                </p>
              </div>
              
              <div className="space-y-4">
                {[
                  { icon: Target, title: "Predictive Analysis", desc: "Forecast issues 4-6 hours before they impact users" },
                  { icon: Zap, title: "Auto-Remediation", desc: "Resolve 90% of incidents without human intervention" },
                  { icon: BarChart3, title: "Performance Insights", desc: "Continuous optimization recommendations" },
                  { icon: CheckCircle, title: "SLO Management", desc: "Automated tracking and error budget alerts" }
                ].map((benefit, index) => (
                  <div key={index} className="flex gap-4 p-4 rounded-lg transition-colors duration-300 hover:bg-gray-800/50">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--background-card)' }}>
                      <benefit.icon className="w-5 h-5" style={{ color: 'var(--teal)' }} />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>{benefit.title}</h4>
                      <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{benefit.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Demonstration with ScrollStack */}
      <section className="py-20" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="w-full px-4 lg:px-8 xl:px-12">
          <div className="text-center mb-12">
            <h2 className="text-section mb-4 text-reveal">Intelligent SRE Platform</h2>
            <p style={{margin:'auto'}} className="text-body max-w-4xl mx-auto scroll-fade-in">
              Experience our AI-powered capabilities through interactive demonstrations
            </p>
          </div>
        </div>
        
        <ScrollStack
          className="scroll-stack-wrapper"
          itemDistance={150}
          itemScale={0.05}
          itemStackDistance={40}
          stackPosition="30%"
          scaleEndPosition="15%"
          baseScale={0.88}
          useWindowScroll={false}
        >
          {/* Card 1: Intelligent Operations */}
          <ScrollStackItem itemClassName="card-primary">
            <div className="space-y-6">
              <div className="accent-line">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                    <Brain className="w-6 h-6" style={{ color: 'var(--neon-blue)' }} />
                  </div>
                  <h2 className="text-3xl font-bold neon-text">Intelligent Operations</h2>
                </div>
                <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
                  Our AI assistant continuously learns from your infrastructure patterns to provide
                  proactive insights and automated remediation strategies.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4 mt-6">
                {[
                  { icon: Target, title: "Predictive Analysis", desc: "Forecast issues 4-6 hours before they impact users" },
                  { icon: Zap, title: "Auto-Remediation", desc: "Resolve 90% of incidents without human intervention" },
                  { icon: BarChart3, title: "Performance Insights", desc: "Continuous optimization recommendations" },
                  { icon: CheckCircle, title: "SLO Management", desc: "Automated tracking and error budget alerts" }
                ].map((benefit, index) => (
                  <div key={index} className="flex gap-3 p-4 rounded-lg glass-effect">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                      <benefit.icon className="w-5 h-5" style={{ color: 'var(--neon-green)' }} />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>{benefit.title}</h4>
                      <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{benefit.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollStackItem>

          {/* Card 2: Real-Time Monitoring */}
          <ScrollStackItem itemClassName="card-primary">
            <div className="space-y-6">
              <div className="accent-line">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                    <Activity className="w-6 h-6" style={{ color: 'var(--neon-purple)' }} />
                  </div>
                  <h2 className="text-3xl font-bold neon-text">Real-Time Monitoring</h2>
                </div>
                <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
                  Comprehensive observability across your entire stack with intelligent alerting 
                  that reduces noise by 95% and focuses on what matters.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className="space-y-4">
                  <div className="icon-pill">
                    <Activity className="icon" />
                    <span>Live Infrastructure Metrics</span>
                  </div>
                  <div className="icon-pill">
                    <BarChart3 className="icon" />
                    <span>Application Performance Monitoring</span>
                  </div>
                  <div className="icon-pill">
                    <Bell className="icon" />
                    <span>Smart Alert Correlation</span>
                  </div>
                </div>

                <div className="glass-effect p-4 rounded-lg">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold" style={{ color: 'var(--text-primary)' }}>System Health</h4>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--neon-green)' }}></div>
                        <span className="text-sm font-mono" style={{ color: 'var(--neon-green)' }}>HEALTHY</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 rounded-lg" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                        <div className="text-2xl font-bold" style={{ color: 'var(--neon-green)' }}>99.97%</div>
                        <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>Uptime</div>
                      </div>
                      <div className="text-center p-3 rounded-lg" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                        <div className="text-2xl font-bold" style={{ color: 'var(--neon-blue)' }}>1.2ms</div>
                        <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>Response</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollStackItem>

          {/* Card 3: Autonomous Response */}
          <ScrollStackItem itemClassName="card-primary">
            <div className="space-y-6">
              <div className="accent-line">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                    <Shield className="w-6 h-6" style={{ color: 'var(--neon-green)' }} />
                  </div>
                  <h2 className="text-3xl font-bold neon-text">Autonomous Response</h2>
                </div>
                <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
                  AI-driven incident response that learns from every outage to build 
                  smarter remediation strategies and prevent future occurrences.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className="glass-effect p-4 rounded-lg">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Incident Timeline</h4>
                      <div className="text-xs font-mono" style={{ color: 'var(--neon-green)' }}>Auto-resolved in 47s</div>
                    </div>
                    {[
                      { time: '14:32:15', event: 'Anomaly detected in payment service', status: 'detected' },
                      { time: '14:32:22', event: 'AI analysis: Memory leak identified', status: 'analyzing' },
                      { time: '14:32:35', event: 'Auto-restart initiated', status: 'resolving' },
                      { time: '14:33:02', event: 'Service healthy, monitoring', status: 'resolved' }
                    ].map((item, index) => (
                      <div key={index} className="flex gap-3">
                        <div className="flex-shrink-0 w-2 h-2 rounded-full mt-2" style={{ 
                          backgroundColor: item.status === 'resolved' ? 'var(--neon-green)' : 
                                         item.status === 'resolving' ? 'var(--neon-orange)' : 'var(--neon-blue)' 
                        }}></div>
                        <div>
                          <div className="text-xs font-mono" style={{ color: 'var(--text-tertiary)' }}>{item.time}</div>
                          <div className="text-sm" style={{ color: 'var(--text-primary)' }}>{item.event}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="icon-pill">
                    <AlertTriangle className="icon" />
                    <span>Intelligent Anomaly Detection</span>
                  </div>
                  <div className="icon-pill">
                    <Shield className="icon" />
                    <span>Automated Remediation</span>
                  </div>
                  <div className="icon-pill">
                    <CheckCircle className="icon" />
                    <span>Self-Healing Infrastructure</span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollStackItem>
        </ScrollStack>
      </section>

      {/* Feature Grid */}
      <section className="min-h-screen flex items-center justify-center scroll-fade-in py-20" style={{ backgroundColor: 'var(--background-primary)' }}>
        <div className="w-full px-4 lg:px-8 xl:px-12">
          <div className="text-center mb-16">
            <h2 className="text-section mb-4 text-reveal">Complete SRE Platform</h2>
            <p className="text-body max-w-4xl mx-auto scroll-fade-in" style={{margin:'auto'}}>
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
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center hover-scale" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                    <feature.icon className="w-5 h-5 icon-spin" style={{ color: 'var(--neon-blue)' }} />
                  </div>
                  <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>{feature.title}</h3>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {feature.description}
                </p>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      {/* Developer Infrastructure Section */}
      <section className="min-h-screen flex items-center justify-center scroll-fade-in py-20" style={{ backgroundColor: 'var(--background-secondary)' }}>
        <div className="w-full px-4 lg:px-8 xl:px-12">
          <div className="text-center mb-16">
            <h2 className="text-section mb-4 text-reveal">Seamless Integrations</h2>
            <p style={{margin:'auto'}} className="text-body max-w-4xl mx-auto scroll-fade-in mb-8">
              Connect with your existing tools and workflows. TraceonAI integrates with 
              100+ platforms to provide unified visibility across your entire stack.
            </p>
            <p className="text-sm scroll-fade-in" style={{ color: 'var(--text-secondary)' }}>
              Our AI SRE seamlessly integrates with your entire technology ecosystem
            </p>
          </div>
          
          {/* Logo Loop Integration Showcase */}
          <div className="mb-16" style={{ height: '120px', position: 'relative', overflow: 'hidden' }}>
            <LogoLoop
              logos={integrationLogos}
              speed={40}
              direction="left"
              logoHeight={48}
              gap={60}
              pauseOnHover
              scaleOnHover
              fadeOut
              fadeOutColor="#111111"
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
                <h4 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{integration.name}</h4>
                <div className={`text-xs mt-1 ${integration.color} pulse-glow`}>Connected</div>
              </SpotlightCard>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <button className="btn-secondary">
              View All Integrations
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>
      </section>



      {/* Features Section */}
      <section id="features" className="min-h-screen flex items-center justify-center relative py-20" style={{ backgroundColor: 'var(--background-secondary)' }}>
        <div className="w-full px-6 lg:px-12 xl:px-16">
          <div className="text-center mb-20">
            <h2 className="text-5xl lg:text-6xl font-bold mb-8">
              <span className="neon-text">Powerful Features</span>
            </h2>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{margin:'auto', color: 'var(--text-secondary)' }}>
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
                <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="min-h-screen flex items-center justify-center relative py-20" style={{ backgroundColor: 'var(--background-primary)' }}>
        <div className="w-full px-6 lg:px-12 xl:px-16">
          <div className="text-center mb-20">
            <h2 className="text-5xl lg:text-6xl font-bold mb-8">
              <span className="neon-text">Simple, Transparent Pricing</span>
            </h2>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ margin: 'auto', color: 'var(--text-secondary)' }}>
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
                <h3 className="text-2xl font-bold mb-2 text-center" style={{ color: 'var(--text-primary)' }}>Starter</h3>
                <p className="text-sm text-center" style={{ color: 'var(--text-secondary)' }}>Perfect for small teams</p>
              </div>
              <div className="mb-8 mx-auto">
                <span className="text-5xl font-bold neon-text">$49</span>
                <span className="text-lg" style={{ color: 'var(--text-secondary)' }}>/month</span>
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
                    <span style={{ color: 'var(--text-primary)' }}>{feature}</span>
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
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full text-sm font-semibold" style={{ backgroundColor: 'var(--neon-purple)', color: 'var(--bg-primary)' }}>
                Most Popular
              </div>
              <div className="mb-6 mt-4 max-w-xs mx-auto">
                <h3 className="text-2xl font-bold mb-2 text-center" style={{ color: 'var(--text-primary)' }}>Professional</h3>
                <p className="text-sm text-center" style={{ color: 'var(--text-secondary)' }}>For growing teams</p>
              </div>
              <div className="mb-8 mx-auto">
                <span className="text-5xl font-bold neon-text">$149</span>
                <span className="text-lg" style={{ color: 'var(--text-secondary)' }}>/month</span>
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
                    <span style={{ color: 'var(--text-primary)' }}>{feature}</span>
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
                <h3 className="text-2xl font-bold mb-2 text-center" style={{ color: 'var(--text-primary)' }}>Enterprise</h3>
                <p className="text-sm text-center" style={{ color: 'var(--text-secondary)' }}>For large organizations</p>
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
                    <span style={{ color: 'var(--text-primary)' }}>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="btn-secondary w-full justify-center">
                Contact Sales
              </Link>
            </SpotlightCard>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen flex items-center justify-center relative py-20" style={{margin:'auto', backgroundColor: 'var(--background-secondary)' }}>
        <div className="w-full px-6 lg:px-12 xl:px-16">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <h2 className="text-5xl lg:text-6xl font-bold mb-8">
                  <span className="neon-text">About TraceonAI</span>
                </h2>
                <p className="text-xl leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
                  We're on a mission to eliminate downtime and make reliability engineering accessible to every team, regardless of size or resources.
                </p>
                <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  Founded in 2024 by a team of experienced SREs and AI engineers, TraceonAI combines cutting-edge machine learning with battle-tested reliability practices to predict and prevent failures before they impact your users.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-2">
                  <div className="text-4xl font-bold neon-text">500+</div>
                  <p style={{ color: 'var(--text-secondary)' }}>Companies Trust Us</p>
                </div>
                <div className="space-y-2">
                  <div className="text-4xl font-bold neon-text">99.99%</div>
                  <p style={{ color: 'var(--text-secondary)' }}>Average Uptime</p>
                </div>
                <div className="space-y-2">
                  <div className="text-4xl font-bold neon-text">85%</div>
                  <p style={{ color: 'var(--text-secondary)' }}>Faster Recovery</p>
                </div>
                <div className="space-y-2">
                  <div className="text-4xl font-bold neon-text">90%</div>
                  <p style={{ color: 'var(--text-secondary)' }}>Auto-Resolved Incidents</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="card-primary p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl glass-effect flex items-center justify-center">
                    <Target className="w-6 h-6" style={{ color: 'var(--neon-purple)' }} />
                  </div>
                  <h3 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Our Mission</h3>
                </div>
                <p style={{ color: 'var(--text-secondary)' }}>
                  To make site reliability engineering accessible to every engineering team through intelligent automation and predictive AI.
                </p>
              </div>

              <div className="card-primary p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl glass-effect flex items-center justify-center">
                    <Shield className="w-6 h-6" style={{ color: 'var(--neon-green)' }} />
                  </div>
                  <h3 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Our Values</h3>
                </div>
                <p style={{ color: 'var(--text-secondary)' }}>
                  We believe in transparency, reliability, and continuous improvement. Our platform is built on the principles of trust and security-first design.
                </p>
              </div>

              <div className="card-primary p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl glass-effect flex items-center justify-center">
                    <Users className="w-6 h-6" style={{ color: 'var(--neon-blue)' }} />
                  </div>
                  <h3 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Our Team</h3>
                </div>
                <p style={{ color: 'var(--text-secondary)' }}>
                  Built by engineers who have managed infrastructure at scale for companies like Google, Netflix, and Amazon.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen flex items-center justify-center relative py-20" style={{ backgroundColor: 'var(--background-primary)' }}>
        <div className="w-full px-6 lg:px-12 xl:px-16">
          <div className="text-center mb-20">
            <h2 className="text-5xl lg:text-6xl font-bold mb-8">
              <span className="neon-text">Get In Touch</span>
            </h2>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{margin:'auto', color: 'var(--text-secondary)' }}>
              Have questions? We're here to help. Reach out and we'll get back to you as soon as possible.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="card-primary p-10">
              <form className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Name</label>
                  <input 
                    type="text" 
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-lg glass-effect border focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                    style={{ 
                      backgroundColor: 'var(--background-secondary)',
                      borderColor: 'var(--border-primary)',
                      color: 'var(--text-primary)'
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Email</label>
                  <input 
                    type="email" 
                    placeholder="john@company.com"
                    className="w-full px-4 py-3 rounded-lg glass-effect border focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                    style={{ 
                      backgroundColor: 'var(--background-secondary)',
                      borderColor: 'var(--border-primary)',
                      color: 'var(--text-primary)'
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Company</label>
                  <input 
                    type="text" 
                    placeholder="Company Name"
                    className="w-full px-4 py-3 rounded-lg glass-effect border focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                    style={{ 
                      backgroundColor: 'var(--background-secondary)',
                      borderColor: 'var(--border-primary)',
                      color: 'var(--text-primary)'
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Message</label>
                  <textarea 
                    rows={6}
                    placeholder="Tell us about your infrastructure needs..."
                    className="w-full px-4 py-3 rounded-lg glass-effect border focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all resize-none"
                    style={{ 
                      backgroundColor: 'var(--background-secondary)',
                      borderColor: 'var(--border-primary)',
                      color: 'var(--text-primary)'
                    }}
                  />
                </div>

                <button type="submit" className="btn-primary w-full justify-center">
                  Send Message
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
                    <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Email Us</h3>
                    <p className="mb-2" style={{ color: 'var(--text-secondary)' }}>Our team typically responds within 24 hours</p>
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
                    <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Live Chat</h3>
                    <p className="mb-2" style={{ color: 'var(--text-secondary)' }}>Available Monday-Friday, 9am-6pm PST</p>
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
                    <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Join Our Community</h3>
                    <p className="mb-2" style={{ color: 'var(--text-secondary)' }}>Connect with other users and our team</p>
                    <a href="#" className="text-lg neon-text hover:underline">
                      Join Slack Community →
                    </a>
                  </div>
                </div>
              </div>

              <div className="card-primary p-8">
                <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Connect With Us</h3>
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
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-16 border-t" style={{ backgroundColor: 'var(--background-primary)', borderColor: 'var(--border)' }}>
        <div className="w-full px-4 lg:px-8 xl:px-12">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Hexagon className="w-8 h-8" style={{ color: 'var(--teal)' }} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Brain className="w-4 h-4" style={{ color: 'var(--background-primary)' }} />
                  </div>
                </div>
                <span className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>TraceonAI</span>
              </div>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                AI-powered site reliability engineering platform for modern infrastructure.
              </p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full animate-pulse-custom" style={{ backgroundColor: 'var(--green)' }}></div>
                <span className="text-sm status-online">All systems operational</span>
              </div>
            </div>

            {/* Product Links */}
            <div className="space-y-4">
              <h4 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Product</h4>
              <div className="space-y-2">
                <a href="#features" className="block text-sm footer-link">
                  Platform
                </a>
                <a href="#features" className="block text-sm footer-link">
                  Integrations
                </a>
                <Link href="/login" className="block text-sm footer-link">
                  API Docs
                </Link>
                <a href="#pricing" className="block text-sm footer-link">
                  Pricing
                </a>
              </div>
            </div>

            {/* Solutions Links */}
            <div className="space-y-4">
              <h4 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Solutions</h4>
              <div className="space-y-2">
                <a href="#features" className="block text-sm footer-link">
                  Monitoring
                </a>
                <a href="#features" className="block text-sm footer-link">
                  Incident Response
                </a>
                <a href="#features" className="block text-sm footer-link">
                  Performance
                </a>
                <a href="#features" className="block text-sm footer-link">
                  Security
                </a>
              </div>
            </div>

            {/* Company Links */}
            <div className="space-y-4">
              <h4 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Company</h4>
              <div className="space-y-2">
                <a href="#about" className="block text-sm footer-link">
                  About
                </a>
                <a href="#features" className="block text-sm footer-link">
                  Blog
                </a>
                <a href="#about" className="block text-sm footer-link">
                  Careers
                </a>
                <a href="#contact" className="block text-sm footer-link">
                  Contact
                </a>
              </div>
              <div className="flex gap-4 pt-2">
                <a href="mailto:hello@traceonai.com" className="footer-social">
                  <Mail className="w-5 h-5" />
                </a>
                <a href="https://github.com/traceonai" target="_blank" rel="noopener noreferrer" className="footer-social">
                  <Github className="w-5 h-5" />
                </a>
                <a href="https://linkedin.com/company/traceonai" target="_blank" rel="noopener noreferrer" className="footer-social">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="https://youtube.com/@traceonai" target="_blank" rel="noopener noreferrer" className="footer-social">
                  <Youtube className="w-5 h-5" />
                </a>
                <a href="https://traceonai.slack.com" target="_blank" rel="noopener noreferrer" className="footer-social">
                  <Slack className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t pt-8 mt-8 flex flex-col md:flex-row justify-between items-center" style={{ borderColor: 'var(--border)' }}>
            <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
              © 2025 TraceonAI. All rights reserved.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="text-sm footer-link-legal">
                Privacy Policy
              </a>
              <a href="#" className="text-sm footer-link-legal">
                Terms of Service
              </a>
              <a href="#" className="text-sm footer-link-legal">
                Security
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
