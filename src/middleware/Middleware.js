const rateLimit = require('express-rate-limit');

const loginRateLimiter = rateLimit({
  // windowMs: 15 * 60 * 1000, // 15 min in milliseconds
  windowMs: 5 * 60 * 1000, // 15 min in milliseconds
  max: 5,
  message: "Login error, you have reached maximum retries. Please try again after 10 minutes", 
  statusCode: 429,
  headers: true,
});

module.exports = { loginRateLimiter }
