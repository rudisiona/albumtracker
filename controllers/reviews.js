const express = require('express')
const router = express.Router();


const User = require('../models/user.js')

router.get('/', async (req, res) => {
    const currentUser = await User.findById(req.session.user._id);
    res.render('reviews/index.ejs', {
        reviews: currentUser.reviews
    })
})

router.get('/new', async (req, res) => {
    res.render('reviews/new.ejs')
})

router.post('/', async(req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id)
        currentUser.reviews.push(req.body)
        await currentUser.save();
        res.redirect(`/users/${currentUser._id}/reviews`)
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})

router.get('/:reviewId', async (req, res) => {
    const currentUser = await User.findById(req.session.user._id)
    const review = currentUser.reviews.id(req.params.reviewId)
    res.render('reviews/show.ejs', {
        review: review
    })
})

router.delete('/:reviewId', async (req, res) => {
    const currentUser = await User.findById(req.session.user._id)
    currentUser.reviews.id(req.params.reviewId).deleteOne()
    await currentUser.save()
    res.redirect('/users/${currentUser._id}/reviews')
})

router.get('/:reviewId/edit', async (req, res) => {
    const currentUser = await User.findById(req.session.user._id)
    const review = currentUser.reviews.id(req.params.reviewId)
    res.render('reviews/edit.ejs', {
        review: review,

    })
})

router.put('/:reviewId', async (req, res) => {
    const currentUser = await User.findById(req.session.user._id)
    const review = currentUser.reviews.id(req.params.reviewId)
    review.set(req.body) 
    await currentUser.save()
    res.redirect(`/users/${currentUser._id}/reviews/${req.params.reviewId}`)
})

module.exports = router;