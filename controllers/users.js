const express = require('express');
const router = express.Router({ mergeParams : true });

const User = require('../models/user.js')

router.get('/party', async(req, res) => {
    const users = await User.find();
    res.render('users/index.ejs', {users})
})


router.get('/hidden', async (req, res) => {
    const user = await User.findById(req.params.userId);
    const hiddenReviews = user.reviews.filter(review => review.hide);
    res.render('users/hidden.ejs', {hiddenReviews, user
    })
})

router.get('/', async (req, res) => {
    try { const user = await User.findById(req.params.userId)
     if(!user) { 
         return res.status(404).send("user not found");
     } 
     const publicReviews = user.reviews.filter(review => !review.hide);
         res.render('users/show.ejs', { publicReviews, user });
 } catch(err) {
     console.error('error fetching user:', err)
     res.status(500).send('internal server error')
 }
}) 
module.exports = router