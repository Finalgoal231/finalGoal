const jwt = require("jsonwebtoken");
const keys = require('../configs/keys');

module.exports.requireUser = (req, res, next) => {
  const token = req.header("authorization").replace("bareer ", "");

  jwt.verify(token, keys.secretOrKey, function (err, decoded) {
    if (err) res.status(419).json(err);
    else {
      req.user = decoded;
      next();
    }
  });
};

module.exports.requireSeller = (req, res, next) => {
  const token = req.header("authorization").replace("bareer ", "");

  jwt.verify(token, keys.secretOrKey, function (err, decoded) {
    if (err) res.status(419).json(err);
    else {
      if (decoded.role === 'seller' || decoded.role === 'admin') {
        req.user = decoded;
        next();
      } else {
        res.status(419).json({ token: "Invalid Seller token!" });
      }
    }
  });
};

module.exports.requireAdmin = (req, res, next) => {
  const token = req.header("authorization").replace("bareer ", "");
  jwt.verify(token, keys.secretOrKey, function (err, decoded) {
    if (err) res.status(419).json(err);
    else {
      if (decoded.role === 'admin') {
        req.user = decoded;
        next();
      } else {
        res.status(419).json({ token: "Invalid Admin token!" });
      }
    }
  });
};