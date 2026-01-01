import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'next-i18next';
import { FaStar, FaQuoteRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Home_Testimonials = () => {
    const { t } = useTranslation('common');
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const [currIndex, setCurrIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    // التحكم في قطر الدائرة (Radius) بناءً على الشاشة
    const [radius, setRadius] = useState(800);
    const touchStart = useRef(null);

    const reviews = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
    const cardCount = reviews.length;
    const theta = 360 / cardCount;

    // 1. مراقبة حجم الشاشة والسكرول
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) setRadius(350);
            else setRadius(800);
        };
        handleResize();
        window.addEventListener('resize', handleResize);

        const observer = new IntersectionObserver(([entry]) => {
            setIsVisible(entry.isIntersecting);
        }, { threshold: 0.1 });

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => {
            observer.disconnect();
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // 2. الحركة التلقائية (Auto-Play) - تعمل على الجميع وتتوقف عند لمس/مرور الماوس
    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            setCurrIndex(prev => prev + 1);
        }, 5000);

        return () => clearInterval(interval);
    }, [isPaused]);

    const nextSlide = () => setCurrIndex(prev => prev + 1);
    const prevSlide = () => setCurrIndex(prev => prev - 1);

    // 3. التحكم بالسحب (Swipe) للجوال
    const onTouchStart = (e) => {
        setIsPaused(true); // إيقاف الحركة التلقائية عند اللمس
        touchStart.current = e.touches[0].clientX;
    };

    const onTouchEnd = (e) => {
        setIsPaused(false); // إعادة الحركة التلقائية بعد رفع الإصبع
        if (!touchStart.current) return;
        const touchEnd = e.changedTouches[0].clientX;
        const diff = touchStart.current - touchEnd;

        if (Math.abs(diff) > 50) {
            if (diff > 0) nextSlide();
            else prevSlide();
        }
        touchStart.current = null;
    };

    return (
        <section
            ref={sectionRef}
            className={`testimonials-3d-scene ${isVisible ? 'visible' : ''}`}
        >
            <div className="container">
                <div className="section-header">
                    <h2 className="title">{t('testimonials.title', 'ماذا يقول عملاؤنا؟')}</h2>
                    <div className="line"></div>
                    <p className="subtitle">{t('testimonials.subtitle', 'نفتخر بثقة عملائنا')}</p>
                </div>

                <div
                    className="interactive-wrapper"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    onTouchStart={onTouchStart}
                    onTouchEnd={onTouchEnd}
                >
                    {/* الأسهم - تظهر في الكمبيوتر فقط */}
                    <button onClick={prevSlide} className="nav-arrow prev" aria-label="Previous">
                        <FaChevronRight />
                    </button>

                    <div className="scene">
                        <div
                            className="carousel"
                            style={{
                                transform: `translateZ(-${radius}px) rotateY(${-theta * currIndex}deg)`
                            }}
                        >
                            {reviews.map((id, index) => {
                                const angle = theta * index;
                                const normalizedIndex = ((currIndex % cardCount) + cardCount) % cardCount;
                                const isActive = index === normalizedIndex;

                                return (
                                    <div
                                        key={id}
                                        className={`card-cell ${isActive ? 'active' : 'inactive'}`}
                                        style={{
                                            transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                                            zIndex: isActive ? 100 : 1
                                        }}
                                    >
                                        <div className="review-card">
                                            <div className="watermark"><FaQuoteRight /></div>
                                            <div className="card-content">
                                                <div className="stars">
                                                    {[...Array(5)].map((_, i) => (
                                                        <FaStar key={i} size={14} color="#F59E0B" />
                                                    ))}
                                                </div>
                                                <p className="text">"{t(`testimonials.reviews.${id}.text`)}"</p>
                                                <div className="divider"></div>
                                                <div className="info">
                                                    <div className="avatar">
                                                        {t(`testimonials.reviews.${id}.name`).charAt(0)}
                                                    </div>
                                                    <div className="user-details">
                                                        <h4 className="name">{t(`testimonials.reviews.${id}.name`)}</h4>
                                                        <span className="role">{t(`testimonials.reviews.${id}.role`)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <button onClick={nextSlide} className="nav-arrow next" aria-label="Next">
                        <FaChevronLeft />
                    </button>
                </div>
            </div>

            <style jsx>{`
        .testimonials-3d-scene {
          padding: 100px 0 140px 0;
          background: radial-gradient(circle at center, #fff 0%, #f8fafc 100%);
          font-family: 'Tajawal', sans-serif;
          overflow: hidden;
          perspective: 2000px;
          opacity: 0;
          transform: translateY(30px);
          transition: all 1s ease;
        }
        .testimonials-3d-scene.visible { opacity: 1; transform: translateY(0); }
        .container { max-width: 100%; margin: 0 auto; display: flex; flex-direction: column; align-items: center; }
        .section-header { text-align: center; margin-bottom: 60px; z-index: 10; }
        .title { font-size: 2.5rem; color: #333; font-weight: 800; margin-bottom: 15px; }
        .line { width: 0; height: 4px; background: linear-gradient(90deg, #028f7b, #51ab5e); margin: 0 auto 20px auto; border-radius: 2px; transition: width 1s ease 0.5s; }
        .visible .line { width: 80px; }
        .subtitle { color: #666; font-size: 1.1rem; }

        .interactive-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          position: relative;
          padding: 40px 0;
          touch-action: pan-y;
        }

        .scene {
          width: 600px; height: 320px; /* الارتفاع الافتراضي للكمبيوتر */
          position: relative;
          perspective: 1000px;
          z-index: 5;
        }

        .carousel {
          width: 100%; height: 100%;
          position: absolute;
          transform-style: preserve-3d;
          transition: transform 1.2s cubic-bezier(0.23, 1, 0.32, 1); 
        }

        .card-cell {
          position: absolute;
          width: 560px; height: 320px;
          left: 20px; top: 0;
          transition: all 1s; 
          backface-visibility: hidden; 
        }

        .card-cell.active { opacity: 1; filter: blur(0px); }
        .card-cell.inactive { opacity: 0.2; filter: blur(6px); }

        .review-card {
          width: 100%; height: 100%;
          background: #fff;
          border-radius: 24px;
          padding: 40px;
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.06);
          border: 1px solid rgba(0, 0, 0, 0.03);
          display: flex; flex-direction: column; justify-content: center;
          position: relative;
        }

        .card-cell.active .review-card { border-color: #028f7b; box-shadow: 0 20px 60px rgba(2, 143, 123, 0.15); }
        .watermark { position: absolute; top: 10px; left: 20px; font-size: 8rem; color: rgba(2, 143, 123, 0.03); }
        .stars { margin-bottom: 20px; display: flex; gap: 4px; }
        .text { font-size: 1.2rem; color: #444; line-height: 1.6; font-style: italic; }
        .divider { width: 100%; height: 1px; background: #f0f0f0; margin-bottom: 20px; }
        .info { display: flex; align-items: center; gap: 15px; }
        .avatar { width: 50px; height: 50px; border-radius: 50%; background: linear-gradient(135deg, #028f7b, #3b82f6); color: #fff; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0; }
        .user-details { overflow: hidden; } /* لمنع خروج النص من الحاوية الصغيرة */
        .name { font-size: 1.1rem; font-weight: 700; color: #333; margin: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .role { font-size: 0.9rem; color: #888; }

        .nav-arrow {
          background: #fff; border: 1px solid #eee; width: 55px; height: 55px; border-radius: 50%;
          color: #555; font-size: 1.2rem; cursor: pointer; display: flex; align-items: center; justify-content: center;
          transition: all 0.3s; z-index: 20; box-shadow: 0 5px 15px rgba(0,0,0,0.1); margin: 0 40px;
        }
        .nav-arrow:hover { background: #028f7b; color: #fff; }

        /* === تعديلات الجوال (رفع الارتفاع وحذف الأسهم) === */
        @media (max-width: 992px) {
          .nav-arrow { display: none; } /* حذف الأسهم */
          
          .scene, .card-cell { 
            height: 420px; /* تكبير الفريم ليناسب الأسماء الطويلة */
          }
          .scene { width: 340px; }
          .card-cell { width: 320px; left: 10px; }
          
          .name { white-space: normal; line-height: 1.2; font-size: 1rem; } /* السماح للاسم بالنزول لسطرين إذا لزم الأمر */
          .title { font-size: 1.8rem; }
          .text { font-size: 1.05rem; }
        }

        @media (max-width: 480px) {
          .scene, .card-cell { 
            height: 450px; /* ارتفاع إضافي للشاشات الصغيرة جداً */
          }
          .scene { width: 290px; }
          .card-cell { width: 270px; }
          .review-card { padding: 25px; }
        }
      `}</style>
        </section>
    );
};

export default Home_Testimonials;