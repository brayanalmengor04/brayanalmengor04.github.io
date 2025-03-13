import { SiHtml5, SiCss3, SiJavascript, SiAstro, SiSpring } from "react-icons/si"; 

export const featuredWorks = {
  portfolio: {
    title: "PORTFOLIO - DESING BENTO V2",
    description: "Un sitio web responsivo y moderno para mostrar proyectos.",
    img: "/screenshot.png",
    bg_overlay: "bg-gray-800",
    technologies: [
      { name: "HTML", icon: SiHtml5, hoverBg: "hover:text-orange-500" },
      { name: "CSS", icon: SiCss3, hoverBg: "hover:text-blue-500" },
      { name: "JavaScript", icon: SiJavascript, hoverBg: "hover:text-yellow-500" },
      { name: "Astro", icon: SiAstro, hoverBg: "hover:text-purple-500" },
      { name: "Spring Boot", icon: SiSpring, hoverBg: "hover:text-green-500" },
    ],
    githubLink: "https://github.com/brayanalmengor04/brayanalmengor04.github.io",
    previewLink: "https://brayanalmengorpty.netlify.app/",
  },
};
