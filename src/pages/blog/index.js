import React, { useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container, Row, Col } from "react-bootstrap";
import { meta } from "../../content_option";
import "./style.css";
import { Link } from "react-router-dom";

export const Blog = () => {
    const [selectedCategory, setSelectedCategory] = useState("all");

    const categories = [
        { id: "all", name: "Tous les articles" },
        { id: "experience", name: "Expérience Pro" },
        { id: "formation", name: "Formation" },
        { id: "developpement", name: "Développement" },
        { id: "seo", name: "SEO & Performance" },
        { id: "analytics", name: "Analytics" }
    ];

    const blogPosts = [
        {
            id: 1,
            title: "Mon alternance chez ISCOM Paris : Une expérience enrichissante",
            excerpt: "Découvrez mon parcours en tant que développeur front-end en alternance chez ISCOM Paris, les projets réalisés et les compétences acquises...",
            date: "16 Mars 2024",
            category: "experience",
            image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2940&auto=format&fit=crop",
            slug: "alternance-iscom-paris"
        },
        {
            id: 2,
            title: "Mon stage de développeur front-end : Premiers pas dans le monde professionnel",
            excerpt: "Retour sur mon expérience de stage en développement web, les projets clients et les apprentissages clés...",
            date: "15 Mars 2024",
            category: "experience",
            image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=2940&auto=format&fit=crop",
            slug: "stage-developpeur-frontend"
        },
        {
            id: 3,
            title: "BUT MMI : Mon parcours dans le multimédia et l'internet",
            excerpt: "Découvrez comment la formation BUT MMI m'a permis d'acquérir une base solide en développement web et en design...",
            date: "14 Mars 2024",
            category: "formation",
            image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2940&auto=format&fit=crop",
            slug: "formation-but-mmi"
        },
        {
            id: 4,
            title: "Comment j'ai optimisé le SEO de mon portfolio React",
            excerpt: "Les techniques et stratégies utilisées pour améliorer le référencement de mon portfolio React...",
            date: "13 Mars 2024",
            category: "seo",
            image: "https://images.unsplash.com/photo-1607706189992-eae578626c86?q=80&w=2940&auto=format&fit=crop",
            slug: "optimisation-seo-portfolio-react"
        },
        {
            id: 5,
            title: "Comment j'ai intégré Google Analytics à mon portfolio React",
            excerpt: "Guide détaillé sur l'intégration et la configuration de Google Analytics 4 dans une application React...",
            date: "12 Mars 2024",
            category: "analytics",
            image: "https://images.unsplash.com/photo-1613909207039-6b173b755cc1?q=80&w=2942&auto=format&fit=crop",
            slug: "integration-google-analytics-react"
        },
        {
            id: 6,
            title: "Comment j'ai créé ce blog technique avec React",
            excerpt: "Le processus de création de ce blog technique, de l'architecture à l'implémentation...",
            date: "11 Mars 2024",
            category: "developpement",
            image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?q=80&w=2874&auto=format&fit=crop",
            slug: "creation-blog-technique-react"
        }
    ];

    const filteredPosts = selectedCategory === "all"
        ? blogPosts
        : blogPosts.filter(post => post.category === selectedCategory);

    return (
        <HelmetProvider>
            <Container className="Blog-header">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Blog Technique | {meta.title}</title>
                    <meta
                        name="description"
                        content="Blog technique d'Adel Loukal - Articles sur le développement web, React.js, et l'UX/UI design. Partageons nos connaissances !"
                    />
                </Helmet>

                <Row className="mb-5 mt-3 pt-md-3">
                    <Col lg="8">
                        <h1 className="display-4 mb-4">Blog Technique</h1>
                        <hr className="t_border my-4 ml-0 text-left" />
                    </Col>
                </Row>

                <Row className="mb-4">
                    <Col lg="12">
                        <div className="blog-categories">
                            {categories.map(category => (
                                <button
                                    key={category.id}
                                    className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                                    onClick={() => setSelectedCategory(category.id)}
                                >
                                    {category.name}
                                </button>
                            ))}
                        </div>
                    </Col>
                </Row>

                <Row>
                    {filteredPosts.map(post => (
                        <Col lg="4" md="6" className="mb-4" key={post.id}>
                            <Link
                                to={`/blog/${post.slug}`}
                                className="blog-post-card"
                                data-category={post.category}
                                data-filtered={selectedCategory !== "all"}
                            >
                                <div className="blog-post-image">
                                    <img src={post.image} alt={post.title} />
                                    <div className="category-tag">{categories.find(c => c.id === post.category)?.name}</div>
                                </div>
                                <div className="blog-post-content">
                                    <h3>{post.title}</h3>
                                    <p className="post-excerpt">{post.excerpt}</p>
                                    <div className="post-meta">
                                        <span className="post-date">{post.date}</span>
                                        <span className="read-more">Lire la suite →</span>
                                    </div>
                                </div>
                            </Link>
                        </Col>
                    ))}
                </Row>
            </Container>
        </HelmetProvider>
    );
}; 