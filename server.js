const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const path = require('path')

// Import Routes
const google = require('./routes/auth/google')
const facebook = require('./routes/auth/facebook')
const instagram = require('./routes/auth/instagram')
const users = require('./routes/api/users')
const posts = require('./routes/api/posts')

//import strategies
require('./services/passportJwt')(passport)
require('./services/passportGoogle')(passport)
require('./services/passportFacebook')(passport)
require('./services/passportInstagram')(passport)

// Initialize Express
const app = express()

// Middleware
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(passport.initialize())

// DB config
const db = require('./config/keys').keys

// Connect to Mongodb
mongoose
  .connect(db.mongo.url(), db.mongo.options)
  .then(() => console.log('Mongodb Connected'))
  .catch(err => console.error(err))

// Use Routes
app.use('/auth/google', google)
app.use('/auth/facebook', facebook)
app.use('/auth/instagram', instagram)
app.use('/api/users', users)
app.use('/api/posts', posts)

// Server static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

// Server Port
const port =  process.env.PORT || 5000
app.listen(port, () => console.log(`Server running on port ${port}`))
