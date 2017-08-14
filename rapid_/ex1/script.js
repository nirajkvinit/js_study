function ISSFlyover() {
	this.refreshData();
	//var boundRefresh = _.bind(this.refreshData, this);
	//$("#refresh").on('click', boundRefresh);

	//this.refreshData = _.bind(this.refreshData, this);
	_.bindAll(this, 'refreshData', 'gotRefreshedData');
	$("#refresh").on('click', this.refreshData);
}

_.extend(ISSFlyover.prototype, {

	gotRefreshedData: function(iss, weather, astronauts){
		var atTheISS = _.pluck(_.where(astronauts.people, {craft: "ISS"}), "name");
		$('#astronauts').text(atTheISS.join(", "));

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

		var flyoversWithWeather = _.where(flyovers, {hasWeather: true});

		var flyoversGrouped = _.groupBy(flyoversWithWeather, getDay);

		_.each(flyoversGrouped, function (flyoversForDay, day) {
			$('#flyovers').append('<h2>' + day + '</h2>');
			//var flyoversForDay = flyoversGrouped[day];		
			flyoversForDay = _.sortBy(flyoversForDay, 'clouds');
			_.each(flyoversForDay, outputFlyover);
		});

		var summary = _.countBy(flyoversWithWeather, 'weatherDescription');
		$("#summary").html('');
		_.each(summary, function (count, condition) {
			$('#summary').append('<div><b>' + condition + '</b>:' + count + '</div>');
		});
	},

	refreshData: function() {
		var me = this;
		var location = {lat: 50.8, lon: -0.3667};
		jQuery.getJSON("http://api.open-notify.org/astros.json?callback=?", function(astronauts) {
			jQuery.getJSON("http://api.open-notify.org/iss-pass.json?callback=?", _.extend({n: 100}, location), function(iss){
				jQuery.getJSON("http://api.openweathermap.org/data/2.5/forecast?appid=c534c34f3ccd195019b48b18d8c5afbd&callback=?", location, function(weather){
					me.gotRefreshedData(iss, weather, astronauts);
				});
			});
		});
			
	}
});

var issFlyover = new ISSFlyover();
