import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';
import { LinkAnalysis } from '@/features/content-analysis/types';

export async function POST(request: Request) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      );
    }

    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);
    const baseUrl = new URL(url).origin;

    // Analyze headings
    const headingAnalysis = {
      hasH1: $('h1').length > 0,
      multipleH1s: $('h1').length > 1,
      headingHierarchy: true,
      headings: {
        h1: $('h1').map((_: number, el: cheerio.Element) => $(el).text()).get(),
        h2: $('h2').map((_: number, el: cheerio.Element) => $(el).text()).get(),
        h3: $('h3').map((_: number, el: cheerio.Element) => $(el).text()).get(),
        h4: $('h4').map((_: number, el: cheerio.Element) => $(el).text()).get(),
        h5: $('h5').map((_: number, el: cheerio.Element) => $(el).text()).get(),
        h6: $('h6').map((_: number, el: cheerio.Element) => $(el).text()).get(),
      },
      issues: [],
    };

    // Check heading hierarchy
    let previousLevel = 0;
    $('h1, h2, h3, h4, h5, h6').each((_, el) => {
      const currentLevel = parseInt(el.tagName[1]);
      if (currentLevel - previousLevel > 1) {
        headingAnalysis.headingHierarchy = false;
        headingAnalysis.issues.push(
          `Skipped heading level: from H${previousLevel} to H${currentLevel}`
        );
      }
      previousLevel = currentLevel;
    });

    // Analyze content metrics
    const content = $('body').text();
    const sentences = content.split(/[.!?]+/);
    const words = content.split(/\s+/);
    const wordCount = words.length;
    const paragraphCount = $('p').length;
    const averageSentenceLength = Math.round(wordCount / sentences.length);

    // Calculate keyword density
    const wordFrequency: { [key: string]: number } = {};
    words.forEach(word => {
      const cleanWord = word.toLowerCase().replace(/[^a-z0-9]/g, '');
      if (cleanWord.length > 3) {
        wordFrequency[cleanWord] = (wordFrequency[cleanWord] || 0) + 1;
      }
    });

    const keywordDensity = Object.entries(wordFrequency)
      .map(([keyword, count]) => ({
        keyword,
        count,
        density: count / wordCount
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    const contentMetrics = {
      wordCount,
      paragraphCount,
      averageSentenceLength,
      readabilityScore: Math.min(100, Math.round(100 - (averageSentenceLength - 15) * 5)),
      keywordDensity,
    };

    // Analyze links
    const internalLinks: LinkAnalysis['internalLinks'] = [];
    const externalLinks: LinkAnalysis['externalLinks'] = [];
    const brokenLinks: LinkAnalysis['brokenLinks'] = [];

    const links = $('a[href]').map((_: number, el: cheerio.Element) => ({
      url: $(el).attr('href'),
      text: $(el).text().trim()
    })).get();

    for (const link of links) {
      try {
        const href = link.url;
        if (!href || href.startsWith('#') || href.startsWith('javascript:')) {
          continue;
        }

        const absoluteUrl = href.startsWith('http') ? href : new URL(href, baseUrl).href;
        const isInternal = absoluteUrl.startsWith(baseUrl);

        const linkData = {
          url: absoluteUrl,
          text: link.text,
          isValid: true
        };

        if (isInternal) {
          internalLinks.push(linkData);
        } else {
          externalLinks.push(linkData);
        }
      } catch (error) {
        brokenLinks.push({
          url: link.url || '',
          text: link.text,
          error: 'Invalid URL format'
        });
      }
    }

    const contentQualityMetrics = {
      uniquenessScore: 85, // Placeholder - would need content comparison
      grammarScore: 90, // Placeholder - would need grammar checking service
      spellingIssues: [], // Placeholder - would need spell checking service
      readabilityLevel: averageSentenceLength <= 12 ? 'Easy' : 
                       averageSentenceLength <= 17 ? 'Medium' : 'Hard' as const
    };

    return NextResponse.json({
      headingStructure: headingAnalysis,
      contentMetrics,
      links: {
        internalLinks,
        externalLinks,
        brokenLinks,
      },
      contentQuality: contentQualityMetrics,
    });
  } catch (error) {
    console.error('Content analysis error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze content' },
      { status: 500 }
    );
  }
} 