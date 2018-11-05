const mongoose = require("mongoose")
const Schema = mongoose.Schema

// Create Schema
const PostSchema = new Schema({
  _user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  title: {
    type: String,
    required: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  asana: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  tags: {
    type: [String]
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      }
    }
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      },
      text: {
        type: String,
        required: true
      },
      name: {
        type: String
      },
      avatar: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = Post = mongoose.model("post", PostSchema)
