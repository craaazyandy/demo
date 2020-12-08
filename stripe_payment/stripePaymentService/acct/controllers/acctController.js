const stripe = require('stripe')(process.env.STRIPE_SK_TEST_KEY);

/**
 * Sign up a new connect phone account
 */
exports.new_acct = (req, res) => {
	console.log('NEW CONNECT ACCT:' + JSON.stringify(req.body));
	console.log('           PHONE:' + req.params.phone);
	
	// Stripe API to create new account
	try {
		stripe.accounts.create({
							type: 'express',
							country: 'US',
							business_type: 'individual',
							metadata: {
								'phone': req.params.phone
							},
							capabilities: {
								card_payments: {requested: true},
								transfers: {requested: true},
							},
						})
						.then(influencer => {
							const iid = influencer.id;
							console.log('New Influencer Stripe id:' + iid);
							// res.status(200).send({result: 1});
							stripe.accountLinks.create({
													account: iid,
													refresh_url: 'http://localhost:3030/refresh',
													return_url: 'http://localhost:3030/complete',
													type: 'account_onboarding',
												})
												.then(aLink => {
													console.log('New Influencer account link:' + aLink.url);
													res.status(200).send(
														{id: iid, link: aLink.url},
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
 * Retrieve a new account link for a connect account
 */
exports.acct_link = (req, res) => {
	console.log('NEW ACCT LINK:' + JSON.stringify(req.body));
	console.log('           ID:' + req.params.id);
	
	// Stripe API to create new account
	try {
		stripe.accountLinks.create({
								account: req.params.id,
								refresh_url: 'http://localhost:3030/reauth',
								return_url: 'http://localhost:3030/return',
								type: 'account_onboarding',
							})
							.then(aLink => {
									console.log('New Influencer account link:' + aLink.url);
									res.status(200).send({result: aLink.url});
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
 * Find all accounts
 */
exports.all_accts = (req, res) => {
	console.log('LIST ALL ACCTS:' + JSON.stringify(req.body));
	
	// List Influencers
	try {
		stripe.accounts.list({
							limit: 20,
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


/**
 * Delete an account
 */
exports.delete_acct = (req, res) => {
	console.log('DELETE ACCT:' + JSON.stringify(req.body));
	console.log('         ID:' + req.params.id);
	
	// Delete Influencer
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