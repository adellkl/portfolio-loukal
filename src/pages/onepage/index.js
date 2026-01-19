import React, { useState, useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Contact } from './Contact';
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiNodedotjs, SiFirebase, SiGit, SiFigma } from 'react-icons/si';
import './style.css';

export const OnePage = () => {
  const [time, setTime] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [projects, setProjects] = useState([]);

  const translations = {
    recentProjects: "PROJETS RÉCENTS :",
    developer: "Développeur",
    freelance: "Front-End Freelance",
    basedIn: "basé à",
    paris: "Paris",
    specialized: "Spécialisé en",
    experience: "2 ans d'expérience",
    github: "Github",
    linkedin: "LinkedIn",
    contact: "Contact",
    // Descriptions des projets
    portfolioDesc: "Portfolio personnel minimaliste avec animations et design moderne",
    openmatDesc: "Plateforme de gestion d'événements de jiu-jitsu brésilien avec système d'inscription",
    alphaDesc: "Site web moderne pour un club de sports de combat avec réservation en ligne",
    testPsychoDesc: "Plateforme de prise de rendez-vous pour passer un test psychotechnique pour le permis, à Clichy ou Colombes",
    reelvibeDesc: "Plateforme sociale pour découvrir, noter, liker et commenter des films, séries, anime et mangas, avec profils et watchlists",
    comingSoonDesc: "Nouveau projet en cours de développement",
    scrollingText: "DÉVELOPPEUR FREELANCE • REACT.JS • NEXT.JS • TYPESCRIPT •",
    stackTitle: "STACK TECHNIQUE",
  };

  const t = translations;

  const techStack = [
    { name: "React.js", icon: <SiReact />, color: "#61DAFB" },
    { name: "Next.js", icon: <SiNextdotjs />, color: "#000000" },
    { name: "TypeScript", icon: <SiTypescript />, color: "#3178C6" },
    { name: "TailwindCSS", icon: <SiTailwindcss />, color: "#06B6D4" },
    { name: "Node.js", icon: <SiNodedotjs />, color: "#339933" },
    { name: "Firebase", icon: <SiFirebase />, color: "#FFCA28" },
    { name: "Git", icon: <SiGit />, color: "#F05032" },
    { name: "Figma", icon: <SiFigma />, color: "#F24E1E" }
  ];

  // Projets en dur
  useEffect(() => {
    const projectsData = [
      {
        id: 1,
        name: "PORTFOLIO",
        link: "https://github.com/adellkl/portfolio-loukal.git",
        color: "#00ff88",
        date: "mars 2025",
        description: "Portfolio personnel minimaliste avec animations et design moderne"
      },
      {
        id: 2,
        name: "OPENMAT FRANCE",
        link: "https://www.openmatfrance.fr/",
        color: "#4a9eff",
        date: "juil. 2025",
        description: "Plateforme de gestion d'événements de jiu-jitsu brésilien avec système d'inscription"
      },
      {
        id: 3,
        name: "TEST PSYCHOTECHNIQUE PERMIS",
        link: "https://www.test-psychotechnique-permis.com/",
        color: "#ff6b6b",
        date: "oct. 2025",
        description: "Plateforme de prise de rendez-vous pour passer un test psychotechnique pour le permis, à Colombes"
      },
      {
        id: 4,
        name: "RESTAURANT LA MARINE GROIX",
        link: "https://www.lamarinegroix.com/",
        color: "#ffa726",
        date: "déc. 2025",
        description: "Site pour un restaurant gastronomique situé à Groix dans le morbihan. Site élégant avec une section prise de rendez-vous, un dashboard admin avec pleins d'options"
      },
      {
        id: 5,
        name: "CYRIANNE ADJEVI - WEBSITE",
        link: "https://avocat-website-nu.vercel.app/",
        color: "#ab47bc",
        date: "sept. 2025",
        description: "Site réalisé pour une avocate basée à Paris, avec prise de contact"
      },
      {
        id: 6,
        name: "ALPHA FIGHT CLUB",
        link: "https://www.alphafightclub.com/",
        color: "#26c6da",
        date: "janv. 2026",
        description: "Site web moderne pour un club de sports de combat avec réservation en ligne"
      }
    ];

    setProjects(projectsData);
  }, []);





  useEffect(() => {
    // Update time
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      setTime(`Paris ${hours}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);

    // Mouse movement effect
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      clearInterval(interval);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);



  return (
    <HelmetProvider>
      <div className="onepage-container">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Adel Loukal - Développeur React.js Freelance Paris | Création Sites Web Modernes</title>
          <meta name="description" content="💼 Développeur Front-End Freelance spécialisé React.js, Next.js & TypeScript à Paris. 🚀 Création de sites web et applications modernes sur-mesure. ⚡ 2 ans d'expérience | Réponse sous 24h | Disponible immédiatement pour vos projets web." />
          <meta name="keywords" content="développeur react paris, développeur freelance paris, développeur front-end paris, développeur javascript paris, développeur react.js, développeur next.js paris, développeur typescript paris, création site web react, application react sur mesure, développeur web paris, freelance react, développeur fullstack javascript, développeur react freelance, expert react paris, développeur tailwindcss, développeur node.js paris, développeur firebase, création application web, développeur ux ui paris, site web moderne, développeur reactjs freelance ile de france, prestation développement web, mission freelance développeur, développeur web indépendant paris, développeur react disponible, développeur javascript moderne, spa react, progressive web app, développeur front end freelance, consultant react paris, freelance développeur web paris 2025" />

          {/* Open Graph / Facebook */}
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://www.adelloukal.fr/" />
          <meta property="og:title" content="Adel Loukal - Développeur React.js Freelance Paris | Création Sites Web" />
          <meta property="og:description" content="💼 Développeur Front-End spécialisé React.js, Next.js & TypeScript à Paris. 🚀 Création sites web modernes sur-mesure. ⚡ 2 ans d'expérience | Disponible | Réponse 24h" />
          <meta property="og:image" content="https://www.adelloukal.fr/Twitter-img.png" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:image:alt" content="Adel Loukal - Développeur React.js Freelance Paris" />
          <meta property="og:locale" content="fr_FR" />
          <meta property="og:locale:alternate" content="en_US" />
          <meta property="og:site_name" content="Adel Loukal - Portfolio Développeur" />

          {/* Twitter */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@adelloukal" />
          <meta name="twitter:creator" content="@adelloukal" />
          <meta name="twitter:url" content="https://www.adelloukal.fr/" />
          <meta name="twitter:title" content="Adel Loukal - Développeur React.js Freelance Paris" />
          <meta name="twitter:description" content="💼 Expert React.js, Next.js, TypeScript à Paris | 🚀 Création sites web modernes | ⚡ Disponible | Réponse 24h" />
          <meta name="twitter:image" content="https://www.adelloukal.fr/Twitter-img.png" />
          <meta name="twitter:image:alt" content="Adel Loukal - Développeur React.js Freelance Paris" />

          {/* WhatsApp / LinkedIn */}
          <meta property="og:image:secure_url" content="https://www.adelloukal.fr/Twitter-img.png" />
          <meta property="og:image:type" content="image/png" />

          {/* Additional SEO */}
          <meta name="author" content="Adel Loukal" />
          <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
          <meta name="googlebot" content="index, follow" />
          <link rel="canonical" href="https://www.adelloukal.fr/" />

          {/* Geo targeting */}
          <meta name="geo.region" content="FR-75" />
          <meta name="geo.placename" content="Paris" />
          <meta name="geo.position" content="48.8566;2.3522" />
          <meta name="ICBM" content="48.8566, 2.3522" />

          {/* Language & Locale */}
          <meta httpEquiv="content-language" content="fr-FR" />
          <meta name="language" content="French" />

          {/* Business Info */}
          <meta name="coverage" content="Worldwide" />
          <meta name="distribution" content="Global" />
          <meta name="rating" content="General" />
          <meta name="revisit-after" content="7 days" />

          {/* Professional Info */}
          <meta name="category" content="Technology, Web Development, Freelance" />
          <meta name="subject" content="Développement Web React.js, Next.js, TypeScript" />
          <meta name="classification" content="Développeur Front-End Freelance" />

          {/* Contact & Availability */}
          <meta name="contact" content="adelloukal2@gmail.com" />
          <meta name="reply-to" content="adelloukal2@gmail.com" />
          <meta name="phone" content="+33769120166" />

          {/* Google Search Console Verification */}
          <meta name="google-site-verification" content="E0WdBuIaUjGYKGUFE_ZfN6nLA2h5usBfDSqopv8fuZE" />

          {/* Bing Webmaster Tools */}
          <meta name="msvalidate.01" content="049909097ECB304A84CEBEC96B1C2286" />

          {/* Google Analytics 4 */}
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
          <script>
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX', {
                page_path: window.location.pathname,
                send_page_view: true
              });
            `}
          </script>

          {/* JSON-LD Schema */}
          <script type="application/ld+json">
            {`
              {
                "@context": "https://schema.org",
                "@type": "Person",
                "name": "Adel Loukal",
                "jobTitle": "Développeur Front-End Freelance",
                "description": "Développeur web spécialisé en React.js, Next.js et TypeScript",
                "url": "https://www.adelloukal.fr",
                "image": "https://www.adelloukal.fr/moi.jpeg",
                "email": "adelloukal2@gmail.com",
                "telephone": "+33769120166",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Paris",
                  "addressCountry": "FR"
                },
                "sameAs": [
                  "https://github.com/adellkl",
                  "https://www.linkedin.com/in/adel-loukal-257541221/"
                ],
                "knowsAbout": ["React.js", "Next.js", "TypeScript", "JavaScript", "TailwindCSS", "Node.js", "Figma", "UX/UI Design", "Firebase", "Git", "Responsive Design", "Progressive Web Apps", "Single Page Applications", "Front-End Development", "Web Development"],
                "hasOccupation": {
                  "@type": "Occupation",
                  "name": "Développeur Front-End Freelance",
                  "occupationLocation": {
                    "@type": "City",
                    "name": "Paris"
                  },
                  "skills": "React.js, Next.js, TypeScript, JavaScript, TailwindCSS, Node.js, Firebase, Git, Figma, UX/UI Design"
                },
                "workExample": [
                  {
                    "@type": "WebSite",
                    "name": "Test Psychotechnique Permis",
                    "url": "https://test-psychotechnique-permis.com/"
                  },
                  {
                    "@type": "WebSite",
                    "name": "Alpha Fight Club",
                    "url": "https://alpha-fight-club.vercel.app/"
                  },
                  {
                    "@type": "WebSite",
                    "name": "OpenMat France",
                    "url": "https://open-mat-france.vercel.app/"
                  }
                ]
              }
            `}
          </script>

          {/* JSON-LD Schema - ProfessionalService */}
          <script type="application/ld+json">
            {`
              {
                "@context": "https://schema.org",
                "@type": "ProfessionalService",
                "name": "Adel Loukal - Développeur React.js Freelance Paris",
                "url": "https://www.adelloukal.fr",
                "telephone": "+33769120166",
                "email": "adelloukal2@gmail.com",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Paris",
                  "addressRegion": "Île-de-France",
                  "addressCountry": "FR"
                },
                "priceRange": "€€",
                "areaServed": ["Paris", "Île-de-France", "France"],
                "serviceType": ["Développement Web", "Développement React.js", "Développement Next.js", "TypeScript", "UI/UX Design"]
              }
            `}
          </script>

          {/* JSON-LD Schema - WebPage */}
          <script type="application/ld+json">
            {`
              {
                "@context": "https://schema.org",
                "@type": "WebPage",
                "name": "Portfolio Adel Loukal - Développeur React.js Freelance",
                "description": "Portfolio professionnel d'Adel Loukal, développeur React.js freelance à Paris. Projets, compétences et contact.",
                "url": "https://www.adelloukal.fr",
                "inLanguage": "fr-FR",
                "isPartOf": {
                  "@type": "WebSite",
                  "name": "Adel Loukal Portfolio",
                  "url": "https://www.adelloukal.fr"
                }
              }
            `}
          </script>
        </Helmet>


        {/* Cursor follower */}
        <div
          className="cursor-glow"
          style={{
            left: `${mousePosition.x}px`,
            top: `${mousePosition.y}px`
          }}
        ></div>

        {/* Main content */}
        <div className="content-wrapper">
          {/* Left side - Name and description */}
          <div className="left-section info-section">
            <div className="name-section">
              <h1 className="first-name">ADEL</h1>
              <h1 className="last-name">LOUKAL</h1>
              <div className="decoration-line"></div>
            </div>

            <div className="description-section">
              <ul className="info-list">
                <li>
                  <span className="bullet">•</span>
                  {t.developer} <span className="highlight">{t.freelance}</span> {t.basedIn} <span className="highlight-city">{t.paris}</span>
                </li>
                <li>
                  <span className="bullet">•</span>
                  {t.specialized} <span className="highlight-tech">React.js</span>, <span className="highlight-tech">Next.js</span> & <span className="highlight-tech">TypeScript</span>
                </li>
                <li>
                  <span className="bullet">•</span>
                  <span className="highlight-info">{t.experience}</span>
                </li>
              </ul>

              {/* Tech Stack */}
              <div className="tech-stack">
                <h3 className="stack-title">{t.stackTitle}</h3>
                <div className="stack-grid">
                  {techStack.map((tech, index) => (
                    <div
                      key={tech.name}
                      className="stack-item"
                      style={{ '--delay': `${1.15 + index * 0.05}s` }}
                    >
                      <span className="stack-icon" style={{ color: tech.color }}>{tech.icon}</span>
                      <span className="stack-name">{tech.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Projects */}
          <div className="right-section projects-section">
            <div className="section-header">
              <h2 className="section-title">{t.recentProjects}</h2>
            </div>
            <div className="scroll-arrow-mobile">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 13L12 18L17 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M7 6L12 11L17 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="projects-columns">
              {(() => {
                // Grouper les projets par groupes de 5
                const columns = [];
                for (let i = 0; i < projects.length; i += 5) {
                  columns.push(projects.slice(i, i + 5));
                }
                return columns.map((column, columnIndex) => (
                  <ul key={columnIndex} className="projects-list-column">
                    {column.map((project, index) => {
                      const globalIndex = columnIndex * 5 + index;
                      return (
                        <li
                          key={project.id}
                          className="project-item"
                          style={{ '--delay': `${0.35 + globalIndex * 0.03}s` }}
                        >
                          <div className="project-header">
                            <span className="project-number">{project.id}.</span>
                            {project.link ? (
                              <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="project-link"
                                style={{ '--accent-color': project.color }}
                              >
                                {project.name}
                              </a>
                            ) : (
                              <span
                                className="project-link project-no-link"
                                style={{ '--accent-color': project.color }}
                              >
                                {project.name}
                              </span>
                            )}
                            <span className="project-date">{project.date}</span>
                          </div>
                          <p className="project-description">{project.description}</p>
                        </li>
                      );
                    })}
                  </ul>
                ));
              })()}
            </div>
          </div>
        </div>

        {/* Scrolling text banner */}
        <div className="scrolling-banner">
          <div className="scrolling-text">
            <span>{t.scrollingText} {t.scrollingText} {t.scrollingText} {t.scrollingText}</span>
            <span>{t.scrollingText} {t.scrollingText} {t.scrollingText} {t.scrollingText}</span>
          </div>
        </div>

        {/* Footer */}
        <footer className="footer">
          <div className="social-links">
            <a href="https://github.com/adellkl" target="_blank" rel="noopener noreferrer" className="social-link">
              <i className="fab fa-github"></i> <span className="social-text">{t.github}</span>
            </a>
            <a href="https://www.linkedin.com/in/adel-loukal-257541221/" target="_blank" rel="noopener noreferrer" className="social-link">
              <i className="fab fa-linkedin"></i> <span className="social-text">{t.linkedin}</span>
            </a>
            <button onClick={() => setIsContactOpen(true)} className="social-link contact-btn">
              <i className="fas fa-envelope"></i> <span className="social-text">{t.contact}</span>
            </button>
          </div>
          <div className="footer-right">
            <div className="footer-time">{time}</div>
          </div>
        </footer>

        {/* Contact Modal */}
        <Contact isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />

      </div>
    </HelmetProvider>
  );
};
