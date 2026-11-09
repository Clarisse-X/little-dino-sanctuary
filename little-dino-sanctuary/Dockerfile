# syntax=docker/dockerfile:1

# ---------- Stage 1: builder (installs production dependencies) ----------
FROM node:20.18.1-alpine3.21 AS builder
WORKDIR /app

# Copy manifests first so this layer is cached until dependencies change
COPY package*.json ./
RUN --mount=type=cache,target=/root/.npm \
    npm install --omit=dev --no-audit --no-fund

# ---------- Stage 2: runtime (small, non-root) ----------
FROM node:20.18.1-alpine3.21 AS runtime
ENV NODE_ENV=production
WORKDIR /app

COPY --from=builder --chown=node:node /app/node_modules ./node_modules
COPY --chown=node:node package*.json server.js ./
COPY --chown=node:node public ./public

# Built-in unprivileged user from the official Node image
USER node
EXPOSE 3000

# Exec form: Node is PID 1 and receives SIGTERM directly
CMD ["node", "server.js"]
