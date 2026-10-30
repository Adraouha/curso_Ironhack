# Imagen base oficial y ligera de Node.js
FROM node:20-alpine

# Carpeta de trabajo dentro del contenedor
WORKDIR /app

# Copia de los archivos de dependencias
COPY package*.json ./

# Instalacion limpia de dependencias de produccion
RUN npm install --production

# Copia del codigo fuente
COPY . .

# Puerto expuesto por el contenedor
EXPOSE 3000

# Comando para arrancar el servidor
CMD ["node", "server.js"]
