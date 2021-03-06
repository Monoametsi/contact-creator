const emailValidation = require('./data-validation.js');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');
const users_DB = require('../../Model/Users/users.js');
const { users } = users_DB;
const { email_validator, password_validator, email_regEx } = emailValidation;

const register_get = (req, res) => {
	let email, pwd, exists;
	let email_regEx = () => {
		
	}
	return res.render('register', { email, pwd, email_regEx, exists });
}

const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
	return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: maxAge
	})
}

const register_post = async (req, res) => {
	const formData = req.body;
	const { email, pwd } = formData;
	let exists = false;
	
	let findEmail = (mail) => {
		return mail.Email === email;
	}
	
	users.find().then( async (result) => {
		
		if(!email_validator(email) || !password_validator(pwd)){
			return res.render('register', { email_regEx, email, pwd, exists });
		}else{
			
			let emailFoundArr = result.filter(findEmail);
			
			if(emailFoundArr.length === 0){
				const salt = await bcrypt.genSalt();
				const user_password = await bcrypt.hash(pwd, salt);
				
				const userInfo = {
					_id: uuid.v4(),
					Email: email,
					Password: user_password,
					Contacts: []
				}
				
				const { _id, Email, Password, Contacts } = userInfo;
				
				const Users = new users({
					_id,
					Email,
					Password,
					Contacts
				});
				
				await Users.save().then(() => {
					const token = createToken(_id);
					res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
					res.redirect('/dashboard');
				}).catch((err) => {
					console.log(err);
				});
				
				
			}else{
				exists = true;
				return res.render('register', { email_regEx, email, pwd, exists }); 
			}
		}
		
	}).catch((err) => {
		console.log(err);
	});
}

module.exports = {
	register_get,
	register_post,
	createToken
}