const express = require('express');
const router = express.Router();
const passport = require('passport');
const authenticateUser = require('../models/BingoUserAuth');

router.post('/auth', async (req, res) => {
    const { username, password } = req.body;
    const success = await authenticateUser(username, password);
    
    if (success) {
        req.session.user = username;
        res.send('Autenticación exitosa');
    }
    else {
        res.status(401).send('Autenticación fallida');
    }
});

router.get('/check-session', (req, res) => {
    if (req.session.user) {
        res.send({ loggedIn: true, user: req.session.user, bingCard: req.session.card });
    } else {
        res.send({ loggedIn: false });
    }
});

module.exports = router;