const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const gravatar = require('gravatar')
const passport = require('passport')

const Admin = require('../../models/Admin')
const keys = require('../../config/keys').keys
const validateRegisterInput = require('../../validation/register')
const validateLoginInput = require('../../validation/login')
const router = express.Router()

// @route  POST api/users/register
// @desc   Test route API
// @access Private
router.get('/',  passport.authenticate('jwt', {session: false}), async (req, res) => {
  const admin =  await Admin.find()
  res.status(200).json(admin)
})

// @route  POST api/admin/login
// @desc   Login as user and generate token
// @access Public
router.post('/login', async (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body)
  //Check Validation
  !isValid && res.status(400).json(errors)

  const email = req.body.email
  const password = req.body.password

  const user = await Admin.findOne({ email })
  const match = await bcrypt.compareSync(password, user.passwordHash)

  if (!user) {
    errors.email = 'User not found'
    return res.status(400).json(errors)
  }
  if (match) {
    const payload = {
      id: user.id,
      name: user.name,
      avatar: user.avatar
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
  } else {
    errors.email = 'Password incorrect'
    return res.status(400).json(errors)
  }
})

module.exports = router
