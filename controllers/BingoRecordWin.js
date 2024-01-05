const { User, WinningRecord } = require('../models/Model');
const NodeCache = require('node-cache');
const userCache = new NodeCache({ stdTTL: 600 }); // Cache TTL in seconds

async function getBingoUserIdByUsername(username) {
    const cachedUserId = userCache.get(username);
    if (cachedUserId) {
        return cachedUserId;
    }

    try {
        const user = await User.findOne({ where: { username } });
        if (user) {
            userCache.set(username, user.UserID);
            return user.UserID;
        } else {
            console.log('User not found');
            return null;
        }
    } catch (error) {
        console.error('Error fetching user by username:', error);
        throw error;
    }
}

async function registerBingoWinner(username) {
    try {
        const userId = await getBingoUserIdByUsername(username);
        if (userId) {
            await WinningRecord.create({
                UserID: userId,
                WinTime: new Date()
            });
        } else {
            console.log('Could not register winner: User not found.');
        }
    } catch (error) {
        console.error('Error in registerBingoWinner:', error);
        throw error;
    }
}

module.exports = registerBingoWinner;
