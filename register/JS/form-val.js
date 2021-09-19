const email_validator = () => {
	const emailField = document.getElementById('email');
	const emailFieldVal = emailField.value.trim();
	let emailErr = emailField.nextElementSibling;
	const emailOneDot = /^\w+([.!#$%&'*+-/=?^_`{|}~]?\w+)*@[A-Za-z0-9]+[-]?[A-Za-z0-9]+\.[A-Za-z]{2,3}$/;
	const emailTwoDots = /^\w+([.!#$%&'*+-/=?^_`{|}~]?\w+)*@[A-Za-z0-9]+[-]?[A-Za-z0-9]+\.[A-Za-z]{2}\.[A-Za-z]{2}$/;
	const emailThreeDots = /^\w+([.!#$%&'*+-/=?^_`{|}~]?\w+)*@[A-Za-z0-9]+[-]?[A-Za-z0-9]+\.[A-Za-z]{2,15}\.[A-Za-z]{2}\.[A-Za-z]{2}$/;
	const emailRegEx = emailOneDot.test(emailFieldVal) || emailTwoDots.test(emailFieldVal) || emailThreeDots.test(emailFieldVal);
	
	if(emailFieldVal === '' || emailFieldVal.length === 0 || emailFieldVal === undefined || emailFieldVal === null){
		emailErr.style.display = 'flex';
		emailErr.innerHTML = 'Required';
		emailField.classList.add('redBox');
		return false;

	}else if(!emailRegEx){
		emailErr.style.display = 'flex';
		emailErr.innerHTML = 'Invalid';
		emailField.classList.add('redBox');
		return false;

	}else{
		emailErr.style.display = 'none';
		emailField.classList.remove('redBox');
		return true;
	}
}

const emailValidation = function(){
	const emailField = document.getElementById('email');
	
	emailField.oninput = function(){
		this.addEventListener("focusout", email_validator);
	}
}

emailValidation();

const password_validator = () => {
	const pwd = document.getElementById('pwd');
	const pwdVal = pwd.value.trim();
	let pwdErr = pwd.nextElementSibling; 
	
	if(pwdVal === '' || pwdVal === undefined || pwdVal === null || pwdVal.length === 0){
		pwdErr.style.display = 'flex';
		pwd.classList.add('redBox');
		pwdErr.innerText = 'Required';
		return false;
	}else if(pwdVal.length > 0 && pwdVal.length < 6){
		pwdErr.style.display = 'flex';
		pwd.classList.add('redBox');
		pwdErr.innerText = 'Password should atleast be 6 characters long';
		return false;
	}else{
		pwdErr.style.display = 'none';
		pwd.classList.remove('redBox');
		return true;
	}
}

const passwordValidation = function(){
	const pwd = document.getElementById('pwd');
	
	pwd.oninput = function(){
		this.addEventListener("focusout", password_validator);
	}
}

passwordValidation();

const submit_Data = () => {
	
	password_validator();
	email_validator();
	
	if(!password_validator()){
		return password_validator();
	}else if(!email_validator()){
		return email_validator();
	}
	
}

const dataSubmission = () => {
	const sub_btn = document.getElementById('sub-btn');
	
	sub_btn.onclick = function(){
		return submit_Data();
	}

}

dataSubmission();