const { generateToken } = require("../helper/jwtToken");
const bcrypt = require("bcrypt");

class UserService {
  constructor(db) {
    this.db = db;
  }

  async create(data) {
    try {
      const findEmail = await this.db.User.findOne({
        where: { email: data.email },
      });

      if (findEmail) {
        throw {
          type: "VALIDATION_ERROR",
          message: "Email has been used",
        };
      }

      return await this.db.User.create(data);
    } catch (e) {
      throw e;
    }
  }

  async getUser(email, password) {
    try {
      const user = await this.db.User.findOne({ where: { email: email } });
      if (!user) {
        throw {
          type: "NOT_FOUND",
          message: "Invalid email, please try again!",
        };
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw {
          type: "NOT_FOUND",
          message: "Invalid password, please try again!",
        };
      }
      const jwtPayload = {
        email: user.email,
        userId: user.id,
        // role: user.role,
      };

      const token = generateToken(jwtPayload);

      delete user.dataValues.password;
      const result = {
        ...user.dataValues,
        token: token,
      };

      return result;
    } catch (e) {
      throw e;
    }
  }
}

module.exports = UserService;
