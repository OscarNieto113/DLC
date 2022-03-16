const express = require('express');
const req = require('express/lib/request');
const router = express.Router();

const userController = require('../controllers/user_controller');

router.get('/', userController.root);
router.post('/login', userController.login);
router.get('/logout', userController.logout);

module.exports = router;
