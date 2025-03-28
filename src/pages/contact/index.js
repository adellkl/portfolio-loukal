import React, { useState, useEffect, useRef, useCallback } from "react";
import * as emailjs from "emailjs-com";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { meta } from "../../content_option";
import { Container, Row, Col, Alert } from "react-bootstrap";
import { contactConfig } from "../../content_option";
import gsap from "gsap";

export const ContactUs = () => {
  const [formData, setFormdata] = useState({
    email: "",
    name: "",
    message: "",
    loading: false,
    show: false,
    alertmessage: "",
    variant: "",
  });

  const formRef = useRef(null);
  const alertRef = useRef(null);

  useEffect(() => {
    const formElements = formRef.current.querySelectorAll(".animate-field");
    gsap.from(formElements, {
      opacity: 0,
      y: 20,
      duration: 0.5,
      ease: "power2.out",
      stagger: 0.2,
      clearProps: "all"
    });
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    setFormdata((prev) => ({ ...prev, loading: true }));

    const templateParams = {
      from_name: formData.email,
      user_name: formData.name,
      to_name: contactConfig.YOUR_EMAIL,
      message: formData.message,
    };

    emailjs
      .send(
        contactConfig.YOUR_SERVICE_ID,
        contactConfig.YOUR_TEMPLATE_ID,
        templateParams,
        contactConfig.YOUR_USER_ID
      )
      .then(
        () => {
          setFormdata({
            ...formData,
            loading: false,
            alertmessage: "SUCCESS! Merci pour votre message",
            variant: "success",
            show: true,
          });
          alertRef.current.scrollIntoView();
        },
        (error) => {
          setFormdata({
            ...formData,
            loading: false,
            alertmessage: `Erreur! Réessayez, ${error.text}`,
            variant: "danger",
            show: true,
          });
          alertRef.current.scrollIntoView();
        }
      );
  }, [formData]);

  const handleChange = useCallback((e) => {
    setFormdata((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }, []);

  return (
    <HelmetProvider>
      <Container>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{meta.title} | Contact</title>
          <meta name="description" content={meta.description} />
          <meta name="keywords" content="contact, email, portfolio, développeur web, React, JavaScript" />
          <meta name="author" content="Adel Loukal" />
          <meta property="og:title" content={meta.title + " | Contact"} />
          <meta property="og:description" content={meta.description} />
          <meta property="og:url" content={window.location.href} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={meta.title + " | Contact"} />
          <meta name="twitter:description" content={meta.description} />
        </Helmet>
        <Row className="mb-5 mt-3 pt-md-2">
          <Col lg="8">
            <h1 className="display- mb-4"> Contactez-moi </h1>
            <hr className="t_border my-4 ml-0 text-left" />
          </Col>
        </Row>
        <Row className="sec_sp">
          <Col lg="12">
            <Alert
              variant={formData.variant}
              className={`rounded-0 co_alert ${formData.show ? "d-block" : "d-none"}`}
              onClose={() => setFormdata((prev) => ({ ...prev, show: false }))}
              dismissible
              ref={alertRef}
            >
              <p className="my-0 ">{formData.alertmessage}</p>
            </Alert>
          </Col>
          <Col lg="5" className="mb-5">
            <h3 className="py-4">Mon profil vous intéresse ? Contactez-moi via ces canaux.</h3>
            <address>
              <strong>Email :</strong> <a href={`mailto:${contactConfig.YOUR_EMAIL}`}>{contactConfig.YOUR_EMAIL}</a>
              {contactConfig.hasOwnProperty("YOUR_FONE") && (
                <p>
                  <strong>Numéro de téléphone :</strong> {contactConfig.YOUR_FONE}
                </p>
              )}
            </address>
            <p>{contactConfig.description}</p>
          </Col>
          <Col lg="7" className="d-flex align-items-center">
            <form ref={formRef} onSubmit={handleSubmit} className="contact__form w-100">
              <Row>
                <Col lg="6" className="form-group animate-field">
                  <input
                    className="form-control"
                    id="name"
                    name="name"
                    placeholder="Nom"
                    value={formData.name || ""}
                    type="text"
                    required
                    onChange={handleChange}
                  />
                </Col>
                <Col lg="6" className="form-group animate-field">
                  <input
                    className="form-control rounded-0"
                    id="email"
                    name="email"
                    placeholder="Email"
                    type="email"
                    value={formData.email || ""}
                    required
                    onChange={handleChange}
                  />
                </Col>
              </Row>
              <textarea
                className="form-control rounded-0 animate-field"
                id="message"
                name="message"
                placeholder="Message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
              <br />
              <Row>
                <Col lg="12" className="form-group animate-field">
                  <button className="btn ac_btn" type="submit">
                    {formData.loading ? "Envoi..." : "Envoyer"}
                  </button>
                </Col>
              </Row>
            </form>
          </Col>
        </Row>
      </Container>
      <div className={formData.loading ? "loading-bar" : "d-none"}></div>
    </HelmetProvider>
  );
};
