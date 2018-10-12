const express = require('express')
const passport = require('passport')
const jwt = require('jsonwebtoken')

const User = require('../../models/User')
const keys = require('../../config/keys').keys


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
  const payload = {
    id: user.id,
    name: user.name,
    avatar: user.avatar,
    role: user.role,
  }
  jwt.sign(
    payload,
    keys.jwt.secret,
    { expiresIn: 7000 },
    (err, token) => {
      res.json({
        success: true,
        token: 'Bearer ' + token
      })
  })
})

module.exports = router
