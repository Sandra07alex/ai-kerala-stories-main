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

**URL**: https://lovable.dev/projects/9dd1ebb9-80e7-44f6-934e-9df5f9a8374a

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/9dd1ebb9-80e7-44f6-934e-9df5f9a8374a) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/9dd1ebb9-80e7-44f6-934e-9df5f9a8374a) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
