const crypto = require('crypto');
const UserModel = require('../users/models/userModel');
const jwt = require('jsonwebtoken');
var jwtSecret = "my JWT secret";

exports.isLoggedIn = (req, res, next) => {
	if (req.headers['authorization']) {
        try {
			let authorization = req.headers['authorization'].split(' ');
            if (authorization[0] !== 'Bearer') {
                return res.status(401).send();
			} 
			else {
                req.jwt = jwt.verify(authorization[1], jwtSecret);
                return next();
            }
		} 
		catch (err) {
            return res.status(403).send();
        }
	} 
	else {
        return res.status(401).send();
    }
}; 


exports.isAuth = (req, res, next) => {
	UserModel.findByEmail(req.body.email)
			 .then((user) => {
				if(!user){
					res.status(404).send({});
				}
				else {
               		let passwordFields = user.password.split('$');
            		let salt = passwordFields[0];
					let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
					if (hash === passwordFields[1]) {
						req.body = {
							email: user.email,
							level: user.level,
							password: user.password
						};
						return next();
					} 
					else {
						return res.status(400).send({errors: ['Invalid email or password']});
					}
				}
			 });
};