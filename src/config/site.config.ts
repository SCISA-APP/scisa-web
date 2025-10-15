// Site Configuration
// Global configuration for the college portfolio

export const siteConfig = {
  name: "SCISA College",
  description: "Official portfolio website showcasing our departments, news, executives, and achievements.",
  url: "https://scisa-college.edu", // Update with actual domain
  
  // Contact Information
  contact: {
    email: "info@scisa-college.edu",
    phone: "+1 (555) 123-4567",
    address: "123 College Street, Education City, EC 12345"
  },
  
  // Social Media Links
  social: {
    facebook: "https://facebook.com/scisacollege",
    twitter: "https://twitter.com/scisacollege",
    instagram: "https://instagram.com/scisacollege",
    linkedin: "https://linkedin.com/company/scisacollege"
  },
  
  // SEO Defaults
  seo: {
    defaultTitle: "SCISA College - Excellence in Education",
    titleTemplate: "%s | SCISA College",
    defaultDescription: "Discover academic excellence at SCISA College. Explore our departments, latest news, and meet our executive team.",
    keywords: ["college", "education", "university", "academic", "departments", "students"]
  }
} as const;
