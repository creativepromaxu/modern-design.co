import clientPromise from '../../../lib/mongodb';

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("modern_design");
    const usersCollection = db.collection("users");

    try {
        // --- 1. جلب المستخدمين (GET) ---
        if (req.method === 'GET') {
            const users = await usersCollection.find({}).toArray();

            // ميزة: إذا كانت قاعدة البيانات فارغة تماماً، أضف المدير التلقائي
            if (users.length === 0) {
                const defaultAdmin = {
                    id: 1,
                    name: 'المدير العام',
                    username: 'admin',
                    password: '0500973722',
                    role: 'admin',
                    status: 'active'
                };
                await usersCollection.insertOne(defaultAdmin);
                return res.status(200).json({ users: [defaultAdmin] });
            }

            return res.status(200).json({ users });
        }

        // --- 2. العمليات (POST) ---
        if (req.method === 'POST') {
            const { action, userData } = req.body;

            if (action === 'CREATE') {
                const newUser = {
                    ...userData,
                    id: Date.now(),
                    status: 'active',
                    password: userData.password || '123456'
                };
                await usersCollection.insertOne(newUser);
            }
            else if (action === 'UPDATE') {
                await usersCollection.updateOne(
                    { id: userData.id },
                    { $set: userData }
                );
            }
            else if (action === 'CHANGE_PASSWORD') {
                await usersCollection.updateOne(
                    { id: userData.id },
                    { $set: { password: userData.newPassword } }
                );
            }
            else if (action === 'TOGGLE_STATUS') {
                const user = await usersCollection.findOne({ id: userData.id });
                if (user) {
                    const newStatus = user.status === 'active' ? 'inactive' : 'active';
                    await usersCollection.updateOne({ id: userData.id }, { $set: { status: newStatus } });
                }
            }
            else if (action === 'DELETE') {
                await usersCollection.deleteOne({ id: userData.id });
                return res.status(200).json({ message: 'Deleted' });
            }

            // جلب القائمة المحدثة بعد أي عملية
            const updatedUsers = await usersCollection.find({}).toArray();
            return res.status(200).json({ users: updatedUsers });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Database Error" });
    }
}