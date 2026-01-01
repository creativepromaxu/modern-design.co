// components/home/Home_Partners.jsx
import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'next-i18next';

const Home_Partners = () => {
  const { t } = useTranslation('common');
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // منطق مراقبة السكرول (يعمل صعوداً ونزولاً)
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);  // ظهر في الشاشة
        } else {
          setIsVisible(false); // خرج من الشاشة (لإعادة الحركة لاحقاً)
        }
      });
    }, { threshold: 0.2 }); // يبدأ عند ظهور 20% من القسم

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={`partners-section ${isVisible ? 'visible' : ''}`}>
      <div className="container">
        
        {/* العنوان */}
        <div className="section-header">
          <h2 className="title">{t('partners.title', 'شركاء النجاح')}</h2>
          <div className="line"></div>
        </div>

        {/* الشريط المتحرك */}
        <div className="slider-container">
          <div className="fade-overlay left"></div>
          <div className="fade-overlay right"></div>

          <div className="scroll-track">
            {/* النسخة الأولى */}
            <img 
              src="/partners-strip.svg" 
              alt="Our Partners" 
              className="partner-strip"
            />
            {/* النسخة الثانية (تكرار للوب) */}
            <img 
              src="/partners-strip.svg" 
              alt="Our Partners" 
              className="partner-strip"
              aria-hidden="true" 
            />
          </div>
        </div>

      </div>

      <style jsx>{`
        .partners-section {
          padding: 80px 0;
          background: #ffffff;
          overflow: hidden;
          font-family: 'Tajawal', sans-serif;
          
          /* إعدادات أنيميشن الظهور عند السكرول */
          opacity: 0;
          transform: translateY(60px);
          transition: opacity 0.8s ease-out, transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        /* كلاس الظهور */
        .partners-section.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .container {
          max-width: 100%;
          margin: 0 auto;
        }

        .section-header {
          text-align: center;
          margin-bottom: 50px;
        }

        .title {
          font-size: 2.2rem;
          color: #333;
          font-weight: 800;
          margin-bottom: 15px;
        }

        .line {
          width: 80px;
          height: 4px;
          background: #028f7b;
          margin: 0 auto;
          border-radius: 2px;
          
          /* حركة بسيطة للخط */
          width: 0;
          transition: width 1s ease 0.3s;
        }

        .visible .line {
          width: 80px;
        }

        /* === Slider Logic === */
        .slider-container {
          position: relative;
          width: 100%;
          height: 120px; /* زدنا الارتفاع قليلاً */
          overflow: hidden;
          display: flex;
          align-items: center;
          background: #fff;
        }

        .scroll-track {
          display: flex;
          /* 👇 هنا التعديل: جعلناها 60 ثانية لتصبح أبطأ بمرتين */
          animation: scroll 60s linear infinite;
          width: max-content;
        }

        .partner-strip {
          height: 80px;
          width: auto;
          display: block;
          padding-right: 50px; /* مسافة بين النسختين */
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            /* نحرك الشريط بمقدار -50% (نصف العرض الإجمالي للشريطين) */
            transform: translateX(-50%);
          }
        }

        .slider-container:hover .scroll-track {
          animation-play-state: paused;
        }

        /* === Fade Effect === */
        .fade-overlay {
          position: absolute;
          top: 0;
          width: 150px;
          height: 100%;
          z-index: 2;
          pointer-events: none;
        }

        .left {
          left: 0;
          background: linear-gradient(to right, #fff 0%, transparent 100%);
        }

        .right {
          right: 0;
          background: linear-gradient(to left, #fff 0%, transparent 100%);
        }
        
        @media (max-width: 768px) {
           .title { font-size: 1.8rem; }
           .partner-strip { height: 60px; } /* تصغير اللوجوهات في الجوال */
        }
      `}</style>
    </section>
  );
};

export default Home_Partners;