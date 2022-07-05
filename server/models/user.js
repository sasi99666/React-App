// 1. import mongoose
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose);

// 2. create schema for entity
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true},
  useremail: { type: String, required: true},
  password: { type: String, required: true},
  token: {type: String}, //refresh token
  followers: [String],
  following: [String]
})

// 3. create model of schema
userSchema.plugin(autoIncrement.plugin, { model: 'User', field: 'userid' });
const User = mongoose.model("User", userSchema);

// 4. create CRUD functions on model
//CREATE a user
async function register(username, useremail, password) {
  const user = await getUser(useremail);
  if(user) throw Error('Username already in use');

  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    username: username,
    useremail: useremail,
    password: hashed,
    token: null,
  });
  return newUser._doc;
}

// READ a user
async function login(useremail, password) {
  const user = await getUser(useremail);
  if(!user) throw Error('User not found');

  const isMatch = await bcrypt.compare(password, user.password);

  if(!isMatch) throw Error('Wrong Password');

  return user._doc;
}

// UPDATE
async function updatePassword(id, password) {
  const user = await User.updateOne({"_id": id}, {$set: { password: password}});
  return user;
}

//Update user
async function updateUser(where, data) {
  const user = await User.findOneAndUpdate(where, {$set: data});
  return user;
}

//DELETE
async function deleteUser(id) {
  await User.deleteOne({"_id": id});
};

// utility functions
async function getUser(useremail) {
  return await User.findOne({ "useremail": useremail});
}

async function getToken(token) {
  return await User.findOne({ token: token});
}

// 5. export all functions we want to access in route files
module.exports = { 
  register, login, updatePassword, deleteUser, updateUser, getToken
};