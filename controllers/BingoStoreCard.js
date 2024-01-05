const { UserCard, User } = require('../models/Model');

async function storeUserBingoCard(userId, bingoCard) {
    try {
        await UserCard.create({
            UserID: userId,
            CardState: bingoCard
        });
        console.log('Card created')
    } catch (error) {
        console.error('Error creating card', error);
        throw error;
    }
}

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

async function saveCardForUsername(username, bingoCard) {
    try {
        const userId = await getBingoUserIdByUsername(username); // Await the getUserId function
        if (userId) {
            await storeUserBingoCard(userId, bingoCard); // Also await storeCard to handle its completion
        } else {
            console.log('Could not save card: User not found.');
        }
    } catch (error) {
        console.error('Error in saveUserCard:', error);
        throw error;
    }
};

module.exports = saveCardForUsername