const jwt = require('jsonwebtoken');

const require_auth = (req, res, next) => {
	
	const token = req.cookies.jwt;
	
	//check exsistence of jwt cookie
	if(token){
		jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => {
			if(err){
				return res.redirect('/login');
			}else{
				const { id } = decodedToken;
				res.locals.id = id;
				next();
			}
		});
	}else{
		return res.redirect('/login');
	}
}

const check_current_user = (req, res, next) => {
	const token = req.cookies.jwt;
	
	//check exsistence of jwt cookie
	if(token){
		jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => {
			if(err){
				res.locals.req = req;
				res.locals.id = null;
				next();
			}else{
				const { id } = decodedToken;
				res.locals.req = req;
				res.locals.id = id;
				next();
			}
		});
	}else{
		res.locals.req = req;
		res.locals.id = null;
		next();
	}
}

const redirector = (req, res, next) => {
	
	const token = req.cookies.jwt;
	
	//check exsistence of jwt cookie
	if(token){
		jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => {
			if(err){
				return res.redirect('/');
			}else{
				return res.redirect('/');
			}
		});
	}else{
		next();
	}
}

module.exports = {
	require_auth,
	redirector,
	check_current_user
}