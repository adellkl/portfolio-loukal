const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { adminQueries } = require('../database');

// Route de connexion
router.post('/login', async (req, res) => {
  try {
    console.log('🔐 [AUTH] Tentative de connexion reçue');
    console.log('📦 [AUTH] Body:', { username: req.body.username, password: req.body.password ? '***' : 'vide' });
    
    const { username, password } = req.body;

    if (!username || !password) {
      console.log('❌ [AUTH] Champs manquants');
      return res.status(400).json({ error: 'Nom d\'utilisateur et mot de passe requis' });
    }

    console.log('🔍 [AUTH] Recherche de l\'admin:', username);
    // Trouver l'admin
    const admin = await adminQueries.findByUsername(username);
    
    if (!admin) {
      console.log('❌ [AUTH] Admin non trouvé:', username);
      return res.status(401).json({ error: 'Identifiants invalides' });
    }

    console.log('✅ [AUTH] Admin trouvé, ID:', admin.id);
    console.log('🔐 [AUTH] Vérification du mot de passe...');
    
    // Vérifier le mot de passe
    const isValidPassword = await bcrypt.compare(password, admin.password);
    
    if (!isValidPassword) {
      console.log('❌ [AUTH] Mot de passe invalide');
      return res.status(401).json({ error: 'Identifiants invalides' });
    }

    console.log('✅ [AUTH] Mot de passe valide');
    console.log('🎫 [AUTH] Génération du token JWT...');
    
    // Générer le token JWT
    const token = jwt.sign(
      { id: admin.id, username: admin.username },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    console.log('✅ [AUTH] Token généré avec succès');
    console.log('📤 [AUTH] Envoi de la réponse');

    res.json({
      token,
      user: {
        id: admin.id,
        username: admin.username
      }
    });
  } catch (error) {
    console.error('❌ [AUTH] Erreur lors de la connexion:', error);
    console.error('❌ [AUTH] Stack:', error.stack);
    res.status(500).json({ error: 'Erreur serveur lors de la connexion' });
  }
});

// Route de vérification du token
router.get('/verify', require('../middleware/auth').authenticateToken, (req, res) => {
  res.json({ valid: true, user: req.user });
});

// Route pour changer le mot de passe
router.post('/change-password', require('../middleware/auth').authenticateToken, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.id;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Ancien mot de passe et nouveau mot de passe requis' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ error: 'Le nouveau mot de passe doit contenir au moins 6 caractères' });
    }

    // Récupérer l'admin
    const admin = await adminQueries.findById(userId);
    if (!admin) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    // Vérifier l'ancien mot de passe
    const isValidPassword = await bcrypt.compare(currentPassword, admin.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Ancien mot de passe incorrect' });
    }

    // Hasher le nouveau mot de passe
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Mettre à jour le mot de passe
    await adminQueries.updatePassword(userId, hashedNewPassword);

    res.json({ message: 'Mot de passe modifié avec succès' });
  } catch (error) {
    console.error('Erreur lors du changement de mot de passe:', error);
    res.status(500).json({ error: 'Erreur serveur lors du changement de mot de passe' });
  }
});

module.exports = router;