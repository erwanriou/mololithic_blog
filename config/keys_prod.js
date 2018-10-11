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
}

exports.keys = keys
