const jwt = require("jsonwebtoken");
const sendResponse = require("../helper/sendResponse");

function authFn(req, res, next) {
  const userCookie = req.cookies["taskmate"];

  if (!userCookie)
    return sendResponse(res, 400, "Failure", "unauthorized route");

  //decode the token to get payload
  const decodedPayload = jwt.verify(userCookie, process.env.SECRET_KEY);

  req.userId = decodedPayload.id;
  next();
}

module.exports = authFn;
