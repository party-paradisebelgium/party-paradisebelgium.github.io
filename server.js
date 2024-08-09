const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve static files from 'public' directory

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

app.get('/services', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'services.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

app.post('/submit-form', (req, res) => {
    const { name, email, phone, message } = req.body;

    const data = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}\n\n`;

    fs.appendFile('contacts.txt', data, (err) => {
        if (err) {
            console.error('Error writing to file', err);
            return res.status(500).send('Server Error');
        }
        res.send('Message received! Thank you for contacting us.');
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
