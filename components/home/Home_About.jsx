import React, { useEffect, useState, useRef } from 'react';
import { useAnimate, motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // تأكد من تثبيت react-icons

const FinalStoreScene = () => {
    const { t } = useTranslation('common');
    const [svgContent, setSvgContent] = useState(null);
    const [svgLoaded, setSvgLoaded] = useState(false);
    const [activeSlide, setActiveSlide] = useState(0);
    const [scope, animate] = useAnimate();

    // 1. جلب الـ SVG ومعالجته
    useEffect(() => {
        const fetchSvg = async () => {
            try {
                const response = await fetch('/about.svg');
                let text = await response.text();
                text = text.replace(/width="[^"]*"/g, '').replace(/height="[^"]*"/g, '');
                text = text.replace(/viewBox="[^"]*"/, 'viewBox="0 0 850 375"');
                setSvgContent(text);
                setTimeout(() => setSvgLoaded(true), 100);
            } catch (e) { console.error("SVG Loading Error:", e); }
        };
        fetchSvg();
    }, []);

    // 2. التبديل التلقائي كل 6 ثوانٍ (بدون إيقاف الماوس)
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveSlide(prev => (prev === 0 ? 1 : 0));
        }, 6000); // 6 ثوانٍ
        return () => clearInterval(interval);
    }, []);

    // 3. تحريك الطبقات داخل الـ SVG
    useEffect(() => {
        if (!svgLoaded || !scope.current) return;
        const cloudsEl = scope.current.querySelector('[id="CLOUDS"]');
        const doorEl = scope.current.querySelector('[id="GLASS DOOR"]');
        const lampsEl = scope.current.querySelector('[id="LAMPS"]');

        if (cloudsEl) {
            animate(cloudsEl, { x: [0, 50, 0] }, { duration: 15, repeat: Infinity, ease: "easeInOut" });
        }

        if (activeSlide === 0) {
            if (doorEl) animate(doorEl, { scaleY: 0.1 }, { duration: 1 });
            if (lampsEl) animate(lampsEl, { opacity: 0.2 }, { duration: 0.6 });
        } else {
            if (doorEl) animate(doorEl, { scaleY: 1 }, { duration: 1 });
            if (lampsEl) animate(lampsEl, { opacity: 1 }, { duration: 0.6 });
        }
    }, [activeSlide, svgLoaded, animate, scope]);

    const handleNext = () => setActiveSlide(prev => (prev === 0 ? 1 : 0));

    return (
        <section 
            id="about" 
            className="global-scene-wrapper" 
            ref={scope}
            style={{ scrollMarginTop: '70px' }} 
        >

            {/* أسهم التنقل الجانبية */}
            <button className="nav-arrow left" onClick={handleNext}><FaChevronLeft /></button>
            <button className="nav-arrow right" onClick={handleNext}><FaChevronRight /></button>

            <div className="sky-container">
                <AnimatePresence mode='wait'>
                    <motion.div
                        key={activeSlide}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-box"
                    >
                        <div className="badge-glow-container">
                            <span className={`sky-badge ${activeSlide === 1 ? 'alt' : ''}`}>
                                {activeSlide === 0 ? t('about.badge') : t('about.why_badge')}
                            </span>
                        </div>
                        <h2 className="sky-title">
                            {activeSlide === 0 ? t('about.description') : t('about.why_description')}
                        </h2>
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="ground-container">
                {svgContent && (
                    <div className="building-wrapper"
                        dangerouslySetInnerHTML={{ __html: svgContent }}
                    />
                )}
            </div>

            <style jsx>{`
                .global-scene-wrapper {
                    width: 100%;
                    min-height: 100vh;
                    background-color: #09907B;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    align-items: center;
                    overflow: hidden;
                    position: relative;
                }

                /* تنسيق الأسهم */
                .nav-arrow {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    background: rgba(255,255,255,0.05);
                    border: 1px solid rgba(255,255,255,0.2);
                    color: white;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 100;
                    transition: 0.3s;
                }
                .nav-arrow:hover { background: rgba(255,255,255,0.2); }
                .left { left: 20px; }
                .right { right: 20px; }

                .sky-container {
                    flex: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    width: 100%;
                    padding: 40px 20px;
                }

                .text-box {
                    max-width: 50%; 
                    margin: 0 auto;
                }

                .badge-glow-container {
                    position: relative;
                    display: inline-block;
                    margin-bottom: 25px;
                }

                .sky-badge {
                    position: relative;
                    padding: 12px 35px;
                    border: 2.5px solid #FCD34D;
                    color: #FCD34D;
                    border-radius: 50px;
                    font-weight: 800;
                    background: rgba(252, 211, 77, 0.2);
                    font-size: 1.3rem;
                    z-index: 2;
                    box-shadow: 0 0 20px rgba(252, 211, 77, 0.4); 
                    text-shadow: 0 0 10px rgba(252, 211, 77, 0.5);
                }

                .sky-badge.alt {
                    border-color: #6EE7B7;
                    color: #6EE7B7;
                    background: rgba(110, 231, 183, 0.2);
                    box-shadow: 0 0 20px rgba(110, 231, 183, 0.4);
                }

                .sky-title {
                    color: #fff;
                    font-size: clamp(0.85rem, 1.5vw, 1.1rem);
                    line-height: 1.8;
                    font-weight: 400;
                    opacity: 0.9;
                }

                .ground-container {
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: flex-end;
                    line-height: 0;
                }

                .building-wrapper {
                    /* تكبير البيت بنسبة 30% إضافية (من 50% إلى 80%) */
                    width: 80%; 
                    max-width: 1200px;
                    z-index: 2;
                    position: relative;
                }

                .building-wrapper :global(svg) {
                    width: 100%;
                    height: auto;
                    display: block;
                    /* الحفاظ على رقمك المفضل للالتصاق */
                    margin-bottom: -235px; 
                }

                @media (max-width: 768px) {
                    .building-wrapper { width: 120%; } /* تكبير أكبر للجوال */
                    .building-wrapper :global(svg) { margin-bottom: -85px; }
                    .text-box { max-width: 85%; }
                    .nav-arrow { width: 30px; height: 30px; top: auto; bottom: 20px; }
                    .left { left: 30%; }
                    .right { right: 30%; }
                }
            `}</style>
        </section>
    );
};

export default FinalStoreScene;