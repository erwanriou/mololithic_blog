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
    secret: process.env.SECRET_OR_KEY,
  },
}

exports.keys = keys
