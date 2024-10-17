# Étape 1 : Construire l'application
FROM node:20

# Définir le répertoire de travail
WORKDIR /app

# Copier package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install 

# Copier le reste des fichiers de l'application
COPY . .

# Exposer le port sur lequel l'application sera servie
EXPOSE 3000

# Commande pour démarrer le serveur de développement intégré de React
CMD ["npm", "start"]
