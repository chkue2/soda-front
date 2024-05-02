ARG NODE_VERSION=20.8.1
ARG NODE_ENV=production

# 베이스 이미지 설정
FROM node:${NODE_VERSION}-alpine as base

ARG API_URL

ENV API_URL=${API_URL}
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable
COPY . /app
WORKDIR /app

FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile


FROM base AS build

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run build

FROM node:${NODE_VERSION}-alpine

WORKDIR /app
ARG PORT=3000
ENV NODE_ENV=production
ENV PORT=${PORT}

# /app 폴더 초기화는 별도로 필요하지 않음. 새로운 이미지에서는 /app이 이미 비어 있음.
# build 스테이지에서 생성된 .output 폴더만을 복사
COPY --from=build /app/.output /app/.output

CMD ["node", "/app/.output/server/index.mjs"]