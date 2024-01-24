const jwt = require('jsonwebtoken');
const User = require('../../models/user/user.mongo.js');
const invalidToken = require('../../models/invalidToken/invalidToken.mongo.js');

async function signout(req, res) {
    const token = req.headers.authorization;
    try {
        const invalidatedToken = new invalidToken({ token });
        await invalidatedToken.save();
        res.status(200).json({ message: "Logout successful" });
      } catch (err) {
        res.status(500).json({ message: "Error invalidating the token" });
    }
}

module.exports = signout;