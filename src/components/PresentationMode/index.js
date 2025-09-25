import React, { useState, useEffect } from 'react';
import { Modal, Button, Card, Row, Col, Badge } from 'react-bootstrap';
import './style.css';

const PresentationMode = ({ show, onHide }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const slides = [
    {
      title: "Adel Loukal",
      subtitle: "Développeur Full-Stack",
      content: (
        <div className="intro-slide">
          <div className="profile-section">
            <div className="profile-image">
              <img src="/moi.png" alt="Adel Loukal" />
            </div>
            <div className="profile-info">
              <h2>Adel Loukal</h2>
              <p className="role">Développeur Full-Stack Junior</p>
              <div className="contact-info">
                <p>📍 Paris, France</p>
                <p>💼 Recherche alternance 24 mois</p>
                <p>📅 Disponible immédiatement</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Compétences Techniques",
      subtitle: "Stack technologique maîtrisée",
      content: (
        <div className="skills-slide">
          <Row>
            <Col md={6}>
              <Card className="skill-category">
                <Card.Header>Frontend</Card.Header>
                <Card.Body>
                  <div className="skill-tags">
                    <Badge bg="primary">React.js</Badge>
                    <Badge bg="primary">JavaScript</Badge>
                    <Badge bg="primary">HTML5/CSS3</Badge>
                    <Badge bg="primary">Bootstrap</Badge>
                    <Badge bg="primary">GSAP</Badge>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="skill-category">
                <Card.Header>Backend & Outils</Card.Header>
                <Card.Body>
                  <div className="skill-tags">
                    <Badge bg="success">Node.js</Badge>
                    <Badge bg="success">Git/GitHub</Badge>
                    <Badge bg="success">API REST</Badge>
                    <Badge bg="success">Vercel</Badge>
                    <Badge bg="success">Responsive Design</Badge>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      )
    },
    {
      title: "Projets Phares",
      subtitle: "Réalisations concrètes",
      content: (
        <div className="projects-slide">
          <Row>
            <Col md={6}>
              <Card className="project-card">
                <Card.Header>
                  <h5>🥋 Alpha Fight Club</h5>
                  <Badge bg="success">En production</Badge>
                </Card.Header>
                <Card.Body>
                  <p>Site web pour club de grappling professionnel</p>
                  <ul>
                    <li>Design moderne et responsive</li>
                    <li>SEO optimisé</li>
                    <li>Déployé sur Vercel</li>
                  </ul>
                  <div className="tech-used">
                    <Badge bg="outline-primary" className="me-1">React</Badge>
                    <Badge bg="outline-primary" className="me-1">CSS3</Badge>
                    <Badge bg="outline-primary">Vercel</Badge>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="project-card">
                <Card.Header>
                  <h5>💼 Portfolio Personnel</h5>
                  <Badge bg="primary">Actuel</Badge>
                </Card.Header>
                <Card.Body>
                  <p>Portfolio interactif avec fonctionnalités avancées</p>
                  <ul>
                    <li>Animations GSAP</li>
                    <li>Mode sombre/clair</li>
                    <li>API GitHub en temps réel</li>
                  </ul>
                  <div className="tech-used">
                    <Badge bg="outline-success" className="me-1">React</Badge>
                    <Badge bg="outline-success" className="me-1">Bootstrap</Badge>
                    <Badge bg="outline-success">GSAP</Badge>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      )
    },
    {
      title: "Objectifs & Motivation",
      subtitle: "Vision professionnelle",
      content: (
        <div className="goals-slide">
          <div className="motivation-section">
            <h4>🎯 Objectifs à court terme</h4>
            <ul className="goals-list">
              <li>Intégrer une équipe dynamique en alternance</li>
              <li>Approfondir mes compétences en TypeScript</li>
              <li>Contribuer à des projets impactants</li>
              <li>Apprendre les bonnes pratiques en entreprise</li>
            </ul>
            
            <h4>💡 Ce que j'apporte</h4>
            <ul className="value-list">
              <li>Passion pour le développement web</li>
              <li>Capacité d'apprentissage rapide</li>
              <li>Esprit d'équipe et communication</li>
              <li>Projets concrets déjà réalisés</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: "Contact & Disponibilité",
      subtitle: "Prêt à échanger",
      content: (
        <div className="contact-slide">
          <div className="contact-section">
            <h4>📞 Restons en contact</h4>
            <div className="contact-methods">
              <div className="contact-item">
                <strong>Email:</strong> adelloukal.dev@gmail.com
              </div>
              <div className="contact-item">
                <strong>LinkedIn:</strong> /in/adel-loukal-257541221/
              </div>
              <div className="contact-item">
                <strong>GitHub:</strong> github.com/adellkl
              </div>
              <div className="contact-item">
                <strong>Portfolio:</strong> Disponible en ligne
              </div>
            </div>
            
            <div className="availability-info">
              <h5>🕐 Disponibilité</h5>
              <p>Immédiatement ou Septembre 2025</p>
              <p>Alternance 24 mois - Rythme flexible</p>
            </div>
            
            <div className="cta-section">
              <h5>Merci pour votre attention !</h5>
              <p>Des questions ? N'hésitez pas à me contacter</p>
            </div>
          </div>
        </div>
      )
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      document.documentElement.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
    setIsFullscreen(!isFullscreen);
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!show) return;
      
      switch (e.key) {
        case 'ArrowRight':
        case ' ':
          e.preventDefault();
          nextSlide();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          prevSlide();
          break;
        case 'Escape':
          onHide();
          break;
        case 'f':
        case 'F':
          toggleFullscreen();
          break;
        default:
          if (e.key >= '1' && e.key <= '5') {
            goToSlide(parseInt(e.key) - 1);
          }
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [show]);

  return (
    <Modal 
      show={show} 
      onHide={onHide} 
      size="xl" 
      fullscreen={true}
      className="presentation-modal"
    >
      <Modal.Header className="presentation-header">
        <div className="slide-counter">
          {currentSlide + 1} / {slides.length}
        </div>
        <div className="presentation-controls">
          <Button variant="outline-light" size="sm" onClick={toggleFullscreen}>
            🔍 Plein écran
          </Button>
          <Button variant="outline-light" size="sm" onClick={onHide}>
            ✕ Fermer
          </Button>
        </div>
      </Modal.Header>
      
      <Modal.Body className="presentation-body">
        <div className="slide-container">
          <div className="slide-header">
            <h1>{slides[currentSlide].title}</h1>
            <p className="slide-subtitle">{slides[currentSlide].subtitle}</p>
          </div>
          
          <div className="slide-content">
            {slides[currentSlide].content}
          </div>
        </div>
      </Modal.Body>
      
      <Modal.Footer className="presentation-footer">
        <div className="slide-navigation">
          <Button 
            variant="outline-primary" 
            onClick={prevSlide}
            disabled={currentSlide === 0}
          >
            ← Précédent
          </Button>
          
          <div className="slide-dots">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`slide-dot ${currentSlide === index ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
          
          <Button 
            variant="outline-primary" 
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
          >
            Suivant →
          </Button>
        </div>
        
        <div className="keyboard-hints">
          <small>
            Navigation: ← → ou Espace | Raccourcis: 1-5 | Plein écran: F | Quitter: Échap
          </small>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default PresentationMode;
