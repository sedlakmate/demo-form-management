# ---- Base image ----
FROM node:22-alpine AS base
WORKDIR /app
RUN apk add --no-cache libc6-compat

# ---- Builder for pruning and installing ----
FROM base AS builder
RUN yarn global add turbo
COPY . .
RUN turbo prune backend --docker

FROM base AS installer
WORKDIR /app
COPY --from=builder /app/out/json/ .
RUN yarn install
RUN yarn workspace backend prisma generate
COPY --from=builder /app/out/full/ .

# Fix write permissions
RUN chmod -R 777 /app/packages/logger

# Build in order
RUN yarn workspace backend build


# ---- Dev mode (used for local development with volumes) ----
FROM base AS dev
WORKDIR /app
COPY . .
RUN yarn install
RUN yarn workspace backend prisma generate
ENV NODE_ENV=development
ENV CHOKIDAR_USEPOLLING=true
CMD ["yarn", "workspace", "backend", "dev"]

# ---- Prod runner ----
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=installer /app .
USER 1001
CMD ["node", "apps/backend/dist/index.js"]
