import { useState, useEffect } from 'react';

interface TypedTextProps {
    roles: string[];
}

const TypedText = ({ roles = [] }: TypedTextProps) => {
    const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
    const [currentText, setCurrentText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [showCursor, setShowCursor] = useState(true);

    // Configuration
    const TYPING_SPEED = 100;
    const DELETE_SPEED = 50;
    const PAUSE_DURATION = 2000;
    const CURSOR_BLINK_SPEED = 530;

    // Cursor blink effect
    useEffect(() => {
        const cursorInterval = setInterval(() => {
            setShowCursor((prev) => !prev);
        }, CURSOR_BLINK_SPEED);

        return () => clearInterval(cursorInterval);
    }, []);

    // Typing animation logic
    useEffect(() => {
        if (roles.length === 0) return;

        const currentRole = roles[currentRoleIndex];

        if (isPaused) {
            const pauseTimeout = setTimeout(() => {
                setIsPaused(false);
                setIsDeleting(true);
            }, PAUSE_DURATION);

            return () => clearTimeout(pauseTimeout);
        }

        if (!isDeleting && currentText === currentRole) {
            // Finished typing, pause before deleting
            setIsPaused(true);
            return;
        }

        if (isDeleting && currentText === '') {
            // Finished deleting, move to next role
            setIsDeleting(false);
            setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
            return;
        }

        const timeout = setTimeout(
            () => {
                if (isDeleting) {
                    // Delete one character
                    setCurrentText((prev) => prev.slice(0, -1));
                } else {
                    // Add one character
                    setCurrentText((prev) => currentRole.slice(0, prev.length + 1));
                }
            },
            isDeleting ? DELETE_SPEED : TYPING_SPEED
        );

        return () => clearTimeout(timeout);
    }, [currentText, isDeleting, isPaused, currentRoleIndex, roles]);

    return (
        <span className="inline-flex items-center flex-wrap max-w-full">
            <span
                className="font-light transition-all duration-300 ease-in-out break-words"
                style={{
                    background: 'linear-gradient(135deg, var(--accent-primary), var(--keyword-gradient-end))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    textShadow: '0 0 30px var(--accent-glow)',
                    display: 'inline-block',
                    maxWidth: '100%',
                    wordBreak: 'break-word',
                    transform: isDeleting ? 'scale(0.98)' : 'scale(1)',
                }}
            >
                {currentText}
            </span>
            <span
                className="ml-1 font-light inline-block"
                style={{
                    color: 'var(--accent-primary)',
                    opacity: showCursor ? 1 : 0,
                    transition: 'opacity 0.1s',
                    flexShrink: 0,
                }}
            >
                |
            </span>
        </span>
    );
};

export default TypedText;
