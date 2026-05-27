# WiGarn

**WiGarn** is a restaurant review platform for discovering restaurants and sharing reviews. This monorepo contains the **web app** (Next.js), **API** (Elysia.js), and **shared packages** used across both.

For agent and contributor conventions (tech stack, design system, coding rules), see [AGENTS.md](./AGENTS.md).

---

## Table of Contents

- [Project Structure](#project-structure)
- [Apps & Packages](#apps--packages)
- [Getting Started](#getting-started)
- [Tech Stack](#tech-stack)
- [Useful Commands](#useful-commands)
- [DevOps & Infrastructure](#devops--infrastructure)

---

## Project Structure

```
WiGarn/
├── apps/
│   ├── api/                 # Elysia.js REST API (port 3001)
│   │   └── src/             # Routes, controllers, services
│   └── web/                 # Next.js 16+ App Router (port 3000)
│       ├── app/             # Pages, layouts, global styles
│       ├── components/      # App-specific UI (e.g. Landing, Post)
│       └── public/          # Static assets
├── packages/
│   ├── db/                  # Database schema & migrations (Drizzle ORM) — planned
│   ├── ui/                  # Shared UI components & design system (shadcn/ui)
│   ├── types/               # Shared TypeScript types & interfaces — planned
│   ├── eslint-config/       # Shared ESLint configurations
│   └── typescript-config/   # Shared TypeScript configurations
├── .github/workflows/       # CI/CD (GitHub Actions)
├── AGENTS.md                  # Project profile, design system, agent rules
├── docker-compose.yml         # Local PostgreSQL & API services
└── package.json               # Root workspace scripts (Bun + Turborepo)
```

---

## Apps & Packages

| Path                                                         | Description                                                                                                                                                                                            |
| ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [`apps/web`](./apps/web)                                     | Next.js web application using the **App Router**. Serves the public UI for browsing restaurants and reading or writing reviews. Styled with **Tailwind CSS v4** and shared components from `@repo/ui`. |
| [`apps/api`](./apps/api)                                     | **Elysia.js** backend exposing **REST APIs** for reviews, restaurants, and related resources. Handles request routing, validation, and business logic.                                                 |
| [`packages/db`](./packages/db)                               | **Drizzle ORM** schema and migration logic against **PostgreSQL**. Centralizes database models and queries for use by the API. _(Planned — not yet in repo.)_                                          |
| [`packages/ui`](./packages/ui)                               | Shared **shadcn/ui** (Nova preset) components and design tokens. Keeps the web app and future surfaces visually consistent.                                                                            |
| [`packages/types`](./packages/types)                         | Shared **TypeScript** types and interfaces consumed by `apps/web`, `apps/api`, and other packages. _(Planned — not yet in repo.)_                                                                      |
| [`packages/eslint-config`](./packages/eslint-config)         | Shared ESLint rules for apps and libraries.                                                                                                                                                            |
| [`packages/typescript-config`](./packages/typescript-config) | Shared `tsconfig` bases for Next.js and React libraries.                                                                                                                                               |

---

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) `>= 1.3` (package manager and runtime)
- [Node.js](https://nodejs.org/) `>= 18`
- PostgreSQL (local or via `docker-compose.yml`)

### 1. Install dependencies

From the repository root:

```sh
bun install
```

### 2. Start the API

```sh
bun api:dev
```

The API runs at **http://localhost:3001**.

### 3. Start the web app

In a separate terminal:

```sh
bun web:dev
```

The web app runs at **http://localhost:3000**.

### 4. Database (optional, Docker)

```sh
docker compose up -d db
```

Configure connection details in `apps/api/.env` when the database layer is wired up.

---

## Tech Stack

| Layer            | Technology                                                                                     |
| ---------------- | ---------------------------------------------------------------------------------------------- |
| **Frontend**     | [Next.js 16+](https://nextjs.org/) (App Router), React, TypeScript                             |
| **Backend**      | [Elysia.js](https://elysiajs.com/) on Bun                                                      |
| **Database**     | [Neon](https://neon.com/) with [Drizzle ORM](https://orm.drizzle.team/)                        |
| **Styling & UI** | [Tailwind CSS v4](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/) (Nova preset) |
| **API style**    | REST                                                                                           |
| **Cloud**        | AWS                                                                                            |
| **DevOps**       | GitHub Actions, Docker, Kubernetes                                                             |
| **Monorepo**     | [Turborepo](https://turbo.build/repo) + Bun workspaces                                         |
| **Language**     | TypeScript (strict)                                                                            |

**Code style:** use **named exports** only — no default exports.

---

## Useful Commands

Run from the repository root:

| Command                        | Description                               |
| ------------------------------ | ----------------------------------------- |
| `bun install`                  | Install all workspace dependencies        |
| `bun web:dev`                  | Start Next.js dev server (port `3000`)    |
| `bun api:dev`                  | Start Elysia API dev server (port `3001`) |
| `bun build`                    | Build all apps via Turborepo              |
| `cd apps/web && bun run build` | Production build for the web app only     |
| `bun lint`                     | Run ESLint across the monorepo            |
| `bun format`                   | Format code with Prettier                 |
| `bun check-types`              | Type-check all packages                   |

---

## DevOps & Infrastructure

- **CI/CD:** GitHub Actions workflow in [`.github/workflows/pipeline.yml`](./.github/workflows/pipeline.yml)
- **Containers:** `docker-compose.yml` for local PostgreSQL and API services
- **Design system:** color, typography, and spacing tokens are documented in [AGENTS.md](./AGENTS.md#design-theme)

---

## Notes

- Environment variables for the API belong in `apps/api/.env`.
- When `packages/db` is added, run Drizzle migrations from that package per project docs.
- Contributor and AI agent guidelines live in [AGENTS.md](./AGENTS.md).
