import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    const usersPath = path.join(process.cwd(), 'data_storage/settings/users.json');
    const dbDir = path.join(process.cwd(), 'data_storage/settings');

    if (!fs.existsSync(dbDir)) fs.mkdirSync(dbDir, { recursive: true });

    if (!fs.existsSync(usersPath)) {
        const defaultAdmin = [{
            id: 1,
            name: 'المدير العام',
            username: 'admin',
            password: '0500973722',
            role: 'admin',
            status: 'active'
        }];
        fs.writeFileSync(usersPath, JSON.stringify(defaultAdmin, null, 2));
    }

    const users = JSON.parse(fs.readFileSync(usersPath, 'utf8'));

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
                password: userData.password || '123456'
            };
            users.push(newUser);
        }
        else if (action === 'UPDATE') {
            const index = users.findIndex(u => u.id === userData.id);
            if (index !== -1) users[index] = { ...users[index], ...userData };
        }
        // الإجراء الجديد لتغيير كلمة المرور
        else if (action === 'CHANGE_PASSWORD') {
            const index = users.findIndex(u => u.id === userData.id);
            if (index !== -1) {
                users[index].password = userData.newPassword;
            }
        }
        else if (action === 'TOGGLE_STATUS') {
            const index = users.findIndex(u => u.id === userData.id);
            if (index !== -1) users[index].status = users[index].status === 'active' ? 'inactive' : 'active';
        }
        else if (action === 'DELETE') {
            const filteredUsers = users.filter(u => u.id !== userData.id);
            fs.writeFileSync(usersPath, JSON.stringify(filteredUsers, null, 2));
            return res.status(200).json({ message: 'Deleted' });
        }

        fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));
        return res.status(200).json({ users });
    }
}