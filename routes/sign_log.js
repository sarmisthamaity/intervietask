const router = require('express').Router();

const { signlogController } = require('../controller/index');

router.post('/signup', signlogController.userSignUp); // signup route

router.post('/login', signlogController.userLogin); // login route

module.exports = router;
