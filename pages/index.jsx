// /pages/index.jsx
import Head from 'next/head';
import fs from 'fs'; // أعدنا الاستيراد لأنه ضروري لـ getStaticProps
import path from 'path';
import Header from '../components/layout/Header';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

// مكونات الصفحة الرئيسية - تم تعديل المسارات لتطابق أسماء ملفاتك بدقة
import Home_Hero from '../components/home/Home_Hero';
import Home_EventBanner from '../components/home/Home_EventBanner';
import Home_Services from '../components/home/Home_Services';
import Home_Stats from '../components/home/Home_Stats';
import Founders_Message from '../components/home/Founders_Message'; // حذفنا .jsx
import Home_Partners from '../components/home/Home_Partners';
import Home_WorksPreview from '../components/home/Home_WorksPreview';
import Home_Testimonials from '../components/home/Home_Testimonials';
import Home_About from '../components/home/Home About'; // عدلنا الشرطة لمسافة لتطابق ملفك
import Home_Contact from '../components/home/Home_Contact';
import ModernDesignSection from '../components/home/ModernDesignSection';

export default function HomePage({ projectsData }) {
    const { t } = useTranslation('common');

    return (
        <>
            <Head>
                <title>{t('meta.title', 'الرئيسية | شركة التصميم الحديث للدعاية والإعلان')}</title>
                <meta name="description" content={t('meta.description', 'نقدم أفضل خدمات الطباعة بأعلى جودة.')} />
                <link rel="icon" href="/logoicon.svg" />
            </Head>

            <Header />

            <main>
                <Home_Hero />
                <Home_EventBanner />
                <Home_Services />
                <Home_Stats />
                <Founders_Message />
                <Home_Partners />
                <ModernDesignSection />
                <Home_WorksPreview projects={projectsData} />
                <Home_Testimonials />
                <Home_About />
                <Home_Contact />
            </main>
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