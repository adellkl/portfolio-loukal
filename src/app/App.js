import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import withRouter from "../hooks/withRouter";
import { motion, AnimatePresence } from 'framer-motion';
import Routes from './routes';
import Headermain from "../header";
import AnimatedCursor from "../hooks/AnimatedCursor";
import ImageBanner from "../components/letstalk/ImageBanner";
import { Helmet, HelmetProvider } from "react-helmet-async";
import meta from "../content_option";
import "./App.css";
import ChatBot from "../components/ChatBot/ChatBot";

function _ScrollToTop(props) {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return props.children;
}

const ScrollToTop = withRouter(_ScrollToTop);

function AnimatedContent() {
  const location = useLocation();
  const sections = [1, 2, 3, 4, 5];
  const totalDuration = 0.8;
  const sectionDelay = 0.1;
  const totalAnimationTime = totalDuration + (sections.length - 1) * sectionDelay;

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          className="page-wrapper"
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: {
              duration: 0.3,
              delay: totalAnimationTime - 0.1,
              ease: "easeOut"
            }
          }}
          exit={{ opacity: 0, transition: { duration: 0.2 } }}
        >
          <Routes />
        </motion.div>
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <div className="curtains-container" key={location.pathname + "-curtains"}>
          {sections.map((section, index) => (
            <motion.div
              key={`curtain-${index}`}
              className="page-transition-overlay"
              initial={{ scaleX: 1 }}
              animate={{
                scaleX: 0,
                transition: {
                  duration: totalDuration,
                  ease: [0.645, 0.045, 0.355, 1],
                  delay: index * sectionDelay
                }
              }}
              exit={{
                scaleX: 1,
                transition: {
                  duration: totalDuration * 0.6,
                  ease: [0.645, 0.045, 0.355, 1],
                  delay: (sections.length - index - 1) * sectionDelay * 0.6
                }
              }}
              style={{
                left: `${(index * 100) / sections.length}%`,
                width: `${100 / sections.length}%`,
                boxShadow: "0 0 15px rgba(0, 0, 0, 0.1)"
              }}
            />
          ))}
        </div>
      </AnimatePresence>
    </>
  );
}

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
          <AnimatedContent />
          <ImageBanner />
          <ChatBot />
        </ScrollToTop>
      </Router>
    </HelmetProvider>
  );
}
