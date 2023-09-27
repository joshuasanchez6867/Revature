const express = require('express');
const UserService = require('./service.js');
const router = express.Router();
//userService
router.get('/viewGroceries', UserService.view);


module.exports = router;