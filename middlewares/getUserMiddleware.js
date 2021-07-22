const User = require('../models/user-model');

const getUserMiddleware = async (req, res, next) => {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (!user) return res.satuts(404).json({ message: 'Cannot find User' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.user = user;
  return next();
};

module.exports = getUserMiddleware;
