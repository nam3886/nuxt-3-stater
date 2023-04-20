FROM node:16.16.0-alpine as build-stage
WORKDIR /app
COPY package*.json ./ \
    yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
ARG MODE
RUN yarn build:${MODE:-production}

# production stage
FROM node:16.16.0-alpine as production-stage
WORKDIR /app
COPY --from=build-stage /app/.output /app
RUN yarn install
RUN yarn global add pm2@latest
ENV PM2_PUBLIC_KEY ektcf70hwfq72mb
ENV PM2_SECRET_KEY oig0vuy9fa0wk69
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000
EXPOSE 3000
CMD ["pm2-runtime", "server/index.mjs"]
