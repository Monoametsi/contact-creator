window.onscroll = () => {
	const nav = document.getElementById('nav-cont');
	const bodyScrol = document.body.scrollTop;
    const htmlScrol = document.documentElement.scrollTop;
	
	if(bodyScrol > 0 || htmlScrol > 0){
		nav.classList.add('box-shadow');
	}else{
		nav.classList.remove('box-shadow');
	}
	
}

const listDropper = (string) => {
	const dropdownBtn = document.getElementById(string);
	
	if(dropdownBtn !== null){
		dropdownBtn.onclick = function(){
			const dropDownList = this.nextElementSibling;
			const siblingSibling = dropDownList.nextElementSibling;
			
			if(window.getComputedStyle(dropDownList, null).display !== 'none'){
				dropDownList.style.display = 'none';
				if(siblingSibling !== null){
					siblingSibling.style.display = 'none';
				}
			}else{
				dropDownList.style.display = 'flex';
				/* if(siblingSibling !== null){
					siblingSibling.style.display = 'flex';
				} */
			}
		}
	}
}

listDropper('dashboard-dropdown-btn');