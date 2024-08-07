
    const phrases = [
        "Brayan Almengor Antonio Justavino.",
        "Software developer.",
       "I offer mobile app development.",
        "Turning ideas into reality."
    ]; 

const carousel = document.getElementById('carousel');
const images = carousel.getElementsByTagName('img');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button'); 
let currentPhraseIndex = 0;
let currentLetterIndex = 0;  
let currentIndex = 0;
const itemsPerPage = 3;  

function showImages() {
    for (let i = 0; i < images.length; i++) {
        images[i].classList.remove('active');
    }
    for (let i = currentIndex; i < currentIndex + itemsPerPage; i++) {
        if (images[i]) {
            images[i].classList.add('active');
        }
    }
    // Trigger reflow for smooth transition
    carousel.style.opacity = 0;
    setTimeout(() => {
        carousel.style.opacity = 1;
    }, 100);
}
function next() {
    if (currentIndex + itemsPerPage < images.length) {
        currentIndex += itemsPerPage;
    } else {
        currentIndex = 0; // Loop back to start
    }
    showImages();
}
function prev() {
    if (currentIndex - itemsPerPage >= 0) {
        currentIndex -= itemsPerPage;
    } else {
        currentIndex = Math.max(images.length - itemsPerPage, 0); // Loop back to end
    }
    showImages();
} 
prevButton.addEventListener('click', prev);
nextButton.addEventListener('click', next);

showImages();

const typedTextElement = document.getElementById('typed-text');
const typingSpeed = 100; // Velocidad de tipeo en ms
const erasingSpeed = 50; // Velocidad de borrado en ms
const delayBetweenPhrases = 2000; // Pausa entre frases en ms

function type() {
    if (currentLetterIndex < phrases[currentPhraseIndex].length) {
        typedTextElement.textContent += phrases[currentPhraseIndex].charAt(currentLetterIndex);
        currentLetterIndex++;
        setTimeout(type, typingSpeed);
    } else {
        setTimeout(erase, delayBetweenPhrases);
    }
}

function erase() {
    if (currentLetterIndex > 0) {
        typedTextElement.textContent = phrases[currentPhraseIndex].substring(0, currentLetterIndex - 1);
        currentLetterIndex--;
        setTimeout(erase, erasingSpeed);
    } else {
        currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
        setTimeout(type, typingSpeed);
    }
}

document.addEventListener("DOMContentLoaded", function() { 
    const filterButtons = document.querySelectorAll('.filter-button');
    const projects = document.querySelectorAll('.container__proyects__principal__carrucel-items');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');

            projects.forEach(project => {
                if (filter === 'all') {
                    project.style.display = 'flex';
                } else {
                    if (project.classList.contains(filter)) {
                        project.style.display = 'flex';
                    } else {
                        project.style.display = 'none';
                    }
                }
            });

            // Remove 'active' class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));

            // Add 'active' class to the clicked button
            this.classList.add('active');
        });
    });  

    setTimeout(type, delayBetweenPhrases);
});  

//FFuncion whatssap 
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var firstName = document.getElementById('firstName').value;
    var lastName = document.getElementById('lastName').value;
    var email = document.getElementById('email').value;
    var message = document.getElementById('message').value;

    var whatsappMessage = `Hola soy ${firstName} ${lastName}, mi correo es: ${email}. Información Mensaje: ${message}`;

    var whatsappUrl = `https://wa.me/50765425634?text=${encodeURIComponent(whatsappMessage)}`;

    window.open(whatsappUrl, '_blank');
});


const  menuResponsive = document.querySelector(".container__menuResponsive");
const menuResponsiveItems = document.querySelector(".container__menuResponsive__options");


function ocultarMenu() {
    menuResponsive.style.display = "none"; 
    menuResponsiveItems.style.visibility= "hidden";
}
function mostrarMenu() {
    menuResponsive.style.display = "block"; 
    menuResponsiveItems.style.visibility= "visible";
}