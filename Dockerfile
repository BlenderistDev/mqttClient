FROM node:latest
COPY . /app
ENTRYPOINT [ "/app/start.sh" ]