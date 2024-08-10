import React, { useEffect, useState } from 'react';

export function TitleTyped() {
    const phrases = [
        "Brayan Almengor Antonio Justavino.",
        "Software Developer.",
        "I offer mobile app development.",
        "Turning ideas into reality."
      ];
      
      const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
      const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
      
      const [text, setText] = useState('');
      const [isDeleting, setIsDeleting] = useState(false);
    
      const typingSpeed = 100; // Velocidad de tipeo en ms
      const erasingSpeed = 50; // Velocidad de borrado en ms
      const delayBetweenPhrases = 2000; // Pausa entre frases en ms
    
      useEffect(() => {
        const handleTyping = () => {
          if (isDeleting) {
            if (currentLetterIndex > 0) {
              setText(phrases[currentPhraseIndex].substring(0, currentLetterIndex - 1));
              setCurrentLetterIndex(currentLetterIndex - 1);
            } else {
              setIsDeleting(false);
              setCurrentPhraseIndex((currentPhraseIndex + 1) % phrases.length);
            }
          } else {
            if (currentLetterIndex < phrases[currentPhraseIndex].length) {
              setText(phrases[currentPhraseIndex].substring(0, currentLetterIndex + 1));
              setCurrentLetterIndex(currentLetterIndex + 1);
            } else {
              setTimeout(() => setIsDeleting(true), delayBetweenPhrases);
            }
          }
        };
    
        const timeoutId = setTimeout(handleTyping, isDeleting ? erasingSpeed : typingSpeed);
    
        return () => clearTimeout(timeoutId);
      }, [currentLetterIndex, isDeleting, phrases, currentPhraseIndex]);
    
    return(
            <div className="container__background__principal-title">
              <h3>Hello, I'm</h3>
              
              <div className="typed-container">
                <span>{text}</span>
                <span id="cursor">|</span>
              </div>
              
              <h1>At your fingertips development, customized for your unique digital needs!</h1>
              
              <div className="container__background__principal__title-button">
                <a href="https://wa.me/c/50765425634">Explore our Services!</a>
              </div>
            </div>
        
    );
}