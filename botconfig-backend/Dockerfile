FROM node:8.7.0-alpine
EXPOSE 3000
COPY . /app
WORKDIR /app
RUN cd /app
RUN npm install
CMD node bin/www