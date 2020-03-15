//first things first, let select all the DOM elements first.
const main = document.getElementById('main');
const add_user = document.getElementById('add_user');
const double_money = document.getElementById('double_money');
const who_is_m = document.getElementById('who_is_m');
const richest = document.getElementById('richest');
const total_wealth = document.getElementById('total_wealth');


let data = [];

//fetch random users and add money
getRandomUser();
getRandomUser();
getRandomUser();
async function getRandomUser(){
	const res = await fetch('https://randomuser.me/api');
	const data = await res.json();
	const user = data.results[0];
	const newUser = {
		name: `${user.name.first} ${user.name.last}`,
		money: Math.floor(Math.random() * 1000000)
	}
	addData(newUser);
}



function addData(obj){
	data.push(obj);
	updateDOM();
}

function updateDOM(providedData = data){
	//clear the main div
	main.innerHTML = "<h2><strong>Person</strong> Wealth</h2>";
	//we will use forEach
	providedData.forEach( person =>{
		const element = document.createElement('div');
		element.classList.add('person');
		element.innerHTML = `<strong>${person.name}</strong> ${formatMoney(person.money)}`;
		main.appendChild(element);
	});
}



//to formate money numbers
function formatMoney(number){
	return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

//doubles the money
function doubleMoney(){
	data = data.map( person => {
		return {
			...person, money: person.money * 2
		}
	});
	updateDOM();
}

//get the richest
function sortPerson(){
	data.sort((a,b) => b.money -a.money);
	updateDOM();
}

//show millionares
function showMillionares(){
	data = data.filter(person => person.money > 1000000);
	updateDOM();

}

//this function calculate wealth
function caclulateWealth(){
	const wealth = data.reduce( (acc, person) => (acc += person.money), 0);
	const wealthEl = document.createElement('div');
	wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`;
	main.appendChild(wealthEl);
	console.log();
}
//event listeners

add_user.addEventListener('click', getRandomUser);
double_money.addEventListener('click', doubleMoney);
richest.addEventListener('click', sortPerson);
who_is_m.addEventListener('click', showMillionares);
total_wealth.addEventListener('click', caclulateWealth);