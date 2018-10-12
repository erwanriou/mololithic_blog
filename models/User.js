const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const bcrypt = require('bcryptjs')

const Schema = mongoose.Schema

// Create Schema
const UserSchema = new Schema({
  oauthId: {
    type: String,
    default: null,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  passwordHash: {
    type: String,
  },
  avatar: {
    type: String,
  },
  role: {
    type: String,
    default: 'user',
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

UserSchema.plugin(uniqueValidator)

UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.passwordHash)
}

UserSchema.virtual("password").set(function(value) {
  this.passwordHash = bcrypt.hashSync(value, 12)
})

module.exports = User = mongoose.model('users', UserSchema)
