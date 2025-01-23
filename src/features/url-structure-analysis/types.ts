export interface URLAnalysisResult {
  seoFriendly: {
    isValid: boolean;
    issues: string[];
  };
  length: {
    value: number;
    isValid: boolean;
    issues: string[];
  };
  specialCharacters: {
    found: string[];
    isValid: boolean;
    issues: string[];
  };
  structure: {
    segments: string[];
    isValid: boolean;
    issues: string[];
  };
}

export interface URLValidationResponse {
  url: string;
  analysis: URLAnalysisResult;
} 