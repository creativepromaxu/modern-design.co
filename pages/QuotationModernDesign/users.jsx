import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function UsersManagement() {
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showPassModal, setShowPassModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [newPassword, setNewPassword] = useState('');
    const [newUser, setNewUser] = useState({ name: '', username: '', password: '', role: 'designer' });
    const router = useRouter();
    const brandColor = "#18907A";

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || user.role !== 'admin') {
            alert("عذراً، هذه الصفحة للمدير فقط");
            router.push('/QuotationModernDesign/dashboard');
        } else {
            fetchUsers();
        }
    }, [router]);

    const fetchUsers = () => {
        fetch('/api/users/manage')
            .then(res => res.json())
            .then(data => setUsers(data.users || []));
    };

    const handleAction = async (action, userData) => {
        if (action === 'CREATE' && !userData.password) {
            alert("يرجى تحديد كلمة مرور للموظف");
            return;
        }

        const res = await fetch('/api/users/manage', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action, userData })
        });

        if (res.ok) {
            fetchUsers();
            setShowModal(false);
            setShowPassModal(false);
            setNewPassword('');
            setNewUser({ name: '', username: '', password: '', role: 'designer' });
        }
    };

    return (
        <div style={{ padding: '15px', direction: 'rtl', backgroundColor: '#f4f7f6', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
            <style jsx>{`
                .header-nav {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 20px;
                    flex-wrap: wrap;
                    gap: 15px;
                }
                .user-table-container {
                    background: #fff;
                    border-radius: 12px;
                    overflow: hidden;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.05);
                }
                @media (max-width: 768px) {
                    .desktop-table { display: none; }
                    .header-nav { flex-direction: column; text-align: center; }
                    .mobile-user-card {
                        background: #fff;
                        padding: 15px;
                        border-radius: 12px;
                        margin-bottom: 10px;
                        box-shadow: 0 2px 5px rgba(0,0,0,0.05);
                        border-right: 5px solid ${brandColor};
                    }
                    .modal-box { width: 90% !important; padding: 20px !important; }
                }
                @media (min-width: 769px) {
                    .mobile-users-list { display: none; }
                }
            `}</style>

            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <div className="header-nav">
                    <h1 style={{ color: '#333', margin: 0, fontSize: '22px' }}>إدارة طاقم العمل</h1>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button onClick={() => router.push('/QuotationModernDesign/dashboard')} style={{ padding: '10px 15px', backgroundColor: '#666', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '13px' }}>العودة للسجل</button>
                        <button onClick={() => setShowModal(true)} style={{ backgroundColor: brandColor, color: '#fff', padding: '10px 15px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px' }}>+ إضافة مصمم</button>
                    </div>
                </div>

                {/* Mobile View */}
                <div className="mobile-users-list">
                    {users.map(user => (
                        <div key={user.id} className="mobile-user-card">
                            <div style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '5px' }}>{user.name}</div>
                            <div style={{ fontSize: '13px', color: '#666', marginBottom: '10px' }}>
                                اسم المستخدم: {user.username} |
                                <span style={{ color: user.role === 'admin' ? '#1976d2' : brandColor }}> {user.role === 'admin' ? 'مدير' : 'مصمم'}</span>
                            </div>
                            <div style={{ marginBottom: '10px', fontSize: '13px' }}>
                                الحالة: <span style={{ color: user.status === 'active' ? '#2e7d32' : '#c62828' }}>{user.status === 'active' ? 'نشط' : 'موقوف'}</span>
                            </div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', borderTop: '1px solid #eee', paddingTop: '10px' }}>
                                <button onClick={() => { setSelectedUser(user); setShowPassModal(true); }} style={{ flex: 1, padding: '8px', border: '1px solid #1976d2', background: 'none', color: '#1976d2', borderRadius: '5px', fontSize: '12px' }}>🔑 كلمة السر</button>
                                <button onClick={() => handleAction('TOGGLE_STATUS', { id: user.id })} style={{ flex: 1, padding: '8px', border: `1px solid ${brandColor}`, background: 'none', color: brandColor, borderRadius: '5px', fontSize: '12px' }}>{user.status === 'active' ? 'إيقاف' : 'تفعيل'}</button>
                                {user.role !== 'admin' && (
                                    <button onClick={() => window.confirm('حذف نهائي؟') && handleAction('DELETE', { id: user.id })} style={{ flex: '0 0 100%', padding: '8px', border: 'none', background: '#fee2e2', color: '#d32f2f', borderRadius: '5px', fontSize: '12px' }}>حذف الموظف</button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Desktop View */}
                <div className="user-table-container desktop-table">
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'right' }}>
                        <thead style={{ backgroundColor: '#f8faf9' }}>
                            <tr>
                                <th style={{ padding: '15px', borderBottom: '2px solid #eee' }}>الاسم</th>
                                <th style={{ padding: '15px', borderBottom: '2px solid #eee' }}>اسم المستخدم</th>
                                <th style={{ padding: '15px', borderBottom: '2px solid #eee' }}>الصلاحية</th>
                                <th style={{ padding: '15px', borderBottom: '2px solid #eee' }}>الحالة</th>
                                <th style={{ padding: '15px', borderBottom: '2px solid #eee' }}>الإجراءات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id} style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={{ padding: '15px' }}>{user.name}</td>
                                    <td style={{ padding: '15px' }}>{user.username}</td>
                                    <td style={{ padding: '15px' }}>
                                        <span style={{ backgroundColor: user.role === 'admin' ? '#e1f5fe' : '#f1f8e9', padding: '4px 8px', borderRadius: '5px', fontSize: '12px' }}>
                                            {user.role === 'admin' ? 'مدير' : 'مصمم'}
                                        </span>
                                    </td>
                                    <td style={{ padding: '15px' }}>
                                        <span style={{ color: user.status === 'active' ? '#2e7d32' : '#c62828', fontWeight: 'bold' }}>
                                            {user.status === 'active' ? '● نشط' : '● موقوف'}
                                        </span>
                                    </td>
                                    <td style={{ padding: '15px' }}>
                                        <button onClick={() => { setSelectedUser(user); setShowPassModal(true); }} style={{ marginLeft: '10px', color: '#1976d2', border: 'none', background: 'none', cursor: 'pointer', fontSize: '14px' }}>🔑 كلمة المرور</button>
                                        <button onClick={() => handleAction('TOGGLE_STATUS', { id: user.id })} style={{ marginLeft: '10px', color: brandColor, border: 'none', background: 'none', cursor: 'pointer', fontSize: '14px' }}>{user.status === 'active' ? 'إيقاف' : 'تفعيل'}</button>
                                        {user.role !== 'admin' && (
                                            <button onClick={() => window.confirm('نهائي؟') && handleAction('DELETE', { id: user.id })} style={{ color: '#d32f2f', border: 'none', background: 'none', cursor: 'pointer', fontSize: '14px' }}>حذف</button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modals - المودالات مع تحسين للجوال */}
            {(showModal || showPassModal) && (
                <div style={modalOverlayStyle}>
                    <div className="modal-box" style={modalContentStyle}>
                        {showModal ? (
                            <>
                                <h3 style={{ marginTop: 0, color: brandColor }}>إضافة مصمم جديد</h3>
                                <div style={{ marginBottom: '15px' }}>
                                    <label style={labelStyle}>الاسم الكامل</label>
                                    <input type="text" style={inputStyle} value={newUser.name} onChange={e => setNewUser({ ...newUser, name: e.target.value })} />
                                </div>
                                <div style={{ marginBottom: '15px' }}>
                                    <label style={labelStyle}>اسم المستخدم</label>
                                    <input type="text" style={inputStyle} value={newUser.username} onChange={e => setNewUser({ ...newUser, username: e.target.value })} />
                                </div>
                                <div style={{ marginBottom: '20px' }}>
                                    <label style={labelStyle}>كلمة المرور</label>
                                    <input type="password" style={inputStyle} value={newUser.password} onChange={e => setNewUser({ ...newUser, password: e.target.value })} />
                                </div>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <button onClick={() => handleAction('CREATE', newUser)} style={primaryBtnStyle(brandColor)}>حفظ</button>
                                    <button onClick={() => setShowModal(false)} style={secondaryBtnStyle}>إلغاء</button>
                                </div>
                            </>
                        ) : (
                            <>
                                <h3 style={{ marginTop: 0, color: '#1976d2' }}>تغيير كلمة المرور</h3>
                                <p style={{ fontSize: '13px' }}>المستخدم: {selectedUser?.name}</p>
                                <div style={{ marginBottom: '20px' }}>
                                    <input type="password" style={inputStyle} value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="كلمة المرور الجديدة" />
                                </div>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <button onClick={() => handleAction('CHANGE_PASSWORD', { id: selectedUser.id, newPassword: newPassword })} style={primaryBtnStyle('#1976d2')}>تحديث</button>
                                    <button onClick={() => { setShowPassModal(false); setNewPassword(''); }} style={secondaryBtnStyle}>إلغاء</button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

// التنسيقات الثابتة
const modalOverlayStyle = { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 };
const modalContentStyle = { backgroundColor: '#fff', padding: '30px', borderRadius: '15px', width: '400px' };
const labelStyle = { display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: 'bold' };
const inputStyle = { width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', boxSizing: 'border-box' };
const primaryBtnStyle = (color) => ({ flex: 1, backgroundColor: color, color: '#fff', padding: '12px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' });
const secondaryBtnStyle = { flex: 1, backgroundColor: '#eee', color: '#333', padding: '12px', border: 'none', borderRadius: '8px', cursor: 'pointer' };