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
    document.getElementById('coordinaten').innerHTML = ev.result.center[0]+ '-' + ev.result.center[1];
    getAPIdata(ev.result.center[0], ev.result.center[1]);
	});
});

function getAPIdata(ingevoerdeLon, ingeveordeLat) {

	// construct request
	var request = 'https://api.openweathermap.org/data/2.5/weather?appid=ebad1f3488ab22a8a5ecbb867c179d3b&lon=' + ingevoerdeLon + '&lat=' + ingeveordeLat;

	// get current weather
	fetch(request)	
	
	// parse response to JSON format
	.then(function(response) {
		return response.json();
	})
	
	// do something with response
	.then(function(response) {
		// show full JSON object
		// console.log(response);
		var weatherBox = document.getElementById('weather');
		weatherBox.innerHTML = response.main.temp - 273.15;
		//weatherBox.innerHTML = response.weather[0].description;
		//weatherBox.innerHTML = response.main.temp;

		// var degC = Math.floor(response.main.temp - 273.15);
		// var weatherBox = document.getElementById('weather');
		// weatherBox.innerHTML = degC + '&#176;C <br>';
	});
}

// init data stream
getAPIdata();

// datum en tijd
function lopendeTijd() {
	var moment = new Date();
	
	function addLeadingZero(number) {
		if(number < 10){
			return '0' + number;
		}
		return number
	}
	
	var seconds = addLeadingZero(moment.getSeconds());
	var minutes = addLeadingZero(moment.getMinutes());
	var hours = addLeadingZero(moment.getHours());
	
	// if (ingevoerdeLon > 3 && ingevoerdeLon < 6) {
	// 	hours+1
	// }


	document.getElementById('kloktijd').innerHTML = hours + ':' + minutes + ':' + seconds;
	document.getElementById('kloktijd').style.textAlign = "center";
	}
	
	var autoklok = setInterval(lopendeTijd, 1000);
	
	lopendeTijd();
	
	dagMoment = new Date();

	var huidigeMaand = new Array('januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december');
	document.getElementById('klokdatum').innerHTML = dagMoment.getDate() + ' ' + huidigeMaand[dagMoment.getMonth()] + ' ' + dagMoment.getFullYear();