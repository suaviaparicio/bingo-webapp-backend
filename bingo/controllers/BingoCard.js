const BingoNumberPool = require("./BingoNumberPool");
// import { BingoNumberPool } from "./BingoNumberPool";

class BingoCard {
    constructor() {
        this.card = this.generateBingoCard();
    }

    generateBingoColumn(letter) {
        const column = new Set();
        const [min, max] = BingoNumberPool.getBingoNumberRange(letter);

        while (column.size < 5) {
            const number = BingoNumberPool.getRandomNumberInRange(min, max);
            column.add(number);
        }

        return Array.from(column);
    }

    generateBingoCard() {
        const card = {};
        const letters = ['B', 'I', 'N', 'G', 'O'];

        letters.forEach(letter => {
            card[letter] = this.generateBingoColumn(letter);
        });

        card['N'][2] = 'Free';

        return card;
    }

    getCard() {
        return this.card;
    }
}

console.log(new BingoCard());