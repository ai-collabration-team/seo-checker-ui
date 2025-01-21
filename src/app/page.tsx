import { MetaTagAnalyzer } from '@/features/meta-tag-analysis/components/MetaTagAnalyzer/MetaTagAnalyzer';
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Star, Zap, Shield } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700/50 mb-6">
            <Sparkles className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-medium text-slate-300">Professional SEO Tools</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Boost Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-600">SEO Performance</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-8">
            Analyze and optimize your website&apos;s meta tags for better search engine rankings and increased visibility
          </p>
          
          <div className="flex justify-center gap-4 mb-12">
            <Button className="h-12 px-6 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500">
              Get Started Free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" className="h-12 px-6 bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-800">
              View Demo
            </Button>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
            {[
              {
                icon: <Zap className="w-5 h-5 text-yellow-500" />,
                title: "Instant Analysis",
                description: "Get immediate insights about your meta tags"
              },
              {
                icon: <Shield className="w-5 h-5 text-emerald-500" />,
                title: "SEO Best Practices",
                description: "Follow current SEO standards and guidelines"
              },
              {
                icon: <Star className="w-5 h-5 text-purple-500" />,
                title: "Actionable Tips",
                description: "Receive practical suggestions for improvement"
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="p-6 rounded-lg bg-slate-800/50 border border-slate-700/50"
              >
                <div className="rounded-full w-10 h-10 bg-slate-900/50 flex items-center justify-center mb-4 mx-auto">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Main Tool Section */}
        <div className="bg-slate-800/30 rounded-xl border border-slate-700/50 p-6 shadow-xl">
          <MetaTagAnalyzer />
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-sm text-slate-500 border-t border-slate-800 pt-8">
          © {new Date().getFullYear()} SEO Meta Tag Analyzer. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
