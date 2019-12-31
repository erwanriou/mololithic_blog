const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const passport = require("passport")
const http = require("http")
const path = require("path")

// Initialize Express
const app = express()
const server = http.Server(app)

// Import Database
const mlab = require("./services/mlab")

// Import Routes
const google = require("./routes/auth/google")
const facebook = require("./routes/auth/facebook")
const instagram = require("./routes/auth/instagram")
const users = require("./routes/api/users")
const posts = require("./routes/api/posts")

//import strategies
require("./services/passportJwt")(passport)
require("./services/passportGoogle")(passport)
require("./services/passportFacebook")(passport)
require("./services/passportInstagram")(passport)

// Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(passport.initialize())

// Connect to Mongodb
const mongoDb = mlab()
mongoose.set("useCreateIndex", true)

// Use Routes
app.use("/auth/google", google)
app.use("/auth/facebook", facebook)
app.use("/auth/instagram", instagram)
app.use("/api/users", users)
app.use("/api/posts", posts)

// Server static assets
if (process.env.NODE_ENV === "production") {
  app.enable("trust proxy")
  app.use(express.static("client/build"))
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  })
}

// Server Port
const port = process.env.PORT || 5000
server.listen(port, () => console.log(`Server running on port ${port}`))
