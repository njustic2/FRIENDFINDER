// Links to a source file with an array of friendsData =========================================================================
var climberData = require("../data/friends");

// Sets up a routing function that connects to an html file ====================================================================
module.exports = function(app) {

// Connects to an array on a javascript file and gets any data =================================================================
	app.get("/api/friends", function(req, res) {
    	res.json(climberData);
    	console.log("this is working");
  	});

// Takes in user input data, converts it to json and posts it to the array  ====================================================
	app.post("/api/friends", function(req, res) {
		console.log("req.body", req.body);
		console.log("ClimberData", climberData);

// Compare the user input to the existing profiles to find the best match ======================================================		

// Variables for the data from the user input and another variable for just the scores from that data ==========================
		var userData = req.body;
		var currentClimberScores = userData.scores;

// A variable that takes the data from the friends.js and puts it into an array and seperates out the scores ===================	
		var allClimberScores = climberData.map(function(currentClimber) {
			return currentClimber.scores;
		});

// A variable that takes the array of climber scores and compares it to the array of scores ====================================
// from the user and puts the value of the difference between the two into a third array =======================================
		var allDifferences = allClimberScores.map(function(otherClimberScores) {
			return getClimberScoreDifference(currentClimberScores, otherClimberScores)
		});

// A varaible that takes the array of the difference in scores between the user and all climbers and reduces each set ==========
// to a single number by adding them together ================================================================================== 
		var collapsedDifferences = allDifferences.map(function(currentDifferenceScores) {
			return currentDifferenceScores.reduce(function(accumulator, currentScore) {
				return accumulator + currentScore;
			}, 0);
			
		});

// A varaible that takes the reduced numbers variable and makes them positive numbers ==========================================
		var absoluteDifferences = collapsedDifferences.map(function(currentDifference) {
			return Math.abs(currentDifference);
		});

// A variable that take the absolute difference array and finds the smallest number and points to its position in the array ====
		var mostCompatableArrayPosition = absoluteDifferences.indexOf(Math.min.apply(null, absoluteDifferences));

		console.log("allClimberScores: ", allClimberScores);
		console.log("allDifferences:", allDifferences);
		console.log('collapsedDifferences:', collapsedDifferences);
		console.log("absoluteDifferences:", absoluteDifferences);
		console.log("mostCompatableArrayPosition:", mostCompatableArrayPosition);
		console.log("Match:", climberData[mostCompatableArrayPosition]);

// Push the result back to the modal ===========================================================================================
		climberData.push(userData);
		climberData.push(climberData[mostCompatableArrayPosition]);
		res.json(true);

// A function that does the work of comparing the climber scores and producing an array of the difference between each answer ===
		function getClimberScoreDifference(climberOneScores, climberTwoScores) {
			var scoreDifferences = [];

			for (var i = 0; i < climberOneScores.length; i++) {
				var currentDifference = climberOneScores[i] - climberTwoScores[i];
				scoreDifferences.push(currentDifference);
			}
			console.log("scoreDifferences:", scoreDifferences);
			return scoreDifferences;
		}
	});
};