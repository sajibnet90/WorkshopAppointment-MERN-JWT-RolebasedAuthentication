// server/models/UserAuth.js
const mongoose = require('mongoose');

const UserAuthSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'user', // Default role if not specified
    enum: ['user', 'admin'] // Optional: Specify the allowed roles
  }
});

const UserAuthModel = mongoose.model('Userauth', UserAuthSchema);

module.exports = UserAuthModel;
