# Project Profile: WiGarn Restaurant Review Platform

## 🎯 Overview

This is a Restaurant Review Platform for sharing reviews of restaurants.

## 🛠️ Tech Stack & Coding Standards

- **Frontend Framework:** Next.js 16+ (App Router)
- **Backend Framework:** Elysia.js
- **Database** : Bun with Drizzle ORM and PostgreSQL
- **Language:** TypeScript (Strict type checking enforced)
- **Styling & UI:** TailwindCSS v4 + shadcn/ui (Nova Preset)
- **API Gateway**: REST APIs
- **Cloud Service** : AWS (Amazon Web Services)
- **Devops** : GitHub Actions , Docker , Kubernetes
- **Code Style Rule:** ⚠️ **CRITICAL:** Always use **named exports**. Do NOT use default exports under any circumstances.

## 📂 Project Structure

Ensure all new files adhere strictly to this directory layout:

- `/apps/web` - Next.js web application using App Router.
- `/apps/api` - Elysia.js API routes, controllers, and services.
- `/packages` - Shared libraries and utilities.
- `/packages/db` - Database schema and migration logic using Drizzle ORM.
- `/packages/ui` - Shared UI components and design system.
- `/packages/types` - Shared TypeScript types and interfaces.

## 💻 CLI Commands

Always use `bun` as the package manager and execution runtime:

- `bun web:dev` - Starts the local development server on port `3000` (Next.js web app).
- `bun api:dev` - Starts the local development server on port `3001` (Elysia.js api app).
- `bun web:build` - Compiles and builds the production-ready static application (Next.js web app).
- `bun api:build` - Compiles and builds the production-ready static application (Elysia.js api app).
- `bun lint` - Runs the ESLint suite to check for code quality and style violations.
- `bun build` - Compiles and builds the production-ready static application for both web and api apps.

## 🤖 Agent Rules & Protocol

You must execute your workflows according to the following guardrails:

1. **Read Instructions First:** You **MUST** read and fully parse `AGENTS.md` before analyzing code or proposing any modifications.
2. **State Mutation Protocol:** Do not modify, create, or delete any files autonomously. Always present the proposed changes and explicitly **ask the user for permission** before execution.

## Design Theme

### Primary Colors

| Name              | OKLCH Value              | Hex Approx. | Usage                                                 |
| ----------------- | ------------------------ | ----------- | ----------------------------------------------------- |
| Background        | `oklch(0.984 0.005 120)` | #FAFBF7     | Page background (Very bright, clean tint) background  |
| Foreground        | `oklch(0.22 0.012 160)`  | #303B37     | Primary text (Deep charcoal with a hint of pine)text  |
| Primary           | `oklch(0.68 0.13 155)`   | #51B18D     | Links, highlights, CTAs (Vibrant mint/sage green)CTAs |
| Primary-Dark      | `oklch(0.5 0.11 155)`    | #338165     | Hover states, active links                            |
| Accent            | `oklch(0.95 0.025 150)`  | #ECF6F1     | Component highlights, badges, hover CTAs              |
| Accent-Foreground | `oklch(0.5 0.11 155)`    | #338165     | Text inside accent components                         |

### Supporting Colors

| Name             | OKLCH Value             | Hex Approx. | Usage                                                 |
| ---------------- | ----------------------- | ----------- | ----------------------------------------------------- |
| Muted Foreground | `oklch(0.5 0.012 160)`  | #717E7A     | Secondary text, captions, metadata                    |
| Secondary        | `oklch(0.93 0.012 130)` | #ECEFE7     | Secondary backgrounds, subtle elements backgrounds    |
| Secondary-Dark   | `oklch(0.75 0.12 130)`  | #B0C49F     | Darker secondary variations backgrounds               |
| Amber            | `oklch(0.78 0.16 75)`   | #D4A35B     | Warnings, highlights, alternative actions backgrounds |
| Destructive      | `oklch(0.6 0.22 27)`    | #DF454B     | Error states, dangerous actions (Soft red)            |
| Border / Input   | `oklch(0.91 0.012 130)` | #E5E9E0     | Borders, dividers                                     |
| Ring             | `oklch(0.68 0.13 155)`  | #51B18D     | Keyboard focus rings                                  |

---

## Typography

### Font Families

| Type  | Font             | Fallback              | Usage              |
| ----- | ---------------- | --------------------- | ------------------ |
| Sans  | Inter            | system-ui, sans-serif | Body text, UI      |
| Serif | Playfair Display | Georgia, serif        | Headings, emphasis |
| Mono  | Geist Mono       | monospace             | Code, technical    |

### Type Scale (Tailwind Classes)

```
text-6xl  - Hero headlines (font-serif)
text-4xl  - Section titles (font-serif)
text-2xl  - Card titles
text-xl   - Subheadings
text-lg   - Lead text
text-base - Body text
text-sm   - Secondary text, labels
text-xs   - Captions, metadata
```

---

## Spacing System

Based on Tailwind's default spacing scale:

| Size | Value         | Usage             |
| ---- | ------------- | ----------------- |
| 4    | 1rem (16px)   | Small gaps        |
| 6    | 1.5rem (24px) | Component padding |
| 8    | 2rem (32px)   | Section padding   |
| 12   | 3rem (48px)   | Large gaps        |
| 16   | 4rem (64px)   | Section margins   |
| 20   | 5rem (80px)   | Hero spacing      |
| 24   | 6rem (96px)   | Major sections    |

---

## Border Radius

| Token      | Value        | Usage           |
| ---------- | ------------ | --------------- |
| --radius   | 0.5rem (8px) | Base radius     |
| rounded-sm | 4px          | Small elements  |
| rounded-md | 6px          | Buttons, inputs |
| rounded-lg | 8px          | Cards           |
| rounded-xl | 12px         | Large cards     |

---

## Design Principles

1. **Warmth** - Cream tones create an inviting, approachable feel
2. **Contrast** - Dark brown text on light backgrounds for readability
3. **Restraint** - Limited color palette maintains visual harmony
4. **Hierarchy** - Serif headings + sans-serif body creates clear structure
5. **Whitespace** - Generous spacing lets content breathe
