const bcrypt = require('bcrypt');
const tokenCreator = require('../register/register.js');
const { createToken } = tokenCreator;
const users_DB = require('../../Model/Users/users.js');
const { users } = users_DB;

const maxAge = 3 * 24 * 60 * 60;

const login_get = (req, res) => {
	let email, pwd, invalidLogin;
	res.render('login', { email, pwd, invalidLogin });
}

let input_validation = (input) => {
	if(input.trim() === '' || input.trim().length === 0 || input === null){
		return false;
	}
}

const login_post = (req, res) => {
	const formData = req.body;
	const { email, pwd } = formData;
	let invalidLogin;
	const findUser = (mail) => {
		return mail.Email === email.trim();
	}
	
	users.find().then(async (result) => {
		
		const findResult = result.filter(findUser);
			
		if(input_validation(email) === false || input_validation(pwd) === false){
			return res.render('login', { email, pwd, invalidLogin });
		}else{
			
			if(findResult.length > 0){
				const {  _id, Email, Password } = findResult[0];
				console.log(findResult);
				if(email.trim() === Email){
					
					const auth = await bcrypt.compare(pwd.trim(), Password);
					if(auth){
						const token = createToken(_id);
						res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
						return res.redirect('/dashboard');
					}else{
						invalidLogin = true;
						return res.render('login', { email, pwd, invalidLogin });
					}
				}
			
			}else{
				invalidLogin = true;
				return res.render('login', { email, pwd, invalidLogin });
			}
		}
		
	}).catch((err) => {
		console.log(err);
	})
}

const logout = (req, res) => {
	res.cookie('jwt', '', { maxAge: 1 });
	res.redirect('/');
}

module.exports = {
	login_get,
	login_post,
	logout
}