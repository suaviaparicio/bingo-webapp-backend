const BingoCard = require("../../controllers/BingoCard")

describe('BingoCard', () => {
    let card;

    beforeEach(() => {
        card = new BingoCard().card;
    });

    test('should generate a valid Bingo card', () => {

        // Check if all required properties are present
        expect(card).toHaveProperty('B');
        expect(card).toHaveProperty('I');
        expect(card).toHaveProperty('N');
        expect(card).toHaveProperty('G');
        expect(card).toHaveProperty('O');

        // Check if each column contains the correct number of elements
        expect(card.B).toHaveLength(5);
        expect(card.I).toHaveLength(5);
        expect(card.N).toHaveLength(5);
        expect(card.G).toHaveLength(5);
        expect(card.O).toHaveLength(5);

        // Check if the numbers fall within the correct ranges
        expect(card.B.every(num => typeof num === 'number' && num >= 1 && num <= 15)).toBe(true);
        expect(card.I.every(num => typeof num === 'number' && num >= 16 && num <= 30)).toBe(true);
        expect(card.N.every(num => num === 'Free' || (typeof num === 'number' && num >= 31 && num <= 45))).toBe(true);
        expect(card.G.every(num => typeof num === 'number' && num >= 46 && num <= 60)).toBe(true);
        expect(card.O.every(num => typeof num === 'number' && num >= 61 && num <= 75)).toBe(true);
    });
});

