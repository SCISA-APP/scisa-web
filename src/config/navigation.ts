// Navigation Configuration
// Define navigation structure for the website

export interface NavItem {
  name: string;
  href: string;
  description?: string;
  children?: NavItem[];
}

export const mainNavigation: NavItem[] = [
  {
    name: "Home",
    href: "/",
    description: "Welcome to SCISA College"
  },
  {
    name: "Departments",
    href: "/departments",
    description: "Explore our academic departments"
  },
  {
    name: "News",
    href: "/news", 
    description: "Latest news and updates"
  },
  {
    name: "Executives",
    href: "/executives",
    description: "Meet our leadership team"
  },
  {
    name: "About",
    href: "/about",
    description: "Learn about our college"
  },
  {
    name: "Contact",
    href: "/contact",
    description: "Get in touch with us"
  }
];

export const footerNavigation = {
  academics: [
    { name: "Departments", href: "/departments" },
    { name: "Faculty", href: "/faculty" },
    { name: "Admissions", href: "/admissions" },
    { name: "Academic Calendar", href: "/calendar" }
  ],
  student_life: [
    { name: "Campus Life", href: "/campus-life" },
    { name: "Student Services", href: "/student-services" },
    { name: "Events", href: "/events" },
    { name: "Organizations", href: "/organizations" }
  ],
  about: [
    { name: "Our History", href: "/about/history" },
    { name: "Mission & Vision", href: "/about/mission" },
    { name: "Leadership", href: "/executives" },
    { name: "Careers", href: "/careers" }
  ]
};
