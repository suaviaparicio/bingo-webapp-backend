const bcrypt = require('bcrypt');
const User = require('./UserModel');

// User.create({
//     username: 'exampleUser3',
//     password: 'userPassword3',
//     email: 'example3@test.com'
// }).then(user => console.log(user))
//     .catch(error => console.error('Error creating user', error));

// User.drop()

User.beforeSave(async (user, options) => {
    if (user.changed('password')) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
    }
});

async function authenticateUser(username, password) {
    const user = await User.findOne({ where: { username } });
    if (user && await bcrypt.compare(password, user.password)) {
        console.log('Authentication successful');
        return true;
    } else {
        console.log('Authentication failed');
        return false;
    }
}

module.exports = authenticateUser;
