import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // ملاحظة: في النسخة النهائية سننقل هذا التحقق لـ API ليكون آمناً
    // حالياً سنقوم بتجربة المنطق للدخول
    if (username === 'admin' && password === '123') {
        localStorage.setItem('user_role', 'admin');
        localStorage.setItem('user_name', 'admin');
        router.push('/QuotationModernDesign/create');
    } else if (username === 'user1' && password === '123') {
        localStorage.setItem('user_role', 'user');
        localStorage.setItem('user_name', 'user1');
        router.push('/QuotationModernDesign/create');
    } else {
        setError('خطأ في اسم المستخدم أو كلمة المرور');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 rtl" dir="rtl">
      <div className="bg-white p-8 rounded-lg shadow-md w-96 border-t-4 border-green-600">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">بوابة عروض الأسعار</h2>
        
        {error && <p className="bg-red-100 text-red-600 p-2 rounded mb-4 text-sm text-center">{error}</p>}
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">اسم المستخدم</label>
            <input 
              type="text" 
              className="mt-1 w-full p-2 border rounded focus:ring-green-500 focus:border-green-500 outline-none"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">كلمة المرور</label>
            <input 
              type="password" 
              className="mt-1 w-full p-2 border rounded focus:ring-green-500 focus:border-green-500 outline-none"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 transition"
          >
            دخول للنظام
          </button>
        </form>
        
        <p className="mt-6 text-xs text-gray-400 text-center">النظام محمي - الوصول للمصرح لهم فقط</p>
      </div>
    </div>
  );
}