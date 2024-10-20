const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb+srv://rvhariprakash3:2HNB12yFynNP9BgQ@cluster0.y4vwf.mongodb.net/hel?retryWrites=true&w=majority&appName=Cluster0')
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.log(err));

// Define Schema for Contact Information
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
});

// Define Schema for Feedback
const feedbackSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    date: { type: Date, default: Date.now }
});

const Contact = mongoose.model('Contact', contactSchema);
const Feedback = mongoose.model('Feedback', feedbackSchema);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes for static pages
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/home.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/about.html'));
});

app.get('/services', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/services.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/contact.html'));
});
// Serve Custom Web Development Page
app.get('/servicesa', (req, res) => {
    
    res.sendFile(path.join(__dirname, 'views/servicesa.html'));
});

// Serve AI and Machine Learning Solutions Page
app.get('/servicesb', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/servicesb.html'));
});

// Serve Mobile App Development Page
app.get('/servicesc', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/servicesc.html'));
});

// Serve Cloud Solutions Page
app.get('/servicesd', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/servicesd.html'));
});

// Serve UI/UX Design Page
app.get('/servicese', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/servicese.html'));
});


// Serve feedback page
app.get('/feedback', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/feedback.html'));
});

// Handle contact form submission
app.post('/submit', async (req, res) => {
    const newContact = new Contact({
        name: req.body.name,
        email: req.body.email,
        message: req.body.message,
    });

    try {
        await newContact.save();
        res.send('Thank you for your message!');
    } catch (err) {
        res.send('Error saving contact.');
    }
});

// Handle feedback form submission
app.post('/feedback', async (req, res) => {
    const newFeedback = new Feedback({
        name: req.body.name,
        email: req.body.email,
        message: req.body.message,
    });

    try {
        await newFeedback.save();
        res.send('Thank you for your feedback!');
    } catch (err) {
        res.send('Error saving feedback.');
    }
});

// Start the server
app.listen(4000, () => {
    console.log('Server is running on port 1500');
});
