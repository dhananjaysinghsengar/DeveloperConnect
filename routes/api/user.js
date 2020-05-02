const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../../model/User');
const gravatar = require('gravatar');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

// @route  POST api/user
// @desc   Register User
// @access Public
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(`inside error check`);
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      //verify if user exist
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ message: 'User already exist' });
      }

      //create gravatar
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm',
      });

      const userObject = {
        name,
        email,
        password,
        avatar,
      };

      user = new User(userObject);

      let salt = await bcryptjs.genSalt(10);

      user.password = await bcryptjs.hash(password, salt);

      await user.save();

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
