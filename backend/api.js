const express = require("express");
const api = express.Router();
const signinRouter = require("./routes/signin-out/signin.router");
const signupRouter = require("./routes/signup/signup.router");
const forgetRouter = require("./routes/forget/forget.router");
const signoutRouter = require("./routes/signin-out/signout.router");

api.use("/signin", signinRouter);
api.use("/signout", signoutRouter);
api.use("/signup", signupRouter);
api.use("/forget-password", forgetRouter);
api.use("/property", require("./routes/property.js"));

module.exports = api;