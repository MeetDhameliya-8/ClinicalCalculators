"use client";

import { motion } from "framer-motion";

interface TypewriterTextProps {
    text: string;
    className?: string;
    delay?: number;
}

export function TypewriterText({ text, className = "", delay = 0 }: TypewriterTextProps) {
    const letters = Array.from(text);

    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.015, delayChildren: delay * i },
        }),
    };

    const child = {
        visible: {
            opacity: 1,
            display: "inline",
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
            },
        },
        hidden: {
            opacity: 0,
            display: "none",
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
            },
        },
    };

    return (
        <motion.p
            className={className}
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
        >
            {letters.map((letter, index) => (
                <motion.span variants={child} key={index}>
                    {letter}
                </motion.span>
            ))}
        </motion.p>
    );
}
