const { 
    isFullMatch, 
    isDiagonalMatch, 
    isVerticalMatch, 
    isHorizontalMatch, 
    isFourCornersMatch, 
} = require('../../controllers/BingoRules');

describe('isFullMatch', () => {
    test('returns true for a full match', () => {
        const card = {
            B: [1, 2, 3, 4, 5],
            I: [16, 17, 18, 19, 20],
            N: [31, 32, 'Free', 34, 35],
            G: [46, 47, 48, 49, 50],
            O: [61, 62, 63, 64, 65]
        };
        const drawnNumbers = [1, 2, 3, 4, 5, 16, 17, 18, 19, 20, 31, 32, 34, 35, 46, 47, 48, 49, 50, 61, 62, 63, 64, 65];
        expect(isFullMatch(card, drawnNumbers)).toBe(true);
    });

    test('returns false for a non-full match', () => {
        const card = {
            B: [1, 2, 3, 4, 5],
            I: [16, 17, 18, 19, 20],
            N: [31, 32, 'Free', 34, 35],
            G: [46, 47, 48, 49, 50],
            O: [61, 62, 63, 64, 65]
        };
        const drawnNumbers = [1, 2, 3, 4, 16, 17, 18, 31, 32, 46, 47, 48, 61, 62, 63];
        expect(isFullMatch(card, drawnNumbers)).toBe(false);
    });
});

describe('isDiagonalMatch', () => {
    test('returns true for a top-left to bottom-right diagonal match', () => {
        const card = {
            B: [1, 2, 3, 4, 5],
            I: [16, 17, 18, 19, 20],
            N: [31, 32, 'Free', 34, 35],
            G: [46, 47, 48, 49, 50],
            O: [61, 62, 63, 64, 65]
        };
        const drawnNumbers = [1, 17, 'Free', 49, 65];
        expect(isDiagonalMatch(card, drawnNumbers)).toBe(true);
    });
    test('returns false for no diagonal match', () => {
        const card = {
            B: [1, 2, 3, 4, 5],
            I: [16, 17, 18, 19, 20],
            N: [31, 32, 'Free', 34, 35],
            G: [46, 47, 48, 49, 50],
            O: [61, 62, 63, 64, 65]
        };
        const drawnNumbers = [1, 16, 'Free', 49, 64]; // No complete diagonal
        expect(isDiagonalMatch(card, drawnNumbers)).toBe(false);
    });
});

describe('isVerticalMatch', () => {
    test('returns true for a vertical match in one column', () => {
        const card = {
            B: [1, 2, 3, 4, 5],
            I: [16, 17, 18, 19, 20],
            N: [31, 32, 'Free', 34, 35],
            G: [46, 47, 48, 49, 50],
            O: [61, 62, 63, 64, 65]
        };
        const drawnNumbers = [46, 47, 48, 49, 50]; // Complete G column
        expect(isVerticalMatch(card, drawnNumbers)).toBe(true);
    });

    test('returns false for no vertical match', () => {
        const card = {
            B: [1, 2, 3, 4, 5],
            I: [16, 17, 18, 19, 20],
            N: [31, 32, 'Free', 34, 35],
            G: [46, 47, 48, 49, 50],
            O: [61, 62, 63, 64, 65]
        };
        const drawnNumbers = [1, 17, 32, 47, 62, 'Free']; // No complete vertical match
        expect(isVerticalMatch(card, drawnNumbers)).toBe(false);
    });
});

describe('isHorizontalMatch', () => {
    test('returns true for a horizontal match in one column', () => {
        const card = {
            B: [1, 2, 3, 4, 5],
            I: [16, 17, 18, 19, 20],
            N: [31, 32, 'Free', 34, 35],
            G: [46, 47, 48, 49, 50],
            O: [61, 62, 63, 64, 65]
        };
        const drawnNumbers = [62, 47, 32, 17, 2]; // Complete G column
        expect(isHorizontalMatch(card, drawnNumbers)).toBe(true);
    });

    test('returns false for no horizontal match', () => {
        const card = {
            B: [1, 2, 3, 4, 5],
            I: [16, 17, 18, 19, 20],
            N: [31, 32, 'Free', 34, 35],
            G: [46, 47, 48, 49, 50],
            O: [61, 62, 63, 64, 65]
        };
        const drawnNumbers = [1, 17, 32, 47, 62, 'Free']; // No complete horizontal match
        expect(isHorizontalMatch(card, drawnNumbers)).toBe(false);
    });
});

describe('isFourCornersMatch', () => {
    test('returns true for a four corners match', () => {
        const card = {
            B: [1, 2, 3, 4, 5],
            I: [16, 17, 18, 19, 20],
            N: [31, 32, 'Free', 34, 35],
            G: [46, 47, 48, 49, 50],
            O: [61, 62, 63, 64, 65]
        };
        const drawnNumbers = [1, 61, 65, 5]; // Complete G column
        expect(isFourCornersMatch(card, drawnNumbers)).toBe(true);
    });

    test('returns false for a four corners match', () => {
        const card = {
            B: [1, 2, 3, 4, 5],
            I: [16, 17, 18, 19, 20],
            N: [31, 32, 'Free', 34, 35],
            G: [46, 47, 48, 49, 50],
            O: [61, 62, 63, 64, 65]
        };
        const drawnNumbers = [1, 75, 65, 5]; // No complete horizontal match
        expect(isFourCornersMatch(card, drawnNumbers)).toBe(false);
    });
});
