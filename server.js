var express = require("express");
var path = require("path");
var db = require("./db/db.json");
var app = express();

var PORT = process.env.PORT || 3003;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Routes
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// Can move this GET method to the bottom of the GETs and replace '/' with '*' to be a catch-all, but gotta make sure it's the bottom one so it doesn't get caught first.
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/api/notes", function(req, res) {
    res.json(db);
})

// Start the server
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});