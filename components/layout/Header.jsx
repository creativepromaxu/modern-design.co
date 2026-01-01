// components/layout/Header.jsx

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { FaFacebookF, FaInstagram, FaTiktok, FaWhatsapp, FaBars, FaTimes, FaGlobe } from 'react-icons/fa'; 

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false); 
  
  // States للتحكم بالظهور والخلفية
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true); // هل الهيدر ظاهر؟
  const [lastScrollY, setLastScrollY] = useState(0); // آخر مكان للسكرول

  const langRef = useRef(null); 
  const router = useRouter();
  const { t } = useTranslation('common');

  const switchLanguage = (newLocale) => {
    router.push(router.pathname, router.asPath, { locale: newLocale });
    setIsLangDropdownOpen(false);
    setIsMenuOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (langRef.current && !langRef.current.contains(event.target)) {
        setIsLangDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);

    // دالة التحكم في السكرول والظهور
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // 1. منطق تغيير لون الخلفية (إذا نزلنا عن 20 بكسل)
      setScrolled(currentScrollY > 20);

      // 2. منطق الإخفاء والإظهار الذكي
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // إذا كان السكرول للأسفل وتجاوزنا 100 بكسل -> اخفِ الهيدر
        setIsVisible(false);
      } else {
        // إذا كان السكرول للأعلى -> أظهر الهيدر
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]); // أضفنا lastScrollY للمصفوفة عشان يتحدث باستمرار

  const navLinks = [
    { name: t('header.home', 'الرئيسية'), href: '/' },
    { name: t('header.about', 'من نحن'), href: '/#about' },
    { name: t('header.works', 'مشاريعنا'), href: '/#works' },
    { name: t('header.services', 'خدماتنا'), href: '/#services' },
    { name: t('header.contact', 'تواصل معنا'), href: '/#contact' },
  ];

  const colors = {
    primary: '#028f7b',
    secondary: '#51ab5e',
    text: '#ffffff',
    white: '#093537',
    bgScrolled: '#093537',
  };

  const socialLinks = [
    { 
      Icon: ({ style, className }) => (
        <svg className={className} width="18" height="18" viewBox="0 0 300 271" fill="currentColor" style={style}><path d="m236 0h46l-101 115 118 156h-92.6l-72.5-94.8-83 94.8h-46l107-123-113-148h94.9l65.5 86.6zm-16.1 244h25.5l-165-218h-27.4z"/></svg>
      ), color: '#000000', url: 'https://x.com/moderndesignadv' 
    }, 
    { Icon: FaFacebookF, color: '#4267B2', url: 'https://www.facebook.com/ModernDesignAdv' },
    { Icon: FaInstagram, color: '#E1306C', url: 'https://www.instagram.com/moderndesignadv' },
    { Icon: FaTiktok, color: '#000000', url: 'https://www.tiktok.com/@moderndesignadv' },
    { Icon: FaWhatsapp, color: '#25D366', url: 'https://wa.me/966557480817' }, 
  ];

  const Logo = () => (
    <div className="logo-container">
      <img src="/logos/logo.svg" alt="Logo" onError={(e) => {e.target.style.display='none'; e.target.nextSibling.style.display='block'}} style={{ height: '40px', width: 'auto' }} />
      <h2 style={{display:'none', margin:0, color: colors.primary, fontWeight:'bold'}}>LOGO</h2>
    </div>
  );

  return (
    <>
      <style>{`
        .header-container { font-family: 'Tajawal', sans-serif; }
        .desktop-nav { display: none; }
        .desktop-tools { display: flex; align-items: center; gap: 15px; }
        
        @media (max-width: 992px) {
          .desktop-tools { display: none; }
          .mobile-toggle { display: block !important; }
        }

        @media (min-width: 992px) {
          .desktop-nav { display: flex; gap: 25px; }
          .mobile-toggle { display: none; }
        }

        .nav-link { position: relative; text-decoration: none; color: ${colors.text}; font-weight: 600; font-size: 15px; padding: 5px 0; transition: color 0.3s; }
        .nav-link:hover { color: ${colors.primary}; }
        .social-icon { color: #888; transition: all 0.3s; display: flex; align-items: center; justify-content: center; }
        .social-icon:hover { transform: translateY(-2px); }
      `}</style>

      <header 
        className="header-container" 
        style={{ 
          // 1. غيرنا sticky لـ fixed لكي يطفو فوق المحتوى ويقبل الحركة
          position: 'fixed', 
          top: 0, 
          left: 0,
          width: '100%',
          zIndex: 1000, 
          
          backgroundColor: scrolled ? colors.bgScrolled : colors.white, 
          backdropFilter: scrolled ? 'blur(10px)' : 'none', 
          height: '70px', 
          display: 'flex', 
          alignItems: 'center', 
          boxShadow: scrolled ? '0 4px 20px rgba(0,0,0,0.1)' : 'none',
          
          // 2. هنا حركة الإخفاء والإظهار السلسة
          transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
          transition: 'transform 0.3s ease-in-out, background-color 0.3s ease',
        }}
      >
        
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '3px', background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`, zIndex: 1001 }}/>

        <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          
          <Link href="/" style={{ textDecoration: 'none', zIndex: 1001 }}>
            <Logo />
          </Link>

          <nav className="desktop-nav">
            {navLinks.map((link, i) => (
              <Link key={i} href={link.href} className="nav-link">{link.name}</Link>
            ))}
          </nav>

          <div className="desktop-tools">
            <div style={{ display: 'flex', gap: '10px', paddingLeft: '15px', borderLeft: '1px solid #eee' }}>
                {socialLinks.map((item, idx) => ( 
                  <a key={idx} href={item.url} target="_blank" rel="noreferrer" className="social-icon" style={{ fontSize: '18px' }} onMouseEnter={(e) => e.currentTarget.style.color = item.color} onMouseLeave={(e) => e.currentTarget.style.color = '#888'}>
                    <item.Icon style={{ fontSize: '18px' }} /> 
                  </a>
                ))}
            </div>

            <div ref={langRef} style={{ position: 'relative' }}>
              <button onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)} style={{ background: 'transparent', border: `1px solid #eee`, borderRadius: '20px', padding: '5px 12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '14px', fontWeight: 'bold', color: colors.primary }}>
                <FaGlobe /> <span>{router.locale === 'ar' ? 'AR' : 'EN'}</span>
              </button>
              {isLangDropdownOpen && (
                <div style={{ position: 'absolute', top: '120%', right: 0, background: '#fff', boxShadow: '0 5px 15px rgba(0,0,0,0.1)', borderRadius: '8px', overflow: 'hidden', minWidth: '100px', zIndex: 1002 }}>
                  <div onClick={() => switchLanguage('ar')} style={{ padding: '10px 15px', cursor: 'pointer', fontSize: '14px', textAlign: 'center', color: '#333' }}>العربية</div>
                  <div onClick={() => switchLanguage('en')} style={{ padding: '10px 15px', cursor: 'pointer', fontSize: '14px', textAlign: 'center', color: '#333' }}>English</div>
                </div>
              )}
            </div>
          </div>

          <button className="mobile-toggle" onClick={() => setIsMenuOpen(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '24px', color: colors.text, display: 'none' }}>
            <FaBars />
          </button>

        </div>
      </header>
      
      {/* القائمة الجانبية للموبايل */}
      <div style={{ position: 'fixed', top: 0, right: isMenuOpen ? 0 : '-100%', width: '100%', maxWidth: '300px', height: '100vh', backgroundColor: colors.white, boxShadow: isMenuOpen ? '-5px 0 20px rgba(0,0,0,0.1)' : 'none', zIndex: 2000, transition: 'right 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee' }}>
            <span style={{ fontWeight: 'bold', color: colors.primary }}>{t('header.menu', 'القائمة')}</span>
            <button onClick={() => setIsMenuOpen(false)} style={{ background: 'none', border: 'none', fontSize: '22px', cursor: 'pointer', color: '#fff' }}><FaTimes /></button>
        </div>

        <div style={{ padding: '20px', overflowY: 'auto' }}>
            {navLinks.map((link, i) => (
              <Link key={i} href={link.href} onClick={() => setIsMenuOpen(false)} style={{ display: 'block', padding: '12px 0', fontSize: '16px', color: colors.text, textDecoration: 'none', fontWeight: '500', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>{link.name}</Link>
            ))}

            <div style={{ marginTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}>
                <div style={{ color: '#aaa', marginBottom: '10px', fontSize: '14px' }}>اللغة / Language</div>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button onClick={() => switchLanguage('ar')} style={{ flex:1, padding:'8px', background: router.locale === 'ar' ? colors.primary : 'transparent', border: `1px solid ${colors.primary}`, color:'#fff', borderRadius:'5px', cursor:'pointer' }}>العربية</button>
                    <button onClick={() => switchLanguage('en')} style={{ flex:1, padding:'8px', background: router.locale === 'en' ? colors.primary : 'transparent', border: `1px solid ${colors.primary}`, color:'#fff', borderRadius:'5px', cursor:'pointer' }}>English</button>
                </div>
            </div>

            <div style={{ marginTop: '30px', display: 'flex', gap: '15px', justifyContent: 'center' }}>
                {socialLinks.map((item, i) => ( <a key={i} href={item.url} style={{ color: colors.primary, fontSize: '20px' }}><item.Icon /></a> ))}
            </div>
        </div>
      </div>
      
      {isMenuOpen && <div onClick={() => setIsMenuOpen(false)} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1999 }} />}
    </>
  );
};

export default Header;