require('dotenv').config();
const mongoose = require('mongoose');

async function checkDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to:', mongoose.connection.name);

        const Contact = mongoose.model('Contact', new mongoose.Schema({}, { strict: false, collection: 'user_info_fsd_1' }));

        const records = await Contact.find({}).sort({ date: -1 }).limit(5);
        console.log('--- LATEST 5 RECORDS IN user_info_fsd_1 ---');
        console.log(JSON.stringify(records, null, 2));

        await mongoose.disconnect();
    } catch (err) {
        console.error(err);
    }
}

checkDB();
