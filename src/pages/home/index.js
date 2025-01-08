import React from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Typewriter from "typewriter-effect";
import { introdata, meta } from "../../content_option";
import { Link } from "react-router-dom";
import moi from "../../assets/images/moi.jpeg";
import { RoughNotation } from "react-rough-notation";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const logos = [
  { src: require("../../assets/images/Logo1.png"), alt: "Logo 1" },
  { src: require("../../assets/images/Logo2.jpg"), alt: "Logo 2" },
  { src: require("../../assets/images/Logo3.png"), alt: "Logo 3" },
  { src: require("../../assets/images/Logo4.png"), alt: "Logo 4" },
  { src: require("../../assets/images/Logo5.png"), alt: "Logo 5" }
];

export const Home = () => {
  const settings = {
    infinite: true,
    speed: 3000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    rtl: true,
    pauseOnHover: true,
    draggable: true,
    arrows: false
  };

  return (
    <HelmetProvider>
      <section id="home" className="home">
        <Helmet>
          <meta charSet="utf-8" />
          <title> {meta.title} </title>
          <meta name="description" content={meta.description} />
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
                <br></br>
                <div className="intro_btn-action pb-5">
                  <Link to="/portfolio" className="text_2">
                    <div id="button_p" className="ac_btn btn" style={{ marginRight: '20px' }}>
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

                {/* Logo Carousel Section Directly Below Buttons */}
                <div
                  className="logo-carousel-container"
                  style={{ marginTop: '30px', display: window.innerWidth <= 768 ? 'none' : 'block' }}
                >
                  <Slider {...settings}>
                    {logos.map((logo, index) => (
                      <div key={index} style={{ display: 'flex', justifyContent: 'center' }}>
                        <img
                          src={logo.src}
                          alt={logo.alt}
                          className="logo-carousel"
                          style={{ maxWidth: '100px', maxHeight: '100px', outline: 'none', border: 'none' }}
                        />
                      </div>
                    ))}
                  </Slider>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </HelmetProvider>
  );
};
