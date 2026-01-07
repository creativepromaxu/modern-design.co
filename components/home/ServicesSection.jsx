import React, { useState } from "react";
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

const Services_Section = () => {
    const { t } = useTranslation('common');
    const router = useRouter();

    const currentLang = router.locale || 'ar';
    const isRtl = currentLang === 'ar';
    const [isModalOpen, setIsModalOpen] = useState(false);

    // نفس البيانات السابقة
    const services = [
        { id: 1, name_ar: "رول اب", name_en: "Roll Up", image: "/images/services/rollup.jpg" },
        { id: 2, name_ar: "بوب اب", name_en: "Pop Up", image: "/images/services/popup.jpg" },
        { id: 3, name_ar: "لوحات كانفز", name_en: "Canvas Frames", image: "/images/services/canvas.jpg" },
        { id: 4, name_ar: "كروت شخصية", name_en: "Business Cards", image: "/images/services/cards.jpg" },
        { id: 5, name_ar: "فلايرات", name_en: "Flyers", image: "/images/services/flyers.jpg" },
        { id: 6, name_ar: "بروفايلات", name_en: "Profiles", image: "/images/services/profiles.jpg" },
        { id: 7, name_ar: "ستيكرات دايكت", name_en: "Die-cut Stickers", image: "/images/services/diecut.jpg" },
        { id: 8, name_ar: "ستيكرات سي ثرو", name_en: "See-through Stickers", image: "/images/services/seethrough.jpg" },
        { id: 9, name_ar: "ستيكرات واجهات", name_en: "Window Stickers", image: "/images/services/fronts.jpg" },
        { id: 10, name_ar: "لوحات اكرليك", name_en: "Acrylic Signs", image: "/images/services/acrylic.jpg" },
        { id: 11, name_ar: "لوحات فوركس", name_en: "Forex Signs", image: "/images/services/forex.jpg" },
        { id: 12, name_ar: "طباعة تيشرتات", name_en: "T-Shirt Printing", image: "/images/services/tshirts.jpg" },
        { id: 13, name_ar: "طباعة اكياس", name_en: "Bag Printing", image: "/images/services/bags.jpg" },
        { id: 14, name_ar: "بنرات", name_en: "Banners", image: "/images/services/banners.jpg" },
        { id: 15, name_ar: "بوكسات هدايا", name_en: "Gift Boxes", image: "/images/services/gifts.jpg" },
        { id: 16, name_ar: "مكعبات فوركس", name_en: "Forex Cubes", image: "/images/services/cubes.jpg" },
        { id: 17, name_ar: "ورق خطابات", name_en: "Letterheads", image: "/images/services/letterhead.jpg" },
        { id: 18, name_ar: "بوكسات وعلب", name_en: "Packaging Boxes", image: "/images/services/boxes.jpg" },
        { id: 19, name_ar: "طباعة اكواب", name_en: "Mug Printing", image: "/images/services/mugs.jpg" },
        { id: 20, name_ar: "ورق هرميات", name_en: "Pyramid Papers", image: "/images/services/pyramids.jpg" },
        { id: 21, name_ar: "اعلام", name_en: "Flags", image: "/images/services/flags.jpg" },
        { id: 22, name_ar: "حواجز", name_en: "Barriers", image: "/images/services/barriers.jpg" },
        { id: 23, name_ar: "بطاقات ID", name_en: "ID Cards", image: "/images/services/ids.jpg" },
        { id: 24, name_ar: "فيستات", name_en: "Vests", image: "/images/services/vests.jpg" },
        { id: 25, name_ar: "لاما ستاند", name_en: "Lama Stand", image: "/images/services/lama.jpg" },
        { id: 26, name_ar: "وشاحات", name_en: "Scarves", image: "/images/services/scarves.jpg" },
        { id: 27, name_ar: "ميش بنر", name_en: "Mesh Banner", image: "/images/services/MishBanner.jpg" },
        { id: 28, name_ar: "ستيكر ثلجي", name_en: "Frosted Sticker", image: "/images/services/snowsticker.jpg" },
        { id: 29, name_ar: "حروف بارزة", name_en: "3D Letters", image: "/images/services/3Dletters.jpg" },
        { id: 30, name_ar: "ستيكر باصات", name_en: "Bus Stickers", image: "/images/services/Busstickers.jpg" },
        { id: 31, name_ar: "ستيكر سيارات", name_en: "Car Stickers", image: "/images/services/carstickers.jpg" },
    ];

    const [activeId, setActiveId] = useState(1);
    const activeService = services.find(s => s.id === activeId);
    const getName = (item) => isRtl ? item.name_ar : item.name_en;

    return (
        <section className="services-section" dir={isRtl ? 'rtl' : 'ltr'}>
            <div className="container">

                <div className="section-header">
                    <span className="subtitle">{t('services.subtitle', isRtl ? 'ماذا نقدم؟' : 'What we offer')}</span>
                    <h2>{t('services.title', isRtl ? 'خدماتنا الإبداعية' : 'Our Creative Services')}</h2>
                </div>

                <div className="content-wrapper">

                    {/* 1. منطقة الصورة (Preview) - وضعناها أولاً لتعمل الـ Sticky بشكل صحيح */}
                    <div className="image-area">
                        <div className="preview-container">
                            <div
                                className="image-wrapper cursor-pointer"
                                onClick={() => setIsModalOpen(true)}
                                title="Click to zoom"
                            >
                                <img
                                    key={activeService.id}
                                    src={activeService.image}
                                    alt={getName(activeService)}
                                    onError={(e) => { e.target.style.backgroundColor = '#1a4f52'; e.target.src = '' }}
                                />
                                <div className="zoom-hint">🔍</div>
                            </div>
                        </div>
                    </div>

                    {/* 2. منطقة الشبكة (القائمة) */}
                    <div className="grid-area">
                        <div className="services-grid">
                            {services.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveId(item.id)}
                                    className={`service-card ${activeId === item.id ? 'active' : ''}`}
                                >
                                    <span className="text">{getName(item)}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
                    <div className="modal-content">
                        <img
                            src={activeService.image}
                            alt={getName(activeService)}
                            onClick={(e) => e.stopPropagation()}
                        />
                        <button className="close-btn" onClick={() => setIsModalOpen(false)}>✕</button>
                    </div>
                </div>
            )}

            <style jsx>{`
                /* ---- إعدادات عامة ---- */
                .services-section {
                    /* تقليل الحواف العلوية والسفلية للكمبيوتر */
                    padding: 50px 20px; 
                    background-color: #093537;
                    color: #fff;
                    font-family: 'Tajawal', sans-serif;
                }
                
                .container {
                    max-width: 1200px;
                    margin: 0 auto;
                }

                /* ---- العنوان (مضغوط أكثر) ---- */
                .section-header {
                    text-align: center;
                    margin-bottom: 30px; /* تقليل المسافة */
                }
                .subtitle {
                    color: #4fd1c5;
                    font-weight: bold;
                    font-size: 0.8rem;
                    display: block;
                    margin-bottom: 5px;
                }
                .section-header h2 {
                    font-size: 2.2rem; /* تصغير الخط قليلاً */
                    font-weight: 800;
                    color: #fff;
                    margin: 0;
                }
                .section-header h2::after {
                    content: '';
                    display: block;
                    width: 50px;
                    height: 3px;
                    background: #4fd1c5;
                    margin: 10px auto 0;
                    border-radius: 2px;
                }

                /* ---- التخطيط ---- */
                .content-wrapper {
                    display: flex;
                    flex-direction: column; /* للجوال: الصورة أولاً ثم القائمة */
                    gap: 20px;
                    align-items: flex-start;
                    position: relative;
                }

                /* ---- منطقة الصورة ---- */
                .image-area {
                    width: 100%;
                    /* للجوال: تثبيت الصورة بالأعلى */
                    position: sticky;
                    top: 0; 
                    z-index: 50;
                    background-color: #093537; /* لون الخلفية عشان النص ما يمر من وراها */
                    padding-bottom: 15px; /* مسافة بسيطة تحت الصورة */
                    padding-top: 5px;
                }

                .preview-container {
                    width: 100%;
                    height: 250px; /* ارتفاع الصورة في الجوال (صغير ومناسب) */
                }

                .image-wrapper {
                    width: 100%;
                    height: 100%;
                    border-radius: 12px;
                    overflow: hidden;
                    position: relative;
                    box-shadow: 0 10px 20px rgba(0,0,0,0.3);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    background-color: #0b4042;
                }
                .image-wrapper img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.4s ease;
                }
                .image-wrapper:hover img {
                    transform: scale(1.02);
                }

                .zoom-hint {
                    position: absolute;
                    top: 10px;
                    left: 10px;
                    background: rgba(0,0,0,0.6);
                    color: white;
                    width: 25px;
                    height: 25px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 12px;
                    pointer-events: none;
                }

                /* ---- الشبكة والقائمة ---- */
                .grid-area {
                    width: 100%;
                }

                .services-grid {
                    display: grid;
                    /* للجوال: 3 أعمدة كما طلبت */
                    grid-template-columns: repeat(3, 1fr); 
                    gap: 8px; /* تقليل المسافات */
                }

                /* ---- البطاقة (الأزرار) ---- */
                .service-card {
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 6px;
                    padding: 8px 4px; /* تقليل الحواف الداخلية */
                    cursor: pointer;
                    transition: all 0.2s ease;
                    text-align: center;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-height: 45px; /* ارتفاع أصغر */
                }
                
                .text {
                    font-size: 0.8rem; /* تصغير الخط للجوال عشان يسع 3 أعمدة */
                    font-weight: 500;
                    color: #d1d5db;
                    line-height: 1.2;
                }

                .service-card:hover {
                    background: rgba(255, 255, 255, 0.1);
                    border-color: #4fd1c5;
                }

                .service-card.active {
                    background-color: #4fd1c5;
                    border-color: #4fd1c5;
                    box-shadow: 0 0 10px rgba(79, 209, 197, 0.2);
                }
                .service-card.active .text {
                    color: #093537;
                    font-weight: 700;
                }

                /* ---- Modal ---- */
                .modal-overlay {
                    position: fixed;
                    top: 0; left: 0; right: 0; bottom: 0;
                    background-color: rgba(0, 0, 0, 0.95);
                    z-index: 9999;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 20px;
                    animation: fadeIn 0.3s ease;
                }
                .modal-content img {
                    max-width: 100%;
                    max-height: 90vh;
                    border-radius: 8px;
                    box-shadow: 0 0 30px rgba(0,0,0,0.5);
                }
                .close-btn {
                    position: absolute;
                    top: -40px; right: 0;
                    background: none; border: none; color: white;
                    font-size: 30px; cursor: pointer;
                }

                /* ---- Media Queries (Desktop) ---- */
                @media (min-width: 1024px) {
                    .services-section {
                        /* تقليل البادينج عشان الصفحة تكون ملمومة */
                        padding: 40px 20px;
                    }

                    .content-wrapper {
                        /* ترتيب عكسي للكمبيوتر: الشبكة يمين، الصورة يسار (في العربي) */
                        flex-direction: row-reverse; 
                        align-items: flex-start;
                        gap: 25px;
                    }
                    
                    /* الشبكة */
                    .grid-area {
                        flex: 1.5;
                    }
                    .services-grid {
                        /* 4 أعمدة في الكمبيوتر */
                        grid-template-columns: repeat(4, 1fr); 
                        gap: 10px;
                    }
                    .service-card {
                        padding: 10px;
                        min-height: 40px; /* زر مضغوط وجميل */
                    }
                    .text {
                        font-size: 0.9rem; /* خط أكبر قليلاً للكمبيوتر */
                    }

                    /* الصورة */
                    .image-area {
                        flex: 1;
                        position: sticky; /* تثبيت في الكمبيوتر أيضاً */
                        top: 20px;
                        padding: 0; /* إلغاء بادينج الجوال */
                        background: none;
                    }
                    .preview-container {
                        /* تصغير ارتفاع الصورة في الكمبيوتر لتناسب الشاشة */
                        height: 380px; /* كان 500 بالسابق، صغرناه */
                    }
                }

                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
            `}</style>
        </section>
    );
};

export default Services_Section;