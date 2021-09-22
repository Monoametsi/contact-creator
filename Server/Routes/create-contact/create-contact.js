const jwt = require('jsonwebtoken');
const uuid = require('uuid');
const users_DB = require('../../Model/Users/users.js');
const { users } = users_DB;

const create_contact_get = (req, res) => {
	let empty_inputs;
	res.render('create-contact', { empty_inputs });
}

const input_validation = (obj) => {
	let count = 0;
	for(key in obj){
		if(obj[key].trim().length === 0){
			count++;
		}
	}
	
	return Object.keys(obj).length === count;
}

const create_contact_post = async (req, res) => {
	const formData = req.body;
	const contactId = uuid.v4();
	let empty_inputs;
	const { name, surname, username, pwd, email, home_number, cell_number, note_title, note_date, note_description } = formData;
	
	if(input_validation(formData)){
		empty_inputs = true;
		return res.render('create-contact', { empty_inputs });
	}else{
		const contactInfo = { contactId: contactId, name, surname, username, pwd, email, home_number, cell_number, note_title, note_description, note_date };
		
		await users.find().then( async (results) => {
			const token = req.cookies.jwt;
			jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decodedToken) => {
				
				const { id } = decodedToken;
				
				const findEmail = (identity) => {
					return identity._id === id;
				}
				
				const updateUserInfo = (res) => {
					let usersId = { _id: id };
					let contactArr = { $push: { Contacts: contactInfo } };
					
					users.updateOne(usersId, contactArr, (err, res) => {
						if(err) throw err;
					});
				}
				
				await updateUserInfo();
				res.redirect('/dashboard');
			});
			
		}).catch((err) => {
			console.log(err);
		});
	}
}

module.exports = {
	create_contact_get,
	create_contact_post,
	input_validation
}