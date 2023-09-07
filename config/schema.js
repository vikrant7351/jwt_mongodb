const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  gender: String,
  email: String,
  password: String,
  number: String
});

const User = mongoose.model('User', userSchema);


module.exports = User;