import React, { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

const Home_EventBanner = () => {
    const { i18n } = useTranslation();
    const router = useRouter();

    // حالات المكون
    const [imageExists, setImageExists] = useState(false);
    const [redirectUrl, setRedirectUrl] = useState('#');

    // تحديد اللغة الحالية من راوتر Next.js
    const currentLang = router.locale || 'ar';

    // بناء مسار الصورة بناءً على اللغة (يجب أن تكون في مجلد public)
    const bannerName = currentLang === 'ar' ? 'banner-ar.jpg' : 'banner-en.jpg';
    const bannerPath = `/${bannerName}`;

    useEffect(() => {
        const checkBannerAndLink = async () => {
            // 1. محاولة تحميل الصورة للتأكد من وجودها
            const img = new Image();
            img.src = bannerPath;

            img.onload = async () => {
                setImageExists(true);

                // 2. إذا وجدت الصورة، نحاول جلب الرابط من ملف التكست
                try {
                    const response = await fetch('/banner-link.txt');
                    if (response.ok) {
                        const text = await response.text();
                        setRedirectUrl(text.trim());
                    }
                } catch (err) {
                    console.log("Banner link file not found, using default.");
                }
            };

            img.onerror = () => {
                // إذا لم توجد الصورة (مثلاً قمت بتغيير اسمها لإخفائها)
                setImageExists(false);
            };
        };

        checkBannerAndLink();
    }, [currentLang, bannerPath]);

    // إذا كانت الصورة غير موجودة، لا يظهر أي كود نهائياً في المتصفح
    if (!imageExists) return null;

    return (
        <section
            className="event-banner-container"
            style={{
                width: '100%',
                margin: '50px 0', // مسافة متساوية فوق وتحت البنر
                padding: '0 20px', // حماية للجوانب في الشاشات الصغيرة
                display: 'flex',
                justifyContent: 'center'
            }}
        >
            <div
                style={{
                    maxWidth: '1400px', // عرض واسع وكبير للبنر
                    width: '100%',
                    transition: 'transform 0.3s ease' // تحضير لتأثير الـ Hover
                }}
                // تأثير بسيط عند مرور الماوس
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.01)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
                <a
                    href={redirectUrl}
                    // يفتح في صفحة جديدة إذا كان رابط خارجي، وفي نفس الصفحة إذا كان مجلد محلي
                    target={redirectUrl.startsWith('http') ? "_blank" : "_self"}
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'none', display: 'block' }}
                >
                    <img
                        src={bannerPath}
                        alt="Event Banner"
                        style={{
                            width: '100%',
                            height: 'auto',
                            borderRadius: '20px', // حواف دائرية عصرية
                            display: 'block',
                            boxShadow: '0 15px 35px rgba(0,0,0,0.1)', // ظل ناعم وفخم
                            cursor: 'pointer'
                        }}
                    />
                </a>
            </div>
        </section>
    );
};

export default Home_EventBanner;