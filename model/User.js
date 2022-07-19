const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 6,
  },
  password: {
    type: String,
    required: true,
    max: 4
  },
  businessName: {
    type: String,
    required: true,
    min: 4
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  contact: {
    type: String,
    required: true,
    min: 11,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model('User', userSchema);
