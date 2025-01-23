"use client";

import React from 'react';
import { useContentAnalyzer } from './ContentAnalyzer.hook';
import { motion } from 'framer-motion';
import { Search, AlertCircle, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { HeadingAnalysisResult } from '../HeadingAnalysisResult/HeadingAnalysisResult';
import { ContentMetricsResult } from '../ContentMetricsResult/ContentMetricsResult';
import { LinkAnalysisResult } from '../LinkAnalysisResult/LinkAnalysisResult';
import { ContentQualityResult } from '../ContentQualityResult/ContentQualityResult';

export const ContentAnalyzer: React.FC = () => {
  const {
    url,
    setUrl,
    lastAnalyzedUrl,
    results,
    isAnalyzing,
    error,
    analyzeContent,
    resetAnalysis
  } = useContentAnalyzer();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url) {
      analyzeContent(url);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700/50 mb-6"
          >
            <FileText className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium text-slate-300">Content Analyzer</span>
          </motion.div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Content <span className="text-gradient">Analysis</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Analyze your content for SEO best practices and optimization opportunities
          </p>
        </div>

        {/* Search Form */}
        <Card className="max-w-3xl mx-auto mb-12 bg-slate-800/50 border-slate-700/50">
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Enter URL to analyze content..."
                  className="pl-11 py-6 bg-slate-900/50 border-slate-700 text-slate-100 placeholder:text-slate-500"
                  required
                />
              </div>
              <Button 
                type="submit" 
                disabled={isAnalyzing}
                className="h-[52px] px-8 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500"
              >
                {isAnalyzing ? 'Analyzing...' : 'Analyze'}
              </Button>
            </form>

            {lastAnalyzedUrl && (
              <p className="mt-3 text-sm text-slate-400">
                Last analyzed: {lastAnalyzedUrl}
                <Button
                  variant="link"
                  className="px-2 h-auto text-blue-400 hover:text-blue-300"
                  onClick={() => setUrl(lastAnalyzedUrl)}
                >
                  Analyze again
                </Button>
              </p>
            )}
          </CardContent>
        </Card>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-3xl mx-auto mb-8"
          >
            <Alert variant="destructive" className="bg-red-900/20 border-red-900/50">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </motion.div>
        )}

        {/* Results */}
        {results && !isAnalyzing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid gap-8 max-w-6xl mx-auto"
          >
            <div className="flex justify-end">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={resetAnalysis}
                className="bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-800"
              >
                Clear Results
              </Button>
            </div>

            <Card className="bg-slate-800/50 border-slate-700/50 shadow-lg">
              <CardHeader className="border-b border-slate-700/50">
                <CardTitle className="text-slate-100">Heading Structure</CardTitle>
              </CardHeader>
              <CardContent className="bg-slate-900/40">
                <HeadingAnalysisResult analysis={results.headingStructure} />
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700/50 shadow-lg">
              <CardHeader className="border-b border-slate-700/50">
                <CardTitle className="text-slate-100">Content Metrics</CardTitle>
              </CardHeader>
              <CardContent className="bg-slate-900/40">
                <ContentMetricsResult metrics={results.contentMetrics} />
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700/50 shadow-lg">
              <CardHeader className="border-b border-slate-700/50">
                <CardTitle className="text-slate-100">Link Analysis</CardTitle>
              </CardHeader>
              <CardContent className="bg-slate-900/40">
                <LinkAnalysisResult analysis={results.links} />
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700/50 shadow-lg">
              <CardHeader className="border-b border-slate-700/50">
                <CardTitle className="text-slate-100">Content Quality</CardTitle>
              </CardHeader>
              <CardContent className="bg-slate-900/40">
                <ContentQualityResult metrics={results.contentQuality} />
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Loading State */}
        {isAnalyzing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-6xl mx-auto"
          >
            <Card className="bg-slate-800/50 border-slate-700/50 shadow-lg">
              <CardHeader className="border-b border-slate-700/50">
                <CardTitle className="text-slate-100">Analyzing Content...</CardTitle>
              </CardHeader>
              <CardContent className="bg-slate-900/40">
                <div className="h-[200px] w-full rounded-lg animate-pulse bg-slate-800/50" />
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}; 