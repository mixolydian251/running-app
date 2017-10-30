
# Dockerfile goes inside root directory generally named 'Dockerfile'

# Insert minimum viable image

FROM node:8-alpine

# App listens on 3000, so expose it
# Mongodb listens on 27017

EXPOSE 3000
EXPOSE 27017

# tini is a process manager to kill zombie processes

RUN apk add --update tini

# create a directory inside container to store app contents

RUN mkdir -p /usr/src/app

# switch to that directory

WORKDIR /usr/src/app

# Copy package.json , giving it the name package.json

COPY package.json package.json

# install dependanceies and clean up cache using "npm cache clean"

RUN npm install

# Copy everything from current local directory to current container directory

COPY . .

# CMD may vary depending on how your start script
# run tini, then node app.js

CMD ["tini", "--", "node", "app.js"]

# required: run this command when container is launched
# only one CMD allowed, so if there are mulitple, last one wins
