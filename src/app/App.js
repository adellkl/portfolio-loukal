import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import withRouter from "../hooks/withRouter";
import Routes from "./routes";
import Headermain from "../header";
import AnimatedCursor from "../hooks/AnimatedCursor";
import ImageBanner from "../components/letstalk/ImageBanner";
import { Helmet, HelmetProvider } from "react-helmet-async";
import meta from "../content_option";
import "./App.css";


function _ScrollToTop(props) {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return props.children;
}

const ScrollToTop = withRouter(_ScrollToTop);

export default function App() {
  return (
    <HelmetProvider>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta name="keywords" content="Adel Loukal, développeur web, React, JavaScript, portfolio, compétences, expérience" />
        <meta name="author" content="Adel Loukal" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:url" content={window.location.href} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <link rel="icon" type="image/png" href="src/assets/images/moi.png" />
      </Helmet>
      <Router basename={process.env.PUBLIC_URL}>
        <div className="cursor__dot">
          <AnimatedCursor
            innerSize={10}
            outerSize={15}
            color="250 250 250"
            outerAlpha={0.4}
            innerScale={0.7}
            outerScale={5}
          />
        </div>
        <ScrollToTop>
          <Headermain />
          <Routes />
          <ImageBanner />
       
        </ScrollToTop>
      </Router>
    </HelmetProvider>
  );
}
