-- Script d'initialisation de la base de données PostgreSQL
-- Exécuter ce script pour créer la base de données et l'utilisateur

-- Créer la base de données (exécuter en tant que superutilisateur)
-- CREATE DATABASE portfolio_db;

-- Créer un utilisateur (optionnel, vous pouvez utiliser votre utilisateur actuel)
-- CREATE USER portfolio_user WITH PASSWORD 'votre_mot_de_passe';
-- GRANT ALL PRIVILEGES ON DATABASE portfolio_db TO portfolio_user;

-- Se connecter à la base de données portfolio_db avant d'exécuter les commandes suivantes

-- Créer la table des projets
CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY,
  ordre INTEGER NOT NULL DEFAULT 0,
  titre VARCHAR(255) NOT NULL,
  lien TEXT NOT NULL,
  couleur_hover VARCHAR(7) NOT NULL DEFAULT '#007bff',
  description TEXT NOT NULL,
  date DATE NOT NULL,
  img TEXT,
  technologies JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Créer la table des administrateurs
CREATE TABLE IF NOT EXISTS admins (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Créer un index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_projects_ordre ON projects(ordre);
CREATE INDEX IF NOT EXISTS idx_projects_date ON projects(date);