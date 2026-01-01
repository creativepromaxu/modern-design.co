import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    Circle, Square, RectangleHorizontal,
    MessageCircle, Globe, ArrowDownCircle,
    Fingerprint, CheckCircle, Zap, ShieldCheck
} from "lucide-react";

const StampsPage = () => {
    const [lang, setLang] = useState("ar");
    const isAr = lang === "ar";
    const whatsappNumber = "966557480817";

    const colors = {
        bg: "#08060f", // خلفية داكنة ملكية
        textPrimary: "#ffffff",
        textSecondary: "#a78bfa", // بنفسجي فاتح للنصوص
        accent: "#8B5CF6", // اللون البنفسجي الأساسي
        accentGlow: "rgba(139, 92, 246, 0.3)"
    };

    const content = {
        ar: {
            title: "عالم الأختام الذكية",
            subtitle: "أختام أوتوماتيكية بجودة عالية وبصمة تدوم طويلًا. اختر شكلك المفضل (دائري، مربع، مستطيل) ودعنا نصمم هويتك.",
            techBadge: "أختام كريستال وتوماتيك أصلية",
            description: "نقدم لك تشكيلة من الأختام التي تجمع بين سهولة الاستخدام ونظافة البصمة. سواء كنت تبحث عن ختم رسمي للمؤسسة أو ختم شخصي لطيف، نحن هنا لنصنع لك الأثر.",
            shapesTitle: "أشكالنا المتوفرة",
            stepsTitle: "بصمتك في خطوات",
            whatsappBtn: "اطلب ختمك الآن",
            shapes: [
                { name: "أختام دائرية", desc: "مثالية للشعارات الرسمية والاعتماد، تعطي طابعاً كلاسيكياً فخماً.", icon: <Circle size={40} /> },
                { name: "أختام مربعة", desc: "تتناسب مع الشعارات الحديثة والباركود (QR Code) وتصاميم السوشيال ميديا.", icon: <Square size={40} /> },
                { name: "أختام مستطيلة", desc: "الأكثر طلباً للتوقيعات، العناوين، والبيانات الإدارية الطويلة.", icon: <RectangleHorizontal size={40} /> }
            ],
            steps: [
                { t: "اختيار الشكل", d: "تحديد الحجم والشكل المناسب لاستخدامك." },
                { t: "تصميم البصمة", d: "رسم الشعار أو النص بدقة لضمان وضوح الحبر." },
                { t: "التجهيز الفوري", d: "تجهيز الختم في وقت قياسي باستخدام تقنيات حديثة." }
            ]
        },
        en: {
            title: "Smart Seals World",
            subtitle: "High-quality automatic stamps with long-lasting impressions. Choose your shape (Round, Square, Rectangular).",
            techBadge: "Original Crystal & Automatic Seals",
            description: "We offer a range of stamps that combine ease of use with clean impressions. Whether it's a corporate seal or a personal one, we create the mark for you.",
            shapesTitle: "Available Shapes",
            stepsTitle: "Your Mark in Steps",
            whatsappBtn: "Order Your Stamp Now",
            shapes: [
                { name: "Round Stamps", desc: "Perfect for official logos and certifications, giving a classic luxurious feel.", icon: <Circle size={40} /> },
                { name: "Square Stamps", desc: "Suits modern logos, QR codes, and social media designs.", icon: <Square size={40} /> },
                { name: "Rectangular Stamps", desc: "The most requested for signatures, addresses, and admin data.", icon: <RectangleHorizontal size={40} /> }
            ],
            steps: [
                { t: "Pick a Shape", d: "Choosing the right size and shape for your needs." },
                { t: "Design Stamp", d: "Creating the logo or text for clear ink distribution." },
                { t: "Quick Execution", d: "Preparing the stamp in record time using modern tech." }
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

            {/* خلفية بنفسجية ناعمة */}
            <div style={{ position: "fixed", inset: 0, zIndex: 0 }}>
                <div style={{ position: "absolute", top: "20%", left: "10%", width: "40vw", height: "40vw", background: `radial-gradient(circle, ${colors.accent}15 0%, transparent 70%)`, filter: "blur(100px)" }} />
            </div>

            {/* === الهيدر الموحد === */}
            <nav style={{ position: "fixed", width: "100%", padding: "12px 5%", display: "flex", justifyContent: "space-between", alignItems: "center", zIndex: 100, borderBottom: `1px solid ${colors.accent}20`, backdropFilter: "blur(15px)", background: `${colors.bg}90` }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <img src="/logos/logo.svg" alt="Logo" style={{ height: "40px" }} onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block' }} />
                    <span style={{ display: 'none', fontSize: "1.2rem", fontWeight: "900", color: colors.accent }}>MODERN DESIGN</span>
                </div>
                <button onClick={() => setLang(isAr ? "en" : "ar")} style={{ background: `${colors.accent}20`, border: `1px solid ${colors.accent}50`, color: "#fff", padding: "8px 20px", borderRadius: "30px", cursor: "pointer" }}>
                    <Globe size={16} inline style={{ margin: "0 5px", verticalAlign: "middle" }} /> {isAr ? "English" : "عربي"}
                </button>
            </nav>

            {/* Hero Section */}
            <section style={{ height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: "0 20px", position: "relative", zIndex: 2 }}>
                <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} style={{ background: `${colors.accent}15`, padding: "10px 25px", borderRadius: "50px", border: `1px solid ${colors.accent}`, color: colors.accent, fontWeight: "bold", marginBottom: "30px" }}>
                    <Fingerprint size={18} inline style={{ verticalAlign: "middle", margin: "0 8px" }} /> {t.techBadge}
                </motion.div>

                <motion.h1 initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }} style={{ fontSize: "clamp(2.2rem, 8vw, 5rem)", fontWeight: 900, marginBottom: "20px" }}>
                    {t.title} <span style={{ color: colors.accent }}>.</span>
                </motion.h1>

                <p style={{ fontSize: "clamp(1.1rem, 2vw, 1.4rem)", color: colors.textSecondary, maxWidth: "800px", lineHeight: 1.6 }}>
                    {t.subtitle}
                </p>

                <motion.div animate={{ y: [0, 20, 0] }} transition={{ repeat: Infinity, duration: 2.5 }} style={{ marginTop: "50px", opacity: 0.5 }}>
                    <ArrowDownCircle size={40} color={colors.accent} />
                </motion.div>
            </section>

            {/* أشكال الأختام - بطاقات لطيفة */}
            <section style={{ padding: "80px 8%", position: "relative", zIndex: 2 }}>
                <h2 style={{ textAlign: "center", fontSize: "2.5rem", marginBottom: "60px", fontWeight: "900" }}>{t.shapesTitle}</h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "30px" }}>
                    {t.shapes.map((shape, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -10, boxShadow: `0 20px 40px ${colors.accent}15`, borderColor: colors.accent }}
                            style={{ padding: "40px", background: "#ffffff05", borderRadius: "35px", border: "1px solid #ffffff10", textAlign: "center", transition: "0.3s" }}
                        >
                            <div style={{ color: colors.accent, marginBottom: "25px", display: "flex", justifyContent: "center" }}>{shape.icon}</div>
                            <h3 style={{ fontSize: "1.5rem", marginBottom: "15px" }}>{shape.name}</h3>
                            <p style={{ color: colors.textSecondary, fontSize: "0.95rem", lineHeight: 1.6 }}>{shape.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* الوصف البسيط */}
            <section style={{ padding: "60px 8%", textAlign: "center", zIndex: 2 }}>
                <div style={{ maxWidth: "900px", margin: "0 auto", padding: "40px", borderRight: isAr ? `4px solid ${colors.accent}` : "", borderLeft: !isAr ? `4px solid ${colors.accent}` : "", background: `${colors.accent}05` }}>
                    <p style={{ fontSize: "1.2rem", lineHeight: 1.8, color: colors.textSecondary, margin: 0 }}>{t.description}</p>
                </div>
            </section>

            {/* الخطوات - تصميم خفيف */}
            <section style={{ padding: "100px 8%", position: "relative", zIndex: 2 }}>
                <h2 style={{ textAlign: "center", fontSize: "2.5rem", marginBottom: "60px" }}>{t.stepsTitle}</h2>
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "40px" }}>
                    {t.steps.map((step, i) => (
                        <div key={i} style={{ textAlign: "center", width: "200px" }}>
                            <div style={{ width: "60px", height: "60px", borderRadius: "20px", background: colors.accent, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: "1.5rem", fontWeight: "bold", boxShadow: `0 10px 20px ${colors.accent}40` }}>
                                {i + 1}
                            </div>
                            <h4 style={{ color: colors.accent, marginBottom: "10px" }}>{step.t}</h4>
                            <p style={{ fontSize: "0.9rem", color: colors.textSecondary }}>{step.d}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA - زر الواتساب اللطيف */}
            <section style={{ padding: "100px 20px", textAlign: "center", zIndex: 2 }}>
                <motion.div whileHover={{ scale: 1.02 }} style={{ maxWidth: "700px", margin: "0 auto", padding: "60px 30px", borderRadius: "40px", background: `linear-gradient(to bottom, ${colors.accent}10, transparent)`, border: `1px solid ${colors.accent}20` }}>
                    <h2 style={{ fontSize: "2.5rem", marginBottom: "30px", fontWeight: 800 }}>اترك أثرك أينما كنت</h2>
                    <a href={`https://wa.me/${whatsappNumber}`} target="_blank" style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "18px 45px", background: colors.accent, color: "#fff", borderRadius: "100px", textDecoration: "none", fontWeight: "bold", fontSize: "1.2rem", boxShadow: `0 10px 30px ${colors.accent}30` }}>
                        <MessageCircle /> {t.whatsappBtn}
                    </a>
                </motion.div>
            </section>

            {/* الفوتر الموحد */}
            <footer style={{ padding: "50px 20px", textAlign: "center", borderTop: `1px solid ${colors.accent}10`, color: colors.textSecondary, zIndex: 2, background: "#05040a" }}>
                <p style={{ opacity: 0.6, fontSize: "0.9rem", letterSpacing: "1px" }}>
                    {isAr ? "جميع الحقوق محفوظة © التصميم الحديث 2026" : "All Rights Reserved © Modern Design 2026"}
                </p>
            </footer>

        </div>
    );
};

export default StampsPage;