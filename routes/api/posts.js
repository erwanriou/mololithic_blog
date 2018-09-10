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

// @route  GET api/posts/:id
// @desc   Get post by id
// @access Public
router.get('/:id', (req, res) => {
  Post
    .findById(req.params.id)
    .then(post =>res.json(post))
    .catch(err => res.status(404).json({ post: 'no post found with that id'}))
})

// @route  POST api/posts
// @desc   Create post
// @access Private
router.post('/',  passport.authenticate('jwt', {session: false}), (req, res) => {
  const { errors, isValid } = validatePostInput(req.body)
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors)
  }
  const newPost = new Post({
    ...req.body,
    user: req.user.id,
  })

  newPost
    .save()
    .then(post => res.json(post))
    .catch(err => res.status(404).json(err))
})

// @route  DELETE api/posts/:id
// @desc   delete the post by id
// @access Private
router.delete('/:id',  passport.authenticate('jwt', {session: false}), (req, res) => {
  Post
    .findOneAndRemove({ _id: req.params.id, user: req.user.id })
    .then(post => {
      return !post
        ? res.status(401).json({ post: 'post not found' })
        : res.status(200).json({ post: 'post deleted' })
    })
    .catch(err => res.status(404).json({ post: 'It had a problem deleting the post' }))
})

module.exports = router
