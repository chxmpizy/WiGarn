# Install dependencies and build the Next.js app
ARG NODE_IMAGE=mirror.gcr.io/library/node:20-alpine
FROM ${NODE_IMAGE} AS builder

WORKDIR /app
# Use corepack for latest yarn version
RUN corepack enable
COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn .yarn
# Copy source code
COPY . .

RUN yarn install --immutable

WORKDIR /app/apps/web
# install dependencies excepted lockfile
RUN yarn workspaces focus web
# Build Next.js app
RUN yarn build
# ---- Production image ----
FROM ${NODE_IMAGE}  AS runner

# Use /app to tell that use this folder
WORKDIR /app

RUN corepack enable
# Copy runtime deps & app
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/apps/web/.next ./.next
COPY --from=builder /app/apps/web/public ./public
COPY --from=builder /app/apps/web/next.config.js ./next.config.js
COPY --from=builder /app/apps/web/package.json ./package.json

# ADD THESE (root workspace context so Yarn can run):
COPY --from=builder /app/package.json /app/package.json
COPY --from=builder /app/yarn.lock /app/yarn.lock
COPY --from=builder /app/.yarnrc.yml /app/.yarnrc.yml
COPY --from=builder /app/.yarn /app/.yarn

EXPOSE 3000

CMD ["yarn", "start"]