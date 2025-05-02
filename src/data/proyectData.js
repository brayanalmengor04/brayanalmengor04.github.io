import { SiHtml5, SiCss3, SiJavascript, SiAstro, SiSpring, SiReact, SiMysql,SiHibernate,SiDocker
,SiLaravel,SiBootstrap,SiKotlin,SiComposer,SiJetpackcompose,SiAndroid,SiFigma,SiElectron,SiTailwindcss,
SiSpringboot
 } from "react-icons/si"; 

export const featuredWorks = {
  portfolio: {
    title: "PORTFOLIO - DESING BENTO V2",
    description: "A modern, responsive website for showcasing projects.",
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

  ecoParaisoLodge: {
    title: "EcoParaíso Lodge - Hotel Booking System",
    description:
      "🌿 Full-stack project built with Laravel 11 and React for managing hotel room reservations. Users can explore hotels, view room details, register, log in, and request bookings. Administrators have full control through an admin panel to manage hotels, rooms, and approve or cancel bookings. Designed with a strong focus on user experience and seamless automation.",
    img: "/image/proyects/EcoParaiso.png",
    default_color: "text-green-700",
    technologies: [
      { name: "Laravel", icon: SiLaravel, hoverBg: "hover:text-red-500" },
      { name: "React", icon: SiReact, hoverBg: "hover:text-cyan-500" },
      { name: "Bootstrap", icon: SiBootstrap, hoverBg: "hover:text-purple-500" },
      { name: "MySQL", icon: SiMysql, hoverBg: "hover:text-blue-500" },
      { name: "JavaScript", icon: SiJavascript, hoverBg: "hover:text-yellow-500" },
    ],
    githubLink: "https://github.com/brayanalmengor04/eco-paraiso-lodge",
    previewLink: "https://www.youtube.com/watch?v=Jq6kzhLGq7U", // YouTube demo
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
  githubLink: "https://github.com/brayanalmengor04/restaurant-menu-web",
  previewLink: "https://github.com/brayanalmengor04/restaurant-menu-web",
  },   
  postifySC: {
    title: "Postify - Share & Connect",
    description: "Backend system for creating posts and comments between users",
    img: "/image/proyects/postify.png",
    bg_overlay: "bg-green-800",
    technologies: [
      { name: "Mysql", icon: SiMysql, hoverBg: "hover:text-blue-500" },
      { name: "React", icon: SiReact, hoverBg: "hover:text-cyan-500" },
      { name: "Hibernate", icon: SiHibernate, hoverBg: "hover:text-purple-500" },
      { name: "Spring Boot", icon: SiSpring, hoverBg: "hover:text-green-500" }, 
      { name: "Docker", icon: SiDocker, hoverBg: "hover:text-blue-500" },
    ],
    githubLink: "https://github.com/brayanalmengor04/postify-backend",
    previewLink: "https://github.com/brayanalmengor04/postify-backend",
  }, 
  cebuTech: {
    title: "Cebu Tech - App Android",
  description: "Kotlin Application ganaderia",
  img: "/image/proyects/cebutech.jpeg",
  bg_overlay: "bg-yellow-800",
  technologies: [
    { name: "Kotlin", icon: SiKotlin, hoverBg: "hover:text-blue-600" },
    { name: "Jetpack Compose", icon: SiJetpackcompose, hoverBg: "hover:text-purple-600" },
    { name: "Android", icon: SiAndroid, hoverBg: "hover:text-green-600" },    
  ],
  githubLink: "https://github.com/Anell-dev/BoviCare",
  previewLink: "https://github.com/Anell-dev/BoviCare",
  }, 

  finnantrack: {
    title: "Finnantrack - S.M.B",
    description: "FINNANTRACK es una app para pequeños negocios, enfocada en la administración general y la facturación electrónica. El software es una solución integral para la gestión de clientes, ventas, inventario, reportes financieros y facturación electrónica según las regulaciones fiscales del país objetivo.",
    img: "/image/proyects/Finantrack.png",
    bg_overlay: "bg-purple-600",
    technologies: [
      { name: "Electron", icon: SiElectron, hoverBg: "hover:text-purple-500" },
      { name: "React", icon: SiReact, hoverBg: "hover:text-cyan-500" },
      { name: "TailwindCSS", icon: SiTailwindcss, hoverBg: "hover:text-teal-500" },
      { name: "JavaScript", icon: SiJavascript, hoverBg: "hover:text-yellow-500" },
      { name: "Spring Boot", icon: SiSpringboot, hoverBg: "hover:text-green-500" },
    ],
    githubLink: "https://github.com/brayanalmengor04/my-finnantrack-app",
    previewLink: "https://github.com/brayanalmengor04/my-finnantrack-app",
  },
  figmaDesign: {
    title: "Figma UI/UX Design",
    description: "Modern UI/UX designs for web and mobile applications using Figma.",
    img: "/image/proyects/figmaDesign.png",
    bg_overlay: "bg-orange-800",
    technologies: [
      { name: "Figma", icon: SiFigma, hoverBg: "hover:text-white-500" }
    ]
  },

  comingSoonProject: {
    title: "Coming Soon",
    description: "Comming soon proyects",
    img: "/image/proyects/commingSoon.jpg",
    bg_overlay: "bg-gray-800",
    githubLink: "#", // Placeholder link
    previewLink: "#", // Placeholder link
  },

};
