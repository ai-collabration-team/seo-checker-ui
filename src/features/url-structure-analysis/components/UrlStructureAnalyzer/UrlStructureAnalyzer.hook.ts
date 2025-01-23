import { useEffect, useState } from 'react';
import { URLAnalysisResult } from '../../types';
import { checkUrlStructure } from '../../api/checkUrlStructure';
import { LAST_ANALYZED_URL_KEY, useLastAnalyzedUrl } from '@/hooks/useLastAnalyzedUrl';

export function useUrlStructureAnalyzer() {
  const [url, setUrl] = useState('');
  const [results, setResults] = useState<URLAnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { url: lastUrl, saveUrl } = useLastAnalyzedUrl(LAST_ANALYZED_URL_KEY);  

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
    setError(null);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    saveUrl(url);

    try {
      const result = await checkUrlStructure(url);
      setResults(result);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (lastUrl) {
      setUrl(lastUrl);
    }
  }, [lastUrl]);

  return {
    url,
    results,
    isLoading,
    error,
    handleSubmit,
    handleUrlChange
  };
}

export type UseUrlStructureAnalyzerReturn = ReturnType<typeof useUrlStructureAnalyzer>; 