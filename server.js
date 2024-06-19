const path = require('path');
const express = require('express');
const cloudinary = require('cloudinary');
const app = require('./backend/app');
const connectDatabase = require('./backend/config/database');
const PORT = process.env.PORT || 4000;
import http from 'http';


// UncaughtException Error
process.on('uncaughtException', (err) => {
    console.log(`Error: ${err.message}`);
    process.exit(1);
});

connectDatabase();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// deployment
__dirname = path.resolve();
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    });
} else {
    app.get('/', (req, res) => {
        res.send('Server is Running! 🚀');
    });
}
// const server = http.createServer((req, res) => {
//     // Set the response header
//     res.writeHead(200, {'Content-Type': 'text/plain'});
//     // Write some text to the response
//     res.end('Welcome to my simple Node.js app!');
// });
const server = app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
});
// const port = 3000;
// server.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });

// Unhandled Promise Rejection
process.on('unhandledRejection', (err) => {
    console.log(`Error: ${err.message}`);
    server.close(() => {
        process.exit(1);
    });
});
