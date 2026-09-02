# ==============================================================================
# ms22-admin — Multi-Stage Production Dockerfile (Preact 10 + Vite 8 + Nginx)
# Build Context: Monorepo Root (Personal-Projects/MishraShardendu)
# ==============================================================================
FROM node:22-alpine AS builder

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy monorepo configuration and lockfile
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json biome.json ./
COPY packages/ ./packages/
COPY apps/MishraShardendu22-Frontend-AdminWebsite/package.json ./apps/MishraShardendu22-Frontend-AdminWebsite/
COPY apps/MishraShardendu22-Frontend-BlogWebsite/package.json ./apps/MishraShardendu22-Frontend-BlogWebsite/

RUN pnpm install --frozen-lockfile --ignore-scripts

# Copy Admin app source code
COPY apps/MishraShardendu22-Frontend-AdminWebsite/ ./apps/MishraShardendu22-Frontend-AdminWebsite/

# Build static SPA
RUN pnpm --filter ms22-admin build

# ------------------------------------------------------------------------------
# Production Nginx Runtime Stage
# ------------------------------------------------------------------------------
FROM nginx:alpine AS runner

# Remove default nginx configurations
RUN rm -rf /etc/nginx/conf.d/* /usr/share/nginx/html/*

# Copy custom Nginx configuration with SPA fallback & gzip
COPY apps/MishraShardendu22-Frontend-AdminWebsite/nginx.conf /etc/nginx/conf.d/default.conf

# Copy compiled static assets from builder
COPY --from=builder /app/apps/MishraShardendu22-Frontend-AdminWebsite/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=15s --timeout=5s --start-period=5s --retries=3 \
    CMD wget -qO- http://localhost:80/health || exit 1

CMD ["nginx", "-g", "daemon off;"]
