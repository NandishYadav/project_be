const usersController = require('./../controllers/users');

const router = require('express').Router();

router.post('/register', usersController.createUser);
router.post('/login', usersController.loginUser);

module.exports = router;