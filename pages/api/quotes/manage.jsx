// pages/api/quotes/manage.js
import clientPromise from '../../../lib/mongodb';

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("modern_design");
    const quotesCollection = db.collection("quotes");
    const countersCollection = db.collection("counters");

    try {
        // --- 1. جلب البيانات (GET) ---
        if (req.method === 'GET') {
            const { type } = req.query;

            // أ. جلب رقم العرض التالي
            if (type === 'nextId') {
                let counter = await countersCollection.findOne({ _id: 'quoteId' });
                if (!counter) {
                    // إذا كانت قاعدة البيانات جديدة، نبدأ من الرقم الذي حددته أنت 7044
                    await countersCollection.insertOne({ _id: 'quoteId', lastId: 7044 });
                    counter = { lastId: 7044 };
                }
                return res.status(200).json({ nextId: counter.lastId + 1 });
            }

            // ب. جلب كل العروض (مع استثناء المؤرشفة لضمان السرعة)
            else {
                const allQuotes = await quotesCollection
                    .find({ archived: { $ne: true } }) // جلب التي لم يتم أرشفتها فقط
                    .sort({ quoteNumber: -1 }) // الترتيب من الأحدث
                    .toArray();
                return res.status(200).json(allQuotes);
            }
        }

        // --- 2. العمليات البريدية (POST) ---
        if (req.method === 'POST') {
            const body = req.body;

            // أ. تحديث حالة طلب الحذف
            if (body.action === 'UPDATE_DELETE_STATUS') {
                await quotesCollection.updateOne(
                    { quoteNumber: parseInt(body.quoteNumber) },
                    { $set: { deletionRequested: body.status } }
                );
                return res.status(200).json({ message: 'Status Updated' });
            }

            // ب. الأرشفة الجماعية (تعويضاً لنقل الملفات يدوياً)
            if (body.action === 'BULK_ARCHIVE') {
                const { startDate, endDate } = body;
                const start = new Date(startDate);
                const end = new Date(endDate);

                // جلب العروض النشطة ومعالجتها
                const activeQuotes = await quotesCollection.find({ archived: { $ne: true } }).toArray();
                let archivedCount = 0;

                for (const quote of activeQuotes) {
                    const [day, month, year] = quote.date.split('/');
                    const quoteDate = new Date(`${year}-${month}-${day}`);

                    if (quoteDate >= start && quoteDate <= end) {
                        await quotesCollection.updateOne(
                            { _id: quote._id },
                            { $set: { archived: true } }
                        );
                        archivedCount++;
                    }
                }
                return res.status(200).json({ message: `تمت أرشفة ${archivedCount} عرض بنجاح` });
            }

            // ج. حفظ عرض جديد أو تعديل عرض قائم (Upsert)
            const quoteId = parseInt(body.quoteNumber);

            // تخزين البيانات كاملة مع التأكد من أن quoteNumber رقم وليس نص
            await quotesCollection.updateOne(
                { quoteNumber: quoteId },
                { $set: { ...body, quoteNumber: quoteId, updatedAt: new Date() } },
                { upsert: true }
            );

            // تحديث العداد (Counter) ليكون دائماً عند أعلى رقم تم استخدامه
            await countersCollection.updateOne(
                { _id: 'quoteId' },
                { $max: { lastId: quoteId } }
            );

            return res.status(200).json({ message: 'Saved Successfully' });
        }

        // --- 3. الحذف النهائي (DELETE) ---
        if (req.method === 'DELETE') {
            const { quoteNumber } = req.query;
            await quotesCollection.deleteOne({ quoteNumber: parseInt(quoteNumber) });
            return res.status(200).json({ message: 'Deleted Successfully' });
        }

    } catch (error) {
        console.error("Database Critical Error:", error);
        return res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
}