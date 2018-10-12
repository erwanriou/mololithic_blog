const keys = {
  mongo: {
    url : function() {
      return process.env.MONGO_URI
    },
    options : {
      useNewUrlParser: true,
    },
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  google: {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET_OR_KEY,
    callbackURL: process.env.GOOGLE_CALLBACK,
  },
  facebook: {
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_SECRET_OR_KEY,
    callbackURL: process.env.FACEBOOK_CALLBACK,
  },
}

exports.keys = keys
