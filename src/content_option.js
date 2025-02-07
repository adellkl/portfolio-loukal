const logotext = "A.Loukal";
const meta = {
    title: "Adel Loukal",
    description: "Je suis Adel Loukal, étudiant en alternance chez ISCOM Paris ",
};

const introdata = {
    title: "Adel Loukal ",
    animated: {
        first: "Développeur front-end",
        second: "UX/UI design",
        third: "Etudiant",

    },
    description: "Bienvenue sur mon portfolio. Vous y trouverez mes réalisations, mes expériences professionnelles et mes formations. Bonne visite ! ",
    your_img_url: "https://images.unsplash.com/photo-1514790193030-c89d266d5a9d",
};

const dataabout = {
    title: "A propos de moi",
    aboutme: "Fraîchement diplômé d’un Bachelor Universitaire de Technologie, j’aimerais approfondir mes connaissances en développement web et en cybersécurité. C'est pourquoi je recherche activement une formation et une entreprise pour une rentrée décalée en mars 2025.",

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
        name: "React",
        value: 70,
    },
    {
        name: "VS Code",
        value: 90,
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
    title: "Mon stage de 6 mois en UX/UI design",
    description: "Mes missions étaient variées, mais principalement axées sur la création de contenu pour la plateforme Iscom Anytime. Cette tâche impliquait la conception, la rédaction et la mise en forme de divers types de contenus destinés à engager et informer les utilisateurs de la plateforme. J'ai travaillé sur des articles, des infographies, et d'autres supports multimédias, en veillant à ce que chaque pièce de contenu soit pertinente et attrayante. Cette expérience m'a permis de développer mes compétences en communication et en création de contenu, tout en contribuant à l'enrichissement de la plateforme Iscom Anytime.",
},


];

const dataportfolio = [
    {
        img: require("../src/assets/images/Figma.png"),
        titre: "Maquette Figma - ISCOM Talent",
        description: "Dans le cadre de mon stage de 6 mois en deuxième année de Bachelor, j'ai réalisé, en collaboration avec le chef de projet UX/UI (Monsieur Darabor), la maquette du projet 'ISCOM TALENT'. J'ai participé à la définition de la charte graphique, à l'élaboration de la maquette sur Figma et à la rédaction du cahier des charges détaillant les fonctionnalités et exigences du projet.",
        link: "https://www.figma.com/proto/EB2NXGZIzJlLeboP9cPWUo/ISCOM-Talent?node-id=555-4246&t=e0bL8NgCfYxG8nBX-0&scaling=scale-down&page-id=86%3A5531&starting-point-node-id=555%3A4246&show-proto-sidebar=1&content-scaling=fixed",
    },
    {
        img: require("../src/assets/images/sae501.png"),
        titre: "Projet universitaire - Initiation à Nunjucks",
        description: "Projet réalisé en groupe dans le cadre de ma formation universitaire. L'objectif était de concevoir un site dynamique en utilisant le moteur de templating Nunjucks, combiné avec Javascript, SCSS et CSS. Nous avons mis en place une architecture modulaire et appris à manipuler des templates pour optimiser la structure et le rendu du site.",
        link: "https://xd.adobe.com/view/95c93a87-3bd9-475d-8adf-6d6937baace9-c09a/flow",
    },
    {
        img: require("../src/assets/images/Clone.png"),
        titre: "Reproduction de l'interface de ChatGPT 4",
        description: "Réalisation d'un clone de l'ancienne interface de ChatGPT en utilisant uniquement HTML, CSS et Javascript. Ce projet m'a permis de travailler sur la mise en page responsive et de reproduire fidèlement les éléments interactifs de l'interface utilisateur.",
        link: "https://github.com/adellkl/clone-chatgpt-interface",
    },
    {
        img: require("../src/assets/images/Extention.png"),
        titre: "Développement d'une extension Chrome - Calculatrice",
        description: "Création d'une extension Chrome permettant d'effectuer des calculs directement depuis le navigateur. Développée en Javascript, elle intègre une interface simple et intuitive permettant aux utilisateurs de réaliser rapidement des opérations mathématiques sans quitter leur onglet en cours.",
        link: "https://github.com/adellkl/Extension-chrome",
        readme: "https://raw.githubusercontent.com/adellkl/Extension-chrome/main/README.md",
    },
    {
        img: require("../src/assets/images/sae501.png"),
        titre: "Extension Chrome - Analyse du temps d'écran",
        description: "Développement d'une extension Chrome permettant aux utilisateurs de suivre le temps passé sur chaque site web. Elle propose des fonctionnalités avancées comme le filtrage des résultats par durée et par groupe de sites, offrant ainsi une analyse détaillée du temps d'écran et des habitudes de navigation.",
        link: "https://xd.adobe.com/view/95c93a87-3bd9-475d-8adf-6d6937baace9-c09a/flow",
    },
    {
        img: require("../src/assets/images/Crud.png"),
        titre: "CRUD en PHP - Gestion des données",
        description: "Développement d'un système de gestion des données (CRUD : Create, Read, Update, Delete) en utilisant PHP, HTML et CSS. Ce projet permet d'ajouter, modifier, supprimer et afficher des données stockées dans une base de données MySQL via une interface web conviviale.",
        link: "https://github.com/adellkl/CRUD_Portfolio",
    }
];


export default dataportfolio;


const contactConfig = {
    YOUR_EMAIL: "adelloukal2@gmail.com",
    YOUR_FONE: "0769120166",
    description: " ",
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


