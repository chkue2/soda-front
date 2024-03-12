ARG NODE_VERSION=20.8.1
ARG NODE_ENV=production

# 베이스 이미지 설정
FROM node:${NODE_VERSION}-alpine as base

RUN npm i -g pnpm && npm i -g npm@latest

ARG API_URL


# 환경변수 설정
ENV NODE_ENV=${NODE_ENV}
ENV API_URL=${API_URL}

FROM base as build

WORKDIR /app

#COPY package.json .
#COPY pnpm-lock.yaml .
#COPY package-lock.json .



COPY . .
#COPY assets .
#COPY components .
#COPY layouts .
#COPY middleware .
#COPY pages .
#COPY public .
#COPY server .
#COPY store .
#COPY utils .
#COPY .eslintrc.cjs .
#COPY nuxt.config.ts .
#COPY tsconfig.json .
#COPY .npmrc .

RUN pnpm install -r
RUN pnpm build

FROM node:${NODE_VERSION}-alpine as runner

ARG PORT=3000
ENV NODE_ENV=production
ENV PORT=${PORT}


WORKDIR /app

COPY --from=build /app/.output /app/.output
CMD [ "node", "/app/.output/server/index.mjs" ]