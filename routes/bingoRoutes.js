const express = require('express');
const router = express.Router();
const game = require('../controllers/BingoGame');
const BingoCard = require('../controllers/BingoCard');
const BingoActiveUsers = require('../controllers/BingoActiveUsers');
const counter = require('../controllers/BingoCounter');
const { saveCardForUsername, getCardForUsername } = require('../controllers/BingoStoreCard');
const registerBingoWinner = require('../controllers/BingoRecordWin');
const card = new BingoCard();
const activeUsers = new BingoActiveUsers();

// Generate Bingo card
router.post('/generate-card', (req, res) => {
    const generatedCard = card.generateBingoCard()
    // const username = (req.session.user)
    username = 'exampleUser';
    saveCardForUsername(username, generatedCard)
    res.json(generatedCard)
});

// Start counter in the waiting rom
router.post('/start-counter', (req, res) => {
    counter.startCounter();
    res.send('El contador ha iniciado');
});

// Start the game
router.post('/start-game', (req, res) => {
    game.startGame();
    res.send('¡Atento! El juego está por iniciar');
});
// Stop the game
router.post('/stop-game', (req, res) => {
    game.stopGame();
    res.send('El juego ha terminado');
});

// Get current active users
router.get('/active-users', (req, res) => {
    res.json(activeUsers);
});

// Add a new user to the list of active users
router.post('/add-user', async (req, res) => {
    //const username = (req.session.user)
    username = 'exampleUser';
    activeUsers.addUser('exampleUser1');
    activeUsers.addUser('exampleUser');
    activeUsers.addUser('exampleUser2');
    res.send('Usuario agregado');
});

// Check if a player has won
router.post('/check-win', async (req, res) => {
    username = 'exampleUser';
    const playerCard = await getCardForUsername(username)
    //const playerCard = req.session.card;
    if (game.checkPlayerWin(playerCard)) {
        res.json({ winner: true })
        game.stopGame();
        //const username = (req.session.user)
        registerBingoWinner(username);
    } else {
        res.json({ winner: false })
    }
});

module.exports = router;