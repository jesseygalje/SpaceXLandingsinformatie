// Set api token
mapboxgl.accessToken = 'pk.eyJ1IjoiamVzc2V5Z2FsamUiLCJhIjoiY2ttbHRwYXZhMGd0ZjJxcnoxcDBhdTN2OCJ9.CHz3IaXGNewSEGhdPgm7qA';

var map = new mapboxgl.Map({
	container: 'map',
	style: 'mapbox://styles/mapbox/streets-v11',
	center: [-79.4512, 43.6568],
	zoom: 13
});

// Add the control to the map.
var geocoder = new MapboxGeocoder({
	accessToken: mapboxgl.accessToken,
	mapboxgl: mapboxgl
});

document.getElementById('geocoder').appendChild(geocoder.onAdd(map));

map.on('load', function () {
	// Listen for the `geocoder.input` event that is triggered when a user
	// makes a selection
	geocoder.on('result', function (ev) {
	  console.log(ev.result.center);
    getAPIdata(ev.result.center[0], ev.result.center[1]);
	});
});

function getAPIdata(coordinaat1, coordinaat2) {

	// construct request
	var verzoek = 'https://api.openweathermap.org/data/2.5/weather?appid=ebad1f3488ab22a8a5ecbb867c179d3b&lon=' + coordinaat1 + '&lat=' + coordinaat2;

	// get current weather
	fetch(verzoek)	
	
	// parse response to JSON format
	.then(function(uitkomst) {
		return uitkomst.json();
	})
	
	// do something with response
	.then(function(uitkomst) {
		// show full JSON object
		// console.log(response);
		// var weatherBox = document.getElementById('weather');
		document.getElementById('weather').innerHTML = Math.floor(uitkomst.main.temp - 273.15) + '&#176;C <br>';
		//weatherBox.innerHTML = response.weather[0].description;
		//weatherBox.innerHTML = response.main.temp;

		// var degC = Math.floor(response.main.temp - 273.15);
		// var weatherBox = document.getElementById('weather');
		// weatherBox.innerHTML = degC + '&#176;C <br>';
	});
}

// init data stream
getAPIdata();

//zonsopkomst zonsondergang api
// function getAPIdata(locatie1, locatie2) {

// 	var vraag = 'https://timezone-by-location.p.rapidapi.com/timezone?lon=' + locatie1 + '&lat=' + locatie2 + '&s=0&c=1';

// 	fetch(vraag)

// 	.then(function(resultaat) {
// 		return resultaat.json();
// 	})

// 	.then(function(resultaat) {
// 		// console.log(resultaat);
// 		var tijdzone = document.getElementById('kloktijd');
// 		tijdzone.innerHTML = resultaat.date_time_txt;
// 	});

// 	fetch("https://timezone-by-location.p.rapidapi.com/timezone?lon=" + locatie1 + "&lat=" + locatie2 + "&s=0&c=1", {
// 		"method": "GET",
// 		"headers": {
// 			"x-rapidapi-key": "9cd70da1admsh6d815dd932f1372p1e077bjsnbaeb25c34ea1",
// 			"x-rapidapi-host": "timezone-by-location.p.rapidapi.com"
// 		}
// 	})
// 	.then(response => {
// 		console.log(response);
// 	})
// 	.catch(err => {
// 		console.error(err);
// 	});
// }

// getAPIdata();


// // datum en tijd met timezone
// function lopendeTijd() {
// 	var moment = new Date();
	
// 	function addLeadingZero(number) {
// 		if(number < 10){
// 			return '0' + number;
// 		}
// 		return number
// 	}
	
// 	var seconds = addLeadingZero(moment.getSeconds());
// 	var minutes = addLeadingZero(moment.getMinutes());
// 	var hours = addLeadingZero(moment.getHours());

// 	document.getElementById('kloktijd').innerHTML = hours + ':' + minutes + ':' + seconds;
// 	document.getElementById('kloktijd').style.textAlign = "center";
// 	}
	
// 	var autoklok = setInterval(lopendeTijd, 1000);
	
// 	lopendeTijd();
	
// 	dagMoment = new Date();

// 	var huidigeMaand = new Array('januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december');
// 	document.getElementById('klokdatum').innerHTML = dagMoment.getDate() + ' ' + huidigeMaand[dagMoment.getMonth()] + ' ' + dagMoment.getFullYear();