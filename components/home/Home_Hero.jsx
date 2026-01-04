import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from 'next-i18next';

const Home_Hero = () => {
    const { t } = useTranslation('common');

    const [index, setIndex] = useState(0);
    const [fade, setFade] = useState(true);
    const videoRef = useRef(null);

    // الكلمات المتغيرة
    const rotatingWordsString = t('hero.rotatingWords', 'إبداع, إتقان, حِرفية, تميّز, ابتكار, جودة, مرونة, سرعة, دقّة, خبرة, تفاصيل, هُوية, فكرة, قيمة, لمسة, رؤية, احتراف, أسلوب, تجربة, إلهام');
    const rotatingWords = rotatingWordsString.split(',').map(word => word.trim());

    // إعادة تشغيل الفيديو
    useEffect(() => {
        const v = videoRef.current;
        if (!v) return;
        v.onended = () => {
            v.currentTime = 0;
            v.play();
        };
    }, []);

    // دورة الكلمات
    useEffect(() => {
        if (rotatingWords.length === 0) return;

        let wordCounter = 0;
        let interval;

        const startCycle = () => {
            interval = setInterval(() => {
                setFade(false);
                setTimeout(() => {
                    setIndex((prev) => (prev + 1) % rotatingWords.length);
                    setFade(true);

                    wordCounter++;

                    if (wordCounter >= 5) {
                        clearInterval(interval);
                        setFade(false);
                        wordCounter = 0;
                        setTimeout(startCycle, 5000);
                    }
                }, 200);
            }, 1100);
        };

        startCycle();
        return () => clearInterval(interval);
    }, [rotatingWordsString]);

    return (
        <section
            style={{
                position: "relative",
                height: "65vh",
                minHeight: "450px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                fontFamily: "Tajawal, sans-serif",
                backgroundColor: "#028f7b" // لون احتياطي في حال تأخر الفيديو
            }}
        >
            {/* 1. الفيديو */}
            <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                poster="/images/hero-fallback.jpg"
                style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    zIndex: 1,
                }}
            >
                <source src="/videos/company-video.mp4" type="video/mp4" />
            </video>

            {/* 2. طبقة الاوفرلاي الخضراء (التعديل الجديد) */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    backgroundColor: "#1680C4", // اللون الأخضر الأساسي
                    mixBlendMode: "multiply",   // خاصية الدمج لتوحيد اللون مع الفيديو
                    opacity: 0.9,               // درجة الوضوح (كلما زادت أصبح الأخضر أغنى)
                    zIndex: 2,
                }}
            />

            {/* 3. الكلمة الكبيرة */}
            <div
                style={{
                    position: "relative",
                    zIndex: 3,
                    height: "140px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                }}
            >
                <span
                    style={{
                        fontSize: "5rem",
                        fontWeight: 800,
                        color: "white",
                        opacity: fade ? 1 : 0,
                        transform: fade ? "translateY(0)" : "translateY(25px)",
                        transition: "opacity 0.25s ease, transform 0.25s ease",
                        lineHeight: "1.1",
                        // إضافة ظل خفيف للنص لضمان بروزه فوق الخلفية الملونة
                        textShadow: "0 4px 15px rgba(0,0,0,0.3)"
                    }}
                >
                    {rotatingWords[index]}
                </span>
            </div>
        </section>
    );
};

export default Home_Hero;