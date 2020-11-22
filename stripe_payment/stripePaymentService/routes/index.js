var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

let acct = require('../acct/controllers/acctController');
let prod = require('../prod/controllers/prodController');

router.post('/acct/:phone', acct.new_acct);

router.delete('/acct/:id', acct.delete_acct);
router.get('/acct_link/:id', acct.acct_link);

router.post('/prod', prod.new_prod);

router.get('/accts', acct.all_accts);
router.get('/prods', prod.all_prods);

module.exports = router;
