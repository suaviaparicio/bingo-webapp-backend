const BingoNumberPool = require("./BingoNumberPool");
const BingoCard = require("./BingoCard")
const {
    isFullMatch,
    isVerticalMatch,
    isHorizontalMatch,
    isFourCornersMatch,
    isDiagonalMatch
} = require('./BingoRules');

class BingoGame {
    constructor() {
        this.availableNumbers = BingoNumberPool.generateBingoNumbers()
        this.drawnNumbers = [];
        this.intervalId = null;
    }

    drawNumber() {
        if (this.availableNumbers.length > 0) {
            const randomIndex = Math.floor(Math.random() * this.availableNumbers.length);
            const bingoBall = this.availableNumbers.splice(randomIndex, 1)[0];
            // console.log(number);
            this.drawnNumbers.push(bingoBall);
            console.log(`Balota: ${bingoBall.letter}${bingoBall.number}`);
        } else {
            console.log('Todas las balotas ya han jugado');
            this.stopGame();
        }
    }

    startGame() {
        this.intervalId = setInterval(() => this.drawNumber(), 100);
        console.log('El juego va a iniciar');
    }

    stopGame() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            console.log('Juego terminado');
        }
    }

    getDrawnNumbers() {
        return this.drawnNumbers;
    }

    checkPlayerWin(playerCard) {
        console.log(this.drawnNumbers)
        return isFourCornersMatch(playerCard, this.drawnNumbers)
        // isFullMatch(playerCard, this.drawnNumbers) || 
        //        isVerticalMatch(playerCard, this.drawnNumbers) ||
        //        isHorizontalMatch(playerCard, this.drawnNumbers) ||
                // ||
             //  isDiagonalMatch(playerCard, this.drawnNumbers);
    };

    simulateDrawing() {
        this.startGame();
        setTimeout(() => this.stopGame(), 10000);
    }

};

module.exports = BingoGame;

// const game = new BingoGame();
const playerCard = new BingoCard();
// game.startGame();
// game.checkPlayerWin(playerCard);


const game = new BingoGame();

// Start the game and draw numbers
game.simulateDrawing();

// After a delay, check if the player has won
setTimeout(() => {
    if (game.checkPlayerWin(playerCard.card)) {
        console.log("Player has won!");
    } else {
        console.log("Not a winning card.");
    }
}, 10000); // Check for a win after 35 seconds