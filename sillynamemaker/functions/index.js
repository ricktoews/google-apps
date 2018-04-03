'use strict';

process.env.DEBUG = 'actions-on-google:*';
const App = require('actions-on-google').DialogflowApp;
const functions = require('firebase-functions');


// a. the action name from the make_name Dialogflow intent
const NAME_ACTION = 'make_name';
// b. the parameters that are parsed from the make_name intent
//const COLOR_ARGUMENT = 'color';
const NUMBER_ARGUMENT = 'number';
const SEQUENCE_ARGUMENT = 'sequence';


exports.sillyNameMaker = functions.https.onRequest((request, response) => {
  const app = new App({request, response});
  console.log('Request headers: ' + JSON.stringify(request.headers));
  console.log('Request body: ' + JSON.stringify(request.body));


function triangular(n) {
	return (n*n + n) / 2;
}

function fibonacci(n) {
	if (n <= 2) {
		return 1;
	} else {
		return fibonacci(n-1) + fibonacci(n-2);
	}
}

function tetrahedral(n) {
	return n*(n+1)*(n+2) / 6;
}

function square(n) {
	return n*n;
}

function cube(n) {
	return n*n*n;
}

// c. The function that generates the silly name
  function makeName (app) {
    let number = parseInt(app.getArgument(NUMBER_ARGUMENT), 10);
	let sequence = app.getArgument(SEQUENCE_ARGUMENT);
	let value = 0;
	switch (sequence) {
		case 'triangular number':
			value = triangular(number);
			break;
		case 'fibonacci number':
			value = fibonacci(number);
			break;
		case 'square':
			value = square(number);
			break;
		case 'cube':
			value = cube(number);
			break;
		case 'tetrahedral number':
			value = tetrahedral(number);
			break;
		default:
			break;
	}
//    let color = app.getArgument(COLOR_ARGUMENT);
    app.tell('The number you chose is ' + number + '. You asked for a ' + sequence + '. The corresponding value is ' + value + '.');
  }
  // d. build an action map, which maps intent names to functions
  let actionMap = new Map();
  actionMap.set(NAME_ACTION, makeName);


app.handleRequest(actionMap);
});
