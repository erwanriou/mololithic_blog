const express = require('express')
const passport = require('passport')

const User = require('../../models/User')
const keys = require('../../config/keys').keys
const jsonWebToken = require('../../middleware/jsonWebToken')

const router = express.Router()

// @route  GET auth/facebook
// @desc   Register user with google Oauth
// @access Public
router.get('/', passport.authenticate('instagram', {
  session: false,
}))

// @route  GET auth/facebook
// @desc   Login user with google Oauth
// @access Private
router.get(
  '/callback',
  passport.authenticate('instagram', {session: false}),
  jsonWebToken.signToken
)

module.exports = router
