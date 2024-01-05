const { UserCard, User } = require('../models/Model');
const NodeCache = require('node-cache');
const userCache = new NodeCache({ stdTTL: 600 }); // Cache TTL in seconds (e.g., 600 seconds = 10 minutes)

async function storeUserBingoCard(userId, bingoCard) {
    try {
        userCache.set(userId, bingoCard);
        await UserCard.create({
            UserID: userId,
            CardState: bingoCard
        });
        console.log('Card created');
    } catch (error) {
        console.error('Error creating card', error);
        throw error;
    }
}

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

async function saveCardForUsername(username, bingoCard) {
    try {
        const userId = await getBingoUserIdByUsername(username);
        if (userId) {
            await storeUserBingoCard(userId, bingoCard);
        } else {
            console.log('Could not save card: User not found.');
        }
    } catch (error) {
        console.error('Error in saveCardForUsername:', error);
        throw error;
    }
}

async function getCardForUsername(username) {
    try {
        const userId = await getBingoUserIdByUsername(username);
        if (userId) {
            const cachedCardState = userCache.get(userId);
            if (cachedCardState) {
                return cachedCardState;
            }
            const userCard = await UserCard.findOne({ where: { UserID: userId } });
            if (userCard) {
                return userCard.CardState;
            } else {
                console.log('Card not found for user');
            }
        } else {
            console.log('Could not retrieve card: User not found.');
        }
    } catch (error) {
        console.error('Error in getCardForUsername:', error);
        throw error;
    }
}

module.exports = { saveCardForUsername, getCardForUsername };
