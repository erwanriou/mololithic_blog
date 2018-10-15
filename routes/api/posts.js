const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')

const User = require('../../models/User')
const Post = require('../../models/Post')
const validatePostInput = require('../../validation/post')

const router = express.Router()

// @route  GET api/posts
// @desc   Get post
// @access Public
router.get('/', (req, res) => {
  Post
    .find()
    .sort({ date: -1 })
    .then(posts =>res.json(posts))
    .catch(err => res.status(404).json({ posts: 'no posts found'}))
})

module.exports = router
