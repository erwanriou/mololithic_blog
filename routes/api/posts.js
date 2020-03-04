const express = require("express")
const mongoose = require("mongoose")
const passport = require("passport")
const AWS = require("aws-sdk")
const uuid = require("uuid/v1")

const keys = require("../../config/keys").keys

const User = require("../../models/User")
const Post = require("../../models/Post")
const validatePostInput = require("../../validation/post")

// IMPORT MIDDLEWARE
const isAdmin = require("../../middleware/isAdmin")

const s3 = new AWS.S3({
  accessKeyId: keys.aws.clientID,
  secretAccessKey: keys.aws.clientSecret,
  signatureVersion: "v4",
  region: "eu-west-3"
})

const router = express.Router()

// @route  GET api/posts/upload
// @desc   Upload an image on amazone server API
// @access Private
router.get(
  "/upload",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  (req, res) => {
    const key = `${req.user.id}/${uuid()}.jpeg`
    req.user.authorities.includes("ROLE_ADMIN") === false
      ? (valid = res
          .status(403)
          .json({ error: "You doesnt have admin right to create a post" }))
      : s3.getSignedUrl(
          "putObject",
          {
            Bucket: "bebeyogini",
            ContentType: "image/jpeg",
            Key: key.toString()
          },
          (err, url) => res.send({ key, url })
        )
  }
)
// @route  GET api/posts
// @desc   Get all posts
// @access Public
router.get("/", async (req, res) => {
  try {
    posts = await Post.find()
    res.status(200).json(posts)
  } catch (err) {
    res.status(400).json(err)
  }
})

// @route  GET api/posts/:id
// @desc   Get post by id
// @access Public
router.get("/post/:title", async (req, res) => {
  try {
    const postTitle = req.params.title
      .toLowerCase()
      .split("-")
      .join(" ")
    post = await Post.findOne({
      title: {
        $regex: new RegExp(postTitle, "i")
      }
    })
    res.status(200).json(post)
  } catch (err) {
    res.status(400).json(err)
  }
})

// @route  GET api/posts/edit/:id
// @desc   Get post by title
// @access Public
router.get(
  "/edit/:id",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  async (req, res) => {
    try {
      const post = await Post.findById(req.params.id)
      res.status(200).json(post)
    } catch (err) {
      res.status(400).json(err)
    }
  }
)

// @route  GET api/posts/delete/:id
// @desc   Get post by title
// @access Public
router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  async (req, res) => {
    try {
      await Post.findByIdAndRemove(req.params.id)

      res.status(200).json({ delete: "success" })
    } catch (err) {
      res.status(400).json(err)
    }
  }
)

// @route  POST api/posts
// @desc   Create a post
// @access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  async (req, res) => {
    try {
      const { errors, isValid } = validatePostInput(req.body)
      //Check Validation
      !isValid && res.status(400).json(errors)
      let newPost = new Post({
        ...req.body,
        _user: req.user.id
      })
      await newPost.save()
      res.json({ post: "Post created with success!" })
    } catch (err) {
      res.status(400).json(err)
    }
  }
)

module.exports = router
