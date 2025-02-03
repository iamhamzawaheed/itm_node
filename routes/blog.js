const express = require('express')
const User = require('../schemas/User');
const Post = require('../schemas/Post');
const router = express.Router();

router.post('/create', async (req, res) => {
  const { username, email, password, posts } = req.body;
  try {   
    const newUser = new User({ username, email, password });
    await newUser.save();

    const postIds = [];
    for (const post of posts) {
      const newPost = new Post({
        title: post.title,
        content: post.content,
        user: newUser._id  
      });
      await newPost.save();
      postIds.push(newPost._id);  
    }
    
    newUser.posts = postIds;
    await newUser.save();

    res.status(201).json({ user: newUser, posts: postIds });
  } catch (err) {
    res.status(400).json({ message: 'Error creating user and posts', error: err });
  }
});

router.get('/:id', async (req, res) => {
    try {
      const user = await User.find({username: 'john_doe'}); 
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(user);
    } catch (err) {
      res.status(400).json({ message: 'Error fetching user and posts', error: err });
    }
  });

module.exports = router;
