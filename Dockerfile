FROM node:lts-alpine
COPY . /app
WORKDIR /app
RUN /app/install.sh
ENV CONFIG_DIR /data
ENTRYPOINT ["/app/launch.sh" ]
