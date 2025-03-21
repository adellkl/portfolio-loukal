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

  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: "0px 0px -100px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');

          // Ajouter un délai pour chaque skill-item
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

        <Row className="mb-5 mt-3 pt-md-3">
          <Col lg="8">
            <h1 className="about-title">À propos de moi</h1>
          </Col>
        </Row>

        <Row className="sec_sp animate-section">
          <Col lg="5">
            <h3 className=" py-4">{dataabout.title}</h3>
          </Col>
          <Col lg="7" className="d-flex align-items-center">
            <div className="aboutme">
              <p>{dataabout.aboutme}</p>
            </div>
          </Col>
        </Row>

        <Row className="sec_sp animate-section">
          <Col lg="5">
            <h3 className=" py-4">Historique des missions</h3>
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

        <Row className="sec_sp animate-section skills-row" ref={skillsRef}>
          <Col lg="5">
            <h3 className=" py-4">Langages & Logiciels</h3>
          </Col>
          <Col lg="7">
            <div className="skills-section">
              <div className="skills-grid">
                <div className="skill-item">
                  <i className="devicon-javascript-plain colored"></i>
                  <span>JavaScript</span>
                </div>
                <div className="skill-item">
                  <i className="devicon-react-original colored"></i>
                  <span>React.js</span>
                </div>
                <div className="skill-item">
                  <i className="devicon-tailwindcss-plain colored"></i>
                  <span>TailwindCSS</span>
                </div>
                <div className="skill-item">
                  <i className="devicon-figma-plain colored"></i>
                  <span>Figma</span>
                </div>
                <div className="skill-item">
                  <i className="devicon-html5-plain colored"></i>
                  <span>HTML5</span>
                </div>
                <div className="skill-item">
                  <i className="devicon-css3-plain colored"></i>
                  <span>CSS3</span>
                </div>
                <div className="skill-item">
                  <i className="devicon-git-plain colored"></i>
                  <span>Git</span>
                </div>
                <div className="skill-item">
                  <i className="devicon-nodejs-plain colored"></i>
                  <span>Node.js</span>
                </div>
              </div>
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
                <h3 className=" py-4">Détails des missions</h3>
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

        <Row className="sec_sp animate-section">
          <Col lg="5">
            <h3 className=" py-4">Centres d'intérêt</h3>
          </Col>
          <Col lg="7">
            <div className="interests-container">
              <div className="interest-item">
                <h5>🥋 Sports de Combat</h5>
                <p>Passionné de Jiu-Jitsu Brésilien et de Grappling. Ces disciplines m'ont appris la persévérance, la discipline et l'importance de la progression continue.</p>
              </div>
              <div className="interest-item">
                <h5>🎵 Musique</h5>
                <p>Amateur de différents styles musicaux, particulièrement le rap français et américain. La musique m'accompagne dans mon processus créatif.</p>
              </div>
              <div className="interest-item">
                <h5>💻 Veille Technologique</h5>
                <p>Constamment à l'affût des nouvelles technologies et frameworks dans le développement web. J'aime explorer et tester les dernières innovations.</p>
              </div>
              <div className="interest-item">
                <h5>🎨 Design & Créativité</h5>
                <p>Passionné par l'UI/UX design et l'art numérique. J'explore régulièrement de nouvelles tendances en design et techniques créatives.</p>
              </div>
            </div>
          </Col>
        </Row>

        <Row className="sec_sp animate-section">
          <Col lg="5">
            <h3 className=" py-4">Ma Playlist</h3>
          </Col>
          <Col lg="7">
            <div className="spotify-playlist-container">
              <iframe
                src="https://open.spotify.com/embed/playlist/7a3RWpT6cmXHZMSVWVMezb"
                width="100%"
                height="452"
                frameBorder="0"
                allowFullScreen=""
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                style={{ borderRadius: '12px', marginBottom: '20px' }}
              ></iframe>
            </div>
          </Col>
        </Row>
      </Container>
    </HelmetProvider>
  );
};
