const BingoCard = require("../../controllers/BingoCard")

describe('BingoCard', () => {
    let card;

    beforeEach(() => {
        card = new BingoCard();
    });
    // test('should return a user card', () => {
    //     expect(card.generateBingoCard()).toBe(card.generateBingoCard())
    // });
    test('should return', () => {
        expect(card.generateBingoColumn('B'))
    });
});

