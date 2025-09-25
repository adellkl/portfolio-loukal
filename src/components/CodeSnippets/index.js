import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Badge, Button, Modal, Form } from 'react-bootstrap';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import './style.css';

const CodeSnippets = () => {
  const [snippets, setSnippets] = useState([]);
  const [selectedSnippet, setSelectedSnippet] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const initialSnippets = [
    {
      id: 1,
      title: "Animation GSAP avec ScrollTrigger",
      language: "javascript",
      category: "Animation",
      tags: ["gsap", "scroll", "animation"],
      description: "Animation d'apparition d'éléments au scroll avec GSAP",
      code: `import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const animateOnScroll = (element) => {
  gsap.fromTo(element, 
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    }
  );
};`,
      usage: "Utilisé pour animer l'apparition des cartes dans le portfolio"
    },
    {
      id: 2,
      title: "Hook React pour API GitHub",
      language: "javascript",
      category: "React",
      tags: ["react", "hook", "api", "github"],
      description: "Hook personnalisé pour récupérer les données GitHub",
      code: `import { useState, useEffect } from 'react';

const useGitHubData = (username) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(\`https://api.github.com/users/\${username}\`);
        if (!response.ok) throw new Error('Failed to fetch');
        const userData = await response.json();
        setData(userData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username]);

  return { data, loading, error };
};

export default useGitHubData;`,
      usage: "Hook réutilisable pour afficher les stats GitHub en temps réel"
    },
    {
      id: 3,
      title: "Toggle Theme Dark/Light",
      language: "javascript",
      category: "Theme",
      tags: ["theme", "dark-mode", "css", "localStorage"],
      description: "Système de basculement entre thème sombre et clair",
      code: `const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('theme') === 'dark' || 
           window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <button onClick={toggleTheme} className="theme-toggle">
      {isDark ? '☀️' : '🌙'}
    </button>
  );
};`,
      usage: "Implémenté dans le header pour changer de thème"
    },
    {
      id: 4,
      title: "Responsive Grid CSS",
      language: "css",
      category: "CSS",
      tags: ["css", "grid", "responsive"],
      description: "Grid CSS responsive avec auto-fit",
      code: `.responsive-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem;
}

.grid-item {
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 1.5rem;
  transition: transform 0.3s ease;
}

.grid-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .responsive-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
    padding: 1rem;
  }
}`,
      usage: "Layout utilisé pour les sections projets et compétences"
    },
    {
      id: 5,
      title: "Validation de formulaire",
      language: "javascript",
      category: "Forms",
      tags: ["validation", "forms", "regex"],
      description: "Validation côté client avec regex",
      code: `const validateForm = (formData) => {
  const errors = {};
  
  // Email validation
  const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    errors.email = "Format d'email invalide";
  }
  
  // Name validation
  if (formData.name.length < 2) {
    errors.name = "Le nom doit contenir au moins 2 caractères";
  }
  
  // Message validation
  if (formData.message.length < 10) {
    errors.message = "Le message doit contenir au moins 10 caractères";
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Usage dans un composant
const handleSubmit = (e) => {
  e.preventDefault();
  const { isValid, errors } = validateForm(formData);
  
  if (isValid) {
    // Envoyer le formulaire
    submitForm(formData);
  } else {
    setFormErrors(errors);
  }
};`,
      usage: "Utilisé dans le formulaire de contact"
    },
    {
      id: 6,
      title: "Debounce Hook",
      language: "javascript",
      category: "Performance",
      tags: ["debounce", "performance", "search"],
      description: "Hook pour optimiser les recherches en temps réel",
      code: `import { useState, useEffect } from 'react';

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Usage
const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    if (debouncedSearchTerm) {
      // Effectuer la recherche
      performSearch(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  return (
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Rechercher..."
    />
  );
};`,
      usage: "Optimise les performances lors de la recherche"
    }
  ];

  useEffect(() => {
    setSnippets(initialSnippets);
  }, []);

  const categories = ['all', ...new Set(snippets.map(s => s.category))];

  const filteredSnippets = snippets.filter(snippet => {
    const matchesFilter = filter === 'all' || snippet.category === filter;
    const matchesSearch = snippet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         snippet.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
    // Vous pouvez ajouter une notification ici
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Animation': 'primary',
      'React': 'info',
      'Theme': 'warning',
      'CSS': 'success',
      'Forms': 'danger',
      'Performance': 'secondary'
    };
    return colors[category] || 'secondary';
  };

  return (
    <div className="code-snippets-container">
      <div className="snippets-header">
        <h3>📚 Bibliothèque de Code</h3>
        <p>Solutions réutilisables et bonnes pratiques</p>
      </div>

      <div className="snippets-filters">
        <Form.Control
          type="text"
          placeholder="Rechercher un snippet..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        
        <div className="category-filters">
          {categories.map(category => (
            <Button
              key={category}
              variant={filter === category ? 'primary' : 'outline-primary'}
              size="sm"
              onClick={() => setFilter(category)}
              className="category-btn"
            >
              {category === 'all' ? 'Tous' : category}
            </Button>
          ))}
        </div>
      </div>

      <Row>
        {filteredSnippets.map(snippet => (
          <Col lg={6} className="mb-4" key={snippet.id}>
            <Card className="snippet-card">
              <Card.Header>
                <div className="snippet-header">
                  <h5>{snippet.title}</h5>
                  <Badge bg={getCategoryColor(snippet.category)}>
                    {snippet.category}
                  </Badge>
                </div>
              </Card.Header>
              
              <Card.Body>
                <p className="snippet-description">{snippet.description}</p>
                
                <div className="snippet-tags">
                  {snippet.tags.map(tag => (
                    <Badge key={tag} bg="secondary" className="me-1">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="snippet-preview">
                  <SyntaxHighlighter
                    language={snippet.language}
                    style={vscDarkPlus}
                    customStyle={{
                      fontSize: '0.8rem',
                      maxHeight: '150px',
                      overflow: 'hidden'
                    }}
                  >
                    {snippet.code.substring(0, 200) + '...'}
                  </SyntaxHighlighter>
                </div>
                
                <div className="snippet-actions">
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => {
                      setSelectedSnippet(snippet);
                      setShowModal(true);
                    }}
                  >
                    👁️ Voir le code
                  </Button>
                  <Button
                    variant="outline-success"
                    size="sm"
                    onClick={() => copyToClipboard(snippet.code)}
                  >
                    📋 Copier
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal pour afficher le code complet */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{selectedSnippet?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedSnippet && (
            <>
              <p>{selectedSnippet.description}</p>
              
              <div className="code-container">
                <SyntaxHighlighter
                  language={selectedSnippet.language}
                  style={vscDarkPlus}
                  showLineNumbers
                >
                  {selectedSnippet.code}
                </SyntaxHighlighter>
              </div>
              
              <div className="usage-info">
                <h6>💡 Utilisation :</h6>
                <p>{selectedSnippet.usage}</p>
              </div>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="success"
            onClick={() => copyToClipboard(selectedSnippet?.code)}
          >
            📋 Copier le code
          </Button>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CodeSnippets;
