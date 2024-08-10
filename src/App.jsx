
import './App.css' 
import { Navbar } from './components/navbar/Navbar' 
import { TitleTyped } from './components/title/TitleTyped' 
import { ArticleAbout } from './components/article/ArticleAbout' 
import { CardService } from './components/cardsservice/CardService' 
import { ActionScrolling } from './components/skill/ActionScrolling' 
import { TecnologiesItem } from './components/skill/TecnologiesItem'
import { ProyectsSection } from './components/proyects/ProyectsSection' 
import { FormContact } from './components/form/FormContact'

export function App() {

  return (
    <>
      <Navbar /> 
      <section id="home" className="container__background-principal" >
        <TitleTyped />
      </section>
      <section id="about" className="container__aboutme-principal">
        <ArticleAbout />
      </section>
      <section id="services" className="container__services-principal">
        <div className="container__services__principal-title">
            <h4>Services</h4> 

            <div className="container__services__principal-carrucel">
            <CardService 
            titleService="Creative Desing"
            description="We specialize in crafting visually stunning and engaging designs
                    tailored to your unique needs. Whether you're looking for eye-catching graphics captivating branding, or 
                    innovate digital experiences, our teams of skilled designers is here to bring your vision to life. "

            > <ion-icon name="construct-outline"></ion-icon></CardService>

            <CardService
            titleService="Maintenance and Suport"
            description="We're to ensure your software operates smoothly and efficiently. Our team provides proactive monitoring, promt 
                    troublesshooting, and personalized assistance allowing you to focus on your business while we take care of your 
                    software needs."
            > <ion-icon name="build"></ion-icon></CardService> 

            <CardService
            titleService="E-Commerce Solutions"
            description="From seamless payment experiences to robust inventory management, our team ensures your e-commerce plataform operates 
                    smoonthly and efficiently . With our expertise, personalized support, and proactive approach, we help you 
                    maximize sales and optimize your online business."
            ><ion-icon name="rocket"></ion-icon></CardService>  

            <CardService
            titleService="Clean and Efficients Code"
            description="Our Clean and efficient Code service ensures your codebase is wel-structured, easy to maintain, and optimized for perfomance 
                    whether developing new software or improving existing proyects!" 
            ><ion-icon name="code-slash"></ion-icon></CardService> 

            <CardService
            titleService="Responsive and Adaptable Design"
            description="Our Responsive and Adaptable Design service ensures your designs seamlessly adjust to various devices, enhancing user experience across
                    platforms!."
            > <ion-icon name="phone-landscape"></ion-icon> </CardService>

          <CardService
          titleService="Api Integrations"
          description="Our API Integrations service seamlessly integrates APIs into your systems, enhancing functionality 
                    and connectivity across your platforms"
          ><ion-icon name="logo-apple-ar"></ion-icon></CardService>
        </div>  
        </div>
      </section> 
      <section id="tecnologies" className='container__skill-principal'>
        <div className='container__skill-carrucel'>
          <TecnologiesItem src="./assets/image/reactim.png" alt="React" />
          <TecnologiesItem src="./assets/image/android.png" alt="Android" />
          <TecnologiesItem src="./assets/image/java.png" alt="Java" />
          <TecnologiesItem src="./assets/image/javascript.png" alt="JavaScript" />
          <TecnologiesItem src="./assets/image/html.png" alt="HTML" />
          <TecnologiesItem src="./assets/image/css.png" alt="CSS" />
        </div> 
        <ActionScrolling/>
      </section>
      <ProyectsSection/> 
      <FormContact />
    </>
   
  )
}

