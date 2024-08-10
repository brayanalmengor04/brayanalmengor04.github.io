export function ActionScrolling(){
    const scrollLeft = () => {
        const container = document.querySelector('.container__skill-carrucel');
        if (container) {
          container.scrollBy({ left: -300, behavior: 'smooth' });
        }
      };
      const scrollRight = () => {
        const container = document.querySelector('.container__skill-carrucel');
        if (container) {
          container.scrollBy({ left: 300, behavior: 'smooth' });
        }
      };
    
      return (
        <div className="container__skill__action-parent">
          <button onClick={scrollLeft} className="scroll-left" > &lt; </button>
          <button onClick={scrollRight} className="scroll-right"> &gt;</button>
        </div>
      );
}