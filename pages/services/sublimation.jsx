import React, { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
    Flag, Shirt, Layers, ShieldCheck, Globe, MessageCircle,
    ArrowDownCircle, Zap, Trophy, Wind, Waves, PenTool
} from "lucide-react";

const SublimationPage = () => {
    const [lang, setLang] = useState("ar");
    const isAr = lang === "ar";
    const whatsappNumber = "966557480817";

    const { scrollYProgress } = useScroll();
    const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

    // باليت الألوان بناءً على اللون الأخضر المعتمد #51AC5F
    const colors = {
        bg: "#050a06",
        textPrimary: "#ffffff",
        textSecondary: "#cbd5e1",
        accent: "#51AC5F",
        accentSecondary: "#3d8b48"
    };

    const content = {
        ar: {
            title: "طباعة السبلميشن الاحترافية",
            subtitle: "ألوان تخترق النسيج لتدوم للأبد. دقة متناهية في طباعة الأعلام، الحواجز، والملابس الرياضية.",
            techBadge: "تقنية النقل الحراري المتقدمة",
            descriptionIntro: "ما هي طباعة السبلميشن؟",
            description: "هي تقنية تحويل الحبر من الحالة الصلبة إلى الغازية ليتغلغل داخل مسام القماش مباشرة. النتيجة؟ ألوان زاهية جداً، لا تتشقق، ولا تبهت مع الغسيل، وملمس ناعم كجزء من النسيج.",
            whyTitle: "لماذا نتميز في طباعة القماش؟",
            stepsTitle: "رحلة الإنتاج الحراري",
            whatsappBtn: "ابدأ مشروعك الآن واتساب",
            features: [
                { title: "ثبات ألوان أبدي", text: "الألوان تصبح جزءاً من خيوط القماش، مما يجعلها مقاومة للغسيل المتكرر وأشعة الشمس." },
                { title: "مساحات طباعة واسعة", text: "نطبع الأعلام العملاقة وحواجز الفعاليات (Fence Scrim) بدقة عالية وعرض يصل لأمتار." },
                { title: "خامات بريميوم", text: "نوفر أجود أنواع البوليستر والفيستات (Vests) بمقاييس جودة عالمية." }
            ],
            steps: [
                { t: "التصميم الرقمي", d: "إعداد التصميم بأعلى جودة وتعديل الألوان لتناسب طبيعة النسيج." },
                { t: "الطباعة الورقية", d: "طباعة التصميم على ورق نقل حراري خاص باستخدام أحبار سبلميشن أصلية." },
                { t: "الكبس الحراري", d: "نقل التصميم للقماش تحت ضغط وحرارة عالية لدمج الحبر مع الألياف." },
                { t: "الخياطة والتقفيل", d: "قص القماش الزائد وخياطة الحواف وتركيب الحلقات (Grommets) للأعلام." }
            ],
            galleryTitle: "نماذج من أعمال السبلميشن",
            gallery: [
                { id: 1, src: "https://i.pinimg.com/1200x/7e/08/d8/7e08d8a0e33efd044cee61fd6b0a2de5.jpg", title: "أعلام وبنرات قماشية" },
                { id: 2, src: "https://i.pinimg.com/1200x/24/b4/c8/24b4c80f94f0d7bf086c23eec2b1692d.jpg", title: "فيستات وسترات السلامة" },
                { id: 3, src: "https://i.pinimg.com/736x/60/88/dc/6088dc3b67d2114f1f9d536c6da66348.jpg", title: "تغطية حواجز الفعاليات" },
                { id: 4, src: "https://i.pinimg.com/736x/69/c3/6e/69c36e86964e999237ceea3b3a9864f3.jpg", title: "طباعة أقمشة مخصصة" },
            ]
        },
        en: {
            title: "Professional Sublimation Printing",
            subtitle: "Colors that penetrate the fabric to last forever. Perfection in flags, barriers, and apparel.",
            techBadge: "Advanced Heat Transfer Tech",
            descriptionIntro: "What is Sublimation?",
            description: "A technique that transforms ink into gas to permeate fabric pores directly. The result? Vibrant colors that won't crack or fade, with a soft-hand feel as part of the fabric itself.",
            whyTitle: "Why Our Textile Printing?",
            stepsTitle: "Production Journey",
            whatsappBtn: "Start Your Project via WhatsApp",
            features: [
                { title: "Everlasting Colors", text: "Colors become part of the yarn, making them resistant to washing and UV rays." },
                { title: "Large Format Printing", text: "We print giant flags and event barrier scrims with high precision." },
                { title: "Premium Materials", text: "We provide top-tier polyester for flags and safety vests with international standards." }
            ],
            steps: [
                { t: "Digital Design", d: "Preparing high-res designs and color matching for textile production." },
                { t: "Paper Printing", d: "Printing on special transfer paper using original sublimation inks." },
                { t: "Heat Pressing", d: "Transferring design to fabric under high pressure and heat." },
                { t: "Sewing & Finishing", d: "Cutting, hemming, and installing grommets for final products." }
            ],
            galleryTitle: "Sublimation Gallery",
            gallery: [
                { id: 1, src: "https://i.pinimg.com/1200x/7e/08/d8/7e08d8a0e33efd044cee61fd6b0a2de5.jpg", title: "Custom Flags & Banners" },
                { id: 2, src: "https://i.pinimg.com/1200x/24/b4/c8/24b4c80f94f0d7bf086c23eec2b1692d.jpg", title: "Safety Vests Printing" },
                { id: 3, src: "https://i.pinimg.com/736x/60/88/dc/6088dc3b67d2114f1f9d536c6da66348.jpg", title: "Event Barrier Scrims" },
                { id: 4, src: "https://i.pinimg.com/736x/69/c3/6e/69c36e86964e999237ceea3b3a9864f3.jpg", title: "Custom Textile Prints" },
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

            {/* خلفية متحركة */}
            <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
                <motion.div
                    animate={{ x: [0, 100, -50, 0], y: [0, -100, 50, 0], scale: [1, 1.2, 1] }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    style={{ position: "absolute", top: "-10%", left: "-10%", width: "60vw", height: "60vw", background: `radial-gradient(circle, ${colors.accent}25 0%, transparent 70%)`, filter: "blur(120px)" }}
                />
            </div>

            {/* === الهيدر (موحد مع قسم الدايكت) === */}
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

            {/* Hero Section */}
            <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: "120px 20px 0", position: "relative", zIndex: 2 }}>
                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} style={{ width: "fit-content", margin: "0 auto 25px", padding: "8px 25px", borderRadius: "30px", background: `linear-gradient(to right, ${colors.accent}25, ${colors.accentSecondary}25)`, border: `1px solid ${colors.accent}50`, display: "flex", alignItems: "center", gap: "10px", fontSize: "0.95rem", color: colors.accent, fontWeight: "bold" }}>
                    <Zap size={20} /> {t.techBadge}
                </motion.div>

                <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} style={{ fontSize: "clamp(2.2rem, 8vw, 5.5rem)", fontWeight: 900, lineHeight: 1.1, marginBottom: "25px" }}>
                    {t.title.split(' ').map((word, i) => i >= t.title.split(' ').length - 1 ? <span key={i} style={{ color: colors.accent }}>{word} </span> : word + ' ')}
                </motion.h1>

                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)", color: colors.textSecondary, maxWidth: "850px", margin: "0 auto", lineHeight: 1.6 }}>
                    {t.subtitle}
                </motion.p>

                <motion.div animate={{ y: [0, 15, 0] }} transition={{ duration: 2, repeat: Infinity }} style={{ marginTop: "60px" }}>
                    <ArrowDownCircle color={colors.accent} size={45} style={{ opacity: 0.6 }} />
                </motion.div>
            </section>

            {/* المميزات والوصف */}
            <section style={{ padding: "100px 8%", position: "relative", zIndex: 2 }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "80px" }}>
                    <motion.div initial={{ opacity: 0, x: isAr ? 40 : -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "25px" }}>
                            <Waves color={colors.accent} size={35} />
                            <h2 style={{ fontSize: "2.2rem", fontWeight: "bold", margin: 0 }}>{t.descriptionIntro}</h2>
                        </div>
                        <p style={{ lineHeight: "1.9", fontSize: "1.2rem", color: colors.textSecondary, borderRight: isAr ? `4px solid ${colors.accent}` : "none", borderLeft: isAr ? "none" : `4px solid ${colors.accent}`, padding: "0 25px", background: `linear-gradient(to ${isAr ? 'left' : 'right'}, ${colors.accent}10, transparent)` }}>
                            {t.description}
                        </p>
                    </motion.div>

                    <div>
                        <h2 style={{ fontSize: "2rem", marginBottom: "40px", display: "flex", alignItems: "center", gap: "15px" }}>
                            <Trophy color={colors.accent} size={35} /> {t.whyTitle}
                        </h2>
                        <div style={{ display: "grid", gap: "25px" }}>
                            {t.features.map((f, i) => (
                                <div key={i} style={{ background: `${colors.accent}08`, padding: "25px", borderRadius: "20px", border: `1px solid ${colors.accent}20`, display: "flex", gap: "20px" }}>
                                    <ShieldCheck color={colors.accent} size={26} style={{ minWidth: "26px" }} />
                                    <div>
                                        <h3 style={{ margin: "0 0 8px 0", color: "#fff" }}>{f.title}</h3>
                                        <p style={{ margin: 0, color: colors.textSecondary, fontSize: "0.95rem" }}>{f.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* مراحل الإنتاج (الأرقام واضحة الآن) */}
            <section style={{ padding: "120px 5%", position: "relative", zIndex: 2 }}>
                <div style={{ textAlign: "center", marginBottom: "70px" }}>
                    <Wind color={colors.accent} size={50} style={{ marginBottom: "20px" }} />
                    <h2 style={{ fontSize: "2.8rem", fontWeight: "900" }}>{t.stepsTitle}</h2>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "30px", maxWidth: "1200px", margin: "0 auto" }}>
                    {t.steps.map((step, i) => (
                        <motion.div key={i} whileHover={{ y: -10 }} style={{ padding: "45px 30px", borderRadius: "28px", background: `#0a110b`, border: `1px solid #1e2b1f`, textAlign: "center", position: "relative", overflow: "hidden" }}>
                            <div style={{ position: "absolute", top: "-15px", [isAr ? "left" : "right"]: "-15px", fontSize: "6rem", fontWeight: "900", color: "rgba(255, 255, 255, 0.05)", zIndex: 0 }}>
                                {i + 1}
                            </div>
                            <div style={{ position: "relative", zIndex: 1 }}>
                                <h3 style={{ color: colors.accent, fontSize: "1.3rem", marginBottom: "15px" }}>{step.t}</h3>
                                <p style={{ color: colors.textSecondary, fontSize: "0.95rem" }}>{step.d}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* المعرض */}
            <section style={{ padding: "100px 0", position: "relative", zIndex: 2 }}>
                <h2 style={{ textAlign: "center", fontSize: "2.5rem", marginBottom: "50px" }}>{t.galleryTitle}</h2>
                <div style={{ display: "flex", gap: "25px", overflowX: "auto", padding: "20px 5% 60px" }} className="hide-scrollbar">
                    {t.gallery.map((img) => (
                        <div key={img.id} style={{ minWidth: "320px", height: "450px", borderRadius: "35px", overflow: "hidden", position: "relative", border: `2px solid #1e2b1f` }}>
                            <img src={img.src} alt={img.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                            <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, ${colors.bg}e6, transparent 60%)` }} />
                            <div style={{ position: "absolute", bottom: "30px", width: "100%", padding: "0 25px" }}>
                                <h4 style={{ fontSize: "1.4rem", color: colors.accent, fontWeight: "bold" }}>{img.title}</h4>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section style={{ padding: "100px 20px 140px", textAlign: "center", zIndex: 2 }}>
                <motion.div style={{ maxWidth: "850px", margin: "0 auto", padding: "70px 40px", borderRadius: "40px", background: `linear-gradient(135deg, ${colors.accent}15, transparent)`, border: `1px solid ${colors.accent}30`, backdropFilter: "blur(10px)" }}>
                    <h2 style={{ fontSize: "clamp(1.8rem, 5vw, 3.2rem)", fontWeight: "900", marginBottom: "35px" }}>
                        {isAr ? "اجعل هويتك ترفرف عالياً بدقة سبلميشن" : "Let your brand fly high with Sublimation precision"}<br />
                        <span style={{ color: colors.accent }}>{isAr ? "تواصل معنا وابدأ مشروعك" : "Contact us and start your project"}</span>
                    </h2>
                    <a href={`https://wa.me/${whatsappNumber}`} target="_blank" style={{ display: "inline-flex", alignItems: "center", gap: "15px", backgroundColor: colors.accent, color: "#fff", padding: "18px 45px", borderRadius: "100px", textDecoration: "none", fontSize: "1.3rem", fontWeight: "bold", boxShadow: `0 10px 40px ${colors.accent}40` }}>
                        <MessageCircle size={30} /> {t.whatsappBtn}
                    </a>
                </motion.div>
            </section>

            {/* === الفوتر (موحد مع الحقوق المطلوبة) === */}
            <footer style={{ padding: "50px 20px", textAlign: "center", borderTop: `1px solid ${colors.accent}10`, color: colors.textSecondary, zIndex: 2, background: "#04070c" }}>
                <p style={{ opacity: 0.6, fontSize: "0.9rem", letterSpacing: "1px" }}>
                    {isAr ? "جميع الحقوق محفوظة © التصميم الحديث 2026" : "All Rights Reserved © Modern Design 2026"}
                </p>
            </footer>

            <style>{`
                .hide-scrollbar::-webkit-scrollbar { display: none; }
                .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </div>
    );
};

export default SublimationPage;