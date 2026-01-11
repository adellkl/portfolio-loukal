import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import './Login.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

export const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    console.log('🔐 Tentative de connexion...');
    console.log('📡 API_URL:', API_URL);
    console.log('👤 Username:', username);
    console.log('🔑 Password:', password ? '***' : 'vide');

    try {
      const requestBody = { username, password };
      console.log('📤 Requête POST vers:', `${API_URL}/auth/login`);
      console.log('📦 Body:', { username, password: '***' });

      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      console.log('📥 Réponse reçue - Status:', response.status);
      console.log('📥 Réponse reçue - OK:', response.ok);

      const data = await response.json();
      console.log('📦 Données reçues:', data);

      if (!response.ok) {
        console.error('❌ Erreur de réponse:', data);
        throw new Error(data.error || 'Erreur de connexion');
      }

      console.log('✅ Connexion réussie!');
      console.log('🎫 Token reçu:', data.token ? 'Oui' : 'Non');
      console.log('👤 User:', data.user);

      // Stocker le token
      localStorage.setItem('adminToken', data.token);
      localStorage.setItem('adminUser', JSON.stringify(data.user));
      console.log('💾 Token stocké dans localStorage');

      // Rediriger vers le tableau de bord
      console.log('🔄 Redirection vers /admin/dashboard');
      navigate('/admin/dashboard');
    } catch (err) {
      console.error('❌ Erreur lors de la connexion:', err);
      console.error('❌ Message d\'erreur:', err.message);
      console.error('❌ Stack:', err.stack);
      setError(err.message);
    } finally {
      setLoading(false);
      console.log('🏁 Fin de la tentative de connexion');
    }
  };

  return (
    <Container fluid className="admin-login-container">
      <Row className="justify-content-center align-items-center min-vh-100">
        <Col md={5} lg={4}>
          <Card className="login-card">
            <Card.Body className="p-4">
              <div className="text-center mb-4">
                <h2 className="mb-2">Connexion</h2>
                <p className="text-muted">Accédez au panneau d'administration</p>
              </div>

              {error && (
                <Alert variant="danger" dismissible onClose={() => setError('')}>
                  {error}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Nom d'utilisateur</Form.Label>
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Entrez votre nom d'utilisateur"
                    required
                    autoFocus
                    autoComplete="username"
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Mot de passe</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Entrez votre mot de passe"
                    required
                    autoComplete="current-password"
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  className="w-100"
                  disabled={loading}
                >
                  {loading ? 'Connexion...' : 'Se connecter'}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};