// components/ui/WhatsAppFloat.jsx
import React, { useState, useEffect } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { useTranslation } from 'next-i18next';

const WhatsAppFloat = () => {
    const { t } = useTranslation('common');
    const [showTooltip, setShowTooltip] = useState(false);

    // رقم الواتساب (ضعه بصيغة دولية)
    const phoneNumber = "+966557480817";
    const message = t('whatsapp_greeting', "مرحباً، أريد الاستفسار عن خدماتكم");

    useEffect(() => {
        // المؤقت الأول
        const initialTimer = setTimeout(() => setShowTooltip(true), 2000);

        // تكرار الظهور كل 10 ثواني
        const interval = setInterval(() => {
            setShowTooltip(true);
            setTimeout(() => {
                setShowTooltip(false);
            }, 4000); // يختفي بعد 4 ثواني
        }, 10000);

        return () => {
            clearTimeout(initialTimer);
            clearInterval(interval);
        };
    }, []);

    return (
        <div style={styles.container}>

            {/* 1. زر الواتساب (أصبح هو الأول ليظهر في اليسار) */}
            <a
                href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.button}
                className="whatsapp-pulse"
            >
                {/* تصغير حجم الأيقونة قليلاً */}
                <FaWhatsapp size={28} color="#fff" />
            </a>

            {/* 2. صندوق الرسالة (يظهر يمين الزر) */}
            <div style={{
                ...styles.tooltip,
                opacity: showTooltip ? 1 : 0,
                visibility: showTooltip ? 'visible' : 'hidden',
                // الحركة تأتي من اليسار لليمين الآن
                transform: showTooltip ? 'translateX(0)' : 'translateX(-10px)',
            }}>
                {t('whatsapp_cta', 'اطلب الآن')}
                {/* السهم يشير لليسار */}
                <div style={styles.arrow}></div>
            </div>

            <style jsx>{`
        .whatsapp-pulse {
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.7); }
          70% { box-shadow: 0 0 0 10px rgba(37, 211, 102, 0); }
          100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); }
        }
      `}</style>
        </div>
    );
};

const styles = {
    container: {
        position: 'fixed',
        bottom: '25px', // رفعناه قليلاً عن الحافة
        left: '25px',   // التموضع في اليسار
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row', // ترتيب طبيعي: الزر ثم النص
    },
    button: {
        width: '50px',  // تم تصغير العرض (كان 60)
        height: '50px', // تم تصغير الطول (كان 60)
        backgroundColor: '#25D366',
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
        textDecoration: 'none',
        transition: 'transform 0.3s ease',
        zIndex: 2, // لضمان أن الزر فوق أي تداخل
    },
    tooltip: {
        backgroundColor: '#fff',
        color: '#333',
        padding: '6px 12px', // تصغير الحشوة قليلاً
        borderRadius: '6px',
        fontSize: '13px', // تصغير الخط قليلاً
        fontWeight: 'bold',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        marginLeft: '15px', // مسافة بين الزر والنص (من اليسار)
        position: 'relative',
        whiteSpace: 'nowrap',
        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)', // حركة ناعمة
    },
    arrow: {
        position: 'absolute',
        top: '50%',
        left: '-6px', // السهم يظهر في الجهة اليسرى للصندوق
        marginTop: '-6px',
        // رسم مثلث يشير لليسار
        borderWidth: '6px 6px 6px 0',
        borderStyle: 'solid',
        borderColor: 'transparent #fff transparent transparent', // اللون الأبيض يمين الحدود
    }
};

export default WhatsAppFloat;