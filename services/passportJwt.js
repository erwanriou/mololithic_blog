const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const mongoose = require('mongoose')
const User = mongoose.model('users')
const keys = require('../config/keys').keys

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = keys.jwt.secret

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      try {
        const user = await User.findById(jwt_payload.id)
        user
          ? done(null, user)
          : done(null, false, { message: "Invalid username/password" })
      } catch (e) {
        e => done(e)
      }
    })
  )
}
