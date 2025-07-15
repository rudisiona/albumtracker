const express = require('express');
const router = express.Router({ mergeParams : true });

const User = require('../models/user.js')

router.get('/party', async(req, res) => {
    const users = await User.find();
    res.render('users/index.ejs', { users})
})

router.get('/', async (req, res) => {
   try { const user = await User.findById(req.params.userId)
    if(!user) { 
        return res.status(404).send("user not found");
    } 
        res.render('users/show.ejs', { user });
} catch(err) {
    console.error('error fetching user:', err)
    res.status(500).send('internal server error')
}

})
module.exports = router