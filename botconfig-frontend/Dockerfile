FROM node:8.7.0-alpine
EXPOSE 8080
COPY package.json yarn.lock ./
RUN yarn --pure-lockfile
COPY . .
CMD yarn run dev