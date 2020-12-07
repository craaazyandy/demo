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
 * New Subscription
 */
exports.new_subs = (req, res) => {
	console.log('NEW SUBSCRIPTION:' + JSON.stringify(req.body));
	console.log('        CUSTOMER:' + req.body.custId);
	console.log('           PRICE:' + req.body.priceId);

	// Stripe API to create new Subscription
	try {
		stripe.subscriptions.create({
								customer: req.body.custId,
								items: [
									{price: req.body.priceId},
								],
							})
							.then(subscription => {
								const sid = subscription.id;
								console.log('New Subscription id:' + sid);
								res.status(200).send({subscription_id: sid});
							})
							.catch(error => console.error(error));
	}
	catch (err) {
		res.status(500).send({errors: err});
	}

};