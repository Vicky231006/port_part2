require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
// Serve static files from the current directory
app.use(express.static(path.join(__dirname)));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI).then(() => console.log('MongoDB Connected'))
    .catch(err => console.log('MongoDB connection error:', err));

const ContactSchema = new mongoose.Schema({
    name: String,
    mobile: String,
    email: String,
    message: String,
    date: { type: Date, default: Date.now }
});

const Contact = mongoose.model('Contact', ContactSchema);

// Endpoint to handle form submission
app.post('/api/contact', async (req, res) => {
    try {
        const { name, mobile, email, message } = req.body;
        const newContact = new Contact({ name, mobile, email, message });
        await newContact.save();
        res.status(200).json({ success: true, message: 'Message saved successfully' });
    } catch (err) {
        console.error('Error saving contact:', err);
        res.status(500).json({ error: 'Server error. Please try again.' });
    }
});

// For any other route, send the index.html file
app.get(/^(?!\/api).+/, (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
