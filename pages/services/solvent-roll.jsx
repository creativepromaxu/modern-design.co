import React, { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
    Maximize2, StretchHorizontal, Image as ImageIcon,
    StickyNote, Monitor, Paintbrush, MessageCircle,
    Globe, ArrowDownCircle, HardHat, Info, Zap
} from "lucide-react";

const SolventPrintingPage = () => {
    const [lang, setLang] = useState("ar");
    const isAr = lang === "ar";
    const whatsappNumber = "966557480817";

    const { scrollYProgress } = useScroll();
    const xRoll = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

    const colors = {
        bg: "#040b14",
        textPrimary: "#ffffff",
        textSecondary: "#94a3b8",
        accent: "#1680C4", // لونك المختار
        accentDark: "#0e5a8a",
        highlight: "#38bdf8"
    };

    const content = {
        ar: {
            title: "طباعة السولفنت العملاقة",
            subtitle: "حلول الطباعة الخارجية والداخلية بأحجام تصل إلى 5 أمتار. قوة الألوان وتحمل الظروف القاسية.",
            techBadge: "أكبر عرض طباعة في المنطقة (5m)",
            descriptionIntro: "قوة التحمل اللامتناهية",
            description: "نحن نمتلك ترسانة من مكائن السولفنت المتطورة بمقاسات (5 متر، 3.20 متر، و1.60 متر). من اللوحات الإعلانية الضخمة للطرق (Mega Signs) إلى الستيكرات والكانفز عالي الدقة، نضمن لك ثبات الألوان لسنوات تحت أشعة الشمس والظروف الجوية المختلفة.",
            machinesTitle: "أسطول مكائننا",
            materialsTitle: "خامات الطباعة (رول)",
            whatsappBtn: "اطلب مطبوعاتك الآن",
            machines: [
                { size: "5 Meters", desc: "للإعلانات الضخمة وواجهات المباني (Grand Format).", icon: <Maximize2 size={30} /> },
                { size: "3.20 Meters", desc: "للأمتار المتوسطة والبنرات واللوحات الإعلانية.", icon: <StretchHorizontal size={30} /> },
                { size: "1.60 Meters", desc: "للطباعة عالية الدقة (High Resolution) والستيكرات.", icon: <Zap size={30} /> }
            ],
            materials: [
                { name: "بنر (Banner)", desc: "القوة والمتانة للوحات الشوارع.", color: colors.accent },
                { name: "استيكر (Sticker)", desc: "طباعة وقص بدقة عالية للسيارات والواجهات.", color: "#51AC5F" },
                { name: "كانفز (Canvas)", desc: "لمسة فنية تحول الصور إلى لوحات مرسومة.", color: "#F39320" },
                { name: "وايت فلم (White Film)", desc: "دقة متناهية للملصقات الدعائية الداخلية.", color: "#8B5CF6" },
                { name: "باك لايت (Backlit)", desc: "إضاءة خلفية تبرز جمال الألوان في الليل.", color: "#C23131" },
                { name: "فينيل (Vinyl)", desc: "مرونة عالية واستخدامات متعددة للديكور.", color: "#1680C4" }
            ],
            stepsTitle: "كيف نبدأ؟"
        },
        en: {
            title: "Giant Solvent Printing",
            subtitle: "Outdoor and indoor printing solutions up to 5 meters. Color durability for extreme conditions.",
            techBadge: "Largest print width in the region (5m)",
            descriptionIntro: "Endless Durability",
            description: "We possess an arsenal of advanced solvent machines (5m, 3.20m, 1.60m). From massive highway billboards to high-res stickers and canvas, we guarantee color stability under the sun and weather elements.",
            machinesTitle: "Our Machine Fleet",
            materialsTitle: "Printing Media (Roll)",
            whatsappBtn: "Order Now via WhatsApp",
            machines: [
                { size: "5 Meters", desc: "For massive building wraps and grand format ads.", icon: <Maximize2 size={30} /> },
                { size: "3.20 Meters", desc: "For medium banners and signage billboards.", icon: <StretchHorizontal size={30} /> },
                { size: "1.60 Meters", desc: "For high-resolution prints and vinyl stickers.", icon: <Zap size={30} /> }
            ],
            materials: [
                { name: "Banner", desc: "Durability for outdoor signage.", color: colors.accent },
                { name: "Sticker", desc: "High precision for cars and shop windows.", color: "#51AC5F" },
                { name: "Canvas", desc: "Artistic touch for photographic prints.", color: "#F39320" },
                { name: "White Film", desc: "High precision for indoor promotional posters.", color: "#8B5CF6" },
                { name: "Backlit", desc: "Backlighting that enhances color beauty at night.", color: "#C23131" },
                { name: "Vinyl", desc: "High flexibility for various decor uses.", color: "#1680C4" }
            ],
            stepsTitle: "Our Process"
        }
    };

    const t = content[lang];

    return (
        <div style={{
            backgroundColor: colors.bg, color: colors.textPrimary,
            fontFamily: isAr ? "'Tajawal', sans-serif" : "'Inter', sans-serif",
            direction: isAr ? "rtl" : "ltr", minHeight: "100vh", overflowX: "hidden", position: "relative"
        }}>

            {/* تأثير الرول في الخلفية (نص متحرك يوحي بالطباعة المستمرة) */}
            <motion.div
                style={{
                    position: "fixed", top: "50%", left: xRoll,
                    fontSize: "20rem", fontWeight: "900", color: "rgba(255,255,255,0.02)",
                    whiteSpace: "nowrap", zIndex: 0, pointerEvents: "none"
                }}
            >
                SOLVENT PRINTING • BANNER • STICKER • VINYL • 5 METERS • HIGH QUALITY
            </motion.div>

            {/* === الهيدر الموحد === */}
            <nav style={{ position: "fixed", width: "100%", padding: "12px 5%", display: "flex", justifyContent: "space-between", alignItems: "center", zIndex: 100, borderBottom: `1px solid ${colors.accent}20`, backdropFilter: "blur(15px)", background: `${colors.bg}90` }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <img src="/logos/logo.svg" alt="Logo" style={{ height: "40px" }} onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block' }} />
                    <span style={{ display: 'none', fontSize: "1.2rem", fontWeight: "900", color: colors.accent }}>MODERN DESIGN</span>
                </div>
                <button onClick={() => setLang(isAr ? "en" : "ar")} style={{ background: `${colors.accent}20`, border: `1px solid ${colors.accent}40`, color: "#fff", padding: "8px 22px", borderRadius: "30px", cursor: "pointer", fontWeight: "bold" }}>
                    {isAr ? "English" : "عربي"}
                </button>
            </nav>

            {/* Hero Section */}
            <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: "120px 20px 0", position: "relative", zIndex: 2 }}>
                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} style={{ padding: "8px 25px", borderRadius: "30px", background: `${colors.accent}15`, border: `1px solid ${colors.accent}`, color: colors.accent, fontWeight: "bold", marginBottom: "30px" }}>
                    <HardHat size={18} inline style={{ margin: "0 8px", verticalAlign: "middle" }} /> {t.techBadge}
                </motion.div>

                <h1 style={{ fontSize: "clamp(2.5rem, 8vw, 6rem)", fontWeight: 900, lineHeight: 1, marginBottom: "25px" }}>
                    {t.title.split(' ').map((word, i) => i >= 2 ? <span key={i} style={{ color: colors.accent }}>{word} </span> : word + ' ')}
                </h1>

                <p style={{ fontSize: "clamp(1.1rem, 2vw, 1.5rem)", color: colors.textSecondary, maxWidth: "900px", lineHeight: 1.7 }}>
                    {t.subtitle}
                </p>

                <motion.div style={{ marginTop: "60px" }} animate={{ y: [0, 15, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
                    <ArrowDownCircle size={45} color={colors.accent} style={{ opacity: 0.7 }} />
                </motion.div>
            </section>

            {/* أحجام المكائن (تصميم هندسي) */}
            <section style={{ padding: "100px 8%", position: "relative", zIndex: 2 }}>
                <h2 style={{ textAlign: "center", fontSize: "2.8rem", marginBottom: "60px", fontWeight: "900" }}>{t.machinesTitle}</h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
                    {t.machines.map((m, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.02 }}
                            style={{ padding: "40px", background: `linear-gradient(145deg, #0a1320, #040b14)`, borderRadius: "25px", border: `1px solid ${colors.accent}30`, position: "relative" }}
                        >
                            <div style={{ color: colors.accent, marginBottom: "20px" }}>{m.icon}</div>
                            <h3 style={{ fontSize: "1.8rem", marginBottom: "10px", color: colors.accent }}>{m.size}</h3>
                            <p style={{ color: colors.textSecondary, lineHeight: 1.6 }}>{m.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* الخامات (الرول) */}
            <section style={{ padding: "100px 8%", position: "relative", zIndex: 2, background: "#060f1d" }}>
                <h2 style={{ textAlign: "center", fontSize: "2.8rem", marginBottom: "60px", fontWeight: "900" }}>{t.materialsTitle}</h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "25px" }}>
                    {t.materials.map((mat, i) => (
                        <div key={i} style={{ padding: "30px", borderRight: `4px solid ${mat.color}`, background: "rgba(255,255,255,0.02)", borderRadius: "0 15px 15px 0" }}>
                            <h3 style={{ color: "#fff", marginBottom: "10px", fontSize: "1.4rem" }}>{mat.name}</h3>
                            <p style={{ color: colors.textSecondary, margin: 0 }}>{mat.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* مراحل العمل (الأرقام واضحة) */}
            <section style={{ padding: "100px 5%", position: "relative", zIndex: 2 }}>
                <h2 style={{ textAlign: "center", fontSize: "2.8rem", marginBottom: "70px" }}>{t.stepsTitle}</h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "25px" }}>
                    {["استلام التصميم", "تجهيز الرول", "الطباعة والتحبير", "التنشيف واللف"].map((step, i) => (
                        <div key={i} style={{ padding: "40px", background: "#0a1320", borderRadius: "30px", position: "relative", overflow: "hidden", border: `1px solid ${colors.accent}20` }}>
                            <div style={{ position: "absolute", top: "-10px", [isAr ? "left" : "right"]: "10px", fontSize: "7rem", fontWeight: "900", color: "rgba(255, 255, 255, 0.05)", zIndex: 0 }}>
                                {i + 1}
                            </div>
                            <div style={{ position: "relative", zIndex: 1 }}>
                                <h3 style={{ fontSize: "1.3rem", color: colors.accent }}>{step}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section style={{ padding: "100px 20px 140px", textAlign: "center", zIndex: 2 }}>
                <div style={{ maxWidth: "850px", margin: "0 auto", padding: "80px 40px", borderRadius: "50px", background: `linear-gradient(135deg, ${colors.accent}20, transparent)`, border: `1px solid ${colors.accent}30` }}>
                    <h2 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900, marginBottom: "40px" }}>
                        {isAr ? "إعلاناتك بضخامة أحلامك ودقة خيالية" : "Your ads as big as your dreams with extreme precision"}
                    </h2>
                    <a href={`https://wa.me/${whatsappNumber}`} target="_blank" style={{ display: "inline-flex", alignItems: "center", gap: "15px", backgroundColor: colors.accent, color: "#fff", padding: "20px 50px", borderRadius: "100px", textDecoration: "none", fontWeight: "bold", fontSize: "1.3rem", boxShadow: `0 10px 40px ${colors.accent}40` }}>
                        <MessageCircle size={30} /> {t.whatsappBtn}
                    </a>
                </div>
            </section>

            {/* الفوتر الموحد */}
            <footer style={{ padding: "50px 20px", textAlign: "center", borderTop: `1px solid ${colors.accent}10`, color: colors.textSecondary, zIndex: 2, background: "#020810" }}>
                <p style={{ opacity: 0.6, fontSize: "0.9rem", letterSpacing: "1px" }}>
                    {isAr ? "جميع الحقوق محفوظة © التصميم الحديث 2026" : "All Rights Reserved © Modern Design 2026"}
                </p>
            </footer>

        </div>
    );
};

export default SolventPrintingPage;