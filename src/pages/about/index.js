import React, { useEffect, useRef } from "react";
import "./style.css";
import "./style-modern.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container, Row, Col } from "react-bootstrap";
import {
  dataabout,
  meta,
  worktimeline,
  skills,
} from "../../content_option";
import { RoughNotation } from "react-rough-notation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const About = () => {
  const aboutRef = useRef(null);
  const skillsRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');

          if (entry.target.classList.contains('skills-section')) {
            const items = entry.target.querySelectorAll('.skill-item');
            items.forEach((item, index) => {
              item.style.setProperty('--delay', index);
            });
          }
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll('.animate-section');
    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <HelmetProvider>
      <Container className="About-header" ref={aboutRef}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>À propos | {meta.title}</title>
          <meta name="description" content={meta.description} />
          <meta name="keywords" content="Adel Loukal, développeur web, React, JavaScript, portfolio, compétences, expérience" />
          <meta name="author" content="Adel Loukal" />
          <meta property="og:title" content={"À propos | " + meta.title} />
          <meta property="og:description" content={meta.description} />
          <meta property="og:url" content={window.location.href} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={"À propos | " + meta.title} />
          <meta name="twitter:description" content={meta.description} />
        </Helmet>

        {/* Hero Section */}
        <div className="about-hero animate-section">
          <Row className="align-items-center">
            <Col lg="12">
              <div className="hero-content">
                <span className="hero-badge">Développeur Freelance</span>
                <h1 className="hero-title">
                  Adel Loukal
                </h1>
                <p className="hero-subtitle">Développeur Front-End • React.js • UX/UI Design</p>
                <div className="hero-description">
                  <p>{dataabout.aboutme}</p>
                </div>
              </div>
            </Col>
          </Row>
        </div>

        {/* Stats Section */}
        <Row className="stats-section animate-section justify-content-center">
          <Col lg="4" md="4" sm="6" xs="12" className="mb-3">
            <div className="stat-card">
              <div className="stat-icon">
                <i className="fas fa-code"></i>
              </div>
              <h3 className="stat-number">5+</h3>
              <p className="stat-label">Projets réalisés</p>
            </div>
          </Col>
          <Col lg="4" md="4" sm="6" xs="12" className="mb-3">
            <div className="stat-card">
              <div className="stat-icon">
                <i className="fas fa-rocket"></i>
              </div>
              <h3 className="stat-number">100%</h3>
              <p className="stat-label">Clients satisfaits</p>
            </div>
          </Col>
          <Col lg="4" md="4" sm="6" xs="12" className="mb-3">
            <div className="stat-card">
              <div className="stat-icon">
                <i className="fas fa-clock"></i>
              </div>
              <h3 className="stat-number">24h</h3>
              <p className="stat-label">Délai de réponse</p>
            </div>
          </Col>
        </Row>

        {/* Experience Section */}
        <div className="experience-section animate-section">
          <Row>
            <Col lg="12">
              <div className="section-header">
                <h2 className="section-title">
                  <RoughNotation
                    type="box"
                    show={true}
                    color="#2ecc71"
                    animationDelay={500}
                    animationDuration={1000}
                    strokeWidth={2}
                  >
                    Parcours Professionnel
                  </RoughNotation>
                </h2>
                <p className="section-subtitle">Mon expérience en développement web</p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg="12">
              <div className="timeline-modern">
                {worktimeline.map((data, i) => (
                  <div className="timeline-item" key={i}>
                    <div className="timeline-dot"></div>
                    <div className="timeline-content">
                      <div className="timeline-header">
                        {data.link ? (
                          <a href={data.link} target="_blank" rel="noopener noreferrer" className="timeline-title">
                            {data.jobtitle} <i className="fas fa-external-link-alt"></i>
                          </a>
                        ) : (
                          <h4 className="timeline-title">{data.jobtitle}</h4>
                        )}
                        <span className="timeline-date">{data.date}</span>
                      </div>
                      <p className="timeline-company">{data.where}</p>
                      {data.description && <p className="timeline-description">{data.description}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </Col>
          </Row>
        </div>

        {/* Skills Section */}
        <div className="skills-modern-section animate-section" ref={skillsRef}>
          <Row>
            <Col lg="12">
              <div className="section-header">
                <h2 className="section-title">
                  <RoughNotation
                    type="circle"
                    show={true}
                    color="#2ecc71"
                    animationDelay={700}
                    animationDuration={1200}
                    strokeWidth={2}
                    iterations={2}
                  >
                    Stack Technique
                  </RoughNotation>
                </h2>
                <p className="section-subtitle">Technologies que je maîtrise</p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg="12">
              <div className="skills-grid-modern">
                <div className="skill-card">
                  <div className="skill-icon-wrapper">
                    <i className="devicon-javascript-plain colored"></i>
                  </div>
                  <h5>JavaScript</h5>
                  <p>ES6+, Async/Await</p>
                </div>
                <div className="skill-card">
                  <div className="skill-icon-wrapper">
                    <i className="devicon-typescript-plain colored"></i>
                  </div>
                  <h5>TypeScript</h5>
                  <p>Typage, Interfaces</p>
                </div>
                <div className="skill-card">
                  <div className="skill-icon-wrapper">
                    <i className="devicon-react-original colored"></i>
                  </div>
                  <h5>React.js</h5>
                  <p>Hooks, Context API</p>
                </div>
                <div className="skill-card">
                  <div className="skill-icon-wrapper">
                    <i className="devicon-nextjs-plain"></i>
                  </div>
                  <h5>Next.js</h5>
                  <p>SSR, SSG, API Routes</p>
                </div>
                <div className="skill-card">
                  <div className="skill-icon-wrapper">
                    <i className="devicon-tailwindcss-plain colored"></i>
                  </div>
                  <h5>TailwindCSS</h5>
                  <p>Design responsive</p>
                </div>
                <div className="skill-card">
                  <div className="skill-icon-wrapper">
                    <i className="devicon-nodejs-plain colored"></i>
                  </div>
                  <h5>Node.js</h5>
                  <p>Backend, APIs REST</p>
                </div>
                <div className="skill-card">
                  <div className="skill-icon-wrapper">
                    <i className="devicon-figma-plain colored"></i>
                  </div>
                  <h5>Figma</h5>
                  <p>Maquettes, Prototypes</p>
                </div>
                <div className="skill-card">
                  <div className="skill-icon-wrapper">
                    <i className="devicon-git-plain colored"></i>
                  </div>
                  <h5>Git</h5>
                  <p>Versioning, GitHub</p>
                </div>
                <div className="skill-card">
                  <div className="skill-icon-wrapper">
                    <i className="devicon-firebase-plain colored"></i>
                  </div>
                  <h5>Firebase</h5>
                  <p>Auth, Database</p>
                </div>
              </div>
            </Col>
          </Row>
        </div>

      </Container>
    </HelmetProvider>
  );
};
