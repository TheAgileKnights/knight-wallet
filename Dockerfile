ARG NODE_IMAGE=node:alpine3.21

FROM $NODE_IMAGE AS base
RUN apk --no-cache add dumb-init
RUN mkdir -p /home/node/app && chown node:node /home/node/app
WORKDIR /home/node/app
USER node
RUN mkdir tmp

FROM base AS dependencies
COPY --chown=node:node ./package*.json ./
RUN npm ci
COPY --chown=node:node . .

FROM dependencies AS build
RUN node ace build

FROM base AS production
ENV NODE_ENV=production
ENV PORT=${PORT:-3333}
ENV HOST=0.0.0.0
COPY --chown=node:node ./package*.json ./
RUN npm ci --omit=dev
COPY --chown=node:node --from=build /home/node/app/build .
EXPOSE $PORT
CMD [ "dumb-init", "node", "server.js" ]