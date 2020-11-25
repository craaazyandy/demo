const stripe = require('stripe')('sk_test_51Hh4PTExKtPKw5yv7T2Yz3iGkrE5bEvqfPPUFX2jQuWWfKRG3OG6dOehGKJ2O9gVR0Stsf2EOecDMzMd3dI1ItLb00LRMyIHNu');

/**
 * New Product
 */
exports.new_prod = (req, res) => {
	console.log('NEW PRODUCT:' + JSON.stringify(req.body));
	console.log('       NAME:' + req.body.name);
	console.log('      PRICE:' + req.body.price);
	console.log('       USER:' + req.body.user);

	// Stripe API to create new Product wrapped inside a Price
	try {
		stripe.products.create({
							name: req.body.name,
							metadata: {
								'user': req.body.user
							},
						})
						.then(product => {
							const pid = product.id;
							console.log('New Product id:' + pid);
							// res.status(200).send({result: 1});
							stripe.prices.create({
											unit_amount: req.body.price,
											currency: 'usd',
											recurring: {interval: 'month'},
											product: pid,
											metadata: {
												'user': req.body.user
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
	
	// Stripe API to create new account
	try {
		stripe.products.list({
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
	console.log('DELETE ACCT:' + JSON.stringify(req.body));
	console.log('         ID:' + req.params.id);
	
	// Delete Channel
	try {
		stripe.accounts.del(
			req.params.id
			);
		stripe.accounts.del(req.params.id)
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