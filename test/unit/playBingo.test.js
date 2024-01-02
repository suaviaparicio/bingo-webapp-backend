const BingoGame = require("../../controllers/BingoGame")

describe('BingoGame constructor', () => {
  test('initializes with the correct state', () => {
    const game = new BingoGame();
    expect(game.availableNumbers).toBeDefined();
    expect(game.drawnNumbers).toEqual([]);
    expect(game.intervalId).toBeNull();
  });
});

describe('BingoGame startGame', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.spyOn(global, 'setInterval').mockImplementation(() => { });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
  test('starts the game with an interval', () => {
    const game = new BingoGame();
    game.startGame();
    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 1000);
  });
});

describe('BingoGame stopGame', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.spyOn(global, 'clearInterval').mockImplementation(() => { });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('stops the game by clearing the interval', () => {
    const game = new BingoGame();
    game.startGame();
    game.stopGame();
    expect(clearInterval).toHaveBeenCalledWith(game.intervalId);
  });
});

describe('BingoGame getDrawnNumbers', () => {
  test('returns the correct drawn numbers', () => {
    const game = new BingoGame();
    const expectedDrawnNumbers = [
      { letter: 'O', number: 61 },
      { letter: 'O', number: 62 },
      { letter: 'O', number: 63 },
      { letter: 'O', number: 64 },
      { letter: 'O', number: 65 }
    ];
    game.drawnNumbers = expectedDrawnNumbers;
    expect(game.getDrawnNumbers()).toEqual(expectedDrawnNumbers);
  });
});


describe('BingoGame checkPlayerWin', () => {
  test('returns true for a winning card', () => {
    const game = new BingoGame();
    const playerCard = {
      B: [1, 2, 3, 4, 5],
      I: [16, 17, 18, 19, 20],
      N: [31, 32, 'Free', 34, 35],
      G: [46, 47, 48, 49, 50],
      O: [61, 62, 63, 64, 65]
    };
    game.drawnNumbers = [
      { letter: 'O', number: 61 },
      { letter: 'O', number: 62 },
      { letter: 'O', number: 63 },
      { letter: 'O', number: 64 },
      { letter: 'O', number: 65 }
    ];
    expect(game.checkPlayerWin(playerCard)).toBe(true);
  });

  test('returns false for a non-winning card', () => {
    const game = new BingoGame();
    const playerCard = {
      B: [1, 2, 3, 4, 5],
      I: [16, 17, 18, 19, 20],
      N: [31, 32, 'Free', 34, 35],
      G: [46, 47, 48, 49, 50],
      O: [61, 62, 63, 64, 65]
    };
    game.drawnNumbers = [
      { letter: 'O', number: 61 },
      { letter: 'O', number: 62 },
      { letter: 'O', number: 63 },
      { letter: 'O', number: 64 },
      { letter: 'B', number: 1 }
    ];
    expect(game.checkPlayerWin(playerCard)).toBe(false);
  });
});

describe('BingoGame drawNumber', () => {
  let game;

  beforeEach(() => {
    game = new BingoGame();
    game.availableNumbers = [
      { letter: 'B', number: 3 },
      { letter: 'B', number: 4 },
      { letter: 'I', number: 22 },
      { letter: 'N', number: 33 },
      { letter: 'N', number: 34 }
    ];
    game.drawnNumbers = [];
  });

  test('draws a number and moves it from availableNumbers to drawnNumbers', () => {
    game.drawNumber();
    expect(game.availableNumbers.length).toBe(4);
    expect(game.drawnNumbers.length).toBe(1);
  });

  test('stops game when no numbers are available', () => {
    game.availableNumbers = [];
    const spy = jest.spyOn(game, 'stopGame');
    game.drawNumber();
    expect(spy).toHaveBeenCalled();
  });
});
