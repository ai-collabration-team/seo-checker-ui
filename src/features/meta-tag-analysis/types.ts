export interface MetaTag {
  name: string | null;
  content: string | null;
}

export interface MetaTagIssue {
  content: string;
  length: number;
  isValid: boolean;
  issues: string[];
}

export interface MetaTagResults {
  title: MetaTagIssue;
  description: MetaTagIssue;
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