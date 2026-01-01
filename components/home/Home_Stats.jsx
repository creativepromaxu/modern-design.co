// components/home/Home_Stats.jsx
import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'next-i18next'; // 1. استيراد هوك الترجمة

// 2. مكون العداد (لم يتغير المنطق، فقط يستقبل النص المترجم)
const CounterItem = ({ target, label, suffix, icon }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  // مراقبة الظهور
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) observer.unobserve(elementRef.current);
    };
  }, []);

  // منطق العد والريست
  useEffect(() => {
    let timer;

    if (isVisible) {
      let start = 0;
      const duration = 2000;
      const increment = target / (duration / 16); 

      timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.ceil(start));
        }
      }, 16);

    } else {
      setCount(0); // تصفير العداد عند الخروج
    }

    return () => clearInterval(timer);
  }, [isVisible, target]);

  return (
    <div ref={elementRef} className="stat-card">
      <div className="icon-wrapper">
        {icon}
      </div>
      <div className="content">
        <div className="number">
          {count}<span className="suffix">{suffix}</span>
        </div>
        <p className="label">{label}</p>
      </div>
      
      <style jsx>{`
        .stat-card {
          background: #ffffff;
          padding: 30px 20px;
          border-radius: 20px;
          text-align: center;
          box-shadow: 0 10px 30px rgba(0,0,0,0.03);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 15px;
          border: 1px solid #f0f0f0;
        }

        .stat-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(0,0,0,0.08);
          border-color: #028f7b;
        }

        .icon-wrapper {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          background: linear-gradient(135deg, #e6f7f5 0%, #f0fdf4 100%);
          color: #028f7b;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 5px;
          box-shadow: 0 5px 15px rgba(2, 143, 123, 0.1);
        }

        .number {
          font-size: 2.8rem;
          font-weight: 800;
          color: #333;
  font-family: 'Tajawal', sans-serif; 

          line-height: 1;
          font-family: 'Tajawal', sans-serif;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
        }

        .suffix {
          color: #51ab5e; 
          font-size: 2.2rem;
        }

        .label {
          font-size: 1.1rem;
          color: #666;
  font-family: 'Tajawal', sans-serif;
          margin: 5px 0 0;
          font-weight: 500;
        }
      `}</style>
    </div>
  );
};

const Home_Stats = () => {
  const { t } = useTranslation('common'); // 3. تفعيل الترجمة

  // 4. نقلنا البيانات للداخل واستخدمنا t
  const statsData = [
    { 
      id: 1, 
      number: 7, 
      suffix: '+', 
      label: t('stats.years'), // ترجمة
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
      ) 
    },
    { 
      id: 2, 
      number: 200, 
      suffix: '+', 
      label: t('stats.clients'), // ترجمة
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      ) 
    },
    { 
      id: 3, 
      number: 400, 
      suffix: '+', 
      label: t('stats.projects'), // ترجمة
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
      ) 
    },
  ];

  return (
    <section className="stats-section">
      <div className="container">
        <div className="stats-grid">
          {statsData.map((stat) => (
            <CounterItem 
              key={stat.id} 
              target={stat.number} 
              label={stat.label} 
              suffix={stat.suffix}
              icon={stat.icon}
            />
          ))}
        </div>
      </div>
      <style jsx>{`
        .stats-section {
          padding: 60px 20px;
          background: #ffffff;
          position: relative;
          z-index: 2;
          margin-top: -40px;
        }
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 30px;
        }

        @media (max-width: 768px) {
          .stats-section {
            margin-top: 0;
            padding: 40px 20px;
          }
        }
      `}</style>
    </section>
  );
};

export default Home_Stats;