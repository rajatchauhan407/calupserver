const express = require('express');
const Router = express.Router();
const questionController = require('../controller/question');

Router.post('/multiply', questionController.getMultiplyQuestions);

module.exports = Router;