// Site Configuration
// Global configuration for the college portfolio

export const siteConfig = {
  name: "Science Students Association",
  college: "KNUST",
  description: "The College of Science at KNUST - Ghana's premier institution for scientific excellence, innovation, and discovery.",
  url: "https://scisa-college.edu", // Update with actual domain
  
  // Contact Information
  contact: {
    email: "thescisa@gmail.com",
    phone: "+233 5000 99299",
    address: "KNUST, Kumasi, Ghana"
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
    defaultTitle: "College of Science at KNUST",
    titleTemplate: "%s | College of Science at KNUST",
    defaultDescription: "The College of Science at KNUST is Ghana's premier institution for scientific excellence, innovation, and discovery.",
    keywords: ["college", "science", "KNUST", "Ghana", "university", "academic", "departments", "students"]
  }
} as const;
