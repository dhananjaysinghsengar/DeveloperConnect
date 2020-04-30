const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../model/User');
const { check, validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

// @route  GET api/auth
// @desc   Test route
// @access Public
router.get('/', auth, async (req, res) => {
  try {
    const userDetails = await User.findById(req.user.id).select('-password');
    res.json(userDetails);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route  POST api/auth
// @desc   Authenticate user and get token
// @access Public
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(`inside error check`);
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      //verify if user exist
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: 'Invalid credential' });
      }

      let doesPasswordMatch = await bcryptjs.compare(password, user.password);
      if (!doesPasswordMatch) {
        return res.status(400).json({ message: 'Invalid credential' });
      }

      //Encrypt password
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
      //return jsonwebtoken
    } catch (err) {
      console.error(err.message);

      return res.status(500).send('Internal Server Error');
    }

    //res.send('User registered!!');
  }
);

module.exports = router;
