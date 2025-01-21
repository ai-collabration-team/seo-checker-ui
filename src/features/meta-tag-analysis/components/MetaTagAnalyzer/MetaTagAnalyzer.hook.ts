"use client";

import { useState } from 'react';
import { useMetaTagStore } from '../../store/metaTagStore';

export const useMetaTagAnalyzer = () => {
  const [url, setUrl] = useState('');
  const { results, isLoading, error, analyze } = useMetaTagStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (url) {
      await analyze(url);
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

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