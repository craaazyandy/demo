const stripe = require('stripe')(process.env.STRIPE_SK_TEST_KEY);

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
							res.status(200).send({id: sid});
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
							limit: 100,
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
 * Find all setup intents
 */
exports.all_setup_intents = (req, res) => {
	console.log('LIST ALL CUSTS SETUP INTENTS:' + JSON.stringify(req.body));
	
	// List customers setup intents
	try {
		stripe.setupIntents.list({
							limit: 100,
						})
						.then(si => {
							console.log(si);
							res.status(200).send(si);
						})
						.catch(error => console.error(error));
	}
	catch (err) {
		res.status(500).send({errors: err});
	}
};

/**
 * Find all payment intents
 */
exports.all_payment_intents = (req, res) => {
	console.log('LIST ALL CUSTS PAYMENT INTENTS:' + JSON.stringify(req.body));
	
	// List customers payment intents
	try {
		stripe.paymentIntents.list({
							limit: 100,
						})
						.then(pi => {
							console.log(pi);
							res.status(200).send(pi);
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





/**
 * Sign up a new subscriber
 */
exports.temp = (req, res) => {

	try {
		stripe.paymentMethods.attach(
			'pm_1I1lcAExKtPKw5yvOAURa1ty',
			{customer: 'cus_Id1SttrUyPrLDb'}
		  )
						.then(result => {
							console.log(result);
							res.status(200).send(result);
						})
						.catch(error => console.error(error));
	}
	catch (err) {
		res.status(500).send({errors: err});
	}
};
