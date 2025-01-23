import { create } from 'zustand';
import { MetaTagResults } from '../types';

interface MetaTagStore {
  results: MetaTagResults | null;
  isLoading: boolean;
  error: string | null;
  analyze: (url: string) => Promise<void>;
}

export const useMetaTagStore = create<MetaTagStore>((set) => ({
  results: null,
  isLoading: false,
  error: null,
  analyze: async (url: string) => {
    try {
      set({ isLoading: true, error: null });
      
      const response = await fetch('/api/analyze-meta-tags', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to analyze meta tags');
      }

      set({ results: data.data, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to analyze meta tags',
        isLoading: false 
      });
    }
  },
})); 