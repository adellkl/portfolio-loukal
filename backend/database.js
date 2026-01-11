const { Pool } = require('pg');
const bcrypt = require('bcryptjs');

// Configuration de la connexion PostgreSQL
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'portfolio_db',
  user: process.env.DB_USER || process.env.USER || 'adelloukal',
  password: process.env.DB_PASSWORD || '',
});

// Tester la connexion
pool.on('connect', () => {
  console.log('Connexion à PostgreSQL réussie');
});

pool.on('error', (err) => {
  console.error('Erreur de connexion PostgreSQL:', err);
});

// Initialiser la base de données
async function initializeDatabase() {
  const client = await pool.connect();
  
  try {
    // Créer la table des projets
    await client.query(`
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
      )
    `);
    console.log('Table projects créée ou déjà existante');

    // Créer la table des administrateurs
    await client.query(`
      CREATE TABLE IF NOT EXISTS admins (
        id SERIAL PRIMARY KEY,
        username VARCHAR(100) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Table admins créée ou déjà existante');

    // Créer un admin par défaut si la table est vide
    await createDefaultAdmin(client);
  } catch (err) {
    console.error('Erreur lors de l\'initialisation de la base de données:', err);
  } finally {
    client.release();
  }
}

// Créer un administrateur par défaut
async function createDefaultAdmin(client) {
  try {
    const result = await client.query('SELECT COUNT(*) as count FROM admins');
    const count = parseInt(result.rows[0].count);
    
    if (count === 0) {
      const defaultPassword = process.env.ADMIN_PASSWORD || 'admin123';
      const hashedPassword = bcrypt.hashSync(defaultPassword, 10);
      const defaultUsername = process.env.ADMIN_USERNAME || 'admin';
      
      await client.query(
        'INSERT INTO admins (username, password) VALUES ($1, $2)',
        [defaultUsername, hashedPassword]
      );
      
      console.log(`Admin par défaut créé: ${defaultUsername} / ${defaultPassword}`);
    }
  } catch (err) {
    console.error('Erreur lors de la création de l\'admin par défaut:', err);
  }
}

// Initialiser au démarrage
initializeDatabase().catch(console.error);

// Fonctions utilitaires pour les projets
const projectQueries = {
  getAll: async () => {
    try {
      const result = await pool.query(
        'SELECT * FROM projects ORDER BY ordre ASC, created_at DESC'
      );
      return result.rows;
    } catch (err) {
      throw err;
    }
  },

  getById: async (id) => {
    try {
      const result = await pool.query('SELECT * FROM projects WHERE id = $1', [id]);
      return result.rows[0] || null;
    } catch (err) {
      throw err;
    }
  },

  create: async (project) => {
    try {
      const { ordre, titre, lien, couleur_hover, description, date, img, technologies } = project;
      const technologiesJson = Array.isArray(technologies) 
        ? JSON.stringify(technologies) 
        : (technologies || '[]');
      
      const result = await pool.query(
        `INSERT INTO projects (ordre, titre, lien, couleur_hover, description, date, img, technologies, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8::jsonb, CURRENT_TIMESTAMP)
         RETURNING *`,
        [ordre, titre, lien, couleur_hover, description, date, img, technologiesJson]
      );
      
      return result.rows[0];
    } catch (err) {
      throw err;
    }
  },

  update: async (id, project) => {
    try {
      const { ordre, titre, lien, couleur_hover, description, date, img, technologies } = project;
      const technologiesJson = Array.isArray(technologies) 
        ? JSON.stringify(technologies) 
        : (technologies || '[]');
      
      const result = await pool.query(
        `UPDATE projects 
         SET ordre = $1, titre = $2, lien = $3, couleur_hover = $4, description = $5, 
             date = $6, img = $7, technologies = $8::jsonb, updated_at = CURRENT_TIMESTAMP
         WHERE id = $9
         RETURNING *`,
        [ordre, titre, lien, couleur_hover, description, date, img, technologiesJson, id]
      );
      
      return result.rows[0] || null;
    } catch (err) {
      throw err;
    }
  },

  delete: async (id) => {
    try {
      const result = await pool.query('DELETE FROM projects WHERE id = $1 RETURNING id', [id]);
      return { deleted: result.rows.length > 0 };
    } catch (err) {
      throw err;
    }
  }
};

// Fonctions utilitaires pour les admins
const adminQueries = {
  findByUsername: async (username) => {
    try {
      const result = await pool.query('SELECT * FROM admins WHERE username = $1', [username]);
      return result.rows[0] || null;
    } catch (err) {
      throw err;
    }
  },
  findById: async (id) => {
    try {
      const result = await pool.query('SELECT * FROM admins WHERE id = $1', [id]);
      return result.rows[0] || null;
    } catch (err) {
      throw err;
    }
  },
  updatePassword: async (id, hashedPassword) => {
    try {
      const result = await pool.query(
        'UPDATE admins SET password = $1 WHERE id = $2 RETURNING id, username',
        [hashedPassword, id]
      );
      return result.rows[0] || null;
    } catch (err) {
      throw err;
    }
  }
};

module.exports = {
  pool,
  projectQueries,
  adminQueries
};