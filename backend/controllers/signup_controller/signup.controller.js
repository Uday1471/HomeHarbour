const user = require("../../models/user/user.mongo.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(422).json({ error: "Please fill all the fields" });
    }
    const userExist = await user.findOne({ email: email });
    if (userExist) {
      return res.status(422).json({ error: "Email already exist" });
    }
    const encryptedPassword = await bcrypt.hash(password, 10);

    const newUser = new user({
      name,
      email,
      password: encryptedPassword
    });
    await newUser.save();

    const token = jwt.sign(
      { user_id: newUser._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "24h",
      }
    );
    // save user token
    newUser.token = token;

    // return new user
    res.status(201).json(newUser);
  } catch (err) {
    console.log(err);
  }
}

exports.updateUser = async (req, res) => {
  const { name } = req.body;

  try {
    const userExist = await user.findOne({ _id: req.user.user_id });
    if (!userExist) {
      return res.status(422).json({ error: "User not found" });
    }
    const newUser = {
      name,
    };
    await user.updateOne({ _id: req.user.user_id }, {
      $set: newUser
    });
    console.log(name);
    userExist.name = name;
    res.status(201).json(userExist);
  } catch (err) {
    res.status(400).json({ error: err });
  }
}
