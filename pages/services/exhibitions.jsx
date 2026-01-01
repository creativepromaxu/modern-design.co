import React, { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
    Layout, Building2, Presentation, Users, Sparkles,
    MessageCircle, Globe, ArrowDownCircle, Star
} from "lucide-react";

const EventsExhibitionsPage = () => {
    const [lang, setLang] = useState("ar");
    const isAr = lang === "ar";
    const whatsappNumber = "966557480817";

    const { scrollYProgress } = useScroll();
    const scaleHero = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);
    const opacityHero = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

    const colors = {
        bg: "#020408",
        textPrimary: "#ffffff",
        textSecondary: "#94a3b8",
        accent: "#E2E8F0",
        primaryGlow: "#3b82f6",
        rainbowGradient: "linear-gradient(to right, #09907B, #51AC5F, #C23131, #F39320, #2E5BFF, #8B5CF6)"
    };

    const content = {
        ar: {
            title: "هندسة التجارب والمؤتمرات",
            subtitle: "نحن لا نبني منصات، نحن نصنع منصة لانطلاق علامتك التجارية. ندمج الخشب، الأكريليك، والإضاءة لنبني واقعاً مبهراً.",
            techBadge: "تنفيذ متكامل من المخطط إلى الواقع",
            descriptionIntro: "الرؤية الشاملة للمعارض",
            description: "نجمع بين مهارات النجارة الدقيقة، وتشكيل الأكريليك، وطباعات الـ UV الضخمة، والحروف البارزة المضيئة لنخلق 'بوث' ليس له مثيل. نهتم بأدق التفاصيل من توزيع الإضاءة وحتى جودة التشطيب النهائي.",
            servicesTitle: "حلول المعارض المتكاملة",
            whatsappBtn: "ابدأ تنظيم معرضك الآن",
            services: [
                { name: "تجهيز البوثات (Booths)", desc: "تصميم وتنفيذ منصات العرض المخصصة (Custom Made) بأحدث الخامات.", icon: <Building2 /> },
                { name: "تنظيم المؤتمرات", desc: "إعداد المسارح، شاشات العرض، وأنظمة الصوت والإضاءة المتكاملة.", icon: <Presentation /> },
                { name: "منصات الفعاليات", desc: "بناء مناطق الاستقبال والتفاعل بطرق مبتكرة.", icon: <Users /> }
            ],
            materials: [
                { t: "أعمال الخشب", d: "هياكل متينة وتشطيبات احترافية.", color: "#F39320" },
                { t: "الأكريليك والزجاج", d: "لمسات عصرية وواجهات شفافة.", color: "#06b6d4" },
                { t: "أنظمة الإضاءة", d: "توزيع ضوئي يبرز جمال المعروضات.", color: "#FFD700" },
                { t: "الطباعة الشاملة", d: "تغطية الجدران بأعلى دقة.", color: "#51AC5F" }
            ]
        },
        en: {
            title: "Engineering Experiences & Conferences",
            subtitle: "We don't just build booths; we create a launchpad for your brand. Integrating wood, acrylic, and lighting into a stunning reality.",
            techBadge: "Blueprint to Reality Solutions",
            descriptionIntro: "A Holistic Vision",
            description: "We combine precision carpentry, acrylic shaping, massive UV prints, and illuminated letters to create an unparalleled booth. Every detail matters.",
            servicesTitle: "Integrated Solutions",
            whatsappBtn: "Start Your Event Now",
            services: [
                { name: "Custom Booths", desc: "Designing and executing custom-made exhibition platforms.", icon: <Building2 /> },
                { name: "Conferences", desc: "Stages, screens, and integrated sound & lighting systems.", icon: <Presentation /> },
                { name: "Activations", desc: "Building interaction zones in innovative ways.", icon: <Users /> }
            ],
            materials: [
                { t: "Woodwork", d: "Solid structures and professional finishes.", color: "#F39320" },
                { t: "Acrylic", d: "Modern touches and transparent displays.", color: "#06b6d4" },
                { t: "Lighting", d: "High-end distribution for aesthetics.", color: "#FFD700" },
                { t: "Printing", d: "High-precision wall coverings.", color: "#51AC5F" }
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

            {/* Background Lighting */}
            <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
                <motion.div
                    animate={{ x: ["-10%", "10%"], opacity: [0.1, 0.15, 0.1] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    style={{ position: "absolute", top: 0, left: "20%", width: "60vw", height: "100vh", background: `conic-gradient(from 180deg at 50% 0%, ${colors.primaryGlow}30, transparent)`, filter: "blur(80px)" }}
                />
            </div>

            {/* Navigation - Responsive Logo */}
            <nav style={{ position: "fixed", width: "100%", padding: "12px 5%", display: "flex", justifyContent: "space-between", alignItems: "center", zIndex: 100, borderBottom: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(20px)", background: "rgba(2,4,8,0.85)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <img src="/logos/logo.svg" alt="Logo" style={{ height: "35px" }} onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block' }} />
                    <span style={{ display: 'none', fontSize: "1.1rem", fontWeight: "900", color: "#fff" }}>MODERN DESIGN</span>
                </div>
                <button onClick={() => setLang(isAr ? "en" : "ar")} style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.5)", color: "#fff", padding: "6px 15px", borderRadius: "30px", cursor: "pointer", fontWeight: "bold", fontSize: "0.8rem" }}>
                    {isAr ? "English" : "عربي"}
                </button>
            </nav>

            {/* Hero Section - Mobile Optimized Typography */}
            <motion.section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: "120px 20px 60px", position: "relative", zIndex: 2, scale: scaleHero, opacity: opacityHero }}>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ padding: "8px 20px", borderRadius: "50px", border: "1px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.05)", marginBottom: "25px", fontSize: "0.8rem", fontWeight: "bold", display: "flex", alignItems: "center", gap: "8px" }}>
                    <Star size={14} fill="white" /> {t.techBadge}
                </motion.div>

                <h1 style={{ fontSize: "clamp(2.2rem, 8vw, 6.5rem)", fontWeight: 900, lineHeight: 1.1, marginBottom: "25px", letterSpacing: "-1px", maxWidth: "1200px" }}>
                    {t.title}
                </h1>

                <p style={{ fontSize: "clamp(1rem, 2.2vw, 1.6rem)", color: colors.textSecondary, maxWidth: "850px", lineHeight: 1.6, padding: "0 10px" }}>
                    {t.subtitle}
                </p>

                <div style={{ marginTop: "40px" }}>
                    <ArrowDownCircle size={40} style={{ opacity: 0.4 }} />
                </div>
            </motion.section>

            {/* Services Grid - Fixed for Mobile */}
            <section style={{ padding: "80px 5%", position: "relative", zIndex: 2 }}>
                <h2 style={{ textAlign: "center", fontSize: "clamp(2rem, 5vw, 3.5rem)", marginBottom: "60px", fontWeight: "900" }}>{t.servicesTitle}</h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: "25px" }}>
                    {t.services.map((s, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -10 }}
                            style={{
                                padding: "40px 30px", background: "rgba(255,255,255,0.03)",
                                borderRadius: "30px", border: "1px solid rgba(255,255,255,0.1)",
                                transition: "0.3s"
                            }}
                        >
                            <div style={{ background: colors.rainbowGradient, width: "50px", height: "50px", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "25px" }}>
                                {React.cloneElement(s.icon, { size: 24, color: "#fff" })}
                            </div>
                            <h3 style={{ fontSize: "1.5rem", marginBottom: "15px" }}>{s.name}</h3>
                            <p style={{ color: colors.textSecondary, fontSize: "1rem", lineHeight: 1.6 }}>{s.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Integration Section - Mobile Layout Adjusted */}
            <section style={{ padding: "80px 8%", background: "#05070a", borderRadius: "60px 60px 0 0", position: "relative", zIndex: 2 }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))", gap: "60px", alignItems: "center" }}>
                    <div>
                        <h2 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: "900", marginBottom: "25px" }}>{t.descriptionIntro}</h2>
                        <p style={{ fontSize: "1.1rem", lineHeight: "1.8", color: colors.textSecondary }}>{t.description}</p>

                        <div style={{ marginTop: "35px", display: "grid", gap: "18px" }}>
                            {t.materials.map((m, i) => (
                                <div key={i} style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                                    <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: m.color, flexShrink: 0 }} />
                                    <div>
                                        <h4 style={{ margin: 0, fontSize: "1.1rem" }}>{m.t}</h4>
                                        <p style={{ margin: 0, color: colors.textSecondary, fontSize: "0.85rem" }}>{m.d}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={{ position: "relative", width: "100%" }}>
                        <div style={{
                            width: "100%", height: "clamp(300px, 50vh, 450px)", background: "linear-gradient(45deg, #1e293b, #020408)",
                            borderRadius: "35px", border: "1px solid rgba(255,255,255,0.1)",
                            overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center"
                        }}>
                            <Layout size={100} color="white" style={{ opacity: 0.1 }} />
                            <div style={{ position: "absolute", bottom: "30px", left: "30px", right: "30px" }}>
                                <div style={{ height: "3px", width: "100%", background: colors.rainbowGradient, borderRadius: "2px" }} />
                                <p style={{ marginTop: "12px", fontWeight: "bold", letterSpacing: "1px", fontSize: "0.8rem" }}>INTEGRATED PRODUCTION</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section - Responsive Padding & Font */}
            <section style={{ padding: "100px 20px", textAlign: "center", position: "relative", zIndex: 2 }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    style={{
                        maxWidth: "1000px", margin: "0 auto", padding: "80px 30px",
                        borderRadius: "50px", background: "rgba(255,255,255,0.02)",
                        border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(20px)"
                    }}
                >
                    <h2 style={{ fontSize: "clamp(1.8rem, 6vw, 3.8rem)", fontWeight: 900, marginBottom: "30px", lineHeight: 1.2 }}>
                        {isAr ? "اصنع الحدث.. ولا تكن مجرد مشارك" : "Create the event.. don't just participate"}
                    </h2>
                    <p style={{ fontSize: "clamp(1rem, 2vw, 1.4rem)", color: colors.textSecondary, marginBottom: "40px" }}>
                        {isAr ? "نحن نجمع كل إمكانياتنا لنبني لك حضوراً لا يُنسى." : "Building your unforgettable presence."}
                    </p>
                    <a
                        href={`https://wa.me/${whatsappNumber}`}
                        target="_blank"
                        style={{
                            display: "inline-flex", alignItems: "center", gap: "12px",
                            padding: "18px 40px", background: "#fff", color: "#000",
                            borderRadius: "100px", textDecoration: "none", fontWeight: "900",
                            fontSize: "clamp(1rem, 2vw, 1.3rem)", boxShadow: "0 15px 40px rgba(255,255,255,0.15)"
                        }}
                    >
                        <MessageCircle size={24} /> {t.whatsappBtn}
                    </a>
                </motion.div>
            </section>

            {/* Footer */}
            <footer style={{ padding: "60px 5%", textAlign: "center", borderTop: "1px solid rgba(255,255,255,0.05)", background: "#010204", position: "relative", zIndex: 2 }}>
                <div style={{ marginBottom: "30px", display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "15px", opacity: 0.4 }}>
                    {["DIECUT", "LASER", "UV FLAT", "OFFSET", "3D LETTERS"].map(tag => (
                        <span key={tag} style={{ fontSize: "0.6rem", letterSpacing: "1.5px" }}>{tag}</span>
                    ))}
                </div>
                <img src="/logos/logo.svg" alt="Footer Logo" style={{ height: "35px", marginBottom: "20px", opacity: 0.7 }} />
                <p style={{ opacity: 0.4, fontSize: "0.8rem" }}>
                    {isAr ? "جميع الحقوق محفوظة © التصميم الحديث 2026" : "All Rights Reserved © Modern Design 2026"}
                </p>
            </footer>
        </div>
    );
};

export default EventsExhibitionsPage;