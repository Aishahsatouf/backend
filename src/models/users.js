'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const users = new mongoose.Schema({
  username: { type: String, required: true},
  email:{type:String,required:true, unique: true },
  password: { type: String, required: true},
}
);

users.virtual('token').get(function () {
  let tokenObject = {
    email: this.email,
  }
  console.log(tokenObject);
  return jwt.sign(tokenObject, process.env.SECRET)
});

users.pre('save', async function () {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password,10);
  }
  
});

users.statics.authenticateBasic = async function (email, password) {
  const user = await this.findOne({ email:email })
  
  const valid = await bcrypt.compare(password, user.password)
  if (valid) { return user; }
  throw new Error('Invalid User');
}

users.statics.authenticateWithToken = async function (token) {
  try {
    const parsedToken = jwt.verify(token, process.env.SECRET);
    const user = this.findOne({ email: parsedToken.email })
    if (user) { return user; }
    throw new Error("User Not Found");
  } catch (e) {
    throw new Error(e.message)
  }
}


module.exports = mongoose.model('to_do_users', users);