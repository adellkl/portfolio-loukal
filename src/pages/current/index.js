import React, { useEffect, useRef } from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container, Row, Col, ProgressBar, Badge } from "react-bootstrap";
import { currentActivities, meta } from "../../content_option";
import { RoughNotation } from "react-rough-notation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ProgressCard = ({ item, type, index }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    if (cardRef.current) {
      // Assurer que l'élément est visible par défaut
      gsap.set(cardRef.current, { opacity: 1, y: 0 });
      
      // Animation simple sans ScrollTrigger pour les éléments visibles
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          delay: index * 0.1
        }
      );
    }
  }, [index]);

  const getVariant = (progress) => {
    if (progress >= 70) return "success";
    if (progress >= 40) return "warning";
    return "info";
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high": return "danger";
      case "medium": return "warning";
      case "low": return "secondary";
      default: return "primary";
    }
  };

  return (
    <div ref={cardRef} className="progress-card">
      <div className="card-header">
        <div className="card-icon">{item.icon}</div>
        <div className="card-title-section">
          <h5 className="card-title">
            {type === "project" ? item.title : item.technology}
          </h5>
          {type === "project" && (
            <Badge bg={getPriorityColor(item.priority)} className="priority-badge">
              {item.status}
            </Badge>
          )}
        </div>
      </div>
      <p className="card-description">{item.description}</p>
      {item.link && (
        <div className="project-link">
          <a href={item.link} target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary btn-sm">
            🌐 Voir le site
          </a>
        </div>
      )}
      <div className="progress-section">
        <div className="progress-header">
          <span className="progress-label">Progression</span>
          <span className="progress-percentage">{item.progress}%</span>
        </div>
        <ProgressBar 
          now={item.progress} 
          variant={getVariant(item.progress)}
          className="custom-progress"
        />
      </div>
    </div>
  );
};

const GoalCard = ({ goal, index }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    if (cardRef.current) {
      // Assurer que l'élément est visible par défaut
      gsap.set(cardRef.current, { opacity: 1, x: 0 });
      
      // Animation simple
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: "power2.out",
          delay: index * 0.1
        }
      );
    }
  }, [index]);

  return (
    <div ref={cardRef} className="goal-card">
      <div className="goal-header">
        <h6 className="goal-title">{goal.title}</h6>
        <span className="goal-deadline">{goal.deadline}</span>
      </div>
      <p className="goal-description">{goal.description}</p>
      <div className="goal-status">
        <Badge bg={goal.completed ? "success" : "primary"}>
          {goal.completed ? "✅ Terminé" : "🔄 En cours"}
        </Badge>
      </div>
    </div>
  );
};

const AvailabilityCard = ({ availability }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    if (cardRef.current) {
      // Assurer que l'élément est visible par défaut
      gsap.set(cardRef.current, { opacity: 1, y: 0 });
      
      // Animation simple
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          delay: 0.2
        }
      );
    }
  }, []);

  return (
    <div ref={cardRef} className="availability-card">
      <div className="availability-header">
        <div className="status-indicator">
          <div className="status-dot"></div>
          <h4>{availability.status}</h4>
        </div>
      </div>
      <div className="availability-details">
        <div className="detail-item">
          <span className="detail-icon">📍</span>
          <span>{availability.location}</span>
        </div>
        <div className="detail-separator">•</div>
        <div className="detail-item">
          <span className="detail-icon">💼</span>
          <span>{availability.workType}</span>
        </div>
        <div className="detail-separator">•</div>
        <div className="detail-item">
          <span className="detail-icon">📅</span>
          <span>{availability.startDate}</span>
        </div>
        <div className="detail-separator">•</div>
        <div className="detail-item">
          <span className="detail-icon">⏱️</span>
          <span>{availability.duration}</span>
        </div>
      </div>
    </div>
  );
};

export const Current = () => {
  const titleRef = useRef(null);
  const sectionsRef = useRef([]);

  useEffect(() => {
    // Animation du titre principal - toujours visible
    if (titleRef.current) {
      gsap.set(titleRef.current, { opacity: 1, y: 0 });
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out"
        }
      );
    }

    // Animation des titres de sections - sans ScrollTrigger
    sectionsRef.current.forEach((section, index) => {
      if (section) {
        gsap.set(section, { opacity: 1, x: 0 });
        gsap.fromTo(
          section,
          { opacity: 0, x: -15 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: "power2.out",
            delay: 0.3 + (index * 0.1)
          }
        );
      }
    });
  }, []);

  return (
    <HelmetProvider>
      <Container className="current-container">
        <Helmet>
          <meta charSet="utf-8" />
          <title>En ce moment | {meta.title}</title>
          <meta name="description" content="Découvrez mes activités actuelles, projets en cours et objectifs à court terme" />
          <meta name="keywords" content="activités actuelles, projets en cours, apprentissage, objectifs, disponibilité, alternance" />
          <meta name="author" content="Adel Loukal" />
          <meta property="og:title" content={"En ce moment | " + meta.title} />
          <meta property="og:description" content="Découvrez mes activités actuelles, projets en cours et objectifs à court terme" />
          <meta property="og:url" content={window.location.href} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={"En ce moment | " + meta.title} />
          <meta name="twitter:description" content="Découvrez mes activités actuelles, projets en cours et objectifs à court terme" />
        </Helmet>

        <Row className="mb-5 mt-3 pt-md-3">
          <Col lg="8">
            <div ref={titleRef}>
              <h1 className="display-4 mb-4">
                <RoughNotation
                  type="highlight"
                  show={true}
                  color="rgba(0, 255, 0, 0.2)"
                  animationDelay={500}
                  animationDuration={1000}
                >
                  {currentActivities.title}
                </RoughNotation>
              </h1>
              <p className="lead">{currentActivities.subtitle}</p>
            </div>
            <hr className="t_border my-4 ml-0 text-left" />
          </Col>
        </Row>

        {/* Disponibilité */}
        <Row className="mb-5">
          <Col lg="12">
            <h3 className="section-title mb-4" ref={el => sectionsRef.current[0] = el}>🎯 Ma disponibilité</h3>
            <AvailabilityCard availability={currentActivities.availability} />
          </Col>
        </Row>

        {/* Projets en cours */}
        <Row className="mb-5">
          <Col lg="12">
            <h3 className="section-title mb-4" ref={el => sectionsRef.current[1] = el}>🚀 Projets en cours</h3>
            <Row>
              {currentActivities.projects.map((project, index) => (
                <Col lg="4" md="6" className="mb-4" key={index}>
                  <ProgressCard item={project} type="project" index={index} />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>

        {/* Apprentissages */}
        <Row className="mb-5">
          <Col lg="12">
            <h3 className="section-title mb-4" ref={el => sectionsRef.current[2] = el}>📚 En cours d'apprentissage</h3>
            <Row>
              {currentActivities.learning.map((learning, index) => (
                <Col lg="4" md="6" className="mb-4" key={index}>
                  <ProgressCard item={learning} type="learning" index={index} />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>

        {/* Objectifs */}
        <Row className="mb-5">
          <Col lg="12">
            <h3 className="section-title mb-4" ref={el => sectionsRef.current[3] = el}>🎯 Objectifs à court terme</h3>
            <Row>
              {currentActivities.goals.map((goal, index) => (
                <Col lg="4" md="6" className="mb-4" key={index}>
                  <GoalCard goal={goal} index={index} />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </HelmetProvider>
  );
};
