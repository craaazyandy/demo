var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

let acct = require('../acct/controllers/acctController');
let prod = require('../prod/controllers/prodController');
let cust = require('../cust/controllers/custController');
let adm = require('../adm/controllers/admController');

router.post('/acct/:phone', acct.new_acct);
router.post('/cust/:phone', cust.new_cust);

router.delete('/acct/:id', acct.delete_acct);
router.delete('/cust/:id', cust.delete_cust);
router.get('/acct_link/:id', acct.acct_link);

router.post('/prod', prod.new_prod);
router.post('/price/:id', prod.update_price);

router.get('/accts', acct.all_accts);
router.get('/prods', prod.all_prods);
router.get('/custs', cust.all_custs);
router.get('/setup_intents', cust.all_setup_intents);
router.get('/payment_intents', cust.all_payment_intents);
router.get('/payment_methods/:cust', cust.all_payment_methods);
router.get('/invoices', cust.all_invoices);
router.get('/subs', adm.all_subs);
router.get('/charges', adm.all_charges);
router.get('/orders', adm.all_orders);

router.post('/create-checkout-session', adm.create_checkout_session);
router.post('/subs', adm.new_subs);

module.exports = router;
