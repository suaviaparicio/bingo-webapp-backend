const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

router.get('/google/callback', passport.authenticate('google', {
    successRedirect: '/', // or call a controller method
    failureRedirect: '/login'
}));

module.exports = router;