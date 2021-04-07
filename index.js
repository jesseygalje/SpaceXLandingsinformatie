//map
mapboxgl.accessToken = 'pk.eyJ1IjoiamVzc2V5Z2FsamUiLCJhIjoiY2ttbHRwYXZhMGd0ZjJxcnoxcDBhdTN2OCJ9.CHz3IaXGNewSEGhdPgm7qA';

var map = new mapboxgl.Map({
	container: 'map',
	style: 'mapbox://styles/mapbox/streets-v11',
	center: [4.363406, 52.031223],
	zoom: 8
});

var geocoder = new MapboxGeocoder({
	accessToken: mapboxgl.accessToken,
	mapboxgl: mapboxgl
});

map.addControl(new mapboxgl.NavigationControl());

document.getElementById('geocoder').appendChild(geocoder.onAdd(map));

map.on('load', function () {
	geocoder.on('result', function (ev) {
    getAPIdata(ev.result.center[0], ev.result.center[1]);
	});
});



//zonsopkomst en zonsondergang
function getAPIdata(locatie1, locatie2) {
	var vraag = 'https://api.sunrise-sunset.org/json?lat=' + locatie2 + '&lng=' + locatie1 + '&date=today';

	fetch(vraag)

	.then(function(antwoord) {
		return antwoord.json();
	})

	.then(function(antwoord) {
		document.getElementById('zonsopkomst').innerHTML = 'De zon komt op om: ' + antwoord.results.sunrise + ' UTC';
		document.getElementById('zonsondergang').innerHTML = 'De zon gaat onder om: ' + antwoord.results.sunset + ' UTC';
	})

//weer
	var verzoek = 'https://api.openweathermap.org/data/2.5/weather?appid=ebad1f3488ab22a8a5ecbb867c179d3b&lon=' + locatie1 + '&lat=' + locatie2;

	fetch(verzoek)	
	
	.then(function(uitkomst) {
		return uitkomst.json();
	})
	
	.then(function(uitkomst) {
		document.getElementById('weather').innerHTML = Math.floor(uitkomst.main.temp - 273.15) + '&#176;C <br>' + uitkomst.weather[0].description;
	});

}

getAPIdata();

dagMoment = new Date();

var huidigeMaand = new Array('januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december');
document.getElementById('datum').innerHTML = dagMoment.getDate() + ' ' + huidigeMaand[dagMoment.getMonth()] + ' ' + dagMoment.getFullYear();