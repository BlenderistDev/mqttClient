FROM node:latest
COPY . /app
WORKDIR /app/front
RUN npm install
RUN npm run build
WORKDIR /app
RUN npm install
ENTRYPOINT [ "./start.sh" ]