import { MetaTagAnalysisResult } from '../types';
import { validateTitle, validateDescription } from '../utils/validators';

export async function analyzeMetaTags(url: string): Promise<MetaTagAnalysisResult> {
  try {
    const html = await fetchHtml(url);
    const metaTags = parseMetaTags(html);
    
    const titleValidation = validateTitle(metaTags.title?.content || '');
    const descriptionValidation = validateDescription(metaTags.description?.content || '');

    return {
      title: {
        content: metaTags.title?.content || '',
        length: metaTags.title?.content?.length || 0,
        isValid: titleValidation.isValid,
        issues: titleValidation.issues
      },
      description: {
        content: metaTags.description?.content || '',
        length: metaTags.description?.content?.length || 0,
        isValid: descriptionValidation.isValid,
        issues: descriptionValidation.issues
      },
      keywords: {
        content: metaTags.keywords || [],
        isValid: (metaTags.keywords || []).length > 0,
        issues: (metaTags.keywords || []).length > 0 ? [] : ['No keywords found']
      },
      canonical: {
        href: metaTags.canonical || '',
        isValid: !!metaTags.canonical,
        issues: metaTags.canonical ? [] : ['No canonical URL found']
      },
      robots: {
        content: metaTags.robots || '',
        isValid: true,
        issues: []
      }
    };
  } catch (error) {
    throw new Error(`Meta tag analysis failed: ${(error as Error).message}`);
  }
}

async function fetchHtml(url: string): Promise<string> {
  try {
    // Add http:// if not present
    const formattedUrl = url.startsWith('http') ? url : `http://${url}`;
    
    const response = await fetch(formattedUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; SEOChecker/1.0;)',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.text();
  } catch (error) {
    throw new Error(`Failed to fetch URL: ${(error as Error).message}`);
  }
}

interface ParsedMetaTags {
  title?: { content: string };
  description?: { content: string };
  keywords?: string[];
  canonical?: string;
  robots?: string;
}

function parseMetaTags(html: string): ParsedMetaTags {
  // Create a DOM parser
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  const result: ParsedMetaTags = {};

  // Parse title
  const titleTag = doc.querySelector('title');
  if (titleTag) {
    result.title = { content: titleTag.textContent?.trim() || '' };
  }

  // Parse meta description
  const descriptionTag = doc.querySelector('meta[name="description"]');
  if (descriptionTag) {
    result.description = { content: descriptionTag.getAttribute('content')?.trim() || '' };
  }

  // Parse keywords
  const keywordsTag = doc.querySelector('meta[name="keywords"]');
  if (keywordsTag) {
    const keywordsContent = keywordsTag.getAttribute('content');
    result.keywords = keywordsContent ? keywordsContent.split(',').map(k => k.trim()) : [];
  }

  // Parse canonical
  const canonicalTag = doc.querySelector('link[rel="canonical"]');
  if (canonicalTag) {
    result.canonical = canonicalTag.getAttribute('href')?.trim();
  }

  // Parse robots
  const robotsTag = doc.querySelector('meta[name="robots"]');
  if (robotsTag) {
    result.robots = robotsTag.getAttribute('content')?.trim();
  }

  return result;
} 