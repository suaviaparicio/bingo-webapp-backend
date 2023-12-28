class BingoNumberPool {
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
};

console.log(BingoNumberPool.generateBingoNumbers());