import React, { useEffect, useRef } from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container, Row, Col } from "react-bootstrap";
import {
  dataabout,
  meta,
  worktimeline,
  skills,
  services,
} from "../../content_option";
import gsap from "gsap";

export const About = () => {
  const aboutRef = useRef(null);

  useEffect(() => {
    const aboutSection = aboutRef.current;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          gsap.from(entry.target, {
            opacity: 0,
            x: -50,
            duration: 1.5,
          });
          observer.unobserve(entry.target);
        }
      });
    });

    const sections = aboutSection.querySelectorAll(".fade-in");
    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <HelmetProvider>
      <Container className="About-header" ref={aboutRef}>
        <Helmet>
          <meta charSet="utf-8" />
          <title> About | {meta.title}</title>
          <meta name="description" content={meta.description} />
        </Helmet>
        <Row className="mb-5 mt-3 pt-md-3">
          <Col lg="8">
            <h1 className="display-4 mb-4 ">A propos de moi 😉</h1>
            <hr className="t_border my-4 ml-0 text-left fade-in" />
          </Col>
        </Row>
        <Row className="sec_sp fade-in">
          <Col lg="5">
            <h3 className="color_sec py-4">{dataabout.title}</h3>
          </Col>
          <Col lg="7" className="d-flex align-items-center fade-in">
            <div>
              <p>{dataabout.aboutme}</p>
            </div>
          </Col>
        </Row>
        <Row className=" sec_sp fade-in">
          <Col lg="5">
            <h3 className="color_sec py-4">Historique de missions</h3>
          </Col>
          <Col lg="7">
            <table className="table caption-top">
              <tbody>
                {worktimeline.map((data, i) => {
                  return (
                    <tr key={i} className="fade-in">
                      <th scope="row">{data.jobtitle}</th>
                      <td>{data.where}</td>
                      <td>{data.date}</td>
                      <td>{data.description}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Col>
        </Row>
        <Row className="sec_sp fade-in">
          <Col lg="5">
            <h3 className="color_sec py-4 fade-in">Langages/Logiciels</h3>
          </Col>
          <Col lg="7" className="fade-in">
            {skills.map((data, i) => {
              return (
                <div key={i} className="fade-in">
                  <h3 className="progress-title">{data.name}</h3>
                  <div className="progress">
                    <div
                      className="progress-bar"
                      style={{
                        width: `${data.value}%`,
                      }}
                    >
                      <div className="progress-value">{data.value}%</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </Col>
        </Row>
        <Row className="sec_sp fade-in">
          <Col lg="5">
            <h3 className="color_sec py-4 fade-in">Détails des missions</h3>
          </Col>
          <Col lg="7" className="fade-in">
            {services.map((data, i) => {
              return (
                <div className="service_ py-4 fade-in" key={i}>
                  <h5 className="service__title">{data.title}</h5>
                  <p className="service_desc">{data.description}</p>
                </div>
              );
            })}
          </Col>
        </Row>
      </Container>
    </HelmetProvider>
  );
};
