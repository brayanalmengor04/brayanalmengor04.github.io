export function CardService({titleService,description,children}) {
    return(        
            <div  data-aos-duration="1500" data-aos="fade-down" className="container__services__principal__carrucel-items">
                <div>{children}</div>
                <h5>{titleService}</h5>
                <p>{description}</p>
            </div>
    );
}