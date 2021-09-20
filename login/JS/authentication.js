const email_validator = () => {
	const emailField = document.getElementById('email');
	const emailFieldVal = emailField.value.trim();
	let emailErr = emailField.nextElementSibling;
	
	if(emailFieldVal === '' || emailFieldVal.length === 0 || emailFieldVal === undefined || emailFieldVal === null){
		emailErr.style.display = 'flex';
		emailErr.innerHTML = 'Required';
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