const express = require('express');
const { updateUser, signup } = require('../../controllers/signup_controller/signup.controller.js');
const verifyToken = require('../../middleware/verfiyToken.js');
const signupRouter = express.Router();

signupRouter.post('/', signup)
signupRouter.put('/:id', verifyToken, updateUser);

module.exports = signupRouter;