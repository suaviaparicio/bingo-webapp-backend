const GoogleStrategy = require('passport-google-oauth20').Strategy;

module.exports = function (passport) {
    passport.use(new GoogleStrategy({
        // Google OAuth configuration
    }, (accessToken, refreshToken, profile, done) => {
        // Authentication logic
    }));
};