const Users = require('../models/users');
require('dotenv').config();
const bcrypt = require('bcrypt');
const { userSchema } = require('../validation/userSchema');
const crypto = require('crypto');

const register = async (req, res) => {
  const { error, value } = userSchema.validate(req.body);
  const user = await User.findOne({ email: value.email });

  if (user) {
    res.json({
      code: 409,
      message: 'Email in use!',
    });
  }
  if (error) {
    res.json({
      code: 401,
      message: error.message,
    });
  }

  try {
    const newUser = new User({
      firstName: value.firstName,
      lastName: value.lastName,
      email: value.email,
      verificationToken: crypto.randomBytes(68).toString('hex'),
    });
    await newUser.setPassword(value.password);
    await newUser.save();

    res.status(201).json({
      user: {
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        password: newUser.password,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { register };
