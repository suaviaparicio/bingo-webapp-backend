class BingoActiveUsers {
    constructor() {
        this.activeUsers = {};
    }
    async addUser(userId) {
        this.activeUsers[userId] = userId;
    }
    async removeUser(userId) {
        delete this.activeUsers[userId];
    }
    async getActiveUsers() {
        return Object.keys(this.activeUsers).map(userId => {
            return {
                id: userId,
            };
        });
    }
}

module.exports = BingoActiveUsers;