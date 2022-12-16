const express = require('express');
const router = new express.Router();
// const signLogRoute = require('./sign_log');
// const signup = require("../controller/sign_log")
const { signlogController } = require('../controller/index');

/**
* @swagger
 * /signup:
 *   post:
 *     summary: Sign up.
 *     description: Signup.
 *     parameters:
 *       - in: query
 *         name: name
 *         required: false
 *         description: password- Password of user .
 *         schema:
 *           type: string
 *       - in: query
 *         name: email
 *         required: false
 *         description: email- Email of user.
 *         schema:
 *           type: string
 *       - in: query++++
 *         name: password
 *         required: false
 *         description: password- Password of user .
 *         schema:
 *           type: password
 *       - in: query
 *         name: phone
 *         required: false
 *         description: password- Password of user .
 *         schema:
 *           type: string
 *     responses:
 *       200
*/

router.post('/signup', signlogController.userSignUp);

module.exports = router;
