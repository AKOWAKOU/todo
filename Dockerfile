# Étape 1 : Construire l'application
FROM node:16 AS build

# Définir le répertoire de travail
WORKDIR /app

# Copier package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install && npm install axios cors 

# Copier le reste des fichiers de l'application
COPY . .

# Construire l'application pour la production
RUN npm run build

# Étape 2 : Servir l'application
FROM nginx:alpine

# Copier les fichiers construits vers le dossier de NGINX
COPY --from=build /app/build /usr/share/nginx/html

# Exposer le port sur lequel NGINX sera en écoute
EXPOSE 80

# Commande pour démarrer NGINX
CMD ["nginx", "-g", "daemon off;"]
