const express = require('express');
const app = express();
const bingoRoutes = require('./routes/bingoRoutes');
// const session = require('express-session');
// const passport = require('passport');
// require('./config/passport-config')(passport);

app.use(express.json()); // For parsing JSON bodies

app.use('/bingo', bingoRoutes);

// app.use(session({
//     secret: 'sdjkfalcnlee',
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: true }
// }));

// app.use(passport.initialize());
// app.use(passport.session());

const port = 3000;
const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});

module.exports = server;