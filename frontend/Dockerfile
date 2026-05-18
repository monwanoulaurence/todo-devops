# ── Étape 1 : Build de l'app React ──────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Copier les dépendances et les installer
COPY package.json .
RUN npm install

# Copier le reste du code et builder
COPY . .
RUN npm run build

# ── Étape 2 : Servir avec Nginx (léger en prod) ──────────────────
FROM nginx:alpine

# Copier le build React dans Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Config Nginx pour que React Router fonctionne
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
