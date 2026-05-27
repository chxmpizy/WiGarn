# WiGarn API

Elysia.js REST API for the WiGarn restaurant review platform. See [AGENTS.md](../../AGENTS.md) for monorepo conventions.

## Development

```sh
bun run dev
```

Runs at **http://localhost:3001** (`bun api:dev` from the repo root).

## Folder structure

```
src/
├── index.ts              # Entry point — starts the server
├── app.ts                # Composes the Elysia application
├── routes/               # Route plugins (HTTP paths & methods)
│   ├── index.ts          # Registers all route modules
│   ├── health.route.ts
│   ├── restaurants/
│   ├── reviews/
│   └── users/
├── controllers/          # Request handlers (delegate to services)
│   ├── health.controller.ts
│   ├── restaurants/
│   ├── reviews/
│   └── users/
├── services/             # Business logic & data access
│   ├── health.service.ts
│   ├── restaurants/
│   ├── reviews/
│   └── users/
├── plugins/              # Shared Elysia plugins
├── middleware/           # Custom middleware
├── lib/                  # Utilities (DB client, helpers)
└── types/                # API-local TypeScript types
```

## Request flow

```
HTTP request → routes → controllers → services → (packages/db)
```

Use **named exports** only.
