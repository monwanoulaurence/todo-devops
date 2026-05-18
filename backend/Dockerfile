# Étape 1 : image de base Node.js légère
FROM node:20-alpine

# Étape 2 : dossier de travail dans le conteneur
WORKDIR /app

# Étape 3 : copier les fichiers de dépendances et les installer
COPY package.json .
RUN npm install --production

# Étape 4 : copier le reste du code
COPY . .

# Étape 5 : exposer le port utilisé par l'app
EXPOSE 5000

# Étape 6 : commande de démarrage
CMD ["node", "src/index.js"]
