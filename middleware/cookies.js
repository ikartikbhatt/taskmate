const jwtCookies = require("../helper/jwtCookies");

function authFn(req, res, next) {
  const userCookie = req.cookies["taskMate"];

  if (!userCookie) {
    return "unauthorized route";
  }

  const decodeCookie = jwtCookies.verifyToken(userCookie);

  req.user = decodeCookie;

  next();
}

module.exports = { authFn };
