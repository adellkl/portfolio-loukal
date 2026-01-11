# Backend API - Portfolio

## Prérequis

- Node.js (version 14 ou supérieure)
- PostgreSQL 15 (installé via Homebrew)
- PostgreSQL doit être démarré

## Installation

1. Installer les dépendances:
```bash
cd backend
npm install
```

2. Créer la base de données PostgreSQL:

```bash
# Se connecter à PostgreSQL
psql postgres

# Dans psql, créer la base de données
CREATE DATABASE portfolio_db;

# Quitter psql
\q
```

3. Créer un fichier `.env` à la racine du dossier `backend` avec le contenu suivant:
```
PORT=5000
JWT_SECRET=votre_secret_jwt_tres_securise_changez_moi
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123

# Configuration PostgreSQL
DB_HOST=localhost
DB_PORT=5432
DB_NAME=portfolio_db
DB_USER=votre_utilisateur_postgres
DB_PASSWORD=votre_mot_de_passe_postgres
```

**⚠️ IMPORTANT:** 
- Changez le `JWT_SECRET` et les identifiants admin par défaut pour la production!
- Remplacez `DB_USER` par votre nom d'utilisateur PostgreSQL (par défaut, c'est souvent votre nom d'utilisateur système)
- Si votre PostgreSQL n'a pas de mot de passe, laissez `DB_PASSWORD` vide

## Démarrage

### Vérifier que PostgreSQL est démarré:
```bash
brew services list | grep postgresql
```

Si ce n'est pas démarré:
```bash
brew services start postgresql@15
```

### Mode développement (avec nodemon):
```bash
npm run dev
```

### Mode production:
```bash
npm start
```

Le serveur démarre sur `http://localhost:5000`

Les tables sont créées automatiquement au premier démarrage.

## API Endpoints

### Authentification

- `POST /api/auth/login` - Connexion admin
  - Body: `{ username: string, password: string }`
  - Retourne: `{ token: string, user: { id, username } }`

- `GET /api/auth/verify` - Vérifier le token (protégé)
  - Headers: `Authorization: Bearer <token>`

### Projets

- `GET /api/projects` - Récupérer tous les projets (public)
- `GET /api/projects/:id` - Récupérer un projet par ID (public)
- `POST /api/projects` - Créer un projet (protégé)
  - Headers: `Authorization: Bearer <token>`
  - Body: `{ ordre, titre, lien, couleur_hover, description, date, img?, technologies? }`
- `PUT /api/projects/:id` - Mettre à jour un projet (protégé)
  - Headers: `Authorization: Bearer <token>`
- `DELETE /api/projects/:id` - Supprimer un projet (protégé)
  - Headers: `Authorization: Bearer <token>`

## Base de données

La base de données PostgreSQL est utilisée. Les tables sont créées automatiquement au premier démarrage du serveur.

Un compte admin par défaut est créé automatiquement avec les identifiants définis dans `.env`.

### Commandes utiles PostgreSQL

```bash
# Se connecter à la base de données
psql -d portfolio_db

# Lister les tables
\dt

# Voir la structure d'une table
\d projects

# Quitter psql
\q
```