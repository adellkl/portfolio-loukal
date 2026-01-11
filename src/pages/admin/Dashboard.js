import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

export const AdminDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    ordre: 0,
    titre: '',
    lien: '',
    couleur_hover: '#4a9eff',
    description: '',
    date: new Date().toISOString().split('T')[0],
    img: '',
    technologies: []
  });

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
    } else {
      fetchProjects();
    }
    
    // Ajouter la classe pour cacher la scrollbar du body
    document.body.classList.add('dashboard-active');
    
    // Retirer la classe quand le composant est démonté
    return () => {
      document.body.classList.remove('dashboard-active');
    };
  }, [navigate]);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('adminToken');
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  };

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/projects`);
      if (!response.ok) throw new Error('Erreur lors du chargement des projets');
      const data = await response.json();
      // Filtrer les projets avec ordre entre 1 et 6 et trier par ordre
      const filteredProjects = data.filter(p => {
        const ordre = p.ordre || 0;
        return ordre >= 1 && ordre <= 6;
      });
      const sortedProjects = filteredProjects.sort((a, b) => (a.ordre || 0) - (b.ordre || 0));
      setProjects(sortedProjects);
    } catch (err) {
      setError('Erreur lors du chargement des projets: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin/login');
  };

  const handleOpenModal = (project = null) => {
    // Récupérer la date sauvegardée depuis localStorage
    const savedDate = localStorage.getItem('lastProjectDate') || new Date().toISOString().split('T')[0];
    
    if (project) {
      setEditingProject(project);
      setFormData({
        ordre: project.ordre || 0,
        titre: project.titre || '',
        lien: project.lien || '',
        couleur_hover: project.couleur_hover || '#4a9eff',
        description: project.description || '',
        date: project.date || savedDate,
        img: project.img || '',
        technologies: Array.isArray(project.technologies) 
          ? project.technologies 
          : (typeof project.technologies === 'string' ? JSON.parse(project.technologies || '[]') : [])
      });
    } else {
      setEditingProject(null);
      setFormData({
        ordre: 0,
        titre: '',
        lien: '',
        couleur_hover: '#4a9eff',
        description: '',
        date: savedDate,
        img: '',
        technologies: []
      });
    }
    setShowModal(true);
    setError('');
    setSuccess('');
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingProject(null);
    setError('');
    setSuccess('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Sauvegarder la date dans localStorage
    if (name === 'date') {
      localStorage.setItem('lastProjectDate', value);
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Vérifier que c'est une image
    if (!file.type.startsWith('image/')) {
      setError('Veuillez sélectionner un fichier image');
      return;
    }

    // Vérifier la taille (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('L\'image est trop volumineuse (max 5MB)');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      // Convertir en base64
      const base64String = reader.result;
      setFormData(prev => ({
        ...prev,
        img: base64String
      }));
      setError('');
    };
    reader.onerror = () => {
      setError('Erreur lors de la lecture du fichier');
    };
    reader.readAsDataURL(file);
  };

  const handleTechnologiesChange = (e) => {
    const value = e.target.value;
    const technologies = value.split(',').map(tech => tech.trim()).filter(tech => tech);
    setFormData(prev => ({
      ...prev,
      technologies
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const url = editingProject 
        ? `${API_URL}/projects/${editingProject.id}`
        : `${API_URL}/projects`;
      
      const method = editingProject ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: getAuthHeaders(),
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Erreur lors de la sauvegarde');
      }

      setSuccess(editingProject ? 'Projet modifié avec succès!' : 'Projet ajouté avec succès!');
      
      // Sauvegarder la date pour la prochaine fois
      localStorage.setItem('lastProjectDate', formData.date);
      
      fetchProjects();
      setTimeout(() => {
        handleCloseModal();
      }, 1500);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce projet?')) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/projects/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la suppression');
      }

      setSuccess('Projet supprimé avec succès!');
      fetchProjects();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleMoveOrder = async (id, direction) => {
    try {
      const currentIndex = projects.findIndex(p => p.id === id);
      if (currentIndex === -1) return;

      const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
      if (newIndex < 0 || newIndex >= projects.length) return;

      const currentProject = projects[currentIndex];
      const targetProject = projects[newIndex];

      // Échanger les ordres
      const tempOrdre = currentProject.ordre;
      currentProject.ordre = targetProject.ordre;
      targetProject.ordre = tempOrdre;

      // Mettre à jour les deux projets
      const update1 = fetch(`${API_URL}/projects/${currentProject.id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          ...currentProject,
          ordre: currentProject.ordre
        })
      });

      const update2 = fetch(`${API_URL}/projects/${targetProject.id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          ...targetProject,
          ordre: targetProject.ordre
        })
      });

      await Promise.all([update1, update2]);

      setSuccess('Ordre mis à jour avec succès!');
      fetchProjects();
    } catch (err) {
      setError('Erreur lors du changement d\'ordre: ' + err.message);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('Les nouveaux mots de passe ne correspondent pas');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setError('Le nouveau mot de passe doit contenir au moins 6 caractères');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/auth/change-password`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Erreur lors du changement de mot de passe');
      }

      setSuccess('Mot de passe modifié avec succès!');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setTimeout(() => {
        setShowPasswordModal(false);
      }, 1500);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleOpenPasswordModal = () => {
    setShowPasswordModal(true);
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setShowPasswords({
      current: false,
      new: false,
      confirm: false
    });
    setError('');
    setSuccess('');
  };

  const handleClosePasswordModal = () => {
    setShowPasswordModal(false);
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setShowPasswords({
      current: false,
      new: false,
      confirm: false
    });
    setError('');
    setSuccess('');
  };

  const adminUser = JSON.parse(localStorage.getItem('adminUser') || '{}');

  if (loading && projects.length === 0) {
    return (
      <div className="dashboard-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div>Chargement...</div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div className="dashboard-header">
          <div>
            <h1>Gestion des Projets</h1>
            <p>Bonjour, {adminUser.username}</p>
          </div>
          <div className="dashboard-actions">
            <button onClick={() => handleOpenModal()} className="btn-primary-admin">
              + Ajouter un projet
            </button>
            <button onClick={handleOpenPasswordModal} className="btn-secondary-admin">
              Changer le mot de passe
            </button>
            <button onClick={handleLogout} className="btn-secondary-admin">
              Déconnexion
            </button>
          </div>
        </div>

        {/* Messages */}
        {error && (
          <div className="alert-admin alert-error">
            <span>{error}</span>
            <button onClick={() => setError('')} className="alert-close">×</button>
          </div>
        )}

        {success && (
          <div className="alert-admin alert-success">
            <span>{success}</span>
            <button onClick={() => setSuccess('')} className="alert-close">×</button>
          </div>
        )}

        {/* Projects Table */}
        <div className="projects-card">
          {projects.length === 0 ? (
            <div className="empty-state">
              <p style={{ marginBottom: '1rem' }}>Aucun projet trouvé.</p>
              <button onClick={() => handleOpenModal()} className="btn-primary-admin">
                Ajouter votre premier projet
              </button>
            </div>
          ) : (
            <div style={{ overflowX: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none' }} className="projects-table-wrapper">
              <table className="projects-table">
                <thead>
                  <tr>
                    <th>Ordre</th>
                    <th>Titre</th>
                    <th>Lien</th>
                    <th>Couleur</th>
                    <th>Date</th>
                    <th style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project, index) => (
                    <tr key={project.id}>
                      <td>{project.ordre}</td>
                      <td style={{ fontWeight: '500', color: '#ffffff' }}>{project.titre}</td>
                      <td>
                        <a href={project.lien} target="_blank" rel="noopener noreferrer" className="link-admin">
                          {project.lien.length > 40 ? project.lien.substring(0, 40) + '...' : project.lien}
                        </a>
                      </td>
                      <td>
                        <div className="color-preview" style={{ backgroundColor: project.couleur_hover }} />
                      </td>
                      <td style={{ color: '#888888' }}>{project.date}</td>
                      <td>
                        <div className="actions-cell">
                          <button
                            onClick={() => handleMoveOrder(project.id, 'up')}
                            className="btn-sm-admin btn-order"
                            disabled={index === 0}
                            title="Monter"
                          >
                            ↑
                          </button>
                          <button
                            onClick={() => handleMoveOrder(project.id, 'down')}
                            className="btn-sm-admin btn-order"
                            disabled={index === projects.length - 1}
                            title="Descendre"
                          >
                            ↓
                          </button>
                          <button onClick={() => handleOpenModal(project)} className="btn-sm-admin btn-edit">
                            Modifier
                          </button>
                          <button onClick={() => handleDelete(project.id)} className="btn-sm-admin btn-delete">
                            Supprimer
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content-admin" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-admin">
              <h2>{editingProject ? 'Modifier le projet' : 'Ajouter un projet'}</h2>
              <button onClick={handleCloseModal} className="modal-close">×</button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="modal-body-admin">
                {error && (
                  <div className="alert-admin alert-error" style={{ marginBottom: '1rem' }}>
                    <span>{error}</span>
                  </div>
                )}

                <div className="form-grid">
                  <div className="form-group-admin">
                    <label className="form-label-admin">Ordre *</label>
                    <input
                      type="number"
                      name="ordre"
                      value={formData.ordre}
                      onChange={handleInputChange}
                      required
                      className="form-input-admin"
                    />
                  </div>
                  <div className="form-group-admin">
                    <label className="form-label-admin">Date *</label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      required
                      className="form-input-admin"
                    />
                  </div>
                </div>

                <div className="form-group-admin">
                  <label className="form-label-admin">Titre *</label>
                  <input
                    type="text"
                    name="titre"
                    value={formData.titre}
                    onChange={handleInputChange}
                    required
                    className="form-input-admin"
                  />
                </div>

                <div className="form-group-admin">
                  <label className="form-label-admin">Lien *</label>
                  <input
                    type="url"
                    name="lien"
                    value={formData.lien}
                    onChange={handleInputChange}
                    required
                    placeholder="https://example.com"
                    className="form-input-admin"
                  />
                </div>

                <div className="form-grid">
                  <div className="form-group-admin">
                    <label className="form-label-admin">Couleur Hover *</label>
                    <input
                      type="color"
                      name="couleur_hover"
                      value={formData.couleur_hover}
                      onChange={handleInputChange}
                      required
                      className="form-color-admin"
                    />
                  </div>
                  <div className="form-group-admin">
                    <label className="form-label-admin">Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="form-file-admin"
                    />
                    {formData.img && (
                      <div className="image-preview-container">
                        <img 
                          src={formData.img} 
                          alt="Aperçu" 
                          className="image-preview"
                        />
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, img: '' }))}
                          className="image-remove-btn"
                        >
                          ×
                        </button>
                      </div>
                    )}
                    {!formData.img && (
                      <input
                        type="url"
                        name="img"
                        value={formData.img && formData.img.startsWith('http') ? formData.img : ''}
                        onChange={handleInputChange}
                        placeholder="Ou entrez une URL d'image"
                        className="form-input-admin"
                        style={{ marginTop: '0.5rem' }}
                      />
                    )}
                  </div>
                </div>

                <div className="form-group-admin">
                  <label className="form-label-admin">Description *</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="form-textarea-admin"
                  />
                </div>

                <div className="form-group-admin">
                  <label className="form-label-admin">Technologies (séparées par des virgules)</label>
                  <input
                    type="text"
                    name="technologies"
                    value={formData.technologies.join(', ')}
                    onChange={handleTechnologiesChange}
                    placeholder="React, Node.js, MongoDB"
                    className="form-input-admin"
                  />
                  <p className="form-hint">Exemple: React, Node.js, MongoDB, TailwindCSS</p>
                </div>
              </div>

              <div className="modal-footer-admin">
                <button type="button" onClick={handleCloseModal} className="btn-secondary-admin">
                  Annuler
                </button>
                <button type="submit" className="btn-primary-admin">
                  {editingProject ? 'Modifier' : 'Ajouter'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className="modal-overlay" onClick={handleClosePasswordModal}>
          <div className="modal-content-admin" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-admin">
              <h2>Changer le mot de passe</h2>
              <button onClick={handleClosePasswordModal} className="modal-close">×</button>
            </div>

            <form onSubmit={handlePasswordChange}>
              <div className="modal-body-admin">
                {error && (
                  <div className="alert-admin alert-error" style={{ marginBottom: '1rem' }}>
                    <span>{error}</span>
                  </div>
                )}

                {success && (
                  <div className="alert-admin alert-success" style={{ marginBottom: '1rem' }}>
                    <span>{success}</span>
                  </div>
                )}

                <div className="form-group-admin">
                  <label className="form-label-admin">Ancien mot de passe *</label>
                  <div className="password-input-wrapper">
                    <input
                      type={showPasswords.current ? "text" : "password"}
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                      required
                      className="form-input-admin"
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      className="password-toggle-btn"
                      onClick={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })}
                    >
                      {showPasswords.current ? '🙈' : '👁️'}
                    </button>
                  </div>
                </div>

                <div className="form-group-admin">
                  <label className="form-label-admin">Nouveau mot de passe *</label>
                  <div className="password-input-wrapper">
                    <input
                      type={showPasswords.new ? "text" : "password"}
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                      required
                      className="form-input-admin"
                      autoComplete="new-password"
                      minLength="6"
                    />
                    <button
                      type="button"
                      className="password-toggle-btn"
                      onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                    >
                      {showPasswords.new ? '🙈' : '👁️'}
                    </button>
                  </div>
                  <p className="form-hint">Le mot de passe doit contenir au moins 6 caractères</p>
                </div>

                <div className="form-group-admin">
                  <label className="form-label-admin">Confirmer le nouveau mot de passe *</label>
                  <div className="password-input-wrapper">
                    <input
                      type={showPasswords.confirm ? "text" : "password"}
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                      required
                      className="form-input-admin"
                      autoComplete="new-password"
                      minLength="6"
                    />
                    <button
                      type="button"
                      className="password-toggle-btn"
                      onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                    >
                      {showPasswords.confirm ? '🙈' : '👁️'}
                    </button>
                  </div>
                </div>
              </div>

              <div className="modal-footer-admin">
                <button type="button" onClick={handleClosePasswordModal} className="btn-secondary-admin">
                  Annuler
                </button>
                <button type="submit" className="btn-primary-admin">
                  Modifier le mot de passe
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};