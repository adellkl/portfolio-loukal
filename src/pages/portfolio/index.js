import React, { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import { dataportfolio, meta } from "../../content_option";
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

const Loader = () => (
  <div className="loader-overlay" style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', zIndex: 9999 }}>
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  </div>
);

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
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const lastVisit = localStorage.getItem('lastVisitPortfolio');
    const now = new Date().getTime();

    if (!lastVisit || (now - parseInt(lastVisit, 10)) > 3 * 60 * 1000) {
      // Simulate loading time if the page has not been visited in the last 3 minutes
      const loaderTimeout = setTimeout(() => setLoading(false), 2000); // Adjust the timeout as needed
      localStorage.setItem('lastVisitPortfolio', now.toString());

      // Clean up the timeout if the component is unmounted
      return () => clearTimeout(loaderTimeout);
    } else {
      setLoading(false);
    }

    const projectName = new URLSearchParams(location.search).get("project");
    if (projectName) {
      const foundProject = dataportfolio.find((p) => p.titre === projectName);
      setSelectedProject(foundProject || null);
    }
  }, [location.search]);

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

        {loading && <Loader />}

        <div style={{ opacity: loading ? 0 : 1, transition: 'opacity 0.5s ease-in-out' }}>
          {selectedProject ? (
            <Row className="project-detail" style={{ textAlign: "left", padding: "20px" }}>
              <Col md={5}>
                <DraggableImage
                  src={selectedProject.img}
                  alt={selectedProject.titre}
                />
              </Col>
              <Col md={7} style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <h1 className="project-title" style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "15px" }}>{selectedProject.titre}</h1>
                <p className="project-description" style={{ fontSize: "1rem", color: "#555" }}>{selectedProject.description}</p>
                <TechList technologies={selectedProject.technologies} />
                <div className="project-buttons" style={{ display: "flex", gap: "10px", alignItems: "center", marginTop: "20px" }}>
                  <Button variant="primary" href={selectedProject.link} target="_blank" className="project-button" style={{ padding: "5px 20px", borderRadius: "6px", minWidth: "120px" }}>
                    Voir le projet
                  </Button>
                  <Button variant="secondary" onClick={handleBack} className="project-button" style={{ padding: "5px 20px", borderRadius: "6px", backgroundColor: "#f8f9fa", color: "#333", border: "1px solid #ccc", minWidth: "120px" }}>
                    Retour
                  </Button>
                </div>
              </Col>
            </Row>
          ) : (
            <div className="mb-5 po_items_ho">
              {dataportfolio.map((data, index) => (
                <div key={index} className="po_item" onClick={() => handleProjectClick(data)}>
                  <img
                    src={data.img}
                    alt={`Project ${index}`}
                    loading="lazy"
                  />
                  <div className="content">
                    <h3>{data.titre}</h3>
                    <TechList technologies={data.technologies} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Container>
    </HelmetProvider>
  );
};
