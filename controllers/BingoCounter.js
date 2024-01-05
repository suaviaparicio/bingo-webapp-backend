const { broadcastStartGameCounter } = require("../wsServer");
const { countDown } = require('./numberDrawn');
const game = require('../controllers/BingoGame');

class BingoCounter {
    constructor() {
        this.subscription = countDown.subscribe({
            next: (counter) => broadcastStartGameCounter(JSON.stringify(counter))
        });
    }

    startCounter() {
        let counter = 10;
        const intervalId = setInterval(() => {
            console.log(counter);
            countDown.next(counter);
            counter -= 1;
        
            if (counter === -1) {
                game.startGame();
                clearInterval(intervalId);
                console.log('Countdown finished!');
            }
        }, 1000);
    }
};

module.exports = BingoCounter;