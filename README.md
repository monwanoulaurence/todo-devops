# projetDevOps

# Todo DevOps — OVH Cloud OpenStack

Application Todo multi-composants déployée avec les pratiques DevOps.

## 🏗️ Architecture

```
┌─────────────────────────────────────────────┐
│                  Utilisateur                 │
└──────────────────────┬──────────────────────┘
                       │ http://localhost:3000
┌──────────────────────▼──────────────────────┐
│         Frontend (React + Nginx)             │
│              port 80 (interne)               │
└──────────────────────┬──────────────────────┘
                       │ /todos → http://backend:5000
┌──────────────────────▼──────────────────────┐
│           Backend (Node.js + Express)        │
│                   port 5000                  │
└──────────────────────┬──────────────────────┘
                       │ SQL
┌──────────────────────▼──────────────────────┐
│              Base de données                 │
│               PostgreSQL 15                  │
└─────────────────────────────────────────────┘
```

## 📁 Structure du projet

```
todo-devops/
├── frontend/
│   ├── src/
│   │   ├── App.jsx        # Composant principal React
│   │   ├── main.jsx       # Point d'entrée
│   │   └── index.css      # Styles
│   ├── index.html
│   ├── vite.config.js
│   ├── nginx.conf         # Config Nginx (proxy vers backend)
│   ├── package.json
│   └── Dockerfile         # Build multi-étape (Node → Nginx)
│
├── backend/
│   ├── src/
│   │   └── index.js       # API Express (CRUD todos)
│   ├── package.json
│   └── Dockerfile
│
├── docker-compose.yml     # Orchestration locale
├── .gitignore
└── README.md
```

## ⚙️ Prérequis

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installé
- [Git](https://git-scm.com/) installé
- Un compte [GitHub](https://github.com)

## 🛠️ Installation & Démarrage

### 1. Cloner le dépôt

```bash
git clone https://github.com/VOTRE_ORG/projetDevOps.git
cd todo-devops
```

### 2. Lancer l'application

```bash
docker compose up --build
```

La première fois, Docker va :
1. Télécharger les images de base (Node, Nginx, PostgreSQL)
2. Builder les images frontend et backend
3. Démarrer les 3 conteneurs

### 3. Ouvrir l'application

👉 http://localhost:3000

### 4. Arrêter l'application

```bash
docker compose down
```

Pour aussi supprimer les données de la BDD :
```bash
docker compose down -v
```

## 🔍 Commandes utiles

```bash
# Voir les logs de tous les services
docker compose logs -f

# Voir les logs d'un seul service
docker compose logs -f backend

# Voir les conteneurs qui tournent
docker compose ps

# Rebuilder un seul service après modification du code
docker compose up --build backend

# Entrer dans le conteneur backend (pour déboguer)
docker compose exec backend sh
```

## 🌐 API Backend

| Méthode | Route | Description |
|---------|-------|-------------|
| GET | `/health` | Vérifier que l'API tourne |
| GET | `/todos` | Récupérer toutes les tâches |
| POST | `/todos` | Créer une tâche `{ "title": "..." }` |
| PATCH | `/todos/:id` | Basculer terminé/non terminé |
| DELETE | `/todos/:id` | Supprimer une tâche |

## 👥 Équipe & Rôles DevOps

| Personne | Rôle |
|---------|------|
| P1 | Backend (Node.js) + BDD |
| P2 | Frontend (React) |
| P3 | Dockerfiles + structure Git |
| P4 | docker-compose + tests locaux |
