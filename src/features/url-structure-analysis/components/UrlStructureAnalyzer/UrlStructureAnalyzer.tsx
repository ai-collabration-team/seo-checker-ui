"use client";

import React from 'react';
import { useUrlStructureAnalyzer } from './UrlStructureAnalyzer.hook';
import { motion } from 'framer-motion';
import { Search, AlertCircle, CheckCircle, XCircle, Link } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { URLAnalysisResult } from '../../types';


export const UrlStructureAnalyzer: React.FC = () => {
  const {
    url,
    results,
    isLoading,
    error,
    handleSubmit,
    handleUrlChange
  } = useUrlStructureAnalyzer();

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
            <Link className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium text-slate-300">URL Structure Analyzer</span>
          </motion.div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            URL Structure <span className="text-gradient">Analysis</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Analyze your URL structure for SEO best practices and optimization opportunities
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
                  placeholder="Enter URL to analyze..."
                  className="pl-11 py-6 bg-slate-900/50 border-slate-700 text-slate-100 placeholder:text-slate-500"
                  required
                />
              </div>
              <Button 
                type="submit" 
                disabled={isLoading}
                className="h-[52px] px-8 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500"
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
            className="grid gap-8 max-w-6xl mx-auto"
          >
            <AnalysisCard
              title="SEO Friendliness"
              isValid={results.seoFriendly.isValid}
              issues={results.seoFriendly.issues}
              results={results}
            />
            <AnalysisCard
              title="URL Length"
              isValid={results.length.isValid}
              issues={results.length.issues}
              metadata={[`${results.length.value} characters`]}
              results={results}
            />
            <AnalysisCard
              title="Special Characters"
              isValid={results.specialCharacters.isValid}
              issues={results.specialCharacters.issues}
              metadata={results.specialCharacters.found.length ? [`Found: ${results.specialCharacters.found.join(', ')}`] : []}
              results={results}
            />
            <AnalysisCard
              title="URL Structure"
              isValid={results.structure.isValid}
              issues={results.structure.issues}
              metadata={[`${results.structure.segments.length} segments`]}
              results={results}
            />
          </motion.div>
        )}
      </div>
    </div>
  );
};

interface AnalysisCardProps {
  title: string;
  isValid: boolean;
  issues: string[];
  metadata?: string[];
  results?: URLAnalysisResult;
}

interface UrlSegmentProps {
  segment: string;
  index: number;
  isValid: boolean;
  issues?: string[];
}

interface UrlSegment {
  value: string;
  isValid: boolean;
  issues: string[];
}

const UrlSegment: React.FC<UrlSegmentProps> = ({ segment, index, isValid, issues = [] }) => (
  <div className="flex flex-col gap-2 p-4 rounded-lg bg-slate-900/50 border border-slate-700/50">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Badge variant="outline" className="bg-slate-800/50">
          Segment {index + 1}
        </Badge>
        <code className="text-sm text-slate-300">{segment}</code>
      </div>
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
  </div>
);

const AnalysisCard: React.FC<AnalysisCardProps> = ({
  title,
  isValid,
  issues,
  metadata = [],
  results
}) => (
  <Card className="bg-slate-800/50 border-slate-700/50 overflow-hidden">
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
              <span>Issues Found</span>
            </div>
          )}
        </Badge>
      </div>
    </CardHeader>
    <CardContent className="pt-6 space-y-4">
      {metadata.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {metadata.map((item, index) => (
            <Badge key={index} variant="outline" className="bg-slate-900/50 text-slate-300 border-slate-700">
              {item}
            </Badge>
          ))}
        </div>
      )}

      {title === "URL Structure" && results?.structure?.segments && (
        <div className="space-y-3">
          <div className="grid grid-cols-1 gap-3">
            {results.structure.segments.map((segment: string, index: number) => (
              <UrlSegment
                key={index}
                segment={segment}
                index={index}
                isValid={true}
                issues={[]}
              />
            ))}
          </div>
          <div className="pt-4 border-t border-slate-700/50">
            <h4 className="text-sm font-medium text-slate-300 mb-2">URL Structure Guidelines:</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Use hyphens (-) to separate words
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Keep URLs short and descriptive
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Use lowercase letters
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Avoid special characters and spaces
              </li>
            </ul>
          </div>
        </div>
      )}

      {issues.length > 0 && title !== "URL Structure" && (
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