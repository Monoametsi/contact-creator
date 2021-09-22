const jwt = require('jsonwebtoken');
const users_DB = require('../../Model/Users/users.js');
const { users } = users_DB;

const dashboard_get = async (req, res) => {
	
	await users.find().then( async (results) => {
		const token = req.cookies.jwt;
		jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decodedToken) => {
			
			const { id } = decodedToken;
		
			const findEmail = (identity) => {
				return identity._id === id;
			}
			
			const userInfo = results.filter(findEmail)[0];
			
			const { Contacts } = userInfo;
			
			res.render('dashboard', { Contacts });
				
		})
	}).catch((err) => {
		console.log(err);
	});
}

module.exports = {
	dashboard_get
}