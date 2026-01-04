import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { FaTimes } from 'react-icons/fa';

const Home_WorksPreview = ({ projects }) => {
    const { t } = useTranslation('common');
    const { locale } = useRouter();
    const isAr = locale === 'ar';

    const [selectedProject, setSelectedProject] = useState(null);

    // مراجع العناصر (Refs)
    const row1Ref = useRef(null); // الشريط العلوي
    const row2Ref = useRef(null); // الشريط السفلي
    const modalScrollRef = useRef(null); // المودال

    // حالة السحب (Drag State)
    const [dragState, setDragState] = useState({
        isDown: false,
        startX: 0,
        scrollLeft: 0,
        activeRef: null // لتحديد أي شريط يتم سحبه حالياً
    });

    const scrollStep = 1.0; // سرعة الحركة التلقائية

    // دالة مساعدة للحصول على موقع X
    const getX = (e) => (e.touches && e.touches.length > 0 ? e.touches[0].pageX : e.pageX);

    // --- 1. منطق التحريك التلقائي (Animation Loop) ---
    useEffect(() => {
        let requestRef;

        const animate = () => {
            // تحريك الشريط العلوي (لليسار)
            if (row1Ref.current && (dragState.activeRef !== row1Ref) && !selectedProject) {
                const el = row1Ref.current;
                el.scrollLeft += scrollStep;
                // إعادة التعيين لعمل Loop لا نهائي
                if (el.scrollLeft >= el.scrollWidth / 2) {
                    el.scrollLeft = 0;
                }
            }

            // تحريك الشريط السفلي (لليمين)
            if (row2Ref.current && (dragState.activeRef !== row2Ref) && !selectedProject) {
                const el = row2Ref.current;
                el.scrollLeft -= scrollStep;
                // إعادة التعيين للحركة العكسية
                if (el.scrollLeft <= 0) {
                    el.scrollLeft = el.scrollWidth / 2;
                }
            }

            // تحريك المودال (لليسار)
            if (modalScrollRef.current && (dragState.activeRef !== modalScrollRef) && selectedProject) {
                const el = modalScrollRef.current;
                el.scrollLeft += scrollStep;
                if (el.scrollLeft >= el.scrollWidth / 2) {
                    el.scrollLeft = 0;
                }
            }

            requestRef = requestAnimationFrame(animate);
        };

        requestRef = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(requestRef);
    }, [dragState.activeRef, selectedProject]);

    // --- 2. إعداد الموقع الأولي للشريط السفلي ---
    useEffect(() => {
        // نبدأ الشريط السفلي من المنتصف ليتمكن من التحرك لليمين فوراً
        if (row2Ref.current) {
            row2Ref.current.scrollLeft = row2Ref.current.scrollWidth / 2;
        }
    }, [projects]);


    // --- 3. دوال التعامل مع السحب (Drag Handlers) ---
    const handleStart = (e, ref) => {
        if (!ref.current) return;
        const x = getX(e);
        setDragState({
            isDown: true,
            startX: x - ref.current.offsetLeft,
            scrollLeft: ref.current.scrollLeft,
            activeRef: ref
        });
    };

    const handleMove = (e) => {
        if (!dragState.isDown || !dragState.activeRef.current) return;

        if (e.cancelable) e.preventDefault(); // منع سكرول الصفحة بالجوال

        const x = getX(e) - dragState.activeRef.current.offsetLeft;
        const walk = (x - dragState.startX) * 2; // سرعة السحب
        dragState.activeRef.current.scrollLeft = dragState.scrollLeft - walk;
    };

    const handleEnd = () => {
        setDragState({ ...dragState, isDown: false, activeRef: null });
    };

    if (!projects || projects.length === 0) return null;

    // تكرار البيانات 4 مرات لضمان امتلاء الشاشة للحركة العكسية والسلسة
    const duplicatedProjects = [...projects, ...projects, ...projects, ...projects];

    return (
        <section id="works" style={{ padding: '80px 0', backgroundColor: '#093537', overflow: 'hidden' }}>
            {/* العنوان */}
            <div style={{ textAlign: 'center', marginBottom: '40px', padding: '0 20px' }}>
                <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#f9f9f9' }}>{t('works.title')}</h2>
                <div style={{ width: '90px', height: '4px', background: 'linear-gradient(90deg, #028f7b, #51ab5e)', margin: '15px auto' }}></div>
            </div>

            {/* ================= الشريط الأول (يتحرك لليسار) ================= */}
            <div
                ref={row1Ref}
                onMouseDown={(e) => handleStart(e, row1Ref)}
                onMouseLeave={handleEnd}
                onMouseUp={handleEnd}
                onMouseMove={handleMove}
                onTouchStart={(e) => handleStart(e, row1Ref)}
                onTouchEnd={handleEnd}
                onTouchMove={handleMove}
                style={{
                    ...sliderCommonStyle,
                    marginBottom: '30px', // مسافة بين الشريطين
                    cursor: dragState.activeRef === row1Ref ? 'grabbing' : 'grab'
                }}
            >
                {duplicatedProjects.map((project, index) => (
                    <ProjectCard
                        key={`row1-${index}`}
                        project={project}
                        isAr={isAr}
                        onClick={() => setSelectedProject(project)}
                    />
                ))}
            </div>

            {/* ================= الشريط الثاني (يتحرك لليمين) ================= */}
            <div
                ref={row2Ref}
                onMouseDown={(e) => handleStart(e, row2Ref)}
                onMouseLeave={handleEnd}
                onMouseUp={handleEnd}
                onMouseMove={handleMove}
                onTouchStart={(e) => handleStart(e, row2Ref)}
                onTouchEnd={handleEnd}
                onTouchMove={handleMove}
                style={{
                    ...sliderCommonStyle,
                    cursor: dragState.activeRef === row2Ref ? 'grabbing' : 'grab'
                }}
            >
                {duplicatedProjects.map((project, index) => (
                    <ProjectCard
                        key={`row2-${index}`}
                        project={project}
                        isAr={isAr}
                        onClick={() => setSelectedProject(project)}
                    />
                ))}
            </div>

            {/* ================= النافذة المنبثقة (Modal) ================= */}
            {selectedProject && (
                <div style={modalOverlayStyle}>
                    <button onClick={() => setSelectedProject(null)} style={closeButtonStyle}><FaTimes /></button>

                    <div style={{ textAlign: 'center', color: '#fff', marginBottom: '20px' }}>
                        <h2 style={{ fontSize: '26px' }}>{isAr ? selectedProject.titleAr : selectedProject.titleEn}</h2>
                        <div style={{ width: '40px', height: '2px', background: '#028f7b', margin: '10px auto' }}></div>
                    </div>

                    <div
                        ref={modalScrollRef}
                        onMouseDown={(e) => handleStart(e, modalScrollRef)}
                        onMouseLeave={handleEnd}
                        onMouseUp={handleEnd}
                        onMouseMove={handleMove}
                        onTouchStart={(e) => handleStart(e, modalScrollRef)}
                        onTouchEnd={handleEnd}
                        onTouchMove={handleMove}
                        style={{ ...sliderCommonStyle, cursor: dragState.activeRef === modalScrollRef ? 'grabbing' : 'grab', padding: '20px' }}
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

// --- مكون فرعي للكارت لتقليل تكرار الكود ---
const ProjectCard = ({ project, isAr, onClick }) => (
    <div onClick={onClick} style={cardStyle}>
        <img src={project.cover} alt="" draggable="false" style={imgStyle} />
        <div style={overlayInfoStyle(isAr)}>
            <h3 style={{ fontSize: '18px', margin: 0, fontWeight: '600' }}>
                {isAr ? project.titleAr : project.titleEn}
            </h3>
            <span style={{ fontSize: '12px', opacity: 0.7, color: '#FFCF32', fontWeight: 'bold' }}>
                {isAr ? 'عرض المشروع' : 'View Project'}
            </span>
        </div>
    </div>
);

// --- التنسيقات ---
const sliderCommonStyle = {
    display: 'flex',
    overflowX: 'hidden', // إخفاء شريط التمرير الأصلي
    whiteSpace: 'nowrap',
    userSelect: 'none',
    WebkitOverflowScrolling: 'touch',
    width: '100%'
};

const cardStyle = {
    flex: '0 0 auto', width: '350px', margin: '0 15px',
    position: 'relative', borderRadius: '20px', overflow: 'hidden',
    boxShadow: '0 10px 25px rgba(0,0,0,0.1)', transition: 'transform 0.3s',
    cursor: 'pointer'
};

const imgStyle = { width: '100%', height: '300px', objectFit: 'cover', display: 'block' }; // قللت الارتفاع قليلاً ليتناسب مع وجود شريطين

const overlayInfoStyle = (isAr) => ({
    position: 'absolute', bottom: 0, left: 0, right: 0,
    background: 'linear-gradient(transparent, rgba(9, 53, 55, 0.95))',
    padding: '20px', color: '#fff', textAlign: isAr ? 'right' : 'left'
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