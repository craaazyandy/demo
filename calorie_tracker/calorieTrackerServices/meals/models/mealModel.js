var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const mealSchema = new Schema({
	email: String,
	text: String,
	calo: Number,
	timestamp: { type: Date, default: Date.now }
});

const mealModel = mongoose.model('Meal', mealSchema);

exports.createMeal = (mealData) => {
    const meal = new mealModel(mealData);
    return meal.save();
};

exports.findAll = (email) => {
	var a = [];
	return mealModel.find({email : email})
					.then((result) => {
						result.forEach((meal) => {
							console.log(meal);
							a.push(meal.toJSON());
						});
						return a;
					});
};