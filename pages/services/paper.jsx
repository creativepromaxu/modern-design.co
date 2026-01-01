import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    Files, Scroll, Contact2, BookOpen, Layers,
    MessageCircle, Globe, ArrowDownCircle,
    Palette, Sparkles, Zap, Printer
} from "lucide-react";

const DigitalPaperPage = () => {
    const [lang, setLang] = useState("ar");
    const isAr = lang === "ar";
    const whatsappNumber = "966557480817";

    // باليت الألوان الممزوجة من الأقسام السابقة
    const colors = {
        bg: "#ffffff",
        textPrimary: "#1e293b",
        textSecondary: "#64748b",
        // تدرج يجمع كل هويات الأقسام السابقة
        rainbow: "linear-gradient(45deg, #09907B, #51AC5F, #C23131, #F39320, #2E5BFF, #8B5CF6)",
        teal: "#09907B",
        blue: "#2E5BFF",
        purple: "#8B5CF6"
    };

    const content = {
        ar: {
            title: "المطبوعات الورقية الرقمية",
            subtitle: "سرعة الديجيتال تلتقي بفخامة الورق. طباعة فورية للبروشورات، الكروت، والكتيبات بأرقى أنواع الورق العالمي.",
            techBadge: "طباعة ليزرية 2400 DPI",
            descriptionIntro: "لمسة الورق الفاخرة",
            description: "في عالم الديجيتال، يظل الورق هو السفير الأول لهويتك. نحن نوفر لك أحدث مكائن الطباعة الرقمية التي تضمن ألواناً حية ودقة متناهية، مع تشكيلة واسعة من الورق الفاخر الذي يخاطب الحواس.",
            papersTitle: "مكتبة الورق الفاخر",
            stepsTitle: "من الشاشة إلى يدك",
            whatsappBtn: "ابدأ طباعة مشروعك الآن",
            papers: [
                { name: "كوشيه (Couché)", desc: "لامع أو مطفي، الخيار المثالي للبروشورات والمجلات.", color: "#09907B" },
                { name: "انفركوت (Invercote)", desc: "ورق صلب ومتين، رائع لعلب المنتجات والكروت الفاخرة.", color: "#C23131" },
                { name: "آيس جولد وسيلفر", desc: "ورق لؤلؤي بلمعة ذهبية أو فضية تضفي لمسة ملكية.", color: "#F39320" },
                { name: "ورق مقمش (Textured)", desc: "بملمس بارز كالقماش، مخصص لكروت الشخصيات الهامة.", color: "#8B5CF6" },
                { name: "برستول (Bristol)", desc: "أبيض ناصع وسطح ناعم جداً للرسم والطباعة الدقيقة.", color: "#2E5BFF" }
            ],
            services: [
                { name: "كروت شخصية", icon: <Contact2 /> },
                { name: "بروشورات وفلايرات", icon: <Files /> },
                { name: "كتيبات ومنيو", icon: <BookOpen /> }
            ]
        },
        en: {
            title: "Digital Paper Printing",
            subtitle: "Digital speed meets paper luxury. Instant printing for brochures, cards, and booklets on premium global papers.",
            techBadge: "2400 DPI Laser Printing",
            descriptionIntro: "The Luxury Touch of Paper",
            description: "In a digital world, paper remains the first ambassador of your brand. We provide the latest digital printing machines for vivid colors and high precision on high-end papers.",
            papersTitle: "Premium Paper Library",
            stepsTitle: "From Screen to Hand",
            whatsappBtn: "Start Printing Now",
            papers: [
                { name: "Couché", desc: "Glossy or matte, the perfect choice for brochures.", color: "#09907B" },
                { name: "Invercote", desc: "Rigid and durable, great for product boxes and cards.", color: "#C23131" },
                { name: "Ice Gold & Silver", desc: "Pearlescent paper with gold or silver metallic sheen.", color: "#F39320" },
                { name: "Textured", desc: "Canvas-like feel, dedicated to VIP business cards.", color: "#8B5CF6" },
                { name: "Bristol", desc: "Bright white with a very smooth surface for fine prints.", color: "#2E5BFF" }
            ],
            services: [
                { name: "Business Cards", icon: <Contact2 /> },
                { name: "Brochures & Flyers", icon: <Files /> },
                { name: "Booklets & Menus", icon: <BookOpen /> }
            ]
        }
    };

    const t = content[lang];

    return (
        <div style={{
            backgroundColor: colors.bg, color: colors.textPrimary,
            fontFamily: isAr ? "'Tajawal', sans-serif" : "'Inter', sans-serif",
            direction: isAr ? "rtl" : "ltr", minHeight: "100vh", overflowX: "hidden"
        }}>

            {/* خط ملون علوي يمزج كل الألوان السابقة */}
            <div style={{ height: "6px", width: "100%", background: colors.rainbow, position: "fixed", top: 0, zIndex: 1001 }} />

            {/* === الهيدر (متكيف مع الخلفية البيضاء) === */}
            <nav style={{ position: "fixed", width: "100%", padding: "12px 5%", display: "flex", justifyContent: "space-between", alignItems: "center", zIndex: 100, borderBottom: "1px solid #e2e8f0", backdropFilter: "blur(15px)", background: "rgba(255, 255, 255, 0.8)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <img src="/logos/logo.svg" alt="Logo" style={{ height: "40px" }} onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block' }} />
                    <span style={{ display: 'none', fontSize: "1.2rem", fontWeight: "900", color: "#1e293b" }}>MODERN DESIGN</span>
                </div>
                <button onClick={() => setLang(isAr ? "en" : "ar")} style={{ background: "#f1f5f9", border: "1px solid #cbd5e1", color: "#1e293b", padding: "8px 20px", borderRadius: "30px", cursor: "pointer", fontWeight: "bold" }}>
                    <Globe size={16} inline style={{ margin: "0 5px", verticalAlign: "middle" }} /> {isAr ? "English" : "عربي"}
                </button>
            </nav>

            {/* Hero Section */}
            <section style={{ height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: "0 20px", background: "radial-gradient(circle at center, #f8fafc 0%, #ffffff 100%)" }}>
                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} style={{ padding: "8px 25px", borderRadius: "50px", background: "#ffffff", border: "1px solid #e2e8f0", color: colors.teal, fontWeight: "bold", marginBottom: "30px", boxShadow: "0 10px 20px rgba(0,0,0,0.05)" }}>
                    <Zap size={18} inline style={{ verticalAlign: "middle", margin: "0 8px" }} /> {t.techBadge}
                </motion.div>

                <h1 style={{ fontSize: "clamp(2.5rem, 8vw, 5.5rem)", fontWeight: 900, color: "#0f172a", marginBottom: "25px", lineHeight: 1.1 }}>
                    {t.title}
                </h1>

                <p style={{ fontSize: "clamp(1.1rem, 2vw, 1.4rem)", color: colors.textSecondary, maxWidth: "850px", lineHeight: 1.7, marginBottom: "40px" }}>
                    {t.subtitle}
                </p>

                <div style={{ display: "flex", gap: "15px", flexWrap: "wrap", justifyContent: "center" }}>
                    {t.services.map((s, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px", background: "#f8fafc", padding: "10px 20px", borderRadius: "15px", border: "1px solid #e2e8f0", fontSize: "0.9rem", fontWeight: "bold" }}>
                            {s.icon} {s.name}
                        </div>
                    ))}
                </div>
            </section>

            {/* وصف الورق - بطاقات مكدسة */}
            <section style={{ padding: "100px 8%", background: "#f8fafc" }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "50px", alignItems: "center" }}>
                    <div>
                        <h2 style={{ fontSize: "2.8rem", fontWeight: "900", marginBottom: "25px" }}>{t.descriptionIntro}</h2>
                        <p style={{ fontSize: "1.2rem", lineHeight: 1.8, color: colors.textSecondary }}>{t.description}</p>
                    </div>
                    <div style={{ position: "relative", height: "300px" }}>
                        {/* شكل جمالي يمثل طبقات الورق */}
                        {[1, 2, 3].map(i => (
                            <motion.div
                                key={i}
                                style={{
                                    position: "absolute", inset: 0, background: "#fff",
                                    borderRadius: "20px", border: "1px solid #e2e8f0",
                                    boxShadow: `0 ${i * 10}px 30px rgba(0,0,0,0.03)`,
                                    transform: `rotate(${i * 3}deg) translate(${i * 10}px, ${i * 5}px)`,
                                    zIndex: 4 - i
                                }}
                            />
                        ))}
                        <div style={{ position: "absolute", inset: 0, zIndex: 5, display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Printer size={80} color={colors.teal} style={{ opacity: 0.2 }} />
                        </div>
                    </div>
                </div>
            </section>

            {/* مكتبة الورق - توزيع ملون */}
            <section style={{ padding: "100px 8%" }}>
                <h2 style={{ textAlign: "center", fontSize: "2.8rem", marginBottom: "70px", fontWeight: "900" }}>{t.papersTitle}</h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "25px" }}>
                    {t.papers.map((paper, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -10 }}
                            style={{
                                padding: "40px 30px", background: "#ffffff", borderRadius: "25px",
                                border: "1px solid #f1f5f9", boxShadow: "0 15px 35px rgba(0,0,0,0.05)",
                                position: "relative", overflow: "hidden"
                            }}
                        >
                            <div style={{ width: "40px", height: "4px", background: paper.color, marginBottom: "20px", borderRadius: "2px" }} />
                            <h3 style={{ fontSize: "1.4rem", marginBottom: "12px", color: "#0f172a" }}>{paper.name}</h3>
                            <p style={{ fontSize: "0.95rem", color: colors.textSecondary, lineHeight: 1.6 }}>{paper.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* مراحل العمل */}
            <section style={{ padding: "100px 8%", background: "#0f172a", color: "#fff", borderRadius: "60px 60px 0 0" }}>
                <h2 style={{ textAlign: "center", fontSize: "2.5rem", marginBottom: "60px" }}>{t.stepsTitle}</h2>
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "30px" }}>
                    {["تجهيز الملفات", "اختيار نوع الورق", "الطباعة الرقمية", "القص والتغليف"].map((step, i) => (
                        <div key={i} style={{ textAlign: "center", width: "200px" }}>
                            <span style={{ fontSize: "3rem", fontWeight: "900", color: "rgba(255,255,255,0.1)" }}>0{i + 1}</span>
                            <h4 style={{ color: colors.rainbow.split(',')[i + 1] || "#fff", marginTop: "-20px" }}>{step}</h4>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section style={{ padding: "120px 20px", textAlign: "center", background: "#ffffff" }}>
                <motion.div style={{ maxWidth: "900px", margin: "0 auto", padding: "80px 40px", borderRadius: "50px", background: "#f8fafc", border: "1px solid #e2e8f0" }}>
                    <Sparkles size={40} color={colors.purple} style={{ marginBottom: "20px" }} />
                    <h2 style={{ fontSize: "clamp(1.8rem, 5vw, 3rem)", fontWeight: 900, marginBottom: "35px", color: "#0f172a" }}>
                        جاهز لتحويل أفكارك إلى <span style={{ color: colors.blue }}>حقيقة ملموسة؟</span>
                    </h2>
                    <a href={`https://wa.me/${whatsappNumber}`} target="_blank" style={{ display: "inline-flex", alignItems: "center", gap: "15px", background: colors.textPrimary, color: "#fff", padding: "20px 50px", borderRadius: "100px", textDecoration: "none", fontWeight: "bold", fontSize: "1.3rem", boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}>
                        <MessageCircle /> {t.whatsappBtn}
                    </a>
                </motion.div>
            </section>

            {/* الفوتر الموحد (مكيف للخلفية الفاتحة) */}
            <footer style={{ padding: "50px 20px", textAlign: "center", borderTop: "1px solid #f1f5f9", color: "#64748b", background: "#ffffff" }}>
                <p style={{ fontSize: "0.9rem", letterSpacing: "1px" }}>
                    {isAr ? "جميع الحقوق محفوظة © التصميم الحديث 2026" : "All Rights Reserved © Modern Design 2026"}
                </p>
            </footer>

        </div>
    );
};

export default DigitalPaperPage;