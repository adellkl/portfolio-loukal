import React, { useEffect, useRef, useMemo } from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container, Row, Col } from "react-bootstrap";
import { dataportfolio, meta } from "../../content_option";
import gsap from "gsap";

const PortfolioItem = React.memo(({ data, index }) => (
  <div key={index} className="po_item">
    <img src={data.img} alt={`Project ${index}`} className="card-image" />
    <div className="content">
      <p>{data.description}</p>
      <a href={data.link} target="_blank" rel="noopener noreferrer">
        Voir le repository Github
      </a>
    </div>
  </div>
));

export const Portfolio = () => {
  const portfolioRef = useRef(null);

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

  const portfolioItems = useMemo(() => 
    dataportfolio.map((data, index) => (
      <PortfolioItem key={index} data={data} index={index} />
    )),
    []
  );

  return (
    <HelmetProvider>
      <Container className="About-header" ref={portfolioRef}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Portfolio | {meta.title}</title>
          <meta name="description" content={meta.description} />
        </Helmet>
        <Row className="mb-5 mt-3 pt-md-3">
          <Col lg="8">
            <h1 className="display-4 mb-4">Réalisations 🚧</h1>
            <hr className="t_border my-4 ml-0 text-left" />
          </Col>
        </Row>
        <div className="mb-5 po_items_ho">
          {portfolioItems}
        </div>
      </Container>
    </HelmetProvider>
  );
};
