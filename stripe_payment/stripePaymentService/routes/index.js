var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

let acct = require('../acct/controllers/acctController');

router.post('/acct/:email', acct.new_acct);
router.get('/accts', acct.all_accts);
router.delete('/acct/:id', acct.delete_acct);

module.exports = router;
