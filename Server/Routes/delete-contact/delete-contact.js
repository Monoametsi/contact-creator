const jwt = require('jsonwebtoken');
const Users = require('../../Model/Users/users.js');
const { users } = Users;

const contactRemover = (req, res) => {
	const { Id } = req.params;
	
	let DeletedBulk = Id.split(',');
	console.log(DeletedBulk);
	const token = req.cookies.jwt;
	
	if(token){
		jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decodedToken) => {
			const { id } = decodedToken;
			
			const deleteUsersContact = (res) => {
				DeletedBulk.map((deletedContact) => {
					let removeSelectedContact = { contactId: deletedContact };
					let userInfo = { _id: id }
					let removeUsersContact = { $pull: { Contacts: removeSelectedContact } }
					
					users.updateOne(userInfo, removeUsersContact, (err, res) => {
						if(err) throw console.log(err);
						console.log('item has been deleted');
					});
				});
			}
			
			await deleteUsersContact();
		});
	}else{
		res.redirect('/');
	}
}

module.exports = {
	contactRemover
}