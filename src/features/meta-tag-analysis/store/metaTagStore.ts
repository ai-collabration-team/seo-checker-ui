import { create } from 'zustand';
import { MetaTagAnalysisResult } from '../types';
import { analyzeMetaTags } from '../api/checkMetaTags';

interface MetaTagStore {
  results: MetaTagAnalysisResult | null;
  isLoading: boolean;
  error: string | null;
  analyze: (url: string) => Promise<void>;
}

export const useMetaTagStore = create<MetaTagStore>((set: (state: Partial<MetaTagStore>) => void) => ({
  results: null,
  isLoading: false,
  error: null,
  analyze: async (url: string) => {
    try {
      set({ isLoading: true, error: null });
      const results = await analyzeMetaTags(url);
      set({ results, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  }
})); 