const router = require('express').Router();
const checkAuth = require('../middleware/checkauth');

const { usersController } = require('../controller/index');

router.get('/users', checkAuth, usersController.userList);

router.put('/:id/user', checkAuth, usersController.updateUser); ///:id/user


module.exports = router;
