#!/bin/bash

# Script pour configurer PostgreSQL pour le portfolio

echo "🔧 Configuration de PostgreSQL pour le portfolio..."

# Ajouter PostgreSQL au PATH si nécessaire
export PATH="/opt/homebrew/opt/postgresql@15/bin:$PATH"

# Vérifier si PostgreSQL est démarré
if ! pg_isready -h localhost -p 5432 > /dev/null 2>&1; then
    echo "⚠️  PostgreSQL n'est pas démarré. Démarrage..."
    brew services start postgresql@15
    sleep 2
fi

# Nom de la base de données
DB_NAME="portfolio_db"

# Vérifier si la base de données existe
if psql -lqt | cut -d \| -f 1 | grep -qw "$DB_NAME"; then
    echo "✅ La base de données '$DB_NAME' existe déjà"
else
    echo "📦 Création de la base de données '$DB_NAME'..."
    createdb "$DB_NAME"
    if [ $? -eq 0 ]; then
        echo "✅ Base de données créée avec succès"
    else
        echo "❌ Erreur lors de la création de la base de données"
        exit 1
    fi
fi

echo ""
echo "✅ Configuration terminée!"
echo ""
echo "📝 Prochaines étapes:"
echo "1. Créez le fichier .env dans le dossier backend/"
echo "2. Configurez les variables DB_USER et DB_PASSWORD si nécessaire"
echo "3. Démarrez le serveur avec: npm run dev"
echo ""