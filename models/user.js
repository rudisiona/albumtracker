const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  title: {
    type: String,
    required:  true,
  },
  artist: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  song: {
    type: String,
  },
  notes: {
    type: String,
  },
  hide: {
    type: Boolean,
    default: false,
  }
})

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  albums: [reviewSchema]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
