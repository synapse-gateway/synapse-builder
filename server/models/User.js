const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String,
}, {timestamps: true})

const User = mongoose.model("user", UserSchema)

exports.User = User
