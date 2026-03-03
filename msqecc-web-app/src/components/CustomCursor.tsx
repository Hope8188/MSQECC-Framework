import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const CustomCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const updateMousePosition = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });

            // Re-check hovering state on target
            const target = e.target as HTMLElement;
            const isClickable = target.tagName.toLowerCase() === 'a' ||
                target.tagName.toLowerCase() === 'button' ||
                target.closest('a') !== null ||
                target.closest('button') !== null ||
                window.getComputedStyle(target).cursor === 'pointer';

            setIsHovering(isClickable);
        };

        window.addEventListener('mousemove', updateMousePosition);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
        };
    }, []);

    // Outer circle variants
    const variants = {
        default: {
            x: mousePosition.x - 16,
            y: mousePosition.y - 16,
            scale: 1,
            backgroundColor: "transparent",
            border: "1px solid rgba(59, 130, 246, 0.5)", // Entanglement blue
            transition: {
                type: "spring",
                damping: 25,
                stiffness: 300,
                mass: 0.5
            }
        },
        hover: {
            x: mousePosition.x - 24,
            y: mousePosition.y - 24,
            scale: 1.5,
            backgroundColor: "rgba(59, 130, 246, 0.05)",
            border: "1px solid rgba(59, 130, 246, 1)",
            transition: {
                type: "spring",
                damping: 25,
                stiffness: 300,
                mass: 0.5
            }
        }
    };

    return (
        <>
            {/* Outer Circle (Trails slightly) */}
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[99999] mix-blend-screen"
                variants={variants}
                animate={isHovering ? "hover" : "default"}
            />
            {/* Inner Dot (Instant) */}
            <motion.div
                className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[99999] bg-entanglement mix-blend-screen"
                animate={{
                    x: mousePosition.x - 4,
                    y: mousePosition.y - 4,
                }}
                transition={{
                    type: "tween",
                    ease: "backOut",
                    duration: 0.05
                }}
            />
        </>
    );
};
