//============================================
//SESSIONS CONTROLLER
//============================================

const express = require('express');
const router = express.Router();

const User = require('../models/users.js');
const Location = require('../models/travels.js');

router.post('/login', async (req, res) => {
    console.log('in the login route');
    console.log(req.body);
    console.log('==============================');
    try {
        const user = await User.findOne({ username: req.body.username }); // a document
        const location = await Location.find({ user: user._id });
        console.log('What uuuuuuup user? ', user);
        if (user.authenticate(req.body.password)) {
            req.session.user = user;
            res.status(200).json({ user, location }); // passwords match (successful authenticate)
        } else {
            res.status(403).json({ err: 'Forbidden' }); // password is wrong
        }
    } catch (err) { // user doesn't exist, can't run authenticate without a user!
        res.status(400).json({ err: err.message });
    }
});

router.delete('/logout', (req, res) => {
    console.log('session to destroy: ', req.session);
    req.session.destroy(() => {
        console.log('elvis has left the building ... ', req.session); // undefined, {}
        res.status(200).json({ message: 'Session destroyed' });
    });
});

module.exports = router;