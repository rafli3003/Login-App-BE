const { responseSuccess, responseError } = require("../helper/response");
const db = require("../repository/models");
const UserService = require("../service/UserService");
const { validateLogin } = require("../validation/UserValidation");

const userService = new UserService(db);
module.exports = {
  login: async (req, res) => {
    try {
      const data = validateLogin(req.body);
      const getToken = await userService.getUser(data.email, data.password);
      return responseSuccess(res, getToken, "Login success");
    } catch (err) {
      return responseError(res, err);
    }
  },
};
