const express = require('express');
const signout = require('../../controllers/signin-out_controller/signout.controller');
const verifyToken = require('../../middleware/verfiyToken');

const signoutRouter = express.Router();

signoutRouter.post('/', verifyToken, signout)

module.exports = signoutRouter;