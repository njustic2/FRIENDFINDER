// Dependencies ============================================================================================================
var express = require("express");
var bodyParser = require("body-parser"); 
var app = express();	
var PORT = process.env.PORT || 8080; 

// BodyParser types =======================================================================================================
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Points the server to the route files ===================================================================================
require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

// App listener with an alert =============================================================================================
app.listen(PORT, function() {
	console.log("App listening on PORT: " + PORT);
});