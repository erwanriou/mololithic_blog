const express = require('express')
const passport = require('passport')

const User = require('../../models/User')
const keys = require('../../config/keys').keys

const router = express.Router()

// @route  GET auth/facebook
// @desc   Register user with google Oauth
// @access Public
router.get('/', passport.authenticate('facebook', {
  session: false,
  scope: ['email']
}))

// @route  GET auth/facebook
// @desc   Login user with google Oauth
// @access Private
router.get('/callback', passport.authenticate('facebook'), (req, res) => {
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
