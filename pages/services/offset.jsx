import React, { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
    Layers, Book, Copy, Zap, MessageCircle,
    ArrowDownCircle, Globe, Printer, Layout,
    Package, Repeat, Gauge
} from "lucide-react";

const OffsetPrintingPage = () => {
    const [lang, setLang] = useState("ar");
    const isAr = lang === "ar";
    const whatsappNumber = "966557480817";

    const { scrollYProgress } = useScroll();
    const rotateCylinder = useTransform(scrollYProgress, [0, 1], [0, 360]);
    const scrollWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    const colors = {
        bg: "#040712", // كحلي غامق جداً (ليل الحبر)
        textPrimary: "#ffffff",
        textSecondary: "#94a3b8",
        accent: "#2E5BFF", // أزرق ملكي احترافي
        cyan: "#00aeef",
        magenta: "#ec008c",
        yellow: "#fff200",
        black: "#231f20"
    };

    const content = {
        ar: {
            title: "طباعة الأوفست العملاقة",
            subtitle: "حلول الطباعة للكميات الضخمة بأعلى معايير الجودة العالمية. دقة ألوان مذهلة وتكلفة اقتصادية للمشاريع الكبيرة.",
            techBadge: "نظام CMYK للطباعة المستمرة",
            descriptionIntro: "لماذا الأوفست؟",
            description: "عندما تتحدث عن الملايين، تتحدث عن الأوفست. تقنية تعتمد على نقل الحبر من ألواح الزنك إلى سلندرات مطاطية ثم إلى الورق، مما يضمن ثبات اللون بنسبة 100% من النسخة الأولى وحتى المليون. هي الخيار الأمثل للمجلات، البروشورات، وعلب المنتجات.",
            servicesTitle: "خدمات الإنتاج الكمي",
            stepsTitle: "خط الإنتاج الذكي",
            whatsappBtn: "اطلب الكمية الآن واتساب",
            services: [
                { name: "المطبوعات التجارية", desc: "بروشورات، فلايرز، وفولدرات الشركات بكميات ضخمة وتشطيب فاخر.", icon: <Copy size={32} /> },
                { name: "المجلات والكتب", desc: "طباعة المجلات الدورية والكتب التعليمية والثقافية بجودة صور فوتوغرافية.", icon: <Book size={32} /> },
                { name: "التغليف والكرتون", desc: "تصنيع وطباعة علب المنتجات الغذائية والطبية بأحبار آمنة وجودة عالية.", icon: <Package size={32} /> }
            ],
            steps: [
                { t: "فرز الألوان (C-M-Y-K)", d: "تحليل التصميم إلى أربعة ألوان أساسية وتجهيز أفلام الطباعة." },
                { t: "تجهيز ألواح الزنك", d: "حفر التصميم على ألواح الألومنيوم الخاصة بكل لون بدقة ليزرية." },
                { t: "ضبط الماكينة (Setup)", d: "معايرة تدفق الحبر وضغط السلندرات لضمان حدة التفاصيل." },
                { t: "الطباعة والقص", d: "دوران الماكينة بسرعة البرق، تليها عمليات القص والطي والتجميع." }
            ],
            galleryTitle: "روائع الإنتاج الضخم",
            gallery: [
                { id: 1, src: "https://i.pinimg.com/1200x/28/61/36/2861363d8fbd4880b446a073ce32c365.jpg", title: "طباعة كتب فاخرة" },
                { id: 2, src: "https://i.pinimg.com/1200x/1e/12/d7/1e12d7fc8b4baf143c05d9335cfdf295.jpg", title: "بروشورات وفلايرز" },
                { id: 3, src: "https://i.pinimg.com/736x/91/a0/4a/91a04a2810006c96eb4194b6fe44d48e.jpg", title: "تغليف وعلب منتجات" },
                { id: 4, src: "https://i.pinimg.com/1200x/b5/9c/f0/b59cf03d5b06a610a3e32d4c52c7d8a1.jpg", title: "مجلدات ومجلات" },
            ]
        },
        en: {
            title: "Giant Offset Printing",
            subtitle: "High-volume printing solutions with premium global standards. Amazing color consistency for large scale projects.",
            techBadge: "CMYK Continuous Press",
            descriptionIntro: "Why Offset?",
            description: "When it comes to millions, Offset is the king. Technology that transfers ink from plates to rubber blankets then to paper, ensuring 100% color consistency from the first to the millionth copy.",
            servicesTitle: "Mass Production Services",
            stepsTitle: "Smart Production Line",
            whatsappBtn: "Order Bulk via WhatsApp",
            services: [
                { name: "Commercial Prints", desc: "Brochures, flyers, and corporate folders in bulk with premium finishes.", icon: <Copy size={32} /> },
                { name: "Books & Magazines", desc: "Printing periodic magazines and books with photographic image quality.", icon: <Book size={32} /> },
                { name: "Packaging & Boxes", desc: "Manufacturing product boxes with safe inks and high-quality materials.", icon: <Package size={32} /> }
            ],
            steps: [
                { t: "Color Separation", d: "Analyzing design into 4 primary colors and preparing printing films." },
                { t: "Plate Making", d: "Engraving the design onto aluminum plates with laser precision." },
                { t: "Machine Setup", d: "Calibrating ink flow and cylinder pressure for sharp details." },
                { t: "Press & Cut", d: "Lightning-fast printing followed by cutting and folding." }
            ],
            galleryTitle: "Mass Production Works",
            gallery: [
                { id: 1, src: "https://i.pinimg.com/1200x/28/61/36/2861363d8fbd4880b446a073ce32c365.jpg", title: "Premium Book Printing" },
                { id: 2, src: "https://i.pinimg.com/1200x/1e/12/d7/1e12d7fc8b4baf143c05d9335cfdf295.jpg", title: "Brochures & Flyers" },
                { id: 3, src: "https://i.pinimg.com/736x/91/a0/4a/91a04a2810006c96eb4194b6fe44d48e.jpg", title: "Product Packaging" },
                { id: 4, src: "https://i.pinimg.com/1200x/b5/9c/f0/b59cf03d5b06a610a3e32d4c52c7d8a1.jpg", title: "Magazines & Folders" },
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

            {/* مؤشر تقدم الورق (تأثير السحب) */}
            <motion.div style={{ position: "fixed", top: 0, left: 0, height: "4px", background: `linear-gradient(to right, ${colors.cyan}, ${colors.magenta}, ${colors.yellow}, ${colors.black})`, width: scrollWidth, zIndex: 1000 }} />

            {/* خلفية تفاعلية بلمسات CMYK */}
            <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
                <div style={{ position: "absolute", top: "10%", left: "5%", width: "300px", height: "300px", background: colors.cyan, filter: "blur(150px)", opacity: 0.15 }} />
                <div style={{ position: "absolute", bottom: "10%", right: "5%", width: "300px", height: "300px", background: colors.magenta, filter: "blur(150px)", opacity: 0.15 }} />
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
                <button onClick={() => setLang(isAr ? "en" : "ar")} style={{ background: `${colors.accent}20`, border: `1px solid ${colors.accent}50`, color: "#fff", padding: "8px 22px", borderRadius: "30px", cursor: "pointer", fontWeight: "bold" }}>
                    {isAr ? "English" : "عربي"}
                </button>
            </nav>

            {/* Hero Section */}
            <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: "120px 20px 0", position: "relative", zIndex: 2 }}>
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ padding: "8px 25px", borderRadius: "30px", background: `${colors.accent}15`, border: `1px solid ${colors.accent}`, color: colors.accent, fontWeight: "bold", marginBottom: "30px", display: "flex", alignItems: "center", gap: "10px" }}>
                    <Repeat size={18} /> {t.techBadge}
                </motion.div>

                <h1 style={{ fontSize: "clamp(2.5rem, 8vw, 6rem)", fontWeight: 900, lineHeight: 1, marginBottom: "25px" }}>
                    {t.title}
                </h1>

                <p style={{ fontSize: "clamp(1.1rem, 2vw, 1.5rem)", color: colors.textSecondary, maxWidth: "900px", lineHeight: 1.7 }}>
                    {t.subtitle}
                </p>

                <motion.div style={{ marginTop: "60px" }} animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 10, ease: "linear" }}>
                    <Printer size={50} color={colors.accent} style={{ opacity: 0.5 }} />
                </motion.div>
            </section>

            {/* الميزات والوصف */}
            <section style={{ padding: "100px 8%", position: "relative", zIndex: 2 }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "60px", alignItems: "center" }}>
                    <motion.div initial={{ opacity: 0, x: isAr ? 50 : -50 }} whileInView={{ opacity: 1, x: 0 }}>
                        <h2 style={{ fontSize: "2.8rem", color: colors.accent, marginBottom: "25px", fontWeight: "900" }}>{t.descriptionIntro}</h2>
                        <p style={{ fontSize: "1.25rem", lineHeight: "1.9", color: colors.textSecondary }}>{t.description}</p>
                    </motion.div>

                    {/* شكل توضيحي للـ CMYK */}
                    <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
                        {[colors.cyan, colors.magenta, colors.yellow, colors.black].map((c, i) => (
                            <motion.div
                                key={i}
                                initial={{ height: 0 }}
                                whileInView={{ height: "200px" }}
                                transition={{ delay: i * 0.1, duration: 1 }}
                                style={{ width: "40px", background: c, borderRadius: "20px", boxShadow: `0 0 20px ${c}40` }}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* الخدمات الكمية */}
            <section style={{ padding: "100px 8%", position: "relative", zIndex: 2, background: "#060b1a" }}>
                <h2 style={{ textAlign: "center", fontSize: "3rem", marginBottom: "70px", fontWeight: "900" }}>{t.servicesTitle}</h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "30px" }}>
                    {t.services.map((s, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -10, backgroundColor: "#0c1530" }}
                            style={{ padding: "50px 35px", background: "#080e21", borderRadius: "30px", border: "1px solid #1e293b", transition: "0.3s" }}
                        >
                            <div style={{ color: colors.accent, marginBottom: "25px" }}>{s.icon}</div>
                            <h3 style={{ fontSize: "1.6rem", marginBottom: "15px", color: colors.textPrimary }}>{s.name}</h3>
                            <p style={{ color: colors.textSecondary, lineHeight: 1.6 }}>{s.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* مراحل العمل */}
            <section style={{ padding: "120px 5%", position: "relative", zIndex: 2 }}>
                <h2 style={{ textAlign: "center", fontSize: "2.8rem", marginBottom: "70px" }}>{t.stepsTitle}</h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "25px" }}>
                    {t.steps.map((step, i) => (
                        <div key={i} style={{ padding: "40px", background: "#0a1128", borderRadius: "30px", position: "relative", overflow: "hidden", border: `1px solid ${colors.accent}20` }}>
                            {/* الأرقام واضحة كما طلبت */}
                            <div style={{ position: "absolute", top: "-10px", [isAr ? "left" : "right"]: "10px", fontSize: "7rem", fontWeight: "900", color: "rgba(255, 255, 255, 0.05)", zIndex: 0 }}>
                                {i + 1}
                            </div>
                            <div style={{ position: "relative", zIndex: 1 }}>
                                <Gauge size={24} color={colors.accent} style={{ marginBottom: "15px" }} />
                                <h3 style={{ fontSize: "1.3rem", color: colors.accent, marginBottom: "10px" }}>{step.t}</h3>
                                <p style={{ fontSize: "0.95rem", color: colors.textSecondary, lineHeight: 1.5 }}>{step.d}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* المعرض */}
            <section style={{ padding: "100px 5%", position: "relative", zIndex: 2 }}>
                <h2 style={{ textAlign: "center", fontSize: "2.5rem", marginBottom: "50px" }}>{t.galleryTitle}</h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "25px" }}>
                    {t.gallery.map(img => (
                        <motion.div key={img.id} whileHover={{ scale: 1.03 }} style={{ height: "380px", borderRadius: "30px", overflow: "hidden", position: "relative", border: "1px solid #1e293b" }}>
                            <img src={img.src} alt={img.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #040712 20%, transparent)" }} />
                            <div style={{ position: "absolute", bottom: "25px", width: "100%", textAlign: "center", color: colors.accent, fontWeight: "bold", fontSize: "1.2rem" }}>{img.title}</div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section style={{ padding: "100px 20px 140px", textAlign: "center", zIndex: 2 }}>
                <div style={{ maxWidth: "850px", margin: "0 auto", padding: "80px 40px", borderRadius: "50px", background: `linear-gradient(135deg, ${colors.accent}20, transparent)`, border: `1px solid ${colors.accent}30` }}>
                    <h2 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900, marginBottom: "40px" }}>
                        {isAr ? "ثبات الألوان في المليون نسخة كالأولى تماماً" : "Color consistency from the first to the millionth copy"}
                    </h2>
                    <a href={`https://wa.me/${whatsappNumber}`} target="_blank" style={{ display: "inline-flex", alignItems: "center", gap: "15px", backgroundColor: colors.accent, color: "#fff", padding: "20px 50px", borderRadius: "100px", textDecoration: "none", fontSize: "1.3rem", fontWeight: "bold", boxShadow: `0 10px 40px ${colors.accent}40` }}>
                        <MessageCircle size={30} /> {t.whatsappBtn}
                    </a>
                </div>
            </section>

            {/* الفوتر الموحد */}
            <footer style={{ padding: "50px 20px", textAlign: "center", borderTop: `1px solid ${colors.accent}10`, color: colors.textSecondary, zIndex: 2, background: "#02040a" }}>
                <p style={{ opacity: 0.6, fontSize: "0.9rem", letterSpacing: "1px" }}>
                    {isAr ? "جميع الحقوق محفوظة © التصميم الحديث 2026" : "All Rights Reserved © Modern Design 2026"}
                </p>
            </footer>

        </div>
    );
};

export default OffsetPrintingPage;