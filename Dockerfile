FROM node:24-alpine AS builder
WORKDIR /app
COPY package.json ./
COPY pnpm-lock.yaml ./
ENV CI=true
RUN npm i --global pnpm
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build
RUN pnpm prune --prod

FROM node:24-alpine
WORKDIR /app
COPY --from=builder /app/build build/
COPY --from=builder /app/node_modules node_modules/
COPY package.json .
EXPOSE 3000
ENV NODE_ENV=production
ENV ORIGIN=https://pluralkit.xyz
CMD [ "node", "build" ]
