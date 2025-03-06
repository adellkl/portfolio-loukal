import React, { useState, useEffect } from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Typewriter from "typewriter-effect";
import { introdata, meta } from "../../content_option";
import { Link } from "react-router-dom";
import moi from "../../assets/images/moi.jpeg";
import { RoughNotation } from "react-rough-notation";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const Home = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <HelmetProvider>
      <section id="home" className="home">
        <Helmet>
          <meta charSet="utf-8" />
          <title>{meta.title}</title>
          <meta name="description" content={meta.description} />
          <meta name="keywords" content="développement web, portfolio, React, JavaScript, programmation" />
          <meta name="author" content="Votre Nom" />
          <meta property="og:title" content={meta.title} />
          <meta property="og:description" content={meta.description} />
          <meta property="og:image" content={moi} />
          <meta property="og:url" content={window.location.href} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={meta.title} />
          <meta name="twitter:description" content={meta.description} />
          <meta name="twitter:image" content={moi} />
        </Helmet>
        <div className="intro_sec d-block d-lg-flex align-items-center">
          <div
            className="h_bg-image order-1 order-lg-2 h-100"
            style={{ backgroundImage: `url(${moi})` }}
          ></div>
          <div className="text order-2 order-lg-1 h-100 d-lg-flex justify-content-center">
            <div className="align-self-center">
              <div className="intro mx-auto">
                <h2 className="mb-1x">
                  <RoughNotation type="circle" show={true} color="green">
                    {introdata.title}
                  </RoughNotation>
                </h2>
                <h1 className="fluidz-48 mb-1x">
                  <Typewriter
                    options={{
                      strings: [
                        introdata.animated.first,
                        introdata.animated.second,
                        introdata.animated.third
                      ],
                      autoStart: true,
                      loop: true,
                      deleteSpeed: 17
                    }}
                  />
                </h1>
                <p className="mb-1x">{introdata.description}</p>
                <br />
                <div className="intro_btn-action pb-5">
                  <Link to="/portfolio" className="text_2">
                    <div id="button_p" className="ac_btn btn">
                      Mes réalisations
                      <div className="ring one"></div>
                      <div className="ring two"></div>
                      <div className="ring three"></div>
                    </div>
                  </Link>

                  <Link to="/contact">
                    <div id="button_h" className="ac_btn btn">
                      Me contacter
                      <div className="ring one"></div>
                      <div className="ring two"></div>
                      <div className="ring three"></div>
                    </div>
                  </Link>
                </div>
                <div
                  className="logo-carousel-container"
                  style={{ marginTop: '30px', display: isMobile ? 'none' : 'block' }}
                >
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </HelmetProvider>
  );
};
