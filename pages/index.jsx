// /pages/index.jsx
import Head from 'next/head';
import fs from 'fs';
import path from 'path';
import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import Header from '../components/layout/Header';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Lenis from '@studio-freight/lenis';

// =========================================================
// 1. الاستيراد الثابت (Static) - للأقسام العلوية
// هذه الأقسام ستكون جاهزة فوراً ولن تتقطع أبداً
// =========================================================
import Home_Hero from '../components/home/Home_Hero';
import Home_EventBanner from '../components/home/Home_EventBanner';
import Home_Services from '../components/home/Home_Services';
import Home_Stats from '../components/home/Home_Stats';
// جعلنا الإحصائيات ثابتة أيضاً لأنها خفيفة وعادة تظهر بسرعة

// =========================================================
// 2. الاستيراد الديناميكي (Dynamic) - للأقسام السفلية
// =========================================================

// دالة لإنشاء "حيز مكاني" (Skeleton) بارتفاع محدد
// هذا يمنع الشاشة من الاهتزاز أو الانقطاع عند التحميل
const SectionPlaceholder = ({ height = "50vh" }) => (
    <div style={{ height: height, width: '100%', background: 'transparent' }} aria-hidden="true" />
);

// نستخدم loading: مع Placeholder للحفاظ على سلاسة السكرول
const Founders_Message = dynamic(() => import('../components/home/Founders_Message'), {
    loading: () => <SectionPlaceholder height="400px" />
});

const Home_Partners = dynamic(() => import('../components/home/Home_Partners'), {
    loading: () => <SectionPlaceholder height="200px" />
});

const Home_WorksPreview = dynamic(() => import('../components/home/Home_WorksPreview'), {
    loading: () => <SectionPlaceholder height="600px" />
});

const ModernDesignSection = dynamic(() => import('../components/home/ModernDesignSection'));

// قسم الخدمات الجديد (ثقيل قليلاً، لذا الديناميكية ممتازة له)
const ServicesSection = dynamic(() => import('../components/home/ServicesSection'), {
    loading: () => <SectionPlaceholder height="800px" />
});

const Home_Testimonials = dynamic(() => import('../components/home/Home_Testimonials'));

const Home_About = dynamic(() => import('../components/home/Home_About'));

const Home_Contact = dynamic(() => import('../components/home/Home_Contact'));

// الواتساب لا يؤثر على السكرول
const WhatsAppFloat = dynamic(() => import('../components/home/WhatsAppFloat'), { ssr: false });


export default function HomePage({ projectsData }) {
    const { t } = useTranslation('common');

    // إعدادات السكرول الناعم (Lenis)
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    return (
        <>
            <Head>
                <title>{t('meta.title', 'الرئيسية | شركة التصميم الحديث للدعاية والإعلان')}</title>
                <meta name="description" content={t('meta.description', 'نقدم أفضل خدمات الطباعة.')} />
                <link rel="icon" href="/logoicon.svg" />
                <style>{`
                    html.lenis { height: auto; }
                    .lenis.lenis-smooth { scroll-behavior: auto !important; }
                    .lenis.lenis-smooth [data-lenis-prevent] { overscroll-behavior: contain; }
                    .lenis.lenis-stopped { overflow: hidden; }
                `}</style>
            </Head>

            <Header />

            <main>
                {/* 1. المنطقة العلوية (تحميل فوري - بدون تقطيع) */}
                <Home_Hero />
                <Home_EventBanner />
                <Home_Services />
                <Home_Stats />

                {/* 2. المنطقة السفلية (تحميل ذكي عند الوصول) */}
                {/* بفضل SectionPlaceholder، المتصفح يحجز مكان القسم قبل تحميله */}
                <Founders_Message />
                <Home_Partners />
                <Home_WorksPreview projects={projectsData} />
                <ModernDesignSection />
                <ServicesSection />
                <Home_Testimonials />
                <Home_About />
                <Home_Contact />
            </main>

            <WhatsAppFloat />
        </>
    );
}

export async function getStaticProps({ locale }) {
    const projectsDirectory = path.join(process.cwd(), 'public/projects');
    let projectsData = [];

    if (fs.existsSync(projectsDirectory)) {
        const folders = fs.readdirSync(projectsDirectory).filter(file =>
            fs.statSync(path.join(projectsDirectory, file)).isDirectory()
        );

        projectsData = folders.map((folder) => {
            const folderPath = path.join(projectsDirectory, folder);
            const files = fs.readdirSync(folderPath);
            const images = files.filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file));
            const infoPath = path.join(folderPath, 'info.json');
            let info = {};
            if (fs.existsSync(infoPath)) {
                try { info = JSON.parse(fs.readFileSync(infoPath, 'utf8')); } catch (e) { }
            }

            return {
                id: folder,
                titleAr: info.title_ar || folder,
                cover: images.includes('cover.jpg')
                    ? `/projects/${folder}/cover.jpg`
                    : `/projects/${folder}/${images[0]}`,
                allImages: images.map(img => `/projects/${folder}/${img}`)
            };
        });
    }

    return {
        props: {
            projectsData,
            ...(await serverSideTranslations(locale, ['common'])),
        },
        revalidate: 60,
    };
}