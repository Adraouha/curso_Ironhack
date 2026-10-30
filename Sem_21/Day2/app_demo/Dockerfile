# Imagen base ligera de Node.js sobre Linux Alpine
FROM node:20-alpine

# Directorio de trabajo en el contenedor
WORKDIR /app

# Copia de package.json
COPY package*.json ./

# Instalacion de dependencias
RUN npm install --production

# Copia de todo el contenido de la aplicacion
COPY . .

# Informar que la aplicacion utiliza el puerto 3000
EXPOSE 3000

# Comando por defecto para arrancar la aplicacion
CMD ["node", "server.js"]
