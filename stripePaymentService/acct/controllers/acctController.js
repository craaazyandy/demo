const stripe = require('stripe')('sk_test_51Hh4PTExKtPKw5yv7T2Yz3iGkrE5bEvqfPPUFX2jQuWWfKRG3OG6dOehGKJ2O9gVR0Stsf2EOecDMzMd3dI1ItLb00LRMyIHNu');

/**
 * Sign up a new account
 */
exports.new_acct = (req, res) => {
console.log('NEW ACCT:' + JSON.stringify(req.body));
console.log('  EMAIL:' + req.params.email);

	// Stripe API to create new account
	try {
		stripe.accounts.create({
							type: 'express',
							country: 'US',
							email: req.params.email,
							capabilities: {
								card_payments: {requested: true},
								transfers: {requested: true},
							},
						})
						.then(customer => {
							console.log(customer.id);
							res.status(200).send({result: 1});
						})
						.catch(error => console.error(error));

		// stripe.customers.create({
		// 	email: 'customer@example.com',
		//   })
		// 	.then(customer => console.log(customer.id))
		// 	.catch(error => console.error(error));
	}
	catch (err) {
		res.status(500).send({errors: err});
	}
};

/**
 * Find a user by email
 */
exports.user_by_email = (req, res) => {
	try {
		UserModel.findByEmail(req.params.email)
				 .then((result) => {
					if (result) {
						res.status(200).send(result);
					}
					else {
						res.status(200).send({result: 0});
					}
				 })
				 .catch((error) => {
					res.status(500).send({errors: error});
				 });
	}
	catch (err) {
		res.status(500).send({errors: err});
	}
};

/**
 * Find all users
 */
exports.all_accts = (req, res) => {
	console.log('ALL ACCTS:' + JSON.stringify(req.body));
	
		// Stripe API to create new account
		try {
			stripe.accounts.list({
								limit: 10,
							})
							.then(accounts => {
								console.log(accounts);
								res.status(200).send(accounts);
							})
							.catch(error => console.error(error));
		}
		catch (err) {
			res.status(500).send({errors: err});
		}
};
