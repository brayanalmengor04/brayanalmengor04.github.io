import { useEffect } from 'react';
import imagen from '/src/assets/image/brayandevabout.png'; 
import cv from '/src/assets/docx/Hoja de Vida.pdf'; 

export function ArticleAbout(){
     useEffect(() => {
        AOS.init();
    }, []);
    return (
        <div className="container__aboutme__principal-elements">
            <div  data-aos-duration="1500" data-aos="fade-up" className="container__aboutme__principal__elements-image">
                <img src={imagen} alt="brayandev" />
            </div>

            <div data-aos="fade-down"  data-aos-duration="1500" className="container__aboutme__principal__elements-contents">
                <h4>About Me!</h4>
                <p>
                "Hi! My name is Brayan Almengor , and I'm passionate about the world of programming. Currently, I'm a student at the Technological University of Panama 
          pursuing a bachelor's degree in Software Develolopment. I enjoy video games and all things related to the digital world. 
          I reside in Panama and I'm 22 years old . If you need and more information for the About Me section , just let me know!
                </p>
                <div className="container__aboutme__principal__elements__contents-button">
                    <a href={cv} target="_blank">Download CV</a>
                </div>
            </div>
        </div>
    );
}