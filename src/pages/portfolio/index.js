import React, { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container, Row, Col, Button } from "react-bootstrap";
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

export const Portfolio = () => {
  const portfolioRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
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

        {selectedProject ? (
          <Row className="project-detail" style={{ textAlign: "left", padding: "20px" }}>
            <Col md={5}>
              <img
                src={selectedProject.img}
                alt={selectedProject.titre}
                className="img-fluid"
                loading="lazy"
                style={{ width: "100%", borderRadius: "10px", boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)" }}
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
          <div className="mb-5 po_items_ho" style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "20px"
          }}>
            {dataportfolio.map((data, index) => (
              <div key={index} className="po_item" onClick={() => handleProjectClick(data)}>
                <img
                  src={data.img}
                  alt={`Project ${index}`}
                  className="card-image"
                  loading="lazy"
                  style={{ width: "100%", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)" }}
                />
                <div className="content" style={{ textAlign: "center", padding: "15px" }}>
                  <h3 style={{ fontSize: "1.2rem", marginBottom: "10px" }}>{data.titre}</h3>
                  <TechList technologies={data.technologies} />
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>
    </HelmetProvider>
  );
};
