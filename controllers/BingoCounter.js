const { broadcastStartGameCounter } = require("../wsServer");
const { countDown } = require('./numberDrawn');
const game = require('../controllers/BingoGame');

class BingoCounter {
    constructor() {
        this.subscription = countDown.subscribe({
            next: (counter) => broadcastStartGameCounter(JSON.stringify(counter))
        });
        this.counter = 10;
    }

    startCounter() {
        if (this.counter === 10) {
            const intervalId = setInterval(() => {
                if (this.counter >= 0) {
                    console.log(this.counter);
                    countDown.next(this.counter);
                    this.counter -= 1;
                } else {
                    clearInterval(intervalId);
                    console.log('Countdown finished!');
                    game.startGame();
                    this.counter = 10;
                }
            }, 1000);
        } else {
            console.log('Active counter');
        }
    }
};

counter = new BingoCounter()

module.exports = counter;