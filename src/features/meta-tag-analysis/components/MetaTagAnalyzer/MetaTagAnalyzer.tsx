"use client";

import React from 'react';
import { useMetaTagAnalyzer } from './MetaTagAnalyzer.hook';
import { motion } from 'framer-motion';
import { Search, AlertCircle, CheckCircle, XCircle, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export const MetaTagAnalyzer: React.FC = () => {
  const {
    url,
    results,
    isLoading,
    error,
    handleSubmit,
    handleUrlChange
  } = useMetaTagAnalyzer();

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
            <Sparkles className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-medium text-slate-300">SEO Analysis Tool</span>
          </motion.div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Meta Tag <span className="text-gradient">Analyzer</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Optimize your website&apos;s SEO with our advanced meta tag analysis tool
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
                  onChange={handleUrlChange}
                  placeholder="Enter website URL to analyze..."
                  className="pl-11 py-6 bg-slate-900/50 border-slate-700 text-slate-100 placeholder:text-slate-500"
                  required
                />
              </div>
              <Button 
                type="submit" 
                disabled={isLoading}
                className="h-[52px] px-8 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500"
              >
                {isLoading ? 'Analyzing...' : 'Analyze'}
              </Button>
            </form>
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
        {results && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto"
          >
            <MetaTagCard
              title="Title Tag"
              content={results.title.content}
              length={results.title.length}
              isValid={results.title.isValid}
              issues={results.title.issues}
            />
            <MetaTagCard
              title="Meta Description"
              content={results.description.content}
              length={results.description.length}
              isValid={results.description.isValid}
              issues={results.description.issues}
            />
          </motion.div>
        )}
      </div>
    </div>
  );
};

interface MetaTagCardProps {
  title: string;
  content: string;
  length: number;
  isValid: boolean;
  issues: string[];
}

const MetaTagCard: React.FC<MetaTagCardProps> = ({
  title,
  content,
  length,
  isValid,
  issues
}) => (
  <Card className="bg-slate-800/50 border-slate-700/50 overflow-hidden group">
    <CardHeader className="border-b border-slate-700/50">
      <div className="flex items-center justify-between">
        <CardTitle className="text-slate-100">{title}</CardTitle>
        <Badge variant={isValid ? "success" : "destructive"} className="h-6">
          {isValid ? (
            <div className="flex items-center gap-1">
              <CheckCircle className="w-3 h-3" />
              <span>Valid</span>
            </div>
          ) : (
            <div className="flex items-center gap-1">
              <XCircle className="w-3 h-3" />
              <span>Invalid</span>
            </div>
          )}
        </Badge>
      </div>
    </CardHeader>
    <CardContent className="pt-6 space-y-4">
      <Dialog>
        <DialogTrigger asChild>
          <div className="bg-slate-900/50 p-4 rounded-lg cursor-pointer hover:bg-slate-900/70 transition-colors">
            <p className="text-slate-300 font-mono text-sm break-words line-clamp-3">
              {content || 'No content found'}
            </p>
          </div>
        </DialogTrigger>
        <DialogContent className="bg-slate-800 border-slate-700">
          <DialogHeader>
            <DialogTitle>Full Content</DialogTitle>
          </DialogHeader>
          <div className="bg-slate-900/50 p-4 rounded-lg">
            <p className="text-slate-300 font-mono text-sm break-words">
              {content || 'No content found'}
            </p>
          </div>
        </DialogContent>
      </Dialog>

      <div className="flex flex-wrap gap-2">
        <Badge variant="outline" className="bg-slate-900/50 text-slate-300 border-slate-700">
          {length} characters
        </Badge>
      </div>

      {issues.length > 0 && (
        <div className="space-y-2">
          {issues.map((issue, i) => (
            <Alert key={i} variant="destructive" className="bg-red-900/20 border-red-900/50">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{issue}</AlertDescription>
            </Alert>
          ))}
        </div>
      )}
    </CardContent>
  </Card>
); 