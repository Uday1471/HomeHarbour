const express = require('express');
const signin = require('../../controllers/signin-out_controller/signin.controller');

const signinRouter = express.Router();

signinRouter.post('/', signin)

module.exports = signinRouter;