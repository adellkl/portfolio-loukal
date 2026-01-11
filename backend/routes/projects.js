const express = require('express');
const router = express.Router();
const { projectQueries } = require('../database');
const { authenticateToken } = require('../middleware/auth');

// Route publique : Récupérer tous les projets
router.get('/', async (req, res) => {
  try {
    const projects = await projectQueries.getAll();
    // Parser les technologies si c'est une chaîne JSON
    const formattedProjects = projects.map(project => ({
      ...project,
      technologies: typeof project.technologies === 'string' 
        ? JSON.parse(project.technologies || '[]') 
        : project.technologies
    }));
    res.json(formattedProjects);
  } catch (error) {
    console.error('Erreur lors de la récupération des projets:', error);
    res.status(500).json({ error: 'Erreur serveur lors de la récupération des projets' });
  }
});

// Route publique : Récupérer un projet par ID
router.get('/:id', async (req, res) => {
  try {
    const project = await projectQueries.getById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: 'Projet non trouvé' });
    }
    
    // Parser les technologies si c'est une chaîne JSON
    project.technologies = typeof project.technologies === 'string' 
      ? JSON.parse(project.technologies || '[]') 
      : project.technologies;
    
    res.json(project);
  } catch (error) {
    console.error('Erreur lors de la récupération du projet:', error);
    res.status(500).json({ error: 'Erreur serveur lors de la récupération du projet' });
  }
});

// Routes protégées (nécessitent une authentification)

// Créer un projet
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { ordre, titre, lien, couleur_hover, description, date, img, technologies } = req.body;

    // Validation des champs requis
    if (!titre || !lien || !description || !date) {
      return res.status(400).json({ error: 'Titre, lien, description et date sont requis' });
    }

    const project = await projectQueries.create({
      ordre: ordre || 0,
      titre,
      lien,
      couleur_hover: couleur_hover || '#007bff',
      description,
      date,
      img: img || null,
      technologies: technologies || []
    });

    // Parser les technologies pour la réponse
    project.technologies = typeof project.technologies === 'string' 
      ? JSON.parse(project.technologies || '[]') 
      : project.technologies;

    res.status(201).json(project);
  } catch (error) {
    console.error('Erreur lors de la création du projet:', error);
    res.status(500).json({ error: 'Erreur serveur lors de la création du projet' });
  }
});

// Mettre à jour un projet
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { ordre, titre, lien, couleur_hover, description, date, img, technologies } = req.body;

    // Vérifier que le projet existe
    const existingProject = await projectQueries.getById(id);
    if (!existingProject) {
      return res.status(404).json({ error: 'Projet non trouvé' });
    }

    const project = await projectQueries.update(id, {
      ordre: ordre !== undefined ? ordre : existingProject.ordre,
      titre: titre || existingProject.titre,
      lien: lien || existingProject.lien,
      couleur_hover: couleur_hover || existingProject.couleur_hover,
      description: description || existingProject.description,
      date: date || existingProject.date,
      img: img !== undefined ? img : existingProject.img,
      technologies: technologies || existingProject.technologies
    });

    // Parser les technologies pour la réponse
    project.technologies = typeof project.technologies === 'string' 
      ? JSON.parse(project.technologies || '[]') 
      : project.technologies;

    res.json(project);
  } catch (error) {
    console.error('Erreur lors de la mise à jour du projet:', error);
    res.status(500).json({ error: 'Erreur serveur lors de la mise à jour du projet' });
  }
});

// Supprimer un projet
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await projectQueries.delete(id);
    
    if (!result.deleted) {
      return res.status(404).json({ error: 'Projet non trouvé' });
    }

    res.json({ message: 'Projet supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression du projet:', error);
    res.status(500).json({ error: 'Erreur serveur lors de la suppression du projet' });
  }
});

module.exports = router;