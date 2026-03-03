import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const RevealBlock = ({ children, delay = 0, direction = 'down' }: { children: React.ReactNode, delay?: number, direction?: 'down' | 'right' }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!containerRef.current) return;

        const startClip = direction === 'down' ? 'inset(0 0 100% 0)' : 'inset(0 100% 0 0)';

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
