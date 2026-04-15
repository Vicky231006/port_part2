require('dotenv').config();
const mongoose = require('mongoose');

async function listAll() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const admin = mongoose.connection.db.admin();
        const dbs = await admin.listDatabases();
        console.log('Available Databases:');
        console.log(JSON.stringify(dbs, null, 2));

        for (const dbInfo of dbs.databases) {
            const db = mongoose.connection.useDb(dbInfo.name);
            const collections = await db.listCollections().toArray();
            console.log(`\nDatabase: ${dbInfo.name}`);
            for (const col of collections) {
                const count = await db.collection(col.name).countDocuments();
                console.log(` - Collection: ${col.name} (Documents: ${count})`);
            }
        }

        await mongoose.disconnect();
    } catch (err) {
        console.error(err);
    }
}

listAll();
