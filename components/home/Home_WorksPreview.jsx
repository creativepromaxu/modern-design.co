import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { FaTimes } from 'react-icons/fa';

const Home_WorksPreview = ({ projects }) => {
    const { t } = useTranslation('common');
    const { locale } = useRouter();
    const isAr = locale === 'ar';

    const [selectedProject, setSelectedProject] = useState(null);

    const mainScrollRef = useRef(null);
    const modalScrollRef = useRef(null);

    const [isMainDown, setIsMainDown] = useState(false);
    const [mainStartX, setMainStartX] = useState(0);
    const [mainScrollLeft, setMainScrollLeft] = useState(0);

    const [isModalDown, setIsModalDown] = useState(false);
    const [modalStartX, setModalStartX] = useState(0);
    const [modalScrollLeft, setModalScrollLeft] = useState(0);

    const scrollStep = 1.8;

    // دالة مساعدة للحصول على موقع الإحداثي X سواء كان ماوس أو لمس
    const getX = (e) => {
        if (e.touches && e.touches.length > 0) {
            return e.touches[0].pageX;
        }
        return e.pageX;
    };

    useEffect(() => {
        let requestRef;
        const animate = () => {
            if (mainScrollRef.current && !isMainDown && !selectedProject) {
                const el = mainScrollRef.current;
                el.scrollLeft += scrollStep;
                if (el.scrollLeft >= el.scrollWidth / 2) el.scrollLeft = 0;
            }

            if (modalScrollRef.current && !isModalDown && selectedProject) {
                const el = modalScrollRef.current;
                el.scrollLeft += scrollStep;
                if (el.scrollLeft >= el.scrollWidth / 2) el.scrollLeft = 0;
            }
            requestRef = requestAnimationFrame(animate);
        };
        requestRef = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(requestRef);
    }, [isMainDown, isModalDown, selectedProject]);

    // معالجة بدء السحب (ماوس + لمس)
    const handleStart = (e, isModal) => {
        const x = getX(e);
        if (isModal) {
            setIsModalDown(true);
            setModalStartX(x - modalScrollRef.current.offsetLeft);
            setModalScrollLeft(modalScrollRef.current.scrollLeft);
        } else {
            setIsMainDown(true);
            setMainStartX(x - mainScrollRef.current.offsetLeft);
            setMainScrollLeft(mainScrollRef.current.scrollLeft);
        }
    };

    // معالجة التحريك (ماوس + لمس)
    const handleMove = (e, isModal) => {
        const isDown = isModal ? isModalDown : isMainDown;
        if (!isDown) return;

        // منع التمرير الافتراضي للصفحة عند السحب على الجوال
        if (e.cancelable) e.preventDefault();

        const ref = isModal ? modalScrollRef : mainScrollRef;
        const startX = isModal ? modalStartX : mainStartX;
        const scrollLeft = isModal ? modalScrollLeft : mainScrollLeft;

        const x = getX(e) - ref.current.offsetLeft;
        const walk = (x - startX) * 2;
        ref.current.scrollLeft = scrollLeft - walk;
    };

    // معالجة إنهاء السحب
    const handleEnd = () => {
        setIsMainDown(false);
        setIsModalDown(false);
    };

    if (!projects || projects.length === 0) return null;

    return (
        <section id="works" style={{ padding: '80px 0', backgroundColor: '#093537', overflow: 'hidden' }}>
            <div style={{ textAlign: 'center', marginBottom: '40px', padding: '0 20px' }}>
                <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#f9f9f9' }}>{t('works.title')}</h2>
                <div style={{ width: '90px', height: '4px', background: 'linear-gradient(90deg, #028f7b, #51ab5e)', margin: '15px auto' }}></div>
            </div>

            <div
                ref={mainScrollRef}
                // أحداث الماوس
                onMouseDown={(e) => handleStart(e, false)}
                onMouseLeave={handleEnd}
                onMouseUp={handleEnd}
                onMouseMove={(e) => handleMove(e, false)}
                // أحداث اللمس للجوال
                onTouchStart={(e) => handleStart(e, false)}
                onTouchEnd={handleEnd}
                onTouchMove={(e) => handleMove(e, false)}
                style={{ ...sliderCommonStyle, cursor: isMainDown ? 'grabbing' : 'grab' }}
            >
                {[...projects, ...projects].map((project, index) => (
                    <div key={`${project.id}-${index}`} onClick={() => setSelectedProject(project)} style={cardStyle}>
                        <img src={project.cover} alt="" draggable="false" style={imgStyle} />
                        <div style={overlayInfoStyle(isAr)}>
                            <h3 style={{ fontSize: '18px', margin: 0, fontWeight: '600' }}>
                                {isAr ? project.titleAr : project.titleEn}
                            </h3>
                            <span style={{ fontSize: '12px', opacity: 0.7, color: '#FFCF32', fontWeight: 'bold' }}>{isAr ? 'عرض المشروع' : 'View Project'}</span>
                        </div>
                    </div>
                ))}
            </div>

            {selectedProject && (
                <div style={modalOverlayStyle}>
                    <button onClick={() => setSelectedProject(null)} style={closeButtonStyle}><FaTimes /></button>

                    <div style={{ textAlign: 'center', color: '#fff', marginBottom: '20px' }}>
                        <h2 style={{ fontSize: '26px' }}>{isAr ? selectedProject.titleAr : selectedProject.titleEn}</h2>
                        <div style={{ width: '40px', height: '2px', background: '#028f7b', margin: '10px auto' }}></div>
                    </div>

                    <div
                        ref={modalScrollRef}
                        // أحداث الماوس للنافذة
                        onMouseDown={(e) => handleStart(e, true)}
                        onMouseLeave={handleEnd}
                        onMouseUp={handleEnd}
                        onMouseMove={(e) => handleMove(e, true)}
                        // أحداث اللمس للنافذة
                        onTouchStart={(e) => handleStart(e, true)}
                        onTouchEnd={handleEnd}
                        onTouchMove={(e) => handleMove(e, true)}
                        style={{ ...sliderCommonStyle, cursor: isModalDown ? 'grabbing' : 'grab', padding: '20px' }}
                    >
                        {[...selectedProject.allImages, ...selectedProject.allImages].map((img, idx) => (
                            <div key={idx} style={{ flex: '0 0 auto', height: '65vh', padding: '0 15px' }}>
                                <img src={img} draggable="false" style={{ height: '100%', borderRadius: '15px', display: 'block' }} alt="" />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
};

// --- التنسيقات (تبقى كما هي) ---
const sliderCommonStyle = {
    display: 'flex',
    overflowX: 'hidden',
    whiteSpace: 'nowrap',
    userSelect: 'none',
    WebkitOverflowScrolling: 'touch'
};

const cardStyle = {
    flex: '0 0 auto', width: '350px', margin: '0 15px',
    position: 'relative', borderRadius: '20px', overflow: 'hidden',
    boxShadow: '0 10px 25px rgba(0,0,0,0.1)', transition: 'transform 0.3s'
};

const imgStyle = { width: '100%', height: '450px', objectFit: 'cover', display: 'block' };

const overlayInfoStyle = (isAr) => ({
    position: 'absolute', bottom: 0, left: 0, right: 0,
    background: 'linear-gradient(transparent, rgba(9, 53, 55, 0.95))',
    padding: '30px 20px', color: '#fff', textAlign: isAr ? 'right' : 'left'
});

const modalOverlayStyle = {
    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
    backgroundColor: 'rgba(5, 25, 26, 0.98)', zIndex: 9999,
    display: 'flex', flexDirection: 'column', justifyContent: 'center'
};

const closeButtonStyle = {
    position: 'absolute', top: '30px', right: '30px', background: 'white',
    border: 'none', color: '#093537', width: '40px', height: '40px',
    borderRadius: '50%', display: 'flex', alignItems: 'center',
    justifyContent: 'center', fontSize: '20px', cursor: 'pointer', zIndex: 10
};

export default Home_WorksPreview;