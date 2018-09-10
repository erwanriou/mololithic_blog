const keys = {
  secret: process.env.SECRET_OR_KEY,
  url : function() {
    return process.env.MONGO_URI
  },
  options : {
    useNewUrlParser: true,
  },
}

exports.keys = keys
