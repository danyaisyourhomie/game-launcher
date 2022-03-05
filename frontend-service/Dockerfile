# FROM node:14.15-alpine as base

# WORKDIR /usr/src/frontend

# # Installing dependencies
# COPY package*.json /usr/src/frontend
# RUN npm install

# # Copying source files
# COPY . /usr/src/frontend

# # Building app
# RUN npm run build
# EXPOSE 3000

# # Running the app
# CMD "npm" "run" "dev"

# FROM node:12
# WORKDIR /usr/src/frontend

# COPY . ./

# # building the app
# RUN npm i
# RUN npm run build

# # Running the app
# CMD [ "npm", "start" ]


FROM node:current-alpine as base
WORKDIR /usr/src/frontend
COPY package.json ./
RUN npm install
COPY . .

# Linux + Node + Source + Project dependencies + build assets
FROM base AS build
ENV NODE_ENV=production
WORKDIR /build
COPY --from=base /usr/src/frontend ./
RUN npm run build

# We keep some artifacts from build
FROM node:current-alpine AS production
ENV NODE_ENV=production
WORKDIR /app
COPY --from=build /build/package*.json ./
COPY --from=build /build/.next ./.next
COPY --from=build /build/public ./public
RUN npm install next

EXPOSE 3000
CMD npm run start
