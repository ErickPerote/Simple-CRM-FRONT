# Use a imagem base do Node.js para construir o aplicativo Angular
FROM node:14-alpine as build

# Diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie o package.json e o package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o código-fonte para o diretório de trabalho
COPY . .

# Execute o comando de compilação do Angular
RUN npm run build

# Use uma imagem base leve para servir o aplicativo Angular
FROM nginx:alpine

# Copie o diretório de compilação do aplicativo Angular para o diretório de trabalho do Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Exponha a porta em que o frontend estará disponível (substitua a porta 80, se necessário)
EXPOSE 80

# O Nginx é iniciado automaticamente pela imagem base do Nginx, então não é necessário um comando de inicialização aqui
