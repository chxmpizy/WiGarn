# Wi Garn

This monorepo contains both the **Frontend** (Next.js) and **Backend** (NestJS + Prisma) applications for the Ran Ah Rai project.

---

## Table of Contents

- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Install Dependencies](#install-dependencies)
  - [Start the Backend (API)](#start-the-backend-api)
  - [Start the Frontend (Web)](#start-the-frontend-web)
- [API Routing Example](#api-routing-example)
- [Tech Stack](#tech-stack)
- [Useful Commands](#useful-commands)

---

## Project Structure

```
apps/
  api/    # NestJS backend (with Prisma)
  web/    # Next.js frontend
packages/
  ...     # Shared packages (UI, configs, etc.)
```

---

## Getting Started

### 1. Install Dependencies

At the root of the project, run:

```sh
yarn install
```

### 2. Start the Backend (API)

Navigate to the backend folder and start the NestJS server:

```sh
cd apps/api
# Development mode
yarn start:dev
```

- The API will be available at `http://localhost:3001` (or your configured port).

### 3. Start the Frontend (Web)

In a new terminal, navigate to the frontend folder and start the Next.js app:

```sh
cd apps/web
yarn dev
```

- The frontend will be available at `http://localhost:3000`.

---

## API Routing Example

The backend uses [Prisma](https://www.prisma.io/) for database access. Here’s an example of a RESTful API for `products`:

### Example: `apps/api/src/module/products/products.controller.ts`

```ts
```

- **GET `/products`**: List all products
- **GET `/products/:id`**: Get a product by ID
- **POST `/products`**: Create a new product
- **PUT `/products/:id`**: Update a product
- **DELETE `/products/:id`**: Delete a product

The service uses Prisma to interact with the database.

---

## Tech Stack

- **Frontend:** [Next.js](https://nextjs.org/) (React)
- **Backend:** [NestJS](https://nestjs.com/)
- **ORM:** [Prisma](https://www.prisma.io/)
- **Monorepo:** [Turborepo](https://turbo.build/repo)
- **Package Manager:** [Yarn Workspaces](https://classic.yarnpkg.com/en/docs/workspaces/)

---

## Useful Commands

From the root:

- `yarn install` — Install all dependencies
- `yarn dev` — Start all apps in development mode (if configured in turbo)
- `cd apps/api && yarn start:dev` — Start backend API
- `cd apps/web && yarn dev` — Start frontend

---

## Notes

- Make sure your database is running and Prisma is migrated (`yarn prisma migrate dev` in `apps/api`).
- Environment variables for the backend should be set in `apps/api/.env`.

---
