const UserController = require("../controllers/UserController");
const AuthController = require("../controllers/AuthController");
const { loginRateLimiter } = require("../middleware/Middleware");

const routes = (app) => {
  app.post("/users", UserController.create);

  app.post("/auth/login", loginRateLimiter, AuthController.login);
};

module.exports = routes;
