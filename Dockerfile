# ─── Stage 1: Build ───────────────────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency manifests first for better layer caching
COPY package.json package-lock.json ./

RUN npm ci

# Copy the rest of the source code
COPY . .

# Generate /public/data/index.json from all individual item JSON files
RUN node scripts/generate-data-index.mjs

# Build for production (generate-index is also wired into the npm build script)
RUN npm run build -- --configuration production

# ─── Stage 2: Serve ───────────────────────────────────────────────────────────
FROM nginx:alpine AS runner

# Remove the default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy the compiled app from the builder stage
COPY --from=builder /app/dist/angular-clean-architecture/browser /usr/share/nginx/html

# Copy custom nginx config to handle Angular routing (HTML5 history API)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# data/ JSON files are baked into the image from public/data/
# They are served by nginx at /data/{id}.json and /data/index.json

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
