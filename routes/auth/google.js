const express = require('express')
const passport = require('passport')
const jwt = require('jsonwebtoken')

const User = require('../../models/User')
const keys = require('../../config/keys').keys
const jsonWebToken = require('../../middleware/jsonWebToken')

const router = express.Router()

// @route  GET auth/google
// @desc   Register user with google Oauth
// @access Public
router.get('/', passport.authenticate('google', {
  session: false,
  scope: ['profile', 'email']
}))

// @route  GET auth/google
// @desc   Login user with google Oauth
// @access Private
router.get('/callback', passport.authenticate('google', {session: false}), (req, res) => {
  jsonWebToken.signToken(req, res)
})

module.exports = router
