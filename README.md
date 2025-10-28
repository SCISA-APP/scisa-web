# SCISA College Portfolio

Simple, modern portfolio for the College of Science (SCISA). Built with React + TypeScript + Vite + Tailwind CSS.

## Quick Start

1. Clone and install
   ```bash
   git clone <repository-url>
   cd scisa-port/scisa-web
   npm install
   ```
2. Run dev server
   ```bash
   npm run dev
   ```
   App runs at http://localhost:5173
3. Build & preview
   ```bash
   npm run build
   npm run preview
   ```

## Tech

- React 19 + TypeScript
- Vite
- Tailwind CSS (with custom tokens)
- ESLint

## Project Layout

```
src/
├─ components/
│  ├─ layout/        Header, Footer
│  ├─ sections/      Page sections
│  └─ ui/            Reusable UI (Button, Cards, SectionTitle)
├─ assets/           Images/icons (e.g. assets/images/home_img.jpg)
├─ config/           site.config.ts, navigation.ts
├─ lib/              utils.ts, constants.ts
├─ types/            shared types
├─ App.tsx           main page
└─ index.css         Tailwind layers
```

## Design Tokens (Tailwind)

- Primary red: `primary` = `#8B0000`
- Text: `text-primary` = `#1E293B`, `text-secondary` = `#4A5565`, `text-light` = `#e5e7eb`, `text-muted` = `#9ca3af`
- Dark background: `bg-dark` = `#1a1a1a`
- Footer background: `#101828`

Update or add tokens in `tailwind.config.js` under `theme.extend.colors`.

## Conventions

- Components: functional, typed props, PascalCase filenames
- Styling: Tailwind utility classes; keep class lists readable and consistent
- Accessibility: label interactive elements; use semantic HTML
- Imports: use relative paths within `src`

## Scripts

- `npm run dev` – start dev server
- `npm run build` – production build to `dist`
- `npm run preview` – preview the production build

## Git & PRs

1. Create a branch: `git checkout -b feat/short-name`
2. Commit: `feat: concise, clear message`
3. Push and open a PR with a short summary and screenshots for UI changes


