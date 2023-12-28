const BingoNumberPool = require("./BingoNumberPool");

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
        this.intervalId = setInterval(() => this.drawNumber(), 5000);
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
};

const game = new BingoGame();
game.startGame();


