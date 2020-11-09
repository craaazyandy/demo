var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

let acct = require('../acct/controllers/acctController');

router.get('/new_acct/:email', acct.new_acct);
router.get('/all_accts', acct.all_accts);

module.exports = router;
