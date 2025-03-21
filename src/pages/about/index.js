import React, { useEffect, useRef, useCallback } from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container, Row, Col } from "react-bootstrap";
import { RoughNotation } from "react-rough-notation";
import { dataabout, meta, worktimeline, skills, services } from "../../content_option";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const About = () => {
  const aboutRef = useRef(null);
  const skillsRef = useRef(null);
  const servicesRef = useRef(null);
  const missionTitleRef = useRef(null);

  const animateSection = useCallback((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        gsap.from(entry.target, {
          opacity: 0,
          y: 50,
          duration: 1.0,
          ease: "power2.out",
        });
        observer.unobserve(entry.target);
      }
    });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(animateSection, {
      threshold: 0.2,
    });

    const sections = document.querySelectorAll('.animate-section');
    sections.forEach((section) => observer.observe(section));

    // Animation des barres de progression
    const progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach((bar) => {
      gsap.to(bar, {
        width: bar.style.width,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: bar,
          start: "top 80%",
        },
      });
    });

    return () => observer.disconnect();
  }, [animateSection]);

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

        <Row className="mb-5 mt-3 pt-md-3">
          <Col lg="8">
            <h1 className="about-title">À propos de moi</h1>
          </Col>
        </Row>

        <Row className="sec_sp animate-section">
          <Col lg="5">
            <h3 className="color_sec py-4">{dataabout.title}</h3>
          </Col>
          <Col lg="7" className="d-flex align-items-center">
            <div className="aboutme">
              <p>{dataabout.aboutme}</p>
            </div>
          </Col>
        </Row>

        <Row className="sec_sp animate-section">
          <Col lg="5">
            <h3 className="color_sec py-4">Historique des missions</h3>
          </Col>
          <Col lg="7">
            <div className="timeline-section">
              <table className="table">
                <tbody>
                  {worktimeline.map((data, i) => (
                    <tr key={i}>
                      <th scope="row" className="where">{data.jobtitle}</th>
                      <td className="where">{data.where}</td>
                      <td className="date">{data.date}</td>
                      <td className="description">{data.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Col>
        </Row>

        <Row className="sec_sp animate-section" ref={skillsRef}>
          <Col lg="5">
            <h3 className="color_sec py-4">Langages & Logiciels</h3>
          </Col>
          <Col lg="7">
            <div className="skills-section">
              {skills.map((data, i) => (
                <div key={i}>
                  <div className="progress-title">
                    <span>{data.name}</span>
                    <span className="progress-value">{data.value}%</span>
                  </div>
                  <div className="progress">
                    <div
                      className="progress-bar"
                      style={{ width: `${data.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Col>
        </Row>

        <Row className="sec_sp animate-section" ref={servicesRef}>
          <Col lg="5">
            <div className="mission-title" ref={missionTitleRef}>
              <RoughNotation
                type="circle"
                show={true}
                color="green"
                iterations={3}
                animationDelay={300}
                animationDuration={1500}
                strokeWidth={2}
              >
                <h3 className="color_sec py-4">Détails des missions</h3>
              </RoughNotation>
            </div>
          </Col>
          <Col lg="7">
            {services.map((data, i) => (
              <div className="service_" key={i}>
                <h5 className="service__title">{data.title}</h5>
                <p className="service_desc">{data.description}</p>
              </div>
            ))}
          </Col>
        </Row>
      </Container>
    </HelmetProvider>
  );
};
