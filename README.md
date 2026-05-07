# AI Kerala Stories

A responsive, animated marketing site showcasing community learning impact across Kerala — built with Vite, React (TypeScript), Tailwind CSS and Framer Motion.

## Key Features
- Interactive SVG map of Kerala with animated nodes and popups (Framer Motion).
- Modular UI components and sections for fast iteration (`src/components`).
- Tailwind CSS utility-driven styling with custom tokens and themes.
- Vite-powered dev server and fast HMR for quick development.

## Tech Stack
- Framework: React + TypeScript
- Bundler / Dev: Vite
- Styling: Tailwind CSS
- Animation: Framer Motion
- Linting: ESLint (project contains `eslint.config.js`)

## Prerequisites
- Node.js v18+ (recommended) and npm or a compatible package manager (pnpm, bun).
- A modern browser for local preview.

## Quick Start (Windows PowerShell)
Clone the repo and install dependencies:

```
git clone https://github.com/Sandra07alex/ai-kerala-stories-main.git
cd "ai-kerala-stories-main"
npm install
```

Run the development server:

```
npm run dev
```

Build for production:

```
npm run build

# preview the production build locally
npm run preview
```

If your project uses a different package manager, replace `npm` with `pnpm` or `yarn` as needed.

## Project Structure (high level)
- `src/` — source code
  - `App.tsx`, `main.tsx` — app entry and routing
  - `components/` — UI primitives and section components
    - `sections/` — page sections (e.g. `ImpactMapSection.tsx`)
    - `ui/` — small reusable UI primitives (buttons, dialog, cards, etc.)
  - `hooks/` — custom hooks
  - `lib/` — utilities
  - `pages/` — pages (index, 404)
- `public/` — static assets
- `package.json` — scripts & dependencies

## Important Files
- `src/components/sections/ImpactMapSection.tsx` — interactive Kerala map using SVG + Framer Motion.  
- `tailwind.config.ts` — Tailwind configuration and theme tokens.  
- `vite.config.ts` — Vite configuration.  

## Styling & Theming
This project uses Tailwind CSS with custom tokens (see `tailwind.config.ts`). Update theme colors and tokens in that file to keep visual consistency.

## Animations
Framer Motion is used for entrance animations and interactive transitions. See `ImpactMapSection.tsx` for an example combining `motion` elements with SVG.

## Accessibility
Keep interactive elements keyboard-accessible and add appropriate `aria-*` attributes when extending components or adding new interactive sections.

## Deployment
This repository is already set up for static deployments (Vite build output). Good choices:
- Vercel: push to the main branch and Vercel will detect the Vite project.
- Netlify: set the build command to `npm run build` and publish the `dist/` folder.

## Contributing
- Fork the repo and open a pull request with a clear description of changes.
- For new components, add them under `src/components/ui` and re-use existing tokens.
- Keep commits small and focused; follow conventional commits if you prefer.

## Troubleshooting
- If styles don't update, ensure Tailwind is running and restart the dev server.  
- If animations stutter, check browser devtools for heavy rendering or large re-renders.

## Notes & Next Steps
- Add a `LICENSE` file if you want to publish this project (e.g., `MIT`).  
- Consider adding unit or visual regression tests for critical UI sections.  
- Add a short CONTRIBUTING guide and issue templates to streamline collaboration.

---
_If you'd like, I can:_
- Run the project locally and verify `npm run dev` works.  
- Add a `CONTRIBUTING.md` or `LICENSE` file.  
- Extract reusable map logic into a small hook or component for reuse.
AI Kerala Stories — Vite + React

This repository contains a Vite + React (TypeScript) site built with Tailwind and shadcn components.

Quick goals in this repo:
- Initialize a Git repository and push to GitHub.
- Deploy the site to Vercel (recommended) for automatic builds on push.

Local dev

1. Install dependencies

Powershell commands:
    npm install
    # or with bun
    bun install
    # or with pnpm
    pnpm install

2. Run dev server

Powershell command:
    npm run dev

Build

Powershell commands:
    npm run build
    npm run preview

GitHub + Vercel deployment (recommended commands)

1. Initialize git, commit, and create GitHub repo using gh (GitHub CLI):

Powershell commands:
    cd "c:\Users\sandr\Desktop\AI FOR  E\ai-kerala-stories-main"
    git init
    git add -A
    git commit -m "chore: initial commit"

    # create GitHub repo (replace NAME and visibility as needed)
    gh repo create my-repo-name --public --source=. --remote=origin --push

If you don't have the gh CLI, create a new repository on GitHub via the website and add the remote:

Powershell commands:
    git remote add origin https://github.com/<your-username>/<repo-name>.git
    git branch -M main
    git push -u origin main

2. Deploy to Vercel

Option A: Use Vercel web dashboard
  - Go to https://vercel.com, sign in, choose "Import Project", connect your GitHub account, select this repository, and deploy. Vercel auto-detects Vite and will run npm run build.

Option B: Use Vercel CLI

Powershell commands:
    npm i -g vercel
    vercel login
    # from repo root
    vercel --prod

Notes
- Build output directory is dist (default for Vite). Vercel will use npm run build and publish dist.
- If your project uses environment variables, add them in the Vercel dashboard under Project Settings → Environment Variables.

Need help?
- Tell me the GitHub repo name you want and whether you want it public or private; I can provide exact gh commands and a vercel CLI command sequence you can paste into PowerShell.
# Welcome to your Lovable project

## Project info

**URL**: https://ai-for-everyone-two.vercel.app/

## How can I edit this code?

There are several ways of editing your application.

