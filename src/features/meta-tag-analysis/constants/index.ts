export const META_TAG_RULES = {
  title: {
    minLength: 30,
    maxLength: 60,
    required: true
  },
  description: {
    minLength: 120,
    maxLength: 160,
    required: true
  },
  keywords: {
    maxCount: 10,
    required: false
  },
  canonical: {
    required: true
  },
  robots: {
    validValues: ['index', 'noindex', 'follow', 'nofollow', 'none', 'all'],
    required: false
  }
}; 