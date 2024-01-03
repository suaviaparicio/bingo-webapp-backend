const { broadcastStartGameCounter } = require("../wsServer");
const { countDown } = require('./numberDrawn');

class BingoCounter {
    constructor() {
        this.subscription = countDown.subscribe({
            next: (counter) => broadcastStartGameCounter(JSON.stringify(counter))
        });
    }

    startCounter() {
        let counter = 60;
        const intervalId = setInterval(() => {
            console.log(counter);
            countDown.next(counter);
            counter -= 1;
        
            if (counter === 0) {
                clearInterval(intervalId);
                console.log('Countdown finished!');
            }
        }, 1000);
    }
};

module.exports = BingoCounter;