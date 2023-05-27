const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');

// eslint-disable-next-line consistent-return
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(403).send({
      message: 'No token provided!',
    });
  }
  // eslint-disable-next-line consistent-return
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: 'Unauthorized!',
      });
    }
    req.userId = decoded.id;
    next();
  });
};

// eslint-disable-next-line consistent-return
const verifyAdmin = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(403).send({
      message: 'No token provided!',
    });
  }
  // eslint-disable-next-line consistent-return
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err || decoded.role.toLowerCase() !== 'admin') {
      return res.status(401).send({
        message: 'Unauthorized!',
      });
    }
    next();
  });
};

const authJwt = {
  verifyToken,
  verifyAdmin,
};

module.exports = authJwt;
