var express = require('express');
var router = express.Router();

/* GET home page. 
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
*/

/* GET home page. */
let user = require('../users/controllers/userController');
let meal = require('../meals/controllers/mealController');
let {isLoggedIn, isAuth} = require('../middleware/auth.js');

//router.get('/login', user.show_login);
//router.get('/signup', user.show_signup);
router.post('/signup', user.signup);
router.post('/login', isAuth, user.login);

router.get('/user/email/:email', user.user_by_email);
router.get('/users', user.users);
router.patch('/user/email/:email', user.patch_by_email);

router.post('/meal/:email', isLoggedIn, meal.add);
router.get('/meals/:email', isLoggedIn, meal.meals);
//router.get('/logout', user.logout);


module.exports = router;
