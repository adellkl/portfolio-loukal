const logotext = "A.Loukal";
const meta = {
    title: "Adel Loukal - Développeur Web React.js & UX/UI Designer à Paris",
    description: "Portfolio d'Adel Loukal, développeur web front-end freelance spécialisé en React.js et UX/UI design à Paris. Expert en développement d'applications web modernes, performantes et responsive. Disponible pour vos projets de création de sites web sur mesure.",
};

const introdata = {
    title: "Adel Loukal",
    animated: {
        first: "Développeur React.js",
        second: "UX/UI designer",
        third: "Créateur d'interfaces"
    },
    description: "Développeur front-end freelance spécialisé en React.js. Je transforme vos idées en applications web modernes et performantes. Création de sites web sur mesure adaptés à vos besoins, avec un accompagnement personnalisé de A à Z.",
    your_img_url: "https://www.adelloukal.fr/moi.jpeg",
};

const dataabout = {
    title: "À propos de moi",
    aboutme: "Développeur front-end freelance spécialisé en React.js et UX/UI design. Je crée des sites web modernes et performants adaptés à vos besoins.",
};


const worktimeline = [
    {
        jobtitle: "Test Psychotechnique Permis",
        where: "Site Next.js - Client",
        date: "2025",
        link: "https://test-psychotechnique-permis.com/"
    },
    {
        jobtitle: "Alpha Fight Club",
        where: "Site vitrine React - Client",
        date: "2025",
        link: "https://alpha-fight-club.vercel.app/"
    },
    {
        jobtitle: "Développement de mon portfolio",
        where: "Autonomie",
        date: "2025",
    }, {
        jobtitle: "Développeur front-end ",
        where: "ISCOM Paris",
        date: "2023-2024",
    },

    {
        jobtitle: "Assistant chef de projet UX/UI design",
        where: "ISCOM Paris",
        date: "Avril-Septembre 2023",
    },
];

const skills = [
    {
        name: "Javascript",
        value: 70,
    },
    {
        name: "React.JS",
        value: 70,
    },
    {
        name: "TailwindCSS",
        value: 80,
    },
    {
        name: "Figma",
        value: 60,
    },
];

const services = [{
    title: "Mes services de développement web freelance",
    description: "En tant que développeur freelance, je vous propose la création complète de votre site web sur mesure. De la conception de l'interface utilisateur à la mise en ligne, je prends en charge toutes les étapes de votre projet : analyse de vos besoins, design moderne et responsive avec Figma, développement front-end avec React.js et TailwindCSS, intégration d'un back-end performant avec Node.js et Firebase si nécessaire. Mon approche orientée UX/UI garantit une expérience utilisateur optimale et un design qui reflète l'identité de votre marque. Disponibilité, réactivité et qualité sont mes priorités pour transformer votre vision en réalité digitale.",
}, {
    title: "Mon expérience chez ISCOM Paris - 12 mois",
    description: "Durant mon expérience de 12 mois chez ISCOM Paris, j'ai développé des solutions web innovantes en tant que développeur front-end. En collaboration avec une équipe UX/UI, j'ai participé à l'élaboration de maquettes, la définition de chartes graphiques, et le développement d'interfaces avec React.js et Tailwind CSS. J'ai également intégré des solutions back-end avec Node.js et Firebase pour l'authentification et la gestion des données. Cette expérience professionnelle enrichissante m'a permis de maîtriser les processus de développement en équipe et de livrer des projets complets répondant aux besoins des utilisateurs.",
}];

const dataportfolio = [

    {
        img: require("../src/assets/images/Openmat.png"),
        titre: "OpenMat France - Gestion des Open Mats",
        description: "OpenMat France est une application permettant d'ajouter et de consulter des sessions d'Open Mat de Jiu-Jitsu Brésilien et de Grappling en France. Les utilisateurs peuvent créer un événement en remplissant un formulaire.",
        link: "https://open-mat-france.vercel.app/",
        technologies: ["React", "Tailwind CSS", "Node.js", "Supabase [Base de bonnées]"],
    },
    {
        img: require("../src/assets/images/mdp.png"),
        titre: "MDP - Générateur",
        description: "Mon application vous aide à créer des mots de passe sécurisés pour tous vos identifiants. Elle génère des mots de passe robustes et uniques, incluant des caractères spéciaux, des chiffres et des lettres majuscules/minuscules, pour protéger vos comptes contre les cybermenaces.",
        link: "https://password-generator-mocha-sigma.vercel.app/",
        technologies: ["React", "Tailwind CSS", "Node.js", "Supabase [Base de bonnées]"],
    },
    {
        img: require("../src/assets/images/portfolio.png"),
        titre: "Portfolio",
        description: "Portfolio réalisé avec React et TailwindCSS pour mettre en avant mes compétences et mes projets.",
        link: "https://github.com/adellkl/portfolio-loukal.git",
        technologies: ["React", "Tailwind CSS", "Node.js"],
    },
    {
        img: require("../src/assets/images/test-psychotechnique permis.png"),
        titre: "test-psychotechnique-permis",
        description: "Site web moderne développé avec Next.js pour la préparation aux tests psychotechniques du permis de conduire.",
        link: "https://test-psychotechnique-permis.com",
        technologies: ["Next.js", "React", "TailwindCSS"],
    }, {
        img: require("../src/assets/images/Alpha-fight-club.png"),
        titre: "Alpha Fight Club",
        description: "Site Réalisé avec React et TailwindCSS pour mettre en avant un club de grappling et de jiu-jitsu brésilien. ",
        link: "https://alpha-fight-club.vercel.app/",
        technologies: ["React", "Tailwind CSS", "Node.js", "Supabase [Base de bonnées]"],
    },
    {
        img: require("../src/assets/images/Figma.png"),
        titre: "Maquette Figma - ISCOM Talent",
        description: "Dans le cadre de mon stage de 6 mois en deuxième année de Bachelor, j'ai réalisé, en collaboration avec le chef de projet UX/UI (Monsieur Darabor), la maquette du projet 'ISCOM TALENT'. J'ai participé à la définition de la charte graphique, à l'élaboration de la maquette sur Figma et à la rédaction du cahier des charges détaillant les fonctionnalités et exigences du projet.",
        link: "https://www.figma.com/proto/EB2NXGZIzJlLeboP9cPWUo/ISCOM-Talent?node-id=555-4246&t=e0bL8NgCfYxG8nBX-0&scaling=scale-down&page-id=86%3A5531&starting-point-node-id=555%3A4246&show-proto-sidebar=1&content-scaling=fixed",
        technologies: ["React", "Tailwind CSS", "Node.js"],
    },
];

export default dataportfolio;

const contactConfig = {
    YOUR_EMAIL: "adelloukal2@gmail.com",
    YOUR_FONE: "0769120166",
    description: "N'hésitez pas à me contacter pour discuter de vos projets ou opportunités de collaboration.",
    YOUR_SERVICE_ID: "service_e22vuqz",
    YOUR_TEMPLATE_ID: "template_yuw54r4",
    YOUR_USER_ID: "Sd6qtk3ZZ8OuP3eLR",
};

const socialprofils = {
    github: "https://github.com/adellkl",
    linkedin: "https://www.linkedin.com/in/adel-loukal-257541221/",
    Twitch: "https://bento.me/adel-loukal",
};


export {
    meta,
    dataabout,
    dataportfolio,
    worktimeline,
    skills,
    services,
    introdata,
    contactConfig,
    socialprofils,
    logotext,
};


