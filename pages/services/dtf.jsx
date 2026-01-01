import React, { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Printer, Zap, Layers, ShieldCheck, Globe, MessageCircle, ArrowDownCircle, Palette, CheckCircle2 } from "lucide-react";

const DTFPage = () => {
    const [lang, setLang] = useState("ar");
    const isAr = lang === "ar";
    const whatsappNumber = "966557480817";

    // إعدادات التمرير والبارالاكس (لجعل العناصر تتحرك مع السكرول)
    const { scrollYProgress } = useScroll();
    const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

    // باليت الألوان الاحترافية (تباين عالي)
    const colors = {
        bg: "#080c17",
        textPrimary: "#ffffff",
        textSecondary: "#cbd5e1",
        accent: "#22d3ee",
        accentPurple: "#a855f7"
    };

    const content = {
        ar: {
            title: "تكنولوجيا الطباعة الرقمية DTF",
            subtitle: "حلول طباعة متطورة تنبض بالحياة على كافة أنواع الأقمشة.",
            descriptionIntro: "ما هي تقنية الـ DTF؟",
            description: "هي اختصار لـ Direct to Film. تقنية ثورية تعتمد على طباعة تصميمك بأحبار مائية خاصة على فيلم شفاف، ثم تغطيته ببودرة حرارية. النتيجة؟ طباعة مرنة، زاهية الألوان، وتعيش طويلاً على أي نوع قماش دون تشقق أو بهتان.",
            whyTitle: "لماذا تختار خدمة DTF لدينا؟",
            stepsTitle: "كيف تتم عملية الطباعة؟",
            whatsappBtn: "اطلب عبر واتساب الآن",
            features: [
                { title: "توافق كامل", text: "نطبع على القطن، البوليستر، الجينز، وحتى الجلود." },
                { title: "جودة غسيل مذهلة", text: "ثبات عالٍ للألوان يتحمل مئات المرات من الغسيل." },
                { title: "دقة فوتوغرافية", text: "قدرة عالية على إظهار التدرجات اللونية المعقدة." }
            ],
            steps: [
                { t: "الطباعة الرقمية", d: "طباعة التصميم بدقة عالية على فيلم PET مخصص." },
                { t: "إضافة المسحوق", d: "تغطية الحبر ببودرة لاصقة تذوب بالحرارة." },
                { t: "المعالجة", d: "تجفيف الفيلم في فرن حراري لدمج الطبقات." },
                { t: "الكبس الحراري", d: "نقل التصميم للقماش باستخدام المكبس الاحترافي." }
            ],
            galleryTitle: "نماذج من نتائج أعمالنا",
            gallery: [
                { id: 1, src: "https://media.zid.store/thumbs/f7f85d0a-d70c-4c7d-a404-aa25596d8046/23698281-8f71-4ec1-a12b-0c4e28db9cac-thumbnail-500x500.png", title: "طباعة جرافيك ملونة" },
                { id: 2, src: "https://images.stylishop.com/cdn-cgi/image/format=avif/media/catalog/product/7008642024/images/7008642024_1.jpg?v=1", title: "تفاصيل دقيقة على الأسود" },
                { id: 3, src: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=600&auto=format&fit=crop", title: "تصميم شعارات معقدة" },
                { id: 4, src: "https://media.zid.store/thumbs/f7f85d0a-d70c-4c7d-a404-aa25596d8046/a950bbb7-af00-4768-8557-ef0dabd4b30b-thumbnail-500x500-70.jpg", title: "طباعة على الأبيض" },
            ]
        },
        en: {
            title: "Professional DTF Printing",
            subtitle: "Advanced printing solutions that bring designs to life on all fabrics.",
            descriptionIntro: "What is DTF Technology?",
            description: "Short for Direct to Film. A revolutionary technique printing your designs with special water-based inks onto clear film, then coated with thermal powder. The result? Flexible, vibrant prints that last long on any fabric without cracking.",
            whyTitle: "Why Choose Our DTF Service?",
            stepsTitle: "Our Printing Process",
            whatsappBtn: "Order via WhatsApp",
            features: [
                { title: "Full Compatibility", text: "We print on Cotton, Polyester, Denim, and even Leather." },
                { title: "Wash Durability", text: "High color fastness that withstands hundreds of washes." },
                { title: "Photo Precision", text: "Superior ability to display complex color gradients." }
            ],
            steps: [
                { t: "Digital Printing", d: "High-resolution printing on specialized PET film." },
                { t: "Powdering", d: "Applying thermal adhesive powder over the wet ink." },
                { t: "Curing", d: "Drying the film in a thermal oven to bond layers." },
                { t: "Heat Press", d: "Transferring the design to fabric using a pro press." }
            ],
            galleryTitle: "Our Printing Gallery",
            gallery: [
                { id: 1, src: "https://media.zid.store/thumbs/f7f85d0a-d70c-4c7d-a404-aa25596d8046/23698281-8f71-4ec1-a12b-0c4e28db9cac-thumbnail-500x500.png", title: "Colorful Graphic Print" },
                { id: 2, src: "https://images.stylishop.com/cdn-cgi/image/format=avif/media/catalog/product/7008642024/images/7008642024_1.jpg?v=1", title: "Fine Details on Black" },
                { id: 3, src: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=600&auto=format&fit=crop", title: "Complex Logo Design" },
                { id: 4, src: "https://media.zid.store/thumbs/f7f85d0a-d70c-4c7d-a404-aa25596d8046/a950bbb7-af00-4768-8557-ef0dabd4b30b-thumbnail-500x500-70.jpg", title: "Print on White T-Shirt" },
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

            {/* === 1. الخلفية المتحركة (Glowing Blobs) === */}
            <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
                <motion.div
                    animate={{ x: [0, 80, -40, 0], y: [0, -80, 40, 0], scale: [1, 1.2, 0.9, 1] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    style={{ position: "absolute", top: "-10%", left: "-10%", width: "50vw", height: "50vw", background: `radial-gradient(circle, ${colors.accent}35 0%, transparent 70%)`, filter: "blur(100px)", opacity: 0.7 }}
                />
                <motion.div
                    animate={{ x: [0, -100, 50, 0], y: [0, 100, -50, 0], scale: [1, 1.1, 0.8, 1] }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    style={{ position: "absolute", bottom: "-10%", right: "-10%", width: "60vw", height: "60vw", background: `radial-gradient(circle, ${colors.accentPurple}30 0%, transparent 70%)`, filter: "blur(120px)", opacity: 0.6 }}
                />
            </div>

            {/* === 2. الهيدر (مع اللوجو) === */}
            <nav style={{ position: "fixed", width: "100%", padding: "12px 5%", display: "flex", justifyContent: "space-between", alignItems: "center", zIndex: 100, borderBottom: `1px solid ${colors.accent}20`, backdropFilter: "blur(15px)", background: `${colors.bg}90` }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <img
                        src="/logos/logo.svg"
                        alt="Logo"
                        style={{ height: "40px", width: "auto", objectFit: "contain" }}
                        onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block' }}
                    />
                    <span style={{ display: 'none', fontSize: "1.2rem", fontWeight: "900", color: colors.accent }}>MODERN DESIGN</span>
                </div>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setLang(isAr ? "en" : "ar")}
                    style={{ background: `${colors.accent}15`, border: `1px solid ${colors.accent}40`, color: colors.textPrimary, padding: "8px 18px", borderRadius: "30px", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", fontWeight: "bold" }}
                >
                    <Globe size={16} /> {isAr ? "English" : "عربي"}
                </motion.button>
            </nav>

            {/* === 3. Hero Section (Parallax) === */}
            <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: "120px 20px 0", position: "relative" }}>
                <motion.div style={{ y: yBg, zIndex: 2, maxWidth: "1000px" }}>
                    <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} style={{ width: "fit-content", margin: "0 auto 25px", padding: "8px 20px", borderRadius: "30px", background: `linear-gradient(to right, ${colors.accent}20, ${colors.accentPurple}20)`, border: `1px solid ${colors.accent}40`, display: "flex", alignItems: "center", gap: "10px", fontSize: "0.9rem", color: colors.accent }}>
                        <Zap size={18} fill={colors.accent} /> {isAr ? "أحدث تقنيات الطباعة 2026" : "Cutting-edge Printing 2026"}
                    </motion.div>

                    <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} style={{ fontSize: "clamp(2.2rem, 8vw, 5.5rem)", fontWeight: 900, lineHeight: 1.1, marginBottom: "25px" }}>
                        {t.title.split(' ').map((word, i) => i >= t.title.split(' ').length - 1 ? <span key={i} style={{ color: colors.accent }}>{word} </span> : word + ' ')}
                    </motion.h1>

                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)", color: colors.textSecondary, maxWidth: "800px", margin: "0 auto", lineHeight: 1.6 }}>
                        {t.subtitle}
                    </motion.p>

                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} style={{ marginTop: "60px" }}>
                        <ArrowDownCircle color={colors.accent} size={45} style={{ animation: "bounce 2s infinite", opacity: 0.6 }} />
                    </motion.div>
                </motion.div>
                <style>{`@keyframes bounce { 0%, 20%, 50%, 80%, 100% {transform: translateY(0);} 40% {transform: translateY(-15px);} 60% {transform: translateY(-8px);} }`}</style>
            </section>

            {/* === 4. Description & Why Us (Scroll Reveal) === */}
            <section style={{ padding: "100px 8%", position: "relative", zIndex: 2 }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "80px", alignItems: "start" }}>
                    <motion.div initial={{ opacity: 0, x: isAr ? 40 : -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "25px" }}>
                            <Palette color={colors.accent} size={35} />
                            <h2 style={{ fontSize: "2.2rem", fontWeight: "bold", margin: 0 }}>{t.descriptionIntro}</h2>
                        </div>
                        <p style={{ lineHeight: "1.9", fontSize: "1.2rem", color: colors.textSecondary, borderRight: isAr ? `4px solid ${colors.accent}` : "none", borderLeft: isAr ? "none" : `4px solid ${colors.accent}`, padding: "0 25px" }}>
                            {t.description}
                        </p>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                        <h2 style={{ fontSize: "2rem", marginBottom: "40px", display: "flex", alignItems: "center", gap: "15px" }}>
                            <ShieldCheck color={colors.accentPurple} size={35} /> {t.whyTitle}
                        </h2>
                        <div style={{ display: "grid", gap: "25px" }}>
                            {t.features.map((f, i) => (
                                <div key={i} style={{ background: `${colors.accent}08`, padding: "25px", borderRadius: "20px", border: `1px solid ${colors.accent}20`, display: "flex", gap: "20px" }}>
                                    <CheckCircle2 color={colors.accent} size={24} style={{ minWidth: "24px", marginTop: "4px" }} />
                                    <div>
                                        <h3 style={{ margin: "0 0 8px 0", fontSize: "1.2rem", color: "#fff" }}>{f.title}</h3>
                                        <p style={{ margin: 0, color: colors.textSecondary, fontSize: "1rem", lineHeight: 1.5 }}>{f.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* === 5. Steps Section === */}
            <section style={{ padding: "120px 5%", position: "relative", zIndex: 2 }}>
                <div style={{ textAlign: "center", marginBottom: "70px" }}>
                    <Layers color={colors.accent} size={45} style={{ marginBottom: "20px" }} />
                    <h2 style={{ fontSize: "2.8rem", fontWeight: "900" }}>{t.stepsTitle}</h2>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "30px", maxWidth: "1200px", margin: "0 auto" }}>
                    {t.steps.map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            whileHover={{ y: -8, borderColor: colors.accent }}
                            transition={{ delay: i * 0.1, type: "spring" }}
                            viewport={{ once: true }}
                            style={{ padding: "45px 30px", borderRadius: "28px", background: `linear-gradient(145deg, #111a2e, #0a0f1d)`, border: `1px solid #1e293b`, textAlign: "center", position: "relative", overflow: "hidden" }}
                        >
                            <div style={{ position: "absolute", top: "-15px", [isAr ? "left" : "right"]: "-15px", fontSize: "5rem", fontWeight: "900", color: `${colors.accent}08`, zIndex: 0 }}>{i + 1}</div>
                            <div style={{ position: "relative", zIndex: 1 }}>
                                <h3 style={{ color: colors.accent, fontSize: "1.3rem", marginBottom: "15px" }}>{step.t}</h3>
                                <p style={{ color: colors.textSecondary, lineHeight: "1.6", fontSize: "0.95rem" }}>{step.d}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* === 6. Gallery Section (Translated Titles) === */}
            <section style={{ padding: "100px 0", position: "relative", zIndex: 2 }}>
                <h2 style={{ textAlign: "center", fontSize: "2.5rem", marginBottom: "50px" }}>{t.galleryTitle}</h2>
                <div style={{ display: "flex", gap: "25px", overflowX: "auto", padding: "20px 5% 60px", scrollbarWidth: "none" }} className="hide-scrollbar">
                    {t.gallery.map((img) => (
                        <motion.div
                            key={img.id}
                            whileHover={{ scale: 1.02 }}
                            style={{ minWidth: "320px", height: "480px", borderRadius: "30px", overflow: "hidden", position: "relative", boxShadow: `0 20px 40px rgba(0,0,0,0.4)`, border: `1px solid #1e293b` }}
                        >
                            <img src={img.src} alt={img.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                            <div style={{ position: "absolute", bottom: 0, width: "100%", padding: "40px 25px 30px", background: "linear-gradient(to top, rgba(8,12,23,0.95), transparent)" }}>
                                <h4 style={{ fontSize: "1.4rem", margin: 0, color: colors.accent }}>{img.title}</h4>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* === 7. CTA WhatsApp === */}
            <section style={{ padding: "100px 20px 140px", textAlign: "center", position: "relative", zIndex: 2 }}>
                <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} style={{ maxWidth: "850px", margin: "0 auto", padding: "70px 40px", borderRadius: "40px", background: `linear-gradient(135deg, ${colors.accent}15, ${colors.accentPurple}15)`, border: `1px solid ${colors.accent}30`, backdropFilter: "blur(10px)" }}>
                    <h2 style={{ fontSize: "clamp(1.8rem, 5vw, 3.2rem)", fontWeight: "900", marginBottom: "35px", lineHeight: 1.2 }}>
                        {isAr ? "جاهز لتحويل تصاميمك إلى واقع؟" : "Ready to bring your designs to life?"}<br />
                        <span style={{ color: colors.accent }}>{isAr ? "تواصل معنا وابدأ الآن" : "Contact us and start now"}</span>
                    </h2>
                    <motion.a
                        href={`https://wa.me/${whatsappNumber}`}
                        target="_blank"
                        whileHover={{ scale: 1.05, background: "#25D366", color: "#fff", boxShadow: "0 10px 40px rgba(37, 211, 102, 0.4)" }}
                        whileTap={{ scale: 0.98 }}
                        style={{
                            display: "inline-flex", alignItems: "center", gap: "15px",
                            backgroundColor: "transparent", color: "#25D366", padding: "18px 45px",
                            borderRadius: "100px", textDecoration: "none", fontSize: "1.3rem", fontWeight: "bold",
                            border: "2px solid #25D366", transition: "0.3s all"
                        }}
                    >
                        <MessageCircle size={30} /> {t.whatsappBtn}
                    </motion.a>
                </motion.div>
            </section>

            {/* الفوتر */}
            <footer style={{ padding: "50px 20px", textAlign: "center", borderTop: `1px solid ${colors.accent}10`, color: colors.textSecondary, position: "relative", zIndex: 2, background: "#050810" }}>
                <p style={{ opacity: 0.6, fontSize: "0.9rem", letterSpacing: "1px" }}>
                    {isAr ? "جميع الحقوق محفوظة © التصميم الحديث 2026" : "All Rights Reserved © Modern Design 2026"}
                </p>
            </footer>

            {/* إخفاء شريط التمرير */}
            <style jsx global>{`
                .hide-scrollbar::-webkit-scrollbar { display: none; }
                .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </div>
    );
};

export default DTFPage;