/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {

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

	return {
		logPlayer: logPlayer,
		setName: setName,
		getName: getName
	}

}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2), __webpack_require__(0)], __WEBPACK_AMD_DEFINE_RESULT__ = function(game, player) {

	console.log('Bundled with webpack');
	
	document.getElementById('startGame').addEventListener('click', function() {
		player.setName(document.getElementById('playername').value);
		game.printGame();
	});

	document.getElementById('calculate').addEventListener('click', function() {
		game.calculateScore();
	});

	document.getElementById('problemCount').value = game.getProblemCount();
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0), __webpack_require__(3)], __WEBPACK_AMD_DEFINE_RESULT__ = function(player, scoreboard){



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

	return {
		printGame: printGame,
		calculateScore: calculateScore,
		setProblemCount: setProblemCount,
		getProblemCount: getProblemCount
	}
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function(){
	
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

	return {
		addResult : addResult,
		updateScoreboard: updateScoreboard
	}
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ })
/******/ ]);