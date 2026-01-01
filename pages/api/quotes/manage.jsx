import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    const rootDir = process.cwd();
    const dbDir = path.join(rootDir, 'data_storage/settings');
    const quotesDir = path.join(rootDir, 'data_storage/quotes');
    const archiveDir = path.join(rootDir, 'data_storage/archive'); // مجلد الأرشفة الجديد
    const counterPath = path.join(dbDir, 'counter.json');

    // إنشاء المجلدات إذا لم تكن موجودة
    if (!fs.existsSync(dbDir)) fs.mkdirSync(dbDir, { recursive: true });
    if (!fs.existsSync(quotesDir)) fs.mkdirSync(quotesDir, { recursive: true });
    if (!fs.existsSync(archiveDir)) fs.mkdirSync(archiveDir, { recursive: true });

    if (!fs.existsSync(counterPath)) {
        fs.writeFileSync(counterPath, JSON.stringify({ lastId: 7044 }));
    }

    try {
        // --- جلب العروض ---
        if (req.method === 'GET') {
            const { type } = req.query;
            if (type === 'nextId') {
                const fileData = fs.readFileSync(counterPath, 'utf8');
                const counter = JSON.parse(fileData);
                return res.status(200).json({ nextId: counter.lastId + 1 });
            } else {
                const files = fs.readdirSync(quotesDir);
                const allQuotes = files
                    .filter(file => file.endsWith('.txt'))
                    .map(file => {
                        const content = fs.readFileSync(path.join(quotesDir, file), 'utf8');
                        return JSON.parse(content);
                    })
                    .sort((a, b) => b.quoteNumber - a.quoteNumber);
                return res.status(200).json(allQuotes);
            }
        }

        // --- حفظ / تحديث / طلب حذف / أرشفة جماعية ---
        if (req.method === 'POST') {
            const body = req.body;

            // 1. ميزة تحديث حالة الحذف (السابقة)
            if (body.action === 'UPDATE_DELETE_STATUS') {
                const filePath = path.join(quotesDir, `${body.quoteNumber}.txt`);
                if (fs.existsSync(filePath)) {
                    let quoteData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
                    quoteData.deletionRequested = body.status;
                    fs.writeFileSync(filePath, JSON.stringify(quoteData, null, 2), 'utf8');
                    return res.status(200).json({ message: 'Status Updated Successfully' });
                }
            }

            // 2. ميزة الأرشفة الجماعية الجديدة (نقل الملفات لتسريع النظام)
            if (body.action === 'BULK_ARCHIVE') {
                const { startDate, endDate } = body;
                const files = fs.readdirSync(quotesDir);
                let archivedCount = 0;

                const start = new Date(startDate);
                const end = new Date(endDate);

                files.filter(f => f.endsWith('.txt')).forEach(file => {
                    const filePath = path.join(quotesDir, file);
                    const quoteData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

                    // تحويل التاريخ من DD/MM/YYYY إلى Date قابل للمقارنة
                    const [day, month, year] = quoteData.date.split('/');
                    const quoteDate = new Date(`${year}-${month}-${day}`);

                    if (quoteDate >= start && quoteDate <= end) {
                        const archivePath = path.join(archiveDir, file);
                        fs.renameSync(filePath, archivePath); // نقل الملف بدلاً من حذفه
                        archivedCount++;
                    }
                });

                return res.status(200).json({ message: `تمت أرشفة ${archivedCount} عرض سعر بنجاح` });
            }

            // 3. الحفظ العادي للعروض (جديد أو تعديل - السابقة)
            const quoteId = body.quoteNumber;
            const filePath = path.join(quotesDir, `${quoteId}.txt`);
            fs.writeFileSync(filePath, JSON.stringify(body, null, 2), 'utf8');
            fs.writeFileSync(counterPath, JSON.stringify({ lastId: parseInt(quoteId) }), 'utf8');
            return res.status(200).json({ message: 'Saved Successfully' });
        }

        // --- الحذف النهائي (السابقة ) ---
        if (req.method === 'DELETE') {
            const { quoteNumber } = req.query;
            const filePath = path.join(quotesDir, `${quoteNumber}.txt`);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
                return res.status(200).json({ message: 'Deleted Successfully' });
            } else {
                return res.status(404).json({ error: 'File not found' });
            }
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}