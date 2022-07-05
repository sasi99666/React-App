// 1. import any needed libraries
const express = require("express");
const Post = require('../models/post'); //accesses functions in user model file
const router = express.Router();

// 2. create all routes to access database
router

  .post('/postcreate', async (req, res) => {
    try {
      const post = await Post.postcreate(req.body.userid, req.body.postcontent);
      res.send({...post, postid: undefined, message: 'Post saved' });
    } catch(error) {
      res.status(401).send({ message: error.message }); 
    }
  })

  .post('/viewposts', async (req, res) => {
    try {
      const posts = await Post.getPosts(req.body.userid);
      res.send(posts);
    } catch(error) {
      res.status(401).send({ message: error.message });
    }
  })

  .put('/editpost', async (req, res) => {
    try {
      const post = await Post.editpost(req.body.id, req.body.postcontent);
      res.send({...post , postid: undefined});
    } catch(error) {
      res.status(401).send({ message: error.message });
    }
  })

  .post('/viewpost', async (req, res) => {
    try {
      const post = await Post.getpostid(req.body.id);
      res.send({...post});
    } catch(error) {
      res.status(401).send({ message: error.message });
    }
  })

  .delete('/deletePost', async (req, res) => {
    try {
      await Post.deletePost(req.body.id);
      res.send({ success: "Post deleted" });
    } catch(error) {
      res.status(401).send({ message: error.message });
    }
  })

// 3. export router for use in index.js
module.exports = router;