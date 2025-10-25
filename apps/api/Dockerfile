# Use official Node.js LTS image
FROM node:20-alpine AS builder

WORKDIR /app
# Use corepack for latest yarn version
RUN corepack enable
COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn .yarn
# Copy source code
COPY . .

RUN yarn install --immutable

# cd to api folder
WORKDIR /app/apps/api
# Install dependencies
RUN yarn workspaces focus api 

# Generate Prisma Client
RUN yarn workspace api prisma generate

# Build the NestJS app
RUN yarn build

# ---- Production image ----
FROM node:20-alpine AS runner
# cd to this folder
WORKDIR /app
# Use corepack for latest yarn version again
RUN corepack enable

# Copy built output
COPY --from=builder /app/apps/api/dist ./dist
COPY --from=builder /app/apps/api/node_modules ./apps/api/node_modules
COPY --from=builder /app/apps/api/package.json ./
COPY --from=builder /app/apps/api/.env ./

# ADD THESE (root workspace context so Yarn can run):
COPY --from=builder /app/package.json /app/package.json
COPY --from=builder /app/yarn.lock /app/yarn.lock
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.yarnrc.yml /app/.yarnrc.yml
COPY --from=builder /app/.yarn /app/.yarn

# Expose the API port
EXPOSE 3001

# Start the NestJS server
CMD ["node", "dist/main.js"]