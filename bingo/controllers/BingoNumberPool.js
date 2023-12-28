class BingoNumberPool {
    
    // GENERATES ALL THE POSSIBLE NUMBERS AND LETTERS - To use later to start the game
    static bingoNumbers = BingoNumberPool.generateBingoNumbers();

    static generateBingoNumbers() {
        const numbers = [];
        const ranges = {
            'B': [1, 15],
            'I': [16, 30],
            'N': [31, 45],
            'G': [46, 60],
            'O': [61, 75],
        };

        for (let letter in ranges) {
            for (let i = ranges[letter][0]; i <= ranges[letter][1]; i++) {
                numbers.push({ letter: letter, number: i });
            }
        }
        return numbers;
    };

    static getBingoNumberRange(letter) {
        const ranges = { 
            'B': [1, 15], 
            'I': [16, 30], 
            'N': [31, 45], 
            'G': [46, 60], 
            'O': [61, 75] };
        return ranges[letter];
    }

    static getRandomNumberInRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

};

// console.log(BingoNumberPool.generateBingoNumbers());

module.exports = BingoNumberPool;