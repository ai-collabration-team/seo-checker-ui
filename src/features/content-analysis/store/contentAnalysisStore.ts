import { create } from 'zustand';
import { ContentAnalysisResult } from '../types';

interface ContentAnalysisStore {
  results: ContentAnalysisResult | null;
  isAnalyzing: boolean;
  error: string | null;
  setResults: (results: ContentAnalysisResult) => void;
  setIsAnalyzing: (isAnalyzing: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

export const useContentAnalysisStore = create<ContentAnalysisStore>((set) => ({
  results: null,
  isAnalyzing: false,
  error: null,
  setResults: (results) => set({ results, isAnalyzing: false, error: null }),
  setIsAnalyzing: (isAnalyzing) => set({ isAnalyzing }),
  setError: (error) => set({ error, isAnalyzing: false }),
  reset: () => set({ results: null, isAnalyzing: false, error: null }),
})); 