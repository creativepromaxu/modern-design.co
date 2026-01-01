import React, { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
    Lightbulb, Layers, Sun, Moon, MessageCircle,
    Globe, ArrowDownCircle, Crown, Diamond,
    BoxSelect, Star
} from "lucide-react";

const IlluminatedLettersPage = () => {
    const [lang, setLang] = useState("ar");
    const isAr = lang === "ar";
    const whatsappNumber = "966557480817";

    const { scrollYProgress } = useScroll();

    const yParallax = useTransform(scrollYProgress, [0, 1], [0, -150]);
    const bgTextX = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

    const colors = {
        bg: "#050505",
        textPrimary: "#ffffff",
        textSecondary: "#a1a1aa",
        goldAccent: "#FFD700",
        goldWarm: "#FFA500",
        goldDark: "#b45309"
    };

    const textGlowStyle = {
        textShadow: `0 0 15px ${colors.goldAccent}60, 0 0 30px ${colors.goldWarm}30`
    };

    const content = {
        ar: {
            title: "حروف بارزة تصنع الفارق",
            subtitle: "ليست مجرد يافطة، بل تحفة فنية مضيئة تجسد هيبة علامتك التجارية ليلاً ونهاراً. دقة في التصنيع، وإبهار في الإضاءة.",
            techBadge: "تقنيات إضاءة LED كورية متطورة",
            bgText: "LUXURY • GLOW • DESIGN • ",
            descriptionIntro: "فن نحت الضوء",
            description: "نحول شعارك من مجرد رسم ثنائي الأبعاد إلى مجسم ثلاثي الأبعاد ينبض بالحياة بأجود الخامات وأنظمة الإضاءة المتطورة.",
            typesTitle: "أنواع الإضاءة الساحرة",
            materialsTitle: "خامات الرفاهية",
            whatsappBtn: "اجعل علامتك تشع الآن",
            types: [
                { title: "إضاءة أمامية", desc: "الوجه يضيء بالكامل، مثالية للألوان الزاهية.", icon: <Sun size={35} />, effect: "front" },
                { title: "إضاءة خلفية", desc: "هالة ضوئية ساحرة تخرج من خلف الحرف، قمة الفخامة.", icon: <Moon size={35} />, effect: "halo" },
                { title: "إضاءة جانبية", desc: "توهج من الحواف لتأثير ثلاثي الأبعاد مميز.", icon: <Layers size={35} />, effect: "dual" }
            ],
            materials: [
                { name: "استانلس ذهبي/فضي", desc: "معدن مصقول بلمعة المرآة لمظهر ملكي.", icon: <Crown /> },
                { name: "أكريليك نقي", desc: "سماكات متعددة يمرر الضوء بنقاء عالي.", icon: <Diamond /> },
                { name: "تشانليوم", desc: "حواف ألومنيوم مرنة تعطي الحرف عمقاً.", icon: <BoxSelect /> }
            ]
        },
        en: {
            title: "Majestic 3D Illuminated Letters",
            subtitle: "Not just a sign—a glowing masterpiece that embodies your brand's prestige. Precision crafting, dazzling illumination.",
            techBadge: "Advanced Korean LED Technology",
            bgText: "LUXURY • GLOW • DESIGN • ",
            descriptionIntro: "The Art of Sculpting Light",
            description: "We transform your 2D logo into a vibrant 3D sculpture using premium materials and advanced LED systems.",
            typesTitle: "Mesmerizing Lighting Types",
            materialsTitle: "Luxury Materials",
            whatsappBtn: "Let Your Brand Shine Now",
            types: [
                { title: "Front Lit", desc: "The entire face glows. Perfect for vibrant colors.", icon: <Sun size={35} />, effect: "front" },
                { title: "Halo Lit", desc: "A magical halo glow from behind the letter.", icon: <Moon size={35} />, effect: "halo" },
                { title: "Side Lit", desc: "Edge glow for a unique 3D effect.", icon: <Layers size={35} />, effect: "dual" }
            ],
            materials: [
                { name: "Stainless Steel", desc: "Mirror polished metal for a regal look.", icon: <Crown /> },
                { name: "Pure Acrylic", desc: "High purity for perfect light transmission.", icon: <Diamond /> },
                { name: "Channelium", desc: "Flexible aluminum edges for depth.", icon: <BoxSelect /> }
            ]
        }
    };

    const t = content[lang];

    const GlowingLetter = ({ effect }) => {
        let shadowStyle = {};
        let backgroundStyle = "#222";
        let textColor = colors.textSecondary;

        if (effect === "front") {
            shadowStyle = { boxShadow: `0 0 25px ${colors.goldAccent}, inset 0 0 15px ${colors.goldAccent}` };
            backgroundStyle = colors.goldAccent;
            textColor = "#000";
        } else if (effect === "halo") {
            shadowStyle = { boxShadow: `0 0 50px ${colors.goldAccent}, 0 0 20px ${colors.goldWarm}` };
            backgroundStyle = "#111";
            textColor = colors.goldAccent;
        } else if (effect === "dual") {
            shadowStyle = { boxShadow: `0 0 30px ${colors.goldAccent}80` };
            backgroundStyle = `linear-gradient(135deg, ${colors.goldAccent}, ${colors.goldDark})`;
            textColor = "#fff";
        }

        return (
            <div style={{
                width: "85px", height: "85px", borderRadius: "18px",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "3.2rem", fontWeight: "900",
                background: backgroundStyle, color: textColor,
                ...shadowStyle
            }}>A</div>
        );
    };

    return (
        <div style={{
            backgroundColor: colors.bg, color: colors.textPrimary,
            fontFamily: isAr ? "'Tajawal', sans-serif" : "'Inter', sans-serif",
            direction: isAr ? "rtl" : "ltr", minHeight: "100vh", overflowX: "hidden", position: "relative"
        }}>

            {/* Background Decor */}
            <div style={{ position: "fixed", inset: 0, zIndex: 0, overflow: "hidden", pointerEvents: "none" }}>
                <motion.div
                    style={{
                        x: bgTextX, position: "absolute", top: "30%",
                        fontSize: "clamp(10rem, 20vw, 22rem)", fontWeight: "900", color: `${colors.goldAccent}05`,
                        whiteSpace: "nowrap", lineHeight: 0.8, textTransform: "uppercase"
                    }}
                >
                    {t.bgText} {t.bgText}
                </motion.div>
                <div style={{ position: "absolute", top: "-10%", left: "-10%", width: "500px", height: "500px", background: `${colors.goldAccent}10`, filter: "blur(100px)" }} />
            </div>

            {/* Navigation - Logo Size Adjusted */}
            <nav style={{ position: "fixed", width: "100%", padding: "10px 5%", display: "flex", justifyContent: "space-between", alignItems: "center", zIndex: 100, borderBottom: `1px solid ${colors.goldAccent}20`, backdropFilter: "blur(20px)", background: "rgba(5,5,5,0.85)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <img src="/logos/logo.svg" alt="Logo" style={{ height: "35px" }} onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block' }} />
                    <span style={{ display: 'none', fontSize: "1.1rem", fontWeight: "900", color: colors.goldAccent }}>MODERN DESIGN</span>
                </div>
                <button onClick={() => setLang(isAr ? "en" : "ar")} style={{ background: "transparent", border: `1px solid ${colors.goldAccent}60`, color: colors.goldAccent, padding: "6px 18px", borderRadius: "50px", cursor: "pointer", fontWeight: "bold", fontSize: "0.85rem", display: "flex", alignItems: "center", gap: "6px" }}>
                    <Globe size={14} /> {isAr ? "English" : "عربي"}
                </button>
            </nav>

            {/* Hero Section - Text Wrapped Fix */}
            <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: "120px 20px 60px", position: "relative", zIndex: 2 }}>

                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} style={{ padding: "8px 20px", borderRadius: "50px", background: `${colors.goldAccent}10`, border: `1px solid ${colors.goldAccent}40`, color: colors.goldAccent, fontWeight: "bold", marginBottom: "30px", display: "flex", alignItems: "center", gap: "8px", fontSize: "0.85rem" }}>
                    <Star size={16} fill={colors.goldAccent} /> {t.techBadge}
                </motion.div>

                <motion.div style={{ y: yParallax, width: "100%", maxWidth: "1200px" }}>
                    <h1 style={{
                        fontSize: "clamp(2.2rem, 8vw, 7rem)",
                        fontWeight: 950,
                        lineHeight: 1.1,
                        marginBottom: "25px",
                        overflowWrap: "break-word",
                        padding: "0 10px"
                    }}>
                        <span style={{ color: "#fff" }}>{t.title.split(' ').slice(0, 2).join(' ')}</span><br />
                        <span style={{
                            background: `linear-gradient(to right, ${colors.goldAccent}, ${colors.goldWarm})`,
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            filter: "drop-shadow(0 0 10px rgba(255, 215, 0, 0.3))"
                        }}>
                            {t.title.split(' ').slice(2).join(' ')}
                        </span>
                    </h1>
                </motion.div>

                <p style={{ fontSize: "clamp(1rem, 2.2vw, 1.5rem)", color: colors.textSecondary, maxWidth: "850px", lineHeight: 1.6, padding: "0 15px" }}>
                    {t.subtitle}
                </p>

                <motion.div style={{ marginTop: "50px" }} animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
                    <ArrowDownCircle size={35} color={colors.goldAccent} style={{ opacity: 0.6 }} />
                </motion.div>
            </section>

            {/* Types Section - Cards Mobile Optimized */}
            <section style={{ padding: "60px 5%", position: "relative", zIndex: 2 }}>
                <h2 style={{ textAlign: "center", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: "900", marginBottom: "60px", ...textGlowStyle }}>{t.typesTitle}</h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: "25px" }}>
                    {t.types.map((type, i) => (
                        <motion.div key={i} whileHover={{ y: -10 }} style={{ padding: "40px 20px", background: "#0c0c0e", borderRadius: "30px", border: `1px solid #27272a`, textAlign: "center" }}>
                            <div style={{ marginBottom: "30px", display: "flex", justifyContent: "center" }}><GlowingLetter effect={type.effect} /></div>
                            <h3 style={{ fontSize: "1.6rem", marginBottom: "12px", color: colors.goldAccent }}>{type.title}</h3>
                            <p style={{ color: colors.textSecondary, fontSize: "1rem", lineHeight: 1.5 }}>{type.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Materials Section */}
            <section style={{ padding: "80px 8%", position: "relative", zIndex: 2 }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 350px), 1fr))", gap: "50px", alignItems: "center" }}>
                    <div>
                        <h2 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: "900", marginBottom: "20px", color: colors.goldAccent }}>{t.descriptionIntro}</h2>
                        <p style={{ fontSize: "1.2rem", lineHeight: "1.8", color: colors.textSecondary }}>{t.description}</p>
                    </div>
                    <div style={{ display: "grid", gap: "20px" }}>
                        {t.materials.map((m, i) => (
                            <div key={i} style={{ padding: "25px", background: "#111114", borderRadius: "20px", borderRight: isAr ? `4px solid ${colors.goldAccent}` : "none", borderLeft: !isAr ? `4px solid ${colors.goldAccent}` : "none", display: "flex", alignItems: "center", gap: "15px" }}>
                                <div style={{ color: colors.goldAccent }}>{React.cloneElement(m.icon, { size: 28 })}</div>
                                <div>
                                    <h4 style={{ fontSize: "1.2rem", margin: 0, color: "#fff" }}>{m.name}</h4>
                                    <p style={{ margin: 0, color: colors.textSecondary, fontSize: "0.9rem" }}>{m.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section style={{ padding: "80px 20px", textAlign: "center", zIndex: 2 }}>
                <div style={{ maxWidth: "900px", margin: "0 auto", padding: "60px 30px", borderRadius: "50px", background: `linear-gradient(135deg, ${colors.goldAccent}10, transparent)`, border: `1px solid ${colors.goldAccent}30` }}>
                    <h2 style={{ fontSize: "clamp(1.8rem, 5vw, 3rem)", fontWeight: 900, marginBottom: "35px" }}>{isAr ? "جاهز لتغيير واجهة عملك؟" : "Ready to upgrade your storefront?"}</h2>
                    <a href={`https://wa.me/${whatsappNumber}`} target="_blank" style={{ background: colors.goldAccent, color: "#000", padding: "18px 45px", borderRadius: "100px", textDecoration: "none", fontWeight: "900", fontSize: "1.2rem", display: "inline-flex", alignItems: "center", gap: "12px", boxShadow: `0 15px 40px ${colors.goldAccent}30` }}>
                        <MessageCircle size={24} /> {t.whatsappBtn}
                    </a>
                </div>
            </section>

            <footer style={{ padding: "50px 20px", textAlign: "center", borderTop: "1px solid #222", opacity: 0.6, fontSize: "0.9rem" }}>
                {isAr ? "جميع الحقوق محفوظة © التصميم الحديث 2026" : "All Rights Reserved © Modern Design 2026"}
            </footer>
        </div>
    );
};

export default IlluminatedLettersPage;