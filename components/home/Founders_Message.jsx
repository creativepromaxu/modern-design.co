// components/home/Founders_Message.jsx
import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';

const Founders_Message = () => {
  const { t } = useTranslation('common');
  const [isVisible, setIsVisible] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const sectionRef = useRef(null);
  const typingSpeed = 40; 

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { setIsVisible(entry.isIntersecting); },
      { threshold: 0.3 } 
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let intervalId;
    const fullText = t('founder.message', 'منذ انطلاقتنا...');
    if (isVisible) {
      let charIndex = 0;
      setDisplayedText(''); 
      intervalId = setInterval(() => {
        charIndex++;
        setDisplayedText(fullText.slice(0, charIndex));
        if (charIndex === fullText.length) clearInterval(intervalId);
      }, typingSpeed); 
    } else {
      setDisplayedText('');
    }
    return () => clearInterval(intervalId);
  }, [isVisible, t, typingSpeed]);

  return (
    <section ref={sectionRef} className="founder-section">
      <div className="container">
        <div className={`decorative-circle ${isVisible ? 'pulse-anim' : ''}`}></div>

        <div className="content-wrapper">
          
          <div className={`image-area ${isVisible ? 'animate-image' : ''}`}>
            <div className="image-frame shine-wrapper">
              {/* تم تحديث الأبعاد لتناسب الصورة العريضة */}
              <Image 
                src="/founder.jpg" 
                alt="أديب عثمان"
                width={1701} 
                height={1417}
                style={{ 
                  objectFit: 'cover',
                  objectPosition: 'top center', // يضمن ظهور الوجه في المنتصف
                  width: '100%',
                  height: '100%'
                }}
                className="founder-img"
              />
              <div className="border-accent"></div>
            </div>
          </div>

          <div className="text-area">
            <div className={`glass-card ${isVisible ? 'animate-card' : ''}`}>
              <div className="badge-wrapper"><span className="badge">{t('founder.badge', 'كلمة المؤسس')}</span></div>
              <h2 className={`title ${isVisible ? 'typing-effect' : ''}`}>{t('founder.title', 'نبني المستقبل برؤية فنية')}</h2>
              
              <div className="quote-icon">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="#028f7b"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 8.44772 5.0166 9V11C5.0166 11.5523 4.56889 12 4.0166 12H3.0166V5H13.0166V15C13.0166 18.3137 10.3303 21 7.0166 21H5.0166Z" /></svg>
              </div>

              <p className="message cursor-effect">{displayedText}</p>

              <div className="signature-area">
                <div className="info">
                  <h3 className="name">{t('founder.name', 'أديب عثمان')}</h3>
                  <p className="role">{t('founder.role', 'المؤسس والمدير العام')}</p>
                </div>
                <div className="hand-signature">Adeeb Othman</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .founder-section { padding: 120px 20px; background: #fff; position: relative; overflow: hidden; font-family: 'Tajawal', sans-serif; }
        .decorative-circle { position: absolute; top: -100px; right: auto; left: -100px; width: 400px; height: 400px; background: radial-gradient(circle, rgba(2,143,123,0.05) 0%, rgba(255,255,255,0) 70%); border-radius: 50%; z-index: 0; opacity: 0; transition: opacity 1s; }
        :global([dir='ltr']) .decorative-circle { left: auto; right: -100px; }
        .pulse-anim { opacity: 1; animation: pulse 4s infinite ease-in-out; }
        @keyframes pulse { 0% { transform: scale(1); } 50% { transform: scale(1.1); } 100% { transform: scale(1); } }
        
        .content-wrapper { max-width: 1200px; margin: 0 auto; display: flex; flex-direction: row-reverse; align-items: center; justify-content: center; position: relative; z-index: 1; }

        .image-area { flex: 0 0 50%; position: relative; opacity: 0; transform: translateX(50px); transition: all 1s cubic-bezier(0.215, 0.610, 0.355, 1.000); z-index: 1; }
        :global([dir='ltr']) .image-area { transform: translateX(-50px); }
        .animate-image { opacity: 1; transform: translateX(0) !important; }

        .image-frame { position: relative; border-radius: 20px; overflow: hidden; box-shadow: 0 30px 60px rgba(0,0,0,0.15); cursor: pointer; width: 100%; aspect-ratio: 1.2/1; /* استخدام نسبة العرض للارتفاع الأصلية تقريباً */ }
        
        .shine-wrapper { position: relative; overflow: hidden; }
        .shine-wrapper::after { content: ""; position: absolute; top: 0; left: -100%; width: 50%; height: 100%; background: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.3) 50%, rgba(255, 255, 255, 0) 100%); transform: skewX(-25deg); z-index: 2; transition: 0.5s; pointer-events: none; }
        .shine-wrapper:hover::after { animation: shine 0.75s; }
        @keyframes shine { 100% { left: 150%; } }

        .border-accent { position: absolute; bottom: 20px; width: 100px; height: 100px; border-bottom: 4px solid #028f7b; border-radius: 0 0 20px 0; z-index: 3; right: 20px; border-right: 4px solid #028f7b; border-left: none; }
        :global([dir='ltr']) .border-accent { right: auto; left: 20px; border-right: none; border-left: 4px solid #028f7b; border-radius: 0 0 0 20px; }

        .text-area { flex: 0 0 50%; z-index: 2; margin-left: -60px; margin-right: 0; }
        :global([dir='ltr']) .text-area { margin-left: 0; margin-right: -60px; }

        .glass-card { background: rgba(255, 255, 255, 0.95); padding: 50px; border-radius: 30px; box-shadow: 0 20px 50px rgba(0,0,0,0.08); border: 1px solid rgba(2, 143, 123, 0.1); opacity: 0; transform: translateY(30px); transition: all 0.8s ease 0.2s; }
        .animate-card { opacity: 1; transform: translateY(0); }

        .badge { font-size: 0.85rem; color: #028f7b; font-weight: 700; border-bottom: 2px solid #028f7b; padding-bottom: 5px; }
        .title { font-size: 2.5rem; margin: 25px 0; color: #333; font-weight: 800; opacity: 0; }
        .typing-effect { animation: fadeInUp 0.8s ease forwards 0.4s; }
        .quote-icon { margin-bottom: 15px; }
        .message { font-size: 1.1rem; line-height: 1.8; color: #555; margin-bottom: 40px; min-height: 100px; white-space: pre-wrap; }
        .cursor-effect::after { content: '|'; color: #028f7b; animation: blink 1s step-end infinite; font-weight: bold; margin-right: 2px; }
        :global([dir='ltr']) .cursor-effect::after { margin-right: 0; margin-left: 2px; }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

        .signature-area { display: flex; align-items: center; justify-content: space-between; border-top: 1px solid #eee; padding-top: 25px; }
        .name { font-size: 1.3rem; font-weight: 700; color: #028f7b; margin: 0; }
        .role { font-size: 0.95rem; color: #888; margin: 5px 0 0; }
        .hand-signature { font-family: 'Great Vibes', cursive; font-size: 2rem; color: #333; transform: rotate(-5deg); opacity: 0.7; }

        @media (max-width: 992px) {
          .content-wrapper { 
            flex-direction: column !important; 
            align-items: center; 
          }
          
          .image-area, .text-area { 
            flex: 100%; 
            margin: 0 !important; 
            width: 100%; 
            display: flex;
            justify-content: center;
          }
          
          .image-area { 
            margin-bottom: 20px !important; 
          }

          .image-frame {
            /* تعديل مهم للموبايل: الصورة تأخذ عرض الشاشة مع هوامش بسيطة */
            width: 100%; 
            max-width: 100%;
          }

          .glass-card { padding: 30px 20px; text-align: center; width: 100%; }
          .signature-area { flex-direction: column; gap: 15px; }
        }
      `}</style>
      
      <style jsx global>{` @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap'); `}</style>
    </section>
  );
};

export default Founders_Message;