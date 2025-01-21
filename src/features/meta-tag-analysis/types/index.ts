export interface MetaTag {
  name?: string;
  property?: string;
  content?: string;
  charset?: string;
}

export interface MetaTagAnalysisResult {
  title: {
    content: string;
    length: number;
    isValid: boolean;
    issues: string[];
  };
  description: {
    content: string;
    length: number;
    isValid: boolean;
    issues: string[];
  };
  keywords: {
    content: string[];
    isValid: boolean;
    issues: string[];
  };
  canonical: {
    href: string;
    isValid: boolean;
    issues: string[];
  };
  robots: {
    content: string;
    isValid: boolean;
    issues: string[];
  };
} 