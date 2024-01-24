const express = require('express');
const forget = require('../../controllers/forget_controller/forget.controller');

const forgetRouter = express.Router();

forgetRouter.post('/', forget);

module.exports = forgetRouter;