"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRouter } from 'next/router';

// مكون الأشكال الهندسية المتحركة - نسخة سريعة
const BackgroundShapes = () => {
    const colors = ["#40bb54", "#FFCF32", "#F4931E", "#ffffff"];
    const shapes = ["square", "circle", "triangle"];

    return (
        <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            overflow: "hidden",
            pointerEvents: "none",
            zIndex: 0
        }}>
            {[...Array(25)].map((_, i) => {
                const size = Math.random() * 35 + 15;
                const color = colors[i % colors.length];
                const shape = shapes[i % shapes.length];

                const randomLeft = Math.random() * 100;
                const randomTop = Math.random() * 100;

                return (
                    <motion.div
                        key={i}
                        initial={{
                            left: `${randomLeft}%`,
                            top: `${randomTop}%`,
                            opacity: 0,
                            scale: 0.5
                        }}
                        animate={{
                            // سرعة أكبر في الظهور والاختفاء
                            opacity: [0, 0.6, 0],
                            scale: [0.5, 0.9, 0.5],
                            // دوران أسرع (360 درجة بدلاً من 180)
                            rotate: [0, 360],
                            // حركة y أكثر ديناميكية
                            y: [0, Math.random() * 80 - 40, 0]
                        }}
                        transition={{
                            // تقليل المدة لجعلها أسرع (من 3 إلى 5 ثواني)
                            duration: Math.random() * 2 + 3,
                            repeat: Infinity,
                            ease: "linear", // خطي لجعل الدوران مستمراً بنعومة
                            delay: Math.random() * 5
                        }}
                        style={{
                            position: "absolute",
                            width: size + "px",
                            height: size + "px",
                            backgroundColor: shape !== "triangle" ? color : "transparent",
                            borderLeft: shape === "triangle" ? `${size / 2}px solid transparent` : "none",
                            borderRight: shape === "triangle" ? `${size / 2}px solid transparent` : "none",
                            borderBottom: shape === "triangle" ? `${size}px solid ${color}` : "none",
                            borderRadius: shape === "circle" ? "50%" : "4px",
                            filter: "blur(0.4px)",
                        }}
                    />
                );
            })}
        </div>
    );
};

const ModernDesignSection = () => {
    const containerRef = useRef(null);
    const router = useRouter();
    const currentLang = router.locale || 'ar';

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const content = {
        ar: {
            title: "التصميم الحديث",
            word1: "إبــــــداع",
            word2: "إتقــــــان",
            word3: "وأكثــــــر...",
            fontFamily: "'Tajawal', sans-serif",
            direction: "rtl"
        },
        en: {
            title: "Modern Design",
            word1: "CREATIVITY",
            word2: "PERFECTION",
            word3: "AND MORE...",
            fontFamily: "'Poppins', sans-serif",
            direction: "ltr"
        }
    };

    const t = content[currentLang];

    // إعدادات حركة النصوص الأصلية
    const w1Range = [0, 0.1, 0.2, 0.3];
    const word1Opacity = useTransform(scrollYProgress, w1Range, [0, 1, 1, 0]);
    const word1Y = useTransform(scrollYProgress, w1Range, [40, 0, 0, -40]);
    const word1Scale = useTransform(scrollYProgress, w1Range, [0.9, 1, 1, 1.1]);

    const w2Range = [0.35, 0.45, 0.55, 0.65];
    const word2Opacity = useTransform(scrollYProgress, w2Range, [0, 1, 1, 0]);
    const word2Y = useTransform(scrollYProgress, w2Range, [40, 0, 0, -40]);
    const word2Scale = useTransform(scrollYProgress, w2Range, [0.9, 1, 1, 1.1]);

    const w3Range = [0.7, 0.8, 0.9, 1];
    const word3Opacity = useTransform(scrollYProgress, w3Range, [0, 1, 1, 0]);
    const word3Y = useTransform(scrollYProgress, w3Range, [40, 0, 0, -40]);
    const word3Scale = useTransform(scrollYProgress, w3Range, [0.9, 1, 1, 1.1]);

    return (
        <>
            <style jsx global>{`
                html, body, main { overflow-x: visible !important; }
            `}</style>

            <div
                ref={containerRef}
                style={{
                    height: "400vh",
                    backgroundColor: "#12927D",
                    position: "relative",
                    zIndex: 10,
                    direction: t.direction
                }}
            >
                <div style={{
                    position: "sticky",
                    top: 0,
                    height: "100vh",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden"
                }}>

                    <BackgroundShapes />

                    <div style={{
                        position: "relative",
                        zIndex: 2,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        width: "100%"
                    }}>

                        <h2 style={{
                            color: "#ffffff",
                            fontSize: "clamp(2.5rem, 8vw, 6rem)",
                            fontWeight: "700",
                            fontFamily: t.fontFamily,
                            margin: "0 0 50px 0",
                            lineHeight: 1.2
                        }}>
                            {t.title}
                        </h2>

                        <div style={{
                            position: "relative",
                            width: "100%",
                            height: "clamp(4rem, 12vw, 9rem)",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>

                            <motion.span style={{
                                position: "absolute",
                                left: "50%",
                                x: "-50%",
                                fontSize: "clamp(3rem, 10vw, 8rem)",
                                fontWeight: "400",
                                fontFamily: t.fontFamily,
                                color: "#40bb54",
                                opacity: word1Opacity,
                                y: word1Y,
                                scale: word1Scale,
                                whiteSpace: "nowrap"
                            }}>
                                {t.word1}
                            </motion.span>

                            <motion.span style={{
                                position: "absolute",
                                left: "50%",
                                x: "-50%",
                                fontSize: "clamp(3rem, 10vw, 8rem)",
                                fontWeight: "400",
                                fontFamily: t.fontFamily,
                                color: "#FFCF32",
                                opacity: word2Opacity,
                                y: word2Y,
                                scale: word2Scale,
                                whiteSpace: "nowrap"
                            }}>
                                {t.word2}
                            </motion.span>

                            <motion.span style={{
                                position: "absolute",
                                left: "50%",
                                x: "-50%",
                                fontSize: "clamp(3rem, 10vw, 8rem)",
                                fontWeight: "400",
                                fontFamily: t.fontFamily,
                                color: "#F4931E",
                                opacity: word3Opacity,
                                y: word3Y,
                                scale: word3Scale,
                                whiteSpace: "nowrap"
                            }}>
                                {t.word3}
                            </motion.span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ModernDesignSection;