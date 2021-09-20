const email_validator = (emailField) => {
	const emailFieldVal = emailField.trim();
	const emailOneDot = /^\w+([.!#$%&'*+-/=?^_`{|}~]?\w+)*@[A-Za-z0-9]+[-]?[A-Za-z0-9]+\.[A-Za-z]{2,3}$/;
	const emailTwoDots = /^\w+([.!#$%&'*+-/=?^_`{|}~]?\w+)*@[A-Za-z0-9]+[-]?[A-Za-z0-9]+\.[A-Za-z]{2}\.[A-Za-z]{2}$/;
	const emailThreeDots = /^\w+([.!#$%&'*+-/=?^_`{|}~]?\w+)*@[A-Za-z0-9]+[-]?[A-Za-z0-9]+\.[A-Za-z]{2,15}\.[A-Za-z]{2}\.[A-Za-z]{2}$/;
	const emailRegEx = emailOneDot.test(emailFieldVal) || emailTwoDots.test(emailFieldVal) || emailThreeDots.test(emailFieldVal);
	
	if(emailFieldVal === '' || emailFieldVal.length === 0 || emailFieldVal === undefined || emailFieldVal === null){
		return false;
	}else if(!emailRegEx){
		return false;
	}else{
		return true;
	}
}

const email_regEx = (emailField) => {
	const emailFieldVal = emailField.trim();
	const emailOneDot = /^\w+([.!#$%&'*+-/=?^_`{|}~]?\w+)*@[A-Za-z0-9]+[-]?[A-Za-z0-9]+\.[A-Za-z]{2,3}$/;
	const emailTwoDots = /^\w+([.!#$%&'*+-/=?^_`{|}~]?\w+)*@[A-Za-z0-9]+[-]?[A-Za-z0-9]+\.[A-Za-z]{2}\.[A-Za-z]{2}$/;
	const emailThreeDots = /^\w+([.!#$%&'*+-/=?^_`{|}~]?\w+)*@[A-Za-z0-9]+[-]?[A-Za-z0-9]+\.[A-Za-z]{2,15}\.[A-Za-z]{2}\.[A-Za-z]{2}$/;
	const emailRegEx = emailOneDot.test(emailFieldVal) || emailTwoDots.test(emailFieldVal) || emailThreeDots.test(emailFieldVal);
	
	return emailRegEx;
}

const password_validator = (pwd) => {
	const pwdVal = pwd.trim();
	
	if(pwdVal === '' || pwdVal === undefined || pwdVal === null || pwdVal.length === 0){
		return false;
	}else if(pwdVal.length > 0 && pwdVal.length < 6){
		return false;
	}else{
		return true;
	}
}

module.exports = {
	email_validator,
	password_validator,
	email_regEx
}