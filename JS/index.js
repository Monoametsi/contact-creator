let nav = document.getElementById('nav-cont');

window.onscroll = () => {
	let bodyScrol = document.body.scrollTop;
    let htmlScrol = document.documentElement.scrollTop;
	
	if(bodyScrol > 0 || htmlScrol > 0){
		nav.classList.add('box-shadow');
	}else{
		nav.classList.remove('box-shadow');
	}
	
}