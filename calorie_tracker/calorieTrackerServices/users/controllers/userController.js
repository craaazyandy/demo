const crypto = require('crypto');
const UserModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
var jwtSecret = "my JWT secret";

exports.signup = (req, res) => {
	let salt = crypto.randomBytes(16).toString('base64');
	let hash = crypto.createHmac('sha512', salt)
					 .update(req.body.password)
					 .digest("base64");
	req.body.password = salt + "$" + hash;
	req.body.level = 1;
	UserModel.createUser(req.body)
			 .then((result) => {
				res.status(201).send({ id: result._id });
			 });
};

exports.user_by_email = (req, res) => {
	UserModel.findByEmail(req.params.email).then((result) => {
		res.status(200).send(result);
	});
};

exports.users = (req, res) => {
	UserModel.findAll().then((result) => {
		res.status(200).send(result);
	});
};

exports.patch_by_email = (req, res) => {
	if (req.body.password){
		let salt = crypto.randomBytes(16).toString('base64');
		let hash = crypto.createHmac('sha512', salt)
						 .update(req.body.password)
						 .digest("base64");
		req.body.password = salt + "$" + hash;
	}
	UserModel.patchPswd(req.params.email, req.body).then((result) => {
           res.status(204).send({});
   });
};

exports.login = (req, res) => {
	try {
		let refreshId = req.body.email + jwtSecret;
		let salt = crypto.randomBytes(16).toString('base64');
		let hash = crypto.createHmac('sha512', salt).update(refreshId).digest("base64");
		req.body.refreshKey = salt;
		let token = jwt.sign(req.body, jwtSecret);
		let b = new Buffer(hash);
		let refresh_token = b.toString('base64');
		res.status(201).send({accessToken: token, refreshToken: refresh_token, userEmail: req.body.email});
	} 
	catch (err) {
		res.status(500).send({errors: err});
	}
};

exports.logout = function (req, res, next) {
	req.logout();
	req.session.destroy();
	res.redirect('/');
}