const jwt = require("jsonwebtoken");
const sendResponse = require("../helper/sendResponse");

function authFn(req, res, next) {
  const userCookie = req.cookies?.taskmate;
  if (!userCookie) {
    return sendResponse(res, 401, "failure", "unauthorized");
  }

  try {
    const decoded = jwt.verify(userCookie, process.env.SECRET_KEY);
    req.userId = decoded.id;
    next();
  } catch {
    return sendResponse(res, 401, "failure", "invalid token");
  }
}

module.exports = authFn;
