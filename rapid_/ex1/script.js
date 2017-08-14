function gotRefreshedData(iss, weather){
	console.log('ISS Flyovers:', iss);	
	console.log('Weather', weather);	

	// Old Method
	/*for (var i = 0; i < iss.response.length; i++) {
		console.log(iss.response[i]);
	}*/

	// Underscore method
	function outputFlyover(flyover, i) {
		$("#flyovers").append('<div>Flyover at ' + flyover.risetime + ' : ' + flyover.weatherDescription + '</div>');
	}

	function processFlyoverData(flyover) {
		var weatherAtFlyover = _.find(weather.list, function(w) {
			return w.dt <=flyover.risetime && w.dt + 60*60*3 > flyover.risetime;
		});
		return {
			clouds: weatherAtFlyover && weatherAtFlyover.clouds.all,
			hasWeather: !_.isUndefined(weatherAtFlyover),
			weatherDescription: weatherAtFlyover && weatherAtFlyover.weather[0].description,
			risetime: new Date(flyover.risetime*1000),
			duration: flyover.duration
		}
	}

	function getDay(flyover) {
		return flyover.risetime.toDateString();
	}

	var flyovers = _.map(iss.response, processFlyoverData);
	
	/*var flyoversWithWeather = _.filter(flyovers, function (flyover) {
		return flyover.hasWeather;
	});*/
	
	var flyoversWithWeather = _.where(flyovers, {hasWeather: true});

	var flyoversGrouped = _.groupBy(flyoversWithWeather, getDay);

	var days = _.keys(flyoversGrouped);

	//_.each(flyoversWithWeather, outputFlyover);
	_.each(days, function (day) {
		$('#flyovers').append('<h2>' + day + '</h2>');
		var flyoversForDay = flyoversGrouped[day];
		/*flyoversForDay = _.sortBy(flyoversForDay, function (flyover) {
			return flyover.clouds;
		});*/
		flyoversForDay = _.sortBy(flyoversForDay, 'clouds');
		_.each(flyoversForDay, outputFlyover);
	});
}

function refreshData() {
	jQuery.getJSON("http://api.open-notify.org/iss-pass.json?lat=50.08&lon=-0.3667&n=100&callback=?", function(iss){
		console.log('Got ISS Data');
		jQuery.getJSON("http://api.openweathermap.org/data/2.5/forecast?lat=50.08&lon=-0.3667&appid=c534c34f3ccd195019b48b18d8c5afbd&callback=?", function(weather){
			console.log('Got Weather Data');
			gotRefreshedData(iss, weather);
		});
	});
}

$("#refresh").on('click', refreshData);
refreshData();