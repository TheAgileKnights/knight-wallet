FROM node:22.16.0-alpine3.22 AS base

# Dependencies stage
FROM base AS deps
WORKDIR /app
ADD package.json package-lock.json ./
RUN npm ci

# Build stage
FROM base AS build
WORKDIR /app
COPY --from=deps /app/node_modules /app/node_modules
ADD . .
RUN node ace build

# Production stage
FROM base
WORKDIR /app
COPY --from=deps /app/node_modules /app/node_modules
COPY --from=build /app/build /app
ENV NODE_ENV=production
EXPOSE 3333
CMD ["node", "bin/server.js"]
