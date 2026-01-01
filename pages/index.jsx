// /pages/index.jsx
import Head from 'next/head';
import Header from '../components/layout/Header';

// استيراد مكتبات النظام (للصور) ومكتبة الترجمة
import fs from 'fs';
import path from 'path';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

// مكونات الصفحة الرئيسية
import Home_Hero from '../components/home/Home_Hero';
import Home_EventBanner from '../components/home/Home_EventBanner';
import Home_Services from '../components/home/Home_Services';
import Home_Stats from '../components/home/Home_Stats';
import Founders_Message from '../components/home/Founders_Message.jsx';
import Home_Partners from '../components/home/Home_Partners';
import Home_WorksPreview from '../components/home/Home_WorksPreview';
import Home_Testimonials from '../components/home/Home_Testimonials';
import Home_About from '../components/home/Home_About';
import Home_Contact from '../components/home/Home_Contact';
import ModernDesignSection from '../components/home/ModernDesignSection';

export default function HomePage({ projectsData }) {
  const { t } = useTranslation('common');

  return (
    <>
      <Head>
        <title>{t('meta.title', 'الرئيسية | شركة التصميم الحديث للدعاية والإعلان')}</title>
        <meta name="description" content={t('meta.description', 'نقدم أفضل خدمات الطباعة، واجهات المحلات، قص الليزر، وتنظيم المعارض والمؤتمرات بأعلى جودة.')} />
        <link rel="icon" href="/logoicon.svg" />
        <meta property="og:image" content="/logoicon.svg" />
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

        {/* نمرر بيانات المشاريع المنظمة التي جلبناها من السيرفر */}
        <Home_WorksPreview projects={projectsData} />
        
        <Home_Testimonials />
        <Home_About />
        <Home_Contact />
      </main>
    </>
  );
}

// الدالة التي تعمل في السيرفر لجلب المجلدات والبيانات
export async function getStaticProps({ locale }) {
  // 1. تحديد مسار مجلد المشاريع الجديد
  const projectsDirectory = path.join(process.cwd(), 'public/projects');
  let projectsData = [];

  if (fs.existsSync(projectsDirectory)) {
    // قراءة أسماء المجلدات داخل projects
    const folders = fs.readdirSync(projectsDirectory).filter(file => 
      fs.statSync(path.join(projectsDirectory, file)).isDirectory()
    );

    projectsData = folders.map((folder) => {
      const folderPath = path.join(projectsDirectory, folder);
      
      // جلب الصور داخل المجلد
      const files = fs.readdirSync(folderPath);
      const images = files.filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file));

      // محاولة قراءة ملف info.json إذا وجد
      const infoPath = path.join(folderPath, 'info.json');
      let info = {};
      if (fs.existsSync(infoPath)) {
        try {
          info = JSON.parse(fs.readFileSync(infoPath, 'utf8'));
        } catch (e) {
          console.error(`Error parsing info.json in ${folder}`);
        }
      }

      return {
        id: folder,
        titleAr: info.title_ar || folder, // إذا لم يوجد ملف JSON نستخدم اسم المجلد كعنوان
        titleEn: info.title_en || folder,
        categoryAr: info.category_ar || "",
        categoryEn: info.category_en || "",
        // نحدد صورة الغلاف: إذا وجدت صورة باسم cover نستخدمها، وإلا نأخذ أول صورة
        cover: images.includes('cover.jpg') 
                ? `/projects/${folder}/cover.jpg` 
                : `/projects/${folder}/${images[0]}`,
        allImages: images.map(img => `/projects/${folder}/${img}`)
      };
    });
  }

  return {
    props: {
      projectsData, // نرسل المصفوفة المنظمة بدلاً من مجرد قائمة صور
      ...(await serverSideTranslations(locale, ['common'])),
    },
    revalidate: 60, // تحديث البيانات كل دقيقة إذا أضفت مجلدات جديدة
  };
}