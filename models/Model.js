const { sequelize, DataTypes } = require('../config/database');

const User = sequelize.define('User', {
    UserID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Username: {
        type: DataTypes.STRING,
        unique: true
    },
    PasswordHash: DataTypes.STRING,
    Email: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

const UserCard = sequelize.define('UserCard', {
    CardID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    UserID: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'UserID'
        }
    },
    CardState: DataTypes.JSON
});

const WinningRecord = sequelize.define('WinningRecord', {
    WinID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    UserID: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'UserID'
        }
    },
    WinTime: DataTypes.DATE
});

sequelize.sync();

module.exports = { User, UserCard, WinningRecord }