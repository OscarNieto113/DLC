const express = require('express');
const router = express.Router();

const userController = require('../controllers/user_controller');

router.get('/login', userController.get_login);
router.post('/login', userController.login);
router.get('/logout', userController.logout);
router.get('/', userController.root);

module.exports = router;
