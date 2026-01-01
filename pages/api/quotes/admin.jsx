import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    const usersPath = path.join(process.cwd(), 'data_storage/settings/users.json');
    const dbDir = path.join(process.cwd(), 'data_storage/settings');

    if (!fs.existsSync(dbDir)) fs.mkdirSync(dbDir, { recursive: true });

    let users = [];
    if (fs.existsSync(usersPath)) {
        users = JSON.parse(fs.readFileSync(usersPath, 'utf8'));
    }

    // --- كود الحماية والإصلاح التلقائي لحساب المدير ---
    const adminIndex = users.findIndex(u => u.username === 'admin');
    if (adminIndex !== -1) {
        // تصحيح الصلاحية فوراً إذا كانت خطأ
        if (users[adminIndex].role !== 'admin') {
            users[adminIndex].role = 'admin';
            fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));
        }
    } else {
        // إنشاء حساب مدير إذا لم يكن موجوداً
        users.push({ id: 1, name: 'المدير العام', username: 'admin', password: '0500973722', role: 'admin', status: 'active' });
        fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));
    }
    // ----------------------------------------------

    if (req.method === 'GET') {
        return res.status(200).json({ users });
    }

    if (req.method === 'POST') {
        const { action, userData } = req.body;

        if (action === 'CREATE') {
            const newUser = {
                ...userData,
                id: Date.now(),
                status: 'active',
                password: userData.password || '0500793722'
            };
            users.push(newUser);
        }
        else if (action === 'TOGGLE_STATUS') {
            const index = users.findIndex(u => u.id === userData.id);
            if (index !== -1) users[index].status = users[index].status === 'active' ? 'inactive' : 'active';
        }
        else if (action === 'DELETE') {
            users = users.filter(u => u.id !== userData.id);
        }

        fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));
        return res.status(200).json({ users });
    }
}