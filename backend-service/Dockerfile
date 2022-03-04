FROM node:16-alpine3.15 AS development

WORKDIR /usr/src/backend

COPY package.json ./
COPY package-lock.json ./

RUN npm i -f  --silent

COPY . .

RUN npm run build

## PRODUCTION
FROM node:16-alpine3.15 AS production

# Set node env to prod
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/backend

COPY --from=development / /usr/src/rest

# EXPOSING PORT FOR OUTER WORLD
EXPOSE 3000

# Run app
CMD [ "node", "dist/main" ]