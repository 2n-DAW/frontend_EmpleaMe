# Etapa 1: Construcción
FROM node:22-alpine AS build

WORKDIR /app

# Copia los archivos de package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias (de forma rápida y segura)
RUN npm ci

# Copia el resto de los archivos de la aplicación
COPY . .

# Compila la aplicación Angular
RUN npm run build

# Etapa 2: Servidor de producción
FROM nginx:alpine

# Copia el resultado de la compilación desde la etapa de build
COPY --from=build /app/dist/frontend/browser /usr/share/nginx/html

# Copia una configuración personalizada de nginx si es necesario
COPY nginx.conf /etc/nginx/nginx.conf

# Etiquetas
LABEL autor="Francisco Montés Doria"
LABEL maintainer="f.montesdoria@gmail.com"
LABEL version="1.0"
LABEL description="Docker image for Angular 18 standalone application EmpleaMe"
LABEL repository="https://github.com/2n-DAW/frontend_EmpleaMe"
LABEL build-date="2023-07-01"

# Expone el puerto 80
EXPOSE 8080

# Comando para iniciar nginx
CMD ["nginx", "-g", "daemon off;"]