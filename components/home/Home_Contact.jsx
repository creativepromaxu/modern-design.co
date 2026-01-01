import React, { useState } from 'react'; // أضفنا useState هنا
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaHeart, FaFacebookF, FaInstagram, FaTiktok } from 'react-icons/fa';

const Footer = () => {
    const { t } = useTranslation('common');
    const router = useRouter();
    const isAr = router.locale === 'ar';

    // --- منطق النقرات المتتالية ---
    const [clickCount, setClickCount] = useState(0);
    const [lastClickTime, setLastClickTime] = useState(0);

    const handleDeveloperClick = () => {
        const currentTime = Date.now();
        // إذا كان الفرق بين النقرة الحالية والسابقة أقل من 500 مللي ثانية (نصف ثانية)
        if (currentTime - lastClickTime < 500) {
            const newCount = clickCount + 1;
            if (newCount === 5) {
                router.push('/QuotationModernDesign/login');
                setClickCount(0); // إعادة التصفير بعد الانتقال
            } else {
                setClickCount(newCount);
            }
        } else {
            // إذا تأخر المستخدم في النقرة، نبدأ العد من جديد
            setClickCount(1);
        }
        setLastClickTime(currentTime);
    };
    // ----------------------------

    const colors = {
        primary: '#028f7b',
        secondary: '#51ab5e',
        text: '#ffffff',
        darkBg: '#093537',
        lightText: '#e2e8f0',
    };

    const socialLinks = [
        {
            Icon: ({ style, className }) => (
                <svg className={className} width="18" height="18" viewBox="0 0 300 271" fill="currentColor" style={style}>
                    <path d="m236 0h46l-101 115 118 156h-92.6l-72.5-94.8-83 94.8h-46l107-123-113-148h94.9l65.5 86.6zm-16.1 244h25.5l-165-218h-27.4z" />
                </svg>
            ),
            color: '#ffffff',
            url: 'https://x.com/moderndesignadv'
        },
        { Icon: FaFacebookF, color: '#4267B2', url: 'https://www.facebook.com/ModernDesignAdv' },
        { Icon: FaInstagram, color: '#E1306C', url: 'https://www.instagram.com/moderndesignadv' },
        { Icon: FaTiktok, color: '#ffffff', url: 'https://www.tiktok.com/@moderndesignadv' },
        { Icon: FaWhatsapp, color: '#25D366', url: 'https://wa.me/966557480817' },
    ];

    const navLinks = [
        { name: t('header.home', 'الرئيسية'), href: '/' },
        { name: t('header.about', 'من نحن'), href: '/#about' },
        { name: t('header.works', 'مشاريعنا'), href: '/#works' },
        { name: t('header.services', 'خدماتنا'), href: '/#services' },
        { name: t('header.contact', 'تواصل معنا'), href: '/#contact' },
    ];

    return (
        <footer
            id="contact"
            style={{
                backgroundColor: colors.darkBg,
                color: colors.text,
                fontFamily: "'Tajawal', sans-serif",
                position: 'relative',
                direction: isAr ? 'rtl' : 'ltr',
                scrollMarginTop: '80px'
            }}
        >
            <div style={{
                width: '100%',
                height: '4px',
                background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`
            }} />

            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 20px 30px' }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '40px'
                }}>
                    {/* قسم الشعار والنبذة */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <img src="/logos/logo.svg" alt="Logo" style={{ height: '50px', width: 'auto', alignSelf: 'flex-start' }} />
                        <p style={{ color: colors.lightText, lineHeight: '1.8', fontSize: '15px', maxWidth: '300px' }}>
                            {t('footer.bio')}
                        </p>
                        <div style={{ display: 'flex', gap: '15px' }}>
                            {socialLinks.map((item, idx) => (
                                <a key={idx} href={item.url} target="_blank" rel="noreferrer" style={{ color: '#fff', fontSize: '20px', transition: '0.3s', opacity: 0.8 }}>
                                    <item.Icon />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* قسم روابط سريعة */}
                    <div>
                        <h3 style={{ color: colors.primary, marginBottom: '25px', fontSize: '18px', fontWeight: 'bold' }}>
                            {t('footer.quick_links')}
                        </h3>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            {navLinks.map((link, i) => (
                                <li key={i} style={{ marginBottom: '12px' }}>
                                    <Link href={link.href} style={{ color: colors.lightText, textDecoration: 'none', fontSize: '15px' }}>
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* قسم تواصل معنا */}
                    <div>
                        <h3 style={{ color: colors.primary, marginBottom: '25px', fontSize: '18px', fontWeight: 'bold' }}>
                            {t('footer.contact_title')}
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            <a href="https://wa.me/966557480817" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '12px', color: colors.lightText, textDecoration: 'none', fontSize: '15px' }}>
                                <FaWhatsapp style={{ color: '#25D366', fontSize: '20px' }} />
                                <span dir="ltr">+966 557 480 817</span>
                            </a>
                            <a href="mailto:Moderndesign20202@gmail.com" style={{ display: 'flex', alignItems: 'center', gap: '12px', color: colors.lightText, textDecoration: 'none', fontSize: '15px' }}>
                                <FaEnvelope style={{ color: colors.primary, fontSize: '18px' }} />
                                <span>Moderndesign20202@gmail.com</span>
                            </a>
                            <a href="https://maps.app.goo.gl/dsijaAVNdtYGTHxk7" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '12px', color: colors.lightText, textDecoration: 'none', fontSize: '15px' }}>
                                <FaMapMarkerAlt style={{ color: '#ff4d4d', fontSize: '18px' }} />
                                <span>{t('footer.address')}</span>
                            </a>
                        </div>
                    </div>
                </div>

                <div style={{ height: '1px', backgroundColor: 'rgba(255,255,255,0.1)', margin: '40px 0 20px' }} />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px', fontSize: '14px', color: '#888' }}>
                    <p>{t('footer.rights')} 2026</p>
                    <p style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        {t('footer.developed_by')}
                        <span
                            onClick={handleDeveloperClick} // إضافة الحدث هنا
                            style={{
                                color: colors.primary,
                                fontWeight: 'bold',
                                margin: '0 5px',
                                cursor: 'pointer', // تغيير شكل الماوس ليوحي بإمكانية النقر
                                userSelect: 'none' // منع تحديد النص أثناء النقر السريع
                            }}
                        >
                            {t('footer.developer_name')}
                        </span>
                        <FaHeart style={{ color: '#ff4d4d', fontSize: '12px' }} />
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;