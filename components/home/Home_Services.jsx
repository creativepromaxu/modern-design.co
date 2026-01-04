import React, { useEffect } from "react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

const Services = () => {
    const { t } = useTranslation('common');
    const router = useRouter();

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
                }
            });
        }, { threshold: 0.1, rootMargin: "0px" });

        const items = document.querySelectorAll(".service-card-wrapper");
        items.forEach(item => observer.observe(item));
        return () => observer.disconnect();
    }, []);

    return (
        <section id="services" style={{
            padding: "80px 20px",
            minHeight: "100vh",
            background: "#f8f9fa",
            fontFamily: "'Tajawal', sans-serif"
        }}>
            <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
                {/* Header Section */}
                <div style={{ textAlign: "center", marginBottom: "60px" }}>
                    <h2 style={{
                        fontSize: "3.5rem", fontWeight: 800, color: colors.primary,
                        marginBottom: "15px", position: "relative", display: "inline-block"
                    }}>
                        {t('services_section.title')}
                        <div style={{
                            position: "absolute", bottom: "-10px", left: "50%", transform: "translateX(-50%)",
                            width: "80px", height: "4px", background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
                            borderRadius: "2px"
                        }}></div>
                    </h2>
                    <p style={{ fontSize: "1.2rem", color: "#666", marginTop: "25px", maxWidth: "600px", margin: "25px auto 0" }}>
                        {t('services_section.subtitle')}
                    </p>
                </div>

                {/* Grid Section */}
                <div className="services-grid">
                    {services.map((service, i) => (
                        <div key={i} className="service-card-wrapper">
                            <a href={service.link} className="service-card-link">

                                {/* 1. الطبقات الخلفية (صورة + لون أخضر + تدرج أسود) */}
                                <div className="image-layer">
                                    <img src={getImagePath(service.link)} alt={service.title} loading="lazy" decoding="async" />
                                    {/* اللون الأخضر المدمج */}
                                    <div className="green-overlay"></div>
                                    {/* التدرج الأسود من الأسفل لظهور النص */}
                                    <div className="bottom-gradient-overlay"></div>
                                </div>

                                {/* 2. المحتوى والنصوص */}
                                <div className="text-content-layer">
                                    {/* الرقم في الزاوية العلوية اليمنى */}
                                    <div className="number-badge">{i + 1}</div>

                                    {/* النصوص في الأسفل */}
                                    <div className="content-inner">
                                        <h3>{service.title}</h3>
                                        <p>{service.description}</p>
                                    </div>
                                </div>

                                {/* 3. زر رؤية المزيد */}
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
          grid-template-columns: repeat(2, 1fr); 
          gap: 15px; 
          padding: 0 10px;
        }

        @media (min-width: 768px) {
          .services-grid { grid-template-columns: repeat(3, 1fr); gap: 25px; }
        }
        @media (min-width: 1024px) {
          .services-grid { grid-template-columns: repeat(4, 1fr); gap: 35px; }
        }

        .service-card-wrapper {
          height: 350px; /* زيادة الارتفاع قليلاً لاستيعاب النصوص في الأسفل براحة */
          opacity: 0;
          transform: translateY(20px); 
          transition: opacity 0.4s ease-out, transform 0.4s ease-out;
        }
        .service-card-wrapper.visible { transform: translateY(0); opacity: 1; }

        .service-card-link {
          text-decoration: none;
          display: block;
          height: 100%;
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          background-color: #000;
        }

        /* --- Image & Overlays --- */
        .image-layer { position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 1; }
        .image-layer img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s ease; }
        
        .green-overlay {
          position: absolute; top: 0; left: 0; width: 100%; height: 100%;
          background-color: ${colors.primary};
          mix-blend-mode: multiply; /* سر دمج اللون */
          opacity: 0.8; 
          transition: opacity 0.3s ease;
        }

        /* التدرج الأسود الجديد */
        .bottom-gradient-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 80%; /* يغطي 80% من الأسفل */
          background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0) 100%);
          z-index: 2; /* فوق الأخضر وتحت النص */
          opacity: 1;
        }

        /* --- Content Layout --- */
        .text-content-layer {
          position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 10;
          color: #ffffff;
          padding: 20px;
          /* استخدام فليكس لترتيب العناصر */
          display: flex;
          flex-direction: column;
          justify-content: flex-end; /* دفع المحتوى للأسفل */
        }

        .number-badge {
          position: absolute;
          top: 20px;
          right: 20px; /* في الركن الأيمن العلوي */
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: ${colors.primary};
          color: #ffffff;
          box-shadow: 0 4px 10px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
        }

        .content-inner {
          text-align: center; /* توسيط النص */
          transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          margin-bottom: 10px; /* مسافة بسيطة من الحافة السفلية */
        }

        h3 {
          font-size: 1.5rem;
          font-weight: 800;
          margin-bottom: 8px;
          text-shadow: 0 2px 4px rgba(0,0,0,0.5); /* ظل لزيادة الوضوح */
        }

        p {
          font-size: 0.95rem;
          line-height: 1.4;
          color: rgba(255, 255, 255, 0.9);
          display: -webkit-box;
          -webkit-line-clamp: 2; /* سطرين فقط عشان الشكل يكون مرتب */
          -webkit-box-orient: vertical;
          overflow: hidden;
          margin: 0;
        }

        /* --- Button & Hover --- */
        .hover-button-layer {
          position: absolute;
          bottom: 25px; /* مكان الزر */
          left: 50%;
          transform: translateX(-50%) translateY(20px);
          z-index: 15;
          opacity: 0;
          transition: all 0.4s ease;
          width: 100%;
          display: flex;
          justify-content: center;
        }

        .cta-button {
          padding: 10px 25px;
          background: #ffffff;
          color: ${colors.primary};
          border-radius: 30px;
          font-weight: 800;
          font-size: 0.9rem;
          box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        }

        /* --- Interactions --- */
        .service-card-link:hover .image-layer img { transform: scale(1.1); }
        .service-card-link:hover .green-overlay { opacity: 0.9; } /* تغميق الأخضر قليلاً */
        
        .service-card-link:hover .content-inner {
          /* عند الهوفر، يرتفع النص للأعلى ليفسح المجال للزر */
          transform: translateY(-50px); 
        }

        .service-card-link:hover .hover-button-layer {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }

        @media (max-width: 768px) {
          .service-card-wrapper { height: 280px; }
          h3 { font-size: 1.2rem; }
          p { font-size: 0.85rem; -webkit-line-clamp: 3; } /* في الجوال ممكن نسمح بـ 3 أسطر */
          .content-inner { margin-bottom: 0; }
        }
      `}</style>
        </section>
    );
};

export default Services;