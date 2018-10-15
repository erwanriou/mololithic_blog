const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  title: {
    type: String,
    required: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  asana: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = Post = mongoose.model('post', PostSchema)
