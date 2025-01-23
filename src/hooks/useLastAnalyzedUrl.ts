import { useState } from 'react';

export const LAST_ANALYZED_URL_KEY = 'lastAnalyzedUrl';

export const useLastAnalyzedUrl = (key: string) => {
  const [url, setUrl] = useState(() => localStorage.getItem(key) || '');

  const saveUrl = (newUrl: string) => {
    localStorage.setItem(key, newUrl);
    setUrl(newUrl);
  };

  return { url, saveUrl };
};