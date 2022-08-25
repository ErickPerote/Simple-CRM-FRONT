#stage 1
FROM node:latest as node
WORKDIR /simpleCRM-Front
COPY . .
RUN npm install
RUN npm run build --prod

#stage 2
FROM nginx:alpine
COPY --from=node /simpleCRM-Front/dist/simple-crm-front /usr/share/nginx/html

# Expose port 80
EXPOSE 80