const BingoNumberPool = require("./BingoNumberPool");
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
            this.drawnNumbers.push(bingoBall);
            console.log(`Balota: ${bingoBall.letter}${bingoBall.number}`);
        } else {
            console.log('Todas las balotas ya han jugado');
            this.stopGame();
        }
    }

    startGame() {
        this.intervalId = setInterval(() => this.drawNumber(), 1000);
        console.log('¡Atento! El juego está por iniciar');
    }

    stopGame() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            console.log('El juego ha finalizado');
        }
    }

    getDrawnNumbers() {
        return this.drawnNumbers;
    }

    checkPlayerWin(playerCard) {
        const drawnNumberValues = this.drawnNumbers.map(drawn => drawn.number);
        return isFullMatch(playerCard, drawnNumberValues) ||
            isDiagonalMatch(playerCard, drawnNumberValues) ||
            isVerticalMatch(playerCard, drawnNumberValues) ||
            isHorizontalMatch(playerCard, drawnNumberValues) ||
            isFourCornersMatch(playerCard, drawnNumberValues);
    };
};

module.exports = BingoGame;
