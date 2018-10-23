const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const AWS = require('aws-sdk')
const uuid = require('uuid/v1')

const keys = require('../../config/keys').keys

const User = require('../../models/User')
const Post = require('../../models/Post')
const validatePostInput = require('../../validation/post')

const s3 = new AWS.S3({
  accessKeyId: keys.aws.clientID,
  secretAccessKey: keys.aws.clientSecret,
  signatureVersion: 'v4',
  region: 'eu-west-3'
})

const router = express.Router()

// @route  GET api/posts
// @desc   Get all posts
// @access Public
router.get('/', async (req, res) => {
  try {
    posts = await Post.find()
    res.status(200).json(posts)
  } catch (err) {
    res.status(400).json(err)
  }
})

// @route  POST api/posts
// @desc   Create a post
// @access Private
router.post('/',  passport.authenticate('jwt', {session: false}), async (req, res) => {
  const { errors, isValid } = validatePostInput(req.body)
  //Check Validation
  !isValid && res.status(400).json(errors)
  req.user.role !== 'admin' && res.status(403).json({error: 'You doesnt have admin right to create a post'})
  const newPost = new Post({
    ...req.body,
    _user: req.user.id,
  })
  try {
    await newPost.save()
    res.json({ post: 'Post created with success!'})
  } catch (err) {
    res.status(400).json(err)
  }
})

// @route  GET api/posts/upload
// @desc   Upload an image on amazone server API
// @access Private
router.get('/upload', passport.authenticate('jwt', {session: false}), (req, res) => {
  const key = `${req.user.id}/${uuid()}.jpeg`
  s3.getSignedUrl('putObject', {
    Bucket: 'bebeyogini',
    ContentType: 'image/jpeg',
    Key: key
  }, (err, url) => res.send({ key, url }))
})

module.exports = router
