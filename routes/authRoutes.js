const express = require('express');
const router = express.Router();
const authenticateUser = require('../controllers/BingoUserAuth');

router.post('/auth', async (req, res) => {
    const { username, password } = req.body;
    const success = await authenticateUser(username, password);
    
    if (success) {
        req.session.user = username;
        console.log(req.session.user)
        res.json({ message: 'Autenticación exitosa', user: username });
    }
    else {
        res.status(401).send('Autenticación fallida');
    }
});

router.get('/check-session', async (req, res) => {
    if (req.session.user) {
        //res.json({ loggedIn: true, user: req.session.user, bingoCard: req.session.card });
        res.send({ loggedIn: true });
    } else {
        res.send({ loggedIn: false });
    }
});

module.exports = router;