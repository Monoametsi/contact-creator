listDropper('filter-dropdown');
listDropper('advanced-search');
listDropper('filter-list-cont');

let table = document.getElementById('contacts-table');
let slideCont = document.getElementById("post-info-cont");
let slideCard = document.getElementsByClassName("post-info-cont");
let slideCloser = document.getElementsByClassName("slide-closer");
/* let noAdsFound = document.getElementById('no-posts-found'); */

//Condition for resizing of slides
if(slideCont !== null){
	window.onresize = () => {

		if(window.innerWidth >= 1210 && slideCont.style.width !== '0px' && slideCont.style.width !== ''){
			slideCont.style.width = '50%';
			slideCont.style.borderLeft = '1px solid #888';
		}else if(window.innerWidth > 870 && window.innerWidth <= 1210 && slideCont.style.width !== '0px' && slideCont.style.width !== ''){
			slideCont.style.width = '70%';
			slideCont.style.borderLeft = '1px solid #888';
		}else if(window.innerWidth > 675 &&window.innerWidth <= 870 && slideCont.style.width !== '0px' && slideCont.style.width !== ''){
			slideCont.style.width = '90%';
			slideCont.style.borderLeft = '1px solid #888';
		}else if(window.innerWidth <= 675 && slideCont.style.width !== '0px' && slideCont.style.width !== ''){
			slideCont.style.width = '100%';
			slideCont.style.borderLeft = '1px solid #888';
		}
	}
}

//Functionality for displaying of the slides and the size in which it should bbe display.
function slideRevealer(){

	if(slideCont.style.width === '0px' || slideCont.style.width === ''){
		if(window.innerWidth >= 1210){
			slideCont.style.width = '50%';
			slideCont.style.borderLeft = '1px solid #888';
		}else if(window.innerWidth > 870 && window.innerWidth <= 1210){
			slideCont.style.width = '70%';
			slideCont.style.borderLeft = '1px solid #888';
		}else if(window.innerWidth > 675 &&window.innerWidth <= 870){
			slideCont.style.width = '90%';
			slideCont.style.borderLeft = '1px solid #888';
		}else if(window.innerWidth <= 675){
			slideCont.style.width = '100%';
			slideCont.style.borderLeft = '1px solid #888';
		}

	}
}

//Functionality for closing slider.
function slideTerminator(){
	for(let i = 0; i < slideCloser.length; i++){
		slideCloser[i].onclick = () => {
			  if(slideCont.style.width !== '0px' || slideCont.style.width !== ''){
				slideCont.style.width = '0';
				slideCont.style.borderLeft = '0';
			}
		}
	}
}

slideTerminator();

//Functionality for how to display the slides
function slideDisplayer(){
	//Counter for counting total amount of messages
	let num = 0;
	
	//Counter for counting the total amount of messages that are not hiddens
	let numOfDisplayedMsgs = 0;
	
	//Looping through all the table rows
	for(let i = 1; i < table.rows.length; i++){

	//Condition for counting the amount of displayed messges that are not hidden.
		if(window.getComputedStyle(table.rows[i], null).display != 'none'){
			numOfDisplayedMsgs++;
		}

		//Functionality for what should happen when table row elements are clicked.
		table.rows[i].onclick = function(event){
			//Id of the table message contained in the table row
			let tableId = this.id;
			
			//Looping through slides
			for(let j = 0; j < slideCard.length; j++){
				
				//Hidding all slides
				slideCard[j].style.display = 'none';

				//Slide id value
				let cardId = slideCard[j].children[1].children[1].children[0].children[0].children[0].id;
				
				//Condition to not display any slide when the first element of the table row is clicked.
				if(event.target === this.cells[0].children[0]){
					if(slideCont.style.width === '0px' || slideCont.style.width === ''){
						return null;
					}
				}
				
				//Condition to not display any slide when the last element of the table row is clicked.
				if(event.target === this.cells[7].children[0].children[0]){
					if(slideCont.style.width === '0px' || slideCont.style.width === ''){
						num++;
					
					//Condition to delete table row when delete icon is clicked and if all messgaes are delete, a message is to be displayed.
						/* if((table.rows.length - 1) === 1 || num === numOfDisplayedMsgs){
							noAdsFound.style.display = 'flex';
						}else{
							noAdsFound.style.display = 'none';
						} */

						this.remove();

						//Condition to remove the message from frontend and to send it to be deleted on the backend via fetch api.
						
						fetch(`/delete-message/${ this.id }`, {
							method: 'POST'
						}).then((response) => {
							if(response.ok){
								console.log(response);
								return;
							}
							
							throw new Error('Response Failed')
						}).catch((err) => {
							console.log(err);
						});
						
						return null;
					}
				}

				//Condition to display message that have identical id's
				if(tableId === cardId){
					slideCard[j].style.display = 'flex';
					slideRevealer();
				}else{
					slideCard[j].style.display = 'none';
				}	
				
			}
		}
	}
}

slideDisplayer();

let searchEngine = document.getElementById('search-input');
let searchEngineBtn = document.getElementById('search-btn');

//functionality for the search input field
function searchEnginSystem(){
	let searchEngineVal = searchEngine.value.toLowerCase();
	
	//Counter for counting number of messages.
	let num = 0;
	
	//Looping through table rows
	for(let i = 1; i < table.rows.length; i++){
		//Message title
		
		let name = table.rows[i].cells[2].innerHTML.toLowerCase().trim();
		//Message email
		let surname = table.rows[i].cells[3].innerHTML.toLowerCase().trim();
		//Message contacts
		let email = table.rows[i].cells[5].innerHTML.toLowerCase().trim();

		//condition for to display all messages when search input value is empty
		if(searchEngineVal.trim() === "" || searchEngineVal.trim().length === 0 || searchEngineVal === null || searchEngineVal === undefined){
			//Dispalying all messages

			table.rows[i].style.display = 'table-row';
			
		//Condition for displaying messges that are a match for the search input value and hidding those that dont.
		}else if(name === searchEngineVal.trim() || surname === searchEngineVal.trim() || email === searchEngineVal.trim()){
			table.rows[i].style.display = 'table-row';
			
		}else{
			table.rows[i].style.display = 'none';
		}
		
		//Counting number of hidden messages
		if(table.rows[i].style.display === 'none'){
			num++;
		}
		
		//Condition for if no messages match input value then a messsage should be displayed
	/* 	if(num === i){
			noAdsFound.style.display = 'flex';
		}else{
			noAdsFound.style.display = 'none';
		} */
	}
}

//Functionality for clicking search btn to activate search
searchEngineBtn.onclick = () => {
	searchEnginSystem();
	slideDisplayer();
}

//Functionality for pressing the enter to activate search
searchEngine.onkeydown = (event) => {
	if(event.keyCode === 13){
		searchEnginSystem();
		slideDisplayer();
	}
}

let mainCheckBox = document.getElementById('main-checkbox');
let subCheckBox = document.getElementsByClassName('sub-checkBox');

//Functionality for checking all table row checkboxes when the header checkbox is clicked
mainCheckBox.onclick = function(){
	for(let i = 0; i < subCheckBox.length; i++){
		let tableRow = subCheckBox[i].parentElement.parentElement;
		if(this.checked && window.getComputedStyle(tableRow, null).display !== 'none'){
			subCheckBox[i].checked = true;
		}else{
			subCheckBox[i].checked = false;
		}
	}
}

let deleteAllBtn = document.getElementById('deleteAll-cont');

//Click functionality for the deleting of all messages when checked checkboxes
deleteAllBtn.onclick = () => {
	//Total num of messages
	let currentNum = 0;
	//Total num of messages not hidden
	let numOfDisplayedMsgs = 0;
	//Array of messages deleted
	let deletedBulk = []
	//Array of messages
	let subCheckBoxArr = Array.from(subCheckBox);

	//Map functionality for the deleting of messages
	subCheckBoxArr.map((checkBox) => {
		//checkbox table row
		let tableRow = checkBox.parentElement.parentElement;

		//Condition for deleting messages that are checked and not hidden. Also for counting number of non-hidden messages that are checked.
		if(checkBox.checked && window.getComputedStyle(tableRow, null).display !== 'none'){
			currentNum++;
			deletedBulk.push(tableRow.id);
			tableRow.remove();
		}

		//Condition counting messages that are not hidden.
		if(window.getComputedStyle(tableRow, null).display !== 'none'){
			numOfDisplayedMsgs++
		}

		//Condition for display a message if not messages are avalible or have been deleted
		/* if(subCheckBoxArr.length === currentNum || numOfDisplayedMsgs === currentNum ){
			noAdsFound.style.display = 'flex';
		}else{
			noAdsFound.style.display = 'none';
		} */
	});

	//Condition for sending id of deleted messages to server via delete url so that the server can delete them on the backend
	if(deletedBulk.length > 0){
		fetch(`/delete-message/${ deletedBulk }`,{ 
			method: 'POST'
		}).then((response) => {

			if(response.ok){
				console.log(response);
				return;
			}

			throw new Error('Response Failed');
		}).catch((err) => {
			console.log(err);
		})
	}

}