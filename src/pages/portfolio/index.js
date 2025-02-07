// Portfolio.js
import React, { useEffect, useRef, useMemo, useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container, Row, Col, Button } from "react-bootstrap";
import { dataportfolio, meta } from "../../content_option";
import gsap from "gsap";


export const Portfolio = () => {
  const portfolioRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!hasAnimated) {
      gsap.fromTo(
        ".po_item",
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "power2.out",
          stagger: 0.3
        }
      );
      setHasAnimated(true);
    }
  }, [hasAnimated]);

  useEffect(() => {
    const projectName = new URLSearchParams(location.search).get("project");
    if (projectName) {
      const foundProject = dataportfolio.find((p) => p.titre === projectName);
      setSelectedProject(foundProject || null);
      if (foundProject) {
        setTimeout(() => {
          gsap.fromTo(".project-title", { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 1, ease: "power2.out" });
          gsap.fromTo(".project-description", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, ease: "power2.out", delay: 0.5 });
          gsap.fromTo(".project-buttons", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, ease: "power2.out", delay: 0.6 });
        }, 1500);
      }
    }
  }, [location.search]);

  const handleProjectClick = useCallback((data) => {
    navigate(`?project=${encodeURIComponent(data.titre)}`);
    setSelectedProject(data);
  }, [navigate]);

  const handleBack = () => {
    setSelectedProject(null);
    navigate("?");
  };

  const portfolioItems = useMemo(() => (
    dataportfolio.map((data, index) => (
      <div key={index} className="po_item" onClick={() => handleProjectClick(data)}>
        <img
          src={data.img}
          alt={`Project ${index}`}
          className="card-image"
          loading="lazy"
          style={{ width: "100%", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)" }}
        />
        <div className="content" style={{ textAlign: "center", padding: "15px" }}>
          <Row className="mb-5 mt-3 pt-md-3">
            <Col lg="8">
              <h2 className="display-6 mb-4">Découvrir</h2>
            </Col>
          </Row>
        </div>
      </div>
    ))
  ), [handleProjectClick]);

  return (
    <HelmetProvider>
      <Container className="About-header" ref={portfolioRef}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{selectedProject ? selectedProject.titre : "Portfolio"} | {meta.title}</title>
          <meta name="description" content={selectedProject ? selectedProject.description : meta.description} />
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
              <div className="project-buttons" style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <Button variant="primary" href={selectedProject.link} target="_blank" style={{ padding: "5px 20px", borderRadius: "6px", minWidth: "120px" }}>
                  Voir le repos Github
                </Button>
                <Button variant="secondary" onClick={handleBack} style={{ padding: "5px 20px", borderRadius: "6px", backgroundColor: "#f8f9fa", color: "#333", border: "1px solid #ccc", minWidth: "120px" }}>
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
            {portfolioItems}
          </div>
        )}
      </Container>
    </HelmetProvider>
  );
};
