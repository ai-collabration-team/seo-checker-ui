"use client";

import { useEffect, useState } from 'react';
import { useMetaTagStore } from '../../store/metaTagStore';
import { LAST_ANALYZED_URL_KEY, useLastAnalyzedUrl } from '@/hooks/useLastAnalyzedUrl';

export const useMetaTagAnalyzer = () => {
  const [url, setUrl] = useState('');
  const { results, isLoading, error, analyze } = useMetaTagStore();
  const { url: lastUrl, saveUrl } = useLastAnalyzedUrl(LAST_ANALYZED_URL_KEY);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (url) {
      await analyze(url);
      saveUrl(url);
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
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
};

export type UseMetaTagAnalyzerReturn = ReturnType<typeof useMetaTagAnalyzer>; 