FROM node:8.12

WORKDIR /usr/src/app

# copy only the package.json and yarn.lock first so that we can cache this step
COPY package.json ./
COPY yarn.lock ./
RUN yarn

COPY . .
RUN yarn build

ARG COMMIT_HASH
LABEL maintainer="michael@birdbrain.com.au"
LABEL commit=$COMMIT_HASH

EXPOSE 3000
ENV NODE_ENV production
ENV REDIS_ENABLED enabled
ENV PORT 3000

RUN echo total folder sizes:  && \
    du -hs ./*

CMD [ "node",  "compiled/server.js" ]
