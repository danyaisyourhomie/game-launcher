# Dockerfile

# base image
FROM node:alpine


WORKDIR /usr/src/frontend

# copy source files
COPY . /

# install dependencies
RUN npm install

# start app
RUN npm run build

EXPOSE 3000
CMD npm run start