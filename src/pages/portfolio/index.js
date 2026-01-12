import React, { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container, Row, Col, Button } from "react-bootstrap";
import { dataportfolio, meta } from "../../content_option";
import { RoughNotation } from "react-rough-notation";
import gsap from "gsap";

const TechList = ({ technologies }) => {
  const techRef = useRef(null);

  useEffect(() => {
    if (techRef.current) {
      gsap.fromTo(techRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, ease: "power2.out", delay: 1 });
    }
  }, []);

  return (
    <div ref={techRef} className="tech-list" style={{ marginTop: '10px', fontSize: '0.9rem', color: '#666' }}>
      {technologies && technologies.join(', ')}
    </div>
  );
};


const DraggableImage = ({ src, alt }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const constraints = { x: 30, y: 30 };

  const handleMouseMove = (e) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Calculer la distance relative au centre
      const deltaX = (e.clientX - centerX) / rect.width * constraints.x * 2;
      const deltaY = (e.clientY - centerY) / rect.height * constraints.y * 2;

      setPosition({
        x: Math.max(Math.min(deltaX, constraints.x), -constraints.x),
        y: Math.max(Math.min(deltaY, constraints.y), -constraints.y)
      });
    }
  };

  const handleMouseLeave = () => {
    // Retour en douceur à la position initiale
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden'
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <img
        src={src}
        alt={alt}
        className="img-fluid"
        loading="lazy"
        style={{
          width: "100%",
          borderRadius: "10px",
          boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)",
          transform: `translate(${position.x}px, ${position.y}px)`,
          transition: 'transform 0.2s ease-out'
        }}
      />
    </div>
  );
};

export const Portfolio = () => {
  const portfolioRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [projects] = useState(dataportfolio);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const projectName = new URLSearchParams(location.search).get("project");
    if (projectName) {
      const foundProject = projects.find((p) => p.titre === projectName);
      setSelectedProject(foundProject || null);
    }
  }, [location.search, projects]);

  useEffect(() => {
    if (selectedProject) {
      gsap.fromTo(
        ".project-buttons",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out", delay: 1.2 }
      );
    }
  }, [selectedProject]);

  const handleProjectClick = useCallback((data) => {
    navigate(`?project=${encodeURIComponent(data.titre)}`);
    setSelectedProject(data);
  }, [navigate]);

  const handleBack = () => {
    setSelectedProject(null);
    navigate("?");
  };

  return (
    <HelmetProvider>
      <Container className="About-header" ref={portfolioRef}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{selectedProject ? selectedProject.titre : "Portfolio | " + meta.title}</title>
          <meta name="description" content={selectedProject ? selectedProject.description : meta.description} />
          <meta name="keywords" content="portfolio, projets, développement, web, React, JavaScript, programmation, design" />
          <meta name="author" content="Votre Nom" />
          <meta property="og:title" content={selectedProject ? selectedProject.titre : "Portfolio | " + meta.title} />
          <meta property="og:description" content={selectedProject ? selectedProject.description : meta.description} />
          <meta property="og:image" content={selectedProject ? selectedProject.img : "default_image_url"} />
          <meta property="og:url" content={window.location.href} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={selectedProject ? selectedProject.titre : "Portfolio | " + meta.title} />
          <meta name="twitter:description" content={selectedProject ? selectedProject.description : meta.description} />
          <meta name="twitter:image" content={selectedProject ? selectedProject.img : "default_image_url"} />
        </Helmet>

        {selectedProject ? (
            <Row className="project-detail" style={{ textAlign: "left", padding: "20px" }}>
              <Col md={5}>
                <DraggableImage
                  src={selectedProject.img || require('../../assets/images/portfolio.png')}
                  alt={selectedProject.titre}
                />
              </Col>
              <Col md={7} style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <h1 className="project-title" style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "15px" }}>{selectedProject.titre}</h1>
                <p className="project-description" style={{ fontSize: "1rem", color: "#555" }}>{selectedProject.description}</p>
                <TechList technologies={selectedProject.technologies} />
                <div className="project-buttons" style={{ display: "flex", gap: "10px", alignItems: "center", marginTop: "20px" }}>
                  <Button 
                    variant="primary" 
                    href={selectedProject.lien || selectedProject.link} 
                    target="_blank" 
                    className="project-button" 
                    style={{ 
                      padding: "5px 20px", 
                      borderRadius: "6px", 
                      minWidth: "120px",
                      backgroundColor: selectedProject.couleur_hover || '#4a9eff',
                      borderColor: selectedProject.couleur_hover || '#4a9eff'
                    }}
                  >
                    Voir le projet
                  </Button>
                  <Button variant="secondary" onClick={handleBack} className="project-button" style={{ padding: "5px 20px", borderRadius: "6px", backgroundColor: "#f8f9fa", color: "#333", border: "1px solid #ccc", minWidth: "120px" }}>
                    Retour
                  </Button>
                </div>
              </Col>
            </Row>
          ) : (
            <>
              <Row className="mb-5 mt-3 pt-md-3">
                <Col lg="8">
                  <h1 className="display-4 mb-4">
                    <RoughNotation
                      type="highlight"
                      show={true}
                      color="rgba(0, 255, 0, 0.2)"
                      animationDelay={500}
                      animationDuration={1000}
                    >
                      Portfolio
                    </RoughNotation>
                  </h1>
                  <hr className="t_border my-4 ml-0 text-left" />
                </Col>
              </Row>
              <div className="mb-5 po_items_ho">
                {projects.map((data, index) => {
                  // Gérer les images : soit une URL, soit un require() pour les assets locaux
                  let imgSrc = data.img;
                  
                  // Si pas d'image URL, essayer de trouver l'image locale par nom
                  if (!imgSrc || (!imgSrc.startsWith('http') && !imgSrc.startsWith('/'))) {
                    const imageMap = {
                      'Openmat': require('../../assets/images/Openmat.png'),
                      'mdp': require('../../assets/images/mdp.png'),
                      'portfolio': require('../../assets/images/portfolio.png'),
                      'test-psychotechnique': require('../../assets/images/test-psychotechnique permis.png'),
                      'Alpha-fight-club': require('../../assets/images/Alpha-fight-club.png'),
                      'Alpha': require('../../assets/images/Alpha-fight-club.png'),
                      'Figma': require('../../assets/images/Figma.png'),
                    };
                    
                    const titreLower = (data.titre || '').toLowerCase();
                    const foundImage = Object.keys(imageMap).find(key => 
                      titreLower.includes(key.toLowerCase())
                    );
                    
                    imgSrc = foundImage ? imageMap[foundImage] : require('../../assets/images/portfolio.png');
                  }
                  
                  // Si c'est un require(), utiliser .default
                  if (imgSrc && typeof imgSrc === 'object' && imgSrc.default) {
                    imgSrc = imgSrc.default || imgSrc;
                  }
                  
                  return (
                    <div 
                      key={data.id || index} 
                      className="po_item" 
                      onClick={() => handleProjectClick(data)}
                      style={{
                        '--hover-color': data.couleur_hover || '#4a9eff'
                      }}
                    >
                      <img
                        src={imgSrc}
                        alt={data.titre || `Project ${index}`}
                        loading="lazy"
                        onError={(e) => {
                          e.target.src = require('../../assets/images/portfolio.png');
                        }}
                      />
                      <div className="content">
                        <h3>{data.titre}</h3>
                        <TechList technologies={data.technologies || []} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </Container>
    </HelmetProvider>
  );
};
