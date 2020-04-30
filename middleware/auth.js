const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
  let token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const tokenKey = config.get('jwtSecret');
    const decodedToken = jwt.verify(token, tokenKey);

    req.user = decodedToken.user;
    next();
  } catch (err) {
    console.error(err.message);
    res.status(401).json({ msg: 'Token is invalid' });
  }
};
