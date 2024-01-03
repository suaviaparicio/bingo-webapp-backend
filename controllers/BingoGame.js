const BingoNumberPool = require("./BingoNumberPool");
const {
    isFullMatch,
    isVerticalMatch,
    isHorizontalMatch,
    isFourCornersMatch,
    isDiagonalMatch
} = require('./BingoRules');
const numberDrawn = require('./numberDrawn');
const { broadcastDrawnNumber } = require('../wsServer')

class BingoGame {
    constructor() {
        this.availableNumbers = BingoNumberPool.generateBingoNumbers()
        this.drawnNumbers = [];
        this.intervalId = null;

        this.subscription = numberDrawn.subscribe({
            next: (number) => broadcastDrawnNumber(JSON.stringify(number))
        });
    }

    drawNumber() {
        if (this.availableNumbers.length > 0) {
            const randomIndex = Math.floor(Math.random() * this.availableNumbers.length);
            const bingoBall = this.availableNumbers.splice(randomIndex, 1)[0];
            this.drawnNumbers.push(bingoBall);
            numberDrawn.next(bingoBall); 
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
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        if (this.drawnNumbers.length > 0) {
            this.availableNumbers = BingoNumberPool.generateBingoNumbers()
            this.drawnNumbers = [];
            this.intervalId = null;
            this.subscription = numberDrawn.subscribe({
                next: (number) => broadcastDrawnNumber(JSON.stringify(number))
            });
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
