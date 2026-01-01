import React, { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
    Maximize, Layers, Box, Zap, MessageCircle,
    ArrowDownCircle, Globe, PenTool, Scissors,
    Cpu, Compass, HardHat
} from "lucide-react";

const LaserCutPage = () => {
    const [lang, setLang] = useState("ar");
    const isAr = lang === "ar";
    const whatsappNumber = "966557480817";

    const { scrollYProgress } = useScroll();
    const beamX = useTransform(scrollYProgress, [0, 1], ["-100%", "100%"]);

    const colors = {
        bg: "#0a0505", // خلفية سوداء بلمحة حمراء خفيفة جداً
        textPrimary: "#ffffff",
        textSecondary: "#a1a1aa",
        accent: "#C23131", // لونك المعتمد للأحمر
        accentGlow: "rgba(194, 49, 49, 0.4)"
    };

    const content = {
        ar: {
            title: "عالم القص الهندسي",
            subtitle: "ليزر، راوتر، وتشكيل احترافي. نحول الأكرليك، الفوركس، والفوم إلى قطع فنية ثلاثية الأبعاد.",
            techBadge: "دقة تصل إلى 0.1 ملم",
            descriptionIntro: "قوة الدقة المتناهية",
            description: "نحن لا نقص المواد فقط، بل نصنع أبعاداً جديدة لعلامتك التجارية. نستخدم أحدث ماكينات الليزر للأكرليك، وماكينات الـ CNC للفوركس والخشب، لضمان حواف ناعمة وتفاصيل دقيقة جداً.",
            materialsTitle: "خاماتنا الأساسية",
            stepsTitle: "من المخطط إلى الواقع",
            whatsappBtn: "ابدأ مشروعك الآن واتساب",
            materials: [
                { name: "أكرليك (Acrylic)", desc: "شفاف، ملون، أو مرآة. مثالي للوحات المضيئة والحروف البارزة الفاخرة.", icon: <Zap size={30} /> },
                { name: "فوركس (Forex)", desc: "قوي وخفيف الوزن. الخيار الأول للوحات الإعلانية والديكورات الداخلية.", icon: <Box size={30} /> },
                { name: "فوم (Foam)", desc: "مثالي للمناسبات والحفلات، سهل التشكيل وسريع التنفيذ بأوزان خفيفة.", icon: <Layers size={30} /> }
            ],
            steps: [
                { t: "تحليل الملفات", d: "تحويل شعارك إلى مسارات (Vectors) قابلة للقراءة آلياً." },
                { t: "برمجة العمق", d: "تحديد سرعة وقوة الليزر بناءً على سمك المادة المطلوبة." },
                { t: "التنفيذ الآلي", d: "عملية القص الآلي تحت رقابة مهندسين مختصين." },
                { t: "التجميع النهائي", d: "صنفرة الحواف، التنظيف، والتركيب إذا لزم الأمر." }
            ],
            galleryTitle: "إبداعات الليزر والراوتر",
            gallery: [
                { id: 1, src: "https://i.pinimg.com/1200x/28/71/62/2871621c95d9c71cb39f25c53e9070a2.jpg", title: "حروف أكرليك بارزة" },
                { id: 2, src: "https://i.pinimg.com/736x/ec/06/91/ec0691d69127e7cc7a51da4097b4d22e.jpg", title: "قواطع ديكور فوركس" },
                { id: 3, src: "https://i.pinimg.com/1200x/34/9a/bd/349abd057cdd87273a95f2d4503275f5.jpg", title: "أشكال فوم للمناسبات" },
                { id: 4, src: "https://i.pinimg.com/736x/2f/0b/b2/2f0bb2b539bc83ae0a299ceb7fdbda57.jpg", title: "لوحات إرشادية احترافية" },
            ]
        },
        en: {
            title: "Engineering Cut World",
            subtitle: "Laser, Router, and Pro Shaping. Turning Acrylic, Forex, and Foam into 3D masterpieces.",
            techBadge: "Precision up to 0.1 mm",
            descriptionIntro: "The Power of Precision",
            description: "We don't just cut materials; we create new dimensions for your brand. Using the latest Laser and CNC tech for smooth edges and intricate details.",
            materialsTitle: "Core Materials",
            stepsTitle: "From Blueprint to Reality",
            whatsappBtn: "Start via WhatsApp",
            materials: [
                { name: "Acrylic", desc: "Transparent, colored, or mirror. Perfect for luxury 3D signs.", icon: <Zap size={30} /> },
                { name: "Forex", desc: "Durable and lightweight. Best for signage and interior decor.", icon: <Box size={30} /> },
                { name: "Foam", desc: "Ideal for events, easy to shape and fast to execute.", icon: <Layers size={30} /> }
            ],
            steps: [
                { t: "File Analysis", d: "Converting logos into machine-readable vector paths." },
                { t: "Depth Setting", d: "Adjusting laser power and speed based on material thickness." },
                { t: "Auto-Cutting", d: "Automated precision cutting under engineer supervision." },
                { t: "Final Assembly", d: "Edge smoothing, cleaning, and installation." }
            ],
            galleryTitle: "Laser & Router Works",
            gallery: [
                { id: 1, src: "https://i.pinimg.com/1200x/28/71/62/2871621c95d9c71cb39f25c53e9070a2.jpg", title: "3D Acrylic Letters" },
                { id: 2, src: "https://i.pinimg.com/736x/ec/06/91/ec0691d69127e7cc7a51da4097b4d22e.jpg", title: "Forex Partitions" },
                { id: 3, src: "https://i.pinimg.com/1200x/34/9a/bd/349abd057cdd87273a95f2d4503275f5.jpg", title: "Foam Event Props" },
                { id: 4, src: "https://i.pinimg.com/736x/2f/0b/b2/2f0bb2b539bc83ae0a299ceb7fdbda57.jpg", title: "Directional Signage" },
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

            {/* تأثير خلفية المخطط الهندسي (Blueprint Grid) */}
            <div style={{
                position: "fixed", inset: 0,
                backgroundImage: `linear-gradient(${colors.accent}10 1px, transparent 1px), linear-gradient(90deg, ${colors.accent}10 1px, transparent 1px)`,
                backgroundSize: "40px 40px", zIndex: 0
            }} />

            {/* تأثير شعاع الليزر المتحرك */}
            <motion.div
                style={{
                    position: "fixed", top: 0, left: beamX, width: "2px", height: "100%",
                    background: `linear-gradient(to bottom, transparent, ${colors.accent}, transparent)`,
                    boxShadow: `0 0 20px ${colors.accent}`, zIndex: 1
                }}
            />

            {/* === الهيدر (موحد مع هوية الموقع) === */}
            <nav style={{ position: "fixed", width: "100%", padding: "12px 5%", display: "flex", justifyContent: "space-between", alignItems: "center", zIndex: 100, borderBottom: `1px solid ${colors.accent}20`, backdropFilter: "blur(15px)", background: `${colors.bg}90` }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <img
                        src="/logos/logo.svg"
                        alt="Logo"
                        style={{ height: "40px", width: "auto" }}
                        onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block' }}
                    />
                    <span style={{ display: 'none', fontSize: "1.2rem", fontWeight: "900", letterSpacing: "1px", color: colors.accent }}>MODERN DESIGN</span>
                </div>
                <button onClick={() => setLang(isAr ? "en" : "ar")} style={{ background: `${colors.accent}20`, border: `1px solid ${colors.accent}50`, color: "#fff", padding: "8px 20px", borderRadius: "30px", cursor: "pointer", fontWeight: "bold" }}>
                    <Globe size={16} inline style={{ margin: "0 5px", verticalAlign: "middle" }} /> {isAr ? "English" : "عربي"}
                </button>
            </nav>

            {/* Hero Section */}
            <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: "120px 20px 0", position: "relative", zIndex: 2 }}>
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} style={{ padding: "8px 25px", borderRadius: "30px", background: `${colors.accent}15`, border: `1px solid ${colors.accent}`, color: colors.accent, fontWeight: "bold", marginBottom: "25px", fontSize: "0.9rem" }}>
                    <Cpu size={18} inline style={{ margin: "0 8px", verticalAlign: "middle" }} /> {t.techBadge}
                </motion.div>

                <h1 style={{ fontSize: "clamp(2.5rem, 8vw, 6rem)", fontWeight: 900, marginBottom: "20px", textTransform: "uppercase" }}>
                    {t.title} <span style={{ color: colors.accent }}>.</span>
                </h1>

                <p style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)", color: colors.textSecondary, maxWidth: "800px", lineHeight: 1.6 }}>
                    {t.subtitle}
                </p>

                <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 2 }} style={{ marginTop: "50px" }}>
                    <ArrowDownCircle size={40} color={colors.accent} />
                </motion.div>
            </section>

            {/* وصف المواد - بشكل إبداعي */}
            <section style={{ padding: "100px 8%", position: "relative", zIndex: 2 }}>
                <div style={{ textAlign: "center", marginBottom: "80px" }}>
                    <h2 style={{ fontSize: "3rem", fontWeight: "900" }}>{t.materialsTitle}</h2>
                    <div style={{ width: "80px", height: "4px", background: colors.accent, margin: "20px auto" }} />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "30px" }}>
                    {t.materials.map((item, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.03, backgroundColor: `${colors.accent}10` }}
                            style={{
                                padding: "50px 30px", borderRadius: "30px", background: "#ffffff05",
                                border: `1px solid ${colors.accent}20`, transition: "0.3s", textAlign: "center"
                            }}
                        >
                            <div style={{ color: colors.accent, marginBottom: "20px", display: "flex", justifyContent: "center" }}>{item.icon}</div>
                            <h3 style={{ fontSize: "1.8rem", marginBottom: "15px" }}>{item.name}</h3>
                            <p style={{ color: colors.textSecondary, lineHeight: 1.6 }}>{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* مراحل العمل (Blueprint Style) */}
            <section style={{ padding: "100px 5%", background: `${colors.accent}05`, position: "relative", zIndex: 2 }}>
                <h2 style={{ textAlign: "center", fontSize: "2.8rem", marginBottom: "70px" }}>{t.stepsTitle}</h2>
                <div style={{ maxWidth: "1000px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
                    {t.steps.map((step, i) => (
                        <div key={i} style={{ position: "relative", padding: "30px", border: `1px dashed ${colors.accent}50`, borderRadius: "15px" }}>
                            <span style={{ position: "absolute", top: "-15px", right: "20px", background: colors.accent, padding: "2px 12px", borderRadius: "10px", fontSize: "0.8rem", fontWeight: "bold" }}>STEP 0{i + 1}</span>
                            <h4 style={{ color: colors.accent, marginBottom: "10px", fontSize: "1.2rem" }}>{step.t}</h4>
                            <p style={{ fontSize: "0.9rem", color: colors.textSecondary, margin: 0 }}>{step.d}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* المعرض */}
            <section style={{ padding: "100px 5%", position: "relative", zIndex: 2 }}>
                <h2 style={{ textAlign: "center", fontSize: "2.5rem", marginBottom: "50px" }}>{t.galleryTitle}</h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "25px" }}>
                    {t.gallery.map(img => (
                        <motion.div
                            key={img.id}
                            whileHover={{ y: -10 }}
                            style={{ height: "400px", borderRadius: "25px", overflow: "hidden", position: "relative", border: `1px solid ${colors.accent}30` }}
                        >
                            <img src={img.src} alt={img.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #000 30%, transparent)" }} />
                            <div style={{ position: "absolute", bottom: "25px", left: "25px", right: "25px" }}>
                                <h4 style={{ color: colors.accent, fontWeight: "bold", fontSize: "1.2rem" }}>{img.title}</h4>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section style={{ padding: "100px 20px", textAlign: "center", zIndex: 2, position: "relative" }}>
                <div style={{
                    maxWidth: "900px", margin: "0 auto", padding: "80px 40px", borderRadius: "50px",
                    background: `radial-gradient(circle at center, ${colors.accent}20, transparent)`,
                    border: `1px solid ${colors.accent}30`
                }}>
                    <h2 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", marginBottom: "30px", fontWeight: 900 }}>
                        {isAr ? "جسّم أفكارك وحوّلها لواقع ملموس" : "Solidify your ideas into reality"}
                    </h2>
                    <motion.a
                        href={`https://wa.me/${whatsappNumber}`}
                        whileHover={{ scale: 1.05, boxShadow: `0 0 30px ${colors.accent}` }}
                        style={{
                            display: "inline-flex", alignItems: "center", gap: "15px", padding: "20px 50px",
                            background: colors.accent, color: "#fff", borderRadius: "100px",
                            textDecoration: "none", fontWeight: "bold", fontSize: "1.3rem"
                        }}
                    >
                        <MessageCircle size={28} /> {t.whatsappBtn}
                    </motion.a>
                </div>
            </section>

            {/* الفوتر (موحد) */}
            <footer style={{ padding: "50px 20px", textAlign: "center", borderTop: `1px solid ${colors.accent}10`, color: colors.textSecondary, zIndex: 2, background: "#050202" }}>
                <p style={{ opacity: 0.6, fontSize: "0.9rem", letterSpacing: "1px" }}>
                    {isAr ? "جميع الحقوق محفوظة © التصميم الحديث 2026" : "All Rights Reserved © Modern Design 2026"}
                </p>
            </footer>

        </div>
    );
};

export default LaserCutPage;