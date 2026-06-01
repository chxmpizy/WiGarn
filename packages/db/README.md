# @wigarn/db

Drizzle ORM schema and migration package for WiGarn.

Environment variables required:

- DATABASE_URL - Postgres connection string
- NODE_ENV - production|development

Usage:

- bun workspace @wigarn/db add
- bun --cwd packages/db install
- bun --cwd packages/db run generate
- bun --cwd packages/db run migrate:dev
