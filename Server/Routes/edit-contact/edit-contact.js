const jwt = require('jsonwebtoken');
const users_DB = require('../../Model/Users/users.js');
const create_contact = require('../create-contact/create-contact.js');
const { input_validation } = create_contact;
const { users } = users_DB;

const edit_contact_get = async (req, res) => {
	const { Id } = req.params;
	let empty_inputs;
	
	await users.find().then( async (results) => {
		const token = req.cookies.jwt;
		jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decodedToken) => {
			
			const { id } = decodedToken;
			
			const findEmail = (identity) => {
				return identity._id === id;
			}
			
			const userInfo = results.filter(findEmail)[0];
			
			const { Contacts } = userInfo;
			
			Contacts.map((contact) => {
				const { contactId } = contact;
				if( contactId === Id){
					return res.render('edit-contact', { contact, empty_inputs });
				}
				
			});
			
		})
	}).catch((err) => {
		console.log(err);
	});
}

const edit_contact_post = async (req, res) => {
	const { Id } = req.params;
	const formData = req.body;
	let empty_inputs;
	
	await users.find().then( async (results) => {
		
		const token = req.cookies.jwt;
		
		jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decodedToken) => {
			
			const { id } = decodedToken;
			
			const findEmail = (identity) => {
				return identity._id === id;
			}
			
			const userInfo = results.filter(findEmail)[0];
			
			const { Contacts } = userInfo;
			
			if(input_validation(formData)){
				empty_inputs = true;
				Contacts.map((contact) => {
					const { contactId } = contact;
					if( contactId === Id){
						return res.render('edit-contact', { contact, empty_inputs });
					}
				
				});
				
			}else{
				
				const { name, surname, username, pwd, email, home_number, cell_number, note_title, note_date, note_description } = formData;
				const updateUserDB = async (res) => {
					let userInfo = { "Contacts.contactId": Id };
					let updatedAd = { 
						$set: {
						
						"Contacts.$.name": name.trim(),
						"Contacts.$.surname": surname.trim(),
						"Contacts.$.username": username.trim(),
						"Contacts.$.pwd": pwd.trim(),
						"Contacts.$.email": email.trim(),
						"Contacts.$.home_number": home_number.trim(),
						"Contacts.$.cell_number": cell_number.trim(),
						"Contacts.$.note_title": note_title.trim(),
						"Contacts.$.note_description": note_description.trim(),
						"Contacts.$.note_date": note_date.trim(),
						
						}
					}
				
				users.updateOne(userInfo, updatedAd, (err, res) => {
						if(err) throw err;
					});
				}
				
				await updateUserDB();
				
				res.redirect('/dashboard');
			}
			
		});
	}).catch((err) => {
		console.log(err);
	});
	
}

module.exports = {
	edit_contact_get,
	edit_contact_post
}