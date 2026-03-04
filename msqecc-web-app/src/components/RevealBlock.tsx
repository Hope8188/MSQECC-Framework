import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const RevealBlock = ({ children, delay = 0, direction = 'down' }: { children: React.ReactNode, delay?: number, direction?: 'down' | 'right' | 'up' | 'left' }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!containerRef.current) return;

        let startClip = 'inset(0 0 100% 0)';
        if (direction === 'right') startClip = 'inset(0 100% 0 0)';
        if (direction === 'up') startClip = 'inset(100% 0 0 0)';
        if (direction === 'left') startClip = 'inset(0 0 0 100%)';

        gsap.fromTo(containerRef.current,
            { clipPath: startClip, opacity: 0 },
            {
                clipPath: 'inset(0 0 0% 0)',
                opacity: 1,
                duration: 1.2,
                delay: delay,
                ease: 'power4.out',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="will-change-transform opacity-0">
            {children}
        </div>
    );
};
