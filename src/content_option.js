const logotext = "A.Loukal";
const meta = {
    title: "Adel Loukal - Développeur Web React.js & UX/UI Designer à Paris",
    description: "Portfolio d'Adel Loukal, développeur web front-end spécialisé en React.js et UX/UI design à Paris. Expert en développement d'interfaces modernes et responsive. En recherche d'alternance pour septembre 2025.",
};

const introdata = {
    title: "Adel Loukal",
    animated: {
        first: "Développeur front-end React.js",
        second: "Expert UX/UI design",
        third: "Étudiant passionné",
    },
    description: "Bienvenue sur mon portfolio ! Je suis un développeur front-end passionné par la création d'interfaces utilisateur modernes et intuitives. Spécialisé en React.js et UX/UI design, je combine créativité et expertise technique pour créer des expériences web exceptionnelles.",
    your_img_url: "https://www.adelloukal.fr/moi.jpeg",
};

const dataabout = {
    title: "À propos de moi",
    aboutme: "Fraîchement diplômé d'un Bachelor Universitaire de Technologie, je suis passionné par le développement web et la cybersécurité. Mon expertise en React.js, JavaScript et UX/UI design me permet de créer des interfaces utilisateur modernes et sécurisées. Je recherche activement une formation et une entreprise pour la rentrée de septembre 2025, avec l'objectif d'approfondir mes compétences et de contribuer à des projets innovants.",
};
const worktimeline = [{
    jobtitle: "Développeur front-end ",
    where: "ISCOM Paris",
    date: "2023-2024",
},
{
    jobtitle: "Développement de mon portfolio",
    where: "Autonomie",
    date: "2023",
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
    title: "Mon alternance de 12 mois chez Iscom Paris",
    description: "Durant ma période d'alternance, j'ai eu l'opportunité de participer au développement d'une solution innovante pour répondre aux problématiques de l'entreprise. En collaboration avec un UX/UI designer, nous avons élaboré les maquettes et défini la charte graphique. Une fois ces étapes achevées, j'ai développé la partie front-end avec React.JS et Tailwind CSS, créant des interfaces dynamiques et cohérentes. Pour le back-end, j'ai utilisé Node.JS et Firebase pour la gestion des données et l'authentification des utilisateurs. Cette expérience m'a permis d'approfondir mes compétences en développement full-stack et de travailler efficacement en équipe pour résoudre des problèmes concrets tout en répondant aux besoins de l'entreprise.",
}, {
    title: "Mon stage de 5 mois en UX/UI design",
    description: "Mes missions étaient variées, mais principalement axées sur la création de contenu pour la plateforme Iscom Anytime. Cette tâche impliquait la conception, la rédaction et la mise en forme de divers types de contenus destinés à engager et informer les utilisateurs de la plateforme. J'ai travaillé sur des articles, des infographies, et d'autres supports multimédias, en veillant à ce que chaque pièce de contenu soit pertinente et attrayante. Cette expérience m'a permis de développer mes compétences en communication et en création de contenu, tout en contribuant à l'enrichissement de la plateforme Iscom Anytime.",
},


];

const dataportfolio = [
    {
        img: require("../src/assets/images/Figma.png"),
        titre: "Maquette Figma - ISCOM Talent",
        description: "Dans le cadre de mon stage de 6 mois en deuxième année de Bachelor, j'ai réalisé, en collaboration avec le chef de projet UX/UI (Monsieur Darabor), la maquette du projet 'ISCOM TALENT'. J'ai participé à la définition de la charte graphique, à l'élaboration de la maquette sur Figma et à la rédaction du cahier des charges détaillant les fonctionnalités et exigences du projet.",
        link: "https://www.figma.com/proto/EB2NXGZIzJlLeboP9cPWUo/ISCOM-Talent?node-id=555-4246&t=e0bL8NgCfYxG8nBX-0&scaling=scale-down&page-id=86%3A5531&starting-point-node-id=555%3A4246&show-proto-sidebar=1&content-scaling=fixed",
        technologies: ["React", "Tailwind CSS", "Node.js"],
    },
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
        link: "https://password-generator-khaki-iota-42.vercel.app/",
        technologies: ["React", "Tailwind CSS", "Node.js", "Supabase [Base de bonnées]"],
    },

    {
        img: require("../src/assets/images/portfolio.png"),
        titre: "Portfolio",
        description: "Portfolio réalisé avec React et TailwindCSS pour mettre en avant mes compétences et mes projets.",
        link: "https://github.com/adellkl/portfolio-loukal.git",
        technologies: ["React", "Tailwind CSS", "Node.js"],
    },






];


export default dataportfolio;


const contactConfig = {
    YOUR_EMAIL: "adelloukal2@gmail.com",
    YOUR_FONE: "0769120166",
    description: "N'hésitez pas à me contacter pour discuter de vos projets ou opportunités de collaboration.",
    // creat an emailjs.com account 
    // check out this tutorial https://www.emailjs.com/docs/examples/reactjs/
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


