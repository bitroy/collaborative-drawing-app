FROM node:20-alpine AS builder
WORKDIR /repo

RUN npm install -g pnpm@9

COPY pnpm-workspace.yaml pnpm-lock.yaml package.json turbo.json tsconfig.base.json ./

COPY packages/types ./packages/types
COPY apps/server   ./apps/server

RUN pnpm install --frozen-lockfile
RUN pnpm run build --filter @drawing-app/types && pnpm run build --filter server


FROM node:20-alpine AS runner
WORKDIR /app

RUN npm install -g pnpm@9

COPY pnpm-workspace.yaml pnpm-lock.yaml package.json ./

COPY apps/server/package.json    apps/server/package.json
COPY packages/types/package.json packages/types/package.json

WORKDIR /app/apps/server

RUN pnpm install --frozen-lockfile --prod --ignore-scripts

COPY --from=builder /repo/apps/server/dist ./dist

EXPOSE 3001
CMD ["node", "dist/server.js"]
