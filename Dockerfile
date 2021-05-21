FROM node:lts-alpine
COPY . /app
WORKDIR /app/front
RUN npm install
RUN npm run build
WORKDIR /app
RUN npm install
ENTRYPOINT ["/app/utils/start.sh" ]
