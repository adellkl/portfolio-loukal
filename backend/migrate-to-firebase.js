/**
 * Script de migration de PostgreSQL vers Firebase Firestore
 * 
 * Usage:
 * 1. Configurez vos variables d'environnement PostgreSQL et Firebase
 * 2. node migrate-to-firebase.js
 */

require('dotenv').config();
const admin = require('firebase-admin');
const { Pool } = require('pg');

// Configuration PostgreSQL (ancienne DB)
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'portfolio_db',
  user: process.env.DB_USER || 'adelloukal',
  password: process.env.DB_PASSWORD || '',
});

// Initialiser Firebase Admin
if (!admin.apps.length) {
  const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY
    ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)
    : require('./firebase-service-account.json');

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

async function migrateProjects() {
  console.log('📦 Migration des projets...');

  try {
    // Récupérer tous les projets de PostgreSQL
    const result = await pool.query('SELECT * FROM projects ORDER BY id');
    const projects = result.rows;

    console.log(`   Trouvé ${projects.length} projets à migrer`);

    const batch = db.batch();
    let count = 0;

    for (const project of projects) {
      const projectRef = db.collection('projects').doc(project.id.toString());

      // Convertir les données
      const firebaseProject = {
        ordre: project.ordre || 0,
        titre: project.titre,
        lien: project.lien,
        couleur_hover: project.couleur_hover || '#007bff',
        description: project.description,
        date: project.date,
        img: project.img || null,
        technologies: typeof project.technologies === 'string'
          ? JSON.parse(project.technologies)
          : (project.technologies || []),
        created_at: project.created_at ? admin.firestore.Timestamp.fromDate(new Date(project.created_at)) : admin.firestore.FieldValue.serverTimestamp(),
        updated_at: project.updated_at ? admin.firestore.Timestamp.fromDate(new Date(project.updated_at)) : admin.firestore.FieldValue.serverTimestamp()
      };

      batch.set(projectRef, firebaseProject);
      count++;

      // Firebase limite à 500 opérations par batch
      if (count >= 500) {
        await batch.commit();
        console.log(`   ✅ ${count} projets migrés`);
        count = 0;
      }
    }

    // Commit le reste
    if (count > 0) {
      await batch.commit();
      console.log(`   ✅ ${count} projets migrés`);
    }

    console.log(`✅ Migration des projets terminée: ${projects.length} projets migrés`);
  } catch (error) {
    console.error('❌ Erreur lors de la migration des projets:', error);
    throw error;
  }
}

async function migrateAdmins() {
  console.log('👤 Migration des administrateurs...');

  try {
    // Récupérer tous les admins de PostgreSQL
    const result = await pool.query('SELECT * FROM admins ORDER BY id');
    const admins = result.rows;

    console.log(`   Trouvé ${admins.length} administrateurs à migrer`);

    const batch = db.batch();

    for (const adminUser of admins) {
      const adminRef = db.collection('admins').doc(adminUser.id.toString());

      const firebaseAdmin = {
        username: adminUser.username,
        password: adminUser.password, // Le mot de passe est déjà hashé
        created_at: adminUser.created_at ? admin.firestore.Timestamp.fromDate(new Date(adminUser.created_at)) : admin.firestore.FieldValue.serverTimestamp()
      };

      batch.set(adminRef, firebaseAdmin);
    }

    await batch.commit();
    console.log(`✅ Migration des administrateurs terminée: ${admins.length} admins migrés`);
  } catch (error) {
    console.error('❌ Erreur lors de la migration des administrateurs:', error);
    throw error;
  }
}

async function main() {
  console.log('🚀 Début de la migration PostgreSQL → Firebase\n');

  try {
    // Tester la connexion PostgreSQL
    await pool.query('SELECT 1');
    console.log('✅ Connexion PostgreSQL OK\n');

    // Migrer les données
    await migrateProjects();
    console.log('');
    await migrateAdmins();

    console.log('\n✅ Migration terminée avec succès!');
    console.log('⚠️  N\'oubliez pas de mettre à jour database.js pour utiliser Firebase');

  } catch (error) {
    console.error('\n❌ Erreur lors de la migration:', error);
    process.exit(1);
  } finally {
    await pool.end();
    process.exit(0);
  }
}

main();
