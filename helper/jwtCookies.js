require("dotenv").config();
const jwt = require("jsonwebtoken");

// JWT secret key
let secretKey = process.env.secretKey;

// generate token
async function generateToken(password) {
  return jwt.sign(password, secretKey);
}

// verify token
async function verifyToken(token) {
  return jwt.verify(token, secretKey);
}

// set token cookies
async function tokenCookies(res, token) {
  res.cookie("taskMate", token, { httpOnly: true, secure: false });
}

module.exports = { generateToken, verifyToken, tokenCookies };
