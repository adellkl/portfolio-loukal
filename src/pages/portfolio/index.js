// Portfolio.js
import React, { useEffect, useRef, useMemo, useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container, Row, Col, Button, } from "react-bootstrap";
import { dataportfolio, meta } from "../../content_option";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export const Portfolio = () => {
  const portfolioRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();


  useGSAP(() => {
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
  }, []);

  useEffect(() => {
    const projectName = new URLSearchParams(location.search).get("project");
    if (projectName) {
      const foundProject = dataportfolio.find((p) => p.description === projectName);
      setSelectedProject(foundProject || null);
    }
  }, [location.search]);

  const handleProjectClick = useCallback((data) => {
    navigate(`?project=${encodeURIComponent(data.description)}`);
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
          loading="lazy" // 🚀 Lazy loading
          style={{ width: "100%", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)" }}
        />
        <div className="content" style={{ textAlign: "center", padding: "15px" }}>
          <Row className="mb-5 mt-3 pt-md-3">
            <Col lg="8">
              <h1 className="display-6 mb-4">Découvrir</h1>
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
          <title>Portfolio | {meta.title}</title>
          <meta name="description" content={meta.description} />
        </Helmet>

        {selectedProject ? (
          <Row className="project-detail" style={{ textAlign: "left", padding: "20px" }}>
            <Col md={5}>
              <img
                src={selectedProject.img}
                alt={selectedProject.description}
                className="img-fluid"
                loading="lazy"
                style={{ width: "100%", borderRadius: "10px", boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)" }}
              />
            </Col>
            <Col md={7} style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <h2 style={{ fontSize: "1.8rem", fontWeight: "bold", marginBottom: "15px" }}>{selectedProject.description}</h2>
              <p style={{ fontSize: "1rem", color: "#555" }}>{selectedProject.description}</p>
              <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <Button variant="primary" href={selectedProject.link} target="_blank" style={{ padding: "5px 20px", borderRadius: "6px", minWidth: "120px" }}>
                  Voir Github
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