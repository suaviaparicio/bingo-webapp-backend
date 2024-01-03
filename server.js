const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        // Allow requests from any localhost origin
        if (origin.startsWith('http://localhost:') || origin.startsWith('https://localhost:')) {
            return callback(null, true);
        }

        // For other origins, you might reject them or handle them differently
        callback(new Error('CORS not allowed for this origin'));
    }
}));
const server = require('http').createServer(app);
const bingoRoutes = require('./routes/bingoRoutes');
const wsServer = require('./wsServer');
// const session = require('express-session');
// const passport = require('passport');
// require('./config/passport-config')(passport);
wsServer.initialize(server);

app.use(express.json()); // For parsing JSON bodies
//app.use(bodyParser.json());

app.use('/api', bingoRoutes);

// app.use(cors());


// app.use(session({
//     secret: 'sdjkfalcnlee',
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: true }
// }));

// app.use(passport.initialize());
// app.use(passport.session());

const port = 3000;
server.listen(port, () => {
    console.log(`Server running on port ${port}`)
});

module.exports = server;
