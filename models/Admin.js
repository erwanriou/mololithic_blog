const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema

// Create Schema
const AdminSchema = new Schema({
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
    required: true,
  },
  avatar: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

AdminSchema.plugin(uniqueValidator)

AdminSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.passwordHash)
}

AdminSchema.virtual("password").set(function(value) {
  this.passwordHash = bcrypt.hashSync(value, 12)
})

module.exports = Admin = mongoose.model('admins', AdminSchema)
