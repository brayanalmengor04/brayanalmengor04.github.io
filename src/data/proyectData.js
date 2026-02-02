import {
  SiHtml5, SiCss3, SiJavascript, SiAstro, SiSpring, SiReact, SiMysql,
  SiLaravel, SiBootstrap, SiKotlin, SiJetpackcompose, SiAndroid, SiFigma,
  SiNodedotjs, SiDiscord
} from "react-icons/si";

export const featuredWorks = {
  portfolio: {
    title: "PORTFOLIO - MODERN SHOWCASE",
    description: "A modern, responsive portfolio website with bento grid design for showcasing projects and professional experience.",
    img: "/image/proyects/portfolio-design.png",
    bg_overlay: "bg-gray-800",
    technologies: [
      { name: "HTML", icon: SiHtml5, hoverBg: "hover:text-orange-500" },
      { name: "CSS", icon: SiCss3, hoverBg: "hover:text-blue-500" },
      { name: "JavaScript", icon: SiJavascript, hoverBg: "hover:text-yellow-500" },
      { name: "Astro", icon: SiAstro, hoverBg: "hover:text-purple-500" },
    ],
    isProduction: true,
    productionUrl: "https://brayanalmengorpty.netlify.app/",
    githubLink: "https://github.com/brayanalmengor04/brayanalmengor04.github.io",
  },

  ecoParaisoLodge: {
    title: "EcoParaíso Lodge - Hotel Booking System",
    description:
      "🌿 Sistema integral de reservas hoteleras que digitaliza y automatiza el proceso de gestión de habitaciones. Permite a los usuarios explorar hoteles, consultar disponibilidad y solicitar reservas de manera intuitiva, mientras que los administradores cuentan con un panel completo para gestionar propiedades, habitaciones y aprobar o cancelar reservas en tiempo real. Soluciona la necesidad de centralizar la gestión hotelera con una experiencia fluida y profesional.",
    img: "/image/proyects/EcoParaiso.png",
    default_color: "text-green-700",
    technologies: [
      { name: "Laravel", icon: SiLaravel, hoverBg: "hover:text-red-500" },
      { name: "React", icon: SiReact, hoverBg: "hover:text-cyan-500" },
      { name: "Bootstrap", icon: SiBootstrap, hoverBg: "hover:text-purple-500" },
      { name: "MySQL", icon: SiMysql, hoverBg: "hover:text-blue-500" },
      { name: "JavaScript", icon: SiJavascript, hoverBg: "hover:text-yellow-500" },
    ],
    isProduction: false,
    githubLink: "https://github.com/brayanalmengor04/eco-paraiso-lodge",
  },

  restaurantMenu: {
    title: "Restaurant Menu Management",
    description: "A robust web application designed for efficient restaurant menu creation and management. This platform integrates REST APIs to handle various functionalities, including nationality management, advanced dish administration, user authentication, and QR code generation for seamless customer access. Built using Laravel, Bootstrap, and MySQL, it ensures a modern and responsive user experience.",
    img: "/image/proyects/restaurantmenu.png",
    bg_overlay: "bg-red-800",
    technologies: [
      { name: "Laravel", icon: SiLaravel, hoverBg: "hover:text-red-500" },
      { name: "Bootstrap", icon: SiBootstrap, hoverBg: "hover:text-purple-500" },
      { name: "MySQL", icon: SiMysql, hoverBg: "hover:text-blue-500" },
      { name: "JavaScript", icon: SiJavascript, hoverBg: "hover:text-yellow-500" },
      { name: "HTML5", icon: SiHtml5, hoverBg: "hover:text-orange-500" },
    ],
    isProduction: false,
    githubLink: "https://github.com/brayanalmengor04/restaurant-menu-web",
  },

  nexaryBot: {
    title: "NEXARY BOT - Discord Multi-functional Bot",
    description: "Multi-functional Discord bot built with Node.js and discord.js. Features moderation tools, utilities, and advanced systems through a modular and scalable architecture. Offers studio-quality audio playback from YouTube, Spotify, and SoundCloud using Lavalink, with premium embeds and interactive controls for superior UX.",
    img: "/image/proyects/nexary bot.png",
    bg_overlay: "bg-indigo-800",
    technologies: [
      { name: "Node.js", icon: SiNodedotjs, hoverBg: "hover:text-green-500" },
      { name: "Discord.js", icon: SiDiscord, hoverBg: "hover:text-indigo-500" },
      { name: "JavaScript", icon: SiJavascript, hoverBg: "hover:text-yellow-500" },
    ],
    isProduction: false,
    githubLink: "https://github.com/brayanalmengor04/nexary-bot",
  },

  cebuTech: {
    title: "CebuTech - Gestión Ganadera Inteligente",
    description: "🐄 CebuTech es una aplicación de gestión ganadera diseñada para facilitar el control y análisis de los animales en granjas y ganaderías. Usando inteligencia artificial, CebuTech asiste a los usuarios en la toma de decisiones sobre la salud, alimentación y manejo del ganado, proporcionando recomendaciones detalladas y análisis de salud. Esta versión incluye la implementación de IA Gemini 1.5 Flash para consultas ganaderas avanzadas y sugerencias automáticas de bienestar animal.",
    img: "/image/proyects/cebutech.jpeg",
    bg_overlay: "bg-yellow-800",
    technologies: [
      { name: "Kotlin", icon: SiKotlin, hoverBg: "hover:text-blue-600" },
      { name: "Jetpack Compose", icon: SiJetpackcompose, hoverBg: "hover:text-purple-600" },
      { name: "Android", icon: SiAndroid, hoverBg: "hover:text-green-600" },
    ],
    isProduction: false,
    githubLink: "https://github.com/Anell-dev/BoviCare",
  },

  figmaDesign: {
    title: "Figma UI/UX Design",
    description: "Modern UI/UX designs for web and mobile applications using Figma.",
    img: "/image/proyects/figmaDesign.png",
    bg_overlay: "bg-orange-800",
    technologies: [
      { name: "Figma", icon: SiFigma, hoverBg: "hover:text-white-500" }
    ],
    isProduction: false,
    githubLink: "#",
  },

  comingSoonProject: {
    title: "Coming Soon",
    description: "Comming soon proyects",
    img: "/image/proyects/commingSoon.jpg",
    bg_overlay: "bg-gray-800",
    isProduction: false,
    githubLink: "#", // Placeholder link
  },

};
