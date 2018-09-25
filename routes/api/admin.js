const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const gravatar = require('gravatar')
const passport = require('passport')

const User = require('../../models/User')
const keys = require('../../config/keys').keys
const validateRegisterInput = require('../../validation/register')
const validateLoginInput = require('../../validation/login')
const router = express.Router()

router.get('/', (req, res) => {
  res.status(200).json('usersAPI: We are currently connected to the user API of bebeyogini')
})

// @route  GET api/users/login
// @desc   Login User / Returning JWT Token
// @access Public
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body)
  //Check Validation
  !isValid && res.status(400).json(errors)

  const email = req.body.email
  const password = req.body.password

    //Find user by email
  User.findOne({ email })
    .then(user => {
      // Check for users
      if (!user) {
        errors.email = 'User not found'
        return res.status(400).json(errors)
      }
      // Check password
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            // Define Payload
            const payload = {
              id: user.id,
              name: user.name,
              avatar: user.avatar
            }
            //Sign Token
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
          } else {
            errors.email = 'Password incorrect'
            return res.status(400).json(errors)
          }
        })
    })
})

module.exports = router
