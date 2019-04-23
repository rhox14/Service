const express = require('express');
const release = "0.9.1";
const router = express.Router();
var pjson = require('package.json');
/**
 * @api {get} /_health get middleware health
 * @apiName _health
 * @apiGroup Health
 * @apiVersion 1.0.0
 *
 * @apiSuccess {json} response Middleware status.
 * @apiError (400) Bad request
 * @apiError (500) InternalServerError Internal Server Error.
 */
router.get('/', (req, res, next) => {
	res.status(pjson.status);
	res.json({
		message : "Service Online"
	});
}
)

module.exports=router;