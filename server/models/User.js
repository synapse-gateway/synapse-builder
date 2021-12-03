const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: String,
  lastName: String,
  admin: Boolean,
  root: {
    type: Boolean,
    default: false
  }
}, {timestamps: true})

const User = mongoose.model("user", UserSchema)

exports.User = User
