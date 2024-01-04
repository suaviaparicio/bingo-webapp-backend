const express = require('express');
const router = express.Router();
const BingoGame = require('../controllers/BingoGame');
const BingoCard = require('../controllers/BingoCard');
const BingoCounter = require('../controllers/BingoCounter');
const BingoActiveUsers = require('../controllers/BingoActiveUsers');
const game = new BingoGame();
const card = new BingoCard();
const activeUsers = new BingoActiveUsers();

// Generate Bingo card
router.post('/generate-card', (req, res) => {
    const generatedCard = card.generateBingoCard()
    req.session.card = generatedCard;
    console.log(generatedCard);
    // console.log(res.json(generatedCard));
    res.json(generatedCard)
});

// Start counter in the waiting rom
router.post('/start-counter', (req, res) => {
    const counter = new BingoCounter();
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
router.post('/add-user', (req, res) => {
    activeUsers.addUser(req.session.user);
    res.send('Usuario agregado');
});

// Check if a player has won
router.post('/check-win', (req, res) => {
    const playerCard = req.session.card;
    if (game.checkPlayerWin(playerCard)) {
        res.send('¡Felicitaciones! Ganaste el Bingo');
        game.stopGame();
        // Debo redirigir a todos al Home
    } else {
        res.send('Tarjeta no ganadora, quedas descalificado');
        // Debo decirle que vaya al Home
    }
});

module.exports = router;