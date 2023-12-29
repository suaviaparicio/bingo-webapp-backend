const express = require('express');
const app = express();
const bingoRoutes = require('./routes/bingoRoutes');
const session = require('express-session');

app.use(express.json()); // For parsing JSON bodies

app.use('/bingo', bingoRoutes);

app.use(session({
    secret: 'sdjkfalcnlee',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));

const port = 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});