import { META_TAG_RULES } from '../constants';

export const validateTitle = (title: string): { isValid: boolean; issues: string[] } => {
  const issues: string[] = [];
  
  if (!title) {
    issues.push('Title tag is missing');
    return { isValid: false, issues };
  }

  if (title.length < META_TAG_RULES.title.minLength) {
    issues.push(`Title is too short (${title.length} chars). Minimum length is ${META_TAG_RULES.title.minLength}`);
  }

  if (title.length > META_TAG_RULES.title.maxLength) {
    issues.push(`Title is too long (${title.length} chars). Maximum length is ${META_TAG_RULES.title.maxLength}`);
  }

  return {
    isValid: issues.length === 0,
    issues
  };
};

export const validateDescription = (description: string): { isValid: boolean; issues: string[] } => {
  const issues: string[] = [];

  if (!description) {
    issues.push('Meta description is missing');
    return { isValid: false, issues };
  }

  if (description.length < META_TAG_RULES.description.minLength) {
    issues.push(`Description is too short (${description.length} chars). Minimum length is ${META_TAG_RULES.description.minLength}`);
  }

  if (description.length > META_TAG_RULES.description.maxLength) {
    issues.push(`Description is too long (${description.length} chars). Maximum length is ${META_TAG_RULES.description.maxLength}`);
  }

  return {
    isValid: issues.length === 0,
    issues
  };
}; 