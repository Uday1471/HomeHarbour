const user = require("../../models/user/user.mongo.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
async function signin(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(422)
        .json({ error: "Please fill all the login fields" });
    }
    const userCheck = await user.findOne({ email: email });

    if (userCheck) {
      const passwordMatch = await bcrypt.compare(password, userCheck.password);

      if (passwordMatch) {
        const token = jwt.sign(
          { user_id: userCheck._id, email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "24h",
          }
        );
        // save user token
        userCheck.token = token;
        await userCheck.save();
        // user
        res.status(200).json({ message: "User logged in successfully", user: {
          user_id: userCheck._id,
          email: email,
          token: token,
          name: userCheck.name,
        }
        });
      }
    } else {
      res.status(422).json({ error: "Invalid Email or Password" });
    }
  } catch (err) {
    console.log(err);
  }
}
module.exports = signin;
