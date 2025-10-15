# SCISA College Portfolio

> Modern, responsive college portfolio website built with React, TypeScript, and Tailwind CSS.

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Development Guidelines](#development-guidelines)
- [Features](#features)
- [Contributing](#contributing)
- [Team](#team)

## 🎯 Overview

This is the official portfolio website for SCISA College, showcasing our departments, latest news, executive team, and college achievements. Built with modern web technologies for optimal performance and user experience.

## 🛠 Tech Stack

- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS v4
- **Routing:** React Router v6
- **CMS:** Sanity (Headless CMS)
- **SEO:** react-helmet-async
- **Fonts:** Fontsource (Inter + Poppins)
- **Linting:** ESLint
- **Package Manager:** npm

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd scisa-port/scisa-web
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your environment variables:
   ```env
   VITE_SANITY_PROJECT_ID=your_project_id
   VITE_SANITY_DATASET=production
   VITE_SITE_URL=http://localhost:5173
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📁 Project Structure

```
scisa-web/
├── public/                 # Static assets
├── src/
│   ├── components/         # React components
│   │   ├── layout/        # Layout components (Header, Footer, etc.)
│   │   ├── sections/      # Page sections (Hero, Cards, etc.)
│   │   └── ui/            # Reusable UI components
│   ├── pages/             # Route components
│   ├── lib/               # Utilities and helpers
│   │   ├── utils.ts       # Common utility functions
│   │   ├── constants.ts   # App constants
│   │   └── sanity.ts      # Sanity client configuration
│   ├── types/             # TypeScript type definitions
│   ├── config/            # Configuration files
│   │   ├── site.config.ts # Site metadata and settings
│   │   └── navigation.ts  # Navigation structure
│   ├── hooks/             # Custom React hooks
│   ├── styles/            # Global styles and Tailwind config
│   └── assets/            # Images, icons, and other assets
├── .env.example           # Environment variables template
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── vite.config.ts         # Vite configuration
```

## 💻 Development Guidelines

### Code Style

- **TypeScript:** Use TypeScript for all files
- **Components:** Functional components with TypeScript interfaces
- **Styling:** Tailwind CSS classes (avoid inline styles)
- **Imports:** Use absolute imports with path mapping
- **Naming:** PascalCase for components, camelCase for functions/variables

### Component Structure

```tsx
// Good component structure
import { FC } from 'react';
import { cn } from '@/lib/utils';

interface ComponentProps {
  title: string;
  description?: string;
  className?: string;
}

export const Component: FC<ComponentProps> = ({ 
  title, 
  description, 
  className 
}) => {
  return (
    <div className={cn("base-classes", className)}>
      <h2 className="text-xl font-semibold">{title}</h2>
      {description && (
        <p className="text-gray-600">{description}</p>
      )}
    </div>
  );
};
```

### Git Workflow

1. **Create feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make changes and commit**
   ```bash
   git add .
   git commit -m "feat: add department listing page"
   ```

3. **Push and create PR**
   ```bash
   git push origin feature/your-feature-name
   ```

### Commit Convention

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation
- `style:` Formatting/styling
- `refactor:` Code refactoring
- `test:` Testing
- `chore:` Maintenance

## ✨ Features

### Current Features

- 📱 Responsive design for all devices
- 🎨 Modern UI with Tailwind CSS
- 🔍 SEO optimized with meta tags
- 🚀 Fast loading with Vite
- 📊 TypeScript for type safety
- 🎯 Component-based architecture

### Planned Features

- 🏢 Department pages with detailed information
- 📰 News and announcements system
- 👥 Executive team profiles
- 📅 Events calendar
- 🖼️ Photo gallery
- 📧 Contact forms


## 🎨 Design System

### Colors

- Primary: Blue (`#2563eb`)
- Secondary: Gray (`#6b7280`)
- Success: Green (`#10b981`)
- Warning: Yellow (`#f59e0b`)
- Error: Red (`#ef4444`)

### Typography

- **Headings:** Poppins (600, 700)
- **Body:** Inter (400, 500, 600)
- **Code:** JetBrains Mono

### Spacing

Follow Tailwind's spacing scale (4px base unit):
- `xs`: 4px
- `sm`: 8px  
- `md`: 16px
- `lg`: 24px
- `xl`: 32px




### Pull Request Guidelines

- Provide clear description of changes
- Include screenshots for UI changes
- Ensure all tests pass
- Request review from team lead
- Update documentation if needed












