const stripe = require('stripe')('sk_test_51Hh4PTExKtPKw5yv7T2Yz3iGkrE5bEvqfPPUFX2jQuWWfKRG3OG6dOehGKJ2O9gVR0Stsf2EOecDMzMd3dI1ItLb00LRMyIHNu');

/**
 * New Checkout Session
 */
exports.create_checkout_session = (req, res) => {
	console.log('NEW CHECKOUT SESSION:' + JSON.stringify(req.body));
	console.log('             CHANNEL:' + req.body.priceId);
	console.log('          SUBSCRIBER:' + req.body.custId);

	// Stripe API to create new Product wrapped inside a Price
	try {
		stripe.checkout.sessions.create({
									mode: "subscription",
									payment_method_types: ["card"],
									customer: req.body.custId,
									line_items: [
										{
											price: req.body.priceId,
											quantity: 1,
										},
									],
									success_url: "http://localhost:3030/Subscribed",
									cancel_url: "http://localhost:3030/Subscribed",
								})
								.then(session => {
									const sid = session.id;
									console.log('New Session id:' + sid);
									res.status(200).send({sessionId: sid});
								})
								.catch(error => console.error(error));
	}
	catch (err) {
		res.status(500).send({errors: err});
	}
};


/**
 * Find all subscriptions
 */
exports.all_subs = (req, res) => {
	console.log('LIST ALL SUBSCRIPTIONS:' + JSON.stringify(req.body));
	
	try {
		stripe.subscriptions.list({
								limit: 10,
							})
							.then(s => {
								console.log(s);
								res.status(200).send(s);
							})
							.catch(error => console.error(error));
	}
	catch (err) {
		res.status(500).send({errors: err});
	}
};


/**
 * Find all prices
 */
exports.all_prices = (req, res) => {
	console.log('LIST ALL PRICES:' + JSON.stringify(req.body));
	
	// List Products
	try {
		stripe.prices.list({
						limit: 10,
					 })
					 .then(p => {
						console.log(p);
						res.status(200).send(p);
					 })
					 .catch(error => console.error(error));
	}
	catch (err) {
		res.status(500).send({errors: err});
	}
};


/**
 * Delete a Product
 */
exports.delete_prod = (req, res) => {
	console.log('DELETE PROD:' + JSON.stringify(req.body));
	console.log('         ID:' + req.params.id);
	
	// Delete Channel
	try {
		stripe.products.del(
			req.params.id
			);
		stripe.accounts.del(req.params.id)
						.then(products => {
							console.log(products);
							res.status(200).send(products);
						})
						.catch(error => console.error(error));
	}
	catch (err) {
		res.status(500).send({errors: err});
	}
};

