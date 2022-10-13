//import {openMenu} from "./functions.js";
const body = document.querySelector("body");
const hamburguesa = document.getElementById("hamburguer-button");
const form = document.querySelector("form");
const popupForm = document.getElementById("popupform")
const popupButton = document.querySelector(".popup__button");
const popup = document.querySelector(".popup");
const selector_moneda = document.querySelector("select");
//variable para comprobar que no se haya mostrado el popup
let sw = false;
function openMenu(){
	const ul = document.querySelector(".header__ul-2")
	const header = document.querySelector("header");
	//si contiene la clase not-display debe mostrar el ul cada vez que se haga click en la hamburguesa
	if(ul.classList.contains("not-display"))
	{
		ul.classList.remove("not-display");
		header.classList.add("header-open");
		hamburguesa.style.backgroundImage = "url('./images/x-blue.svg')";
	}
	else
	{
		header.classList.remove("header-open");
		ul.classList.add("not-display");
		hamburguesa.style.backgroundImage = "url('./images/open-menu.svg')";
	}
}

function percentageScroller()
{
	
	const percentageScrollerDiv = document.querySelector("#percentage-scroller");
	const documentHeight = document.body.clientHeight;
	let windowHeight = window.innerHeight;
	let heightScrolled = window.pageYOffset;
	const bodyDocument = document.body.offsetHeight;
	let actualPercentage = ((heightScrolled) * 100) / (bodyDocument - windowHeight);
	if(actualPercentage>100)
		actualPercentage = 100;
	percentageScrollerDiv.style.width = actualPercentage + "%";
	//enviamos porcentaje a la funcion que crea y muestra el boton returntothetop para que lo muestre cuando el usuario baje un 25%
	returnToTheTopButton(actualPercentage);	
	if(actualPercentage >= 25 && sw === false)
	{
		showPopUp();
	}
}

function returnToTheTopButton(percentage)
{
	if(percentage<25 && document.getElementById('returnTop'))
	{
		document.getElementById('returnTop').remove();
		return  false;
	}
	else if(percentage>=25 && !document.getElementById('returnTop'))
	{
		const button = document.createElement("button");
		button.textContent = "TOP";
		button.id = "returnTop";
		button.style.width = "50px";
		button.style.height = "50px";
		button.style.borderRadius = "50px";
		button.style.position = "fixed";
		button.style.bottom = "30px";
		button.style.right = "30px";
		button.style.background = "#08A6E4";
		button.style.border = "none";
		button.style.fontFamily = "Open Sans";
		button.style.color = "#FFFFFF";
		button.style.fontWeight = "700";
		body.appendChild(button);
	}	
}
//funcion para scrollear hasta el top mediante js
function returnToTheTop(){
	const interval = setInterval(() =>{
		let actualYCoord = window.pageYOffset;
		let nextYCoord = window.pageYOffset-15;
		window.scrollTo(actualYCoord, nextYCoord);
		if(actualYCoord<=0)
			clearInterval(interval);
	},1);
}
//para enviar datos con fetch
async function sendData(user, mail)
{
	let data = 
	{
		username: user,
		email : mail
	};
	try{
		let result = await fetch('https://my-json-server.typicode.com/alvarot2601/prueba/posts',
			{	
				method: 'POST',
				body: JSON.stringify(data),
				headers:{
				    'Content-Type': 'application/json'
				}
			}
		);
		let sentData = await result.json();	
		console.log(sentData);
	}catch(error){
		console.log(error);
	}
}

async function sendPopupData(){
	const input = document.getElementById("popupmail");
	let usermail = document.getElementById("popupmail").value;
	let data = {mail: usermail};
	const mailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if(!mailRegex.test(usermail))
	{
		input.style.border = "3px solid red";
		return false;
	}
	try{
		let result = await fetch("https://my-json-server.typicode.com/alvarot2601/prueba/posts",{
			method: 'POST',
			headers: {
				'Content-Type' : 'application/json'
			},
			body: JSON.stringify(data)
		});
		let sentData = await result.json();
		console.log(sentData);
		closePopUp();
	}catch(error){
		console.log(error);
	};
}

//funcion  para validar los campos del formulario
function formValidation(event)
{
	const usernameRegex  = /^[A-Za-zÀ-ÿ\s]{2,100}$/;
	const mailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	const usernameInput = document.querySelector("input#username");
	const mailInput = document.querySelector("input#usermail");
	if(!usernameRegex.test(usernameInput.value))
	{
		usernameInput.style.borderBottom = "1px solid red";
		event.preventDefault();
		return false;
	}
	else
	{
		usernameInput.style.borderBottom = "none";
	}
	if(!mailRegex.test(mailInput.value))
	{
		mailInput.style.borderBottom = "1px solid red";
		event.preventDefault();
		return false;
	}
	else
	{
		mailInput.style.borderBottom = "none";
		sendData(username.value, usermail.value);
	}
	event.preventDefault();
	return false;
}
function popUpValidation(event){
	
	return false;
	event.preventDefault();
	
}

function closePopUp()
{
	popup.style.display = "none";
}

function showPopUp()
{
	if(sessionStorage.getItem("openmodal") === null)
	{
		sessionStorage.setItem("openmodal", true);
		const popup = document.querySelector(".popup");
		popup.style.display = "block";
		//sw = true;
		document.addEventListener("keydown", (e)=>{
			if(popup.style.display === "block" && e.key === 'Escape')
			{
				e.preventDefault();
				closePopUp();
			}
		});
	}
}

async function getApiData(apiURL){
	try{
		let result = await fetch(apiURL);
		let data = await result.json();
		return data;
	}catch(error){
		console.log(error);
	}
	
}
async function changePrices(){
	const monedaSeleccionada = selector_moneda.value;
	const span = document.getElementsByClassName("pricing-article__second-span");
	let apiURL = '';
	let moneda = '';
	switch(monedaSeleccionada)
	{
		case 'USD':
			apiURL = 'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd.json';
			moneda = '$';
			break;
		case 'EUR':
			apiURL = 'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/eur.json';
			moneda = '€';
			break;
		case 'GBP':
			apiURL = 'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/gbp.json';
			moneda = '£';
			break;
	}
	const arrayMonedas = await getApiData(apiURL);
	const arrayPrecios = [];
	let arrayNuevosPrecios = [];
	const monedaAnterior = span[0].textContent.charAt(0);
	console.log(apiURL)
	//el primer for es para almacenar el precio de cada articulo en un array
	for (var i = 0; i < span.length; i++) {
		if(monedaAnterior == '$')
		{
			if(moneda == '€')
			{
				arrayNuevosPrecios[i] = parseInt(span[i].textContent.substr(1)) / parseFloat(arrayMonedas.eur.usd);
			}
			else
			{
				arrayNuevosPrecios[i] = parseInt(span[i].textContent.substr(1)) / parseFloat(arrayMonedas.gbp.usd);
			}
		}
		else if(monedaAnterior == '€')
		{
			if(moneda == '$')
			{
				arrayNuevosPrecios[i] = parseInt(span[i].textContent.substr(1)) / parseFloat(arrayMonedas.usd.eur);
			}
			else
			{
				arrayNuevosPrecios[i] = parseInt(span[i].textContent.substr(1)) * parseFloat(arrayMonedas.gbp.eur);
			}
		}
		else
		{
			if(moneda == '$')
			{
				arrayNuevosPrecios[i] = parseInt(span[i].textContent.substr(1)) * parseFloat(arrayMonedas.usd.gbp);
			}
			else
			{
				arrayNuevosPrecios[i] = parseInt(span[i].textContent.substr(1)) * parseFloat(arrayMonedas.eur.gbp);
			}
		}
		
	}
	for (var i = 0; i < span.length; i++) {
		span[i].textContent = moneda + arrayNuevosPrecios[i].toFixed(2);
	}
}


//EVENTOS

hamburguesa.addEventListener("click",openMenu);

window.addEventListener("load", percentageScroller);
window.addEventListener("scroll", percentageScroller);

//para asignar el evento al botón que se crea dinámicamente
document.addEventListener("click", (e)=> {
	if(e.target && e.target.id == 'returnTop')
	{
		setTimeout(returnToTheTop, 200);
	}
}, true);

form.addEventListener("submit", formValidation);
popupForm.addEventListener("submit", (e)=>{
	sendPopupData();
	e.preventDefault();
});

//para mostrar popup despues d 5s
window.addEventListener("load", ()=>{
	setTimeout( () =>{
		if(sw === false)
		{
			showPopUp();
		}
	}, 5000);
});
 //para cerrar el popup
popupButton.addEventListener("click", closePopUp);

popup.addEventListener("click", (e)=>{
	if(e.target.id == "popup")
		closePopUp();
});

selector_moneda.addEventListener("change", changePrices);







