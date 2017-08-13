function gotRefreshedData(iss, weather){
	console.log('Processing data');
	console.log('ISS Flyovers:');
	console.log(iss);
	console.log('Weather');
	console.log(weather);

	for (var i = 0; i < iss.response.length; i++) {
		console.log(iss.response[i]);
	}
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