export interface ContentAnalysisResult {
  headingStructure: HeadingAnalysis;
  contentMetrics: ContentMetrics;
  links: LinkAnalysis;
  contentQuality: ContentQualityMetrics;
}

export interface HeadingAnalysis {
  hasH1: boolean;
  multipleH1s: boolean;
  headingHierarchy: boolean;
  headings: {
    h1: string[];
    h2: string[];
    h3: string[];
    h4: string[];
    h5: string[];
    h6: string[];
  };
  issues: string[];
}

export interface ContentMetrics {
  wordCount: number;
  paragraphCount: number;
  averageSentenceLength: number;
  readabilityScore: number;
  keywordDensity: {
    keyword: string;
    density: number;
    count: number;
  }[];
}

export interface LinkAnalysis {
  internalLinks: {
    url: string;
    text: string;
    isValid: boolean;
  }[];
  externalLinks: {
    url: string;
    text: string;
    isValid: boolean;
  }[];
  brokenLinks: {
    url: string;
    text: string;
    error: string;
  }[];
}

export interface ContentQualityMetrics {
  uniquenessScore: number;
  grammarScore: number;
  spellingIssues: string[];
  readabilityLevel: 'Easy' | 'Medium' | 'Hard';
} 