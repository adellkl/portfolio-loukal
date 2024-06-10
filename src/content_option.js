const logotext = "A.Loukal";
const meta = {
    title: "Adel Loukal",
    description: "Je suis Adel Loukal, étudiant en alternance chez ISCOM Paris ",
};

const introdata = {
    title: "Adel Loukal ✌️ ",
    animated: {
        first: "Développeur front-end",
        second: "Web designer",
        third: "Etudiant",
       
    },
    description: "Bienvenue sur mon portfolio. Vous y trouverez mes réalisations, mes expériences professionnelles et mes formations. Bonne visite ! ",
    your_img_url: "https://images.unsplash.com/photo-1514790193030-c89d266d5a9d",
};

const dataabout = {
    title: "A propos de moi",
    aboutme: "Jeune passionné d'informatique et de design, actuellement en BUT MMI, spécialisation développement web et dispositifs interactifs, en alternance chez ISCOM Paris.",
};
const worktimeline = [{
        jobtitle: "Développeur front-end ",
        where: "ISCOM Paris",
        date: "2023-2024",
    },
    {
        jobtitle: "Assistant chef de projet UX/UI design",
        where: "ISCOM Paris",
        date: "Avril-Septembre 2023",
    },
    {
        jobtitle: "Merchandising",
        where: "Actiale",
        date: "2022",
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
        name: "TailwindCSS",
        value: 80,
    },
    {
        name: "Figma",
        value: 60,
    },
    {
        name: "StarUML",
        value: 90,
    },
];

const services = [{
        title: "Mon alternance de 12 mois chez Iscom Paris",
        description: "Durant ma période d'alternance, j'ai eu l'occasion de travailler sur le développement d'une solution qui répondait aux problèmes de l'entreprise. J'ai collaboré avec un UX/UI designer, nous avons fait les maquettes, la charte graphique, et une fois toutes ces étapes terminées, j'ai commencé à coder avec React.JS et Tailwind pour le côté front-end, et pour le back-end, avec Node.JS et Firebase pour la base de données.",
    },{
        title: "Mon stage de 6 mois en UX/UI design",
        description: "Mes missions étaient variées, mais principalement je faisais de la création de contenu pour la plateforme Iscom Anytime.",
    },
  
  
];

const dataportfolio = [
    {
        img: require("../src/assets/images/Figma.png"),
        description: "Maquette et prototypage ISCOM Talent.",
        link: "https://www.figma.com/proto/EB2NXGZIzJlLeboP9cPWUo/ISCOM-Talent?node-id=555-4246&t=e0bL8NgCfYxG8nBX-0&scaling=scale-down&page-id=86%3A5531&starting-point-node-id=555%3A4246&show-proto-sidebar=1&content-scaling=fixed",
    },
    {
        img: "https://picsum.photos/400/450/?grayscale",
        description: "Projet universitaire en groupe de Trois, Nunjucks, Javascript, SCSS, CSS",
        link: "https://github.com/adellkl/SAE-501-projet",
    }, 
    {
        img: require("../src/assets/images/Clone.png"),
        description: "Clone de l'ancienne interface de ChatGPT, CSS, HTML, Javascript",
        link: "https://github.com/adellkl/clone-chatgpt-interface",
    },
    {
        img: require("../src/assets/images/Extention.png"),
        description: "Extension chrome, calculator, Javascript",
        link: "https://github.com/adellkl/Extension-chrome",
    },
    {
        img: require("../src/assets/images/Crud.png"),
        description: "CRUD, PHP, CSS, HTML",
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


