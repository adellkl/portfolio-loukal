import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Container } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';
import './style.css';

const blogPostsData = [
    {
        slug: 'alternance-iscom-paris',
        title: "Mon alternance chez ISCOM Paris : Une expérience enrichissante",
        date: '16 Mars 2025',
        category: 'Expérience Pro',
        image: 'https://cdn.prod.website-files.com/64267cd26af7159117f5bbbe/64ccc3f938f65c060f927c5a_AnyConv.com__Visuel%20Article%20(1920%C2%A0%C3%97%C2%A01080%C2%A0px)%20(99).webp',
        content: `
# Mon alternance chez ISCOM Paris : Une expérience enrichissante

#

## Présentation de l'entreprise

ISCOM Paris est une école de communication et de marketing reconnue, située au cœur de Paris. L'école forme les futurs professionnels de la communication et du marketing digital, et dispose d'une plateforme d'apprentissage en ligne nommée "ISCOM Anytime".

## Le Projet : ISCOM Talent

Durant ma période d'alternance de 12 mois, j'ai participé au développement d'une solution innovante pour répondre aux problématiques de l'entreprise. Le projet principal était "ISCOM Talent", une plateforme destinée à faciliter la mise en relation entre les étudiants et les entreprises.

### Missions et Responsabilités

#### Développement Front-end
- Développement de l'interface utilisateur avec React.js et Tailwind CSS
- Création de composants réutilisables et dynamiques
- Intégration des maquettes Figma en code fonctionnel
- Optimisation des performances et de l'expérience utilisateur

#### Back-end et Infrastructure
- Utilisation de Node.js pour le développement back-end
- Mise en place de l'authentification avec Firebase
- Gestion de la base de données et des requêtes

#### Collaboration et Méthodologie
- Travail en étroite collaboration avec le chef de projet UX/UI
- Participation aux réunions quotidiennes et aux sprints
- Utilisation de la méthodologie Agile
- Code review et documentation

## Réalisations Concrètes

1. **Maquettage et Design**
   - Participation à la définition de la charte graphique
   - Création des maquettes sur Figma
   - Rédaction du cahier des charges

2. **Développement**
   - Mise en place de l'architecture front-end
   - Développement des fonctionnalités principales
   - Intégration des API et des services externes

3. **Optimisation**
   - Amélioration des performances
   - Tests et debugging
   - Documentation technique

## Compétences Acquises

- Maîtrise approfondie de React.js et Tailwind CSS
- Expérience en développement full-stack avec Node.js
- Utilisation professionnelle de Figma
- Gestion de projet en méthodologie Agile
- Travail en équipe et communication

Cette alternance a été une expérience extrêmement enrichissante qui m'a permis de développer mes compétences techniques et professionnelles dans un environnement stimulant.
    `
    },
    {
        slug: 'stage-developpeur-frontend',
        title: "Mon stage chez ISCOM Paris : Assistant chef de projet UX/UI",
        date: '22 Janvier 2025',
        category: 'Expérience Pro',
        image: 'https://www.larsg.fr/wp-content/uploads/2017/07/ISCOM-PARIS.jpg',
        content: `
# Mon stage chez ISCOM Paris : Assistant chef de projet UX/UI

![ISCOM Paris](https://www.larsg.fr/wp-content/uploads/2017/07/ISCOM-PARIS.jpg)

## Présentation de l'entreprise

ISCOM Paris est une école de communication et de marketing de premier plan, offrant des formations innovantes dans le domaine du digital. L'école se distingue par sa plateforme d'apprentissage en ligne "ISCOM Anytime" et son engagement dans la transformation digitale de l'éducation.

## Le Contexte

Durant mon stage de 5 mois en tant qu'assistant chef de projet UX/UI, j'ai eu l'opportunité de travailler sur la plateforme ISCOM Anytime, un projet majeur de l'école visant à enrichir l'expérience d'apprentissage des étudiants.

### Missions Principales

#### Création de Contenu
- Conception et rédaction de contenus pour la plateforme
- Création d'infographies et de supports multimédias
- Optimisation du contenu pour l'engagement des utilisateurs

#### Design UX/UI
- Collaboration avec le chef de projet UX/UI, M. Darabor
- Participation à la conception des interfaces utilisateur
- Création de maquettes sur Figma

#### Gestion de Projet
- Participation à la rédaction du cahier des charges
- Suivi des deadlines et des objectifs
- Communication avec les différentes parties prenantes

## Projet Phare : ISCOM Talent

Un des projets majeurs sur lequel j'ai travaillé était "ISCOM Talent", où j'ai :
- Participé à la définition de la charte graphique
- Créé des maquettes détaillées sur Figma
- Contribué à la rédaction du cahier des charges fonctionnel

## Compétences Développées

1. **Techniques**
   - Maîtrise de Figma pour le design d'interface
   - Création de contenu digital
   - Compréhension des principes UX/UI

2. **Professionnelles**
   - Gestion de projet
   - Communication en équipe
   - Rédaction technique

## Impact et Résultats

Ce stage m'a permis de :
- Acquérir une expérience concrète en UX/UI design
- Comprendre les enjeux de la transformation digitale
- Développer mes compétences en gestion de projet
- Contribuer à l'amélioration d'une plateforme éducative majeure

Cette expérience a été fondamentale dans mon parcours professionnel, me permettant de combiner mes compétences techniques avec une compréhension approfondie des besoins utilisateurs.
    `
    },
    {
        slug: 'formation-but-mmi',
        title: "BUT MMI : Mon parcours dans le multimédia et l'internet",
        date: '23 février 2025',
        category: 'Formation',
        image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2940&auto=format&fit=crop',
        content: `
# BUT MMI : Mon parcours dans le multimédia et l'internet

Le BUT Métiers du Multimédia et de l'Internet (MMI) a été le tremplin parfait pour ma carrière dans le développement web. Voici un aperçu de cette formation complète.

## Une Formation Polyvalente

### Développement Web
- HTML5, CSS3, JavaScript
- PHP, MySQL
- Frameworks modernes (React, Vue.js)

### Design et Communication
- UI/UX Design
- Communication digitale
- Création graphique

### Gestion de Projet
- Méthodologies Agiles
- Gestion d'équipe
- Conduite de projet web

## Projets Académiques Marquants

1. **Portfolio Personnel**
   - Développement from scratch
   - Design responsive
   - Optimisation SEO

2. **Projets en Équipe**
   - Application web collaborative
   - Site vitrine pour client réel
   - Projets innovants en hackathon

## Compétences Développées

- **Techniques** : Maîtrise des langages et frameworks web
- **Créatives** : Design thinking, création de contenu
- **Managériales** : Leadership, gestion de projet

## Pourquoi MMI ?

Cette formation m'a permis de :
- Acquérir une vision globale du web
- Développer des compétences techniques solides
- Me spécialiser en développement front-end
- Travailler sur des projets concrets

Le BUT MMI a été le choix parfait pour débuter ma carrière, me donnant une base solide pour mes futures expériences professionnelles.
    `
    },
    {
        slug: 'optimisation-seo-portfolio-react',
        title: "Comment j'ai optimisé le SEO de mon portfolio React",
        date: '13 Mars 2025',
        category: 'SEO & Performance',
        image: 'https://images.unsplash.com/photo-1607706189992-eae578626c86?q=80&w=2940&auto=format&fit=crop',
        content: `
# Comment j'ai optimisé le SEO de mon portfolio React

En tant que développeur front-end, j'ai récemment entrepris d'améliorer le référencement de mon portfolio React. Voici les étapes clés que j'ai suivies et les résultats obtenus.

## 1. Mise en place des meta tags essentiels

J'ai commencé par implémenter les meta tags fondamentaux avec react-helmet-async :

\`\`\`jsx
<Helmet>
  <title>Adel Loukal - Développeur Front-end React</title>
  <meta name="description" content="Portfolio d'Adel Loukal, développeur front-end spécialisé en React.js" />
</Helmet>
\`\`\`

## 2. Création du sitemap.xml et robots.txt

Pour faciliter le crawl de mon site par les moteurs de recherche, j'ai ajouté :

- Un fichier sitemap.xml listant toutes mes pages
- Un fichier robots.txt pour guider les robots d'indexation

## 3. Optimisation des performances

J'ai utilisé plusieurs techniques pour améliorer les performances :

- Lazy loading des images
- Code splitting avec React.lazy()
- Optimisation des assets statiques

## 4. Résultats obtenus

Après ces optimisations, j'ai constaté :

- Une amélioration significative du score Lighthouse
- Une meilleure indexation dans Google
- Une augmentation de la visibilité de mon portfolio

## Conclusion

Ces optimisations SEO ont considérablement amélioré la visibilité de mon portfolio, démontrant l'importance d'une bonne stratégie SEO même pour un site React.
    `
    },
    {
        slug: 'integration-google-analytics-react',
        title: "Comment j'ai intégré Google Analytics à mon portfolio React",
        date: '20 Mars 2025',
        category: 'Analytics',
        image: 'https://images.unsplash.com/photo-1613909207039-6b173b755cc1?q=80&w=2942&auto=format&fit=crop',
        content: `
# Intégration de Google Analytics dans mon portfolio React

L'analyse des données est cruciale pour comprendre comment les visiteurs interagissent avec mon portfolio. Voici comment j'ai intégré Google Analytics 4.

## 1. Configuration initiale

J'ai commencé par créer un compte Google Analytics 4 et obtenir mon ID de mesure. Ensuite, j'ai installé react-ga4 :

\`\`\`bash
npm install react-ga4
\`\`\`

## 2. Implémentation dans React

J'ai configuré GA4 dans mon application :

\`\`\`jsx
import ReactGA from 'react-ga4';

ReactGA.initialize('G-XXXXXXXXXX');
\`\`\`

## 3. Suivi des pages et événements

J'ai mis en place :

- Le suivi automatique des changements de page
- Des événements personnalisés pour les interactions importantes
- Le suivi des clics sur les liens externes

## 4. Protection de la vie privée

J'ai veillé à :

- Implémenter un banner de consentement aux cookies
- Respecter le RGPD
- Anonymiser les IPs des visiteurs

## Résultats

Cette intégration me permet maintenant de :

- Suivre le comportement des utilisateurs
- Identifier les pages les plus visitées
- Optimiser mon contenu en fonction des données
    `
    },
    {
        slug: 'creation-blog-technique-react',
        title: "Comment j'ai créé ce blog technique avec React",
        date: '11 Mars 2024',
        category: 'Développement',
        image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?q=80&w=2874&auto=format&fit=crop',
        content: `
# Création d'un blog technique avec React

J'ai décidé d'ajouter un blog à mon portfolio pour partager mon expérience technique. Voici comment je l'ai construit.

## 1. Architecture technique

J'ai opté pour :

- React pour le front-end
- React Router pour la navigation
- React Markdown pour le rendu des articles
- CSS Modules pour le styling

## 2. Structure des composants

\`\`\`jsx
src/
  ├── pages/
  │   └── blog/
  │       ├── index.js
  │       ├── BlogPost.js
  │       └── style.css
  └── components/
      └── BlogCard.js
\`\`\`

## 3. Gestion du contenu

Pour chaque article, je structure les données ainsi :

\`\`\`javascript
{
  slug: 'mon-article',
  title: 'Titre de l\'article',
  date: 'Date',
  category: 'Catégorie',
  content: '# Contenu en Markdown'
}
\`\`\`

## 4. Design et UX

J'ai mis l'accent sur :

- Une navigation fluide
- Un design responsive
- Une excellente lisibilité
- Des transitions élégantes

## Conclusion

Ce blog technique me permet de :

- Partager mes connaissances
- Documenter mon apprentissage
- Améliorer ma visibilité en tant que développeur
    `
    }
];

export const BlogPost = () => {
    const { slug } = useParams();
    const navigate = useNavigate();

    const post = blogPostsData.find(post => post.slug === slug);

    if (!post) {
        navigate('/blog');
        return null;
    }

    return (
        <article className="Blog-post">
            <Helmet>
                <title>{post.title} | Adel Loukal - Blog</title>
                <meta name="description" content={post.content.substring(0, 155)} />
                <meta property="og:title" content={post.title} />
                <meta property="og:description" content={post.content.substring(0, 155)} />
                <meta property="og:image" content={post.image} />
                <meta property="og:type" content="article" />
                <meta name="twitter:card" content="summary_large_image" />
            </Helmet>

            <Container>
                <Link to="/blog" className="back-link">
                    ← Retour aux articles
                </Link>

                <header className="blog-post-header">
                    <div className="category-tag">{post.category}</div>
                    <h1 className="blog-post-title">{post.title}</h1>
                    <div className="post-meta">
                        <span>Publié le {post.date}</span>
                    </div>
                </header>

                <div className="blog-post-image">
                    <img src={post.image} alt={post.title} />
                </div>

                <div className="blog-post-content">
                    <ReactMarkdown>{post.content}</ReactMarkdown>
                </div>
            </Container>
        </article>
    );
}; 