// src/models/user.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const roles = ['admin', 'user', 'moderator'];

const userSchema = new mongoose.Schema({
  first_name: {
    type: String, 
    required: true,
    index : true,
  },
  last_name: { 
    type: String, 
    required: true, 
    index : true,
  },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    match: /.+\@.+\..+/ ,
    index : true,
  },
  password: { type: String, required: true },
  role: { type: String, enum: roles, default: 'user' },
}, { timestamps: true });



// Remove password field from JSON output
userSchema.methods.toJSON = function() {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  return userObject;
};

module.exports = mongoose.model('User', userSchema);
