const express = require('express');
const cors = require('cors');
const http = require('http');
const session = require('express-session');
const dotenv = require('dotenv');

// Initialize environment variables
dotenv.config();

const app = express();
const server = http.createServer(app);

// Import routes and WebSocket server
const bingoRoutes = require('./routes/bingoRoutes');
const authRoutes = require('./routes/authRoutes');
const wsServer = require('./wsServer');

// CORS configuration
const corsOptions = {
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        // Allow requests from any localhost origin
        if (origin.startsWith('http://localhost:') || origin.startsWith('https://localhost:')) {
            return callback(null, true);
        }

        // For other origins, reject or handle them differently
        callback(new Error('CORS not allowed for this origin'));
    }
};

app.use(cors(corsOptions));

// Session configuration
const sessionOptions = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
};

app.use(session(sessionOptions));

// Body parsing middleware
app.use(express.json());

// Initialize WebSocket server
wsServer.initialize(server);

// Routes
app.use('/api', bingoRoutes, authRoutes);

// Server configuration
const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

module.exports = server;
