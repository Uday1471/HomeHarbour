const jwt = require("jsonwebtoken");
const invalidToken = require("../models/invalidToken/invalidToken.mongo");

async function verifyToken(req, res, next) {
  const token = req.headers.authorization;
  console.log(token);
  if (!token) {
    return res.status(401).json({ error: "Unauthorized user" });
  }
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    const foundToken = await invalidToken.findOne({ token: token });

    if (foundToken) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Token is invalidated" });
    }
    req.user = decoded;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ error: "Unauthorized user" });
  }
}

module.exports = verifyToken;
