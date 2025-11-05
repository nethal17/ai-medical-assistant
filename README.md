# AI Medical Assistant

A patient-facing/clinical assistant web app built with Next.js and OpenAI-like models. The project gives users a medical-chat experience, generates medical reports, and suggests doctors using LLMs and serverless database storage.

## Table of contents
- About
- Features
- Tech stack
- Prerequisites
- Environment variables
- Quick start
- Project structure
- Development notes
- Deployment
- Contributing
- License

## About

This repository contains the frontend and backend routes for an AI-powered medical assistant. The app uses Next.js (App Router), server-side API routes, an ORM (Drizzle) for database access, Clerk for authentication, and a VAPI/web SDK for real-time agent interactions.

## Features

- Conversational medical agent (sessions) with per-session chat
- Generate medical reports (PDF export) via server API
- Suggest doctors based on user input
- Authentication using Clerk
- Persistent session + history stored in a serverless database (Neon/Drizzle)

## Tech stack

- Next.js (app directory) — React + routing
- TypeScript
- Drizzle ORM + drizzle-kit for DB migrations
- Neon / Postgres (serverless) — configured via `DATABASE_URL`
- Clerk for authentication
- OpenAI-compatible client (`openai` package) pointed at OpenRouter
- Tailwind CSS and various UI components

## Prerequisites

- Node.js 18+ (or the version compatible with Next.js in the repo)
- npm or yarn
- A Postgres-compatible database (Neon recommended)
- Account/API keys for the LLM provider (OpenRouter / OpenAI) and VAPI provider
- Clerk account for auth keys

## Environment variables

Create a `.env` file at the project root (do NOT commit secrets). Example keys used by this project (taken from the codebase):

```env
# Database
DATABASE_URL=postgresql://user:password@host:port/dbname

# LLM (OpenRouter)
OPEN_ROUTER_API_KEY=your_openrouter_api_key

# Vapi / realtime agent (public key used in client)
NEXT_PUBLIC_VAPI_API_KEY=your_vapi_public_key

# Clerk (auth)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
```

Notes:
- The codebase reads `process.env.DATABASE_URL`, `process.env.OPEN_ROUTER_API_KEY`, and `process.env.NEXT_PUBLIC_VAPI_API_KEY` (plus Clerk keys). Adjust values to your environment.
- Keep secret keys private and use your hosting provider's secret store for production.

## Quick start

1. Install dependencies

```bash
npm install
# or
# yarn
```

2. Create `.env` using the snippet above and fill values.

3. Run the development server

```bash
npm run dev
# opens http://localhost:3000 by default
```

4. Build for production

```bash
npm run build
npm run start
```

5. Lint

```bash
npm run lint
```

## Project structure (high level)

- `app/` — Next.js app router pages and API routes
  - `(auth)` — auth related pages (sign-in / sign-up)
  - `(routes)/dashboard/medical-agent/[sessionId]` — medical agent UI
- `app/api/` — server API routes (medical reports, session chat, suggest doctors, users)
- `components/` — React UI components used by the app
- `config/` — configuration helpers (database, OpenAI client)
- `Providers/` — app-wide providers (Clerk, theme, contexts)
- `schema.ts`, `drizzle.config.ts`, `drizzle-kit` — DB schema and migration tooling

## Development notes

- Auth: Clerk is already wired in (see `@clerk/nextjs` integration). Configure Clerk keys in your `.env` or hosting provider.
- DB: The project uses `drizzle-orm` and `drizzle-kit`. Use the `drizzle-kit` CLI to run migrations once you configure `DATABASE_URL`.
- LLM: The OpenAI client in `config/open-ai-model.ts` is configured to use OpenRouter via `OPEN_ROUTER_API_KEY`. If you swap providers, update that file accordingly.
- Public client keys (ones prefixed with `NEXT_PUBLIC_`) are safe to expose to the browser; keep secret server-side keys in secret storage.

## Deployment

This project can be deployed to any provider supporting Next.js (Vercel, Netlify, Fly, Render). When deploying:

- Set the environment variables in the host control panel (do not push `.env` to git).
- If using DB migrations, run them as part of your deploy pipeline (drizzle-kit can be executed in CI/CD).

## Contributing

If you'd like to contribute:

1. Fork the repo and create a feature branch
2. Open a PR with a clear description
3. Run lint and ensure types compile

Small, focused PRs are preferred. If you plan a larger change (e.g., swapping LLM backends), open an issue first to discuss the approach.

## License

This project does not include a license file in the repo. Add a LICENSE file if you want to clarify usage terms.

---

If you'd like, I can also:

- add a `README` section that documents a few of the most important components (e.g., `app/api/medical-report/route.ts`) with examples of how to hit the API;
- add a `.env.example` file to the repo (without secrets) so it's easier for new devs to get started.

Tell me which extras you want and I'll add them.
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
