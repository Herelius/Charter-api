const userRouter = require('express').Router();
const asyncHandler = require('express-async-handler');
const User = require('../models/user-model');
const getUser = require('../middlewares/getUserMiddleware');

// GET all users
userRouter.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new user
userRouter.post(
  '/',
  asyncHandler(async (req, res) => {
    const user = new User({
      username: req.body.username,
      hashedPassword: req.body.hashedPassword,
    });
    try {
      const newUser = await user.save();
      res.status(201).json({ newUser });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  })
);

// GET one user
userRouter.get('/:id', getUser, async (req, res) => {
  res.json(res.user);
});

// DELETE one user
userRouter.delete('/:id', getUser, async (req, res) => {
  try {
    await res.User.deleteOne();
    res.json({ message: 'User has been deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = userRouter;
