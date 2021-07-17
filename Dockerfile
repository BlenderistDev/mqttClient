FROM node:lts-alpine
COPY . /app
WORKDIR /app
RUN /app/install.sh
ENTRYPOINT ["/app/utils/start.sh" ]
