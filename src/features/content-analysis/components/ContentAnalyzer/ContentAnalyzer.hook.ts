"use client";

import { useState, useCallback } from 'react';
import { useContentAnalysisStore } from '../../store/contentAnalysisStore';
import { ContentAnalysisResult } from '../../types';
import { useLastAnalyzedUrl, LAST_ANALYZED_URL_KEY } from '@/hooks/useLastAnalyzedUrl';

export const useContentAnalyzer = () => {
  const [url, setUrl] = useState('');
  const { url: lastUrl, saveUrl } = useLastAnalyzedUrl(LAST_ANALYZED_URL_KEY);
  const { results, isAnalyzing, error, setResults, setIsAnalyzing, setError } =
    useContentAnalysisStore();

  const validateUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const analyzeContent = useCallback(async (targetUrl: string) => {
    if (!validateUrl(targetUrl)) {
      setError('Please enter a valid URL');
      return;
    }

    try {
      setIsAnalyzing(true);
      setError(null);

      const response = await fetch('/api/analyze-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: targetUrl }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to analyze content');
      }

      const data: ContentAnalysisResult = await response.json();
      setResults(data);
      saveUrl(targetUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while analyzing content');
    } finally {
      setIsAnalyzing(false);
    }
  }, [setIsAnalyzing, setError, setResults, saveUrl]);

  const resetAnalysis = useCallback(() => {
    setResults(null);
    setError(null);
    setIsAnalyzing(false);
    setUrl('');
  }, [setResults, setError, setIsAnalyzing]);

  return {
    url,
    setUrl,
    lastAnalyzedUrl: lastUrl,
    results,
    isAnalyzing,
    error,
    analyzeContent,
    resetAnalysis,
  };
};

export type UseContentAnalyzerReturn = ReturnType<typeof useContentAnalyzer>; 