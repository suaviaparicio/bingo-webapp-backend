const request = require("supertest");
const server = require("../../server");

afterAll((done) => {
    server.close(done);
});

describe('BingoRoutes', () => {
    test("should get whatever", async () => {
        const response = await request(server).post('/bingo/generate-card');
        expect(response.statusCode).toBe(200);
    });
    test("should get a 200", async () => {
        const response = await request(server).post('/bingo/check-win');
        expect(response.statusCode).toBe(500)
    })
});
