const router = require('express').Router();

const signLogRoute = require('./sign_log');
const usersRoute = require('./user.routes');

router.use('/', signLogRoute);
router.use('/', usersRoute);

module.exports = router;
