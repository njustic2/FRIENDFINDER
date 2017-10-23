// Dependencies ============================================================================================================
var path = require("path");

// Points the server to route files ========================================================================================
module.exports = function(app) {

	app.get("/survey", function(req, res) {	// Gets the user response and pushes it to html
    	res.sendFile(path.join(__dirname, "/../public/survey.html"));
 	});

	app.use(function(req, res) {	// Defaults to html if there is no user input
		res.sendFile(path.join(__dirname, "/../public/home.html"));
	});
};