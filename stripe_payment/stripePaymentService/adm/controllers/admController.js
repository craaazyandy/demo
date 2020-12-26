const stripe = require('stripe')(process.env.STRIPE_SK_TEST_KEY);

/**
 * New Checkout Session
 */
exports.create_checkout_session = (req, res) => {
	console.log('NEW CHECKOUT SESSION:' + JSON.stringify(req.body));
	console.log('             CHANNEL:' + req.body.priceId);
	console.log('            TAX RATE:' + req.body.taxRate);
	console.log('          SUBSCRIBER:' + req.body.custId);

	// If tax rate is involved, create Taxrate object for inclusion
	const tax = parseFloat(req.body.taxRate, 10);
	console.log('DEBUG tax:' + tax);

	// Stripe API to create a checkout session
	try {
		if (tax > 0) {
			//create tax rate
			const dN = 'Subscription tax';
			stripe.taxRates.create({
				display_name: dN,
				inclusive: false,
				percentage: req.body.taxRate
			})
			.then(trres => {
				const trid = trres.id;
				console.log("DEBUG TAX RATE:" + trid);
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
					subscription_data: {
						default_tax_rates: [trid]
					}
				})
				.then(session => {
					const sid = session.id;
					console.log('New Session id:' + sid);
					res.status(200).send({sessionId: sid});
				})
				.catch(error => {
					console.error(error);
					throw "error creating checkout session:" + error;
				});
			})
			.catch(error => {
				console.error(error);
				throw "error creating tax rate:" + error;
			});
		}
		else {
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
				cancel_url: "http://localhost:3030/Subscribed"

				// payment_intent_data: {
				// 	setup_future_usage: 'off_session'
				// }
			})
			.then(session => {
				const sid = session.id;
				console.log('New Session id:' + sid);
				res.status(200).send({sessionId: sid});
			})
			.catch(error => {
				console.error(error);
				throw "error creating checkout session:" + error;
			});
		}
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
	console.log('  PAYMENT METHOD:' + req.body.paymentMethod);
	console.log('        TAX RATE:' + req.body.taxRate);

	// If tax rate is involved, create Taxrate object for inclusion
	const tax = parseFloat(req.body.taxRate, 10);

	// Stripe API to create new Subscription
	try {
		if (tax > 0) {
			//create tax rate
			const dN = 'Subscription tax';
			stripe.taxRates.create({
				display_name: dN,
				inclusive: false,
				percentage: req.body.taxRate
			})
			.then(trres => {
				const trid = trres.id;
				stripe.subscriptions.create({
					customer: req.body.custId,
					items: [
						{price: req.body.priceId},
					],
					default_payment_method: req.body.paymentMethod,
					default_tax_rates: [trid]
				})
				.then(subscription => {
					const sid = subscription.id;
					console.log('New Subscription id:' + sid);
					res.status(200).send({subscription_id: sid});
				})
				.catch(error => console.error(error));
			})
			.catch(error => {
				console.error(error);
				throw "error creating tax rate:" + error;
			});
		}
		else {
			stripe.subscriptions.create({
				customer: req.body.custId,
				items: [
					{price: req.body.priceId},
				],
				default_payment_method: req.body.paymentMethod
			})
			.then(subscription => {
				const sid = subscription.id;
				console.log('New Subscription id:' + sid);
				res.status(200).send({subscription_id: sid});
			})
			.catch(error => console.error(error));
		}
	}
	catch (err) {
		res.status(500).send({errors: err});
	}

};