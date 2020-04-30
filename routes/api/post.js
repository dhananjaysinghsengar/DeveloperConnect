const express = require('express');
const router = express.Router();

// @route api/post
// @desc Test route
// @access Public
router.get('/', (req, res) => res.send('Post route'));

module.exports = router;
