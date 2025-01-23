import { URLAnalysisResult } from '../types';

export async function checkUrlStructure(url: string): Promise<URLAnalysisResult> {
  try {
    const parsedUrl = new URL(url);
    
    return {
      seoFriendly: checkSEOFriendliness(parsedUrl),
      length: checkUrlLength(parsedUrl),
      specialCharacters: checkSpecialCharacters(parsedUrl),
      structure: checkUrlPathStructure(parsedUrl)
    };
  } catch (error) {
    throw new Error(`URL analysis failed: ${(error as Error).message}`);
  }
}

function checkSEOFriendliness(url: URL): URLAnalysisResult['seoFriendly'] {
  const issues: string[] = [];
  
  // Check for uppercase letters
  if (/[A-Z]/.test(url.pathname)) {
    issues.push('URL contains uppercase letters');
  }

  // Check for multiple consecutive hyphens
  if (/--/.test(url.pathname)) {
    issues.push('URL contains consecutive hyphens');
  }

  // Check for trailing slash consistency
  if (url.pathname !== '/' && url.pathname.endsWith('/')) {
    issues.push('URL has trailing slash');
  }

  return {
    isValid: issues.length === 0,
    issues
  };
}

function checkUrlLength(url: URL): URLAnalysisResult['length'] {
  const fullUrl = url.toString();
  const issues: string[] = [];
  
  if (fullUrl.length > 75) {
    issues.push('URL is longer than recommended 75 characters');
  }

  return {
    value: fullUrl.length,
    isValid: issues.length === 0,
    issues
  };
}

function checkSpecialCharacters(url: URL): URLAnalysisResult['specialCharacters'] {
  const specialChars = url.pathname.match(/[^a-zA-Z0-9-_/]/g) || [];
  const issues: string[] = [];

  if (specialChars.length > 0) {
    issues.push('URL contains special characters that should be avoided');
  }

  return {
    found: [...new Set(specialChars)],
    isValid: issues.length === 0,
    issues
  };
}

function checkUrlPathStructure(url: URL): URLAnalysisResult['structure'] {
  const segments = url.pathname.split('/').filter(Boolean);
  const issues: string[] = [];

  // Check segment length
  segments.forEach(segment => {
    if (segment.length > 30) {
      issues.push(`Segment "${segment}" is too long (over 30 characters)`);
    }
  });

  // Check nesting depth
  if (segments.length > 4) {
    issues.push('URL structure is too deep (more than 4 levels)');
  }

  return {
    segments,
    isValid: issues.length === 0,
    issues
  };
} 