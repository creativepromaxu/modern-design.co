import React, { useEffect } from "react";
import { useTranslation } from "next-i18next"; // 1. استيراد هوك الترجمة
import { useRouter } from "next/router"; // 2. للتعامل مع اتجاه الصفحة

const Services = () => {
  const { t } = useTranslation('common'); // تفعيل الترجمة
  const router = useRouter(); // لمعرفة اللغة الحالية

  // 3. تعريف المصفوفة داخل المكون لتتمكن من قراءة الترجمة
  const services = [
    { title: t('services_list.uv_flat.title'), description: t('services_list.uv_flat.desc'), link: "/services/uv-flat" },
    { title: t('services_list.uv_roll.title'), description: t('services_list.uv_roll.desc'), link: "/services/uv-roll" },
    { title: t('services_list.paper.title'), description: t('services_list.paper.desc'), link: "/services/paper" },
    { title: t('services_list.solvent_roll.title'), description: t('services_list.solvent_roll.desc'), link: "/services/solvent-roll" },
    { title: t('services_list.diecut.title'), description: t('services_list.diecut.desc'), link: "/services/diecut" },
    { title: t('services_list.offset.title'), description: t('services_list.offset.desc'), link: "/services/offset" },
    { title: t('services_list.dtf.title'), description: t('services_list.dtf.desc'), link: "/services/dtf" },
    { title: t('services_list.sublimation.title'), description: t('services_list.sublimation.desc'), link: "/services/sublimation" },
    { title: t('services_list.laser_cut.title'), description: t('services_list.laser_cut.desc'), link: "/services/laser-cut" },
    { title: t('services_list.stamps.title'), description: t('services_list.stamps.desc'), link: "/services/stamps" },
    { title: t('services_list.raised_letters.title'), description: t('services_list.raised_letters.desc'), link: "/services/raised-letters" },
    { title: t('services_list.exhibitions.title'), description: t('services_list.exhibitions.desc'), link: "/services/exhibitions" },
  ];

  const colors = {
    primary: '#028f7b', 
    secondary: '#51ab5e', 
    text: '#333333',
    lightGray: '#f7f7f7',
    white: '#ffffff',
  };

  const getImagePath = (link) => {
    const slug = link.substring(link.lastIndexOf('/') + 1);
    return `/photoservices/${slug}.jpg`;
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        } else {
          entry.target.classList.remove("visible");
        }
      });
    }, { 
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px" 
    });

    const items = document.querySelectorAll(".service-card-wrapper");
    items.forEach(item => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" style={{ 
      padding: "80px 20px", 
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
      fontFamily: "'Tajawal', sans-serif"
    }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <h2 style={{ 
            fontSize: "3.5rem", 
            fontWeight: 800, 
            color: colors.primary,
            marginBottom: "15px",
            position: "relative",
            display: "inline-block"
          }}>
            {t('services_section.title')}
            <div style={{
              position: "absolute",
              bottom: "-10px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "80px",
              height: "4px",
              background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
              borderRadius: "2px"
            }}></div>
          </h2>
          <p style={{ fontSize: "1.2rem", color: "#666", marginTop: "25px", maxWidth: "600px", margin: "25px auto 0" }}>
            {t('services_section.subtitle')}
          </p>
        </div>

        <div className="services-grid">
          {services.map((service, i) => (
            <div 
              key={i} 
              className="service-card-wrapper" 
              style={{ transitionDelay: `${i * 0.05}s` }}
            >
              <a href={service.link} className="service-card-link">
                
                {/* 1. طبقة الصورة */}
                <div className="image-layer">
                  <img 
                    src={getImagePath(service.link)} 
                    alt={service.title}
                    loading="lazy" 
                    decoding="async"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div className="bottom-gradient"></div>
                </div>

                {/* 2. طبقة النصوص */}
                <div className="text-content-layer">
                  <div className="content-inner">
                    <div className="number-badge">{i + 1}</div>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  </div>
                </div>

                {/* 3. زر "رؤية المزيد" */}
                <div className="hover-button-layer">
                  <div className="cta-button">{t('services_section.read_more')}</div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>

          <style jsx>{`
        .services-grid {
          display: grid;
          /* الإعداد الافتراضي للجوال: عمودين */
          grid-template-columns: repeat(2, 1fr); 
          gap: 15px; /* تقليل الفراغ قليلاً ليتناسب مع الجوال */
          padding: 0 10px;
        }

        /* الشاشات المتوسطة (Tablets) - اختياري: 3 أعمدة */
        @media (min-width: 768px) {
          .services-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 25px;
          }
        }

        /* الشاشات الكبيرة (Desktop): 4 أعمدة */
        @media (min-width: 1024px) {
          .services-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 35px;
          }
        }

        .service-card-wrapper {
          height: 300px;
          opacity: 0;
          transform: translateY(60px) scale(0.95);
          transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        .service-card-wrapper.visible {
          transform: translateY(0) scale(1);
          opacity: 1;
        }

        .service-card-link {
          text-decoration: none;
          display: block;
          height: 100%;
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          background-color: #f7f7f7;
        }

        .image-layer {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
        }

        .image-layer img {
          transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .bottom-gradient {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 50%; 
          background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%);
          opacity: 0;
          transition: opacity 0.5s ease;
        }

        .text-content-layer {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 10;
          background-color: #f7f7f7;
          transition: opacity 0.5s ease;
          opacity: 1;
        }

        .content-inner {
          height: 100%;
          padding: 20px 15px; /* تقليل الحشو ليتناسب مع الأعمدة الضيقة */
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
        }

        .number-badge {
          width: 40px; /* تصغير الدائرة قليلاً للجوال */
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, #51ab5e, #028f7b);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 15px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }

        h3 {
          font-size: 1.2rem; /* تصغير الخط ليتناسب مع عمودين في الجوال */
          font-weight: 700;
          margin-bottom: 8px;
          color: #333333;
        }

        p {
          font-size: 0.9rem; /* تصغير الوصف قليلاً */
          line-height: 1.4;
          color: #666;
          /* تحديد عدد الأسطر لكي لا يختل التصميم */
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .hover-button-layer {
          position: absolute;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%) translateY(20px);
          z-index: 15;
          opacity: 0;
          transition: all 0.5s ease;
          pointer-events: none;
          width: 100%;
          display: flex;
          justify-content: center;
        }

        .cta-button {
          padding: 10px 20px;
          background: rgba(255, 255, 255, 0.95);
          color: #028f7b;
          border-radius: 30px;
          font-weight: 700;
          font-size: 0.9rem;
          box-shadow: 0 4px 15px rgba(0,0,0,0.3);
          backdrop-filter: blur(4px);
        }

        /* Hover Effects */
        .service-card-link:hover .image-layer img {
          transform: scale(1.08);
        }
        .service-card-link:hover .bottom-gradient {
          opacity: 1;
        }
        .service-card-link:hover .text-content-layer {
          opacity: 0;
          visibility: hidden;
        }
        .service-card-link:hover .hover-button-layer {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }

        @media (max-width: 768px) {
          h2 { font-size: 2rem !important; }
          .service-card-wrapper { height: 250px; } /* تقليل الارتفاع قليلاً للجوال */
        }
      `}</style>
    </section>
  );
};

export default Services;