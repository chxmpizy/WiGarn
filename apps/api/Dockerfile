# install dependencies
FROM oven/bun:1.1-alpine AS base
WORKDIR /usr/src/app

COPY package.json bun.lock ./
COPY apps/api/package.json ./apps/api/

RUN bun install --frozen-lockfile

# Production Runner
FROM oven/bun:1.1-alpine AS runner
WORKDIR /usr/src/app

COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY --from=deps /usr/src/app/apps/api/node_modules ./apps/api/node_modules
COPY . .

ENV NODE_ENV=production
WORKDIR /usr/src/app/apps/api

EXPOSE 3001

CMD [ "bun", "run", "src/index.ts" ]