const stripe = require('stripe')(process.env.STRIPE_SK_TEST_KEY);

/**
 * New Product
 */
exports.new_prod = (req, res) => {
	console.log('NEW PRODUCT:' + JSON.stringify(req.body));
	console.log('       NAME:' + req.body.name);
	console.log('      PRICE:' + req.body.price);
	console.log('       USER:' + req.body.user);
	console.log('      PHONE:' + req.body.phone);

	// Stripe API to create new Product wrapped inside a Price
	try {
		stripe.products.create({
							name: req.body.name,
							metadata: {
								'user': req.body.user,
								'phone': req.body.phone
							},
						})
						.then(product => {
							const pid = product.id;
							console.log('New Product id:' + pid);
							// res.status(200).send({result: 1});
							stripe.prices.create({
											unit_amount: req.body.price,
											currency: 'usd',
											recurring: {interval: 'day'},
											product: pid,
											metadata: {
												'channel': req.body.name,
												'user': req.body.user,
												'phone': req.body.phone
											},
										 })
										 .then(price => {
											const pcid = price.id;
											console.log('New Price id:' + pcid);
											res.status(200).send(
												{product_id: pid, price_id: pcid},
											);
										 })
										 .catch(error => console.error(error));
						})
						.catch(error => console.error(error));
	}
	catch (err) {
		res.status(500).send({errors: err});
	}

};


/**
 * Find all prods
 */
exports.all_prods = (req, res) => {
	console.log('LIST ALL PRODUCTS:' + JSON.stringify(req.body));
	
	try {
		stripe.prices.list({
						limit: 100,
					 })
					 .then(p => {
						console.log(p);
						res.status(200).json(p);
					 })
					 .catch(error => console.error(error));
	}
	catch (err) {
		res.status(500).send({errors: err});
	}
};
