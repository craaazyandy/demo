var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const userSchema = new Schema({
	email: String,
	password: String,
	level: Number
});

const userModel = mongoose.model('User', userSchema);

exports.createUser = (userData) => {
    const user = new userModel(userData);
    return user.save();
};

exports.findByEmail = (email) => {
	return userModel.findOne({email : email})
					.then((result) => {
        				result = result.toJSON();
        				delete result.__v;
        				return result;
    				});
};

exports.findAll = () => {
	var a = [];
	return userModel.find({})
					.then((result) => {
						result.forEach((user) => {
							console.log(user);
							a.push(user.toJSON());
						});
						return a;
					});
};

exports.patchPswd = (email, userData) => {
	return userModel.updateOne(
						{ email : email }, 							// Filter
						{ $set : {"password": userData.password} },	// Update
						{ upsert : false })
					.then((result) => {
        				return result;
    				});
};
