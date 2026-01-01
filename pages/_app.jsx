// pages/_app.jsx
import { appWithTranslation } from 'next-i18next';

function MyApp({ Component, pageProps }) {
  return (
    <>
      {/* عرض مكونات الموقع */}
      <Component {...pageProps} />

      {/* 👇 هنا الحل السحري: ستايل عام للموقع كله 👇 */}
      <style jsx global>{`
        /* استيراد الخط لضمان عمله في كل مكان */
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@200;300;400;500;700;800&display=swap');

        html,
        body {
          padding: 0;
          margin: 0;
          font-family: 'Tajawal', sans-serif;
          
          /* هذا السطر هو الذي يمنع المساحة البيضاء في الموبايل */
          overflow-x: hidden; 
          
          width: 100%;
          position: relative;
        }

        /* ضمان أن المسافات الداخلية لا تزيد عرض العناصر */
        * {
          box-sizing: border-box;
        }
      `}</style>
    </>
  );
}

export default appWithTranslation(MyApp);