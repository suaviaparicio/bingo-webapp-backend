const express = require('express');
const router = express.Router();
const BingoGame = require('../controllers/PlayBingo');
const BingoCard = require('../controllers/BingoCard');
const game = new BingoGame();
const card = new BingoCard();


// Generate Bingo card
router.post('/generate-card', (req, res) => {
    const generatedCard = card.generateBingoCard()
    console.log(generatedCard);
    // console.log(res.json(generatedCard));
    res.json(generatedCard)

});

// Start the game
router.post('/start-game', (req, res) => {
    game.startGame();
    res.send('¡Atento! El juego está por iniciar');
});

// Check if a player has won
router.post('/check-win', (req, res) => {
    const playerCard = req.body;
    // console.log(req.body);
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