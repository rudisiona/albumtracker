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
        const { title, artist, rating, song, notes } = req.body;
        const hide = req.body.hide === 'on'
        const newReview = {
            title,
            artist,
            rating,
            song,
            notes,
            hide
        }
       
        currentUser.reviews.push(newReview)
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
    review.title = req.body.title;
    review.artist = req.body.artist;
    review.rating = req.body.rating;
    review.song = req.body.song;
    review.notes = req.body.notes;
    review.hide = req.body.hide === 'on'; 
    

    await currentUser.save()
    res.redirect(`/users/${currentUser._id}/reviews/${req.params.reviewId}`)
})

module.exports = router;