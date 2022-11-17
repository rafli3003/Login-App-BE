const jwt = require("jsonwebtoken");

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.TOKEN_SECRET_KEY, {
    expiresIn: "65m",
  });
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.TOKEN_SECRET_KEY);
};

module.exports = {
  generateToken,
  verifyToken,
};
