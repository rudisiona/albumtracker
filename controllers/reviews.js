const express = require('express')
const router = express.Router();


const User = require('../models/user.js')

router.get('/', async (req, res) => {
    const currentUser = await User.findById(req.session.user._id);
    res.render('reviews/index.ejs', {
        reviews: currentUser.reviews
    })
})

module.exports = router;