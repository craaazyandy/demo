const stripe = require('stripe')('sk_test_51Hh4PTExKtPKw5yv7T2Yz3iGkrE5bEvqfPPUFX2jQuWWfKRG3OG6dOehGKJ2O9gVR0Stsf2EOecDMzMd3dI1ItLb00LRMyIHNu');

/**
 * Sign up a new subscriber
 */
exports.new_cust = (req, res) => {
	console.log('NEW PHONE CUST:' + JSON.stringify(req.body));
	console.log('         PHONE:' + req.params.phone);
	
	// Stripe API to create new account
	try {
		stripe.customers.create({
							phone: req.params.phone
						})
						.then(subscriber => {
							const sid = subscriber.id;
							console.log('New Subscriber Stripe id:' + sid);
							res.status(200).send({result: 1});
						})
						.catch(error => console.error(error));
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
 * Find all customers
 */
exports.all_custs = (req, res) => {
	console.log('LIST ALL CUSTS:' + JSON.stringify(req.body));
	
	// List Subscribers
	try {
		stripe.customers.list({
							limit: 10,
						})
						.then(customers => {
							console.log(customers);
							res.status(200).send(customers);
						})
						.catch(error => console.error(error));
	}
	catch (err) {
		res.status(500).send({errors: err});
	}
};


/**
 * Delete a customer
 */
exports.delete_cust = (req, res) => {
	console.log('DELETE CUST:' + JSON.stringify(req.body));
	console.log('         ID:' + req.params.id);
	
	// Delete Subscriber
	try {
		stripe.customers.del(req.params.id)
						.then(customers => {
							console.log(customers);
							res.status(200).send(customers);
						})
						.catch(error => console.error(error));
	}
	catch (err) {
		res.status(500).send({errors: err});
	}
};