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
  instagram: {
    clientID: process.env.INSTAGRAM_CLIENT_ID,
    clientSecret: process.env.INSTAGRAM_SECRET_OR_KEY,
    callbackURL: process.env.INSTAGRAM_CALLBACK,
  },
  aws: {
    clientID: process.env.AWS_CLIENT_KEY,
    clientSecret: process.env.AWS_CLIENT_SECRET,
  },
}

exports.keys = keys
