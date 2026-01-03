import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Dashboard() {
    const [quotes, setQuotes] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [showMaintenance, setShowMaintenance] = useState(false);
    const [bulkDates, setBulkDates] = useState({ start: '', end: '' });
    const router = useRouter();
    const brandColor = "#18907A";

    const loadData = (user) => {
        setLoading(true);
        fetch('/api/quotes/manage').then(res => res.json()).then(data => {
            const all = Array.isArray(data) ? data : [];
            setQuotes(user.role === 'admin' ? all : all.filter(q => q.createdBy === user.name));
            setLoading(false);
        });
    };

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) { router.push('/QuotationModernDesign/login'); return; }
        setCurrentUser(user);
        loadData(user);
    }, [router]);

    const filteredQuotes = quotes.filter(q => {
        const term = searchTerm.toLowerCase();
        return q.quoteNumber.toString().includes(term) || (q.customerName || q.customer || '').toLowerCase().includes(term);
    });

    const handleAction = async (num, type) => {
        if (currentUser.role !== 'admin') {
            await fetch('/api/quotes/manage', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'UPDATE_DELETE_STATUS', quoteNumber: num, status: type === 'request' }) });
            loadData(currentUser);
        } else {
            const pass = prompt("كلمة مرور المدير:");
            if (pass === currentUser.password) {
                if (confirm("حذف نهائي؟")) {
                    await fetch(`/api/quotes/manage?quoteNumber=${num}`, { method: 'DELETE' });
                    loadData(currentUser);
                }
            }
        }
    };

    if (!currentUser) return null;
    const pending = quotes.filter(q => q.deletionRequested);

    return (
        <div style={{ backgroundColor: '#f4f7f6', minHeight: '100vh', direction: 'rtl', padding: '15px', fontFamily: 'Arial' }}>
            <style jsx>{`
                .header-container {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex-wrap: wrap;
                    gap: 15px;
                    margin-bottom: 20px;
                    background: #fff;
                    padding: 15px;
                    borderRadius: 15px;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
                }
                .search-input {
                    padding: 8px 15px;
                    border-radius: 20px;
                    border: 1px solid #ddd;
                    font-size: 13px;
                    width: 100%;
                    max-width: 200px;
                }
                .table-container {
                    background: #fff;
                    border-radius: 12px;
                    overflow: hidden;
                    box-shadow: 0 2px 15px rgba(0,0,0,0.05);
                }
                @media (max-width: 768px) {
                    .desktop-table { display: none; }
                    .header-container { flex-direction: column; text-align: center; }
                    .search-input { max-width: 100%; }
                    .mobile-card {
                        background: #fff;
                        padding: 15px;
                        margin-bottom: 10px;
                        border-radius: 12px;
                        box-shadow: 0 2px 5px rgba(0,0,0,0.05);
                    }
                }
                @media (min-width: 769px) {
                    .mobile-list { display: none; }
                }
            `}</style>

            <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                {/* Header Section */}
                <div className="header-container">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flexWrap: 'wrap', justifyContent: 'center' }}>
                        <h1 style={{ color: brandColor, margin: 0, fontSize: '20px' }}>لوحة التحكم</h1>
                        <input type="text" className="search-input" placeholder="🔍 بحث سريع..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    </div>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
                        {currentUser.role === 'admin' && (
                            <>
                                <button onClick={() => setShowMaintenance(!showMaintenance)} style={{ padding: '10px', backgroundColor: '#f1f5f9', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>⚙️</button>
                                <button onClick={() => router.push('/QuotationModernDesign/users')} style={{ padding: '10px 15px', backgroundColor: '#334155', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '12px' }}>👥 المصممين</button>
                            </>
                        )}
                        <button onClick={() => router.push('/QuotationModernDesign/create')} style={{ padding: '10px 20px', backgroundColor: brandColor, color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold' }}>+ جديد</button>
                        <button onClick={() => { localStorage.removeItem('user'); router.push('/QuotationModernDesign/login'); }} style={{ padding: '10px', backgroundColor: '#fee2e2', color: '#ef4444', border: 'none', borderRadius: '8px' }}>خروج</button>
                    </div>
                </div>

                {/* Maintenance Section */}
                {showMaintenance && (
                    <div style={{ backgroundColor: '#fff', padding: '15px', borderRadius: '12px', marginBottom: '15px', border: `1px solid ${brandColor}`, display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px', justifyContent: 'center' }}>
                        <span style={{ fontSize: '13px', fontWeight: 'bold' }}>🧹 أرشفة من:</span>
                        <input type="date" onChange={(e) => setBulkDates({ ...bulkDates, start: e.target.value })} style={{ padding: '5px' }} />
                        <span>إلى:</span>
                        <input type="date" onChange={(e) => setBulkDates({ ...bulkDates, end: e.target.value })} style={{ padding: '5px' }} />
                        <button onClick={async () => {
                            const p = prompt("باسورد الأرشفة:");
                            if (p === currentUser.password) {
                                const res = await fetch('/api/quotes/manage', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'BULK_ARCHIVE', ...bulkDates }) });
                                const r = await res.json(); alert(r.message); loadData(currentUser); setShowMaintenance(false);
                            }
                        }} style={{ backgroundColor: '#475569', color: '#fff', border: 'none', padding: '7px 15px', borderRadius: '6px', cursor: 'pointer' }}>تنفيذ</button>
                    </div>
                )}

                {/* Mobile View: Cards */}
                <div className="mobile-list">
                    {filteredQuotes.map(q => (
                        <div key={q.quoteNumber} className="mobile-card" style={{ opacity: q.deletionRequested ? 0.6 : 1, borderRight: `5px solid ${brandColor}` }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                <span style={{ fontWeight: 'bold', color: brandColor }}>#{q.quoteNumber}</span>
                                <span style={{ fontWeight: 'bold' }}>{q.total} ر.س</span>
                            </div>
                            <div style={{ fontSize: '14px', marginBottom: '5px' }}>👤 العميل: {q.customerName || q.customer}</div>
                            <div style={{ fontSize: '12px', color: '#666', marginBottom: '10px' }}>✍️ بواسطة: {q.createdBy} | الحالة: {q.deletionRequested ? 'معلق' : 'نشط'}</div>
                            <div style={{ display: 'flex', gap: '10px', borderTop: '1px solid #eee', paddingTop: '10px' }}>
                                <button onClick={() => router.push(`/QuotationModernDesign/create?edit=${q.quoteNumber}`)} style={{ flex: 1, padding: '8px', border: 'none', background: '#f0fdf4', color: brandColor, borderRadius: '5px', fontWeight: 'bold' }}>تعديل</button>
                                <button onClick={() => handleAction(q.quoteNumber, q.deletionRequested ? 'cancel' : 'request')} style={{ flex: 1, padding: '8px', border: 'none', background: '#fef2f2', color: '#ef4444', borderRadius: '5px' }}>{q.deletionRequested ? 'إلغاء الحذف' : '🗑️ حذف'}</button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Desktop View: Table */}
                <div className="table-container desktop-table">
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'right' }}>
                        <thead><tr style={{ backgroundColor: '#f8faf9', fontSize: '13px' }}>
                            <th style={{ padding: '12px' }}>رقم العرض</th><th style={{ padding: '12px' }}>العميل</th><th style={{ padding: '12px' }}>بواسطة</th><th style={{ padding: '12px' }}>الحالة</th><th style={{ padding: '12px' }}>الإجمالي</th><th style={{ padding: '12px' }}>إجراءات</th>
                        </tr></thead>
                        <tbody style={{ fontSize: '13px' }}>
                            {filteredQuotes.map(q => (
                                <tr key={q.quoteNumber} style={{ borderBottom: '1px solid #eee', opacity: q.deletionRequested ? 0.4 : 1 }}>
                                    <td style={{ padding: '12px', fontWeight: 'bold' }}>#{q.quoteNumber}</td>
                                    <td style={{ padding: '12px' }}>{q.customerName || q.customer}</td>
                                    <td style={{ padding: '12px', color: brandColor }}>{q.createdBy}</td>
                                    <td style={{ padding: '12px' }}>{q.deletionRequested ? 'معلق' : 'نشط'}</td>
                                    <td style={{ padding: '12px', fontWeight: 'bold' }}>{q.total} ر.س</td>
                                    <td style={{ padding: '12px' }}>
                                        <button onClick={() => router.push(`/QuotationModernDesign/create?edit=${q.quoteNumber}`)} style={{ color: brandColor, border: 'none', background: 'none', cursor: 'pointer', fontWeight: 'bold' }}>تعديل</button>
                                        <button onClick={() => handleAction(q.quoteNumber, q.deletionRequested ? 'cancel' : 'request')} style={{ color: '#ef4444', border: 'none', background: 'none', cursor: 'pointer', marginRight: '10px' }}>{q.deletionRequested ? 'إلغاء' : '🗑️'}</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}