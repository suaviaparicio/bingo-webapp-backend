const bcrypt = require('bcrypt');
const { User }= require('../models/Model');

async function createUser(username, plainTextPassword, email) {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(plainTextPassword, salt);

    try {
        const user = await User.create({
            Username: username,
            PasswordHash: passwordHash,
            Email: email
        });
        console.log(user);
        return user;
    } catch (error) {
        console.error('Error creating user', error);
        throw error;
    }
}

//createUser('exampleUser', 'userPassword', 'example@test.com');

    
// User.drop()

async function authenticateUser(username, password) {
    const user = await User.findOne({ where: { username } });
    if (user && await bcrypt.compare(password, user.PasswordHash)) {
        console.log('Authentication successful');
        return true;
    } else {
        console.log(user)
        console.log('Authentication failed');
        return false;
    }
}

module.exports = authenticateUser;
