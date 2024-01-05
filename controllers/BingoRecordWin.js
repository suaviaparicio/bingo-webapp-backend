const { User, WinningRecord } = require('../models/Model');

async function getBingoUserIdByUsername(username) {
    try {
        const user = await User.findOne({ where: { username } });
        if (user) {
            return user.UserID;
        } else {
            console.log('User not found');
            return null;
        }
    } catch (error) {
        console.error('Error fetching user by username:', error);
        throw error;
    }
};

async function registerBingoWinner(username) {
    try {
        const userId = await getBingoUserIdByUsername(username);
        if (userId) {
            await WinningRecord.create({
                UserID: userId,
                WinTime: new Date()
            });
        } else {
            console.log('Could not save card: User not found.');
        }
    } catch (error) {
        console.error('Error in saveUserCard:', error);
        throw error;
    }
};

module.exports = registerBingoWinner