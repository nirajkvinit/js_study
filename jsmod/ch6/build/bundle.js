(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var player = require('./player.js');
var game = require('./game.js');

console.log('Loading with Browserify');

document.getElementById('startGame').addEventListener('click', function() {
	player.setName(document.getElementById('playername').value);
	game.printGame();
});

document.getElementById('calculate').addEventListener('click', function() {
	game.calculateScore();
});

document.getElementById('problemCount').value = game.getProblemCount();

},{"./game.js":2,"./player.js":3}],2:[function(require,module,exports){
var player = require('./player.js');
var scoreboard = require('./scoreboard.js');

var factorElement = document.getElementById('factor');
var problemsPerGame = 3;

function printGame() {

	player.logPlayer();

	setProblemCount(document.getElementById('problemCount').value);
	var gameForm = '';
	for (var i = 1; i <= problemsPerGame; i++) {
		gameForm += '<div class="form-group">';
        gameForm += '<label for="answer' + i + '" class="col-sm-2 control-label">';
        gameForm += factorElement.value + ' x ' + i + ' = </label>';
        gameForm += '<div class="col-sm-1"><input type="text" class="form-control" id="answer' + i + '" size="5" /></div>';
        gameForm += '</div>';
	}

	var gameElement = document.getElementById('game');
	gameElement.innerHTML = gameForm;

	document.getElementById('calculate').removeAttribute('disabled');
}

function calculateScore() {
	var problemsInGame = getProblemCount();
	var score = 0;
	for (var i = 1; i <= problemsInGame; i++) {
		var answer = document.getElementById('answer' + i).value;
		//console.log(i*factorElement.value+' , '+ answer)
		if(i * factorElement.value == answer) {
			score++;
		}
	}

	var result = {
		name: player.getName(),
		score: score,
		problems: problemsInGame,
		factor: factorElement.value
	};

	//var scoreboard = new Scoreboard();
	scoreboard.addResult(result);
	scoreboard.updateScoreboard();

	document.getElementById('calculate').setAttribute('disabled', true);
}

function setProblemCount(newProblemCount) {
	problemsPerGame = newProblemCount;
}

function getProblemCount() {
	return problemsPerGame;
}

exports.printGame = printGame;
exports.calculateScore = calculateScore;
exports.setProblemCount = setProblemCount;
exports.getProblemCount = getProblemCount;
},{"./player.js":3,"./scoreboard.js":4}],3:[function(require,module,exports){


var playerName = '';

function logPlayer() {
	console.log('The current player is ' + playerName + '.');
}

function setName(newName) {
	playerName = newName;
}

function getName() {
	return playerName;
}

exports.logPlayer = logPlayer;
exports.setName = setName;
exports.getName = getName;
},{}],4:[function(require,module,exports){
	
console.log('Creating a scoreboard...');

var results = [];

function addResult(newResult) {
	results.push(newResult);
}

function updateScoreboard() {
	var output = '<h2>Scoreboard</h2>';
	for (var index = 0; index < results.length; index++) {
		var result = results[index];
		output += '<h4>';
		output += result.name + ': ' + result.score + '/' + result.problems + ' for factor ' + result.factor;
		output += '</h4>'
	}

	var scoresElement = document.getElementById('scores');
	scoresElement.innerHTML = output;
}

module.exports = {
	addResult: addResult,
	updateScoreboard: updateScoreboard
};

},{}]},{},[1]);
