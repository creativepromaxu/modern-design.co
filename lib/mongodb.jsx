import { MongoClient } from 'mongodb';

// لاحظ كلمة المرور الجديدة في الرابط
const uri = 'mongodb+srv://creativepromaxu_db_user:M0dernDesign2026@cluster0.oz32otq.mongodb.net/modern_design?retryWrites=true&w=majority';
const options = {};

let client;
let clientPromise;

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