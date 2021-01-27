var express = require("express");
var path = require("path");
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

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});





// Start the server
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});