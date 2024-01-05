class BingoActiveUsers {
    constructor() {
        this.activeUsers = [];
    }
    async addUser(username) {
        this.activeUsers.push(username);
    }
}

module.exports = BingoActiveUsers;