const request = require("supertest");
const server = require("../../server");

afterAll((done) => {
    server.close(done);
});

describe('Bingo route card generator', () => {
    test('POST /bingo/generate-card generates a valid Bingo card', async () => {
        const response = await request(server).post('/bingo/generate-card');
        expect(response.statusCode).toBe(200);

        // Check if all required properties are present
        expect(response.body).toHaveProperty('B');
        expect(response.body).toHaveProperty('I');
        expect(response.body).toHaveProperty('N');
        expect(response.body).toHaveProperty('G');
        expect(response.body).toHaveProperty('O');

        // Check if each column contains the correct number of elements
        expect(response.body.B).toHaveLength(5);
        expect(response.body.I).toHaveLength(5);
        expect(response.body.N).toHaveLength(5);
        expect(response.body.G).toHaveLength(5);
        expect(response.body.O).toHaveLength(5);

        // Check if the numbers fall within the correct ranges
        expect(response.body.B.every(num => typeof num === 'number' && num >= 1 && num <= 15)).toBe(true);
        expect(response.body.I.every(num => typeof num === 'number' && num >= 16 && num <= 30)).toBe(true);
        expect(response.body.N.every(num => num === 'Free' || (typeof num === 'number' && num >= 31 && num <= 45))).toBe(true);
        expect(response.body.G.every(num => typeof num === 'number' && num >= 46 && num <= 60)).toBe(true);
        expect(response.body.O.every(num => typeof num === 'number' && num >= 61 && num <= 75)).toBe(true);
    });
});

describe('Bingo start and stop game', () => {
    test('POST /bingo/start-game starts the game', async () => {
        const start = await request(server).post('/bingo/start-game');
        expect(start.statusCode).toBe(200);
        const stop = await request(server).post('/bingo/stop-game');
        expect(start.statusCode).toBe(200);
    });
});

describe('Bingo route card check-win', () => {
    test('POST /bingo/check-win win and stop the game', async () => {
        const mockPlayerCard = {
            B: [1, 2, 3, 4, 5],
            I: [16, 17, 18, 19, 20],
            N: [31, 32, 'Free', 34, 35],
            G: [46, 47, 48, 49, 50],
            O: [61, 62, 63, 64, 65]
        };

        const response = await request(server)
            .post('/bingo/check-win')
            .send(mockPlayerCard)
            .set('Content-Type', 'application/json');

        expect(response.statusCode).toBe(200);
    });
});
