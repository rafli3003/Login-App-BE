const jwt = require("jsonwebtoken");
const { responseUnauthorized } = require("../helper/response");

function isAuthenticated(req, res, next) {
  try {
    let token = req.get("authorization");
    if (!token) {
      return responseUnauthorized(res, "Token not found");
    }
    token = token.split(" ")[1];
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);

    req.email = decoded.email;
    req.userId = decoded.userId;
    // req.role = decoded.role;
    next();
  } catch (error) {
    return responseUnauthorized(res);
  }
}

function isRootOnly(req, res, next) {
  try {
    let token = req.get("authorization");
    if (!token) {
      return responseUnauthorized(res, "Token not found");
    }
    token = token.split(" ")[1];
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    // if (decoded.role !== "ROOT") {
    //   return responseUnauthorized(res);
    // }

    req.email = decoded.email;
    req.userId = decoded.userId;
    // req.role = decoded.role;
    next();
  } catch (error) {
    return responseUnauthorized(res);
  }
}

function isTopLevelAdmin(req, res, next) {
  try {
    let token = req.get("authorization");
    if (!token) {
      return responseUnauthorized(res, "Token not found");
    }
    token = token.split(" ")[1];
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    // if (decoded.role !== "ROOT" || decoded.role !== "DIRECTOR") {
    //   return responseUnauthorized(res);
    // }

    req.email = decoded.email;
    req.userId = decoded.userId;
    // req.role = decoded.role;
    next();
  } catch (error) {
    return responseUnauthorized(res);
  }
}

module.exports = { isAuthenticated, isRootOnly, isTopLevelAdmin };
