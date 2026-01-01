import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const brandColor = "#18907A";

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // جلب قائمة المستخدمين من السيرفر مباشرة للتأكد من أحدث بيانات
            const res = await fetch('/api/users/manage');
            const data = await res.json();

            // تحسين البحث: تنظيف النص وتحويل كل شيء لنصوص للمقارنة
            const user = data.users.find(u =>
                String(u.username).trim() === String(username).trim() &&
                String(u.password).trim() === String(password).trim() &&
                u.status === 'active'
            );

            if (user) {
                // تخزين البيانات كاملة
                localStorage.setItem('user', JSON.stringify(user));
                // توجيه للوحة التحكم
                router.push('/QuotationModernDesign/dashboard');
            } else {
                setError('خطأ في البيانات أو الحساب موقوف.. تأكد من كتابة الاسم وكلمة المرور بشكل صحيح');
            }
        } catch (err) {
            setError('مشكلة في الاتصال بالسيرفر');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#1a1a1a', direction: 'rtl' }}>
            <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '20px', width: '360px', boxShadow: '0 10px 30px rgba(0,0,0,0.3)', textAlign: 'center' }}>
                <img src="/logos/logo.svg" alt="Logo" style={{ width: '160px', marginBottom: '20px' }} />
                <h2 style={{ color: brandColor, marginBottom: '25px', fontSize: '22px' }}>دخول الموظفين</h2>

                <form onSubmit={handleLogin}>
                    <input
                        type="text"
                        placeholder="اسم المستخدم"
                        style={{ width: '100%', padding: '14px', marginBottom: '15px', borderRadius: '10px', border: '1px solid #ddd', fontSize: '16px' }}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="كلمة المرور"
                        style={{ width: '100%', padding: '14px', marginBottom: '15px', borderRadius: '10px', border: '1px solid #ddd', fontSize: '16px' }}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    {error && <div style={{ color: '#d32f2f', fontSize: '13px', marginBottom: '15px', backgroundColor: '#fdecea', padding: '10px', borderRadius: '8px' }}>{error}</div>}

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            width: '100%', padding: '15px', backgroundColor: loading ? '#999' : brandColor,
                            color: '#fff', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold', fontSize: '17px'
                        }}>
                        {loading ? 'جاري التحقق...' : 'تسجيل الدخول'}
                    </button>
                </form>
            </div>
        </div>
    );
}