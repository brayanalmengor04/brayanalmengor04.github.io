 
import { useState } from 'react';

export function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const handleMenuClick = () => {
        setIsMenuOpen(false);
    };

    return (
        <header>
            <nav className="container__nav-principal">
                <ul className={`container__nav__principal-items ${isMenuOpen ? 'open' : ''}`}>
                    <li><a href="#home" onClick={handleMenuClick} >Home</a></li>
                    <li><a href="#about"onClick={handleMenuClick} >About</a></li>
                    <li><a href="#services" onClick={handleMenuClick} >Services</a></li>
                    <li><a href="#tecnologies" onClick={handleMenuClick} >Skills</a></li>
                    <li><a href="#proyects" onClick={handleMenuClick} >Proyects</a></li>
                    <li><a href="#contacts" onClick={handleMenuClick} >Contact</a></li>
                </ul>
                <button className="menu-toggle" onClick={toggleMenu}>
                    <ion-icon name="menu"></ion-icon>
                </button>
            </nav>
        </header>
    );
}