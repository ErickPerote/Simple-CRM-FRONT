#stage 1
FROM node:16.17.0 as node
WORKDIR /simpleCRM-Front
COPY package.json ./

RUN npm cache clean --force
RUN npm install

COPY . .
RUN npm run build --prod

#stage 2
FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=node /simpleCRM-Front/dist/simple-crm-front /usr/share/nginx/html

# Expose port 80
EXPOSE 80
