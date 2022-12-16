const router = require('express').Router();
const signLogRoute = require('./sign_log')
// const tu = require('../models/user.models')

/**
* @swagger
 * /signup:
 *   post:
 *     summary: Sign in in the Shopping.
 *     description: Signup.
 *     parameters:
 *       - in: query
 *         name: email
 *         required: false
 *         description: email- Email of user.
 *         schema:
 *           type: string
 *       - in: query
 *         name: password
 *         required: false
 *         description: password- Password of user .
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           # a pointer to a definition
 *           $ref: "#/definitions/HelloWorldResponse"
 *         # responses may fall through to errors
 *       400:
 *         description: Error
 *         schema:
 *            $ref: "#/definitions/ErrorResponse"
 */

router.post('/', signLogRoute);

