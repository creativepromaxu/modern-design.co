import React, { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
    Zap, Maximize, Image, Layers, MessageCircle,
    Globe, ArrowDownCircle, Cpu, Printer, Wind, Sun,
    MoveHorizontal, Sparkles, ScrollText, Shirt
} from "lucide-react";

const UVRollPage = () => {
    const [lang, setLang] = useState("ar");
    const isAr = lang === "ar";
    const whatsappNumber = "966557480817";

    const { scrollYProgress } = useScroll();
    // تأثير حركة الرول الخلفي
    const rollX = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
    // تأثير دوران التروس
    const gearRotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

    const colors = {
        bg: "#070214", // خلفية بنفسجية داكنة جداً (Cyberpunk style)
        textPrimary: "#ffffff",
        textSecondary: "#c4b5fd",
        accentNeon: "#A855F7", // بنفسجي نيون مشع
        accentHot: "#EC4899", // وردي ساخن لتعزيز توهج الـ UV
        accentCyan: "#06b6d4" // لون سماوي للمزج
    };

    const content = {
        ar: {
            title: "عملاق الـ UV رول (5 متر)",
            subtitle: "ثورة الطباعة الفورية. ماكينتان جبارتان بعرض 5 أمتار تطبع وتجفف في أجزاء من الثانية على أي خامة مرنة.",
            techBadge: "تقنية التجفيف الفوري LED UV",
            descriptionIntro: "السرعة تلتقي بالدقة",
            description: "انسَ أوقات الانتظار. تقنية الـ UV Roll لدينا تعني أن المطبوعات تخرج جافة تماماً وجاهزة للتركيب فوراً. بفضل رؤوس الطباعة المزدوجة في ماكيناتنا الـ 5 متر، نقدم سرعة إنتاج خيالية مع دقة ألوان فوتوغرافية تبهر الأبصار، حتى على الأقمشة!",
            machinesTitle: "قوة الـ 5 أمتار المزدوجة",
            materialsTitle: "خامات تتوهج بالـ UV",
            whatsappBtn: "ابدأ مشروعك العملاق الآن",
            machines: [
                { title: "الماكينة الأولى (Mega Beast 1)", desc: "عرض 5 متر، سرعة فائقة للمشاريع العاجلة والكميات الضخمة." },
                { title: "الماكينة الثانية (Precision Master 2)", desc: "عرض 5 متر، مخصصة للدقة العالية جداً والأقمشة الفاخرة." }
            ],
            materials: [
                { name: "قماش (Fabric)", desc: "طباعة مباشرة على الأقمشة بألوان مشبعة وملمس ناعم.", icon: <Shirt /> },
                { name: "كانفز (Canvas)", desc: "تحويل الصور إلى لوحات فنية بجودة متاحف.", icon: <Image /> },
                { name: "استيكر (Sticker)", desc: "التصاق قوي وألوان مقاومة للخدش والعوامل الجوية.", icon: <Layers /> },
                { name: "بنر (Banner)", desc: "للوحات الإعلانية الخارجية العملاقة بدون لمعان مزعج.", icon: <ScrollText /> },
                { name: "فينيل (Vinyl)", desc: "مرونة عالية لتغليف السيارات والواجهات الزجاجية.", icon: <MoveHorizontal /> }
            ],
            stepsTitle: "تدفق العمل السريع"
        },
        en: {
            title: "The 5-Meter UV Roll Giant",
            subtitle: "Instant printing revolution. Two massive 5m machines print and cure in split seconds on any flexible media.",
            techBadge: "Instant LED UV Curing Tech",
            descriptionIntro: "Speed Meets Precision",
            description: "Forget waiting times. Our UV Roll technology means prints come out perfectly dry and ready for installation instantly. Thanks to dual print heads in our 5m machines, we offer insane production speeds with photographic color precision that dazzles, even on fabric!",
            machinesTitle: "Dual 5-Meter Powerhouse",
            materialsTitle: "Materials That Glow with UV",
            whatsappBtn: "Start Your Mega Project Now",
            machines: [
                { title: "Mega Beast 1", desc: "5m Width, ultra-speed for urgent, massive volume projects." },
                { title: "Precision Master 2", desc: "5m Width, dedicated for ultra-high precision and luxury fabrics." }
            ],
            materials: [
                { name: "Fabric", desc: "Direct printing on textiles with saturated colors and soft feel.", icon: <Shirt /> },
                { name: "Canvas", desc: "Turning photos into museum-quality art pieces.", icon: <Image /> },
                { name: "Sticker", desc: "Strong adhesion and scratch-resistant colors.", icon: <Layers /> },
                { name: "Banner", desc: "For giant outdoor billboards with no annoying glare.", icon: <ScrollText /> },
                { name: "Vinyl", desc: "High flexibility for car wrapping and glass facades.", icon: <MoveHorizontal /> }
            ],
            stepsTitle: "Rapid Workflow"
        }
    };

    const t = content[lang];

    // تأثير شعاع ضوء الـ UV المتحرك
    const UVLightBeam = () => (
        <motion.div
            animate={{ left: ["-100%", "200%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            style={{
                position: "absolute",
                top: 0,
                width: "50%",
                height: "100%",
                background: `linear-gradient(90deg, transparent, ${colors.accentNeon}80, ${colors.accentHot}80, transparent)`,
                transform: "skewX(-20deg)",
                filter: "blur(30px)",
                zIndex: 1,
                pointerEvents: "none"
            }}
        />
    );

    return (
        <div style={{
            backgroundColor: colors.bg, color: colors.textPrimary,
            fontFamily: isAr ? "'Tajawal', sans-serif" : "'Inter', sans-serif",
            direction: isAr ? "rtl" : "ltr", minHeight: "100vh", overflowX: "hidden", position: "relative"
        }}>

            {/* خلفية تفاعلية - نص الرول العملاق المتحرك */}
            <div style={{ position: "fixed", inset: 0, zIndex: 0, overflow: "hidden", pointerEvents: "none" }}>
                <motion.div
                    style={{
                        x: rollX,
                        position: "absolute", top: "40%",
                        fontSize: "25rem", fontWeight: "900", color: `${colors.accentNeon}05`,
                        whiteSpace: "nowrap", lineHeight: 0.8,
                        fontFamily: isAr ? "sans-serif" : "Impact, sans-serif", // خط ضخم
                        textTransform: "uppercase"
                    }}
                >
                    5 METER UV ROLL • INSTANT CURE • HIGH SPEED • FABRIC •
                </motion.div>
                {/* بقع ضوء نيون خلفية */}
                <div style={{ position: "absolute", top: "-20%", right: "-10%", width: "600px", height: "600px", background: colors.accentNeon, filter: "blur(200px)", opacity: 0.2 }} />
                <div style={{ position: "absolute", bottom: "-20%", left: "-10%", width: "600px", height: "600px", background: colors.accentHot, filter: "blur(200px)", opacity: 0.15 }} />
            </div>

            {/* === الهيدر الموحد === */}
            <nav style={{ position: "fixed", width: "100%", padding: "12px 5%", display: "flex", justifyContent: "space-between", alignItems: "center", zIndex: 100, borderBottom: `1px solid ${colors.accentNeon}30`, backdropFilter: "blur(20px)", background: `${colors.bg}95` }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <img src="/logos/logo.svg" alt="Logo" style={{ height: "40px" }} onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block' }} />
                    <span style={{ display: 'none', fontSize: "1.2rem", fontWeight: "900", color: colors.accentNeon, textShadow: `0 0 10px ${colors.accentNeon}` }}>MODERN DESIGN</span>
                </div>
                <button onClick={() => setLang(isAr ? "en" : "ar")} style={{ background: `linear-gradient(45deg, ${colors.accentNeon}30, ${colors.accentHot}30)`, border: `1px solid ${colors.accentNeon}`, color: "#fff", padding: "8px 22px", borderRadius: "30px", cursor: "pointer", fontWeight: "bold", display: "flex", alignItems: "center", gap: "8px" }}>
                    <Globe size={16} /> {isAr ? "English" : "عربي"}
                </button>
            </nav>

            {/* Hero Section - مع شعاع الـ UV المتحرك */}
            <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: "120px 20px 0", position: "relative", zIndex: 2, overflow: "hidden" }}>
                <UVLightBeam /> {/* شعاع الضوء */}

                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} style={{ padding: "10px 30px", borderRadius: "50px", background: `linear-gradient(90deg, ${colors.accentNeon}20, ${colors.accentHot}20)`, border: `1px solid ${colors.accentNeon}`, color: colors.accentNeon, fontWeight: "bold", marginBottom: "30px", display: "flex", alignItems: "center", gap: "10px", boxShadow: `0 0 30px ${colors.accentNeon}40` }}>
                    <Sun size={20} /> {t.techBadge}
                </motion.div>

                <h1 style={{ fontSize: "clamp(3rem, 9vw, 7rem)", fontWeight: 900, lineHeight: 1.1, marginBottom: "25px", textTransform: "uppercase" }}>
                    <span style={{ color: "#fff", textShadow: `0 0 20px ${colors.accentNeon}80` }}>{t.title.split(' ').slice(0, -2).join(' ')}</span><br />
                    <span style={{ background: `linear-gradient(to right, ${colors.accentNeon}, ${colors.accentHot}, ${colors.accentCyan})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", filter: "drop-shadow(0 0 15px rgba(168, 85, 247, 0.6))" }}>
                        {t.title.split(' ').slice(-2).join(' ')}
                    </span>
                </h1>

                <p style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)", color: colors.textSecondary, maxWidth: "950px", lineHeight: 1.7 }}>
                    {t.subtitle}
                </p>

                <motion.div style={{ marginTop: "60px" }} animate={{ y: [0, 10, 0], scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                    <Sparkles size={50} color={colors.accentHot} style={{ filter: "drop-shadow(0 0 10px #EC4899)" }} />
                </motion.div>
            </section>

            {/* الماكينات العملاقة */}
            <section style={{ padding: "120px 8%", position: "relative", zIndex: 2 }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "40px" }}>
                    <div>
                        <h2 style={{ fontSize: "3rem", fontWeight: "900", marginBottom: "30px", background: `linear-gradient(to right, #fff, ${colors.accentSecondary})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                            {t.descriptionIntro}
                        </h2>
                        <p style={{ fontSize: "1.3rem", lineHeight: "1.9", color: colors.textSecondary }}>{t.description}</p>
                    </div>
                    <div style={{ display: "grid", gap: "25px" }}>
                        <h3 style={{ fontSize: "2rem", color: "#fff", marginBottom: "10px", display: "flex", alignItems: "center", gap: "15px" }}>
                            <Cpu color={colors.accentCyan} /> {t.machinesTitle}
                        </h3>
                        {t.machines.map((m, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ scale: 1.02, borderColor: i === 0 ? colors.accentNeon : colors.accentHot }}
                                style={{
                                    padding: "35px",
                                    background: `linear-gradient(135deg, #0d041c, #070214)`,
                                    borderRadius: "25px", border: `2px solid ${i === 0 ? colors.accentNeon : colors.accentHot}40`,
                                    boxShadow: `0 10px 30px -10px ${i === 0 ? colors.accentNeon : colors.accentHot}30`,
                                    display: "flex", alignItems: "center", gap: "20px"
                                }}
                            >
                                <motion.div style={{ rotate: gearRotate }} transition={{ repeat: Infinity, duration: 10, ease: "linear" }}>
                                    <Printer size={40} color={i === 0 ? colors.accentNeon : colors.accentHot} />
                                </motion.div>
                                <div>
                                    <h4 style={{ fontSize: "1.5rem", marginBottom: "8px", color: "#fff" }}>{m.title}</h4>
                                    <p style={{ color: colors.textSecondary, margin: 0 }}>{m.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* الخامات (تفاعلية ومضيئة) */}
            <section style={{ padding: "100px 5%", position: "relative", zIndex: 2 }}>
                <h2 style={{ textAlign: "center", fontSize: "3rem", marginBottom: "70px", fontWeight: "900" }}>
                    <span style={{ borderBottom: `4px solid ${colors.accentHot}`, paddingBottom: "10px" }}>{t.materialsTitle}</span>
                </h2>
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "30px" }}>
                    {t.materials.map((mat, i) => (
                        <motion.div
                            key={i}
                            whileHover={{
                                y: -15,
                                backgroundColor: "#14062b",
                                boxShadow: `0 0 40px ${[colors.accentNeon, colors.accentHot, colors.accentCyan][i % 3]}60`,
                                border: `2px solid ${[colors.accentNeon, colors.accentHot, colors.accentCyan][i % 3]}`
                            }}
                            transition={{ duration: 0.3 }}
                            style={{
                                flex: "1 1 200px", maxWidth: "250px", padding: "40px 25px",
                                background: "#0d041c", borderRadius: "30px", textAlign: "center",
                                border: `2px solid #ffffff10`, cursor: "pointer", position: "relative", overflow: "hidden"
                            }}
                        >
                            {/* وميض عند التحويم */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileHover={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at center, ${[colors.accentNeon, colors.accentHot, colors.accentCyan][i % 3]}30, transparent)`, zIndex: 0 }}
                            />
                            <div style={{ position: "relative", zIndex: 1 }}>
                                <div style={{ color: [colors.accentNeon, colors.accentHot, colors.accentCyan][i % 3], marginBottom: "25px", filter: `drop-shadow(0 0 8px ${[colors.accentNeon, colors.accentHot, colors.accentCyan][i % 3]})` }}>
                                    {React.cloneElement(mat.icon, { size: 50 })}
                                </div>
                                <h3 style={{ fontSize: "1.5rem", marginBottom: "15px", color: "#fff" }}>{mat.name}</h3>
                                <p style={{ color: colors.textSecondary, fontSize: "0.95rem", lineHeight: 1.6 }}>{mat.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* مراحل العمل (مضيئة) */}
            <section style={{ padding: "120px 5%", position: "relative", zIndex: 2, background: "#05010f" }}>
                <h2 style={{ textAlign: "center", fontSize: "2.8rem", marginBottom: "70px" }}>{t.stepsTitle}</h2>
                <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "40px" }}>
                    {["تركيب الرول العملاق", "الطباعة بسرعات جنونية", "التجفيف الفوري بالـ LED", "جاهز للتسليم"].map((step, i) => (
                        <div key={i} style={{ textAlign: "center", width: "220px", position: "relative" }}>
                            <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: `linear-gradient(135deg, ${colors.accentNeon}, ${colors.accentHot})`, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 25px", fontSize: "2rem", fontWeight: "bold", boxShadow: `0 0 30px ${colors.accentNeon}50`, border: "3px solid #fff" }}>
                                <Zap size={35} />
                            </div>
                            <h3 style={{ fontSize: "1.3rem", color: "#fff" }}>{step}</h3>
                            {i < 3 && <Wind size={30} color={colors.accentCyan} style={{ position: "absolute", top: "25px", [isAr ? "left" : "right"]: "-30px", opacity: 0.5, transform: isAr ? "rotate(180deg)" : "" }} />}
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section style={{ padding: "100px 20px 160px", textAlign: "center", zIndex: 2 }}>
                <motion.div whileHover={{ scale: 1.02 }} style={{ maxWidth: "900px", margin: "0 auto", padding: "80px 40px", borderRadius: "60px", background: `linear-gradient(135deg, ${colors.accentNeon}30, ${colors.accentHot}20, transparent)`, border: `2px solid ${colors.accentNeon}`, boxShadow: `0 0 60px ${colors.accentNeon}30`, backdropFilter: "blur(20px)" }}>
                    <h2 style={{ fontSize: "clamp(2rem, 6vw, 4rem)", fontWeight: 900, marginBottom: "40px", lineHeight: 1.2 }}>
                        {isAr ? "هل أنت جاهز لمشاريع بحجم 5 أمتار؟" : "Ready for 5-Meter Scale Projects?"}<br />
                        <span style={{ color: colors.accentHot, textShadow: `0 0 15px ${colors.accentHot}` }}>{isAr ? "دعنا نبهرك بالسرعة" : "Let us amaze you with speed"}</span>
                    </h2>
                    <a href={`https://wa.me/${whatsappNumber}`} target="_blank" style={{ display: "inline-flex", alignItems: "center", gap: "15px", background: `linear-gradient(90deg, ${colors.accentNeon}, ${colors.accentHot})`, color: "#fff", padding: "22px 55px", borderRadius: "100px", textDecoration: "none", fontWeight: "bold", fontSize: "1.4rem", boxShadow: `0 15px 50px ${colors.accentNeon}60`, border: "2px solid #fff" }}>
                        <MessageCircle size={32} /> {t.whatsappBtn}
                    </a>
                </motion.div>
            </section>

            {/* الفوتر الموحد */}
            <footer style={{ padding: "60px 20px", textAlign: "center", borderTop: `1px solid ${colors.accentNeon}20`, color: colors.textSecondary, zIndex: 2, background: "#030008" }}>
                <p style={{ opacity: 0.7, fontSize: "1rem", letterSpacing: "1px" }}>
                    {isAr ? "جميع الحقوق محفوظة © التصميم الحديث 2026" : "All Rights Reserved © Modern Design 2026"}
                </p>
            </footer>

        </div>
    );
};

export default UVRollPage;