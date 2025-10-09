'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Brain, 
  Zap, 
  Shield, 
  TrendingUp, 
  Users, 
  Clock, 
  CheckCircle, 
  ArrowRight,
  Play,
  Github,
  Twitter,
  Linkedin,
  Star,
  Code,
  Database,
  Network,
  Terminal,
  Activity,
  Cpu,
  HardDrive,
  Monitor,
  Sparkles,
  ChevronRight,
  MousePointer2,
  Rocket
} from 'lucide-react';

export default function LandingPage() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    
    const timer = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 3);
    }, 4000);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      clearInterval(timer);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const features = [
    {
      icon: Brain,
      title: 'Intelligent Root Cause Analysis',
      description: 'Advanced neural networks process millions of log entries to identify patterns humans miss, delivering actionable insights in real-time.',
      tech: 'Powered by transformer models and graph neural networks'
    },
    {
      icon: Network,
      title: 'Distributed System Intelligence',
      description: 'Map complex microservice interactions and trace issues across your entire infrastructure with precision.',
      tech: 'Real-time distributed tracing and correlation'
    },
    {
      icon: Cpu,
      title: 'Predictive Anomaly Detection',
      description: 'Machine learning models trained on your specific environment predict and prevent incidents before they impact users.',
      tech: 'Time-series analysis with adaptive thresholds'
    }
  ];

  const stats = [
    { value: '4.2s', label: 'Mean Detection Time' },
    { value: '99.7%', label: 'Accuracy Rate' },
    { value: '73%', label: 'MTTR Reduction' },
    { value: '∞', label: 'Scale Capacity' }
  ];

  const testimonials = [
    {
      quote: "TraceonAI's neural analysis reduced our P0 incidents by 87%. It's like having a team of senior SREs working around the clock.",
      author: "Dr. Sarah Chen",
      role: "VP of Engineering",
      company: "Vertex Systems",
      metric: "87% fewer P0 incidents"
    },
    {
      quote: "The distributed tracing capabilities are revolutionary. We can now visualize our entire microservice mesh in real-time.",
      author: "Alex Kumar",
      role: "Principal SRE",
      company: "CloudFlow",
      metric: "15min → 2min MTTR"
    },
    {
      quote: "Predictive insights caught 94% of potential outages before they happened. Our uptime went from 99.5% to 99.97%.",
      author: "Dr. Emily Rodriguez",
      role: "CTO",
      company: "Scale Dynamics",
      metric: "99.97% uptime achieved"
    }
  ];

  const techStack = [
    { name: 'Kubernetes', category: 'Orchestration' },
    { name: 'Grafana', category: 'Observability' },
    { name: 'Elasticsearch', category: 'Search' },
    { name: 'Prometheus', category: 'Metrics' },
    { name: 'Datadog', category: 'Monitoring' },
    { name: 'Splunk', category: 'Analytics' },
    { name: 'New Relic', category: 'APM' },
    { name: 'PagerDuty', category: 'Incident' }
  ];

  return (
    <div className="min-h-screen bg-gray-950 overflow-hidden">
      {/* Cursor follower effect */}
      <div 
        className="fixed w-6 h-6 rounded-full bg-cyan-400/20 pointer-events-none z-50 transition-all duration-300 ease-out"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          transform: `scale(${mousePosition.x > 0 ? 1 : 0})`,
        }}
      />

      {/* Navigation */}
      <nav className="fixed w-full z-40 bg-gray-950/90 backdrop-blur-md border-b border-gray-800/50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3 group">
              <div className="bg-gradient-to-r from-cyan-400 to-purple-400 p-2 rounded-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 animate-glow">
                <Brain className="w-6 h-6 text-gray-900" />
              </div>
              <span className="text-xl font-bold text-white transition-all duration-300 group-hover:text-cyan-400">TraceonAI</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              {['Platform', 'Research', 'Enterprise'].map((item, index) => (
                <a 
                  key={item}
                  href={`#${item.toLowerCase()}`} 
                  className="relative text-gray-300 hover:text-white transition-all duration-300 hover:scale-105 group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
              <Link 
                href="/login" 
                className="text-gray-300 hover:text-white transition-all duration-300 hover:scale-105 relative group"
              >
                Sign In
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 transition-all duration-300 group-hover:w-full" />
              </Link>
              <Link 
                href="/login" 
                className="bg-gradient-to-r from-cyan-400 to-purple-400 text-gray-900 px-6 py-2 rounded-lg hover:opacity-90 transition-all duration-300 font-medium hover:scale-105 hover:shadow-lg hover:shadow-cyan-400/25 animate-shimmer group"
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <Rocket className="w-4 h-4 transition-transform group-hover:rotate-12" />
                  <span>Get Access</span>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        {/* Multi-layer Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-purple-950/20"></div>
        
        {/* Custom Pattern Layers */}
        <div className="absolute inset-0 pattern-circuit opacity-30"></div>
        <div className="absolute inset-0 pattern-dots opacity-20"></div>
        <div className="absolute inset-0 pattern-waves opacity-10"></div>
        
        {/* Animated Geometric Shapes */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-cyan-400/10 to-purple-400/10 rounded-full animate-float animate-morphing"></div>
          <div className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-r from-purple-400/10 to-cyan-400/10 rounded-lg rotate-45 animate-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-32 left-1/4 w-16 h-16 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 rounded-full animate-float" style={{animationDelay: '4s'}}></div>
        </div>
        
        {/* Interactive Grid Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 pattern-grid animate-pulse"></div>
        </div>
        
        {/* Enhanced Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-2 h-2 bg-cyan-400 rounded-full animate-ping`}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
        
        {/* Radial Gradients with Animation */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(6,182,212,0.15),transparent_70%)] animate-pulse"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(147,51,234,0.15),transparent_70%)] animate-pulse" style={{animationDelay: '1s'}}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className={`text-center max-w-4xl mx-auto transition-all duration-1000 ${isLoaded ? 'animate-fadeInUp' : 'opacity-0'}`}>
            <div className="inline-flex items-center bg-gray-800/50 border border-gray-700 text-cyan-400 px-4 py-2 rounded-full text-sm font-medium mb-8 backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-300 hover:scale-105 group animate-shimmer">
              <Sparkles className="w-4 h-4 mr-2 animate-spin" style={{animationDuration: '3s'}} />
              <span className="group-hover:text-white transition-colors">The AI platform for intelligent systems</span>
            </div>
            
            <h1 className="text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
              <span className="inline-block animate-slideIn">Turn system chaos into</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 animate-shimmer inline-block" style={{animationDelay: '0.3s'}}>intelligent order</span>
            </h1>
            
            <p className={`text-xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto transition-all duration-800 ${isLoaded ? 'animate-fadeInUp' : 'opacity-0'}`} style={{animationDelay: '0.6s'}}>
              TraceonAI transforms complex distributed systems into comprehensible intelligence. 
              Our neural networks decode the language of your infrastructure, revealing patterns 
              that traditional monitoring cannot see.
            </p>
            
            <div className={`flex flex-col sm:flex-row gap-6 justify-center mb-16 transition-all duration-1000 ${isLoaded ? 'animate-scaleIn' : 'opacity-0'}`} style={{animationDelay: '0.9s'}}>
              <Link 
                href="/login"
                className="bg-gradient-to-r from-cyan-400 to-purple-400 text-gray-900 px-8 py-4 rounded-lg hover:opacity-90 transition-all duration-300 flex items-center justify-center space-x-2 text-lg font-medium hover:scale-105 hover:shadow-2xl hover:shadow-cyan-400/25 group animate-glow"
              >
                <span>Experience the Platform</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <button className="border border-gray-600 text-gray-300 px-8 py-4 rounded-lg hover:bg-gray-800/50 transition-all duration-300 flex items-center justify-center space-x-2 text-lg font-medium backdrop-blur-sm hover:scale-105 hover:border-cyan-400/50 group">
                <Play className="w-5 h-5 transition-transform group-hover:scale-110" />
                <span className="group-hover:text-white transition-colors">View Documentation</span>
              </button>
            </div>
            
            <div className={`flex items-center justify-center space-x-8 text-sm text-gray-400 transition-all duration-1000 ${isLoaded ? 'animate-fadeInUp' : 'opacity-0'}`} style={{animationDelay: '1.2s'}}>
              {[
                { color: 'bg-green-400', text: 'Real-time processing' },
                { color: 'bg-cyan-400', text: 'Enterprise ready' },
                { color: 'bg-purple-400', text: 'Self-improving AI' }
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-2 hover:text-white transition-colors group">
                  <div className={`w-2 h-2 ${item.color} rounded-full animate-pulse group-hover:animate-ping`} style={{animationDelay: `${index * 0.2}s`}}></div>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Stats Section */}
      <section className="py-20 relative">
        {/* Pattern Background */}
        <div className="absolute inset-0 pattern-hexagon opacity-10"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className={`text-center group transition-all duration-500 hover:scale-105 ${isLoaded ? 'animate-fadeInUp' : 'opacity-0'}`}
                style={{animationDelay: `${index * 0.2 + 1.5}s`}}
              >
                <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 hover:border-cyan-400/50 transition-all duration-300 backdrop-blur-sm group-hover:bg-gray-800/70 relative overflow-hidden">
                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="relative z-10">
                    <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-2 group-hover:scale-110 transition-transform duration-300">
                      {stat.value}
                    </div>
                    <div className="text-gray-400 text-sm font-medium group-hover:text-gray-300 transition-colors">{stat.label}</div>
                  </div>
                  
                  {/* Animated border */}
                  <div className="absolute inset-0 rounded-xl border-2 border-transparent bg-gradient-to-r from-cyan-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{padding: '1px'}}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Features Section */}
      <section id="platform" className="py-24 relative">
        {/* Circuit Board Pattern Background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,rgba(6,182,212,0.3)_60deg,transparent_120deg)] bg-[size:100px_100px]"></div>
        </div>
        
        {/* Moving Lines */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-px h-full bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent left-1/4 animate-pulse"></div>
          <div className="absolute w-px h-full bg-gradient-to-b from-transparent via-purple-400/20 to-transparent right-1/4 animate-pulse delay-1000"></div>
          <div className="absolute h-px w-full bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent top-1/3 animate-pulse delay-500"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-20 transition-all duration-1000 ${isLoaded ? 'animate-fadeInUp' : 'opacity-0'}`} style={{animationDelay: '2s'}}>
            <h2 className="text-5xl font-bold text-white mb-6">
              The intelligence infrastructure for
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 animate-shimmer"> next-generation systems</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
              Our neural architecture transforms raw telemetry into actionable intelligence, 
              delivering insights that scale with the complexity of modern distributed systems.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className={`group relative bg-gray-800/30 border rounded-2xl p-8 transition-all duration-500 cursor-pointer backdrop-blur-sm hover:scale-105 ${
                  activeFeature === index 
                    ? 'border-cyan-400/50 bg-gray-800/50 shadow-xl shadow-cyan-400/10' 
                    : 'border-gray-700 hover:border-gray-600'
                } ${isLoaded ? 'animate-scaleIn' : 'opacity-0'}`}
                style={{animationDelay: `${2.3 + index * 0.2}s`}}
                onMouseEnter={() => setActiveFeature(index)}
              >
                {/* Animated background overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-purple-400/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                
                {/* Glowing border effect */}
                <div className={`absolute inset-0 rounded-2xl transition-all duration-500 ${activeFeature === index ? 'animate-glow' : ''}`}></div>
                
                <div className="relative z-10">
                  <div className="bg-gradient-to-r from-cyan-400/20 to-purple-400/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300 animate-morphing">
                    <feature.icon className="w-8 h-8 text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-400 mb-6 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                    {feature.description}
                  </p>
                  
                  <div className="text-sm text-cyan-400 font-mono bg-gray-900/50 px-3 py-2 rounded-lg border border-gray-700 group-hover:border-cyan-400/30 transition-all duration-300 hover:bg-gray-900/70">
                    <MousePointer2 className="w-3 h-3 inline mr-2" />
                    {feature.tech}
                  </div>
                </div>
                
                {/* Interactive particles */}
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping"
                      style={{
                        top: `${20 + Math.random() * 60}%`,
                        left: `${20 + Math.random() * 60}%`,
                        animationDelay: `${i * 0.3}s`
                      }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Integration */}
      <section className="py-20 bg-gray-900/50 relative">
        {/* Dot Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_2px_2px,rgba(6,182,212,0.5)_1px,transparent_0)] bg-[size:30px_30px]"></div>
        </div>
        
        {/* Scanning Lines */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent animate-pulse delay-1000"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Native integration with your stack
          </h2>
          <p className="text-xl text-gray-400 mb-16 max-w-3xl mx-auto">
            TraceonAI seamlessly connects with your existing infrastructure, 
            requiring zero changes to your current observability pipeline.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {techStack.map((tech, index) => (
              <div key={index} className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 hover:border-cyan-400/30 transition-all duration-300 group backdrop-blur-sm">
                <div className="text-lg font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                  {tech.name}
                </div>
                <div className="text-sm text-gray-500 font-mono">{tech.category}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Research & Testimonials */}
      <section id="research" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-white mb-6">
              Proven results from leading
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400"> engineering organizations</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Our AI models are trained on petabytes of real-world infrastructure data, 
              delivering measurable improvements across critical reliability metrics.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-800/30 border border-gray-700 rounded-2xl p-8 backdrop-blur-sm hover:border-cyan-400/30 transition-all duration-300 group">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-purple-400/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative">
                  <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-r from-cyan-400 to-purple-400 text-gray-900 px-3 py-1 rounded-full text-sm font-bold">
                      {testimonial.metric}
                    </div>
                  </div>
                  
                  <blockquote className="text-gray-300 mb-8 italic text-lg leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>
                  
                  <div className="border-t border-gray-700 pt-6">
                    <div className="font-bold text-white text-lg">{testimonial.author}</div>
                    <div className="text-cyan-400 font-medium">{testimonial.role}</div>
                    <div className="text-gray-500 text-sm font-mono">{testimonial.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="enterprise" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/20 via-purple-600/20 to-cyan-600/20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.15),transparent_70%)]"></div>
        
        {/* Particle Field */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/6 w-1 h-1 bg-cyan-400 rounded-full animate-ping delay-300"></div>
          <div className="absolute top-1/2 left-1/4 w-0.5 h-0.5 bg-purple-400 rounded-full animate-pulse delay-700"></div>
          <div className="absolute top-1/3 right-1/6 w-1.5 h-1.5 bg-cyan-300 rounded-full animate-ping delay-1100"></div>
          <div className="absolute bottom-1/4 left-1/3 w-0.5 h-0.5 bg-purple-300 rounded-full animate-pulse delay-1500"></div>
          <div className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-cyan-500 rounded-full animate-ping delay-1900"></div>
          <div className="absolute top-2/3 right-1/3 w-0.5 h-0.5 bg-purple-500 rounded-full animate-pulse delay-2300"></div>
        </div>
        
        {/* Neural Network Lines */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 1000 400">
            <defs>
              <linearGradient id="line1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="transparent" />
                <stop offset="50%" stopColor="rgb(6,182,212)" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
            <path d="M0,200 Q250,100 500,200 T1000,200" stroke="url(#line1)" strokeWidth="1" fill="none" className="animate-pulse" />
            <path d="M0,150 Q250,250 500,150 T1000,150" stroke="url(#line1)" strokeWidth="1" fill="none" className="animate-pulse delay-500" />
          </svg>
        </div>
        
        <div className="max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative">
          <h2 className="text-6xl font-bold text-white mb-8 leading-tight">
            Ready to transform your
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400"> infrastructure intelligence?</span>
          </h2>
          
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Join the next generation of engineering teams using AI to build more reliable, 
            intelligent systems. Experience the future of observability.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <Link 
              href="/login"
              className="bg-gradient-to-r from-cyan-400 to-purple-400 text-gray-900 px-10 py-5 rounded-xl hover:opacity-90 transition-opacity inline-flex items-center space-x-3 text-xl font-bold"
            >
              <span>Experience TraceonAI</span>
              <ChevronRight className="w-6 h-6" />
            </Link>
            <button className="border border-gray-500 text-gray-300 px-10 py-5 rounded-xl hover:bg-gray-800/50 transition-colors inline-flex items-center space-x-3 text-xl font-medium backdrop-blur-sm">
              <Code className="w-6 h-6" />
              <span>View API Docs</span>
            </button>
          </div>
          
          <div className="flex items-center justify-center space-x-12 text-gray-400">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="font-mono text-sm">Real-time deployment</span>
            </div>
            <div className="flex items-center space-x-3">
              <Shield className="w-5 h-5 text-cyan-400" />
              <span className="font-mono text-sm">Enterprise security</span>
            </div>
            <div className="flex items-center space-x-3">
              <Activity className="w-5 h-5 text-purple-400" />
              <span className="font-mono text-sm">99.99% SLA</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-gradient-to-r from-cyan-400 to-purple-400 p-2 rounded-lg">
                  <Brain className="w-6 h-6 text-gray-900" />
                </div>
                <span className="text-xl font-bold text-white">TraceonAI</span>
              </div>
              <p className="text-gray-400 mb-8 max-w-md leading-relaxed">
                The AI platform that transforms complex distributed systems into 
                comprehensible intelligence for next-generation engineering teams.
              </p>
              <div className="flex space-x-6">
                <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  <Twitter className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  <Github className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  <Linkedin className="w-6 h-6" />
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="font-bold text-white mb-6">Platform</h3>
              <ul className="space-y-4 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Neural Analysis</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Distributed Tracing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Predictive Models</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Reference</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-white mb-6">Research</h3>
              <ul className="space-y-4 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">ML Papers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Case Studies</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Benchmarks</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Open Source</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-white mb-6">Enterprise</h3>
              <ul className="space-y-4 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Compliance</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Sales</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-500 font-mono text-sm">
              © 2025 TraceonAI. Building the future of intelligent systems.
            </p>
            <div className="flex space-x-8 text-gray-500 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors text-sm">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors text-sm">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors text-sm">Security</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
