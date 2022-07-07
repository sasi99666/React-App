// 1. import mongoose
const mongoose = require("mongoose");

// 2. create schema for entity
const postSchema = new mongoose.Schema({
  postcontent: { type: String, unique: true, required: true},
  userid: { type: String, required: true},
})

// 3. create model of schema
const Post = mongoose.model("Post", postSchema);

// 4. create CRUD functions on model
//CREATE a user
async function postcreate(userid,postcontent) {
  const newPost = await Post.create({
    postcontent: postcontent,
    userid: userid
  });

  return newPost ;
}



// UPDATE
async function editpost(id, postcontent) {
  const post = await Post.updateOne({"_id": id}, {$set: { postcontent: postcontent}});
  return post;
}

//DELETE
async function deletePost(id) {
  await Post.deleteOne({"_id": id});
};

// utility functions
async function getpostid(postid) {
  return await Post.findOne({ "_id": postid});
}

//GET POST
async function getPosts(userid) {
  return await Post.find({"userid":userid});
}


// 5. export all functions we want to access in route files
module.exports = { 
  postcreate,editpost,deletePost,getpostid, getPosts
};
