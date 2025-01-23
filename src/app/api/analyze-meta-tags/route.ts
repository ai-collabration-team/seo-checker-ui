import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { url } = await request.json();
    
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; SEOChecker/1.0;)',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }

    const html = await response.text();
    
    // Extract meta tags from HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    function validateMetaTags(doc: Document) {
      const title = doc.querySelector('title')?.textContent || '';
      const description = doc.querySelector('meta[name="description"]')?.getAttribute('content') || '';
      const canonical = doc.querySelector('link[rel="canonical"]')?.getAttribute('href') || '';
      const robots = doc.querySelector('meta[name="robots"]')?.getAttribute('content') || '';

      return {
        title: {
          content: title,
          length: title.length,
          isValid: title.length > 0 && title.length <= 60,
          issues: title.length === 0 ? ['Missing title tag'] : 
                 title.length > 60 ? ['Title too long'] : []
        },
        description: {
          content: description,
          length: description.length,
          isValid: description.length > 0 && description.length <= 160,
          issues: description.length === 0 ? ['Missing meta description'] : 
                 description.length > 160 ? ['Description too long'] : []
        },
        canonical: {
          href: canonical,
          isValid: Boolean(canonical),
          issues: !canonical ? ['Missing canonical URL'] : []
        },
        robots: {
          content: robots,
          isValid: Boolean(robots),
          issues: !robots ? ['Missing robots meta tag'] : []
        }
      };
    }

    return NextResponse.json({ 
      success: true,
      data: validateMetaTags(doc)
    });

  } catch (error) {
    console.error('Error analyzing meta tags:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to analyze meta tags' 
      },
      { status: 500 }
    );
  }
} 