import React, { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
    CreditCard, PenTool, Gift, Layers, MessageCircle,
    ArrowDownCircle, Globe, Zap, Palette,
    Smartphone, BookOpen, Award, CheckCircle2
} from "lucide-react";

const UVPrintingPage = () => {
    const [lang, setLang] = useState("ar");
    const isAr = lang === "ar";
    const whatsappNumber = "966557480817";

    const { scrollYProgress } = useScroll();
    const rotateDots = useTransform(scrollYProgress, [0, 1], [0, 360]);

    const colors = {
        bg: "#0d0b09", // خلفية داكنة جداً بلمحة دافئة
        textPrimary: "#ffffff",
        textSecondary: "#d1d5db",
        accent: "#F39320", // لونك المعتمد للـ UV
        accentLight: "#ffb85f"
    };

    const content = {
        ar: {
            title: "طباعة الـ UV الرقمية",
            subtitle: "تكنولوجيا الطباعة المباشرة على الأسطح الصلبة. دقة فوتوغرافية وثبات مذهل على الهدايا، البطائق، والأكريليك.",
            techBadge: "طباعة ديجيتال فورية (Direct to Substrate)",
            descriptionIntro: "ما هي طباعة الـ UV؟",
            description: "هي أحدث صيحات الطباعة العالمية، حيث يتم تجفيف الحبر فوراً باستخدام الأشعة فوق البنفسجية. تمتاز بقدرتها على الطباعة فوق أي مادة (بلاستيك، معدن، جلد، خشب) مع إمكانية إضافة ملمس بارز (Varnish) يعطي فخامة لا تضاهى.",
            productsTitle: "منتجات الطباعة المسطحة",
            stepsTitle: "كيف نخرج إبداعك؟",
            whatsappBtn: "ابدأ مشروعك الآن واتساب",
            products: [
                { name: "بطائق ID وبادجات", desc: "طباعة بطائق الموظفين والبطائق التعريفية بدقة عالية وألوان ثابتة لا تبهت.", icon: <CreditCard size={32} /> },
                { name: "أقلام وهدايا مخصصة", desc: "نطبع شعارك على الأقلام، الحوافظ الحرارية (Mugs)، والدفاتر بدقة ميكرونية.", icon: <Gift size={32} /> },
                { name: "أكريليك ومواد صلبة", desc: "طباعة مباشرة على الأكريليك والخشب لعمل الدروع التذكارية واللوحات الفاخرة.", icon: <Layers size={32} /> }
            ],
            steps: [
                { t: "معالجة السطح", d: "تنظيف الخامة وتجهيزها لضمان أقصى درجات التصاق الحبر." },
                { t: "ضبط القوالب (Jigs)", d: "وضع المنتجات في قوالب خاصة لضمان استقامة الطباعة بنسبة 100%." },
                { t: "الطباعة الفورية", d: "رش الحبر وتجفيفه بلمبات الـ UV في نفس اللحظة." },
                { t: "إضافة الورنيش", d: "إضافة طبقة حماية شفافة أو بروز جمالي فوق أجزاء محددة من التصميم." }
            ],
            galleryTitle: "نماذج من طباعة الـ UV",
            gallery: [
                { id: 1, src: "https://i.pinimg.com/1200x/26/9a/11/269a11fe38fe13850e1771af29944134.jpg", title: "طباعة بطائق ذكية" },
                { id: 2, src: "https://www.eloquentprints.com/wp-content/uploads/2020/02/gift-branding-methods.jpg", title: "هدايا وعبوات فاخرة" },
                { id: 3, src: "https://www.cpsdotpk.store/wp-content/uploads/2020/05/Name-Pen-Collage.png", title: "أقلام مكتبية بشعارك" },
                { id: 4, src: "https://cpimg.tistatic.com/01679041/b/5/Acrylic-Shield-Award-Trophy.jpg", title: "دروع أكريليك ملونة" },
            ]
        },
        en: {
            title: "Digital UV Printing",
            subtitle: "Direct-to-substrate printing technology. Photographic precision and amazing durability on gifts, cards, and acrylic.",
            techBadge: "Instant UV Curing Tech",
            descriptionIntro: "What is UV Printing?",
            description: "The latest in global printing. Ink is cured instantly using ultraviolet light. It can print on any material (Plastic, Metal, Leather, Wood) with the ability to add 3D textured varnish for ultimate luxury.",
            productsTitle: "UV Flatbed Products",
            stepsTitle: "The UV Process",
            whatsappBtn: "Start via WhatsApp",
            products: [
                { name: "ID Cards & Badges", desc: "Printing employee IDs and badges with high resolution and non-fading colors.", icon: <CreditCard size={32} /> },
                { name: "Pens & Custom Gifts", desc: "Printing your logo on pens, thermal flasks, and notebooks with micron precision.", icon: <Gift size={32} /> },
                { name: "Acrylic & Rigid Media", desc: "Direct printing on acrylic and wood for trophies and luxury signage.", icon: <Layers size={32} /> }
            ],
            steps: [
                { t: "Surface Prepping", d: "Cleaning the material to ensure maximum ink adhesion." },
                { t: "Jig Positioning", d: "Placing products in custom jigs for 100% printing alignment." },
                { t: "Instant Printing", d: "Ink jetting and UV curing happening simultaneously." },
                { t: "Varnish Finish", d: "Adding a clear protective layer or 3D embossed effect." }
            ],
            galleryTitle: "UV Printing Gallery",
            gallery: [
                { id: 1, src: "https://i.pinimg.com/1200x/26/9a/11/269a11fe38fe13850e1771af29944134.jpg", title: "Smart Card Printing" },
                { id: 2, src: "https://www.eloquentprints.com/wp-content/uploads/2020/02/gift-branding-methods.jpg", title: "Luxury Packaging" },
                { id: 3, src: "https://www.cpsdotpk.store/wp-content/uploads/2020/05/Name-Pen-Collage.png", title: "Branded Pens" },
                { id: 4, src: "https://cpimg.tistatic.com/01679041/b/5/Acrylic-Shield-Award-Trophy.jpg", title: "Acrylic Trophies" },
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

            {/* عناصر خلفية برتقالية ناعمة */}
            <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 10, repeat: Infinity }}
                    style={{ position: "absolute", top: "20%", right: "-10%", width: "50vw", height: "50vw", background: `radial-gradient(circle, ${colors.accent}15 0%, transparent 70%)`, filter: "blur(80px)" }}
                />
            </div>

            {/* === الهيدر الموحد === */}
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
                <button onClick={() => setLang(isAr ? "en" : "ar")} style={{ background: `${colors.accent}20`, border: `1px solid ${colors.accent}40`, color: "#fff", padding: "8px 22px", borderRadius: "30px", cursor: "pointer", fontWeight: "bold" }}>
                    {isAr ? "English" : "عربي"}
                </button>
            </nav>

            {/* Hero Section */}
            <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: "120px 20px 0", position: "relative", zIndex: 2 }}>
                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} style={{ padding: "8px 25px", borderRadius: "30px", background: `linear-gradient(45deg, ${colors.accent}30, transparent)`, border: `1px solid ${colors.accent}`, color: colors.accent, fontWeight: "bold", marginBottom: "30px" }}>
                    <Zap size={18} inline style={{ margin: "0 8px", verticalAlign: "middle" }} /> {t.techBadge}
                </motion.div>

                <h1 style={{ fontSize: "clamp(2.5rem, 8vw, 5.5rem)", fontWeight: 900, lineHeight: 1, marginBottom: "25px" }}>
                    {t.title.split(' ').map((word, i) => i === 2 ? <span key={i} style={{ color: colors.accent }}>{word} </span> : word + ' ')}
                </h1>

                <p style={{ fontSize: "clamp(1.1rem, 2vw, 1.5rem)", color: colors.textSecondary, maxWidth: "850px", lineHeight: 1.7 }}>
                    {t.subtitle}
                </p>

                <motion.div style={{ marginTop: "50px" }} animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
                    <ArrowDownCircle size={45} color={colors.accent} style={{ opacity: 0.7 }} />
                </motion.div>
            </section>

            {/* المنتجات - بطاقات تفاعلية */}
            <section style={{ padding: "100px 8%", position: "relative", zIndex: 2 }}>
                <h2 style={{ textAlign: "center", fontSize: "2.8rem", marginBottom: "60px", fontWeight: "900" }}>{t.productsTitle}</h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "30px" }}>
                    {t.products.map((p, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -15, borderColor: colors.accent }}
                            style={{ padding: "50px 35px", background: "#ffffff05", borderRadius: "40px", border: "1px solid #ffffff10", transition: "0.3s" }}
                        >
                            <div style={{ background: `${colors.accent}15`, width: "70px", height: "70px", borderRadius: "20px", display: "flex", alignItems: "center", justifyContent: "center", color: colors.accent, marginBottom: "30px" }}>
                                {p.icon}
                            </div>
                            <h3 style={{ fontSize: "1.6rem", marginBottom: "15px", color: colors.accent }}>{p.name}</h3>
                            <p style={{ color: colors.textSecondary, lineHeight: 1.6, fontSize: "1.1rem" }}>{p.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* وصف العملية */}
            <section style={{ padding: "80px 8%", position: "relative", zIndex: 2 }}>
                <div style={{ background: `linear-gradient(135deg, ${colors.accent}10, transparent)`, padding: "60px", borderRadius: "50px", border: `1px solid ${colors.accent}20` }}>
                    <h2 style={{ fontSize: "2.5rem", marginBottom: "25px" }}>{t.descriptionIntro}</h2>
                    <p style={{ fontSize: "1.3rem", lineHeight: 1.8, color: colors.textSecondary, maxWidth: "1000px" }}>{t.description}</p>
                </div>
            </section>

            {/* خطوات العمل (الأرقام واضحة) */}
            <section style={{ padding: "100px 5%", position: "relative", zIndex: 2 }}>
                <h2 style={{ textAlign: "center", fontSize: "2.8rem", marginBottom: "70px" }}>{t.stepsTitle}</h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "25px" }}>
                    {t.steps.map((step, i) => (
                        <div key={i} style={{ padding: "40px", background: "#151210", borderRadius: "30px", position: "relative", overflow: "hidden", border: "1px solid #2a2520" }}>
                            {/* الرقم الخلفي الواضح */}
                            <div style={{ position: "absolute", top: "-10px", [isAr ? "left" : "right"]: "10px", fontSize: "7rem", fontWeight: "900", color: "rgba(255, 255, 255, 0.05)", zIndex: 0 }}>
                                {i + 1}
                            </div>
                            <div style={{ position: "relative", zIndex: 1 }}>
                                <CheckCircle2 size={24} color={colors.accent} style={{ marginBottom: "15px" }} />
                                <h3 style={{ fontSize: "1.3rem", color: colors.accent, marginBottom: "10px" }}>{step.t}</h3>
                                <p style={{ fontSize: "0.95rem", color: colors.textSecondary, lineHeight: 1.5 }}>{step.d}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* المعرض */}
            <section style={{ padding: "100px 0", position: "relative", zIndex: 2 }}>
                <h2 style={{ textAlign: "center", fontSize: "2.5rem", marginBottom: "50px" }}>{t.galleryTitle}</h2>
                <div style={{ display: "flex", gap: "25px", overflowX: "auto", padding: "0 5% 50px" }}>
                    {t.gallery.map(img => (
                        <motion.div key={img.id} whileHover={{ scale: 1.02 }} style={{ minWidth: "300px", height: "400px", borderRadius: "30px", overflow: "hidden", position: "relative" }}>
                            <img src={img.src} alt={img.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #000 20%, transparent)" }} />
                            <div style={{ position: "absolute", bottom: "25px", width: "100%", textAlign: "center", color: colors.accent, fontWeight: "bold" }}>{img.title}</div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section style={{ padding: "100px 20px 140px", textAlign: "center", zIndex: 2 }}>
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} style={{ maxWidth: "850px", margin: "0 auto", padding: "80px 40px", borderRadius: "50px", background: `linear-gradient(135deg, ${colors.accent}20, transparent)`, border: `1px solid ${colors.accent}30` }}>
                    <h2 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900, marginBottom: "40px" }}>
                        {isAr ? "اطبع شعارك على أي سطح بجودة الـ UV" : "Print your logo on any surface with UV quality"}
                    </h2>
                    <a href={`https://wa.me/${whatsappNumber}`} target="_blank" style={{ display: "inline-flex", alignItems: "center", gap: "15px", backgroundColor: colors.accent, color: "#fff", padding: "20px 50px", borderRadius: "100px", textDecoration: "none", fontSize: "1.3rem", fontWeight: "bold", boxShadow: `0 10px 40px ${colors.accent}30` }}>
                        <MessageCircle size={30} /> {t.whatsappBtn}
                    </a>
                </motion.div>
            </section>

            {/* الفوتر الموحد */}
            <footer style={{ padding: "50px 20px", textAlign: "center", borderTop: `1px solid ${colors.accent}10`, color: colors.textSecondary, zIndex: 2, background: "#080706" }}>
                <p style={{ opacity: 0.6, fontSize: "0.9rem", letterSpacing: "1px" }}>
                    {isAr ? "جميع الحقوق محفوظة © التصميم الحديث 2026" : "All Rights Reserved © Modern Design 2026"}
                </p>
            </footer>

        </div>
    );
};

export default UVPrintingPage;