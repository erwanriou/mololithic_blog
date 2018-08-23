const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const passport = require('passport')

const User = require('../../models/User')
const keys = require('../../config/keys').keys
// const validateRegisterInput = require('../../validation/register')
// const validateLoginInput = require('../../validation/login')
const router = express.Router()

router.get('/', (req, res) => {
  res.status(200).json('users: We are getting users!')
})


module.exports = router
