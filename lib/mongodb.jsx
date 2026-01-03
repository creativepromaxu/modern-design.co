import { MongoClient } from 'mongodb';

// 🔴 الحل المؤقت: وضعنا الرابط مباشرة هنا
const uri = 'mongodb+srv://creativepromaxu_db_user:db_0509460017@cluster0.oz32otq.mongodb.net/modern_design?retryWrites=true&w=majority';
const options = {};

let client;
let clientPromise;

// حذفنا الشرط الذي كان يسبب الخطأ لأن الرابط موجود الآن
// if (!process.env.MONGODB_URI) { ... } 

if (process.env.NODE_ENV === 'development') {
    if (!global._mongoClientPromise) {
        client = new MongoClient(uri, options);
        global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
} else {
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
}

export default clientPromise;