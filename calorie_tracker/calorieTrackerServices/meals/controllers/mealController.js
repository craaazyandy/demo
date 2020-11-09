const MealModel = require('../models/mealModel');

exports.add = (req, res) => {
	req.body.email = req.params.email;
	MealModel.createMeal(req.body)
			 .then((result) => {
				res.status(201).send({ id: result._id });
			 });
};

exports.meals = (req, res) => {
	MealModel.findAll(req.params.email).then((result) => {
		res.status(200).send(result);
	});
};

