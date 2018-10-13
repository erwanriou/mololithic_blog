const InstagramStrategy = require('passport-instagram').Strategy
const mongoose = require('mongoose')

const keys = require('../config/keys').keys
const User = mongoose.model('users')

module.exports = passport => {
  passport.use(
    new InstagramStrategy({
      clientID: keys.instagram.clientID,
      clientSecret: keys.instagram.clientSecret,
      callbackURL: keys.instagram.callbackURL,
      profileFields: ['id', 'email', 'displayName', 'link', 'gender', 'photos'],
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ name: profile.displayName })
      const user = await new User({
        oauthId: profile.id,
        name: profile.displayName,
        avatar: profile._json.data.profile_picture,
        role: 'user'
      })
      existingUser
        ? done(null, existingUser)
        : user.save() && done(null, user)
    })
  )
}
