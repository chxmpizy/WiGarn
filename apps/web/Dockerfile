# install dependencies
FROM oven/bun:1.1-alpine AS base
WORKDIR /usr/src/app

COPY package.json bun.lock ./
COPY apps/web/package.json ./apps/web/

RUN bun install --frozen-lockfile

# Building Project
FROM oven/bun:1.1-alpine AS builder
WORKDIR /usr/src/app

COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY --from=deps /usr/src/app/apps/web/node_modules ./apps/web/node_modules
COPY . .

ENV NODE_ENV=production
RUN bun x turbo run build --filter=web...

# Production Runner
FROM oven/bun:1.1-alpine AS runner
WORKDIR /usr/src/app

COPY --from=base /usr/src/app/apps/web/.next ./apps/web/.next
COPY --from=base /usr/src/app/apps/web/public ./apps/web/public
COPY --from=builder /usr/src/app/node_modules ./node_modules

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

WORKDIR /usr/src/app/apps/web

EXPOSE 3000

CMD [ "bun", "run", "start" ]