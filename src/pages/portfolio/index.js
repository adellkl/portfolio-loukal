// Portfolio.js
import React, { useEffect, useRef, useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import { dataportfolio, meta } from "../../content_option";
import gsap from "gsap";

export const Portfolio = () => {
  const portfolioRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const items = portfolioRef.current.querySelectorAll(".po_item");

    if (window.innerWidth < 768) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              gsap.to(entry.target, {
                opacity: 1,
                x: 0,
                duration: 1,
              });
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );

      items.forEach((item) => {
        gsap.set(item, { opacity: 0, x: -100 });
        observer.observe(item);
      });

      return () => {
        observer.disconnect();
      };
    } else {
      gsap.fromTo(
        items,
        { opacity: 0 },
        { opacity: 1, duration: 1, stagger: 0.2 }
      );
    }
  }, []);

  useEffect(() => {
    const projectName = new URLSearchParams(location.search).get("project");
    if (projectName) {
      const foundProject = dataportfolio.find((p) => p.description === projectName);
      if (foundProject) setSelectedProject(foundProject);
    }
  }, [location.search]);

  const handleProjectClick = (data) => {
    setLoading(true);
    navigate(`?project=${encodeURIComponent(data.description)}`);
    setTimeout(() => {
      setLoading(false);
      setSelectedProject(data);
    }, 2000);
  };

  const handleBack = () => {
    setSelectedProject(null);
    navigate("?");
  };

  const portfolioItems = useMemo(() => (
    dataportfolio.map((data, index) => (
      <div key={index} className="po_item" onClick={() => handleProjectClick(data)}>
        <img src={data.img} alt={`Project ${index}`} className="card-image" style={{ width: "100%", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)" }} />
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
        {loading ? (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
            <Spinner animation="grow" variant="primary" style={{ width: "4rem", height: "4rem" }} />
          </div>
        ) : selectedProject ? (
          <>
            <Row className="project-detail" style={{ textAlign: "left", padding: "20px" }}>
              <Col md={5}>
                <img src={selectedProject.img} alt={selectedProject.description} className="img-fluid" style={{ width: "100%", borderRadius: "10px", boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)" }} />
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
            {/* Section photos */}
            <Row className="project-photos" style={{ marginTop: "30px" }}>
              <Col>
                <h3>Photos du projet</h3>
                <div className="photo-gallery" style={{ display: "flex", gap: "10px", overflowX: "auto" }}>
                  {selectedProject.photos?.map((photo, index) => (
                    <img key={index} src={photo} alt={"Illustration du projet"} style={{ width: "150px", height: "100px", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)" }} />
                  ))}
                </div>
              </Col>
            </Row>
          </>
        ) : (
          <div className="mb-5 po_items_ho" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
            {portfolioItems}
          </div>
        )}
      </Container>
    </HelmetProvider>
  );
};