// /components/home/Home_Hero.jsx (معدّل للترجمة)

import React, { useState, useEffect, useRef } from "react";
// إضافة استيراد دالة الترجمة
import { useTranslation } from 'next-i18next';

const Home_Hero = () => {
  // تفعيل هوك الترجمة
  const { t } = useTranslation('common');
  
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const videoRef = useRef(null);

  // **استدعاء الكلمات من ملف الترجمة وتقسيمها إلى مصفوفة**
  // المفتاح المستخدم: 'hero.rotatingWords'
  const rotatingWordsString = t('hero.rotatingWords', 'إبداع, إتقان, حِرفية, تميّز, ابتكار, جودة, مرونة, سرعة, دقّة, خبرة, تفاصيل, هُوية, فكرة, قيمة, لمسة, رؤية, احتراف, أسلوب, تجربة, إلهام');
  const rotatingWords = rotatingWordsString.split(',').map(word => word.trim()); // فصل النصوص وإزالة المسافات الزائدة
  
  // إعادة تشغيل الفيديو بعد نهايته
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.onended = () => {
      v.currentTime = 0;
      v.play();
    };
  }, []);

  // دورة الكلمات
  useEffect(() => {
    // يجب التحقق من وجود كلمات بعد استدعاء الترجمة
    if (rotatingWords.length === 0) return;

    let wordCounter = 0; // عداد الكلمات الحالية في المجموعة
    let interval;

    const startCycle = () => {
      interval = setInterval(() => {
        setFade(false); // اختفاء الكلمة قبل التغيير
        setTimeout(() => {
          setIndex((prev) => (prev + 1) % rotatingWords.length);
          setFade(true);

          wordCounter++;

          if (wordCounter >= 5) {
            // نهاية المجموعة من 5 كلمات → استراحة
            clearInterval(interval);
            setFade(false); // اختفاء الكلمة خلال الاستراحة
            wordCounter = 0;

            setTimeout(startCycle, 5000); // استراحة 5 ثواني
          }
        }, 200);
      }, 1100); // سرعة التغيير بين الكلمات
    };

    startCycle();

    return () => clearInterval(interval);
  }, [rotatingWordsString]); // إضافة متغير الترجمة كـ dependency

  return (
    <section
      style={{
        position: "relative",
        height: "65vh",
        minHeight: "450px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        fontFamily: "Tajawal, sans-serif",
      }}
    >
      {/* الفيديو */}
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        poster="/images/hero-fallback.jpg"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 1,
        }}
      >
        <source src="/videos/company-video.mp4" type="video/mp4" />
      </video>

      {/* تعتيم بسيط */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(10,53,55,0.50)",
          zIndex: 2,
        }}
      />

      {/* الكلمة الكبيرة */}
      <div
        style={{
          position: "relative",
          zIndex: 3,
          height: "140px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <span
          style={{
            fontSize: "5rem",
            fontWeight: 800,
            color: "white",
            opacity: fade ? 1 : 0,
            transform: fade ? "translateY(0)" : "translateY(25px)",
            transition: "opacity 0.25s ease, transform 0.25s ease",
            lineHeight: "1.1",
          }}
        >
          {rotatingWords[index]}
        </span>
      </div>
    </section>
  );
};

export default Home_Hero;