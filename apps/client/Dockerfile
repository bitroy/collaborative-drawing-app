FROM node:20-alpine AS builder

WORKDIR /app

RUN npm install -g pnpm@9.0.0

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json tsconfig.base.json ./


COPY packages/types ./packages/types
COPY apps/client ./apps/client

RUN pnpm install --frozen-lockfile

RUN pnpm run build --filter @drawing-app/types \
 && pnpm run build --filter client


 FROM node:20-alpine AS runner

WORKDIR /app

RUN npm install -g serve

COPY --from=builder /app/apps/client/dist ./dist

EXPOSE 5173

CMD ["serve", "-s", "dist", "-l", "5173"]
