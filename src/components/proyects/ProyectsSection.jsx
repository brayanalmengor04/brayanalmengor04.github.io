import React, { useState } from 'react';

const projectsData = [
  {
    id: 1,
    category: 'web',
    title: 'Portfolio Website',
    description: 'A sleek portfolio website showcasing my skills, projects, and resume. It features responsive design, intuitive navigation, and a contact form for potential clients and collaborators.',
    link: 'https://brayandevpty.netlify.app/',
    imgSrc: 'assets/image/WebsiteProyect.png',
  },
  {
    id:2,
    category: 'legacy',
    title: 'Quotegen: JavaFX Quote Generation Application',
    description: 'A JavaFX desktop app for creating professional quotes efficiently. It includes customizable templates, automated calculations, and PDF export functionality.',
    link: 'https://github.com/brayanalmengor04/quotegen',
    imgSrc: '#'

  },
  {
    id:3,
    category: 'design',
    title: 'Figma Prototype Design for Android Raffle Generator',
    description: 'A Figma prototype for an Android app that simplifies raffle management. It offers features like automated number generation, participant data handling, and real-time updates.',
    link: 'https://www.figma.com/design/7QHR3QNNkCQn9A0d21W3DA/Rifa-Mania?node-id=0-1&t=sQqr8qgDEBtpYPwY-1',
    imgSrc: 'assets/image/RifaMania.png'
  }
];

export function ProyectsSection(){

    const [filter, setFilter] = useState('all');

  const filteredProjects = filter === 'all' 
    ? projectsData 
    : projectsData.filter(project => project.category === filter);

  return (
    <section id="proyects" className="container__projects-principal">
      <div className="container__projects__principal-title">
        <h4>Portfolio</h4>
      </div>  
      <div className="filter-buttons">
        {['all', 'android', 'legacy', 'web', 'design'].map(category => (
          <div 
            key={category} 
            className="filter-button" 
            onClick={() => setFilter(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </div>
        ))}
      </div>
      <div className="container__projects__principal-carousel">
        {filteredProjects.map(project => (
          <div key={project.id} className={`container__projects__principal__carousel-item ${project.category}`}>
            <h5>{project.title}</h5>
            <p>{project.description}</p>
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              <ion-icon name="cube"></ion-icon>
            </a> 
            <img src={project.imgSrc} alt={project.title} />
          </div>
        ))}
      </div>
    </section>
  );
} 
