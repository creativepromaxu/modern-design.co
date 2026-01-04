import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function CreateQuote() {
    const router = useRouter();
    const { edit } = router.query;

    const [currentUser, setCurrentUser] = useState(null);

    // تم تفريغ القيم تماماً هنا (نصوص فارغة) لتبدأ الخانات بيضاء
    const [items, setItems] = useState([{ id: Date.now(), desc: '', size: '', qty: '', meter_qty: '', price: '' }]);

    const [quoteNum, setQuoteNum] = useState('...');
    const [customer, setCustomer] = useState('');
    const [notes, setNotes] = useState('');
    const [history, setHistory] = useState([]);

    const brandColor = "#18907A";
    const accentColor = "#49AF5B";

    const autoGrow = (e) => {
        e.target.style.height = "inherit";
        e.target.style.height = `${e.target.scrollHeight}px`;
    };

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setCurrentUser(user);
        } else {
            router.push('/QuotationModernDesign/login');
            return;
        }

        if (edit) {
            fetch('/api/quotes/manage').then(res => res.json()).then(data => {
                const target = data.find(q => String(q.quoteNumber) === String(edit));
                if (target) {
                    setQuoteNum(target.quoteNumber);
                    setCustomer(target.customer);
                    setItems(target.items);
                    setNotes(target.notes || '');
                    setHistory(target.history || []);
                }
            });
        } else {
            fetch('/api/quotes/manage?type=nextId').then(res => res.json()).then(data => { setQuoteNum(data.nextId); });
        }
    }, [edit, router]);

    // الحسابات تعامل الخانة الفارغة كـ 0 لضمان صحة الإجمالي
    const subtotal = items.reduce((acc, item) => {
        const q = parseFloat(item.qty) || 0;
        const mq = parseFloat(item.meter_qty) || 0;
        const p = parseFloat(item.price) || 0;

        // ملاحظة: إذا كنت تريد أن يكون (الكمية م) اختيارية بحيث لو فرغت لا تصفر السطر،
        // يمكن تغيير (parseFloat(item.meter_qty) || 0) إلى (parseFloat(item.meter_qty) || 1)
        return acc + (q * mq * p);
    }, 0);

    const vat = subtotal * 0.15;
    const total = subtotal + vat;

    const formatNum = (num) => new Intl.NumberFormat('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 }).format(num);

    const handleSaveAndPrint = async () => {
        if (!customer) {
            alert("يرجى إدخال اسم العميل أولاً");
            return;
        }

        const fullData = {
            quoteNumber: quoteNum,
            customer,
            items,
            notes,
            subtotal,
            vat,
            total,
            date: new Date().toLocaleDateString('en-GB'),
            createdBy: currentUser ? currentUser.name : "غير معروف",
            history: [
                ...history,
                {
                    action: edit ? "تعديل وطباعة" : "إنشاء وطباعة",
                    user: currentUser ? currentUser.name : "المدير العام",
                    time: new Date().toLocaleString('en-GB')
                }
            ]
        };

        const res = await fetch('/api/quotes/manage', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(fullData)
        });

        if (res.ok) {
            const originalTitle = document.title;
            document.title = `عرض سعر - ${customer} - ${quoteNum}`;
            setTimeout(() => {
                window.print();
                document.title = originalTitle;
            }, 500);
        } else {
            alert("حدث خطأ أثناء الحفظ");
        }
    };

    if (!currentUser) return <div style={{ color: '#fff', textAlign: 'center', marginTop: '50px' }}>جاري التحقق من الصلاحيات...</div>;

    return (
        <div className="page-wrapper" style={{ backgroundColor: '#1a1a1a', padding: '20px 0', minHeight: '100vh', direction: 'rtl', overflowX: 'hidden' }}>
            <style>{`
                * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
                .viewport-fix { width: 100%; display: flex; justify-content: center; align-items: flex-start; }
                .scaler { transform-origin: top center; }

                @media (max-width: 800px) {
                    .scaler { transform: scale(0.48); width: 794px; }
                    .viewport-fix { margin-bottom: -400px; min-height: 400px; }
                }

                @media (max-width: 480px) {
                    .scaler { transform: scale(0.43); }
                    .viewport-fix { margin-bottom: -500px; min-height: 350px; }
                }

                @media print {
                    @page { size: A4 portrait; margin: 0 !important; }
                    html, body, .page-wrapper { background: white !important; height: auto !important; overflow: visible !important; }
                    .viewport-fix { display: block !important; margin: 0 !important; height: auto !important; }
                    .scaler { transform: none !important; width: 100% !important; }
                    .no-print { display: none !important; }
                    .main-table { width: 100% !important; box-shadow: none !important; table-layout: auto !important; }
                    thead { display: table-header-group; }
                    tfoot { display: table-footer-group; }
                    tr { page-break-inside: avoid; }
                    textarea { height: auto !important; overflow: visible !important; }
                }

                .main-table { width: 794px; background: white; border-collapse: collapse; box-shadow: 0 0 30px rgba(0,0,0,0.5); }
                .content-area { padding: 40px 50px; vertical-align: top; min-height: 800px; }
                .item-table { width: 100%; border-collapse: collapse; border: 1.5px solid ${brandColor}; table-layout: fixed; }
                .item-table th { background-color: ${brandColor} !important; color: white !important; padding: 10px 5px; font-size: 13px; border: 1px solid ${brandColor}; }
                .item-table td { padding: 10px 5px; border: 1px solid #eee; font-size: 13px; color: #111; word-wrap: break-word; }
                .item-table tr:nth-child(even) { background-color: #f9fdfc !important; }
                
                input, textarea { border: none; outline: none; width: 100%; background: transparent; text-align: center; font-family: inherit; resize: none; overflow: hidden; display: block; }
                .total-card { border: 2px solid ${brandColor}; border-radius: 4px; overflow: hidden; width: 280px; margin-right: auto; }
            `}</style>

            <div className="no-print" style={{ textAlign: 'center', marginBottom: '25px', display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
                <div style={{ color: '#aaa' }}>المصمم: <span style={{ color: brandColor, fontWeight: 'bold' }}>{currentUser.name}</span></div>
                <button onClick={() => router.push('/QuotationModernDesign/dashboard')} style={{ padding: '10px 25px', borderRadius: '30px', cursor: 'pointer', border: '1px solid #555', backgroundColor: '#333', color: '#fff' }}>السجل</button>
                <button onClick={handleSaveAndPrint} style={{ padding: '10px 40px', borderRadius: '30px', cursor: 'pointer', border: 'none', backgroundColor: accentColor, color: '#fff', fontWeight: 'bold' }}>💾 حفظ وطباعة PDF</button>
            </div>

            <div className="viewport-fix">
                <div className="scaler">
                    <table className="main-table">
                        <thead>
                            <tr>
                                <td>
                                    <div style={{ padding: '50px 50px 20px 50px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div style={{ borderRight: `6px solid ${brandColor}`, paddingRight: '20px' }}>
                                            <h1 style={{ fontSize: '38px', fontWeight: '900', color: brandColor, margin: 0 }}>QUOTATION</h1>
                                            <div style={{ fontSize: '15px', marginTop: '5px' }}>رقم العرض: <span style={{ color: '#dc2626', fontWeight: 'bold' }}>{quoteNum}</span></div>
                                            <div style={{ fontSize: '12px', color: '#666' }}>التاريخ: {new Date().toLocaleDateString('en-GB')}</div>
                                        </div>
                                        <img src="/logos/logo.svg" alt="Logo" style={{ width: '260px' }} />
                                    </div>
                                </td>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td className="content-area">
                                    <div style={{ marginBottom: '35px', borderBottom: `2px solid ${accentColor}`, paddingBottom: '10px' }}>
                                        <span style={{ color: '#666', fontSize: '13px' }}>السادة المحترمون / </span>
                                        <input style={{ fontWeight: '700', fontSize: '14px', width: '70%', textAlign: 'right' }} value={customer} onChange={(e) => setCustomer(e.target.value)} placeholder="اسم العميل..." />
                                    </div>

                                    <table className="item-table">
                                        <thead>
                                            <tr>
                                                <th className="no-print" style={{ width: '40px' }}>حذف</th>
                                                <th style={{ width: '30px' }}>م</th>
                                                <th style={{ textAlign: 'right', width: '220px' }}>الوصــف والبيــان</th>
                                                <th style={{ width: '60px' }}>المقاس</th>
                                                <th style={{ width: '50px' }}>العدد</th>
                                                <th style={{ width: '60px' }}>الكمية م</th>
                                                <th style={{ width: '70px' }}>السعر</th>
                                                <th style={{ width: '90px' }}>الإجمالي</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {items.map((item, index) => (
                                                <tr key={item.id}>
                                                    <td className="no-print" style={{ textAlign: 'center' }}>
                                                        <button style={{ color: '#ef4444', border: 'none', background: 'none' }} onClick={() => { if (items.length > 1) setItems(items.filter(i => i.id !== item.id)); }}>✕</button>
                                                    </td>
                                                    <td style={{ textAlign: 'center' }}>{index + 1}</td>
                                                    <td><textarea rows="1" value={item.desc} onInput={autoGrow} onChange={(e) => { const n = [...items]; n[index].desc = e.target.value; setItems(n); }} style={{ textAlign: 'right' }} /></td>
                                                    <td><input value={item.size} onChange={(e) => { const n = [...items]; n[index].size = e.target.value; setItems(n); }} /></td>
                                                    <td><input value={item.qty} onChange={(e) => { const n = [...items]; n[index].qty = e.target.value; setItems(n); }} /></td>
                                                    <td><input value={item.meter_qty} onChange={(e) => { const n = [...items]; n[index].meter_qty = e.target.value; setItems(n); }} /></td>
                                                    <td><input value={item.price} onChange={(e) => { const n = [...items]; n[index].price = e.target.value; setItems(n); }} /></td>
                                                    <td style={{ fontWeight: '900', color: brandColor, textAlign: 'center' }}>
                                                        {formatNum((parseFloat(item.qty) || 0) * (parseFloat(item.meter_qty) || 0) * (parseFloat(item.price) || 0))}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>

                                    <button className="no-print" style={{ marginTop: '15px', backgroundColor: accentColor, color: '#fff', border: 'none', borderRadius: '50%', width: '30px', height: '30px', cursor: 'pointer' }}
                                        onClick={() => setItems([...items, { id: Date.now(), desc: '', size: '', qty: '', meter_qty: '', price: '' }])}>+</button>

                                    <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'space-between', pageBreakInside: 'avoid' }}>
                                        <div style={{ width: '55%' }}>
                                            <div style={{ fontWeight: 'bold', color: brandColor, marginBottom: '8px' }}>ملاحظات وشروط:</div>
                                            <textarea onInput={autoGrow} style={{ border: '1px solid #eee', padding: '12px', fontSize: '12px', minHeight: '100px', borderRadius: '4px', textAlign: 'right', backgroundColor: '#fafafa' }}
                                                value={notes} onChange={(e) => setNotes(e.target.value)} />
                                        </div>

                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                                            <div className="total-card">
                                                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', fontSize: '13px', borderBottom: '1px solid #eee' }}>
                                                    <span>الإجمالي قبل الضريبة:</span><span>{formatNum(subtotal)}</span>
                                                </div>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', fontSize: '13px', borderBottom: '1px solid #eee' }}>
                                                    <span>ضريبة القيمة المضافة (15%):</span><span>{formatNum(vat)}</span>
                                                </div>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', backgroundColor: brandColor, color: '#fff', fontSize: '15px' }}>
                                                    <span style={{ fontWeight: 'bold' }}>الإجمالي بعد الضريبة:</span>
                                                    <span style={{ fontWeight: '900' }}>{formatNum(total)} ر.س</span>
                                                </div>
                                            </div>
                                            <div style={{ textAlign: 'center', marginTop: '15px', paddingLeft: '20px' }}>
                                                <img src="/logos/sign.png" alt="Stamp" style={{ width: '130px' }} />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>

                        <tfoot>
                            <tr>
                                <td>
                                    <div style={{ padding: '0 0 20px 0' }}>
                                        <img src="/logos/footer.svg" alt="Footer" style={{ width: '100%', display: 'block' }} />
                                    </div>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>

            <div className="no-print" style={{ textAlign: 'center', marginTop: '20px', paddingBottom: '60px' }}>
                <button onClick={handleSaveAndPrint} style={{ padding: '15px 80px', backgroundColor: '#333', color: '#fff', border: 'none', borderRadius: '40px', fontWeight: 'bold' }}>💾 حفظ وطباعة PDF</button>
            </div>
        </div>
    );
}