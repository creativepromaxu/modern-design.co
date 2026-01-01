import React, { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Scissors, PenTool, Layers, ShieldCheck, Globe, MessageCircle, ArrowDownCircle, Cpu, Award } from "lucide-react";

const DieCutPage = () => {
    const [lang, setLang] = useState("ar");
    const isAr = lang === "ar";
    const whatsappNumber = "966557480817"; // رقمك

    // إعدادات التمرير والبارالاكس
    const { scrollYProgress } = useScroll();
    const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
    const rotateBg = useTransform(scrollYProgress, [0, 1], [0, 45]);

    // باليت الألوان الجديدة (باستخدام لونك المميز)
    const colors = {
        bg: "#050a0f", // خلفية داكنة جداً تميل للأزرق البترولي لتبرز لونك
        textPrimary: "#ffffff",
        textSecondary: "#cbd5e1",
        accent: "#09907B", // لونك المميز (Teal)
        accentSecondary: "#0ea5e9" // لون أزرق سماوي ثانوي للإضاءة المكملة
    };

    const content = {
        ar: {
            title: "ملصقات الدايكت الاحترافية",
            subtitle: "دقة قص متناهية تتبع حدود إبداعك، مدعومة بأقوى المكائن اليابانية.",
            techBadge: "Mimaki & Roland دقة مكائن",
            descriptionIntro: "ما هو قص الدايكت (Die-Cut)؟",
            description: "هو فن القص الدقيق حول حواف التصميم مباشرة، مهما كان شكله معقداً، بدون خلفية مربعة أو بيضاء. يمنح شعارك مظهراً احترافياً كأنه جزء من السطح الذي يلصق عليه.",
            whyTitle: "لماذا ملصقاتنا هي الأفضل؟",
            stepsTitle: "مراحل الإنتاج الدقيق",
            whatsappBtn: "ابدأ مشروعك الآن واتساب",
            features: [
                { title: "دقة ميمـاكي ورولاند", text: "حواف ليزرية فائقة النعومة حتى في الزوايا الحادة والمعقدة." },
                { title: "حرية الأشكال المطلقة", text: "لا حدود للإبداع، أي شكل هندسي أو حر يمكننا قصه بدقة." },
                { title: "مقاومة فائقة", text: "فينيل بريميوم مع طبقة حماية (Lamination) ضد الماء والشمس والخدوش." }
            ],
            steps: [
                { t: "رسم مسار القص", d: "تحديد خطوط الكنتور (Cut Contour) بدقة ميكرونية حول تصميمك." },
                { t: "الطباعة عالية الدقة", d: "طباعة بألوان زاهية ومشبعة باستخدام أحبار أصلية مقاومة." },
                { t: "القص الآلي الدقيق", d: "مكائن Mimaki/Roland تقرأ علامات القص وتنفذ القطع ببراعة." },
                { t: "التفريع والتجهيز", d: "إزالة الزوائد يدوياً وإضافة ورق النقل (Transfer Tape) إذا لزم الأمر." }
            ],
            galleryTitle: "نماذج من أعمال الدايكت",
            gallery: [
                { id: 1, src: "https://i.pinimg.com/1200x/06/d1/fc/06d1fcede6eb9d02d842a8d680f428d9.jpg", title: "ملصقات لابتوب مخصصة" },
                { id: 2, src: "https://i.pinimg.com/1200x/bc/6d/34/bc6d344e1962c27d72ee9707b6bd556f.jpg", title: "أشكال معقدة ودقيقة" },
                { id: 3, src: "https://i.pinimg.com/736x/d5/6e/ab/d56eabe307e1b67693d2adb62b064f7e.jpg", title: "تطبيق على الأسطح المختلفة" },
                { id: 4, src: "https://i.pinimg.com/736x/aa/cb/5a/aacb5a7b165c29f848dfc8ba047990c5.jpg", title: "تشطيب لامع أو مطفي" },
            ]
        },
        en: {
            title: "Professional Die-Cut Stickers",
            subtitle: "Ultimate precision cutting that follows your creative contours, powered by Japanese engineering.",
            techBadge: "Mimaki & Roland Precision",
            descriptionIntro: "What is Die-Cut?",
            description: "It's the art of precise cutting directly around your design's edge, no matter how complex, without a square background. It gives your logo a professional look, as if it belongs on the surface.",
            whyTitle: "Why Our Stickers Are Superior?",
            stepsTitle: "Precision Production Process",
            whatsappBtn: "Start Your Project via WhatsApp",
            features: [
                { title: "Mimaki & Roland Accuracy", text: "Ultra-smooth laser-like edges even on sharp corners and complex details." },
                { title: "Absolute Shape Freedom", text: "No limits to creativity. Any geometric or freeform shape can be precisely cut." },
                { title: "Extreme Durability", text: "Premium vinyl with lamination layer resistant to water, sun, and scratches." },
            ],
            steps: [
                { t: "Cut Path Creation", d: "Defining micron-precise Contour Cut lines around your design." },
                { t: "High-Res Printing", d: "Printing with vibrant, saturated colors using original durable inks." },
                { t: "Automated Precision Cut", d: "Mimaki/Roland machines read crop marks and execute the cut flawlessly." },
                { t: "Weeding & Finishing", d: "Manual removal of excess vinyl and applying transfer tape if needed." }
            ],
            galleryTitle: "Examples of die-cutting work",
            gallery: [
                { id: 1, src: "https://i.pinimg.com/1200x/06/d1/fc/06d1fcede6eb9d02d842a8d680f428d9.jpg", title: "Custom Laptop Stickers" },
                { id: 2, src: "https://i.pinimg.com/1200x/bc/6d/34/bc6d344e1962c27d72ee9707b6bd556f.jpg", title: "Intricate & Complex Shapes" },
                { id: 3, src: "https://i.pinimg.com/736x/d5/6e/ab/d56eabe307e1b67693d2adb62b064f7e.jpg", title: "Application on Various Surfaces" },
                { id: 4, src: "https://i.pinimg.com/736x/aa/cb/5a/aacb5a7b165c29f848dfc8ba047990c5.jpg", title: "Glossy or Matte Finish" },
            ]
        }
    };

    const t = content[lang];

    return (
        <div style={{
            backgroundColor: colors.bg, color: colors.textPrimary,
            fontFamily: isAr ? "'Tajawal', sans-serif" : "'Inter', sans-serif",
            direction: isAr ? "rtl" : "ltr", minHeight: "100vh", overflowX: "hidden", position: "relative"
        }}>

            {/* === 1. الخلفية المتحركة (تم تعديل الألوان لتناسب لونك الجديد) === */}
            <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
                {/* بقعة اللون الأساسي */}
                <motion.div
                    animate={{ x: [0, 100, -50, 0], y: [0, -100, 50, 0], scale: [1, 1.2, 0.9, 1], rotate: [0, 90, 180, 0] }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    style={{ position: "absolute", top: "-20%", left: "-10%", width: "60vw", height: "60vw", background: `radial-gradient(circle, ${colors.accent}45 0%, transparent 65%)`, filter: "blur(130px)", opacity: 0.7 }}
                />
                {/* بقعة إضاءة ثانوية زرقاء */}
                <motion.div
                    animate={{ x: [0, -150, 50, 0], y: [0, 120, -60, 0], scale: [1, 1.1, 0.8, 1] }}
                    transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
                    style={{ position: "absolute", bottom: "-20%", right: "-10%", width: "70vw", height: "70vw", background: `radial-gradient(circle, ${colors.accentSecondary}35 0%, transparent 70%)`, filter: "blur(150px)", opacity: 0.5 }}
                />
                {/* عناصر جرافيك في الخلفية توحي بالقص */}
                <svg style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", opacity: 0.05 }} xmlns="http://www.w3.org/2000/svg">
                    <pattern id="pattern" width="100" height="100" patternUnits="userSpaceOnUse">
                        <path d="M10 10 L90 90 M90 10 L10 90" stroke={colors.textPrimary} strokeWidth="0.5" fill="none" />
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#pattern)" />
                </svg>
            </div>

            {/* === 2. الهيدر === */}
            <nav style={{ position: "fixed", width: "100%", padding: "12px 5%", display: "flex", justifyContent: "space-between", alignItems: "center", zIndex: 100, borderBottom: `1px solid ${colors.accent}20`, backdropFilter: "blur(15px)", background: `${colors.bg}90` }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <img
                        src="/logos/logo.svg"
                        alt="Logo"
                        style={{ height: "40px", width: "auto", objectFit: "contain" }}
                        onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block' }}
                    />
                    <span style={{ display: 'none', fontSize: "1.2rem", fontWeight: "900", letterSpacing: "1px", color: colors.accent }}>MODERN DESIGN</span>
                </div>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setLang(isAr ? "en" : "ar")}
                    style={{ background: `${colors.accent}15`, border: `1px solid ${colors.accent}40`, color: colors.textPrimary, padding: "8px 18px", borderRadius: "30px", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", fontWeight: "bold", fontSize: "0.9rem" }}
                >
                    <Globe size={16} /> {isAr ? "English" : "عربي"}
                </motion.button>
            </nav>

            {/* === 3. Hero Section (Parallax) === */}
            <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: "120px 20px 0", position: "relative" }}>
                <motion.div style={{ y: yBg, zIndex: 2, maxWidth: "1000px" }}>
                    {/* بادج التقنية */}
                    <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} style={{ width: "fit-content", margin: "0 auto 25px", padding: "8px 25px", borderRadius: "30px", background: `linear-gradient(to right, ${colors.accent}25, ${colors.accentSecondary}25)`, border: `1px solid ${colors.accent}50`, display: "flex", alignItems: "center", gap: "10px", fontSize: "0.95rem", color: colors.accent, fontWeight: "bold", letterSpacing: "0.5px" }}>
                        <Cpu size={20} /> {t.techBadge}
                    </motion.div>

                    <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} style={{ fontSize: "clamp(2.2rem, 8vw, 5.5rem)", fontWeight: 900, lineHeight: 1.1, marginBottom: "25px" }}>
                        {t.title.split(' ').map((word, i) => i >= t.title.split(' ').length - 2 ? <span key={i} style={{ color: colors.accent }}>{word} </span> : word + ' ')}
                    </motion.h1>

                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)", color: colors.textSecondary, maxWidth: "800px", margin: "0 auto", lineHeight: 1.6 }}>
                        {t.subtitle}
                    </motion.p>

                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} style={{ marginTop: "60px" }}>
                        <ArrowDownCircle color={colors.accent} size={45} style={{ animation: "bounce 2s infinite", opacity: 0.6 }} />
                    </motion.div>
                </motion.div>
                <style>{`@keyframes bounce { 0%, 20%, 50%, 80%, 100% {transform: translateY(0);} 40% {transform: translateY(-15px);} 60% {transform: translateY(-8px);} }`}</style>
            </section>

            {/* === 4. Description & Why Us === */}
            <section style={{ padding: "100px 8%", position: "relative", zIndex: 2 }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "80px", alignItems: "start" }}>
                    <motion.div initial={{ opacity: 0, x: isAr ? 40 : -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "25px" }}>
                            <PenTool color={colors.accent} size={35} />
                            <h2 style={{ fontSize: "2.2rem", fontWeight: "bold", margin: 0 }}>{t.descriptionIntro}</h2>
                        </div>
                        <p style={{ lineHeight: "1.9", fontSize: "1.2rem", color: colors.textSecondary, borderRight: isAr ? `4px solid ${colors.accent}` : "none", borderLeft: isAr ? "none" : `4px solid ${colors.accent}`, padding: "0 25px", background: `linear-gradient(to ${isAr ? 'left' : 'right'}, ${colors.accent}10, transparent)` }}>
                            {t.description}
                        </p>
                    </motion.div>

                    <div>
                        <h2 style={{ fontSize: "2rem", marginBottom: "40px", display: "flex", alignItems: "center", gap: "15px" }}>
                            <Award color={colors.accent} size={35} /> {t.whyTitle}
                        </h2>
                        <div style={{ display: "grid", gap: "25px" }}>
                            {t.features.map((f, i) => (
                                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }} style={{ background: `${colors.accent}08`, padding: "25px", borderRadius: "20px", border: `1px solid ${colors.accent}20`, display: "flex", gap: "20px", alignItems: "start" }}>
                                    <ShieldCheck color={colors.accent} size={26} style={{ minWidth: "26px", marginTop: "4px" }} />
                                    <div>
                                        <h3 style={{ margin: "0 0 8px 0", fontSize: "1.2rem", color: "#fff" }}>{f.title}</h3>
                                        <p style={{ margin: 0, color: colors.textSecondary, fontSize: "1rem", lineHeight: 1.5 }}>{f.text}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* === 5. Steps Section (مع تعديل الأيقونات) === */}
            <section style={{ padding: "120px 5%", position: "relative", zIndex: 2 }}>
                <div style={{ textAlign: "center", marginBottom: "70px" }}>
                    <Scissors color={colors.accent} size={50} style={{ marginBottom: "20px", transform: "rotate(-45deg)" }} />
                    <h2 style={{ fontSize: "2.8rem", fontWeight: "900" }}>{t.stepsTitle}</h2>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "30px", maxWidth: "1200px", margin: "0 auto" }}>
                    {t.steps.map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30, rotate: -5 }}
                            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                            whileHover={{ y: -10, borderColor: colors.accent, backgroundColor: `${colors.accent}05` }}
                            transition={{ delay: i * 0.1, type: "spring", stiffness: 100 }}
                            viewport={{ once: true }}
                            style={{ padding: "45px 30px", borderRadius: "28px", background: `linear-gradient(145deg, #0a101a, #06090f)`, border: `1px solid #1e293b`, textAlign: "center", position: "relative", overflow: "hidden", transition: "all 0.3s" }}
                        >
                            <div style={{ position: "absolute", top: "-15px", [isAr ? "left" : "right"]: "-15px", fontSize: "6rem", fontWeight: "900", WebkitTextStroke: `2px ${colors.accent}30`, color: "transparent", zIndex: 0 }}>{i + 1}</div>
                            <div style={{ position: "relative", zIndex: 1 }}>
                                <h3 style={{ color: colors.accent, fontSize: "1.3rem", marginBottom: "15px" }}>{step.t}</h3>
                                <p style={{ color: colors.textSecondary, lineHeight: "1.6", fontSize: "0.95rem" }}>{step.d}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* === 6. Gallery Section === */}
            <section style={{ padding: "100px 0", position: "relative", zIndex: 2 }}>
                <h2 style={{ textAlign: "center", fontSize: "2.5rem", marginBottom: "50px" }}>{t.galleryTitle}</h2>
                <div style={{ display: "flex", gap: "25px", overflowX: "auto", padding: "20px 5% 60px", scrollbarWidth: "none" }} className="hide-scrollbar">
                    {t.gallery.map((img) => (
                        <motion.div
                            key={img.id}
                            whileHover={{ scale: 1.02, rotate: isAr ? -1 : 1 }}
                            style={{ minWidth: "320px", height: "480px", borderRadius: "35px", overflow: "hidden", position: "relative", boxShadow: `0 25px 50px rgba(0,0,0,0.5)`, border: `2px solid ${colors.bg}` }}
                        >
                            <img src={img.src} alt={img.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                            {/* تدرج لوني فوق الصورة بنفس لونك المميز */}
                            <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, ${colors.bg}e6, transparent 60%)`, zIndex: 1 }} />
                            <div style={{ position: "absolute", bottom: 0, width: "100%", padding: "40px 25px 30px", zIndex: 2 }}>
                                <h4 style={{ fontSize: "1.4rem", margin: 0, color: colors.accent, fontWeight: "bold" }}>{img.title}</h4>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* === 7. CTA WhatsApp === */}
            <section style={{ padding: "100px 20px 140px", textAlign: "center", position: "relative", zIndex: 2 }}>
                <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} style={{ maxWidth: "850px", margin: "0 auto", padding: "70px 40px", borderRadius: "40px", background: `linear-gradient(135deg, ${colors.accent}15, ${colors.accentSecondary}15)`, border: `1px solid ${colors.accent}30`, backdropFilter: "blur(10px)" }}>
                    <h2 style={{ fontSize: "clamp(1.8rem, 5vw, 3.2rem)", fontWeight: "900", marginBottom: "35px", lineHeight: 1.2 }}>
                        {isAr ? "جاهز لقص تصاميمك بدقة ليزرية؟" : "Ready for laser-precise die-cut stickers?"}<br />
                        <span style={{ color: colors.accent }}>{isAr ? "تواصل معنا وابدأ مشروعك" : "Contact us and start your project"}</span>
                    </h2>
                    <motion.a
                        href={`https://wa.me/${whatsappNumber}`}
                        target="_blank"
                        whileHover={{ scale: 1.05, background: colors.accent, color: "#fff", boxShadow: `0 10px 40px ${colors.accent}60`, borderColor: colors.accent }}
                        whileTap={{ scale: 0.98 }}
                        style={{
                            display: "inline-flex", alignItems: "center", gap: "15px",
                            backgroundColor: "transparent", color: colors.accent, padding: "18px 45px",
                            borderRadius: "100px", textDecoration: "none", fontSize: "1.3rem", fontWeight: "bold",
                            border: `2px solid ${colors.accent}`, transition: "0.3s all"
                        }}
                    >
                        <MessageCircle size={30} /> {t.whatsappBtn}
                    </motion.a>
                </motion.div>
            </section>

            {/* الفوتر */}
            <footer style={{ padding: "50px 20px", textAlign: "center", borderTop: `1px solid ${colors.accent}10`, color: colors.textSecondary, position: "relative", zIndex: 2, background: "#04070c" }}>
                <p style={{ opacity: 0.6, fontSize: "0.9rem", letterSpacing: "1px" }}>
                    {isAr ? "جميع الحقوق محفوظة © التصميم الحديث 2026" : "All Rights Reserved © Modern Design 2026"}
                </p>
            </footer>

            {/* إخفاء شريط التمرير */}
            <style jsx global>{`
                .hide-scrollbar::-webkit-scrollbar { display: none; }
                .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </div>
    );
};

export default DieCutPage;