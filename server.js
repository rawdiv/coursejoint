const express = require('express');
const path = require('path');
const compression = require('compression');
const helmet = require('helmet');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Security middleware
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: [
                "'self'",
                "'unsafe-inline'",
                "'unsafe-eval'",
                "https://checkout.razorpay.com",
                "https://cdnjs.cloudflare.com",
                "https://api.razorpay.com"
            ],
            styleSrc: [
                "'self'",
                "'unsafe-inline'",
                "https://fonts.googleapis.com",
                "https://cdnjs.cloudflare.com",
                "https://checkout.razorpay.com"
            ],
            fontSrc: [
                "'self'",
                "https://fonts.gstatic.com",
                "https://cdnjs.cloudflare.com"
            ],
            imgSrc: [
                "'self'",
                "data:",
                "https:",
                "blob:",
                "https://coursejoint.com",
                "https://checkout.razorpay.com"
            ],
            connectSrc: [
                "'self'",
                "https://api.razorpay.com",
                "https://checkout.razorpay.com",
                "https://rzp.io"
            ],
            frameSrc: [
                "'self'",
                "https://checkout.razorpay.com",
                "https://api.razorpay.com"
            ],
            frameAncestors: ["'self'"],
            formAction: ["'self'", "https://checkout.razorpay.com"]
        },
    },
}));

// Enable CORS
app.use(cors());

// Compress all responses
app.use(compression());

// Serve static files from the root directory
app.use(express.static(__dirname));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/law', (req, res) => {
    res.sendFile(path.join(__dirname, 'law.html'));
});

app.get('/law.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'law.html'));
});

app.get('/courses', (req, res) => {
    res.redirect('/law');
});

// Handle section links in index.html
app.get('/#about', (req, res) => {
    res.redirect('/#about');
});

app.get('/#testimonials', (req, res) => {
    res.redirect('/#testimonials');
});

app.get('/#contact', (req, res) => {
    res.redirect('/#contact');
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'healthy' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// 404 handler
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, '404.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running in ${NODE_ENV} mode on port ${PORT}`);
}); 