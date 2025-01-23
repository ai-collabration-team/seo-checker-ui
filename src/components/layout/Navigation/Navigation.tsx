"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Tag, 
  Link as LinkIcon, 
  FileText, 
  Image, 
  Gauge, 
  Smartphone, 
  Shield, 
  ActivityIcon,
  Bot
} from 'lucide-react';

const features = [
  {
    name: 'Meta Tags',
    href: '/meta-tags',
    icon: Tag,
    color: 'text-violet-500',
    bgColor: 'bg-violet-500/10',
    description: 'Analyze meta tags for SEO optimization'
  },
  {
    name: 'URL Structure',
    href: '/url-structure',
    icon: LinkIcon,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    description: 'Check URL structure and optimization'
  },
  {
    name: 'Content Analysis',
    href: '/content',
    icon: FileText,
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
    description: 'Analyze content structure and quality'
  },
  {
    name: 'Image Optimization',
    href: '/images',
    icon: Image,
    color: 'text-pink-500',
    bgColor: 'bg-pink-500/10',
    description: 'Check image optimization and alt tags'
  },
  {
    name: 'Performance',
    href: '/performance',
    icon: Gauge,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/10',
    description: 'Analyze page load and performance'
  },
  {
    name: 'Mobile Friendly',
    href: '/mobile',
    icon: Smartphone,
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
    description: 'Check mobile responsiveness'
  },
  {
    name: 'Security',
    href: '/security',
    icon: Shield,
    color: 'text-red-500',
    bgColor: 'bg-red-500/10',
    description: 'Analyze security headers and SSL'
  },
  {
    name: 'Sitemap',
    href: '/sitemap',
    icon: ActivityIcon,
    color: 'text-cyan-500',
    bgColor: 'bg-cyan-500/10',
    description: 'Check XML sitemap structure'
  },
  {
    name: 'Robots.txt',
    href: '/robots',
    icon: Bot,
    color: 'text-slate-500',
    bgColor: 'bg-slate-500/10',
    description: 'Analyze robots.txt configuration'
  }
];

export const Navigation: React.FC = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 h-screen w-80 bg-slate-900 border-r border-slate-800 p-6 overflow-y-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">SEO Checker</h1>
        <p className="text-slate-400 text-sm">Technical SEO Analysis Tool</p>
      </div>
      
      <div className="space-y-2">
        {features.map((feature) => {
          const isActive = pathname === feature.href;
          const Icon = feature.icon;
          
          return (
            <Link key={feature.href} href={feature.href}>
              <div
                className={`relative p-4 rounded-lg transition-all duration-200 ${
                  isActive ? feature.bgColor : 'hover:bg-slate-800/50'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeFeature"
                    className="absolute inset-0 rounded-lg bg-gradient-to-r from-slate-800/50 to-transparent"
                    initial={false}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <div className="relative flex items-center gap-4">
                  <div className={`p-2 rounded-md ${feature.bgColor}`}>
                    <Icon className={`w-5 h-5 ${feature.color}`} />
                  </div>
                  <div>
                    <div className="text-slate-200 font-medium">{feature.name}</div>
                    <div className="text-slate-400 text-sm">{feature.description}</div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}; 